/**
 * On-demand cache bust for SEO pages + blog posts webhook.
 *
 * POST /api/revalidate
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body (pages):
 *   { "id": 215 } | { "slug": "about" } | { "all": true } | { "rebuild": true }
 * Body (posts — WordPress webhook):
 *   { "type": "post", "id": 123, "slug": "my-post", "status": "publish", "oldStatus": "draft",
 *     "category": "seo", "path": "/seo/my-post" }
 *
 * Clears in-memory WP memos, Node HTML cache, and Vercel ISR when applicable.
 */
import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import {
	getLiveWpSlugForId,
	getRevalidateSecret,
	getAllWpPageRoutes,
	invalidateWpSeoCache,
	peekCachedWpSlug,
	resolveIdFromSlugAsync,
	triggerDeployHook,
	WP_SEO_PAGES,
	WP_PAGE_FALLBACK_ROUTES,
	type WpPageKey,
} from '../../lib/wp-seo';
import { clearWpPostsCache } from '../../lib/wp-posts';
import { clearWpCache } from '../../lib/wp-sitemap';
import { clearWpPageCache } from '../../lib/wp';
import {
	normalizePurgePath,
	purgeAllHtmlCache,
	purgeCachedPaths,
} from '../../lib/purge-paths';

export const prerender = false;

function secretsEqual(provided: string | null, expected: string): boolean {
	if (!provided) return false;
	const a = Buffer.from(provided);
	const b = Buffer.from(expected);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}

async function pathsForPageId(id: number): Promise<string[]> {
	try {
		const routes = await getAllWpPageRoutes();
		const hit = routes.find((r) => r.id === id);
		if (hit) return [hit.route];
	} catch (err) {
		console.warn('[revalidate] getAllWpPageRoutes failed:', err);
	}
	for (const [key, entry] of Object.entries(WP_SEO_PAGES) as [
		WpPageKey,
		{ id: number },
	][]) {
		if (entry.id === id) return [WP_PAGE_FALLBACK_ROUTES[key]];
	}
	return [];
}

function coreNavPaths(): string[] {
	return Object.values(WP_PAGE_FALLBACK_ROUTES).map(normalizePurgePath);
}

export const POST: APIRoute = async ({ request }) => {
	const expected = getRevalidateSecret();
	const provided = request.headers.get('x-revalidate-secret');

	if (!expected || !secretsEqual(provided, expected)) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let body: {
		type?: string;
		id?: number;
		slug?: string;
		status?: string;
		oldStatus?: string;
		category?: string;
		path?: string;
		all?: boolean;
		rebuild?: boolean;
	} = {};
	try {
		body = (await request.json()) as typeof body;
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const forceRebuild = body.rebuild === true;

	// WordPress post publish/draft/trash/delete webhook
	if (body.type === 'post') {
		clearWpPostsCache();
		clearWpPageCache({ disk: true });
		clearWpCache();
		invalidateWpSeoCache(typeof body.id === 'number' ? body.id : undefined);

		const paths = new Set<string>(['/blogs', '/']);
		if (typeof body.path === 'string' && body.path.length > 0) {
			paths.add(normalizePurgePath(body.path));
		} else if (
			typeof body.slug === 'string' &&
			body.slug.length > 0 &&
			typeof body.category === 'string' &&
			body.category.length > 0
		) {
			paths.add(normalizePurgePath(`/${body.category}/${body.slug}`));
		} else if (typeof body.slug === 'string' && body.slug.length > 0) {
			paths.add(normalizePurgePath(`/blogs/${body.slug}`));
		}

		const purged = await purgeCachedPaths([...paths]);
		const revalidated = {
			tag: 'wp-posts',
			paths: [...paths],
			purged,
			id: body.id ?? null,
			slug: body.slug ?? null,
			status: body.status ?? null,
			oldStatus: body.oldStatus ?? null,
		};
		console.log(
			`[revalidate] post id=${revalidated.id} slug=${revalidated.slug} status=${revalidated.status} → purged ${paths.size} path(s)`,
		);
		return new Response(JSON.stringify({ revalidated: true, ...revalidated }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (body.all === true) {
		invalidateWpSeoCache();
		clearWpPostsCache();
		clearWpPageCache({ disk: true });
		clearWpCache();
		const paths = coreNavPaths();
		const cleared = await purgeAllHtmlCache();
		const purged = await purgeCachedPaths(paths);
		const deploy = forceRebuild
			? await triggerDeployHook('revalidate all + rebuild')
			: { triggered: false, ok: false };
		console.log(`[revalidate] all rebuild=${forceRebuild} purged=${paths.length}`);
		return new Response(
			JSON.stringify({
				revalidated: true,
				slug: 'all',
				id: null,
				rebuild: forceRebuild,
				paths,
				cleared,
				purged,
				deploy,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	async function revalidateById(id: number, label?: string) {
		const previousSlug = peekCachedWpSlug(id);
		invalidateWpSeoCache(id);
		clearWpPostsCache();
		clearWpPageCache({ disk: true });
		clearWpCache();
		const nextSlug = await getLiveWpSlugForId(id);
		const slugChanged =
			previousSlug != null && nextSlug != null && previousSlug !== nextSlug;
		const mapped = Object.values(WP_SEO_PAGES).some((p) => p.id === id);
		const shouldRebuild = forceRebuild || slugChanged;

		const paths = await pathsForPageId(id);
		// Also purge previous path if slug moved
		if (previousSlug && slugChanged) {
			const prevPath =
				previousSlug === 'home' || previousSlug === ''
					? '/'
					: `/${previousSlug.replace(/^\/+|\/+$/g, '')}`;
			paths.push(normalizePurgePath(prevPath));
		}
		const purged = await purgeCachedPaths(paths);

		let deploy: Awaited<ReturnType<typeof triggerDeployHook>> | {
			triggered: boolean;
			ok: boolean;
		} = { triggered: false, ok: false };

		if (shouldRebuild) {
			const reason = slugChanged
				? `slug change id ${id}: "${previousSlug}" → "${nextSlug}"`
				: `rebuild requested for id ${id}`;
			deploy = await triggerDeployHook(reason);
		} else if (mapped) {
			console.log(
				`[revalidate] id ${id} — HTML/ISR purge + SEO memo clear (no rebuild)`,
			);
		}

		console.log(
			`[revalidate] page id=${id} slug=${label ?? nextSlug} slugChanged=${slugChanged} rebuild=${shouldRebuild} paths=${paths.join(',')}`,
		);

		return {
			revalidated: true,
			id,
			slug: label ?? nextSlug,
			previousSlug,
			nextSlug,
			slugChanged,
			rebuild: shouldRebuild,
			paths,
			purged,
			deploy,
		};
	}

	if (typeof body.id === 'number' && Number.isFinite(body.id)) {
		const result = await revalidateById(body.id);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	if (typeof body.slug === 'string' && body.slug.length > 0) {
		const id = await resolveIdFromSlugAsync(body.slug);
		if (id == null) {
			return new Response(
				JSON.stringify({
					error: `No mapped WP page for slug "${body.slug}"`,
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}
		const result = await revalidateById(id, body.slug);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(
		JSON.stringify({
			error:
				'Provide { "type": "post", ... }, { "id": number }, { "slug": "..." }, or { "all": true }. Optional: "rebuild": true',
		}),
		{
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
