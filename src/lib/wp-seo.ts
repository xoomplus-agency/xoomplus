/**
 * WordPress Yoast SEO helper — page SEO metadata only (no content).
 * Page IDs are permanent; CMS slugs are fetched live and drive Astro routes.
 * Server-side only. Domains from WP_BASE_URL / SITE_URL (never hardcoded).
 */

/** Stable page keys → WordPress page IDs (never change when slugs change). */
export type WpPageKey =
	| 'home'
	| 'about'
	| 'industries'
	| 'caseStudies'
	| 'contact'
	| 'blogs'
	| 'services';

export const WP_SEO_PAGES: Record<WpPageKey, { id: number }> = {
	home: { id: 215 },
	about: { id: 1393 },
	industries: { id: 15927 },
	caseStudies: { id: 1037 },
	contact: { id: 1079 },
	blogs: { id: 1142 },
	services: { id: 1062 },
};

/**
 * Canonical public Astro paths (source of truth for routes / sitemap / redirects).
 * Used even when the WordPress page slug still differs (e.g. WP `projects` → `/case-studies`).
 */
export const WP_PAGE_FALLBACK_ROUTES: Record<WpPageKey, string> = {
	home: '/',
	about: '/about',
	industries: '/industries',
	caseStudies: '/case-studies',
	contact: '/contact',
	blogs: '/blog',
	services: '/services',
};

export const CASE_STUDIES_WP_ID = WP_SEO_PAGES.caseStudies.id;

/**
 * Historical listing paths for mapped pages. Exact match only.
 * Whichever path is NOT the live public route 301s to the live route.
 * Do not list retired slug-change paths here — those should 404, not redirect.
 */
export const WP_SEO_PATH_ALIASES: Partial<Record<WpPageKey, readonly string[]>> = {
	services: ['/our-services'],
};

/** @deprecated Prefer WP_SEO_PAGES. Kept for scripts that still iterate path→id aliases. */
export const PAGE_SEO_ROUTES: Record<string, { id: number; slug?: string; syncSlug?: boolean }> =
	Object.fromEntries(
		(Object.entries(WP_SEO_PAGES) as [WpPageKey, { id: number }][]).map(([key, v]) => [
			WP_PAGE_FALLBACK_ROUTES[key],
			{ id: v.id, syncSlug: true },
		]),
	);

/** SEO payload memory-cache TTL (seconds). */
export const WP_SEO_REVALIDATE = 3600;

/**
 * Route/slug map TTL.
 * Fresh for 60s, then served stale for up to 5 minutes while a refresh runs
 * in the background. `/api/revalidate` still drops the cache immediately.
 * Dev used to be 5s, which refetched every mapped page on almost every click.
 */
function routeCacheTtlMs(): number {
	return 60_000;
}

function routeStaleTtlMs(): number {
	return 5 * 60_000;
}

const SEO_FIELDS =
	'id,slug,link,featured_media,meta,yoast_head_json,_links,_embedded';

/** Warn once per WP id per process for slug drift. */
const driftWarnedIds = new Set<number>();

// —— Types ——

export type RobotsIndex = 'index' | 'noindex';
export type RobotsFollow = 'follow' | 'nofollow';

export interface PageSEORobots {
	index: RobotsIndex | null;
	follow: RobotsFollow | null;
	/** Every robots key except index/follow (values as Yoast returns them). */
	advanced: Record<string, string>;
}

export interface PageSEOFeaturedImage {
	id: number;
	url: string;
	alt: string | null;
	width: number | null;
	height: number | null;
}

export interface PageSEOSocialOg {
	title: string | null;
	description: string | null;
	image: string | null;
	imageWidth: number | null;
	imageHeight: number | null;
	imageType: string | null;
	url: string | null;
	type: string | null;
	siteName: string | null;
	locale: string | null;
}

export interface PageSEOSocialX {
	card: string | null;
	title: string | null;
	description: string | null;
	image: string | null;
}

export interface PageSEO {
	id: number | null;
	slug: string | null;
	wpLink: string | null;
	focusKeyphrase: string | null;
	seoTitle: string | null;
	metaDescription: string | null;
	robots: PageSEORobots;
	breadcrumbTitle: string | null;
	canonical: string | null;
	featuredImage: PageSEOFeaturedImage | null;
	social: {
		og: PageSEOSocialOg;
		x: PageSEOSocialX;
	};
	/** Full Yoast JSON-LD graph (`yoast_head_json.schema`), URLs rewritten to SITE_URL. */
	schema: Record<string, unknown> | null;
	/** Present when WP permalink path ≠ frontend route (slug drift). */
	driftedFrom?: string | null;
}

