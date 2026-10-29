/**
 * Public XML sitemaps (SSR, not Cloudflare-cached).
 * - page-sitemap: indexable Astro marketing routes.
 * - post-sitemap: published WordPress posts that Yoast marks indexable,
 *   rewritten onto SITE_URL.
 */

import {
	getSiteUrl,
	withTrailingSlashPath,
	WP_PAGE_FALLBACK_ROUTES,
} from './wp-seo';
import { withTrailingSlash } from './wp';
import {
	getLiveChildServices,
	isDisabledChildPath,
	mainServices,
} from '../data/services/index';
import { caseStudies } from '../data/caseStudies';
import { locations } from '../data/locations';
import { RESPECT_CMS_NOINDEX } from '../config';

export const WP_SITEMAP_CACHE_TTL_MS = 300_000;
const STALE_TTL_MS = 30 * 60_000;
const FETCH_TIMEOUT_MS = 10_000;
const MAX_URLS_PER_SITEMAP = 50_000;
const SITEMAP_FIELDS = 'id,slug,link,modified_gmt,yoast_head_json';

export type SitemapUrlEntry = {
	loc: string;
	lastmod: string;
	images: string[];
};

type WpSitemapItem = {
	id: number;
	slug: string;
	link: string;
	modified_gmt: string;
	/** True when Yoast robots.index === "noindex". */
	noindex: boolean;
};

type EntryCache = {
	expires: number;
	staleUntil: number;
	data: SitemapUrlEntry[];
};

const entryCache = new Map<string, EntryCache>();
const listCache = new Map<
	string,
	{ expires: number; staleUntil: number; data: WpSitemapItem[] }
>();

