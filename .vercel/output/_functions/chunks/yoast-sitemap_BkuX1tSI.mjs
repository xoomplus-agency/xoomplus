import { c as getWpBaseUrl, s as getSiteUrl } from "./wp-seo_BlJOjkiY.mjs";
import { n as isProduction } from "./site-env_4rlXcH-v.mjs";
//#region src/lib/yoast-sitemap.ts
var EMPTY_INDEX = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</sitemapindex>
`;
var EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;
var YOAST_SITEMAP_RE = /^(?:sitemap_index|[a-z][a-z0-9_-]*-sitemap[0-9]*)\.xml$/i;
function isYoastSitemapFile(name) {
	return YOAST_SITEMAP_RE.test(name.trim());
}
function stripTrailingSlash(url) {
	return url.replace(/\/+$/, "");
}
function getWpSitemapOrigin() {
	let fromAstro;
	try {
		fromAstro = void 0;
	} catch {
		fromAstro = void 0;
	}
	const fromProcess = typeof process !== "undefined" ? process.env?.WP_SITEMAP_ORIGIN : void 0;
	const raw = (fromAstro || fromProcess || getWpBaseUrl() || "").trim();
	return raw ? stripTrailingSlash(raw) : void 0;
}
function rewriteYoastSitemapXml(xml, wpBase, siteUrl) {
	const from = stripTrailingSlash(wpBase);
	const to = stripTrailingSlash(siteUrl);
	if (!from || !to || from === to) return xml;
	let fromOrigin;
	let fromHost;
	let toOrigin;
	try {
		const f = new URL(from);
		const t = new URL(to);
		fromOrigin = f.origin;
		fromHost = f.host;
		toOrigin = t.origin;
	} catch {
		return xml;
	}
	const mediaPath = /^(?:\/wp-content\/|\/wp-includes\/)/i;
	return xml.replace(/<loc>([\s\S]*?)<\/loc>/gi, (full, inner) => {
		const loc = inner.trim();
		if (!loc) return full;
		try {
			const absolute = loc.startsWith("//") ? `https:${loc}` : loc;
			const u = new URL(absolute);
			if (u.host.toLowerCase() !== fromHost.toLowerCase()) return full;
			if (mediaPath.test(u.pathname)) return full;
			u.protocol = new URL(toOrigin).protocol;
			u.host = new URL(toOrigin).host;
			return `<loc>${u.href}</loc>`;
		} catch {
			if (loc.startsWith(fromOrigin) && !mediaPath.test(loc.slice(fromOrigin.length))) return `<loc>${toOrigin}${loc.slice(fromOrigin.length)}</loc>`;
			if (loc.startsWith(from) && !mediaPath.test(loc.slice(from.length))) return `<loc>${to}${loc.slice(from.length)}</loc>`;
			return full;
		}
	});
}
function emptyYoastSitemapBody(fileName) {
	return /^sitemap_index\.xml$/i.test(fileName) ? EMPTY_INDEX : EMPTY_URLSET;
}
async function fetchYoastSitemap(fileName) {
	const name = fileName.replace(/^\/+/, "").trim();
	const contentType = "application/xml; charset=UTF-8";
	if (!isYoastSitemapFile(name)) return {
		ok: false,
		status: 404,
		body: emptyYoastSitemapBody("missing.xml"),
		contentType
	};
	const origin = getWpSitemapOrigin();
	const siteUrl = getSiteUrl();
	if (!origin || !siteUrl) {
		console.error("[yoast-sitemap] missing WP_BASE_URL/WP_SITEMAP_ORIGIN or SITE_URL — cannot proxy Yoast sitemap");
		return {
			ok: false,
			status: 503,
			body: emptyYoastSitemapBody(name),
			contentType
		};
	}
	const upstream = `${origin}/${name}`;
	let res;
	try {
		res = await fetch(upstream, {
			headers: {
				Accept: "application/xml,text/xml,*/*",
				"Cache-Control": "no-cache",
				"User-Agent": "Xoomplus-Astro-Yoast-Sitemap-Proxy/1.0"
			},
			redirect: "follow"
		});
	} catch (err) {
		console.error(`[yoast-sitemap] fetch failed for ${upstream}:`, err);
		return {
			ok: false,
			status: 502,
			body: emptyYoastSitemapBody(name),
			contentType
		};
	}
	if (!res.ok) {
		console.error(`[yoast-sitemap] upstream ${res.status} for ${upstream}`);
		return {
			ok: false,
			status: res.status === 404 ? 404 : 502,
			body: emptyYoastSitemapBody(name),
			contentType
		};
	}
	const body = rewriteYoastSitemapXml(await res.text(), origin, siteUrl);
	const upstreamType = res.headers.get("content-type");
	return {
		ok: true,
		status: 200,
		body,
		contentType: upstreamType && /xml/i.test(upstreamType) ? upstreamType : contentType
	};
}
function yoastSitemapResponse(result) {
	const headers = new Headers({
		"Content-Type": result.contentType,
		"X-Content-Type-Options": "nosniff"
	});
	if (!isProduction()) {
		headers.set("X-Robots-Tag", "noindex, nofollow");
		headers.set("Cache-Control", "private, no-store");
	} else if (result.ok) headers.set("Cache-Control", "public, max-age=300, s-maxage=600");
	else headers.set("Cache-Control", "private, no-store");
	return new Response(result.body, {
		status: result.status,
		headers
	});
}
//#endregion
export { isYoastSitemapFile as n, yoastSitemapResponse as r, fetchYoastSitemap as t };
