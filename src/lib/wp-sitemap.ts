/**
 * Build public XML sitemaps from WordPress REST data (Yoast-compatible structure).
 * All page/post <loc> values use SITE_URL — never the CMS host.
 */

import {
	getAllWpPageRoutes,
	getSiteUrl,
	getWpBaseUrl,
	withTrailingSlashPath,
	WP_SEO_PAGES,
	type WpPageKey,
} from './wp-seo';
import { withTrailingSlash } from './wp';

/** In-memory WP list cache TTL (matches HTML/ISR 300s). */
export const WP_SITEMAP_CACHE_TTL_MS = 300_000;

const MAX_URLS_PER_SITEMAP = 50_000;

/** Same-origin XSL (public/main-sitemap.xsl) — Yoast-style browser table. */
export const SITEMAP_XSL_HREF = '/main-sitemap.xsl';

/**
 * Include content for image:image entries. Nested robots field when WP supports it;
 * larger payload is accepted if WordPress ignores the nested path.
 */
const SITEMAP_FIELDS =
	'id,slug,link,modified_gmt,content.rendered,yoast_head_json.robots';

type WpRobots = { index?: string; follow?: string; [key: string]: string | undefined };

export type WpSitemapItem = {
	id: number;
	slug: string;
	link: string;
	modified_gmt: string;
	contentHtml?: string;
	yoast_head_json?: { robots?: WpRobots };
};

export type SitemapUrlEntry = {
	loc: string;
	lastmod: string;
	images: string[];
};

type CacheEntry<T> = { expires: number; data: T };

type FetchPageResult =
	| { ok: true; items: WpSitemapItem[]; totalPages: number; total: number }
	| { ok: false; status: number; reason: string };

const listCache = new Map<string, CacheEntry<unknown>>();

/** Drop sitemap WP list memos (called from /api/revalidate). */
export function clearWpCache(): void {
	listCache.clear();
}

function stripLeadingStyles(text: string): string {
	let out = text;
	let prev: string;
	do {
		prev = out;
		out = out.replace(/^\s*<style[\s\S]*?<\/style>\s*/i, '');
	} while (out !== prev);
	return out;
}

function safeParseJson(text: string): unknown {
	const clean = stripLeadingStyles(text);
	return JSON.parse(clean) as unknown;
}

function stripTrailingSlash(url: string): string {
	return url.replace(/\/+$/, '');
}

/** Escape text for XML element content. */
export function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** WordPress `modified_gmt` → ISO 8601 with +00:00 (Yoast XSL date formatting). */
export function toLastmodIso(modifiedGmt: string): string {
	const raw = (modifiedGmt || '').trim();
	if (!raw) return '';
	if (/[+-]\d{2}:\d{2}$/.test(raw)) return raw;
	if (/[zZ]$/.test(raw)) return `${raw.slice(0, -1)}+00:00`;
	return `${raw}+00:00`;
}

function isNoindex(item: WpSitemapItem): boolean {
	return item.yoast_head_json?.robots?.index === 'noindex';
}

/**
 * Map a WordPress page to the public Astro/SITE_URL path.
 * Prefer the SEO route map for known page IDs; otherwise use the CMS permalink path
 * rewritten onto the public site (matches Yoast page inventory).
 */
export async function wpUrlToSitePath(page: {
	id: number;
	slug?: string;
	link?: string;
}): Promise<string | null> {
	const routes = await getAllWpPageRoutes();
	const hit = routes.find((r) => r.id === page.id);
	if (hit) return withTrailingSlashPath(hit.route);

	for (const [key, entry] of Object.entries(WP_SEO_PAGES) as [
		WpPageKey,
		{ id: number },
	][]) {
		if (entry.id === page.id) {
			const live = routes.find((r) => r.key === key);
			if (live) return withTrailingSlashPath(live.route);
		}
	}

	if (!page.link) return null;
	try {
		const pathname = new URL(page.link).pathname || '/';
		if (!pathname.startsWith('/')) return null;
		// Skip obvious non-public / feed-like paths
		if (/^\/(wp-admin|wp-json|feed|comments\/feed)(\/|$)/i.test(pathname)) {
			return null;
		}
		return pathname === '/' ? '/' : withTrailingSlash(pathname);
	} catch {
		return null;
	}
}

