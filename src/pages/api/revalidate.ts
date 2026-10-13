/**
 * On-demand cache bust for SEO pages + blog posts webhook.
 *
 * POST /api/revalidate
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body (pages):
 *   { "id": 215 } | { "slug": "about" } | { "all": true } | { "rebuild": true }
 * Body (posts — WordPress webhook):
 *   { "type": "post", "id": 123, "slug": "my-post", "status": "publish", "oldStatus": "draft" }
 *
 * Astro SSR blog routes use `cache: "no-store"` and do not need Next.js
 * `revalidateTag`. This endpoint still accepts post webhooks, logs them, and
 * clears any residual SEO/post helpers so publish/draft sync is one refresh.
 */
import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import {
	getLiveWpSlugForId,
	getRevalidateSecret,
	invalidateWpSeoCache,
	peekCachedWpSlug,
	resolveIdFromSlugAsync,
	triggerDeployHook,
	WP_SEO_PAGES,
} from '../../lib/wp-seo';
import { clearWpPostsCache } from '../../lib/wp-posts';

export const prerender = false;

function secretsEqual(provided: string | null, expected: string): boolean {
	if (!provided) return false;
	const a = Buffer.from(provided);
	const b = Buffer.from(expected);
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
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
		invalidateWpSeoCache(typeof body.id === 'number' ? body.id : undefined);
		const revalidated = {
			tag: 'wp-posts',
			paths: ['/blogs', '/'],
			id: body.id ?? null,
			slug: body.slug ?? null,
			status: body.status ?? null,
			oldStatus: body.oldStatus ?? null,
			note: 'Astro SSR: posts are fetched with cache:no-store; nothing to purge beyond SEO memo',
		};
		console.log(
			`[revalidate] post id=${revalidated.id} slug=${revalidated.slug} status=${revalidated.status} oldStatus=${revalidated.oldStatus} → cleared wp-posts + SEO`,
		);
		return new Response(
			JSON.stringify({ revalidated: true, ...revalidated }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	if (body.all === true) {
		invalidateWpSeoCache();
		clearWpPostsCache();
		const deploy = forceRebuild
			? await triggerDeployHook('revalidate all + rebuild')
			: { triggered: false, ok: false };
		console.log(`[revalidate] all rebuild=${forceRebuild}`);
		return new Response(
			JSON.stringify({
				revalidated: true,
				slug: 'all',
				id: null,
				rebuild: forceRebuild,
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
		const nextSlug = await getLiveWpSlugForId(id);
		const slugChanged =
			previousSlug != null && nextSlug != null && previousSlug !== nextSlug;
		const mapped = Object.values(WP_SEO_PAGES).some((p) => p.id === id);
		const shouldRebuild = forceRebuild || slugChanged;

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
			console.warn(
				`[wp-seo] revalidated id ${id} (SEO cache only). Slug unchanged — no rebuild.`,
			);
		}

		console.log(
			`[revalidate] page id=${id} slug=${label ?? nextSlug} slugChanged=${slugChanged} rebuild=${shouldRebuild}`,
		);

		return {
			revalidated: true,
			id,
			slug: label ?? nextSlug,
			previousSlug,
			nextSlug,
			slugChanged,
			rebuild: shouldRebuild,
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
