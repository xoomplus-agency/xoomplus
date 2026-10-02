import { defineMiddleware } from 'astro:middleware';
import { isStaging, STAGING_ROBOTS } from './lib/site-env';

/**
 * Adds X-Robots-Tag on HTML responses in staging.
 * Note: with default static output, this runs for SSR/on-demand routes and
 * adapters that support middleware — not for plain static file hosts.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();

	if (!isStaging()) {
		return response;
	}

	const contentType = response.headers.get('content-type') ?? '';
	if (contentType.includes('text/html')) {
		response.headers.set('X-Robots-Tag', STAGING_ROBOTS);
	}

	return response;
});