export interface PageSeoRouteEntry {
	/** Resolved frontend path used for canonical / og:url (from live CMS slug). */
	route: string;
	id: number;
	slug?: string;
	key?: WpPageKey;
	/** @deprecated All WP pages sync from CMS slug now. */
	syncSlug?: boolean;
	mapKey?: string;
}

export interface WpResolvedRoute {
	key: WpPageKey;
	id: number;
	/** Current WordPress slug (for home, WP returns `home`). */
	slug: string;
	/** Frontend path: `/` for home, otherwise `/${slug}`. */
	route: string;
}

// —— Env ——

function stripTrailingSlash(url: string): string {
	return url.replace(/\/+$/, '');
}

/**
 * Server-side env: Astro/Vite statically replaces import.meta.env.KEY.
 * Node/scripts fall back to process.env. Never use PUBLIC_ / NEXT_PUBLIC_.
 */
function readServerEnv(
	name:
		| 'WP_BASE_URL'
		| 'SITE_URL'
		| 'REVALIDATE_SECRET'
		| 'VERCEL_DEPLOY_HOOK_URL'
		| 'DEPLOY_HOOK_URL',
): string | undefined {
	let fromAstro: string | undefined;
	try {
		if (name === 'WP_BASE_URL') fromAstro = import.meta.env.WP_BASE_URL;
		else if (name === 'SITE_URL') fromAstro = import.meta.env.SITE_URL;
		else if (name === 'REVALIDATE_SECRET') fromAstro = import.meta.env.REVALIDATE_SECRET;
		else if (name === 'DEPLOY_HOOK_URL') fromAstro = import.meta.env.DEPLOY_HOOK_URL;
		else fromAstro = import.meta.env.VERCEL_DEPLOY_HOOK_URL;
	} catch {
		fromAstro = undefined;
	}

	const fromProcess =
		typeof process !== 'undefined' ? process.env?.[name] : undefined;

	// Prefer process.env so Vercel runtime env wins over build-time Vite inlining.
	const raw = fromProcess || fromAstro;
	if (!raw) return undefined;
	if (
		name === 'REVALIDATE_SECRET' ||
		name === 'VERCEL_DEPLOY_HOOK_URL' ||
		name === 'DEPLOY_HOOK_URL'
	) {
		return raw.trim();
	}
	return stripTrailingSlash(raw.trim());
}

export function getWpBaseUrl(): string | undefined {
	return readServerEnv('WP_BASE_URL');
}

export function getSiteUrl(): string | undefined {
	return readServerEnv('SITE_URL');
}

/** Used by the revalidate API route. */
export function getRevalidateSecret(): string | undefined {
	return readServerEnv('REVALIDATE_SECRET');
}

/**
 * Host deploy/build hook URL — required for new/updated blog posts and slug
 * changes to appear on the static frontend. Prefers DEPLOY_HOOK_URL, then
 * VERCEL_DEPLOY_HOOK_URL (legacy name).
 */
export function getVercelDeployHookUrl(): string | undefined {
	return readServerEnv('DEPLOY_HOOK_URL') || readServerEnv('VERCEL_DEPLOY_HOOK_URL');
}

// —— Path / route resolution ——

