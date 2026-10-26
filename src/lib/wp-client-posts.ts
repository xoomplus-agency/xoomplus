/**
 * Browser-side WordPress posts fetch for static /blogs (no Astro API route).
 * Mirrors /api/blog-posts response shape used by blog-list.ts.
 */

import {
	mapWpPost,
	toPostListCard,
	type PostListCard,
	type WpPost,
} from './wp';

export type ClientListPage = {
	page: number;
	total: number;
	totalPages: number;
	posts: PostListCard[];
};

export type ClientListResponse = { pages: ClientListPage[] };

function apiBase(): string {
	const raw =
		(import.meta.env.PUBLIC_WP_API as string | undefined)?.trim() ||
		'https://xoomplusagency.com/wp-json/wp/v2';
	return raw.replace(/\/+$/, '');
}

const LISTING_FIELDS =
	'id,slug,link,date,status,title,excerpt,featured_media,categories,_links,_embedded';

async function fetchPostsPage(opts: {
	page: number;
	perPage: number;
	category?: number;
	search?: string;
}): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
	const query = new URLSearchParams({
		per_page: String(opts.perPage),
		page: String(opts.page),
		status: 'publish',
		orderby: 'date',
		order: 'desc',
		_embed: 'wp:featuredmedia,wp:term',
		_fields: LISTING_FIELDS,
	});
	if (opts.category && opts.category > 0) {
		query.set('categories', String(opts.category));
	}
	if (opts.search?.trim()) query.set('search', opts.search.trim());

	const url = `${apiBase()}/posts?${query}`;
	const res = await fetch(url, {
		headers: { Accept: 'application/json' },
		signal: AbortSignal.timeout(20_000),
	});
	if (!res.ok) {
		throw new Error(`WordPress posts ${res.status}`);
	}
	const data = (await res.json()) as unknown;
	if (!Array.isArray(data)) throw new Error('WordPress posts: expected array');

	const posts: WpPost[] = [];
	for (const raw of data) {
		const post = mapWpPost(raw as Parameters<typeof mapWpPost>[0]);
		if (post) posts.push(post);
	}

	const total = Number(res.headers.get('X-WP-Total') ?? '0') || 0;
	const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '1') || 1;
	return { posts, total, totalPages };
}

/** Same contract as former GET /api/blog-posts */
export async function fetchBlogListPages(opts: {
	pages: number[];
	perPage: number;
	category?: number;
	search?: string;
}): Promise<ClientListResponse> {
	const unique = [...new Set(opts.pages.filter((p) => p >= 1))];
	const results = await Promise.all(
		unique.map((page) =>
			fetchPostsPage({
				page,
				perPage: opts.perPage,
				category: opts.category,
				search: opts.search,
			}),
		),
	);

	return {
		pages: results.map((r, i) => ({
			page: unique[i] ?? 1,
			total: r.total,
			totalPages: r.totalPages,
			posts: r.posts.map(toPostListCard),
		})),
	};
}
