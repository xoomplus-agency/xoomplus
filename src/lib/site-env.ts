/** Staging is the default until SITE_ENV=production. */
export const STAGING_ROBOTS =
	'noindex, nofollow, noarchive, nosnippet, noimageindex';

export function isProduction(): boolean {
	return import.meta.env.SITE_ENV === 'production';
}

export function isStaging(): boolean {
	return !isProduction();
}
