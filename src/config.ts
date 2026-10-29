/**
 * Site-wide feature flags (build-time).
 * `SITE_NOINDEX` is owned by `/site-flags.mjs` so Express can serve robots.txt
 * without waiting on a Cloudflare-cached Astro response.
 */
export { SITE_NOINDEX } from '../site-flags.mjs';

/**
 * When true, posts with Yoast `robots.index === "noindex"` keep
 * `<meta name="robots" content="noindex, follow">`. Sitemap inclusion follows Yoast.
 * When false, those posts are treated as indexable.
 * In both cases the post is still fetched, rendered, and linked normally.
 * Ignored while `SITE_NOINDEX` is true (everything is noindex anyway).
 */
export const RESPECT_CMS_NOINDEX = false;

/**
 * How to handle child services marked `disabled: true`.
 * - `"404"` — do not generate pages (URLs fall through to 404). Default.
 * - `"redirect-parent"` — 301 each disabled URL to its main service page
 *   via `astro.config` redirects built from the same `disabled` flag.
 * Flip this constant to switch behaviour; no hardcoded slug list required.
 */
export const REMOVED_CHILD_PAGES = '404' as '404' | 'redirect-parent';

/** Byline on single blog posts (display + Article JSON-LD author). */
export const BLOG_AUTHOR = {
	name: 'Xoomplus',
	role: 'Digital Agency',
} as const;