/** Normalize to a map key: "/" or "/segment" (no trailing slash except root). */
export function normalizeSeoPath(path: string): string {
	if (!path || path === '/') return '/';
	const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
	return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

/** Trailing slash on all paths except `/` (matches this site / WP-style permalinks). */
export function withTrailingSlashPath(path: string): string {
	const normalized = normalizeSeoPath(path);
	if (normalized === '/') return '/';
	return `${normalized}/`;
}

export function pathsMatch(a: string, b: string): boolean {
	return normalizeSeoPath(a) === normalizeSeoPath(b);
}

const liveSlugCache = new Map<number, { expires: number; slug: string }>();
let allRoutesCache: {
	expires: number;
	staleUntil: number;
	routes: WpResolvedRoute[];
} | null = null;
let allRoutesInflight: Promise<WpResolvedRoute[]> | null = null;

function routeFromWpSlug(key: WpPageKey, _slug: string): string {
	// Public paths are fixed in Astro; WP slug may lag (aliases 301 the old path).
	return WP_PAGE_FALLBACK_ROUTES[key];
}

/** Cached live slug only — does not hit WordPress (used to detect slug changes). */
export function peekCachedWpSlug(id: number): string | null {
	const cached = liveSlugCache.get(id);
	if (cached && cached.expires > Date.now()) return cached.slug;
	return null;
}

/** Live WP slug for a page ID (fetched by ID; short-lived cache only). */
export async function getLiveWpSlugForId(id: number): Promise<string | null> {
	const ttl = routeCacheTtlMs();
	if (ttl > 0) {
		const cached = liveSlugCache.get(id);
		if (cached && cached.expires > Date.now()) return cached.slug;
	}

	const wpBase = getWpBaseUrl();
	if (!wpBase) {
		console.error(`[wp-seo] getLiveWpSlugForId(${id}): WP_BASE_URL is not set`);
		return null;
	}

	// Slug only. The full Yoast payload is fetched later for the one page being rendered.
	const { slug, status } = await fetchWpSlugById(id, wpBase);
	if (!slug) {
		// Drop this id only. A single failed lookup must not wipe a complete route map.
		liveSlugCache.delete(id);
		console.error(
			`[wp-seo] getLiveWpSlugForId(${id}): fetch failed (HTTP ${status}) — no slug (not using stale cache)`,
		);
		return null;
	}
	if (ttl > 0) {
		liveSlugCache.set(id, { expires: Date.now() + ttl, slug });
	} else {
		liveSlugCache.delete(id);
	}
	return slug;
}

async function loadAllWpPageRoutes(): Promise<WpResolvedRoute[]> {
	const entries = Object.entries(WP_SEO_PAGES) as [WpPageKey, { id: number }][];
	const resolved = await Promise.all(
		entries.map(async ([key, { id }]) => {
			const slug = await getLiveWpSlugForId(id);
			if (!slug) {
				console.error(`[wp-seo] could not resolve slug for key "${key}" (id ${id})`);
				return null;
			}
			return {
				key,
				id,
				slug,
				route: routeFromWpSlug(key, slug),
			} satisfies WpResolvedRoute;
		}),
	);
	const routes = resolved.filter((r): r is WpResolvedRoute => r != null);
	const missing = routes.length !== entries.length;

	// Only cache a complete map — never freeze a partial/stale route table.
	// A failed refresh keeps the previous complete map.
	if (!missing) {
		const now = Date.now();
		allRoutesCache = {
			expires: now + routeCacheTtlMs(),
			staleUntil: now + routeStaleTtlMs(),
			routes,
		};
	}
	return routes;
}

/**
 * Resolve every mapped WP page to its current CMS slug + frontend route.
 * Used by on-demand [slug] routing, nav, and check:wp-routes.
 * Concurrent callers share one in-flight request.
 */
export async function getAllWpPageRoutes(): Promise<WpResolvedRoute[]> {
	const now = Date.now();
	if (allRoutesCache && allRoutesCache.expires > now) {
		return allRoutesCache.routes;
	}

	if (allRoutesCache && allRoutesCache.staleUntil > now) {
		if (!allRoutesInflight) {
			const previous = allRoutesCache.routes;
			allRoutesInflight = loadAllWpPageRoutes()
				.catch((err) => {
					console.error('[wp-seo] background route refresh failed:', err);
					return previous;
				})
				.finally(() => {
					allRoutesInflight = null;
				});
		}
		return allRoutesCache.routes;
	}

	if (!allRoutesInflight) {
		allRoutesInflight = loadAllWpPageRoutes().finally(() => {
			allRoutesInflight = null;
		});
	}
	return allRoutesInflight;
}

/** Frontend path for a stable page key (e.g. `services` → `/services` from live CMS slug). */
export async function getWpPagePath(key: WpPageKey): Promise<string> {
	const routes = await getAllWpPageRoutes();
	const hit = routes.find((r) => r.key === key);
	if (hit) return hit.route;
	const fallback = WP_PAGE_FALLBACK_ROUTES[key];
	console.error(
		`[wp-seo] getWpPagePath("${key}"): live CMS slug unavailable — using fallback ${fallback}. Check WP_BASE_URL / page publish status.`,
	);
	return fallback;
}

/**
 * If `pathname` is a known former path for a mapped page whose CMS slug moved,
 * return the current frontend route (caller should 301). Otherwise null.
 */
const ALIAS_PATHS = new Set(
	Object.values(WP_SEO_PATH_ALIASES)
		.flat()
		.map((alias) => normalizeSeoPath(alias)),
);

export async function resolveAliasRedirect(
	pathname: string,
): Promise<string | null> {
	const normalized = normalizeSeoPath(pathname);
	// Most requests (home, services, posts) are not historical aliases.
	// Do not wait on WordPress just to discover that.
	if (!ALIAS_PATHS.has(normalized)) return null;
	const routes = await getAllWpPageRoutes();

	for (const [key, aliases] of Object.entries(WP_SEO_PATH_ALIASES) as [
		WpPageKey,
		readonly string[],
	][]) {
		if (!aliases.some((alias) => pathsMatch(alias, normalized))) continue;
		const hit = routes.find((r) => r.key === key);
		if (!hit) {
			console.warn(
				`[wp-seo] alias "${normalized}" matched key "${key}" but live route is unresolved`,
			);
			return null;
		}
		if (pathsMatch(hit.route, normalized)) return null;
		console.warn(
			`[wp-seo] alias redirect: "${normalized}" → "${hit.route}" (key "${key}", id ${hit.id})`,
		);
		return withTrailingSlashPath(hit.route);
	}
	return null;
}

export async function getWpPageKeyByPath(path: string): Promise<WpPageKey | null> {
	const normalized = normalizeSeoPath(path);
	const routes = await getAllWpPageRoutes();
	return routes.find((r) => r.route === normalized)?.key ?? null;
}

/**
 * Resolve a frontend path to a WP page id (+ resolved route for canonicals).
 * Matches the live CMS slug path for every mapped page.
 */
export async function resolvePageSeoRoute(path: string): Promise<PageSeoRouteEntry | null> {
	const normalized = normalizeSeoPath(path);
	const routes = await getAllWpPageRoutes();
	const hit = routes.find((r) => r.route === normalized);
	if (!hit) return null;
	return {
		route: hit.route,
		id: hit.id,
		slug: hit.slug,
		key: hit.key,
		syncSlug: true,
	};
}

export async function isMappedSeoPath(path: string): Promise<boolean> {
	return (await resolvePageSeoRoute(path)) != null;
}

/** Resolve a WP id from a CMS slug (async; uses live slug map). */
export async function resolveIdFromSlugAsync(slug: string): Promise<number | null> {
	const needle = slug.trim().replace(/^\/+|\/+$/g, '');
	if (!needle) return WP_SEO_PAGES.home.id;

	const routes = await getAllWpPageRoutes();
	if (needle === 'home') return WP_SEO_PAGES.home.id;
	return routes.find((r) => r.slug === needle)?.id ?? null;
}

/** @deprecated Use resolveIdFromSlugAsync. */
export function resolveIdFromSlug(slug: string): number | null {
	const needle = slug.trim().replace(/^\/+|\/+$/g, '');
	if (!needle || needle === 'home') return WP_SEO_PAGES.home.id;
	for (const [key, entry] of Object.entries(WP_SEO_PAGES) as [WpPageKey, { id: number }][]) {
		if (key === 'home') continue;
		if (key === 'caseStudies' && needle === 'case-studies') return entry.id;
		if (key === needle) return entry.id;
	}
	return null;
}

export function frontendAbsoluteUrl(siteUrl: string, route: string): string {
	return `${stripTrailingSlash(siteUrl)}${withTrailingSlashPath(route)}`;
}

// —— URL rewrite ——

function hostRewriteUrl(url: string, wpBase: string, siteUrl: string): string {
	if (!url || url.includes('/wp-content/')) return url;
	if (url.startsWith(wpBase)) {
		return siteUrl + url.slice(wpBase.length);
	}
	return url;
}

/**
 * Rewrite page URLs to the frontend route:
 * 1) Replace `${WP_BASE_URL}${wpPath}` → `${SITE_URL}${route}` (slash variants)
 * 2) Host-swap any remaining non-/wp-content/ URLs still on WP_BASE_URL
 */
function rewriteToFrontendRoute(
	url: string,
	wpBase: string,
	siteUrl: string,
	wpPath: string,
	frontendRoute: string,
): string {
	if (!url || url.includes('/wp-content/')) return url;

	const sitePage = frontendAbsoluteUrl(siteUrl, frontendRoute);
	const wpPaths = Array.from(
		new Set([wpPath, withTrailingSlashPath(wpPath), normalizeSeoPath(wpPath)]),
	);

	for (const p of wpPaths) {
		const from = `${wpBase}${p === '/' ? '/' : p}`;
		if (url === from || url.startsWith(from)) {
			return sitePage + url.slice(from.length);
		}
		// Also try without double-slash edge cases
		const fromAlt = `${wpBase}${p}`;
		if (fromAlt !== from && (url === fromAlt || url.startsWith(fromAlt))) {
			return sitePage + url.slice(fromAlt.length);
		}
	}

	return hostRewriteUrl(url, wpBase, siteUrl);
}

function rewriteUrlsDeepToFrontend(
	value: unknown,
	wpBase: string,
	siteUrl: string,
	wpPath: string,
	frontendRoute: string,
): unknown {
	if (typeof value === 'string') {
		return rewriteToFrontendRoute(value, wpBase, siteUrl, wpPath, frontendRoute);
	}
	if (Array.isArray(value)) {
		return value.map((item) =>
			rewriteUrlsDeepToFrontend(item, wpBase, siteUrl, wpPath, frontendRoute),
		);
	}
	if (value !== null && typeof value === 'object') {
		const out: Record<string, unknown> = {};
		for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
			out[key] = rewriteUrlsDeepToFrontend(
				child,
				wpBase,
				siteUrl,
				wpPath,
				frontendRoute,
			);
		}
		return out;
	}
	return value;
}

