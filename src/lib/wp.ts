/**
 * WordPress posts (blog) — mapping helpers, categories, and compatibility wrappers.
 * All `/posts` HTTP goes through `./wp-posts` (unauthenticated, cache: no-store).
 * Base: PUBLIC_WP_API (default https://xoomplusagency.com/wp-json/wp/v2)
 */

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

const DEFAULT_API = 'https://xoomplusagency.com/wp-json/wp/v2';

export {
	BLOG_LIST_CACHE_CONTROL,
	BLOG_POST_CACHE_CONTROL,
	BLOG_LIST_PAGE_SIZE,
	BLOG_NO_STORE,
} from './wp-posts';

/** Path prefixes owned by the Astro app — not WordPress blog categories. */
export const RESERVED_BLOG_CATEGORY_SLUGS = new Set([
	'api',
	'blog',
	'blogs',
	'locations',
	'pricing',
	'services',
	'about',
	'contact',
	'industries',
	'case-studies',
	'our-services',
	'projects',
	'privacy-policy',
]);

/** Prefer these size keys (in order) for the primary `src` (LCP-friendly ≤1536). */
const PREFERRED_SIZES = ['medium_large', 'large', '1536x1536'] as const;

/**
 * Featured-image srcset: real WP variants only (300 / 768 / 1024 / 1536).
 * Excludes the 2000px `full` original and theme crop sizes (digtek_*).
 */
const FEATURE_SRCSET_KEYS = new Set([
	'medium',
	'medium_large',
	'large',
	'1536x1536',
]);

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
	categories?: number[];
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

