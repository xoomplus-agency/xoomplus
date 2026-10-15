/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SITE_ENV?: string;
	readonly SITE_URL?: string;
	readonly WP_BASE_URL?: string;
	readonly REVALIDATE_SECRET?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
