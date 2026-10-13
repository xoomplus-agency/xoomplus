/**
 * Site-wide feature flags (build-time).
 */

/**
 * When true, posts with Yoast `robots.index === "noindex"` keep
 * `<meta name="robots" content="noindex, follow">`. Sitemap inclusion follows Yoast.
 * When false, those posts are treated as indexable.
 * In both cases the post is still fetched, rendered, and linked normally.
 */
export const RESPECT_CMS_NOINDEX = true;

/** Byline on single blog posts (display + Article JSON-LD author). */
export const BLOG_AUTHOR = {
	name: 'Xoomplus',
	role: 'Digital Agency',
} as const;
