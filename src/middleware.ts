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
import { applySecurityHeaders } from './lib/security-headers';
import { resolveLegacyServiceRedirect } from './data/legacy-service-redirects';

function isBlogsListingPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	return p === '/blog' || p === '/blogs';
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

	/** 301s must not inherit CF “Browser Cache TTL = 1 year” as opaque HTML. */
	function redirect301(to: string): Response {
		const res = context.redirect(to, 301);
		res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
		res.headers.set('CDN-Cache-Control', 'max-age=300');
		res.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300');
		return res;
	}

	// Legacy capitalized slug (Linux is case-sensitive; keep old links working).
	if (/^\/locations\/Blackburn\/?$/i.test(context.url.pathname) && context.url.pathname.includes('B')) {
		return redirect301('/locations/blackburn/');
	}

	// Retired WP service pages → current /services/... (exact paths only).
	const legacyServiceTarget = resolveLegacyServiceRedirect(context.url.pathname);
	if (legacyServiceTarget) {
		return redirect301(legacyServiceTarget);
	}

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
		return redirect301(aliasTarget);
	}

	const useHtmlCache =
		isHtmlCacheEnabled() &&
		method === 'GET' &&
		!refresh &&
		isHtmlCacheablePath(pathname);

	if (useHtmlCache) {
		const hit = await getHtmlCache(pathname);
		if (hit) {
			const cached = responseFromHtmlCache(hit);
			applySecurityHeaders(cached.headers);
			return cached;
		}
	}

	const response = await next();
	applySecurityHeaders(response.headers);
	applyCacheHeaders(response, pathname, refresh);

	const isNonPageAsset =
		pathname.startsWith('/_astro/') ||
		pathname.startsWith('/api/') ||
		pathname.startsWith('/images/') ||
		pathname.startsWith('/videos/') ||
		pathname.startsWith('/fonts/') ||
		pathname.startsWith('/icons/') ||
		/\.(?:js|mjs|css|map|json|woff2?|ttf|eot|webp|avif|png|jpe?g|gif|svg|ico|mp4|webm|mp3)$/i.test(
			pathname,
		);
	if (isNonPageAsset) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	}

	// Stop CF “Browser Cache TTL = 1 year” from pinning stale HTML at the edge.
	if (
		!response.headers.has('Cloudflare-CDN-Cache-Control') &&
		(response.headers.get('Content-Type') || '').includes('text/html')
	) {
		response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=60');
	}

	const isXmlOrSitemap =
		pathname.endsWith('.xml') ||
		pathname === '/sitemap_index' ||
		pathname === '/page-sitemap' ||
		pathname === '/post-sitemap' ||
		pathname === '/sitemap';

	// Dynamic sitemaps must never be edge-cached (CF was pinning empty/old XML).
	if (isXmlOrSitemap) {
		response.headers.set(
			'Cache-Control',
			'private, no-store, no-cache, must-revalidate, max-age=0',
		);
		response.headers.set('CDN-Cache-Control', 'no-store');
		response.headers.set('Cloudflare-CDN-Cache-Control', 'no-store');
		response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
	}

	/**
	 * Blog list/post HTML already got Cache-Control from applyCacheHeaders.
	 * Do not overwrite with WP_SEO_REVALIDATE (3600) — that left /blog CDN-HIT
	 * on stale featured-image URLs after WP media re-uploads.
	 * Also honour ?refresh=1 (no-store) for every path.
	 */
	const blogCacheOwned =
		isBlogsListingPath(pathname) ||
		isLegacyBlogSlugPath(pathname) ||
		isBlogPostPath(pathname);

	if (refresh) {
		response.headers.set('Cache-Control', BLOG_NO_STORE);
		response.headers.set('CDN-Cache-Control', BLOG_NO_STORE);
		response.headers.set('Vercel-CDN-Cache-Control', BLOG_NO_STORE);
	} else if (
		!isXmlOrSitemap &&
		!blogCacheOwned &&
		(await isMappedSeoPath(context.url.pathname))
	) {
		// Homepage forms are in HTML `action` — keep edge TTL short so CF7 ID
		// changes (15940 → 15862) are not stuck behind year-long CDN HITs.
		const sMaxAge = pathname === '/' ? 60 : WP_SEO_REVALIDATE;
		const htmlCache = `public, max-age=0, must-revalidate, s-maxage=${sMaxAge}, stale-while-revalidate=600`;
		response.headers.set('Cache-Control', htmlCache);
		response.headers.set('CDN-Cache-Control', htmlCache);
		response.headers.set('Vercel-CDN-Cache-Control', htmlCache);
	} else if (!isXmlOrSitemap && !blogCacheOwned && response.status === 200) {
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
				const htmlCache =
					'public, max-age=0, s-maxage=300, stale-while-revalidate=86400';
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
