/**
 * Deploy diagnostic — env presence + WordPress reachability.
 * Probe: GET ${WP_BASE_URL}/wp-json/wp/v2/pages?per_page=1&_fields=id,slug,link
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getSiteUrl, getWpBaseUrl } from '../../lib/wp-seo';
import { isProduction, isStaging } from '../../lib/site-env';

export const GET: APIRoute = async () => {
	const wpBase =
		(typeof process !== 'undefined' ? process.env.WP_BASE_URL : undefined)?.replace(
			/\/+$/,
			'',
		) || getWpBaseUrl();
	const siteUrl =
		(typeof process !== 'undefined' ? process.env.SITE_URL : undefined)?.replace(
			/\/+$/,
			'',
		) || getSiteUrl();

	let wpOk: boolean | null = null;
	let wpStatus: number | null = null;
	let wpMs: number | null = null;
	let wpContentType: string | null = null;
	let wpBodyPreview: string | null = null;
	let wpUrl: string | null = null;

	if (wpBase) {
		wpUrl = `${wpBase.replace(/\/+$/, '')}/wp-json/wp/v2/pages?per_page=1&_fields=id,slug,link`;
		const started = Date.now();
		try {
			const res = await fetch(wpUrl, {
				signal: AbortSignal.timeout(10_000),
				headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
			});
			wpStatus = res.status;
			wpContentType = res.headers.get('content-type');
			const text = await res.text();
			wpBodyPreview = text.slice(0, 200);
			wpOk = res.ok;
			wpMs = Date.now() - started;
			console.error(
				`[health] WP probe url=${wpUrl} status=${wpStatus} content-type=${wpContentType} body[0..200]=${wpBodyPreview}`,
			);
		} catch (err) {
			wpOk = false;
			wpMs = Date.now() - started;
			const msg = err instanceof Error ? err.message : String(err);
			console.error(`[health] WP probe failed url=${wpUrl}:`, msg);
			wpBodyPreview = msg.slice(0, 200);
		}
	}

	const hostsMatch = Boolean(
		wpBase &&
			siteUrl &&
			(() => {
				try {
					return (
						new URL(wpBase).host.toLowerCase() === new URL(siteUrl).host.toLowerCase()
					);
				} catch {
					return false;
				}
			})(),
	);

	const body = {
		ok: Boolean(wpBase && siteUrl && wpOk && !hostsMatch),
		siteEnv: isProduction() ? 'production' : isStaging() ? 'staging' : 'unknown',
		env: {
			WP_BASE_URL: wpBase ? 'set' : 'missing',
			SITE_URL: siteUrl ? 'set' : 'missing',
			WP_EQUALS_SITE: hostsMatch,
		},
		wordpress: {
			probeUrl: wpUrl,
			reachable: wpOk,
			status: wpStatus,
			contentType: wpContentType,
			bodyPreview: wpBodyPreview,
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
