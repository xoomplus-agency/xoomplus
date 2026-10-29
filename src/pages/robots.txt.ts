import type { APIRoute } from 'astro';
import { SITE_NOINDEX } from '../config';
import { getSiteUrl } from '../lib/wp-seo';
import { buildRobotsTxt } from '../../site-robots.mjs';

export const prerender = false;

/** Fallback if a request reaches Astro instead of Express. */
export const GET: APIRoute = ({ url }) => {
	const site = getSiteUrl() || `${url.protocol}//${url.host}`;
	const body = buildRobotsTxt(site, SITE_NOINDEX);

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'private, no-store, no-cache, must-revalidate, max-age=0',
			'CDN-Cache-Control': 'no-store',
			'Cloudflare-CDN-Cache-Control': 'no-store',
			Pragma: 'no-cache',
			Expires: '0',
		},
	});
};
