/**
 * On-demand SEO cache bust (+ optional Vercel rebuild for slug/route changes).
 *
 * POST /api/revalidate
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 * Body:
 *   { "id": 215 }
 *   { "slug": "about" }
 *   { "all": true }
 *   { "id": 1037, "rebuild": true }  // force deploy hook
 *
 * Cache invalidation alone cannot create a new prerendered Astro route after a
 * WordPress slug change — set VERCEL_DEPLOY_HOOK_URL and pass rebuild:true (or
 * let the handler auto-rebuild when it detects a slug change).
 */
import type { APIRoute } from 'astro';
import {
	getLiveWpSlugForId,
	getRevalidateSecret,
	invalidateWpSeoCache,
	peekCachedWpSlug,
	resolveIdFromSlugAsync,
	triggerDeployHook,
	WP_SEO_PAGES,
} from '../../lib/wp-seo';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const expected = getRevalidateSecret();
	const provided = request.headers.get('x-revalidate-secret');

	if (!expected || provided !== expected) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	let body: {
		id?: number;
		slug?: string;
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

	if (body.all === true) {
		invalidateWpSeoCache();
		const deploy = forceRebuild
			? await triggerDeployHook('revalidate all + rebuild')
			: { triggered: false, ok: false };
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
		// Cached slug only (no WP fetch) so a cold cache cannot mask a real change.
		const previousSlug = peekCachedWpSlug(id);
		invalidateWpSeoCache(id);
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
				'Provide { "id": number }, { "slug": "..." }, or { "all": true }. Optional: "rebuild": true',
		}),
		{
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		},
	);
};
