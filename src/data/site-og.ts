/**
 * Default Open Graph assets for static (non-blog) pages.
 * Blog posts / blog listing keep their own SEO path — do not use these there.
 */

/** Site logo — used when a static page has no hero image. */
export const SITE_OG_LOGO = '/images/logo-xoomplus.webp';

/** Shared PageHero / breadcrumb background — used as OG when that hero is on the page. */
export const SITE_OG_PAGE_HERO = '/images/bread-crumb-bg-image.webp';

/** Homepage video poster (LCP hero still). */
export const SITE_OG_HOME_HERO = '/videos/bg-hero-poster-960.webp';

/**
 * True for blog listing and WP-shaped blog posts (`/{category}/{slug}/`).
 * Static marketing routes must return false.
 */
export function isBlogSeoPath(pathname: string): boolean {
	const p = pathname.replace(/\/+$/, '') || '/';
	if (p === '/blog' || p === '/blogs' || p.startsWith('/blogs/')) return true;
	if (
		p.startsWith('/services/') ||
		p.startsWith('/locations/') ||
		p.startsWith('/case-studies/') ||
		p.startsWith('/api/') ||
		p.startsWith('/about') ||
		p.startsWith('/contact') ||
		p.startsWith('/industries') ||
		p.startsWith('/pricing') ||
		p.startsWith('/privacy')
	) {
		return false;
	}
	return /^\/[^/]+\/[^/]+$/.test(p);
}
