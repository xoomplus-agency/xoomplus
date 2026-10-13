import { defineMiddleware } from 'astro:middleware';
import {
	isMappedSeoPath,
	resolveAliasRedirect,
	WP_SEO_REVALIDATE,
} from './lib/wp-seo';
import {
	BLOG_LIST_CACHE_CONTROL,
	BLOG_NO_STORE,
	BLOG_POST_CACHE_CONTROL,
} from './lib/wp-posts';

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
	return (
		/^\/[^/]+\/[^/]+$/.test(p) &&
		!p.startsWith('/services/') &&
		!p.startsWith('/api/') &&
		!p.startsWith('/locations/')
	);
}

/**
 * SEO pages + blog HTML advertise CDN/ISR caching (s-maxage=300).
 * Former CMS paths in WP_SEO_PATH_ALIASES 301 to the live slug route.
 * Legacy /blogs/<slug> redirects stay no-store. ?refresh=1 forces no-store.
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
	const refresh = context.url.searchParams.get('refresh') === '1';

	// Legacy /blogs/<slug> redirects — never cache
	if (isLegacyBlogSlugPath(context.url.pathname)) {
		response.headers.set('Cache-Control', BLOG_NO_STORE);
		response.headers.set('CDN-Cache-Control', BLOG_NO_STORE);
		response.headers.set('Vercel-CDN-Cache-Control', BLOG_NO_STORE);
		return response;
	}

	if (isBlogsListingPath(context.url.pathname) && response.status === 200) {
		const htmlCache = refresh ? BLOG_NO_STORE : BLOG_LIST_CACHE_CONTROL;
		response.headers.set('Cache-Control', htmlCache);
		response.headers.set('CDN-Cache-Control', htmlCache);
		response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
		return response;
	}

	// Single posts: CDN/ISR TTL; ?refresh=1 → no-store.
	if (isBlogPostPath(context.url.pathname) && response.status === 200) {
		if (refresh) {
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
		const path = context.url.pathname.replace(/\/+$/, '') || '/';
		const sMaxAge = path === '/' ? 300 : WP_SEO_REVALIDATE;
		const htmlCache = `public, s-maxage=${sMaxAge}, stale-while-revalidate=86400`;
		response.headers.set('Cache-Control', htmlCache);
		response.headers.set('CDN-Cache-Control', htmlCache);
		response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
	} else if (response.status === 200) {
		const path = context.url.pathname.replace(/\/+$/, '') || '/';
		const isAsset =
			path.startsWith('/_astro/') ||
			path.startsWith('/images/') ||
			path.startsWith('/videos/') ||
			path.startsWith('/fonts/') ||
			path.startsWith('/icons/') ||
			path.startsWith('/api/');
		if (!isAsset) {
			const existing = response.headers.get('Cache-Control') || '';
			if (!existing.includes('s-maxage') && !existing.includes('no-store')) {
				const htmlCache = 'public, s-maxage=300, stale-while-revalidate=86400';
				response.headers.set('Cache-Control', htmlCache);
				response.headers.set('CDN-Cache-Control', htmlCache);
				response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
			}
		}
	}
	return response;
});
