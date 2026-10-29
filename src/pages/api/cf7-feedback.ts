/**
 * Same-origin CF7 proxy — avoids browser CORS to xoomplusagency.com.
 * POST /api/cf7-feedback?form=contact-homepage|contact-services
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { getCf7FeedbackUrl } from '../../lib/cf7';
import { getCf7FormConfig, type Cf7FormKey } from '../../lib/cf7-forms';

const LEGACY_ID_MAP: Record<string, number> = {
	'15940': 15862,
	'15941': 15863,
};

export const POST: APIRoute = async ({ request, url }) => {
	const formKey = (url.searchParams.get('form') || '').trim() as Cf7FormKey;
	const config = getCf7FormConfig(formKey);
	if (!config) {
		return new Response(JSON.stringify({ status: 'error', message: 'Unknown form' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	}

	let incoming: FormData;
	try {
		incoming = await request.formData();
	} catch {
		return new Response(JSON.stringify({ status: 'error', message: 'Invalid form body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	}

	const out = new FormData();
	for (const [key, value] of incoming.entries()) {
		if (key === '_wpcf7') {
			const raw = String(value);
			out.append('_wpcf7', String(LEGACY_ID_MAP[raw] ?? config.id));
			continue;
		}
		out.append(key, value);
	}
	if (!incoming.has('_wpcf7')) {
		out.append('_wpcf7', String(config.id));
	}

	const endpoint = getCf7FeedbackUrl(config.id);
	let upstream: Response;
	try {
		upstream = await fetch(endpoint, {
			method: 'POST',
			body: out,
			headers: { Accept: 'application/json' },
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : 'Upstream fetch failed';
		return new Response(JSON.stringify({ status: 'error', message: msg }), {
			status: 502,
			headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
		});
	}

	const text = await upstream.text();
	return new Response(text, {
		status: upstream.status,
		headers: {
			'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
			'Cache-Control': 'no-store',
		},
	});
};
