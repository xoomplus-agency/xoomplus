import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/lib/wp-seo.ts
var wp_seo_exports = /* @__PURE__ */ __exportAll({
	WP_PAGE_FALLBACK_ROUTES: () => WP_PAGE_FALLBACK_ROUTES,
	WP_SEO_PAGES: () => WP_SEO_PAGES,
	WP_SEO_PATH_ALIASES: () => WP_SEO_PATH_ALIASES,
	WP_SEO_REVALIDATE: () => WP_SEO_REVALIDATE,
	emptyPageSEO: () => emptyPageSEO,
	fetchWpJson: () => fetchWpJson,
	fetchWpPageById: () => fetchWpPageById,
	frontendAbsoluteUrl: () => frontendAbsoluteUrl,
	getAllWpPageRoutes: () => getAllWpPageRoutes,
	getLiveWpSlugForId: () => getLiveWpSlugForId,
	getPageSEO: () => getPageSEO,
	getRevalidateSecret: () => getRevalidateSecret,
	getSiteUrl: () => getSiteUrl,
	getVercelDeployHookUrl: () => getVercelDeployHookUrl,
	getWpBaseUrl: () => getWpBaseUrl,
	getWpPagePath: () => getWpPagePath,
	invalidateWpSeoCache: () => invalidateWpSeoCache,
	isMappedSeoPath: () => isMappedSeoPath,
	normalizePage: () => normalizePage,
	normalizeSeoPath: () => normalizeSeoPath,
	pathsMatch: () => pathsMatch,
	peekCachedWpSlug: () => peekCachedWpSlug,
	resolveAliasRedirect: () => resolveAliasRedirect,
	resolveIdFromSlugAsync: () => resolveIdFromSlugAsync,
	resolvePageSeoRoute: () => resolvePageSeoRoute,
	triggerDeployHook: () => triggerDeployHook,
	withTrailingSlashPath: () => withTrailingSlashPath
});
var WP_SEO_PAGES = {
	home: { id: 215 },
	about: { id: 1393 },
	industries: { id: 15927 },
	caseStudies: { id: 1037 },
	contact: { id: 1079 },
	blogs: { id: 1142 },
	services: { id: 1062 }
};
var WP_PAGE_FALLBACK_ROUTES = {
	home: "/",
	about: "/about",
	industries: "/industries",
	caseStudies: "/projects",
	contact: "/contact",
	blogs: "/blogs",
	services: "/services"
};
WP_SEO_PAGES.caseStudies.id;
var WP_SEO_PATH_ALIASES = {
	caseStudies: ["/projects", "/case-studies"],
	services: ["/our-services"]
};
Object.fromEntries(Object.entries(WP_SEO_PAGES).map(([key, v]) => [key === "home" ? "/" : key === "caseStudies" ? "/projects" : `/${key}`, {
	id: v.id,
	syncSlug: true
}]));
var WP_SEO_REVALIDATE = 3600;
function routeCacheTtlMs() {
	return 6e4;
}
var SEO_FIELDS = "id,slug,link,featured_media,meta,yoast_head_json,_links,_embedded";
var driftWarnedIds = /* @__PURE__ */ new Set();
function stripTrailingSlash(url) {
	return url.replace(/\/+$/, "");
}
function readServerEnv(name) {
	let fromAstro;
	try {
		if (name === "WP_BASE_URL") fromAstro = "https://xoomplus.co.uk";
		else if (name === "SITE_URL") fromAstro = "https://xoomplus.co.uk";
		else if (name === "REVALIDATE_SECRET") fromAstro = "4aa4971845cb4314f726721f1e8dbfdfd5e80b678cccd36ef9f7a696034898fe";
		else if (name === "DEPLOY_HOOK_URL") fromAstro = void 0;
		else fromAstro = void 0;
	} catch {
		fromAstro = void 0;
	}
	const raw = (typeof process !== "undefined" ? process.env?.[name] : void 0) || fromAstro;
	if (!raw) return void 0;
	if (name === "REVALIDATE_SECRET" || name === "VERCEL_DEPLOY_HOOK_URL" || name === "DEPLOY_HOOK_URL") return raw.trim();
	return stripTrailingSlash(raw.trim());
}
function getWpBaseUrl() {
	return readServerEnv("WP_BASE_URL");
}
function getSiteUrl() {
	return readServerEnv("SITE_URL");
}
function getRevalidateSecret() {
	return readServerEnv("REVALIDATE_SECRET");
}
function getVercelDeployHookUrl() {
	return readServerEnv("DEPLOY_HOOK_URL") || readServerEnv("VERCEL_DEPLOY_HOOK_URL");
}
function normalizeSeoPath(path) {
	if (!path || path === "/") return "/";
	const cleaned = path.split("?")[0].split("#")[0].replace(/\/+$/, "");
	return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}
