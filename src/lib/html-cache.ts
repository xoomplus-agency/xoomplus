/**
 * App-level HTML page cache for Node / cPanel (ISR equivalent without Vercel).
 * Memory + optional disk. Disabled on Vercel where adapter ISR handles caching.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const HTML_CACHE_TTL_MS = 300_000;

type CacheEntry = {
	body: string;
	status: number;
	headers: Record<string, string>;
	expires: number;
};

const memory = new Map<string, CacheEntry>();

function isVercel(): boolean {
	return (
		typeof process !== 'undefined' &&
		(process.env?.VERCEL === '1' || process.env?.VERCEL === 'true')
	);
}

function isDev(): boolean {
	try {
		if (import.meta.env?.DEV) return true;
	} catch {
		/* ignore */
	}
	return (
		typeof process !== 'undefined' &&
		(process.env?.NODE_ENV === 'development' ||
			process.env?.ASTRO_DEV === '1')
	);
}

/**
 * Opt-in Node HTML cache (dedicated server with @astrojs/node).
 * Off by default — static public_html builds must not cache during generate.
 * Set HTML_CACHE=1 only when running a long-lived Node process.
 */
export function isHtmlCacheEnabled(): boolean {
	if (isVercel()) return false;
	if (isDev()) return false;
	const flag =
		typeof process !== 'undefined' ? process.env?.HTML_CACHE?.trim() : undefined;
	return flag === '1' || flag === 'true';
}

function cacheDir(): string {
	const fromEnv =
		typeof process !== 'undefined' ? process.env?.HTML_CACHE_DIR?.trim() : '';
	if (fromEnv) return fromEnv;
	return path.join(process.cwd(), '.cache', 'html');
}

