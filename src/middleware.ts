import { defineMiddleware } from 'astro:middleware';
import {
	isMappedSeoPath,
	resolveAliasRedirect,
	WP_SEO_REVALIDATE,
} from './lib/wp-seo';

function isBlogsListingPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	return p === '/blogs';
}

/**
 * SEO pages advertise CDN/edge revalidation.
 * Former CMS paths in WP_SEO_PATH_ALIASES 301 to the live slug route.
 * `/blogs` is SSR + live WP status — never edge-cache that HTML.
 * `?refresh=1` busts the WordPress posts disk/memory cache in dev.
 */
export const onRequest = defineMiddleware(async (context, next) => {
	if (context.url.searchParams.get('refresh') === '1') {
		// Dynamic import keeps node:fs out of the middleware module graph unless needed.
		const { clearWpPostsCache } = await import('./lib/wp');
		clearWpPostsCache();
	}

	const aliasTarget = await resolveAliasRedirect(context.url.pathname);
	if (aliasTarget) {
		return context.redirect(aliasTarget, 301);
	}

	const response = await next();

	if (isBlogsListingPath(context.url.pathname)) {
		response.headers.set(
			'Cache-Control',
			'private, no-store, no-cache, must-revalidate, max-age=0',
		);
		response.headers.set('CDN-Cache-Control', 'no-store');
		response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
		return response;
	}

	if (await isMappedSeoPath(context.url.pathname)) {
		response.headers.set(
			'Cache-Control',
			`public, s-maxage=${WP_SEO_REVALIDATE}, stale-while-revalidate`,
		);
	}
	return response;
});
