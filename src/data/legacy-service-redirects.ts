/**
 * Exact-path 301s from retired WordPress service URLs → current `/services/...` routes.
 * Only the listed service pages — never whole category trees (blog posts keep
 * `/digital-marketing/...`, `/web-solutions/...`, etc.).
 */
const LEGACY_SERVICE_REDIRECT_PAIRS: ReadonlyArray<readonly [string, string]> = [
	// Main services
	['/digital-marketing', '/services'],
	['/web-solutions', '/services/web-design-development'],
	['/graphic-design-solutions', '/services/web-design-development'],

	// Digital Marketing children
	['/digital-marketing/social-media-marketing', '/services/social-media-marketing'],
	['/digital-marketing/content-marketing', '/services/social-media-marketing'],
	['/digital-marketing/ppc-ads-services', '/services/ppc-google-ads'],
	['/digital-marketing/search-engine-optimisation-seo', '/services/seo'],
	['/digital-marketing/email-marketing', '/services'],

	// Web Solutions children
	[
		'/web-solutions/ecommerce-website-development',
		'/services/web-design-development/ecommerce-development',
	],
	[
		'/web-solutions/wordpress-development',
		'/services/web-design-development/wordpress-development',
	],
	[
		'/web-solutions/custom-website-development',
		'/services/web-design-development/custom-website-development',
	],
	[
		'/web-solutions/shopify-store-development',
		'/services/web-design-development/shopify-development',
	],
	['/web-solutions/website-maintenance-and-support', '/services/web-design-development'],
	[
		'/web-solutions/website-hosting-and-domain-management',
		'/services/web-design-development',
	],

	// Graphic Design children
	[
		'/graphic-design-solutions/website-ui-ux-design',
		'/services/web-design-development/ui-ux-design',
	],
	['/graphic-design-solutions/infographic-design', '/services/web-design-development'],
	[
		'/graphic-design-solutions/social-media-post-design',
		'/services/social-media-marketing',
	],
	['/graphic-design-solutions/logo-design-service', '/services/web-design-development'],
	['/graphic-design-solutions/brand-identity-design', '/services/web-design-development'],
	['/graphic-design-solutions/print-design', '/services/web-design-development'],
];

function withTrailingSlash(path: string): string {
	return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Astro `redirects` map — trailing-slash keys only (avoids slash-variant collisions).
 * Middleware still accepts both slash forms via `resolveLegacyServiceRedirect`.
 */
export function getLegacyServiceRedirects(): Record<
	string,
	string | { status: 301; destination: string }
> {
	const redirects: Record<string, { status: 301; destination: string }> = {};
	for (const [from, to] of LEGACY_SERVICE_REDIRECT_PAIRS) {
		redirects[withTrailingSlash(from)] = {
			status: 301,
			destination: withTrailingSlash(to),
		};
	}
	return redirects;
}

const LOOKUP = new Map<string, string>();
for (const [from, to] of LEGACY_SERVICE_REDIRECT_PAIRS) {
	const destination = withTrailingSlash(to);
	LOOKUP.set(from.replace(/\/+$/, '') || '/', destination);
}

/** Middleware helper — exact legacy service path → new path, or null. */
export function resolveLegacyServiceRedirect(pathname: string): string | null {
	const normalized = pathname.replace(/\/+$/, '') || '/';
	return LOOKUP.get(normalized) ?? null;
}
