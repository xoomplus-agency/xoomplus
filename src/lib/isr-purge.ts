/**
 * Vercel ISR on-demand invalidation via `x-prerender-revalidate` bypass token.
 * @see https://docs.astro.build/en/guides/integrations-guide/vercel/#on-demand-invalidation
 */

import { getSiteUrl } from './wp-seo';

function getIsrBypassToken(): string | undefined {
	try {
		const fromAstro =
			(import.meta.env.ISR_BYPASS_TOKEN as string | undefined) ||
			(import.meta.env.REVALIDATE_SECRET as string | undefined);
		if (fromAstro?.trim()) return fromAstro.trim();
	} catch {
		/* ignore */
	}
	const fromProcess =
		(typeof process !== 'undefined' && process.env?.ISR_BYPASS_TOKEN) ||
		(typeof process !== 'undefined' && process.env?.REVALIDATE_SECRET);
	return typeof fromProcess === 'string' ? fromProcess.trim() || undefined : undefined;
}

function siteOrigin(): string | undefined {
	const site = getSiteUrl()?.replace(/\/+$/, '');
	if (site) return site;
	const vercel =
		typeof process !== 'undefined'
			? process.env?.VERCEL_PROJECT_PRODUCTION_URL || process.env?.VERCEL_URL
			: undefined;
	if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`;
	return undefined;
}

/** Normalize to a path starting with `/` (no trailing slash except root). */
export function normalizePurgePath(path: string): string {
	if (!path || path === '/') return '/';
	const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
	return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

/**
 * HEAD request with bypass token forces Vercel to drop the cached HTML for that path.
 * Returns per-path results; never throws.
 */
export async function purgeIsrPaths(
	paths: string[],
): Promise<{ path: string; ok: boolean; status?: number; error?: string }[]> {
	const token = getIsrBypassToken();
	const origin = siteOrigin();
	const unique = [...new Set(paths.map(normalizePurgePath))];

	if (!token) {
		console.warn('[isr-purge] ISR_BYPASS_TOKEN / REVALIDATE_SECRET missing — skip CDN purge');
		return unique.map((path) => ({
			path,
			ok: false,
			error: 'missing bypass token',
		}));
	}
	if (!origin) {
		console.warn('[isr-purge] SITE_URL / VERCEL_URL missing — skip CDN purge');
		return unique.map((path) => ({
			path,
			ok: false,
			error: 'missing site origin',
		}));
	}

	return Promise.all(
		unique.map(async (path) => {
			const url = path === '/' ? `${origin}/` : `${origin}${path}`;
			try {
				const res = await fetch(url, {
					method: 'HEAD',
					headers: { 'x-prerender-revalidate': token },
					signal: AbortSignal.timeout(15_000),
				});
				const ok = res.ok || res.status === 404;
				if (!ok) {
					console.warn(`[isr-purge] ${path} → ${res.status}`);
				}
				return { path, ok, status: res.status };
			} catch (err) {
				const error = err instanceof Error ? err.message : String(err);
				console.warn(`[isr-purge] ${path} failed: ${error}`);
				return { path, ok: false, error };
			}
		}),
	);
}
