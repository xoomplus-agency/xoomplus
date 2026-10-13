/**
 * Unified path purge for Vercel ISR + Node HTML cache (cPanel/Apache).
 */

import { purgeHtmlCache } from './html-cache';
import { normalizePurgePath, purgeIsrPaths } from './isr-purge';

function isVercel(): boolean {
	return (
		typeof process !== 'undefined' &&
		(process.env?.VERCEL === '1' || process.env?.VERCEL === 'true')
	);
}

export { normalizePurgePath };

/**
 * Purge app HTML cache always; on Vercel also send ISR bypass HEADs.
 */
export async function purgeCachedPaths(paths: string[]): Promise<{
	html: { path: string; ok: boolean }[];
	isr: { path: string; ok: boolean; status?: number; error?: string }[];
}> {
	const unique = [...new Set(paths.map(normalizePurgePath))];
	const html = await purgeHtmlCache(unique);

	let isr: { path: string; ok: boolean; status?: number; error?: string }[] = [];
	if (isVercel()) {
		isr = await purgeIsrPaths(unique);
	}

	return { html, isr };
}

/** Clear every cached HTML page (Node) and optionally attempt ISR for known paths. */
export async function purgeAllHtmlCache(): Promise<{
	html: { path: string; ok: boolean }[];
	isr: { path: string; ok: boolean; status?: number; error?: string }[];
}> {
	const html = await purgeHtmlCache(['*']);
	return { html, isr: [] };
}