/** Normalize to `/` or `/segment` (no trailing slash except root). */
export function normalizeHtmlCachePath(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	const cleaned = pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');
	return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export function isHtmlCacheablePath(pathname: string): boolean {
	const p = normalizeHtmlCachePath(pathname);
	if (p.startsWith('/api/')) return false;
	if (p.startsWith('/_astro/')) return false;
	if (p.startsWith('/_server-islands/')) return false;
	if (p.startsWith('/images/')) return false;
	if (p.startsWith('/videos/')) return false;
	if (p.startsWith('/fonts/')) return false;
	if (p.startsWith('/icons/')) return false;
	if (p === '/favicon.ico' || p === '/favicon.svg' || p === '/robots.txt') {
		return false;
	}
	// /blogs uses server:defer — caching the shell leaves the grid on skeleton forever.
	if (p === '/blogs' || p.startsWith('/blogs/')) return false;
	return true;
}

/** Bodies that must never be stored (islands, stubs, incomplete shells). */
function isUnsafeHtmlBody(body: string): boolean {
	if (body.length < 2_000) return true;
	if (/server-island|_server-islands|data-astro-island/i.test(body)) return true;
	// Blog listing shell with skeleton but no resolved grid
	if (
		/data-blog-listing/i.test(body) &&
		!/data-blog-grid/i.test(body) &&
		/blog-grid-skeleton|BlogGridSkeleton|skeleton/i.test(body)
	) {
		return true;
	}
	return false;
}

function diskKey(pathname: string): string {
	const key = normalizeHtmlCachePath(pathname);
	const hash = createHash('sha256').update(key).digest('hex').slice(0, 32);
	return path.join(cacheDir(), `${hash}.json`);
}

const STORE_HEADERS = [
	'content-type',
	'cache-control',
	'cdn-cache-control',
	'vercel-cdn-cache-control',
	'x-robots-tag',
] as const;

function pickHeaders(headers: Headers): Record<string, string> {
	const out: Record<string, string> = {};
	for (const name of STORE_HEADERS) {
		const v = headers.get(name);
		if (v) out[name] = v;
	}
	return out;
}

function isNoStore(headers: Headers | Record<string, string>): boolean {
	const cc =
		headers instanceof Headers
			? headers.get('cache-control') || ''
			: headers['cache-control'] || '';
	return /no-store|private/i.test(cc);
}

async function readDisk(pathname: string): Promise<CacheEntry | null> {
	try {
		const raw = await readFile(diskKey(pathname), 'utf8');
		const parsed = JSON.parse(raw) as CacheEntry;
		if (
			typeof parsed?.body !== 'string' ||
			typeof parsed.expires !== 'number' ||
			typeof parsed.status !== 'number'
		) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

async function writeDisk(pathname: string, entry: CacheEntry): Promise<void> {
	try {
		const dir = cacheDir();
		await mkdir(dir, { recursive: true });
		await writeFile(diskKey(pathname), JSON.stringify(entry), 'utf8');
	} catch (err) {
		console.warn('[html-cache] disk write failed:', err);
	}
}

async function deleteDisk(pathname: string): Promise<void> {
	try {
		await unlink(diskKey(pathname));
	} catch {
		/* missing file is fine */
	}
}

/**
 * Lookup cached HTML. Returns null on miss / expiry / disabled.
 */
export async function getHtmlCache(
	pathname: string,
): Promise<CacheEntry | null> {
	if (!isHtmlCacheEnabled()) return null;
	const key = normalizeHtmlCachePath(pathname);
	if (!isHtmlCacheablePath(key)) return null;

	const now = Date.now();
	const mem = memory.get(key);
	if (mem && mem.expires > now) return mem;
	if (mem) memory.delete(key);

	const disk = await readDisk(key);
	if (disk && disk.expires > now) {
		memory.set(key, disk);
		return disk;
	}
	if (disk) await deleteDisk(key);
	return null;
}

/**
 * Store a successful HTML response. Skips no-store / non-200 / disabled.
 */
export async function setHtmlCache(
	pathname: string,
	response: Response,
	body: string,
): Promise<void> {
	if (!isHtmlCacheEnabled()) return;
	const key = normalizeHtmlCachePath(pathname);
	if (!isHtmlCacheablePath(key)) return;
	if (response.status !== 200) return;
	if (isNoStore(response.headers)) return;

	const contentType = response.headers.get('content-type') || '';
	if (contentType && !/text\/html/i.test(contentType)) return;
	if (isUnsafeHtmlBody(body)) return;

	const entry: CacheEntry = {
		body,
		status: response.status,
		headers: pickHeaders(response.headers),
		expires: Date.now() + HTML_CACHE_TTL_MS,
	};
	memory.set(key, entry);
	void writeDisk(key, entry);
}

/** Build a Response from a cache entry (adds X-HTML-Cache: HIT). */
export function responseFromHtmlCache(entry: CacheEntry): Response {
	const headers = new Headers(entry.headers);
	headers.set('X-HTML-Cache', 'HIT');
	if (!headers.has('content-type')) {
		headers.set('content-type', 'text/html; charset=utf-8');
	}
	return new Response(entry.body, {
		status: entry.status,
		headers,
	});
}

/**
 * Drop cached HTML for the given paths. Pass empty / `['*']` to clear all.
 */
export async function purgeHtmlCache(
	paths: string[],
): Promise<{ path: string; ok: boolean }[]> {
	const clearAll =
		paths.length === 0 || paths.some((p) => p === '*' || p === 'all');

	if (clearAll) {
		memory.clear();
		try {
			const dir = cacheDir();
			const files = await readdir(dir);
			await Promise.all(
				files
					.filter((f) => f.endsWith('.json'))
					.map((f) => unlink(path.join(dir, f)).catch(() => undefined)),
			);
		} catch {
			/* dir may not exist yet */
		}
		return [{ path: '*', ok: true }];
	}

	const unique = [...new Set(paths.map(normalizeHtmlCachePath))];
	return Promise.all(
		unique.map(async (p) => {
			memory.delete(p);
			await deleteDisk(p);
			return { path: p, ok: true };
		}),
	);
}
