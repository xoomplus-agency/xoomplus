/**
 * WordPress posts (blog) — build-time fetch only.
 * Base: PUBLIC_WP_API (default https://xoomplus.co.uk/wp-json/wp/v2)
 *
 * Returns every published post (WP REST default status=publish). Never filters
 * by Yoast robots/noindex or category — noindex posts still render and link.
 */

import fs from 'node:fs';
import path from 'node:path';

export type WpPostImage = {
	src: string;
	srcset: string;
	width: number;
	height: number;
	alt: string;
};

export type WpPost = {
	id: number;
	slug: string;
	/** CMS publish date (`date`), not `modified`. */
	date: string;
	status: string;
	title: string;
	excerpt: string;
	category: string;
	/** Frontend pathname from CMS `link` (trailing slash), e.g. `/digital-marketing/my-post/`. */
	path: string;
	/** First URL segment (category). */
	categorySlug: string;
	/** Last URL segment (equals CMS post slug). */
	postSlug: string;
	/** True when yoast_head_json.robots.index === "noindex". */
	noindex: boolean;
	image: WpPostImage | null;
	content: string;
};

const DEFAULT_API = 'https://xoomplus.co.uk/wp-json/wp/v2';

const POST_FIELDS =
	'id,slug,link,date,status,title,excerpt,content,featured_media,categories,yoast_head_json,_links,_embedded';

/** Bump when the on-disk post shape changes so stale caches are discarded. */
const WP_POSTS_CACHE_VERSION = 3;

/** Dev disk-cache TTL (seconds). */
const DISK_CACHE_TTL_SEC = 60;

const DISK_CACHE_FILE = path.join(
	process.cwd(),
	'node_modules',
	'.cache',
	'wp-cache.json',
);

type DiskCachePayload = {
	version: number;
	fetchedAt: number;
	posts: WpPost[];
};

/** Set by middleware when `?refresh=1` — forces a live refetch in dev. */
let forceRefresh = false;

/** Prefer these size keys (in order) for the primary `src`. */
const PREFERRED_SIZES = ['medium_large', 'large', 'full'] as const;

type WpMediaSize = {
	file?: string;
	width?: number;
	height?: number;
	mime_type?: string;
	source_url?: string;
};

type WpFeaturedMedia = {
	alt_text?: string;
	source_url?: string;
	media_details?: {
		width?: number;
		height?: number;
		sizes?: Record<string, WpMediaSize>;
	};
};

type WpTerm = {
	taxonomy?: string;
	name?: string;
	slug?: string;
};

type WpYoastRobots = {
	index?: string;
	follow?: string;
	[key: string]: string | undefined;
};

type WpRawPost = {
	id?: number;
	slug?: string;
	link?: string;
	date?: string;
	status?: string;
	title?: { rendered?: string };
	excerpt?: { rendered?: string };
	content?: { rendered?: string };
	featured_media?: number;
	yoast_head_json?: {
		robots?: WpYoastRobots;
	};
	_embedded?: {
		'wp:featuredmedia'?: WpFeaturedMedia[];
		'wp:term'?: WpTerm[][];
	};
};

function getApiBase(): string {
	let fromEnv: string | undefined;
	try {
		fromEnv = import.meta.env.PUBLIC_WP_API as string | undefined;
	} catch {
		fromEnv = undefined;
	}
	const fromProcess =
		typeof process !== 'undefined' ? process.env?.PUBLIC_WP_API : undefined;
	const raw = (fromEnv || fromProcess || DEFAULT_API).trim();
	return raw.replace(/\/+$/, '');
}

function isDev(): boolean {
	try {
		return Boolean(import.meta.env.DEV);
	} catch {
		return process.env.NODE_ENV !== 'production';
	}
}

/**
 * Disk cache is development-only so production/CI builds always hit the CMS.
 * Opt out in dev with WP_CACHE=off, or force refresh via ?refresh=1.
 */
