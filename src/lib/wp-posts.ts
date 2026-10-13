/**
 * Single data layer for WordPress blog posts.
 *
 * Every `/wp-json/wp/v2/posts` fetch in the app goes through this module.
 * - Unauthenticated only (published posts; drafts never leak)
 * - Astro: `cache: "no-store"` on every request
 * - `total` / `totalPages` always come from `X-WP-Total` / `X-WP-TotalPages`
 */

import type { WpPost } from './wp';

const DEFAULT_API = 'https://xoomplus.co.uk/wp-json/wp/v2';

const LISTING_FIELDS =
	'id,slug,link,date,status,title,excerpt,featured_media,categories,_links,_embedded';

const POST_FIELDS =
	'id,slug,link,date,status,title,excerpt,content,featured_media,categories,yoast_head_json,_links,_embedded';

/** Response Cache-Control for blog listing HTML/JSON — never edge-cache the list. */
export const BLOG_NO_STORE = 'private, no-store, no-cache, must-revalidate, max-age=0';

/**
 * Single post HTML — short CDN TTL + SWR. Origin still fetches WP on miss;
 * `/api/revalidate` + `?refresh=1` clear the in-memory post memo so publish
 * shows on the next origin render (CDN max staleness = s-maxage).
 */
export const BLOG_POST_CACHE_CONTROL =
	'public, s-maxage=60, stale-while-revalidate=86400';

export const BLOG_LIST_PAGE_SIZE = 9;

/** In-memory memo for getPostBySlug — cleared by clearWpPostsCache / ?refresh=1. */
const postBySlugMemo = new Map<string, { at: number; post: WpPost | null }>();
const POST_MEMO_TTL_MS = 60_000;

export type GetPostsParams = {
	page?: number;
	perPage?: number;
	/** WordPress category ID. */
	category?: number;
	search?: string;
	/** When true, include post HTML (heavier). Default false for cards/teasers. */
	includeContent?: boolean;
};