/** Absolute public URL for a site path (trailing-slash rules applied). */
export function siteAbsoluteUrl(siteUrl: string, path: string): string {
	const origin = stripTrailingSlash(siteUrl);
	const pathname = path === '/' ? '/' : withTrailingSlashPath(path);
	return `${origin}${pathname === '/' ? '/' : pathname}`;
}

/**
 * Public post URL from the CMS `link` path on SITE_URL
 * (/%category%/%postname%/ — never /blogs/<slug>/).
 */
export function postSiteUrlFromLink(link: string, siteUrl: string, slug: string): string | null {
	let pathname = '';
	try {
		pathname = new URL(link).pathname;
	} catch {
		return null;
	}
	const normalized = pathname.replace(/\/+$/, '') || '/';
	if (normalized === '/' || !normalized.endsWith(`/${slug}`)) {
		return null;
	}
	if (/^\/blogs\/[^/]+$/.test(normalized)) {
		return null;
	}
	return siteAbsoluteUrl(siteUrl, withTrailingSlash(normalized));
}

/** Rewrite any CMS-host URL onto SITE_URL (keeps /wp-content/ paths). */
export function rewriteToSiteUrl(url: string, siteUrl: string, wpBase?: string): string {
	const absolute = url.startsWith('//') ? `https:${url}` : url;
	try {
		const u = new URL(absolute, siteUrl);
		const site = new URL(stripTrailingSlash(siteUrl));
		if (wpBase) {
			const wp = new URL(stripTrailingSlash(wpBase));
			if (u.host.toLowerCase() === wp.host.toLowerCase()) {
				u.protocol = site.protocol;
				u.host = site.host;
			}
		}
		// Also force known public host when already on a different host but path is media
		if (u.host.toLowerCase() !== site.host.toLowerCase() && /\/wp-content\//i.test(u.pathname)) {
			u.protocol = site.protocol;
			u.host = site.host;
		}
		return u.href;
	} catch {
		return url;
	}
}