function shouldUseDiskCache(): boolean {
	if (!isDev()) return false;
	if (forceRefresh) return false;
	const flag =
		typeof process !== 'undefined' ? process.env?.WP_CACHE : undefined;
	try {
		const fromAstro = import.meta.env.WP_CACHE as string | undefined;
		const resolved = flag ?? fromAstro;
		return resolved !== 'off';
	} catch {
		return flag !== 'off';
	}
}

function isValidCachedPost(post: unknown): post is WpPost {
	if (!post || typeof post !== 'object') return false;
	const p = post as Partial<WpPost>;
	return (
		typeof p.path === 'string' &&
		p.path.length > 1 &&
		!isLegacyBlogsPostPath(p.path) &&
		typeof p.date === 'string' &&
		p.date.length > 0 &&
		typeof p.status === 'string' &&
		p.status.length > 0
	);
}

/** True for legacy `/blogs/<slug>/` post URLs (listing `/blogs` is fine elsewhere). */
function isLegacyBlogsPostPath(pathname: string): boolean {
	const cleaned = pathname.replace(/\/+$/, '') || '/';
	return /^\/blogs\/[^/]+$/.test(cleaned);
}

function readDiskCache(): WpPost[] | null {
	try {
		if (!fs.existsSync(DISK_CACHE_FILE)) return null;
		const raw = fs.readFileSync(DISK_CACHE_FILE, 'utf8');
		const data = JSON.parse(raw) as unknown;

		// Legacy: bare array (pre-versioned) — always discard.
		if (Array.isArray(data)) {
			console.warn('[wp] disk cache discarded (pre-versioned / missing path schema)');
			return null;
		}

		const payload = data as Partial<DiskCachePayload>;
		if (payload.version !== WP_POSTS_CACHE_VERSION) {
			console.warn(
				`[wp] disk cache discarded (version ${String(payload.version)} ≠ ${WP_POSTS_CACHE_VERSION})`,
			);
			return null;
		}
		const fetchedAt = typeof payload.fetchedAt === 'number' ? payload.fetchedAt : 0;
		const ageSec = (Date.now() - fetchedAt) / 1000;
		if (!fetchedAt || ageSec > DISK_CACHE_TTL_SEC) {
			console.warn(
				`[wp] disk cache expired (age ${Math.round(ageSec)}s > ${DISK_CACHE_TTL_SEC}s) — refetching`,
			);
			return null;
		}
		if (!Array.isArray(payload.posts) || payload.posts.length === 0) return null;
		if (!payload.posts.every(isValidCachedPost)) {
			console.warn(
				'[wp] disk cache discarded (one or more posts missing path/date/status)',
			);
			return null;
		}

		console.warn(
			`[wp] disk cache hit (${payload.posts.length} posts, age ${Math.round(ageSec)}s) — DEV only`,
		);
		return payload.posts;
	} catch (err) {
		console.warn('[wp] disk cache read failed — fetching live:', err);
		return null;
	}
}

function writeDiskCache(posts: WpPost[]): void {
	try {
		fs.mkdirSync(path.dirname(DISK_CACHE_FILE), { recursive: true });
		const payload: DiskCachePayload = {
			version: WP_POSTS_CACHE_VERSION,
			fetchedAt: Date.now(),
			posts,
		};
		fs.writeFileSync(DISK_CACHE_FILE, JSON.stringify(payload), 'utf8');
		console.warn(`[wp] disk cache wrote ${posts.length} posts → ${DISK_CACHE_FILE}`);
	} catch (err) {
		console.warn('[wp] disk cache write failed:', err);
	}
}
/** Strip Elementor (and similar) leading <style> blocks before JSON.parse. */
function stripLeadingStyles(text: string): string {
	let out = text;
	let prev: string;
	do {
		prev = out;
		out = out.replace(/^\s*<style[\s\S]*?<\/style>\s*/i, '');
	} while (out !== prev);
	return out;
}

