/**
 * Proxy Yoast XML sitemaps from WordPress (WP_BASE_URL) and rewrite public
 * `<loc>` URLs to SITE_URL so cms.* never appears as a crawlable sitemap location.
 *
 * Media (`/wp-content/`, `/wp-includes/`) in `<loc>` / `<image:loc>` keep the CMS
 * origin when hosts differ — they are not page canonicals.
 *
 * xml-stylesheet hrefs are rewritten to a same-origin Astro path (`/main-sitemap.xsl`)
 * so browsers can apply Yoast’s XSL when the sitemap is served from localhost or
 * the public host (protocol-relative `//site/...` would otherwise become a
 * cross-origin http:// load on http://localhost).
 */

import { getSiteUrl, getWpBaseUrl } from './wp-seo';
import { isProduction } from './site-env';

const EMPTY_INDEX = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>
`;

const EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;

/** Yoast index + typed child sitemaps (`post-sitemap2.xml`, `category-sitemap.xml`, …). */
const YOAST_SITEMAP_RE =
	/^(?:sitemap_index|[a-z][a-z0-9_-]*-sitemap[0-9]*)\.xml$/i;

/** Same-origin path served by Astro; proxies Yoast’s main-sitemap.xsl. */
export const YOAST_SITEMAP_XSL_PATH = '/main-sitemap.xsl';

/** Upstream path on the WordPress host. */
export const YOAST_SITEMAP_XSL_UPSTREAM =
	'/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl';

export function isYoastSitemapFile(name: string): boolean {
	return YOAST_SITEMAP_RE.test(name.trim());
}

function stripTrailingSlash(url: string): string {
	return url.replace(/\/+$/, '');
}

/**
 * Optional override when the sitemap must be fetched from a host other than
 * WP_BASE_URL (e.g. internal origin while API uses a CDN). Defaults to WP_BASE_URL.
 */
export function getWpSitemapOrigin(): string | undefined {
	let fromAstro: string | undefined;
	try {
		fromAstro = import.meta.env.WP_SITEMAP_ORIGIN as string | undefined;
	} catch {
		fromAstro = undefined;
	}
	const fromProcess =
		typeof process !== 'undefined' ? process.env?.WP_SITEMAP_ORIGIN : undefined;
	const raw = (fromAstro || fromProcess || getWpBaseUrl() || '').trim();
	return raw ? stripTrailingSlash(raw) : undefined;
}

/**
 * Point Yoast’s xml-stylesheet at a same-origin path.
 * Yoast emits protocol-relative `//host/wp-content/.../main-sitemap.xsl`; that
 * inherits the document protocol and fails cross-origin on localhost.
 * Does not touch `<loc>` entries.
 */
