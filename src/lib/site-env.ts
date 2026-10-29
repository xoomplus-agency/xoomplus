/** Live site is always production. No SITE_ENV required. */

export function isProduction(): boolean {
	return true;
}

export function isStaging(): boolean {
	return false;
}
