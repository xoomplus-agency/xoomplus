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
import {
	getHtmlCache,
	isHtmlCacheEnabled,
	isHtmlCacheablePath,
	purgeHtmlCache,
	responseFromHtmlCache,
	setHtmlCache,
	normalizeHtmlCachePath,
} from './lib/html-cache';

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
	return (
		/^\/[^/]+\/[^/]+$/.test(p) &&
		!p.startsWith('/services/') &&
		!p.startsWith('/api/') &&
		!p.startsWith('/locations/')
	);
}

function applyCacheHeaders(
	response: Response,
	pathname: string,
	refresh: boolean,
): void {
	if (isLegacyBlogSlugPath(pathname)) {
		response.headers.set('Cache-Control', BLOG_NO_STORE);
		response.headers.set('CDN-Cache-Control', BLOG_NO_STORE);
		response.headers.set('Vercel-CDN-Cache-Control', BLOG_NO_STORE);
		return;
	}

	if (isBlogsListingPath(pathname) && response.status === 200) {
		const htmlCache = refresh ? BLOG_NO_STORE : BLOG_LIST_CACHE_CONTROL;
		response.headers.set('Cache-Control', htmlCache);
		response.headers.set('CDN-Cache-Control', htmlCache);
		response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
		return;
	}

	if (isBlogPostPath(pathname) && response.status === 200) {
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
}

/**
 * SEO/blog Cache-Control for CDN/ISR.
 * When HTML_CACHE=1 (Node/cPanel): serve/store app HTML cache (skip /blogs shells).
 */
export const onRequest = defineMiddleware(async (context, next) => {
	const refresh = context.url.searchParams.get('refresh') === '1';
	const method = context.request.method.toUpperCase();
	const pathname = normalizeHtmlCachePath(context.url.pathname);

	if (refresh) {
		const { clearWpPostsCache } = await import('./lib/wp-posts');
		const { clearWpPageCache } = await import('./lib/wp');
		clearWpPostsCache();
		clearWpPageCache({ disk: true });
		if (isHtmlCacheEnabled() && isHtmlCacheablePath(pathname)) {
			await purgeHtmlCache([pathname]);
		}
	}

	const aliasTarget = await resolveAliasRedirect(context.url.pathname);
	if (aliasTarget) {
		return context.redirect(aliasTarget, 301);
	}

	const useHtmlCache =
		isHtmlCacheEnabled() &&
		method === 'GET' &&
		!refresh &&
		isHtmlCacheablePath(pathname);

	if (useHtmlCache) {
		const hit = await getHtmlCache(pathname);
		if (hit) return responseFromHtmlCache(hit);
	}

	const response = await next();
	applyCacheHeaders(response, pathname, refresh);

	const isXmlOrSitemap =
		pathname.endsWith('.xml') ||
		pathname === '/sitemap_index' ||
		pathname === '/page-sitemap' ||
		pathname === '/post-sitemap' ||
		pathname === '/sitemap';

	if (!isXmlOrSitemap && (await isMappedSeoPath(context.url.pathname))) {
		const sMaxAge = pathname === '/' ? 300 : WP_SEO_REVALIDATE;
		const htmlCache = `public, s-maxage=${sMaxAge}, stale-while-revalidate=86400`;
		response.headers.set('Cache-Control', htmlCache);
		response.headers.set('CDN-Cache-Control', htmlCache);
		response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
	} else if (!isXmlOrSitemap && response.status === 200) {
		const isAsset =
			pathname.startsWith('/_astro/') ||
			pathname.startsWith('/images/') ||
			pathname.startsWith('/videos/') ||
			pathname.startsWith('/fonts/') ||
			pathname.startsWith('/icons/') ||
			pathname.startsWith('/api/');
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

	if (useHtmlCache && response.status === 200) {
		try {
			const body = await response.clone().text();
			await setHtmlCache(pathname, response, body);
			response.headers.set('X-HTML-Cache', 'MISS');
		} catch (err) {
			console.warn('[html-cache] store failed:', err);
		}
	}

	return response;
});