export type PostsResult = {
	posts: WpPost[];
	/** From `X-WP-Total` on the same response — never array length or a snapshot. */
	total: number;
	/** From `X-WP-TotalPages` on the same response. */
	totalPages: number;
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

function stripLeadingStyles(text: string): string {
	let out = text;
	let prev: string;
	do {
		prev = out;
		out = out.replace(/^\s*<style[\s\S]*?<\/style>\s*/i, '');
	} while (out !== prev);
	return out;
}

type MapFn = (raw: unknown) => WpPost | null;

async function mapRawPosts(rawPosts: unknown[]): Promise<WpPost[]> {
	const { mapWpPost } = await import('./wp');
	const map = mapWpPost as MapFn;
	const mapped: WpPost[] = [];
	for (const raw of rawPosts) {
		const post = map(raw);
		if (post) mapped.push(post);
	}
	mapped.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
	return mapped;
}

/**
 * Dev-only artificial delay for skeleton / streaming tests.
 * Ignored when NODE_ENV=production unless WP_FETCH_DELAY_ALLOW=1
 * (local `astro preview` / Playwright against a production build).
 * Never set WP_FETCH_DELAY_* on real production hosts.
 */
async function maybeDevFetchDelay(): Promise<void> {
	const env = typeof process !== 'undefined' ? process.env : undefined;
	const nodeEnv = env?.NODE_ENV;
	const allow =
		env?.WP_FETCH_DELAY_ALLOW === '1' || env?.WP_FETCH_DELAY_ALLOW === 'true';
	if (nodeEnv === 'production' && !allow) return;

	let raw: string | undefined;
	try {
		raw = import.meta.env.WP_FETCH_DELAY_MS as string | undefined;
	} catch {
		raw = undefined;
	}
	if (!raw && env) raw = env.WP_FETCH_DELAY_MS;
	const ms = Number(raw);
	if (!Number.isFinite(ms) || ms <= 0) return;
	await new Promise((resolve) => setTimeout(resolve, Math.min(ms, 30_000)));
}

/**
 * Fetch a page of published posts. `total` is always `Number(X-WP-Total)`.
 * No auth header. No in-memory or disk memo.
 */
export async function getPosts(params: GetPostsParams = {}): Promise<PostsResult> {
	await maybeDevFetchDelay();

	const page = Math.max(1, Math.floor(params.page ?? 1));
	const perPage = Math.min(
		100,
		Math.max(1, Math.floor(params.perPage ?? BLOG_LIST_PAGE_SIZE)),
	);
	const category =
		params.category && params.category > 0 ? Math.floor(params.category) : undefined;
	const search = params.search?.trim() || undefined;
	const includeContent = Boolean(params.includeContent);

	const base = getApiBase();
	const query = new URLSearchParams({
		per_page: String(perPage),
		page: String(page),
		status: 'publish',
		orderby: 'date',
		order: 'desc',
		_embed: 'wp:featuredmedia,wp:term',
		_fields: includeContent ? POST_FIELDS : LISTING_FIELDS,
	});
	if (category) query.set('categories', String(category));
	if (search) query.set('search', search);

	const url = `${base}/posts?${query}`;
	const timeoutMs = includeContent ? 60_000 : perPage <= 10 ? 8_000 : 20_000;

	let res: Response;
	try {
		res = await fetch(url, {
			cache: 'no-store',
			signal: AbortSignal.timeout(timeoutMs),
		});
	} catch (err) {
		const reason = err instanceof Error ? err.name : 'Error';
		throw new Error(`WordPress posts fetch failed (${reason}) ${url}`);
	}

	const text = await res.text();
	const clean = stripLeadingStyles(text);

	if (!res.ok) {
		if (res.status === 400 && page > 1) {
			return { posts: [], total: 0, totalPages: Math.max(0, page - 1) };
		}
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

	const total = Number(res.headers.get('X-WP-Total') ?? res.headers.get('x-wp-total') ?? '0') || 0;
	const totalPages =
		Number(res.headers.get('X-WP-TotalPages') ?? res.headers.get('x-wp-totalpages') ?? '1') ||
		1;

	return {
		posts: await mapRawPosts(data),
		total,
		totalPages,
	};
}

/**
 * One published post by slug. Empty WP array → `null` (draft/trash/delete/missing).
 * No auth header. Short in-memory memo (cleared on revalidate / ?refresh=1).
 */
export async function getPostBySlug(slug: string): Promise<WpPost | null> {
	const key = slug.replace(/^\/+|\/+$/g, '').trim().toLowerCase();
	if (!key) return null;

	const hit = postBySlugMemo.get(key);
	if (hit && Date.now() - hit.at < POST_MEMO_TTL_MS) {
		return hit.post;
	}

	const base = getApiBase();
	const query = new URLSearchParams({
		slug: key,
		status: 'publish',
		_embed: 'wp:featuredmedia,wp:term',
		_fields: POST_FIELDS,
	});
	const url = `${base}/posts?${query}`;

	const res = await fetch(url, {
		cache: 'no-store',
		signal: AbortSignal.timeout(20_000),
	});
	const text = await res.text();
	const clean = stripLeadingStyles(text);
	if (!res.ok) {
		throw new Error(
			`WordPress post by slug failed (${res.status}) ${url} — ${clean.slice(0, 160)}`,
		);
	}

	const data = JSON.parse(clean) as unknown;
	if (!Array.isArray(data) || data.length === 0) {
		postBySlugMemo.set(key, { at: Date.now(), post: null });
		return null;
	}

	const { mapWpPost } = await import('./wp');
	const post = mapWpPost(data[0] as Parameters<typeof mapWpPost>[0]);
	postBySlugMemo.set(key, { at: Date.now(), post });
	return post;
}

/** Load-more restore: several pages with the same filters. */
export async function getPostsPages(
	pages: number[],
	query: Omit<GetPostsParams, 'page'> = {},
): Promise<PostsResult[]> {
	const unique = [
		...new Set(pages.map((p) => Math.floor(p)).filter((p) => p >= 1)),
	];
	return Promise.all(unique.map((page) => getPosts({ ...query, page })));
}

/**
 * Drop in-memory post memos. Listing fetches stay `cache: no-store` per request.
 * Called by `/api/revalidate` and `?refresh=1`.
 */
export function clearWpPostsCache(_opts?: { disk?: boolean }): void {
	postBySlugMemo.clear();
}
