import type { APIRoute } from 'astro';
import { isProduction } from '../lib/site-env';
import { getSiteUrl } from '../lib/wp-seo';

export const GET: APIRoute = () => {
	let body: string;

	if (isProduction()) {
		body = 'User-agent: *\nAllow: /\n';
		const site = getSiteUrl();
		if (site) {
			body += `\nSitemap: ${site.replace(/\/+$/, '')}/sitemap_index.xml\n`;
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
