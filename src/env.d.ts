/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SITE_ENV?: string;
	readonly SITE_URL?: string;
	readonly WP_BASE_URL?: string;
	/** Optional Yoast sitemap upstream; defaults to WP_BASE_URL. */
	readonly WP_SITEMAP_ORIGIN?: string;
	readonly REVALIDATE_SECRET?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
