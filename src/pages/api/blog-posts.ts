/**
 * Next pages for /blogs Load more, category chips, and search.
 * Same live list as the page itself. Never edge-cached.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { toPostListCard } from '../../lib/wp';
import {
	BLOG_LIST_PAGE_SIZE,
	BLOG_NO_STORE,
	getPosts,
	getPostsPages,
} from '../../lib/wp-posts';

function pageNumber(value: string | null): number | null {
	if (!value) return null;
	const n = Number(value);
	if (!Number.isInteger(n) || n < 1 || n > 100) return null;
	return n;
}

export const GET: APIRoute = async ({ url }) => {
	const categoryRaw = url.searchParams.get('category');
	const categoryId = categoryRaw ? Number(categoryRaw) : undefined;
	if (categoryRaw && (!Number.isInteger(categoryId) || (categoryId ?? 0) < 1)) {
		return new Response(JSON.stringify({ error: 'Invalid category' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': BLOG_NO_STORE },
		});
	}

	const search = url.searchParams.get('search')?.trim() || undefined;
	if (search && search.length > 80) {
		return new Response(JSON.stringify({ error: 'Search is too long' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': BLOG_NO_STORE },
		});
	}

	const perPageRaw = url.searchParams.get('per_page');
	const perPage = perPageRaw ? Number(perPageRaw) : BLOG_LIST_PAGE_SIZE;
	if (!Number.isInteger(perPage) || perPage < 1 || perPage > 20) {
		return new Response(JSON.stringify({ error: 'Invalid per_page' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': BLOG_NO_STORE },
		});
	}

	const pagesParam = url.searchParams.get('pages');
	let pages: number[] = [];
	if (pagesParam) {
		pages = pagesParam
			.split(',')
			.map((part) => pageNumber(part.trim()))
			.filter((n): n is number => n != null);
		if (!pages.length || pages.length > 10) {
			return new Response(JSON.stringify({ error: 'Invalid pages' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json', 'Cache-Control': BLOG_NO_STORE },
			});
		}
	} else {
		const page = pageNumber(url.searchParams.get('page')) ?? 1;
		pages = [page];
	}

	try {
		const query = {
			perPage,
			category: categoryId && categoryId > 0 ? categoryId : undefined,
			search,
		};
		const result =
			pages.length === 1
				? [await getPosts({ ...query, page: pages[0] })]
				: await getPostsPages(pages, query);
		const body = {
			pages: result.map((page, i) => ({
				page: pages[i] ?? pages[0],
				total: page.total,
				totalPages: page.totalPages,
				posts: page.posts.map(toPostListCard),
			})),
		};
		return new Response(JSON.stringify(body), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': BLOG_NO_STORE,
			},
		});
	} catch (err) {
		console.error('[api/blog-posts]', err);
		return new Response(JSON.stringify({ error: 'Blog list unavailable' }), {
			status: 502,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': BLOG_NO_STORE,
			},
		});
	}
};
