import type { APIRoute } from 'astro';
import { isProduction } from '../lib/site-env';

export const GET: APIRoute = ({ site }) => {
	let body: string;

	if (isProduction()) {
		body = 'User-agent: *\nAllow: /\n';
		if (site) {
			body += `\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
		}
	} else {
		// Staging: block crawling; do not advertise a sitemap.
		body = 'User-agent: *\nDisallow: /\n';
	}

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
};
