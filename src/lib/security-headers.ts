/**
 * Security response headers for Astro middleware (Vercel + Node SSR).
 * Keep values in sync with vercel.json and server.js.
 */

export const SECURITY_HEADERS: ReadonlyArray<readonly [string, string]> = [
	['Strict-Transport-Security', 'max-age=31536000; includeSubDomains'],
	[
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk https://*.googleapis.com https://*.gstatic.com https://*.google.com",
			"font-src 'self' data:",
			'frame-src https://www.google.com https://maps.google.com',
			"connect-src 'self' https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk",
			"object-src 'none'",
			"base-uri 'self'",
			"form-action 'self' https://xoomplus.co.uk https://www.xoomplus.co.uk https://xoomplusagency.com https://www.xoomplusagency.com https://cms.xoomplus.co.uk",
			"frame-ancestors 'self'",
			'upgrade-insecure-requests',
		].join('; '),
	],
	['X-Frame-Options', 'SAMEORIGIN'],
	['X-Content-Type-Options', 'nosniff'],
	['Referrer-Policy', 'strict-origin-when-cross-origin'],
	[
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
	],
] as const;

export function applySecurityHeaders(headers: Headers): void {
	for (const [key, value] of SECURITY_HEADERS) {
		headers.set(key, value);
	}
}
