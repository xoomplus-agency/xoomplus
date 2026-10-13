import { defineMiddleware } from 'astro:middleware';
import {
	isMappedSeoPath,
	resolveAliasRedirect,
	WP_SEO_REVALIDATE,
} from './lib/wp-seo';
import { BLOG_NO_STORE, BLOG_POST_CACHE_CONTROL } from './lib/wp-posts';

function isBlogsListingPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	return p === '/blogs';
}

function isLegacyBlogSlugPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	return /^\/blogs\/[^/]+$/.test(p);
}

function isBlogPostPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	// /{category}/{slug}/ — two segments, not reserved app routes
	return /^\/[^/]+\/[^/]+$/.test(p) && !p.startsWith('/services/') && !p.startsWith('/api/');
}

/**
 * SEO pages advertise CDN/edge revalidation.
 * Former CMS paths in WP_SEO_PATH_ALIASES 301 to the live slug route.
 * Blog listing stays no-store. Single posts use short CDN s-maxage (see page).
 */
export const onRequest = defineMiddleware(async (context, next) => {
	if (context.url.searchParams.get('refresh') === '1') {
		const { clearWpPostsCache } = await import('./lib/wp-posts');
		clearWpPostsCache();
	}

	const aliasTarget = await resolveAliasRedirect(context.url.pathname);
	if (aliasTarget) {
		return context.redirect(aliasTarget, 301);
	}

	const response = await next();

	if (isBlogsListingPath(context.url.pathname) || isLegacyBlogSlugPath(context.url.pathname)) {
		response.headers.set('Cache-Control', BLOG_NO_STORE);
		response.headers.set('CDN-Cache-Control', BLOG_NO_STORE);
		response.headers.set('Vercel-CDN-Cache-Control', BLOG_NO_STORE);
		return response;
	}

	// Single posts: keep page-set CDN cache (or default short TTL). ?refresh=1 → no-store.
	if (isBlogPostPath(context.url.pathname) && response.status === 200) {
		if (context.url.searchParams.get('refresh') === '1') {
			response.headers.set('Cache-Control', BLOG_NO_STORE);
			response.headers.set('CDN-Cache-Control', BLOG_NO_STORE);
			response.headers.set('Vercel-CDN-Cache-Control', BLOG_NO_STORE);
		} else {
			const existing = response.headers.get('Cache-Control') || '';
			if (!existing.includes('s-maxage') && !existing.includes('no-store')) {
				response.headers.set('Cache-Control', BLOG_POST_CACHE_CONTROL);
				response.headers.set('CDN-Cache-Control', BLOG_POST_CACHE_CONTROL);
				response.headers.set('Vercel-CDN-Cache-Control', BLOG_POST_CACHE_CONTROL);
			}
		}
	}

	if (await isMappedSeoPath(context.url.pathname)) {
		response.headers.set(
			'Cache-Control',
			`public, s-maxage=${WP_SEO_REVALIDATE}, stale-while-revalidate`,
		);
	}
	return response;
});