export function rewriteYoastSitemapStylesheetHref(xml: string): string {
	return xml.replace(
		/(<\?xml-stylesheet\b[^?]*?\bhref=(["']))([^"']*)(\2[^?]*?\?>)/i,
		`$1${YOAST_SITEMAP_XSL_PATH}$4`,
	);
}

/**
 * Rewrite CMS-host page/sitemap `<loc>` values to SITE_URL.
 * Leaves image locs and other /wp-content/ URLs on the CMS host unchanged.
 * Always rewrites the xml-stylesheet href to the same-origin XSL proxy.
 */
export function rewriteYoastSitemapXml(
	xml: string,
	wpBase: string,
	siteUrl: string,
): string {
	const withStylesheet = rewriteYoastSitemapStylesheetHref(xml);

	const from = stripTrailingSlash(wpBase);
	const to = stripTrailingSlash(siteUrl);
	if (!from || !to || from === to) return withStylesheet;

	let fromOrigin: string;
	let fromHost: string;
	let toOrigin: string;
	try {
		const f = new URL(from);
		const t = new URL(to);
		fromOrigin = f.origin;
		fromHost = f.host;
		toOrigin = t.origin;
	} catch {
		return withStylesheet;
	}

	const mediaPath = /^(?:\/wp-content\/|\/wp-includes\/)/i;

	return withStylesheet.replace(/<loc>([\s\S]*?)<\/loc>/gi, (full, inner: string) => {
		const loc = inner.trim();
		if (!loc) return full;

		try {
			// Protocol-relative //cms.example/path
			const absolute =
				loc.startsWith('//') ? `https:${loc}` : loc;
			const u = new URL(absolute);
			if (u.host.toLowerCase() !== fromHost.toLowerCase()) {
				return full;
			}
			if (mediaPath.test(u.pathname)) {
				return full;
			}
			u.protocol = new URL(toOrigin).protocol;
			u.host = new URL(toOrigin).host;
			return `<loc>${u.href}</loc>`;
		} catch {
			// Plain string prefix fallback (malformed but still CMS-prefixed)
			if (loc.startsWith(fromOrigin) && !mediaPath.test(loc.slice(fromOrigin.length))) {
				return `<loc>${toOrigin}${loc.slice(fromOrigin.length)}</loc>`;
			}
			if (loc.startsWith(from) && !mediaPath.test(loc.slice(from.length))) {
				return `<loc>${to}${loc.slice(from.length)}</loc>`;
			}
			return full;
		}
	});
}

export function emptyYoastSitemapBody(fileName: string): string {
	return /^sitemap_index\.xml$/i.test(fileName) ? EMPTY_INDEX : EMPTY_URLSET;
}

export type YoastSitemapResult =
	| { ok: true; body: string; status: number; contentType: string }
	| { ok: false; status: number; body: string; contentType: string };

/**
 * Fetch a Yoast sitemap file from WordPress and rewrite public locs to SITE_URL.
 * Always returns XML on the current origin (no browser redirect to upstream).
 * Non-production responses still get X-Robots-Tag noindex; robots.txt omits Sitemap.
 */
export async function fetchYoastSitemap(fileName: string): Promise<YoastSitemapResult> {
	const name = fileName.replace(/^\/+/, '').trim();
	const contentType = 'application/xml; charset=UTF-8';

	if (!isYoastSitemapFile(name)) {
		return {
			ok: false,
			status: 404,
			body: emptyYoastSitemapBody('missing.xml'),
			contentType,
		};
	}

	const origin = getWpSitemapOrigin();
	const siteUrl = getSiteUrl();
	if (!origin || !siteUrl) {
		console.error(
			'[yoast-sitemap] missing WP_BASE_URL/WP_SITEMAP_ORIGIN or SITE_URL — cannot proxy Yoast sitemap',
		);
		return {
			ok: false,
			status: 503,
			body: emptyYoastSitemapBody(name),
			contentType,
		};
	}

	const upstream = `${origin}/${name}`;
	let res: Response;
	try {
		res = await fetch(upstream, {
			headers: {
				Accept: 'application/xml,text/xml,*/*',
				'Cache-Control': 'no-cache',
				// Identify proxy traffic for logs; does not skip WP generation.
				'User-Agent': 'Xoomplus-Astro-Yoast-Sitemap-Proxy/1.0',
			},
			redirect: 'follow',
		});
	} catch (err) {
		console.error(`[yoast-sitemap] fetch failed for ${upstream}:`, err);
		return {
			ok: false,
			status: 502,
			body: emptyYoastSitemapBody(name),
			contentType,
		};
	}

	if (!res.ok) {
		console.error(`[yoast-sitemap] upstream ${res.status} for ${upstream}`);
		return {
			ok: false,
			status: res.status === 404 ? 404 : 502,
			body: emptyYoastSitemapBody(name),
			contentType,
		};
	}

	const raw = await res.text();
	const body = rewriteYoastSitemapXml(raw, origin, siteUrl);
	const upstreamType = res.headers.get('content-type');
	return {
		ok: true,
		status: 200,
		body,
		contentType:
			upstreamType && /xml/i.test(upstreamType)
				? upstreamType
				: contentType,
	};
}

/**
 * Fetch Yoast’s sitemap XSL from WordPress for same-origin browser styling.
 */
export async function fetchYoastSitemapStylesheet(): Promise<YoastSitemapResult> {
	const contentType = 'text/xsl; charset=UTF-8';
	const origin = getWpSitemapOrigin();
	if (!origin) {
		console.error(
			'[yoast-sitemap] missing WP_BASE_URL/WP_SITEMAP_ORIGIN — cannot proxy Yoast XSL',
		);
		return { ok: false, status: 503, body: '', contentType };
	}

	const upstream = `${origin}${YOAST_SITEMAP_XSL_UPSTREAM}`;
	let res: Response;
	try {
		res = await fetch(upstream, {
			headers: {
				Accept: 'application/xml,text/xml,text/xsl,*/*',
				'Cache-Control': 'no-cache',
				'User-Agent': 'Xoomplus-Astro-Yoast-Sitemap-Proxy/1.0',
			},
			redirect: 'follow',
		});
	} catch (err) {
		console.error(`[yoast-sitemap] XSL fetch failed for ${upstream}:`, err);
		return { ok: false, status: 502, body: '', contentType };
	}

	if (!res.ok) {
		console.error(`[yoast-sitemap] XSL upstream ${res.status} for ${upstream}`);
		return {
			ok: false,
			status: res.status === 404 ? 404 : 502,
			body: '',
			contentType,
		};
	}

	const body = await res.text();
	const upstreamType = res.headers.get('content-type');
	return {
		ok: true,
		status: 200,
		body,
		contentType:
			upstreamType && /(xml|xsl)/i.test(upstreamType)
				? upstreamType
				: contentType,
	};
}

export function yoastSitemapResponse(result: YoastSitemapResult): Response {
	const headers = new Headers({
		'Content-Type': result.contentType,
		'X-Content-Type-Options': 'nosniff',
	});

	if (!isProduction()) {
		headers.set('X-Robots-Tag', 'noindex, nofollow');
		headers.set('Cache-Control', 'private, no-store');
	} else if (result.ok) {
		// Short shared cache; Yoast structure changes with publishes.
		headers.set('Cache-Control', 'public, max-age=300, s-maxage=600');
	} else {
		headers.set('Cache-Control', 'private, no-store');
	}

	return new Response(result.body, { status: result.status, headers });
}