/** True for legacy `/blogs/<slug>/` post URLs (listing `/blogs` is fine elsewhere). */
function isLegacyBlogsPostPath(pathname: string): boolean {
	const cleaned = pathname.replace(/\/+$/, '') || '/';
	return /^\/blogs\/[^/]+$/.test(cleaned);
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

/**
 * WP size URLs must share the attachment basename (e.g. `…-new.webp` → `…-new-768x384.webp`).
 * After re-uploads, stale `medium_large` paths (without `-new`) 404 while `source_url` works.
 */
function sizeMatchesAttachment(fullUrl: string, sizeUrl: string): boolean {
	try {
		const fullName = decodeURIComponent(new URL(fullUrl).pathname.split('/').pop() || '');
		const sizeName = decodeURIComponent(new URL(sizeUrl).pathname.split('/').pop() || '');
		const fullStem = fullName.replace(/\.[^.]+$/, '');
		if (!fullStem) return true;
		return (
			sizeName === fullName ||
			sizeName.startsWith(`${fullStem}-`) ||
			sizeName.startsWith(`${fullStem}.`)
		);
	} catch {
		return true;
	}
}

function mapImage(media: WpFeaturedMedia | undefined, title: string): WpPostImage | null {
	if (!media) return null;
	const sizes = media.media_details?.sizes ?? {};
	const fullSrc = media.source_url || '';

	let chosen: WpMediaSize | undefined;
	for (const key of PREFERRED_SIZES) {
		const candidate = sizes[key];
		if (!candidate?.source_url) continue;
		if (fullSrc && !sizeMatchesAttachment(fullSrc, candidate.source_url)) continue;
		chosen = candidate;
		break;
	}

	const src =
		chosen?.source_url ||
		fullSrc ||
		Object.values(sizes).find((s) => s.source_url)?.source_url;
	if (!src) return null;

	const width = chosen?.width ?? media.media_details?.width ?? 1200;
	const height = chosen?.height ?? media.media_details?.height ?? 720;

	const srcsetParts: string[] = [];
	const seenWidths = new Set<number>();
	for (const key of FEATURE_SRCSET_KEYS) {
		const size = sizes[key];
		if (!size?.source_url || !size.width) continue;
		if (fullSrc && !sizeMatchesAttachment(fullSrc, size.source_url)) continue;
		if (seenWidths.has(size.width)) continue;
		seenWidths.add(size.width);
		srcsetParts.push(`${size.source_url} ${size.width}w`);
	}
	if (fullSrc && media.media_details?.width && !seenWidths.has(media.media_details.width)) {
		srcsetParts.push(`${fullSrc} ${media.media_details.width}w`);
	}
	// Sort ascending so browsers pick cleanly
	srcsetParts.sort(
		(a, b) => parseInt(a.split(' ').pop() || '0', 10) - parseInt(b.split(' ').pop() || '0', 10),
	);

	const alt = plainFromHtml(media.alt_text || '') || title;

	return {
		src,
		srcset: srcsetParts.join(', '),
		width,
		height,
		alt,
	};
}

export function mapWpPost(
	raw: WpRawPost,
	extras?: { media?: WpFeaturedMedia; category?: { name: string; slug: string } },
): WpPost | null {
	const id = typeof raw.id === 'number' ? raw.id : null;
	const slug = typeof raw.slug === 'string' ? raw.slug : '';
	if (id == null || !slug) return null;

	const status = typeof raw.status === 'string' ? raw.status : 'publish';
	// Defensive: never surface drafts / private / pending / future via a leaky plugin.
	if (status !== 'publish') return null;

	const title = plainFromHtml(raw.title?.rendered || '');
	const content = raw.content?.rendered || '';
	const excerpt = buildExcerpt(raw.excerpt?.rendered || '', content);
	const term = extras?.category ?? firstCategoryTerm(raw._embedded?.['wp:term']);
	const category = term?.name || '';
	const media = extras?.media ?? raw._embedded?.['wp:featuredmedia']?.[0];
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

export type PostListPage = {
	posts: WpPost[];
	total: number;
	totalPages: number;
	page: number;
};

type WpCategoryRecord = { id: number; name: string; slug: string };

let categoriesMemo: { promise: Promise<WpCategoryRecord[]> | null; expires: number } = {
	promise: null,
	expires: 0,
};
let categoriesInflight: Promise<WpCategoryRecord[]> | null = null;

/** @deprecated Prefer `getPosts` / `getPostBySlug` from `./wp-posts`. */
export { clearWpPostsCache, getPosts, getPostBySlug } from './wp-posts';

export type PostListQuery = {
	page?: number;
	perPage?: number;
	categoryId?: number;
	search?: string;
};

export type PostListCard = {
	title: string;
	excerpt: string;
	category: string;
	categoryKey: string;
	href: string;
	image: string;
	alt: string;
	srcset: string;
	width: number;
	height: number;
};

/**
 * One page of listing cards — delegates to `wp-posts.getPosts`.
 * `total` is always `X-WP-Total` from that response.
 */
export async function getPostList(query: PostListQuery = {}): Promise<PostListPage> {
	const { getPosts, BLOG_LIST_PAGE_SIZE } = await import('./wp-posts');
	const page = Math.max(1, Math.floor(query.page ?? 1));
	const perPage = Math.min(20, Math.max(1, Math.floor(query.perPage ?? BLOG_LIST_PAGE_SIZE)));
	const categoryId =
		query.categoryId && query.categoryId > 0 ? Math.floor(query.categoryId) : undefined;
	const search = query.search?.trim() || undefined;
	const result = await getPosts({
		page,
		perPage,
		category: categoryId,
		search,
	});
	return { ...result, page };
}

/** Several listing pages at once (load-more restore). */
export async function getPostListPages(
	pages: number[],
	query: Omit<PostListQuery, 'page'> = {},
): Promise<PostListPage[]> {
	const unique = [
		...new Set(pages.map((page) => Math.floor(page)).filter((page) => page >= 1)),
	];
	return Promise.all(unique.map((page) => getPostList({ ...query, page })));
}

export function toPostListCard(post: WpPost): PostListCard {
	return {
		title: post.title,
		excerpt: post.excerpt,
		category: post.category,
		categoryKey: categoryKey(post.category || post.categorySlug),
		href: postUrl(post),
		image: post.image?.src ?? '',
		alt: post.image?.alt || post.title,
		srcset: post.image?.srcset ?? '',
		width: post.image?.width ?? 400,
		height: post.image?.height ?? 240,
	};
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

/**
 * One published post by WordPress slug. Draft / private / missing → `null`.
 * @deprecated Prefer `getPostBySlug` from `./wp-posts`.
 */
export async function getPublishedPostBySlug(slug: string): Promise<WpPost | null> {
	const { getPostBySlug } = await import('./wp-posts');
	return getPostBySlug(slug);
}

/** Look up a published post by URL segments (category + slug). */
export async function getPostByPath(segments: string[]): Promise<WpPost | undefined> {
	const parts = segments.map((s) => s.replace(/^\/+|\/+$/g, '')).filter(Boolean);
	if (parts.length < 2) return undefined;
	const postSlug = parts[parts.length - 1];
	const categorySlug = parts[parts.length - 2];
	const post = await getPublishedPostBySlug(postSlug);
	if (!post) return undefined;
	if (post.categorySlug !== categorySlug) return undefined;
	return post;
}

/** Published categories (id, name, slug). Shared by nav prefixes and the blog listing. */
export async function getPublishedCategories(): Promise<WpCategoryRecord[]> {
	if (categoriesMemo.promise && Date.now() < categoriesMemo.expires) {
		return categoriesMemo.promise;
	}
	if (categoriesInflight) return categoriesInflight;

	categoriesInflight = (async () => {
		try {
			const categories = await fetchPublishedCategories();
			categoriesMemo.promise = Promise.resolve(categories);
			categoriesMemo.expires = Date.now() + 60_000;
			return categories;
		} catch (err) {
			categoriesMemo.promise = null;
			categoriesMemo.expires = 0;
			console.error('[wp] getPublishedCategories failed:', err);
			return [];
		} finally {
			categoriesInflight = null;
		}
	})();
	return categoriesInflight;
}

async function fetchPublishedCategories(): Promise<WpCategoryRecord[]> {
	const base = getApiBase();
	const params = new URLSearchParams({
		per_page: '100',
		hide_empty: 'true',
		_fields: 'id,name,slug',
	});
	const url = `${base}/categories?${params}`;
	const res = await fetch(url, {
		cache: 'no-store',
		signal: AbortSignal.timeout(8_000),
	});
	const text = await res.text();
	const clean = stripLeadingStyles(text);
	if (!res.ok) {
		throw new Error(`WordPress categories fetch failed (${res.status}) ${url}`);
	}
	const data = JSON.parse(clean) as unknown;
	if (!Array.isArray(data)) return [];
	const categories: WpCategoryRecord[] = [];
	for (const row of data) {
		if (!row || typeof row !== 'object') continue;
		const id = Number((row as { id?: number }).id);
		const slug = String((row as { slug?: string }).slug || '').trim();
		const name = plainFromHtml(String((row as { name?: string }).name || ''));
		if (!id || !slug) continue;
		categories.push({ id, name: name || slug, slug });
	}
	return categories;
}

/** Unique category path prefixes for nav active-state (e.g. `/web-solutions`). */
export async function getBlogCategoryPrefixes(): Promise<string[]> {
	try {
		const categories = await getPublishedCategories();
		const set = new Set<string>();
		for (const cat of categories) {
			if (/^uncategorized$/i.test(cat.slug) || /^uncategorised$/i.test(cat.slug)) continue;
			set.add(`/${cat.slug}`);
		}
		return [...set];
	} catch (err) {
		console.error('[wp] getBlogCategoryPrefixes failed:', err);
		return [];
	}
}

// —— CMS pages (Privacy Policy, etc.) ——

export type WpCmsPage = {
	title: string;
	/** Trusted CMS HTML (`content.rendered`), cleaned by the caller for display. */
	content: string;
	modified: string | null;
	seoTitle: string | null;
	seoDescription: string | null;
};

/** Bump when the disk cache shape changes (dev-only). */
const WP_PAGE_CACHE_VERSION = 1;
const PAGE_MEMO_TTL_MS = 60_000;
const pageBySlugMemo = new Map<string, { at: number; page: WpCmsPage | null }>();

type WpRawPage = {
	id?: number;
	slug?: string;
	link?: string;
	modified?: string;
	title?: { rendered?: string };
	content?: { rendered?: string };
	yoast_head_json?: {
		title?: string;
		description?: string;
	};
};

function isProdEnv(): boolean {
	try {
		if (import.meta.env?.PROD) return true;
	} catch {
		/* ignore */
	}
	return (
		typeof process !== 'undefined' && process.env?.NODE_ENV === 'production'
	);
}

function isWpCacheDisabled(): boolean {
	const env = typeof process !== 'undefined' ? process.env : undefined;
	const flag = env?.WP_CACHE?.trim().toLowerCase();
	return flag === 'off' || flag === '0' || flag === 'false';
}

async function pageDiskCachePath(): Promise<string> {
	const path = await import('node:path');
	return path.join(
		process.cwd(),
		'node_modules',
		'.cache',
		`wp-pages-v${WP_PAGE_CACHE_VERSION}.json`,
	);
}

type PageDiskCacheFile = {
	version: number;
	entries: Record<string, { at: number; page: WpCmsPage | null }>;
};

async function readPageDiskCache(
	slug: string,
): Promise<WpCmsPage | null | undefined> {
	if (isProdEnv() || isWpCacheDisabled()) return undefined;
	try {
		const { readFile } = await import('node:fs/promises');
		const raw = await readFile(await pageDiskCachePath(), 'utf8');
		const parsed = JSON.parse(raw) as PageDiskCacheFile;
		if (parsed.version !== WP_PAGE_CACHE_VERSION) return undefined;
		const hit = parsed.entries?.[slug];
		if (!hit) return undefined;
		if (Date.now() - hit.at > PAGE_MEMO_TTL_MS) return undefined;
		return hit.page;
	} catch {
		return undefined;
	}
}

async function writePageDiskCache(slug: string, page: WpCmsPage | null): Promise<void> {
	if (isProdEnv() || isWpCacheDisabled()) return;
	try {
		const { mkdir, readFile, writeFile } = await import('node:fs/promises');
		const path = await import('node:path');
		const file = await pageDiskCachePath();
		await mkdir(path.dirname(file), { recursive: true });
		let parsed: PageDiskCacheFile = { version: WP_PAGE_CACHE_VERSION, entries: {} };
		try {
			parsed = JSON.parse(await readFile(file, 'utf8')) as PageDiskCacheFile;
			if (parsed.version !== WP_PAGE_CACHE_VERSION) {
				parsed = { version: WP_PAGE_CACHE_VERSION, entries: {} };
			}
		} catch {
			/* fresh file */
		}
		parsed.entries[slug] = { at: Date.now(), page };
		await writeFile(file, JSON.stringify(parsed), 'utf8');
	} catch (err) {
		console.warn('[wp] page disk cache write failed:', err);
	}
}

function mapWpCmsPage(raw: WpRawPage): WpCmsPage | null {
	const title = plainFromHtml(raw.title?.rendered || '');
	const content = typeof raw.content?.rendered === 'string' ? raw.content.rendered : '';
	if (!title && !content) return null;
	const seoTitle = plainFromHtml(raw.yoast_head_json?.title || '') || null;
	const seoDescription =
		plainFromHtml(raw.yoast_head_json?.description || '') || null;
	const modified =
		typeof raw.modified === 'string' && raw.modified.trim()
			? raw.modified.trim()
			: null;
	return {
		title: title || 'Untitled',
		content,
		modified,
		seoTitle,
		seoDescription,
	};
}

/**
 * Fetch a published WordPress page by slug.
 * Returns `null` when WP returns an empty list (missing / draft / trash).
 * Throws on network / HTTP / parse failures (production builds must fail clearly).
 * Dev: in-memory memo + versioned disk cache (60s). Production: always live fetch.
 */
export async function getPage(slug: string): Promise<WpCmsPage | null> {
	const key = slug.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
	if (!key) return null;

	if (!isProdEnv() && !isWpCacheDisabled()) {
		const memoHit = pageBySlugMemo.get(key);
		if (memoHit && Date.now() - memoHit.at < PAGE_MEMO_TTL_MS) {
			return memoHit.page;
		}
		const diskHit = await readPageDiskCache(key);
		if (diskHit !== undefined) {
			pageBySlugMemo.set(key, { at: Date.now(), page: diskHit });
			return diskHit;
		}
	}

	const base = getApiBase();
	const query = new URLSearchParams({
		slug: key,
		status: 'publish',
		_fields: 'id,slug,link,title,content,modified,yoast_head_json',
	});
	if (isProdEnv()) query.set('_', String(Date.now()));

	const url = `${base}/pages?${query}`;
	let res: Response;
	try {
		res = await fetch(url, {
			cache: 'no-store',
			signal: AbortSignal.timeout(20_000),
		});
	} catch (err) {
		const reason = err instanceof Error ? err.name : 'Error';
		throw new Error(`WordPress page fetch failed (${reason}) ${url}`);
	}

	const text = await res.text();
	const clean = stripLeadingStyles(text);
	if (!res.ok) {
		throw new Error(
			`WordPress page fetch failed (${res.status}) ${url} — ${clean.slice(0, 160)}`,
		);
	}

	let data: unknown;
	try {
		data = JSON.parse(clean);
	} catch (err) {
		throw new Error(
			`WordPress page JSON parse failed for ${url}: ${String(err)} (body starts: ${clean.slice(0, 120)})`,
		);
	}

	if (!Array.isArray(data)) {
		throw new Error(`WordPress page: expected an array from ${url}`);
	}

	const page =
		data.length === 0 ? null : mapWpCmsPage(data[0] as WpRawPage);

	pageBySlugMemo.set(key, { at: Date.now(), page });
	await writePageDiskCache(key, page);
	return page;
}

/** Drop in-memory (and optionally disk) CMS page memos. */
export function clearWpPageCache(opts?: { disk?: boolean }): void {
	pageBySlugMemo.clear();
	if (!opts?.disk || isProdEnv()) return;
	void (async () => {
		try {
			const { unlink } = await import('node:fs/promises');
			await unlink(await pageDiskCachePath());
		} catch {
			/* ignore missing file */
		}
	})();
}

/**
 * Normalize a `tel:` href: decode, trim, strip spaces/dashes/parentheses,
 * keep a leading `+`, rebuild as `tel:+<digits>` (or `tel:<digits>`).
 * Does not rewrite the number to the UK SITE_PHONE — CMS values stay CMS values.
 */
export function normalizeTelHref(href: string): string {
	const raw = href.trim();
	if (!/^tel:/i.test(raw)) return href;
	let value = raw.slice(raw.indexOf(':') + 1);
	try {
		value = decodeURIComponent(value);
	} catch {
		/* keep undecoded */
	}
	value = value.trim();
	const keepPlus = value.startsWith('+');
	const digits = value.replace(/[^\d]/g, '');
	if (!digits) return 'tel:';
	return `tel:${keepPlus ? '+' : ''}${digits}`;
}

/** Normalize a `mailto:` href: decode + trim the address (and optional query). */
export function normalizeMailtoHref(href: string): string {
	const raw = href.trim();
	if (!/^mailto:/i.test(raw)) return href;
	let value = raw.slice(raw.indexOf(':') + 1);
	try {
		value = decodeURIComponent(value);
	} catch {
		/* keep undecoded */
	}
	return `mailto:${value.trim()}`;
}

/**
 * Clean `tel:` / `mailto:` hrefs in CMS HTML and trim leading/trailing spaces
 * inside those anchors. Idempotent. Used by `cleanWpPostHtml` / privacy pages.
 */
export function normalizeCmsContactLinks(html: string): string {
	if (!html || !/(?:tel:|mailto:)/i.test(html)) return html;

	return html.replace(
		/<a(\s[^>]*?\bhref\s*=\s*)(["'])(tel:[^"']*|mailto:[^"']*)\2([^>]*)>([\s\S]*?)<\/a>/gi,
		(_full, pre: string, quote: string, href: string, post: string, inner: string) => {
			const next = /^tel:/i.test(href)
				? normalizeTelHref(href)
				: normalizeMailtoHref(href);
			const trimmedInner = inner.replace(/^\s+/, '').replace(/\s+$/, '');
			return `<a${pre}${quote}${next}${quote}${post}>${trimmedInner}</a>`;
		},
	);
}
