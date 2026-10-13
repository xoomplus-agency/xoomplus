/**
 * Lightweight deploy diagnostic — reports whether required env vars are present
 * (never prints values) and whether WordPress responds.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getSiteUrl, getWpBaseUrl } from '../../lib/wp-seo';
import { isProduction, isStaging } from '../../lib/site-env';

export const GET: APIRoute = async () => {
	const wpBase = getWpBaseUrl();
	const siteUrl = getSiteUrl();
	let wpOk: boolean | null = null;
	let wpStatus: number | null = null;
	let wpMs: number | null = null;

	if (wpBase) {
		const started = Date.now();
		try {
			const res = await fetch(`${wpBase}/wp-json/wp/v2/pages/215?_fields=id`, {
				signal: AbortSignal.timeout(10_000),
				headers: { 'Cache-Control': 'no-cache' },
			});
			wpStatus = res.status;
			wpOk = res.ok;
			wpMs = Date.now() - started;
		} catch {
			wpOk = false;
			wpMs = Date.now() - started;
		}
	}

	const body = {
		ok: Boolean(wpBase && siteUrl && wpOk),
		siteEnv: isProduction() ? 'production' : isStaging() ? 'staging' : 'unknown',
		env: {
			WP_BASE_URL: wpBase ? 'set' : 'missing',
			SITE_URL: siteUrl ? 'set' : 'missing',
		},
		wordpress: {
			reachable: wpOk,
			status: wpStatus,
			latencyMs: wpMs,
		},
		runtime: {
			node: process.version,
			vercel: process.env.VERCEL === '1',
		},
	};

	return new Response(JSON.stringify(body, null, 2), {
		status: body.ok ? 200 : 503,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
};