function looksLikeImageUrl(url: string): boolean {
	if (!url || url.startsWith('data:')) return false;
	if (/\/wp-includes\//i.test(url)) return false;
	if (/\/wp-content\/themes\//i.test(url)) return false;
	if (/\/wp-content\/plugins\//i.test(url)) return false;
	// Yoast sitemap images are almost always media library uploads
	if (!/\/wp-content\/uploads\//i.test(url)) return false;
	if (/\.svg(?:\?|#|$)/i.test(url)) return false;
	return true;
}

/** Collapse WP size variants (`-300x200`) so each upload is listed once. */
function canonicalUploadUrl(url: string): string {
	try {
		const u = new URL(url);
		u.pathname = u.pathname.replace(/-\d+x\d+(?=\.[a-zA-Z0-9]+$)/, '');
		u.search = '';
		u.hash = '';
		return u.href;
	} catch {
		return url
			.replace(/-\d+x\d+(?=\.[a-zA-Z0-9]+(?:\?|#|$))/, '')
			.replace(/\?.*$/, '')
			.replace(/#.*$/, '');
	}
}

/** Collect unique content images for image:image sitemap entries (Yoast-style). */
export function extractImageUrls(
	html: string,
	siteUrl: string,
	wpBase?: string,
): string[] {
	if (!html) return [];
	const found = new Set<string>();

	const consider = (raw: string) => {
		const trimmed = raw.trim();
		if (!trimmed) return;
		const rewritten = rewriteToSiteUrl(trimmed, siteUrl, wpBase);
		if (!looksLikeImageUrl(rewritten)) return;
		found.add(canonicalUploadUrl(rewritten));
	};

	// Prefer primary src attributes — avoid exploding srcset into many size URLs
	for (const m of html.matchAll(/\b(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi)) {
		consider(m[1]);
	}

	return [...found];
}

async function fetchWpCollectionPage(
	type: 'pages' | 'posts',
	page: number,
	wpBase: string,
): Promise<FetchPageResult> {
	const base = stripTrailingSlash(wpBase);
	const url = `${base}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=${encodeURIComponent(SITEMAP_FIELDS)}`;

	let response: Response;
	try {
		response = await fetch(url, {
			signal: AbortSignal.timeout(60_000),
			headers: { Accept: 'application/json' },
		});
	} catch (err) {
		const reason = err instanceof Error ? err.message : String(err);
		console.error(`[wp-sitemap] fetch ${type} page ${page} failed:`, reason);
		return { ok: false, status: 0, reason };
	}

	if (!response.ok) {
		const reason = `HTTP ${response.status}`;
		console.error(`[wp-sitemap] ${type} page ${page} ${reason}`);
		return { ok: false, status: response.status, reason };
	}

	const totalPagesHeader = response.headers.get('X-WP-TotalPages');
	const totalHeader = response.headers.get('X-WP-Total');
	const totalPages = Math.max(1, parseInt(totalPagesHeader || '1', 10) || 1);
	const total = parseInt(totalHeader || '0', 10) || 0;

	const text = await response.text();
	let data: unknown;
	try {
		data = safeParseJson(text);
	} catch (err) {
		const reason = err instanceof Error ? err.message : String(err);
		console.error(`[wp-sitemap] JSON parse failed for ${type} page ${page}:`, reason);
		return { ok: false, status: response.status, reason: `json-parse: ${reason}` };
	}

	if (!Array.isArray(data)) {
		console.error(`[wp-sitemap] expected array for ${type} page ${page}`);
		return { ok: false, status: response.status, reason: 'not-array' };
	}

	const items: WpSitemapItem[] = [];
	for (const row of data) {
		if (!row || typeof row !== 'object') continue;
		const r = row as Record<string, unknown>;
		const id = typeof r.id === 'number' ? r.id : null;
		const slug = typeof r.slug === 'string' ? r.slug : '';
		const link = typeof r.link === 'string' ? r.link : '';
		const modified_gmt = typeof r.modified_gmt === 'string' ? r.modified_gmt : '';
		if (id == null || !slug) continue;

		let contentHtml = '';
		const content = r.content;
		if (content && typeof content === 'object' && !Array.isArray(content)) {
			const rendered = (content as { rendered?: unknown }).rendered;
			if (typeof rendered === 'string') contentHtml = rendered;
		}

		items.push({
			id,
			slug,
			link,
			modified_gmt,
			contentHtml,
			yoast_head_json: r.yoast_head_json as WpSitemapItem['yoast_head_json'],
		});
	}

	return { ok: true, items, totalPages, total };
}

/**
 * Fetch every REST page for pages|posts. Does not cache partial results when
 * pagination fails mid-way.
 */
async function fetchAllWpCollection(type: 'pages' | 'posts'): Promise<WpSitemapItem[]> {
	const wpBase = getWpBaseUrl();
	if (!wpBase) {
		console.error(`[wp-sitemap] WP_BASE_URL missing — cannot fetch ${type}`);
		return [];
	}

	const cacheKey = `wp-sitemap:${type}`;
	const hit = listCache.get(cacheKey) as CacheEntry<WpSitemapItem[]> | undefined;
	if (hit && hit.expires > Date.now()) {
		return hit.data;
	}

	const first = await fetchWpCollectionPage(type, 1, wpBase);
	if (!first.ok) {
		console.error(
			`[wp-sitemap] aborting ${type} sitemap — page 1 failed (${first.reason})`,
		);
		return [];
	}

	const all = [...first.items];
	const totalPages = first.totalPages;

	if (totalPages > 1) {
		const rest = await Promise.all(
			Array.from({ length: totalPages - 1 }, (_, i) =>
				fetchWpCollectionPage(type, i + 2, wpBase),
			),
		);
		for (let i = 0; i < rest.length; i++) {
			const page = rest[i];
			if (!page.ok) {
				console.error(
					`[wp-sitemap] aborting ${type} sitemap — page ${i + 2} failed (${page.reason}); not caching partial results`,
				);
				return [];
			}
			all.push(...page.items);
		}
	}

	if (first.total > 0 && all.length < first.total) {
		console.warn(
			`[wp-sitemap] ${type}: fetched ${all.length} items but X-WP-Total=${first.total}`,
		);
	}

	listCache.set(cacheKey, {
		expires: Date.now() + WP_SITEMAP_CACHE_TTL_MS,
		data: all,
	});
	return all;
}

function newestLastmod(entries: SitemapUrlEntry[]): string {
	let best = '';
	for (const e of entries) {
		if (e.lastmod && (!best || e.lastmod > best)) best = e.lastmod;
	}
	return best;
}

export async function buildPageSitemapEntries(): Promise<SitemapUrlEntry[]> {
	const siteUrl = getSiteUrl();
	const wpBase = getWpBaseUrl();
	if (!siteUrl) {
		console.error('[wp-sitemap] SITE_URL missing — cannot build page sitemap');
		return [];
	}

	const pages = await fetchAllWpCollection('pages');
	const entries: SitemapUrlEntry[] = [];
	const seen = new Set<string>();

	for (const page of pages) {
		if (isNoindex(page)) continue;

		const path = await wpUrlToSitePath(page);
		if (!path) {
			console.warn(
				`[wp-sitemap] skip WP page id=${page.id} slug="${page.slug}" — no public path`,
			);
			continue;
		}

		const loc = siteAbsoluteUrl(siteUrl, path);
		if (seen.has(loc)) continue;
		seen.add(loc);

		entries.push({
			loc,
			lastmod: toLastmodIso(page.modified_gmt),
			images: extractImageUrls(page.contentHtml || '', siteUrl, wpBase),
		});

		if (entries.length >= MAX_URLS_PER_SITEMAP) break;
	}

	return entries;
}

export async function buildPostSitemapEntries(): Promise<SitemapUrlEntry[]> {
	const siteUrl = getSiteUrl();
	const wpBase = getWpBaseUrl();
	if (!siteUrl) {
		console.error('[wp-sitemap] SITE_URL missing — cannot build post sitemap');
		return [];
	}

	const posts = await fetchAllWpCollection('posts');
	const entries: SitemapUrlEntry[] = [];
	const seen = new Set<string>();

	for (const post of posts) {
		if (isNoindex(post)) continue;

		const loc = postSiteUrlFromLink(post.link, siteUrl, post.slug);
		if (!loc) {
			console.warn(
				`[wp-sitemap] skip post id=${post.id} slug="${post.slug}" — cannot derive public URL from link`,
			);
			continue;
		}

		if (seen.has(loc)) continue;
		seen.add(loc);

		entries.push({
			loc,
			lastmod: toLastmodIso(post.modified_gmt),
			images: extractImageUrls(post.contentHtml || '', siteUrl, wpBase),
		});

		if (entries.length >= MAX_URLS_PER_SITEMAP) break;
	}

	return entries;
}

function renderImagesXml(images: string[]): string {
	if (!images.length) return '';
	return images
		.map(
			(src) => `
		<image:image>
			<image:loc>${escapeXml(src)}</image:loc>
		</image:image>`,
		)
		.join('');
}

export function renderUrlSet(entries: SitemapUrlEntry[]): string {
	const urls = entries
		.map((e) => {
			const imagesXml = renderImagesXml(e.images);
			return `	<url>
		<loc>${escapeXml(e.loc)}</loc>${
			e.lastmod
				? `
		<lastmod>${escapeXml(e.lastmod)}</lastmod>`
				: ''
		}${imagesXml}
	</url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${SITEMAP_XSL_HREF}"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export type SitemapIndexChild = {
	path: string;
	lastmod: string;
};

export async function buildSitemapIndexChildren(): Promise<SitemapIndexChild[]> {
	const [posts, pages] = await Promise.all([
		buildPostSitemapEntries(),
		buildPageSitemapEntries(),
	]);

	// Yoast order: posts first, then pages
	return [
		{ path: '/post-sitemap.xml', lastmod: newestLastmod(posts) },
		{ path: '/page-sitemap.xml', lastmod: newestLastmod(pages) },
	];
}

export function renderSitemapIndex(
	siteUrl: string,
	children: SitemapIndexChild[],
): string {
	const origin = stripTrailingSlash(siteUrl);
	const body = children
		.map((c) => {
			const loc = `${origin}${c.path.startsWith('/') ? c.path : `/${c.path}`}`;
			return `	<sitemap>
		<loc>${escapeXml(loc)}</loc>${
			c.lastmod
				? `
		<lastmod>${escapeXml(c.lastmod)}</lastmod>`
				: ''
		}
	</sitemap>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${SITEMAP_XSL_HREF}"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export const SITEMAP_XML_HEADERS = {
	'Content-Type': 'application/xml; charset=utf-8',
	'Cache-Control': 'public, max-age=300',
} as const;

export function sitemapXmlResponse(body: string, status = 200): Response {
	return new Response(body, {
		status,
		headers: { ...SITEMAP_XML_HEADERS },
	});
}
