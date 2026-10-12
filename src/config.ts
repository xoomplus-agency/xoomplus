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