function decodeEntities(text: string): string {
	return text
		.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
		.replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&#8217;/g, '\u2019')
		.replace(/&#8216;/g, '\u2018')
		.replace(/&#8220;/g, '\u201C')
		.replace(/&#8221;/g, '\u201D')
		.replace(/&#8211;/g, '\u2013')
		.replace(/&#8212;/g, '\u2014')
		.replace(/&nbsp;/g, ' ');
}

function stripTags(html: string): string {
	return html.replace(/<[^>]*>/g, ' ');
}

function collapseWhitespace(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function plainFromHtml(html: string): string {
	return collapseWhitespace(decodeEntities(stripTags(html || '')));
}

/** Trim to ~120 chars on a word boundary with an ellipsis. */
function trimExcerpt(text: string, max = 120): string {
	if (text.length <= max) return text;
	const slice = text.slice(0, max + 1);
	const lastSpace = slice.lastIndexOf(' ');
	const cut = lastSpace > 40 ? slice.slice(0, lastSpace) : text.slice(0, max);
	return `${cut.replace(/[.,;:!\s]+$/u, '')}…`;
}

function buildExcerpt(excerptHtml: string, contentHtml: string): string {
	const fromExcerpt = plainFromHtml(excerptHtml);
	const base = fromExcerpt || plainFromHtml(contentHtml);
	return trimExcerpt(base);
}

function firstCategoryTerm(
	terms: WpTerm[][] | undefined,
): { name: string; slug: string } | null {
	if (!terms?.length) return null;
	for (const group of terms) {
		for (const term of group) {
			if (term.taxonomy !== 'category') continue;
			const name = plainFromHtml(term.name || '');
			const slug = (term.slug || '').trim();
			if (!name && !slug) continue;
			if (/^uncategorised$/i.test(name) || /^uncategorized$/i.test(name)) continue;
			if (/^uncategorized$/i.test(slug) || /^uncategorised$/i.test(slug)) continue;
			return { name: name || slug, slug: slug || 'uncategorized' };
		}
	}
	return null;
}

/** Site paths use a trailing slash (matches WordPress permalinks). */
export function withTrailingSlash(path: string): string {
	if (!path || path === '/') return '/';
	const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
	const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
	return `${withSlash}/`;
}

/**
 * Canonical frontend URL for a post — always the WordPress path (`/<category>/<slug>/`).
 * Never `/blogs/<slug>/`. Throws at build time if `path` is missing.
 */
/**
 * Shared category key for /blogs chips + card `data-category`.
 * Lowercased trim; empty → "". "All articles" → "all".
 */
export function categoryKey(nameOrSlug: string): string {
	const t = (nameOrSlug || '').trim().toLowerCase();
	if (!t) return '';
	if (t === 'all articles' || t === 'all') return 'all';
	return t;
}

export function postUrl(post: Pick<WpPost, 'path' | 'slug' | 'id' | 'title'>): string {
	const pathValue = typeof post.path === 'string' ? post.path.trim() : '';
	if (!pathValue || pathValue === '/') {
		const label = post.slug || post.title || String(post.id ?? '?');
		throw new Error(
			`[wp] postUrl: post "${label}" has no path — cannot fall back to /blogs/<slug>`,
		);
	}
	if (isLegacyBlogsPostPath(pathValue)) {
		const label = post.slug || post.title || String(post.id ?? '?');
		throw new Error(
			`[wp] postUrl: post "${label}" still has legacy path "${pathValue}" — refetch CMS link`,
		);
	}
	return pathValue;
}

function resolvePostPath(
	link: string | undefined,
	slug: string,
	categorySlug: string,
): { path: string; categorySlug: string; postSlug: string; usedFallback: boolean } {
	const postSlug = slug;
	let usedFallback = false;
	let pathname = '';

	if (link) {
		try {
			pathname = new URL(link).pathname;
		} catch {
			pathname = '';
		}
	}

	const normalized = pathname.replace(/\/+$/, '');
	const endsWithSlug =
		normalized === `/${postSlug}` || normalized.endsWith(`/${postSlug}`);

	if (!pathname || !endsWithSlug) {
		usedFallback = true;
		const cat = categorySlug || 'uncategorized';
		console.warn(
			`[wp] post "${slug}": CMS link missing or path does not end with slug — fallback /${cat}/${slug}/`,
		);
		return {
			path: withTrailingSlash(`/${cat}/${postSlug}`),
			categorySlug: cat,
			postSlug,
			usedFallback,
		};
	}

	const segments = normalized.split('/').filter(Boolean);
	const catFromPath = segments.length >= 2 ? segments[0] : categorySlug || 'uncategorized';
	return {
		path: withTrailingSlash(normalized),
		categorySlug: catFromPath,
		postSlug: segments[segments.length - 1] || postSlug,
		usedFallback,
	};
}

function mapImage(media: WpFeaturedMedia | undefined, title: string): WpPostImage | null {
	if (!media) return null;
	const sizes = media.media_details?.sizes ?? {};
	let chosen: WpMediaSize | undefined;
	for (const key of PREFERRED_SIZES) {
		if (sizes[key]?.source_url) {
			chosen = sizes[key];
			break;
		}
	}
	const src =
		chosen?.source_url ||
		media.source_url ||
		Object.values(sizes).find((s) => s.source_url)?.source_url;
	if (!src) return null;

	const width = chosen?.width ?? media.media_details?.width ?? 1200;
	const height = chosen?.height ?? media.media_details?.height ?? 720;

	const srcsetParts: string[] = [];
	const seen = new Set<string>();
	for (const size of Object.values(sizes)) {
		if (!size?.source_url || !size.width) continue;
		const entry = `${size.source_url} ${size.width}w`;
		if (seen.has(entry)) continue;
		seen.add(entry);
		srcsetParts.push(entry);
	}
	if (media.source_url && media.media_details?.width) {
		const full = `${media.source_url} ${media.media_details.width}w`;
		if (!seen.has(full)) srcsetParts.push(full);
	}

	const alt = plainFromHtml(media.alt_text || '') || title;

	return {
		src,
		srcset: srcsetParts.join(', '),
		width,
		height,
		alt,
	};
}

export function mapWpPost(raw: WpRawPost): WpPost | null {
	const id = typeof raw.id === 'number' ? raw.id : null;
	const slug = typeof raw.slug === 'string' ? raw.slug : '';
	if (id == null || !slug) return null;

	const status = typeof raw.status === 'string' ? raw.status : 'publish';
	// Defensive: never surface drafts / private / pending / future via a leaky plugin.
	if (status !== 'publish') return null;

	const title = plainFromHtml(raw.title?.rendered || '');
	const content = raw.content?.rendered || '';
	const excerpt = buildExcerpt(raw.excerpt?.rendered || '', content);
	const term = firstCategoryTerm(raw._embedded?.['wp:term']);
	const category = term?.name || '';
	const media = raw._embedded?.['wp:featuredmedia']?.[0];
	const resolved = resolvePostPath(raw.link, slug, term?.slug || '');
	const noindex = raw.yoast_head_json?.robots?.index === 'noindex';

	return {
		id,
		slug,
		date: raw.date || '',
		status,
		title,
		excerpt,
		category,
		path: resolved.path,
		categorySlug: resolved.categorySlug,
		postSlug: resolved.postSlug,
		noindex,
		image: mapImage(media, title),
		content,
	};
}

async function fetchPostsPage(
	page: number,
	perPage: number,
): Promise<{ posts: WpRawPost[]; total: number; totalPages: number; url: string }> {
	const base = getApiBase();
	const params = new URLSearchParams({
		_embed: '1',
		per_page: String(perPage),
		page: String(page),
		status: 'publish',
		orderby: 'date',
		order: 'desc',
		_fields: POST_FIELDS,
	});
	// Production/CI only: bust CDN / CMS REST caches so a new publish is never missed.
	if (!isDev()) {
		params.set('_', String(Date.now()));
	}
	const url = `${base}/posts?${params}`;
	let res: Response;
	try {
		res = await fetch(url, {
			headers: { 'Cache-Control': 'no-cache' },
			signal: AbortSignal.timeout(25_000),
		});
	} catch (err) {
		const reason = err instanceof Error ? err.name : 'Error';
		throw new Error(`WordPress posts fetch failed (${reason}) ${url}`);
	}
	const text = await res.text();
	const clean = stripLeadingStyles(text);

	if (!res.ok) {
		throw new Error(
			`WordPress posts fetch failed (${res.status}) ${url} — ${clean.slice(0, 160)}`,
		);
	}

	let data: unknown;
	try {
		data = JSON.parse(clean);
	} catch (err) {
		throw new Error(
			`WordPress posts JSON parse failed for ${url}: ${String(err)} (body starts: ${clean.slice(0, 120)})`,
		);
	}

	if (!Array.isArray(data)) {
		throw new Error(`WordPress posts: expected an array from ${url}`);
	}

	const total = Number(res.headers.get('X-WP-Total') || '0') || 0;
	const totalPages = Number(res.headers.get('X-WP-TotalPages') || '1') || 1;
	return { posts: data as WpRawPost[], total, totalPages, url };
}

/**
 * In-flight / short-lived memo.
 * - Dev: 60s (aligned with disk TTL)
 * - `astro build`: long TTL so getStaticPaths does not refetch 100+ times
 * - Production SSR: TTL 0 — only coalesces concurrent callers in one request
 */
let allPostsPromise: Promise<WpPost[]> | null = null;
let allPostsExpiresAt = 0;

function memoryTtlMs(): number {
	if (isDev()) return DISK_CACHE_TTL_SEC * 1000;
	const life = typeof process !== 'undefined' ? process.env?.npm_lifecycle_event : '';
	const argv = typeof process !== 'undefined' ? process.argv.join(' ') : '';
	if (life === 'build' || life === 'prebuild' || /\bastro\s+build\b/.test(argv)) {
		return 30 * 60 * 1000;
	}
	return 0;
}

/** Drop in-memory + disk memo so the next getPosts() hits the CMS. */
export function clearWpPostsCache(opts?: { disk?: boolean }): void {
	allPostsPromise = null;
	allPostsExpiresAt = 0;
	forceRefresh = true;
	if (opts?.disk !== false) {
		try {
			if (fs.existsSync(DISK_CACHE_FILE)) fs.unlinkSync(DISK_CACHE_FILE);
		} catch {
			/* ignore */
		}
	}
}

async function fetchAllPosts(): Promise<WpPost[]> {
	if (shouldUseDiskCache()) {
		const cached = readDiskCache();
		if (cached) return cached;
	} else if (!isDev()) {
		console.warn('[wp] production/CI build — skipping disk cache, fetching live posts');
	}

	const first = await fetchPostsPage(1, 100);
	const pages = [first.posts];
	const expectedTotal = first.total;
	console.warn(
		`[wp] fetching posts: page 1/${first.totalPages} (X-WP-Total=${expectedTotal}) ${first.url}`,
	);

	for (let page = 2; page <= first.totalPages; page++) {
		const next = await fetchPostsPage(page, 100);
		console.warn(`[wp] fetching posts: page ${page}/${first.totalPages}`);
		pages.push(next.posts);
	}

	const rawAll = pages.flat();
	if (expectedTotal > 0 && rawAll.length < expectedTotal) {
		throw new Error(
			`[wp] incomplete posts fetch: got ${rawAll.length} raw items but X-WP-Total=${expectedTotal} — refusing to build a partial list`,
		);
	}

	const mapped: WpPost[] = [];
	for (const raw of rawAll) {
		const post = mapWpPost(raw);
		if (post) mapped.push(post);
	}

	// Stable: CMS `date` desc (publish date), then id.
	mapped.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

	console.warn(`[wp] published posts ready: ${mapped.length} (X-WP-Total=${expectedTotal})`);

	forceRefresh = false;
	if (shouldUseDiskCache()) {
		writeDiskCache(mapped);
	}

	return mapped;
}
export type GetPostsOptions = {
	perPage?: number;
	all?: boolean;
};

/**
 * Fetch published blog posts from WordPress (`/posts`).
 * Always `status=publish` only.
 * - `perPage` (without `all`): single lightweight page request — safe for homepage SSR.
 * - `all` / no perPage: full catalog (listing, static paths). Prod SSR memo TTL is 0.
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<WpPost[]> {
	const { perPage, all = false } = options;

	// Homepage and similar: never download the full 5MB+ catalog for a teaser strip.
	if (!all && perPage != null) {
		try {
			const page = await fetchPostsPage(1, perPage);
			const mapped: WpPost[] = [];
			for (const raw of page.posts) {
				const post = mapWpPost(raw);
				if (post) mapped.push(post);
			}
			mapped.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
			return mapped.slice(0, perPage);
		} catch (err) {
			if (isDev()) {
				console.error('[wp] getPosts(perPage) failed (dev — returning []):', err);
				return [];
			}
			throw new Error(
				`[wp] getPosts failed — cannot serve blog teaser without live CMS data: ${String(err)}`,
			);
		}
	}

	const now = Date.now();

	if (forceRefresh || !allPostsPromise || now >= allPostsExpiresAt) {
		const ttl = memoryTtlMs();
		allPostsPromise = fetchAllPosts()
			.then((posts) => {
				allPostsExpiresAt = Date.now() + ttl;
				return posts;
			})
			.catch((err) => {
				allPostsPromise = null;
				allPostsExpiresAt = 0;
				throw err;
			});
	}

	try {
		return await allPostsPromise;
	} catch (err) {
		if (isDev()) {
			console.error('[wp] getPosts failed (dev — returning []):', err);
			return [];
		}
		throw new Error(
			`[wp] getPosts failed — cannot serve /blogs without live CMS data: ${String(err)}`,
		);
	}
}

/** Related posts: same category first, then newest, excluding current. */
export function getRelatedPosts(
	posts: WpPost[],
	current: WpPost,
	count = 3,
): WpPost[] {
	const others = posts.filter((p) => p.id !== current.id);
	const byDateDesc = (a: WpPost, b: WpPost) =>
		b.date.localeCompare(a.date) || b.id - a.id;

	const same = others
		.filter((p) => p.category && p.category === current.category)
		.sort(byDateDesc);
	const rest = others
		.filter((p) => !current.category || p.category !== current.category)
		.sort(byDateDesc);

	return [...same, ...rest].slice(0, count);
}

/** Approximate read time from HTML word count (words / 200, rounded up). */
export function readTimeMinutes(html: string): number {
	const words = plainFromHtml(html).split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

export const BLOG_IMAGE_PLACEHOLDER = '/images/1st.webp';

/** Look up a post by URL segments (category + slug, or full path segments). */
export async function getPostByPath(segments: string[]): Promise<WpPost | undefined> {
	const parts = segments.map((s) => s.replace(/^\/+|\/+$/g, '')).filter(Boolean);
	if (parts.length < 2) return undefined;
	const needle = withTrailingSlash(`/${parts.join('/')}`);
	const posts = await getPosts({ all: true });
	return posts.find((p) => p.path === needle);
}

/** Unique category path prefixes for nav active-state (e.g. `/web-solutions`). */
export async function getBlogCategoryPrefixes(): Promise<string[]> {
	// Use the categories collection — do NOT fetch every post (that times out on Vercel).
	const base = getApiBase();
	const params = new URLSearchParams({
		per_page: '100',
		hide_empty: 'true',
		_fields: 'slug',
	});
	if (!isDev()) {
		params.set('_', String(Date.now()));
	}
	const url = `${base}/categories?${params}`;
	try {
		const res = await fetch(url, {
			headers: { 'Cache-Control': 'no-cache' },
			signal: AbortSignal.timeout(15_000),
		});
		const text = await res.text();
		const clean = stripLeadingStyles(text);
		if (!res.ok) {
			console.error(`[wp] categories fetch failed (${res.status}) ${url}`);
			return [];
		}
		const data = JSON.parse(clean) as unknown;
		if (!Array.isArray(data)) return [];
		const set = new Set<string>();
		for (const row of data) {
			const slug =
				row && typeof row === 'object' && 'slug' in row
					? String((row as { slug?: string }).slug || '').trim()
					: '';
			if (!slug) continue;
			if (/^uncategorized$/i.test(slug) || /^uncategorised$/i.test(slug)) continue;
			set.add(`/${slug}`);
		}
		return [...set];
	} catch (err) {
		console.error('[wp] getBlogCategoryPrefixes failed:', err);
		return [];
	}
}