function applyTrailingSlash(url: string): string {
	try {
		const u = new URL(url);
		u.pathname = withTrailingSlashPath(u.pathname);
		return u.href;
	} catch {
		return url;
	}
}

// —— Raw WP shapes (partial, optional-safe) ——

interface WpYoastRobots {
	index?: string;
	follow?: string;
	[key: string]: string | undefined;
}

interface WpYoastOgImage {
	url?: string;
	width?: number;
	height?: number;
	type?: string;
}

interface WpYoastHeadJson {
	title?: string;
	description?: string;
	robots?: WpYoastRobots;
	canonical?: string;
	og_locale?: string;
	og_type?: string;
	og_title?: string;
	og_description?: string;
	og_url?: string;
	og_site_name?: string;
	og_image?: WpYoastOgImage[];
	twitter_card?: string;
	twitter_title?: string;
	twitter_description?: string;
	twitter_image?: string;
	schema?: Record<string, unknown>;
}

interface WpPageMeta {
	_yoast_wpseo_focuskw?: string;
	_yoast_wpseo_bctitle?: string;
	[key: string]: unknown;
}

interface WpFeaturedMedia {
	id?: number;
	source_url?: string;
	alt_text?: string;
	media_details?: {
		width?: number;
		height?: number;
	};
}

