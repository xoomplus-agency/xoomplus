/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly SITE_ENV?: string;
	readonly SITE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