function withTrailingSlashPath(path) {
	const normalized = normalizeSeoPath(path);
	if (normalized === "/") return "/";
	return `${normalized}/`;
}
function pathsMatch(a, b) {
	return normalizeSeoPath(a) === normalizeSeoPath(b);
}
var liveSlugCache = /* @__PURE__ */ new Map();
var allRoutesCache = null;
function routeFromWpSlug(key, slug) {
	if (key === "home") return "/";
	return normalizeSeoPath(`/${slug}`);
}
function peekCachedWpSlug(id) {
	const cached = liveSlugCache.get(id);
	if (cached && cached.expires > Date.now()) return cached.slug;
	return null;
}
async function getLiveWpSlugForId(id) {
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
	const { raw, status } = await fetchWpPageById(id, void 0, wpBase);
	const slug = typeof raw?.slug === "string" && raw.slug.length > 0 ? raw.slug : null;
	if (!slug) {
		liveSlugCache.delete(id);
		allRoutesCache = null;
		console.error(`[wp-seo] getLiveWpSlugForId(${id}): fetch failed (HTTP ${status}) — no slug (not using stale cache)`);
		return null;
	}
	if (ttl > 0) liveSlugCache.set(id, {
		expires: Date.now() + ttl,
		slug
	});
	else liveSlugCache.delete(id);
	return slug;
}
async function getAllWpPageRoutes() {
	const ttl = routeCacheTtlMs();
	if (ttl > 0 && allRoutesCache && allRoutesCache.expires > Date.now()) return allRoutesCache.routes;
	const entries = Object.entries(WP_SEO_PAGES);
	const routes = (await Promise.all(entries.map(async ([key, { id }]) => {
		const slug = await getLiveWpSlugForId(id);
		if (!slug) {
			console.error(`[wp-seo] could not resolve slug for key "${key}" (id ${id})`);
			return null;
		}
		return {
			key,
			id,
			slug,
			route: routeFromWpSlug(key, slug)
		};
	}))).filter((r) => r != null);
	if (!(routes.length !== entries.length) && ttl > 0) allRoutesCache = {
		expires: Date.now() + ttl,
		routes
	};
	else allRoutesCache = null;
	return routes;
}
async function getWpPagePath(key) {
	const hit = (await getAllWpPageRoutes()).find((r) => r.key === key);
	if (hit) return hit.route;
	const fallback = WP_PAGE_FALLBACK_ROUTES[key];
	console.error(`[wp-seo] getWpPagePath("${key}"): live CMS slug unavailable — using fallback ${fallback}. Check WP_BASE_URL / page publish status.`);
	return fallback;
}
async function resolveAliasRedirect(pathname) {
	const normalized = normalizeSeoPath(pathname);
	const routes = await getAllWpPageRoutes();
	for (const [key, aliases] of Object.entries(WP_SEO_PATH_ALIASES)) {
		if (!aliases.some((alias) => pathsMatch(alias, normalized))) continue;
		const hit = routes.find((r) => r.key === key);
		if (!hit) {
			console.warn(`[wp-seo] alias "${normalized}" matched key "${key}" but live route is unresolved`);
			return null;
		}
		if (pathsMatch(hit.route, normalized)) return null;
		console.warn(`[wp-seo] alias redirect: "${normalized}" → "${hit.route}" (key "${key}", id ${hit.id})`);
		return withTrailingSlashPath(hit.route);
	}
	return null;
}
async function resolvePageSeoRoute(path) {
	const normalized = normalizeSeoPath(path);
	const hit = (await getAllWpPageRoutes()).find((r) => r.route === normalized);
	if (!hit) return null;
	return {
		route: hit.route,
		id: hit.id,
		slug: hit.slug,
		key: hit.key,
		syncSlug: true
	};
}
async function isMappedSeoPath(path) {
	return await resolvePageSeoRoute(path) != null;
}
async function resolveIdFromSlugAsync(slug) {
	const needle = slug.trim().replace(/^\/+|\/+$/g, "");
	if (!needle) return WP_SEO_PAGES.home.id;
	const routes = await getAllWpPageRoutes();
	if (needle === "home") return WP_SEO_PAGES.home.id;
	return routes.find((r) => r.slug === needle)?.id ?? null;
}
function frontendAbsoluteUrl(siteUrl, route) {
	return `${stripTrailingSlash(siteUrl)}${withTrailingSlashPath(route)}`;
}
function hostRewriteUrl(url, wpBase, siteUrl) {
	if (!url || url.includes("/wp-content/")) return url;
	if (url.startsWith(wpBase)) return siteUrl + url.slice(wpBase.length);
	return url;
}
function rewriteToFrontendRoute(url, wpBase, siteUrl, wpPath, frontendRoute) {
	if (!url || url.includes("/wp-content/")) return url;
	const sitePage = frontendAbsoluteUrl(siteUrl, frontendRoute);
	const wpPaths = Array.from(/* @__PURE__ */ new Set([
		wpPath,
		withTrailingSlashPath(wpPath),
		normalizeSeoPath(wpPath)
	]));
	for (const p of wpPaths) {
		const from = `${wpBase}${p === "/" ? "/" : p}`;
		if (url === from || url.startsWith(from)) return sitePage + url.slice(from.length);
		const fromAlt = `${wpBase}${p}`;
		if (fromAlt !== from && (url === fromAlt || url.startsWith(fromAlt))) return sitePage + url.slice(fromAlt.length);
	}
	return hostRewriteUrl(url, wpBase, siteUrl);
}
function rewriteUrlsDeepToFrontend(value, wpBase, siteUrl, wpPath, frontendRoute) {
	if (typeof value === "string") return rewriteToFrontendRoute(value, wpBase, siteUrl, wpPath, frontendRoute);
	if (Array.isArray(value)) return value.map((item) => rewriteUrlsDeepToFrontend(item, wpBase, siteUrl, wpPath, frontendRoute));
	if (value !== null && typeof value === "object") {
		const out = {};
		for (const [key, child] of Object.entries(value)) out[key] = rewriteUrlsDeepToFrontend(child, wpBase, siteUrl, wpPath, frontendRoute);
		return out;
	}
	return value;
}
function applyTrailingSlash(url) {
	try {
		const u = new URL(url);
		u.pathname = withTrailingSlashPath(u.pathname);
		return u.href;
	} catch {
		return url;
	}
}
function emptyOg() {
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
		locale: null
	};
}
function emptyPageSEO() {
	return {
		id: null,
		slug: null,
		wpLink: null,
		focusKeyphrase: null,
		seoTitle: null,
		metaDescription: null,
		robots: {
			index: null,
			follow: null,
			advanced: {}
		},
		breadcrumbTitle: null,
		canonical: null,
		featuredImage: null,
		social: {
			og: emptyOg(),
			x: {
				card: null,
				title: null,
				description: null,
				image: null
			}
		},
		schema: null
	};
}
function asString(value) {
	return typeof value === "string" && value.length > 0 ? value : null;
}
function asNumber(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}
function breadcrumbTitleFromSchema(schema) {
	if (!schema || typeof schema !== "object") return null;
	const graph = schema["@graph"];
	if (!Array.isArray(graph)) return null;
	for (const node of graph) {
		if (!node || typeof node !== "object") continue;
		const n = node;
		const type = n["@type"];
		if (!(type === "BreadcrumbList" || Array.isArray(type) && type.includes("BreadcrumbList"))) continue;
		const items = n.itemListElement;
		if (!Array.isArray(items) || items.length === 0) continue;
		const last = items[items.length - 1];
		if (last && typeof last === "object") return asString(last.name);
	}
	return null;
}
function normalizeRobots(robots) {
	const advanced = {};
	if (robots && typeof robots === "object") for (const [key, value] of Object.entries(robots)) {
		if (key === "index" || key === "follow") continue;
		if (typeof value === "string") advanced[key] = value;
	}
	return {
		index: robots?.index === "index" || robots?.index === "noindex" ? robots.index : null,
		follow: robots?.follow === "follow" || robots?.follow === "nofollow" ? robots.follow : null,
		advanced
	};
}
function pathnameOf(url) {
	if (!url) return null;
	try {
		return new URL(url).pathname;
	} catch {
		return null;
	}
}
function normalizePage(raw, wpBase, siteUrl, frontendRoute) {
	const yoast = raw.yoast_head_json ?? {};
	const meta = raw.meta ?? {};
	const pageId = asNumber(raw.id);
	const wpPath = pathnameOf(raw.link) ?? withTrailingSlashPath(frontendRoute);
	let driftedFrom = null;
	if (!pathsMatch(wpPath, frontendRoute)) {
		driftedFrom = wpPath;
		if (pageId != null && !driftWarnedIds.has(pageId)) {
			driftWarnedIds.add(pageId);
			console.warn(`[wp-seo] slug drift for id ${pageId}: WP is "${wpPath}", site route is "${frontendRoute}"`);
		}
	}
	const schemaRaw = yoast.schema ?? null;
	const schema = schemaRaw ? rewriteUrlsDeepToFrontend(structuredClone(schemaRaw), wpBase, siteUrl, wpPath, frontendRoute) : null;
	const ogImage0 = Array.isArray(yoast.og_image) ? yoast.og_image[0] : void 0;
	const seoTitle = asString(yoast.title);
	const metaDescription = asString(yoast.description);
	const frontendUrl = frontendAbsoluteUrl(siteUrl, frontendRoute);
	let canonical = null;
	const yoastCanonicalPath = pathnameOf(yoast.canonical);
	const wpLinkPath = pathnameOf(raw.link);
	if (yoast.canonical && yoastCanonicalPath && wpLinkPath && !pathsMatch(yoastCanonicalPath, wpLinkPath)) canonical = applyTrailingSlash(hostRewriteUrl(yoast.canonical, wpBase, siteUrl));
	else canonical = frontendUrl;
	const og = {
		title: asString(yoast.og_title),
		description: asString(yoast.og_description),
		image: ogImage0?.url ? hostRewriteUrl(ogImage0.url, wpBase, siteUrl) : null,
		imageWidth: asNumber(ogImage0?.width),
		imageHeight: asNumber(ogImage0?.height),
		imageType: asString(ogImage0?.type),
		url: frontendUrl,
		type: asString(yoast.og_type),
		siteName: asString(yoast.og_site_name),
		locale: asString(yoast.og_locale)
	};
	const x = {
		card: asString(yoast.twitter_card),
		title: asString(yoast.twitter_title) ?? og.title ?? seoTitle,
		description: asString(yoast.twitter_description) ?? og.description ?? metaDescription,
		image: yoast.twitter_image ? hostRewriteUrl(yoast.twitter_image, wpBase, siteUrl) : og.image
	};
	const featuredMediaId = asNumber(raw.featured_media) ?? 0;
	let featuredImage = null;
	if (featuredMediaId > 0) {
		const media = raw._embedded?.["wp:featuredmedia"]?.[0];
		if (media) {
			featuredImage = {
				id: asNumber(media.id) ?? featuredMediaId,
				url: media.source_url ? hostRewriteUrl(media.source_url, wpBase, siteUrl) : "",
				alt: asString(media.alt_text),
				width: asNumber(media.media_details?.width),
				height: asNumber(media.media_details?.height)
			};
			if (!featuredImage.url) featuredImage = null;
		}
	}
	const breadcrumbTitle = asString(meta._yoast_wpseo_bctitle) || breadcrumbTitleFromSchema(schema);
	const wpLink = raw.link ? applyTrailingSlash(hostRewriteUrl(raw.link, wpBase, siteUrl)) : null;
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
		social: {
			og,
			x
		},
		schema,
		...driftedFrom ? { driftedFrom } : {}
	};
}
var seoCache = /* @__PURE__ */ new Map();
function cacheKeyForId(id) {
	return `wp-seo:id:${id}`;
}
function invalidateWpSeoCache(id) {
	allRoutesCache = null;
	if (id == null) {
		seoCache.clear();
		liveSlugCache.clear();
		return;
	}
	seoCache.delete(cacheKeyForId(id));
	liveSlugCache.delete(id);
}
function seoQuery() {
	return new URLSearchParams({
		_embed: "wp:featuredmedia",
		_fields: SEO_FIELDS
	}).toString();
}
async function fetchWpJson(url, id) {
	let response;
	try {
		response = await fetch(url, {
			signal: AbortSignal.timeout(3e4),
			next: {
				revalidate: WP_SEO_REVALIDATE,
				tags: ["wp-seo", `wp-seo:id:${id}`]
			}
		});
	} catch (err) {
		const reason = err instanceof Error ? err.name : "Error";
		console.error(`WordPress SEO: fetch failed for id ${id} (${reason}). Check WP_BASE_URL and CMS reachability.`);
		return {
			ok: false,
			status: 0,
			data: null
		};
	}
	if (!response.ok) return {
		ok: false,
		status: response.status,
		data: null
	};
	const clean = (await response.text()).replace(/^\s*<style[\s\S]*?<\/style>\s*/i, "");
	try {
		const data = JSON.parse(clean);
		return {
			ok: true,
			status: response.status,
			data
		};
	} catch (err) {
		const preview = clean.slice(0, 200);
		console.error(`WordPress SEO: failed to parse JSON from ${url}. Body starts with: ${preview}`, err);
		return {
			ok: false,
			status: response.status,
			data: null
		};
	}
}
async function fetchWpPageById(id, slug, wpBase) {
	const query = seoQuery();
	const idUrl = `${wpBase}/wp-json/wp/v2/pages/${id}?${query}`;
	const idResult = await fetchWpJson(idUrl, id);
	if (idResult.ok && idResult.data && !Array.isArray(idResult.data)) return {
		status: idResult.status,
		raw: idResult.data,
		via: "id"
	};
	if (idResult.status === 404) {
		console.warn(`[wp-seo] page id ${id} returned 404 (${idUrl})`);
		if (slug) {
			console.warn(`[wp-seo] retrying id ${id} via slug "${slug}"`);
			const slugResult = await fetchWpJson(`${wpBase}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&${query}`, id);
			if (slugResult.ok && Array.isArray(slugResult.data) && slugResult.data.length > 0) {
				console.warn(`[wp-seo] id ${id} recovered via slug "${slug}" — update PAGE_SEO_ROUTES if the ID changed`);
				return {
					status: slugResult.status,
					raw: slugResult.data[0],
					via: "slug"
				};
			}
			console.warn(`[wp-seo] slug retry for id ${id} ("${slug}") also failed (${slugResult.status})`);
			return {
				status: slugResult.status || 404,
				raw: null,
				via: null
			};
		}
		return {
			status: 404,
			raw: null,
			via: null
		};
	}
	console.error(`WordPress SEO fetch failed for id ${id} (${idResult.status}): ${idUrl}`);
	return {
		status: idResult.status,
		raw: null,
		via: null
	};
}
async function getPageSEO(path) {
	const entry = await resolvePageSeoRoute(path);
	if (!entry) return emptyPageSEO();
	const { route, id, slug, syncSlug } = entry;
	const key = cacheKeyForId(id);
	const cached = seoCache.get(key);
	if (cached && cached.expires > Date.now()) return cached.data;
	const wpBase = getWpBaseUrl();
	const siteUrl = getSiteUrl();
	if (!wpBase || !siteUrl) {
		console.error("WordPress SEO: missing WP_BASE_URL or SITE_URL. Set them in .env (server-side only).");
		return emptyPageSEO();
	}
	try {
		const { raw, status } = await fetchWpPageById(id, slug, wpBase);
		if (!raw) {
			console.error(`[wp-seo] no SEO payload for path "${path}" (id ${id}, status ${status}) — returning empty defaults (not stale cache)`);
			return emptyPageSEO();
		}
		if (raw.slug) {
			const previous = peekCachedWpSlug(id);
			const ttl = routeCacheTtlMs();
			if (ttl > 0) liveSlugCache.set(id, {
				expires: Date.now() + ttl,
				slug: raw.slug
			});
			else liveSlugCache.delete(id);
			allRoutesCache = null;
			if (previous && previous !== raw.slug) console.warn(`[wp-seo] slug change for id ${id}: "${previous}" → "${raw.slug}" — route map cleared; on-demand [slug] will serve the new path`);
		}
		const data = normalizePage(raw, wpBase, siteUrl, route);
		seoCache.set(key, {
			expires: Date.now() + WP_SEO_REVALIDATE * 1e3,
			data
		});
		return data;
	} catch (err) {
		console.error(`WordPress SEO: unexpected error for path "${path}" (id ${id}):`, err);
		return emptyPageSEO();
	}
}
async function triggerDeployHook(reason) {
	const hook = getVercelDeployHookUrl();
	if (!hook) {
		console.warn(`[wp-seo] deploy hook skipped (${reason}): DEPLOY_HOOK_URL / VERCEL_DEPLOY_HOOK_URL is not set — slug/route changes need a rebuild`);
		return {
			triggered: false,
			ok: false
		};
	}
	try {
		const res = await fetch(hook, { method: "POST" });
		if (!res.ok) {
			console.error(`[wp-seo] deploy hook failed (${reason}): HTTP ${res.status}`);
			return {
				triggered: true,
				ok: false,
				status: res.status
			};
		}
		console.warn(`[wp-seo] deploy hook triggered (${reason}): HTTP ${res.status}`);
		return {
			triggered: true,
			ok: true,
			status: res.status
		};
	} catch (err) {
		console.error(`[wp-seo] deploy hook error (${reason}):`, err);
		return {
			triggered: true,
			ok: false
		};
	}
}
//#endregion
export { triggerDeployHook as _, getLiveWpSlugForId as a, getSiteUrl as c, invalidateWpSeoCache as d, isMappedSeoPath as f, resolveIdFromSlugAsync as g, resolveAliasRedirect as h, getAllWpPageRoutes as i, getWpBaseUrl as l, peekCachedWpSlug as m, WP_SEO_PAGES as n, getPageSEO as o, normalizeSeoPath as p, WP_SEO_REVALIDATE as r, getRevalidateSecret as s, WP_PAGE_FALLBACK_ROUTES as t, getWpPagePath as u, wp_seo_exports as v };