export interface WpPageSeoRaw {
	id?: number;
	slug?: string;
	link?: string;
	featured_media?: number;
	meta?: WpPageMeta;
	yoast_head_json?: WpYoastHeadJson;
	_embedded?: {
		'wp:featuredmedia'?: WpFeaturedMedia[];
	};
}

// —— Defaults / normalize ——

function emptyOg(): PageSEOSocialOg {
	return {
		title: null,
		description: null,
		image: null,
		imageWidth: null,
		imageHeight: null,
		imageType: null,
		url: null,
		type: null,
		siteName: null,
		locale: null,
	};
}

/** Site-wide null defaults — never invent missing Yoast fields. */
export function emptyPageSEO(): PageSEO {
	return {
		id: null,
		slug: null,
		wpLink: null,
		focusKeyphrase: null,
		seoTitle: null,
		metaDescription: null,
		robots: { index: null, follow: null, advanced: {} },
		breadcrumbTitle: null,
		canonical: null,
		featuredImage: null,
		social: {
			og: emptyOg(),
			x: { card: null, title: null, description: null, image: null },
		},
		schema: null,
	};
}

function asString(value: unknown): string | null {
	return typeof value === 'string' && value.length > 0 ? value : null;
}

function asNumber(value: unknown): number | null {
	return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function breadcrumbTitleFromSchema(schema: Record<string, unknown> | null | undefined): string | null {
	if (!schema || typeof schema !== 'object') return null;
	const graph = schema['@graph'];
	if (!Array.isArray(graph)) return null;

	for (const node of graph) {
		if (!node || typeof node !== 'object') continue;
		const n = node as Record<string, unknown>;
		const type = n['@type'];
		const isBreadcrumb =
			type === 'BreadcrumbList' ||
			(Array.isArray(type) && type.includes('BreadcrumbList'));
		if (!isBreadcrumb) continue;

		const items = n.itemListElement;
		if (!Array.isArray(items) || items.length === 0) continue;
		const last = items[items.length - 1];
		if (last && typeof last === 'object') {
			return asString((last as Record<string, unknown>).name);
		}
	}
	return null;
}

function normalizeRobots(robots: WpYoastRobots | undefined): PageSEORobots {
	const advanced: Record<string, string> = {};
	if (robots && typeof robots === 'object') {
		for (const [key, value] of Object.entries(robots)) {
			if (key === 'index' || key === 'follow') continue;
			if (typeof value === 'string') advanced[key] = value;
		}
	}

	const index = robots?.index === 'index' || robots?.index === 'noindex' ? robots.index : null;
	const follow =
		robots?.follow === 'follow' || robots?.follow === 'nofollow' ? robots.follow : null;

	return { index, follow, advanced };
}

function pathnameOf(url: string | undefined | null): string | null {
	if (!url) return null;
	try {
		return new URL(url).pathname;
	} catch {
		return null;
	}
}

export function normalizePage(
	raw: WpPageSeoRaw,
	wpBase: string,
	siteUrl: string,
	frontendRoute: string,
): PageSEO {
	const yoast = raw.yoast_head_json ?? {};
	const meta = raw.meta ?? {};
	const pageId = asNumber(raw.id);

	const wpPath = pathnameOf(raw.link) ?? withTrailingSlashPath(frontendRoute);

	let driftedFrom: string | null = null;
	if (!pathsMatch(wpPath, frontendRoute)) {
		driftedFrom = wpPath;
		if (pageId != null && !driftWarnedIds.has(pageId)) {
			driftWarnedIds.add(pageId);
			console.warn(
				`[wp-seo] slug drift for id ${pageId}: WP is "${wpPath}", site route is "${frontendRoute}"`,
			);
		}
	}

	const schemaRaw = yoast.schema ?? null;
	const schema = schemaRaw
		? (rewriteUrlsDeepToFrontend(
				structuredClone(schemaRaw),
				wpBase,
				siteUrl,
				wpPath,
				frontendRoute,
			) as Record<string, unknown>)
		: null;

	const ogImage0 = Array.isArray(yoast.og_image) ? yoast.og_image[0] : undefined;
	const seoTitle = asString(yoast.title);
	const metaDescription = asString(yoast.description);
	const frontendUrl = frontendAbsoluteUrl(siteUrl, frontendRoute);

	// Canonical: custom Yoast path (≠ WP link path) → host-rewrite only; else frontend route.
	let canonical: string | null = null;
	const yoastCanonicalPath = pathnameOf(yoast.canonical);
	const wpLinkPath = pathnameOf(raw.link);
	if (yoast.canonical && yoastCanonicalPath && wpLinkPath && !pathsMatch(yoastCanonicalPath, wpLinkPath)) {
		canonical = applyTrailingSlash(hostRewriteUrl(yoast.canonical, wpBase, siteUrl));
	} else {
		canonical = frontendUrl;
	}

	const og: PageSEOSocialOg = {
		title: asString(yoast.og_title),
		description: asString(yoast.og_description),
		image: ogImage0?.url ? hostRewriteUrl(ogImage0.url, wpBase, siteUrl) : null,
		imageWidth: asNumber(ogImage0?.width),
		imageHeight: asNumber(ogImage0?.height),
		imageType: asString(ogImage0?.type),
		url: frontendUrl,
		type: asString(yoast.og_type),
		siteName: asString(yoast.og_site_name),
		locale: asString(yoast.og_locale),
	};

	const x: PageSEOSocialX = {
		card: asString(yoast.twitter_card),
		title: asString(yoast.twitter_title) ?? og.title ?? seoTitle,
		description: asString(yoast.twitter_description) ?? og.description ?? metaDescription,
		image: yoast.twitter_image
			? hostRewriteUrl(yoast.twitter_image, wpBase, siteUrl)
			: og.image,
	};

	const featuredMediaId = asNumber(raw.featured_media) ?? 0;
	let featuredImage: PageSEOFeaturedImage | null = null;
	if (featuredMediaId > 0) {
		const media = raw._embedded?.['wp:featuredmedia']?.[0];
		if (media) {
			featuredImage = {
				id: asNumber(media.id) ?? featuredMediaId,
				url: media.source_url ? hostRewriteUrl(media.source_url, wpBase, siteUrl) : '',
				alt: asString(media.alt_text),
				width: asNumber(media.media_details?.width),
				height: asNumber(media.media_details?.height),
			};
			if (!featuredImage.url) featuredImage = null;
		}
	}

	const bcFromMeta = asString(meta._yoast_wpseo_bctitle);
	const breadcrumbTitle = bcFromMeta || breadcrumbTitleFromSchema(schema);

	// Keep WP permalink path (host-rewritten) for diagnostics when drifted.
	const wpLink = raw.link
		? applyTrailingSlash(hostRewriteUrl(raw.link, wpBase, siteUrl))
		: null;

	return {
		id: pageId,
		slug: asString(raw.slug),
		wpLink,
		focusKeyphrase: asString(meta._yoast_wpseo_focuskw),
		seoTitle,
		metaDescription,
		robots: normalizeRobots(yoast.robots),
		breadcrumbTitle,
		canonical,
		featuredImage,
		social: { og, x },
		schema,
		...(driftedFrom ? { driftedFrom } : {}),
	};
}

// —— In-memory cache (Astro SSR / dev) ——

interface CacheEntry {
	expires: number;
	data: PageSEO;
}

const seoCache = new Map<string, CacheEntry>();

function cacheKeyForId(id: number): string {
	return `wp-seo:id:${id}`;
}

/** Bust SEO (+ live-slug) cache by id, or clear all when omitted. */
export function invalidateWpSeoCache(id?: number): void {
	allRoutesCache = null;
	if (id == null) {
		seoCache.clear();
		liveSlugCache.clear();
		return;
	}
	seoCache.delete(cacheKeyForId(id));
	liveSlugCache.delete(id);
}

// —— Fetch ——

function seoQuery(): string {
	const params = new URLSearchParams({
		_embed: 'wp:featuredmedia',
		_fields: SEO_FIELDS,
	});
	return params.toString();
}

export async function fetchWpJson(
	url: string,
	id: number,
): Promise<{ ok: boolean; status: number; data: unknown }> {
	let response: Response;
	try {
		response = await fetch(url, {
			signal: AbortSignal.timeout(30_000),
			...({
				next: {
					revalidate: WP_SEO_REVALIDATE,
					tags: ['wp-seo', `wp-seo:id:${id}`],
				},
			} as RequestInit),
		});
	} catch (err) {
		const reason = err instanceof Error ? err.name : 'Error';
		console.error(
			`WordPress SEO: fetch failed for id ${id} (${reason}). Check WP_BASE_URL and CMS reachability.`,
		);
		return { ok: false, status: 0, data: null };
	}
	if (!response.ok) {
		return { ok: false, status: response.status, data: null };
	}

	const text = await response.text();
	const clean = text.replace(/^\s*<style[\s\S]*?<\/style>\s*/i, '');
	try {
		const data = JSON.parse(clean) as unknown;
		return { ok: true, status: response.status, data };
	} catch (err) {
		const preview = clean.slice(0, 200);
		console.error(
			`WordPress SEO: failed to parse JSON from ${url}. Body starts with: ${preview}`,
			err,
		);
		return { ok: false, status: response.status, data: null };
	}
}

/** `id` + `slug` only — used to build the nav/route map without Yoast or embeds. */
async function fetchWpSlugById(
	id: number,
	wpBase: string,
): Promise<{ status: number; slug: string | null }> {
	const url = `${wpBase}/wp-json/wp/v2/pages/${id}?_fields=id,slug`;
	const result = await fetchWpJson(url, id);
	if (!result.ok || !result.data || Array.isArray(result.data)) {
		return { status: result.status, slug: null };
	}
	const slug =
		typeof (result.data as { slug?: unknown }).slug === 'string'
			? (result.data as { slug: string }).slug
			: null;
	return { status: result.status, slug: slug && slug.length > 0 ? slug : null };
}

function knownPageIdForPath(normalized: string): number | null {
	if (allRoutesCache) {
		const hit = allRoutesCache.routes.find((route) => route.route === normalized);
		if (hit) return hit.id;
	}
	for (const [key, route] of Object.entries(WP_PAGE_FALLBACK_ROUTES) as [
		WpPageKey,
		string,
	][]) {
		if (normalizeSeoPath(route) === normalized) return WP_SEO_PAGES[key].id;
	}
	return null;
}

/**
 * Fetch a WP page by ID (primary). On 404, optionally retry by informational slug.
 */
export async function fetchWpPageById(
	id: number,
	slug: string | undefined,
	wpBase: string,
): Promise<{ status: number; raw: WpPageSeoRaw | null; via: 'id' | 'slug' | null }> {
	const query = seoQuery();
	const idUrl = `${wpBase}/wp-json/wp/v2/pages/${id}?${query}`;
	const idResult = await fetchWpJson(idUrl, id);

	if (idResult.ok && idResult.data && !Array.isArray(idResult.data)) {
		return { status: idResult.status, raw: idResult.data as WpPageSeoRaw, via: 'id' };
	}

	if (idResult.status === 404) {
		console.warn(`[wp-seo] page id ${id} returned 404 (${idUrl})`);
		if (slug) {
			console.warn(`[wp-seo] retrying id ${id} via slug "${slug}"`);
			const slugUrl = `${wpBase}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&${query}`;
			const slugResult = await fetchWpJson(slugUrl, id);
			if (
				slugResult.ok &&
				Array.isArray(slugResult.data) &&
				slugResult.data.length > 0
			) {
				console.warn(
					`[wp-seo] id ${id} recovered via slug "${slug}" — update PAGE_SEO_ROUTES if the ID changed`,
				);
				return {
					status: slugResult.status,
					raw: slugResult.data[0] as WpPageSeoRaw,
					via: 'slug',
				};
			}
			console.warn(
				`[wp-seo] slug retry for id ${id} ("${slug}") also failed (${slugResult.status})`,
			);
			return { status: slugResult.status || 404, raw: null, via: null };
		}
		return { status: 404, raw: null, via: null };
	}

	console.error(
		`WordPress SEO fetch failed for id ${id} (${idResult.status}): ${idUrl}`,
	);
	return { status: idResult.status, raw: null, via: null };
}

/**
 * Fetch Yoast SEO for a frontend path (no page content).
 * Looks up `PAGE_SEO_ROUTES` by path → WP page ID.
 * syncSlug pages normalize canonicals to the live WP slug route.
 * On failure: logs and returns null-filled defaults (never throws).
 */
export async function getPageSEO(path: string): Promise<PageSEO> {
	const normalized = normalizeSeoPath(path);
	const optimisticId = knownPageIdForPath(normalized);
	const wpBase = getWpBaseUrl();
	const siteUrl = getSiteUrl();
	const cachedOptimistic =
		optimisticId != null ? seoCache.get(cacheKeyForId(optimisticId)) : undefined;
	const optimisticCacheHit =
		cachedOptimistic && cachedOptimistic.expires > Date.now()
			? cachedOptimistic.data
			: null;
	// Overlap the Yoast fetch with the slug map. Discard it if the live route
	// does not belong to that page id (slug moved).
	const earlyFetch =
		!optimisticCacheHit && optimisticId != null && wpBase && siteUrl
			? fetchWpPageById(optimisticId, undefined, wpBase)
			: null;

	const routes = await getAllWpPageRoutes();
	const entry = routes.find((route) => route.route === normalized);
	if (!entry) {
		return emptyPageSEO();
	}

	const { route, id, slug, syncSlug } = {
		route: entry.route,
		id: entry.id,
		slug: entry.slug,
		syncSlug: true as const,
	};
	const key = cacheKeyForId(id);
	if (optimisticCacheHit && id === optimisticId) {
		return optimisticCacheHit;
	}
	const cached = seoCache.get(key);
	if (cached && cached.expires > Date.now()) {
		return cached.data;
	}

	if (!wpBase || !siteUrl) {
		console.error(
			'WordPress SEO: missing WP_BASE_URL or SITE_URL. Set them in .env (server-side only).',
		);
		return emptyPageSEO();
	}

	try {
		const { raw, status } =
			earlyFetch && id === optimisticId
				? await earlyFetch
				: await fetchWpPageById(id, slug, wpBase);
		if (!raw) {
			console.error(
				`[wp-seo] no SEO payload for path "${path}" (id ${id}, status ${status}) — returning empty defaults (not stale cache)`,
			);
			return emptyPageSEO();
		}
		if (raw.slug) {
			const previous = peekCachedWpSlug(id);
			const ttl = routeCacheTtlMs();
			if (ttl > 0) {
				liveSlugCache.set(id, { expires: Date.now() + ttl, slug: raw.slug });
			} else {
				liveSlugCache.delete(id);
			}
			// Drop the route map only when the slug actually changed.
			// Clearing it on every SEO fetch forced the header to refetch all pages.
			if (previous && previous !== raw.slug) {
				allRoutesCache = null;
				console.warn(
					`[wp-seo] slug change for id ${id}: "${previous}" → "${raw.slug}" — route map cleared; on-demand [slug] will serve the new path`,
				);
			}
		}
		// Canonicals always use the resolved CMS-driven frontend route.
		const frontendRoute = route;
		void syncSlug;
		const data = normalizePage(raw, wpBase, siteUrl, frontendRoute);
		seoCache.set(key, {
			expires: Date.now() + WP_SEO_REVALIDATE * 1000,
			data,
		});
		return data;
	} catch (err) {
		console.error(`WordPress SEO: unexpected error for path "${path}" (id ${id}):`, err);
		return emptyPageSEO();
	}
}

/** Trigger a Vercel deploy when configured. Returns whether the hook was invoked successfully. */
export async function triggerDeployHook(reason: string): Promise<{
	triggered: boolean;
	ok: boolean;
	status?: number;
}> {
	const hook = getVercelDeployHookUrl();
	if (!hook) {
		console.warn(
			`[wp-seo] deploy hook skipped (${reason}): DEPLOY_HOOK_URL / VERCEL_DEPLOY_HOOK_URL is not set — slug/route changes need a rebuild`,
		);
		return { triggered: false, ok: false };
	}
	try {
		const res = await fetch(hook, { method: 'POST' });
		if (!res.ok) {
			console.error(`[wp-seo] deploy hook failed (${reason}): HTTP ${res.status}`);
			return { triggered: true, ok: false, status: res.status };
		}
		console.warn(`[wp-seo] deploy hook triggered (${reason}): HTTP ${res.status}`);
		return { triggered: true, ok: true, status: res.status };
	} catch (err) {
		console.error(`[wp-seo] deploy hook error (${reason}):`, err);
		return { triggered: true, ok: false };
	}
}

/** Fetch Yoast SEO by WP page ID. */
export async function getPageSEOById(id: number): Promise<PageSEO> {
	const routes = await getAllWpPageRoutes();
	const hit = routes.find((r) => r.id === id);
	if (!hit) {
		console.error(`[wp-seo] no WP_SEO_PAGES entry for id ${id}`);
		return emptyPageSEO();
	}
	return getPageSEO(hit.route);
}

/** @deprecated Prefer `getPageSEO(path)`. */
export async function getPageSEOForRoute(route: string): Promise<PageSEO> {
	return getPageSEO(route);
}
