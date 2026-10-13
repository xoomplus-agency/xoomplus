import { g as triggerDeployHook, h as resolveIdFromSlugAsync, i as getLiveWpSlugForId, o as getRevalidateSecret, p as peekCachedWpSlug, t as WP_SEO_PAGES, u as invalidateWpSeoCache, v as __exportAll } from "./wp-seo_BlJOjkiY.mjs";
//#region src/pages/api/revalidate.ts
var revalidate_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	const expected = getRevalidateSecret();
	const provided = request.headers.get("x-revalidate-secret");
	if (!expected || provided !== expected) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	let body = {};
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const forceRebuild = body.rebuild === true;
	if (body.all === true) {
		invalidateWpSeoCache();
		const deploy = forceRebuild ? await triggerDeployHook("revalidate all + rebuild") : {
			triggered: false,
			ok: false
		};
		return new Response(JSON.stringify({
			revalidated: true,
			slug: "all",
			id: null,
			rebuild: forceRebuild,
			deploy
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
	async function revalidateById(id, label) {
		const previousSlug = peekCachedWpSlug(id);
		invalidateWpSeoCache(id);
		const nextSlug = await getLiveWpSlugForId(id);
		const slugChanged = previousSlug != null && nextSlug != null && previousSlug !== nextSlug;
		const mapped = Object.values(WP_SEO_PAGES).some((p) => p.id === id);
		const shouldRebuild = forceRebuild || slugChanged;
		let deploy = {
			triggered: false,
			ok: false
		};
		if (shouldRebuild) {
			const reason = slugChanged ? `slug change id ${id}: "${previousSlug}" → "${nextSlug}"` : `rebuild requested for id ${id}`;
			deploy = await triggerDeployHook(reason);
		} else if (mapped) console.warn(`[wp-seo] revalidated id ${id} (SEO cache only). Slug unchanged — no rebuild.`);
		return {
			revalidated: true,
			id,
			slug: label ?? nextSlug,
			previousSlug,
			nextSlug,
			slugChanged,
			rebuild: shouldRebuild,
			deploy
		};
	}
	if (typeof body.id === "number" && Number.isFinite(body.id)) {
		const result = await revalidateById(body.id);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
	if (typeof body.slug === "string" && body.slug.length > 0) {
		const id = await resolveIdFromSlugAsync(body.slug);
		if (id == null) return new Response(JSON.stringify({ error: `No mapped WP page for slug "${body.slug}"` }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const result = await revalidateById(id, body.slug);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
	return new Response(JSON.stringify({ error: "Provide { \"id\": number }, { \"slug\": \"...\" }, or { \"all\": true }. Optional: \"rebuild\": true" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/revalidate@_@ts
var page = () => revalidate_exports;
//#endregion
export { page };
