import { ct as defineMiddleware, t as sequence } from "./chunks/sequence_D_4a4hvD.mjs";
import { f as isMappedSeoPath, h as resolveAliasRedirect, r as WP_SEO_REVALIDATE } from "./chunks/wp-seo_tkf0J7_Y.mjs";
//#region src/middleware.ts
function isBlogsListingPath(pathname) {
	return (pathname.replace(/\/+$/, "") || "/") === "/blogs";
}
/**
* SEO pages advertise CDN/edge revalidation.
* Former CMS paths in WP_SEO_PATH_ALIASES 301 to the live slug route.
* `/blogs` is SSR + live WP status — never edge-cache that HTML.
* `?refresh=1` busts the WordPress posts disk/memory cache in dev.
*/
var onRequest$1 = defineMiddleware(async (context, next) => {
	if (context.url.searchParams.get("refresh") === "1") {
		const { clearWpPostsCache } = await import("./chunks/wp_3Jg0x5Z_.mjs").then((n) => n.o);
		clearWpPostsCache();
	}
	const aliasTarget = await resolveAliasRedirect(context.url.pathname);
	if (aliasTarget) return context.redirect(aliasTarget, 301);
	const response = await next();
	if (isBlogsListingPath(context.url.pathname)) {
		response.headers.set("Cache-Control", "private, no-store, no-cache, must-revalidate, max-age=0");
		response.headers.set("CDN-Cache-Control", "no-store");
		response.headers.set("Vercel-CDN-Cache-Control", "no-store");
		return response;
	}
	if (await isMappedSeoPath(context.url.pathname)) response.headers.set("Cache-Control", `public, s-maxage=${WP_SEO_REVALIDATE}, stale-while-revalidate`);
	return response;
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