/** Drop sitemap memos (called from /api/revalidate). */
export function clearWpCache(): void {
	listCache.clear();
	entryCache.clear();
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

export function toLastmodIso(modifiedGmt: string): string {
	const raw = (modifiedGmt || '').trim();
	if (!raw) return '';
	if (/[+-]\d{2}:\d{2}$/.test(raw)) return raw;
	if (/[zZ]$/.test(raw)) return `${raw.slice(0, -1)}+00:00`;
	return `${raw}+00:00`;
}

export function siteAbsoluteUrl(siteUrl: string, path: string): string {
	const origin = stripTrailingSlash(siteUrl);
	const pathname = path === '/' ? '/' : withTrailingSlashPath(path);
	return `${origin}${pathname === '/' ? '/' : pathname}`;
}

export function postSiteUrlFromLink(
	link: string,
	siteUrl: string,
	slug: string,
): string | null {
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

/**
 * Read WP_BASE_URL from process.env at request time (runtime wins).
 * Throws if missing or equal to SITE_URL (misconfigured to Astro itself).
 */
export function requireWpBaseUrl(): string {
	const raw =
		(typeof process !== 'undefined' ? process.env.WP_BASE_URL : undefined) ||
		'';
	const wpBase = stripTrailingSlash(raw.trim());
	if (!wpBase) {
		throw new Error(
			'[wp-sitemap] WP_BASE_URL is missing — set it to the WordPress CMS origin (not the Astro site).',
		);
	}

	const siteRaw =
		getSiteUrl() ||
		(typeof process !== 'undefined' ? process.env.SITE_URL : undefined) ||
		'';
	const site = stripTrailingSlash(siteRaw.trim());
	if (site) {
		try {
			const wpHost = new URL(wpBase).host.toLowerCase();
			const siteHost = new URL(site).host.toLowerCase();
			if (wpHost === siteHost) {
				throw new Error(
					`[wp-sitemap] WP_BASE_URL (${wpBase}) equals SITE_URL host — it must point at WordPress, not Astro.`,
				);
			}
		} catch (err) {
			if (err instanceof Error && err.message.startsWith('[wp-sitemap]')) throw err;
			throw new Error(`[wp-sitemap] invalid WP_BASE_URL or SITE_URL: ${String(err)}`);
		}
	}

	console.error(`[wp-sitemap] WP_BASE_URL (runtime)=${wpBase}`);
	return wpBase;
}

function resolveSiteUrl(fallback?: string): string {
	const site =
		getSiteUrl() ||
		(typeof process !== 'undefined' ? process.env.SITE_URL?.trim() : undefined) ||
		fallback?.replace(/\/+$/, '');
	if (!site) {
		throw new Error('[wp-sitemap] SITE_URL missing — cannot build sitemap locs.');
	}
	return stripTrailingSlash(site);
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

async function fetchWpJsonOnce(url: string): Promise<{
	status: number;
	contentType: string;
	total: string | null;
	totalPages: string | null;
	text: string;
}> {
	const response = await fetch(url, {
		signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
		headers: { Accept: 'application/json' },
	});
	const contentType = response.headers.get('content-type') || '';
	const text = await response.text();
	return {
		status: response.status,
		contentType,
		total: response.headers.get('X-WP-Total'),
		totalPages: response.headers.get('X-WP-TotalPages'),
		text,
	};
}

/** 10s timeout + one retry. Validates JSON content-type. Throws on failure. */
async function fetchWpJson(url: string): Promise<{
	status: number;
	contentType: string;
	total: number;
	totalPages: number;
	data: unknown;
}> {
	let lastErr: Error | null = null;

	for (let attempt = 1; attempt <= 2; attempt++) {
		try {
			console.error(`[wp-sitemap] GET ${url} (attempt ${attempt})`);
			const res = await fetchWpJsonOnce(url);
			console.error(
				`[wp-sitemap] status=${res.status} content-type=${res.contentType} X-WP-Total=${res.total} X-WP-TotalPages=${res.totalPages}`,
			);

			if (!res.status || res.status >= 400) {
				throw new Error(`HTTP ${res.status} for ${url}`);
			}

			if (!/json/i.test(res.contentType)) {
				throw new Error(
					`Expected JSON content-type for ${url}, got "${res.contentType}" body[0..120]=${res.text.slice(0, 120)}`,
				);
			}

			const data = JSON.parse(stripLeadingStyles(res.text)) as unknown;
			return {
				status: res.status,
				contentType: res.contentType,
				total: parseInt(res.total || '0', 10) || 0,
				totalPages: Math.max(1, parseInt(res.totalPages || '1', 10) || 1),
				data,
			};
		} catch (err) {
			lastErr = err instanceof Error ? err : new Error(String(err));
			console.error(`[wp-sitemap] fetch failed for ${url}:`, lastErr.message);
			if (attempt < 2) await sleep(300);
		}
	}

	throw lastErr ?? new Error(`fetch failed for ${url}`);
}

async function fetchWpCollectionPage(
	type: 'posts',
	page: number,
	wpBase: string,
): Promise<{ items: WpSitemapItem[]; totalPages: number; total: number }> {
	const url = `${stripTrailingSlash(wpBase)}/wp-json/wp/v2/${type}?per_page=100&page=${page}&_fields=${encodeURIComponent(SITEMAP_FIELDS)}`;
	const res = await fetchWpJson(url);

	if (!Array.isArray(res.data)) {
		throw new Error(`[wp-sitemap] expected array for ${type} page ${page}`);
	}

	const items: WpSitemapItem[] = [];
	for (const row of res.data) {
		if (!row || typeof row !== 'object') continue;
		const r = row as Record<string, unknown>;
		const id = typeof r.id === 'number' ? r.id : null;
		const slug = typeof r.slug === 'string' ? r.slug : '';
		const link = typeof r.link === 'string' ? r.link : '';
		const modified_gmt = typeof r.modified_gmt === 'string' ? r.modified_gmt : '';
		if (id == null || !slug) continue;
		const yoast =
			r.yoast_head_json && typeof r.yoast_head_json === 'object'
				? (r.yoast_head_json as { robots?: { index?: string } })
				: null;
		const noindex = yoast?.robots?.index === 'noindex';
		items.push({ id, slug, link, modified_gmt, noindex });
	}

	console.error(
		`[wp-sitemap] ${type} page=${page} parsed_array_length=${res.data.length} kept_items=${items.length}`,
	);

	return { items, totalPages: res.totalPages, total: res.total };
}

async function fetchAllWpPosts(): Promise<{ items: WpSitemapItem[]; fromCache: boolean }> {
	const wpBase = requireWpBaseUrl();
	const cacheKey = 'wp-sitemap:posts';
	const now = Date.now();
	const hit = listCache.get(cacheKey);

	if (hit && hit.expires > now) {
		console.error(`[wp-sitemap] posts list from cache (fresh) count=${hit.data.length}`);
		return { items: hit.data, fromCache: true };
	}

	if (hit && hit.staleUntil > now) {
		console.error(
			`[wp-sitemap] posts list serving STALE cache count=${hit.data.length}; refreshing in background`,
		);
		void refreshPostsList(wpBase, cacheKey).catch((err) => {
			console.error('[wp-sitemap] background posts refresh failed:', err);
		});
		return { items: hit.data, fromCache: true };
	}

	const items = await refreshPostsList(wpBase, cacheKey);
	return { items, fromCache: false };
}

async function refreshPostsList(
	wpBase: string,
	cacheKey: string,
): Promise<WpSitemapItem[]> {
	const first = await fetchWpCollectionPage('posts', 1, wpBase);
	const all = [...first.items];

	if (first.totalPages > 1) {
		for (let page = 2; page <= first.totalPages; page++) {
			const next = await fetchWpCollectionPage('posts', page, wpBase);
			all.push(...next.items);
		}
	}

	console.error(
		`[wp-sitemap] posts fetched_total=${all.length} X-WP-Total=${first.total}`,
	);

	if (!all.length) {
		throw new Error('[wp-sitemap] WordPress returned zero posts');
	}

	const now = Date.now();
	listCache.set(cacheKey, {
		expires: now + WP_SITEMAP_CACHE_TTL_MS,
		staleUntil: now + STALE_TTL_MS,
		data: all,
	});
	return all;
}

function collectStaticPagePaths(): string[] {
	const paths = new Set<string>();

	for (const route of Object.values(WP_PAGE_FALLBACK_ROUTES)) {
		paths.add(route === '/' ? '/' : withTrailingSlashPath(route));
	}
	for (const route of ['/pricing', '/privacy-policy']) {
		paths.add(withTrailingSlashPath(route));
	}
	for (const loc of locations) {
		paths.add(withTrailingSlashPath(`/locations/${loc.slug}`));
	}
	for (const study of caseStudies) {
		paths.add(withTrailingSlashPath(`/case-studies/${study.slug}`));
	}
	for (const service of mainServices) {
		paths.add(withTrailingSlashPath(`/services/${service.slug}`));
		for (const child of getLiveChildServices(service)) {
			paths.add(withTrailingSlashPath(`/services/${service.slug}/${child.slug}`));
		}
	}

	return [...paths];
}

function newestLastmod(entries: SitemapUrlEntry[]): string {
	let best = '';
	for (const e of entries) {
		if (e.lastmod && (!best || e.lastmod > best)) best = e.lastmod;
	}
	return best;
}

function getCachedEntries(key: string): EntryCache | undefined {
	return entryCache.get(key);
}

function setCachedEntries(key: string, data: SitemapUrlEntry[]): void {
	if (!data.length) return; // never cache empty
	const now = Date.now();
	entryCache.set(key, {
		expires: now + WP_SITEMAP_CACHE_TTL_MS,
		staleUntil: now + STALE_TTL_MS,
		data,
	});
}

export async function buildPageSitemapEntries(
	siteUrlFallback?: string,
): Promise<SitemapUrlEntry[]> {
	const cacheKey = 'entries:pages';
	const now = Date.now();
	const cached = getCachedEntries(cacheKey);
	if (cached && cached.expires > now) {
		console.error(
			`[wp-sitemap] page entries from cache (fresh) count=${cached.data.length}`,
		);
		return cached.data;
	}

	try {
		const siteUrl = resolveSiteUrl(siteUrlFallback);
		console.error(`[wp-sitemap] page-sitemap SITE_URL=${siteUrl}`);
		console.error(
			`[wp-sitemap] page-sitemap source=astro-indexable-routes (marketing pages)`,
		);

		const rawPaths = collectStaticPagePaths();
		console.error(`[wp-sitemap] after collectStaticPagePaths=${rawPaths.length}`);

		let afterDisabled = 0;
		const afterDisabledPaths: string[] = [];
		for (const path of rawPaths) {
			if (isDisabledChildPath(path)) continue;
			afterDisabledPaths.push(path);
			afterDisabled++;
		}
		console.error(`[wp-sitemap] after disabled-child exclusion=${afterDisabled}`);

		const entries: SitemapUrlEntry[] = [];
		const seen = new Set<string>();
		for (const path of afterDisabledPaths) {
			const loc = siteAbsoluteUrl(siteUrl, path);
			if (seen.has(loc)) continue;
			seen.add(loc);
			entries.push({ loc, lastmod: '', images: [] });
			if (entries.length >= MAX_URLS_PER_SITEMAP) break;
		}
		console.error(`[wp-sitemap] after dedupe/map-to-SITE_URL=${entries.length}`);
		console.error(`[wp-sitemap] page noindex filter=n/a (Astro routes are indexable)`);

		if (!entries.length) {
			throw new Error('[wp-sitemap] page sitemap produced zero URLs');
		}

		setCachedEntries(cacheKey, entries);
		return entries;
	} catch (err) {
		if (cached && cached.staleUntil > now && cached.data.length) {
			console.error(
				`[wp-sitemap] page builder failed — serving STALE cache count=${cached.data.length}`,
				err,
			);
			return cached.data;
		}
		throw err;
	}
}

export async function buildPostSitemapEntries(
	siteUrlFallback?: string,
): Promise<SitemapUrlEntry[]> {
	const cacheKey = 'entries:posts';
	const now = Date.now();
	const cached = getCachedEntries(cacheKey);
	if (cached && cached.expires > now) {
		console.error(
			`[wp-sitemap] post entries from cache (fresh) count=${cached.data.length}`,
		);
		return cached.data;
	}

	try {
		const siteUrl = resolveSiteUrl(siteUrlFallback);
		console.error(`[wp-sitemap] post-sitemap SITE_URL=${siteUrl}`);

		const { items: posts, fromCache } = await fetchAllWpPosts();
		console.error(
			`[wp-sitemap] after WP fetch posts=${posts.length} fromCache=${fromCache}`,
		);

		/**
		 * CMS host often marks every post noindex (discourage indexing / mu-plugin).
		 * That must not empty the public sitemap. Only honor per-post noindex when
		 * Yoast also returns at least one indexable post (mixed profile).
		 */
		const anyIndexable = posts.some((p) => !p.noindex);
		const honorPerPostNoindex = RESPECT_CMS_NOINDEX && anyIndexable;
		if (RESPECT_CMS_NOINDEX && !anyIndexable) {
			console.error(
				`[wp-sitemap] all ${posts.length} posts are Yoast noindex on CMS — treating as site-wide CMS policy; including all published posts`,
			);
		}

		let afterPathMap = 0;
		let skippedPath = 0;
		let skippedNoindex = 0;
		const entries: SitemapUrlEntry[] = [];
		const seen = new Set<string>();

		for (const post of posts) {
			if (honorPerPostNoindex && post.noindex) {
				skippedNoindex++;
				continue;
			}
			const loc = postSiteUrlFromLink(post.link, siteUrl, post.slug);
			if (!loc) {
				skippedPath++;
				continue;
			}
			afterPathMap++;
			if (seen.has(loc)) continue;
			seen.add(loc);
			entries.push({
				loc,
				lastmod: toLastmodIso(post.modified_gmt),
				images: [],
			});
			if (entries.length >= MAX_URLS_PER_SITEMAP) break;
		}

		console.error(
			`[wp-sitemap] after route/path mapping=${afterPathMap} skipped_unmappable=${skippedPath}`,
		);
		console.error(
			`[wp-sitemap] after noindex filter=${entries.length} skipped_noindex=${skippedNoindex} honorPerPostNoindex=${honorPerPostNoindex}`,
		);
		console.error(`[wp-sitemap] after exclusions/dedupe=${entries.length}`);

		if (!entries.length) {
			throw new Error('[wp-sitemap] post sitemap produced zero URLs');
		}

		setCachedEntries(cacheKey, entries);
		return entries;
	} catch (err) {
		if (cached && cached.staleUntil > now && cached.data.length) {
			console.error(
				`[wp-sitemap] post builder failed — serving STALE cache count=${cached.data.length}`,
				err,
			);
			return cached.data;
		}
		throw err;
	}
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
		.filter((e) => {
			try {
				const path = new URL(e.loc).pathname;
				return !isDisabledChildPath(path);
			} catch {
				return true;
			}
		})
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

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export type SitemapIndexChild = {
	path: string;
	lastmod: string;
};

/** All indexable pages + posts in one list (deduped by loc). */
export async function buildCombinedSitemapEntries(
	siteUrlFallback?: string,
): Promise<SitemapUrlEntry[]> {
	const [pages, posts] = await Promise.all([
		buildPageSitemapEntries(siteUrlFallback),
		buildPostSitemapEntries(siteUrlFallback),
	]);
	const seen = new Set<string>();
	const combined: SitemapUrlEntry[] = [];
	for (const entry of [...pages, ...posts]) {
		if (seen.has(entry.loc)) continue;
		seen.add(entry.loc);
		combined.push(entry);
	}
	return combined;
}

/** @deprecated Prefer buildCombinedSitemapEntries — kept for callers that still expect children. */
export async function buildSitemapIndexChildren(
	siteUrlFallback?: string,
): Promise<SitemapIndexChild[]> {
	const combined = await buildCombinedSitemapEntries(siteUrlFallback);
	return [
		{ path: '/sitemap_index.xml', lastmod: newestLastmod(combined) },
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

	return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

/** Never edge-cache sitemaps — CF was pinning empty/old Yoast XML for a year. */
export const SITEMAP_XML_HEADERS = {
	'Content-Type': 'application/xml; charset=utf-8',
	'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
	'CDN-Cache-Control': 'no-store',
	'Cloudflare-CDN-Cache-Control': 'no-store',
	Pragma: 'no-cache',
	Expires: '0',
} as const;

export function sitemapXmlResponse(
	body: string,
	status = 200,
	extraHeaders?: Record<string, string>,
): Response {
	return new Response(body, {
		status,
		headers: { ...SITEMAP_XML_HEADERS, ...extraHeaders },
	});
}

/** Empty / failed sitemap — never cache. */
export function sitemapUnavailableResponse(reason: string): Response {
	console.error(`[wp-sitemap] responding 503: ${reason}`);
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`,
		{
			status: 503,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'no-store',
				'Retry-After': '300',
				'X-Sitemap-Error': reason.slice(0, 200),
			},
		},
	);
}
