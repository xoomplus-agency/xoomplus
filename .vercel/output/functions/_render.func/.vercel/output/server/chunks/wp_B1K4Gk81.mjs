import fs from "node:fs";
import path from "node:path";
//#region src/lib/wp.ts
var DEFAULT_API = "https://xoomplus.co.uk/wp-json/wp/v2";
var POST_FIELDS = "id,slug,link,date,status,title,excerpt,content,featured_media,categories,yoast_head_json,_links,_embedded";
var WP_POSTS_CACHE_VERSION = 3;
var DISK_CACHE_TTL_SEC = 60;
var DISK_CACHE_FILE = path.join(process.cwd(), "node_modules", ".cache", "wp-cache.json");
var forceRefresh = false;
var PREFERRED_SIZES = [
	"medium_large",
	"large",
	"full"
];
function getApiBase() {
	let fromEnv;
	try {
		fromEnv = void 0;
	} catch {
		fromEnv = void 0;
	}
	const fromProcess = typeof process !== "undefined" ? process.env?.PUBLIC_WP_API : void 0;
	return (fromEnv || fromProcess || DEFAULT_API).trim().replace(/\/+$/, "");
}
function isDev() {
	try {
		return Boolean(false);
	} catch {
		return process.env.NODE_ENV !== "production";
	}
}
function shouldUseDiskCache() {
	if (!isDev()) return false;
	if (forceRefresh) return false;
	const flag = typeof process !== "undefined" ? process.env?.WP_CACHE : void 0;
	try {
		return (flag ?? void 0) !== "off";
	} catch {
		return flag !== "off";
	}
}
function isValidCachedPost(post) {
	if (!post || typeof post !== "object") return false;
	const p = post;
	return typeof p.path === "string" && p.path.length > 1 && !isLegacyBlogsPostPath(p.path) && typeof p.date === "string" && p.date.length > 0 && typeof p.status === "string" && p.status.length > 0;
}
function isLegacyBlogsPostPath(pathname) {
	const cleaned = pathname.replace(/\/+$/, "") || "/";
	return /^\/blogs\/[^/]+$/.test(cleaned);
}
function readDiskCache() {
	try {
		if (!fs.existsSync(DISK_CACHE_FILE)) return null;
		const raw = fs.readFileSync(DISK_CACHE_FILE, "utf8");
		const data = JSON.parse(raw);
		if (Array.isArray(data)) {
			console.warn("[wp] disk cache discarded (pre-versioned / missing path schema)");
			return null;
		}
		const payload = data;
		if (payload.version !== WP_POSTS_CACHE_VERSION) {
			console.warn(`[wp] disk cache discarded (version ${String(payload.version)} ≠ ${WP_POSTS_CACHE_VERSION})`);
			return null;
		}
		const fetchedAt = typeof payload.fetchedAt === "number" ? payload.fetchedAt : 0;
		const ageSec = (Date.now() - fetchedAt) / 1e3;
		if (!fetchedAt || ageSec > DISK_CACHE_TTL_SEC) {
			console.warn(`[wp] disk cache expired (age ${Math.round(ageSec)}s > ${DISK_CACHE_TTL_SEC}s) — refetching`);
			return null;
		}
		if (!Array.isArray(payload.posts) || payload.posts.length === 0) return null;
		if (!payload.posts.every(isValidCachedPost)) {
			console.warn("[wp] disk cache discarded (one or more posts missing path/date/status)");
			return null;
		}
		console.warn(`[wp] disk cache hit (${payload.posts.length} posts, age ${Math.round(ageSec)}s) — DEV only`);
		return payload.posts;
	} catch (err) {
		console.warn("[wp] disk cache read failed — fetching live:", err);
		return null;
	}
}
function writeDiskCache(posts) {
	try {
		fs.mkdirSync(path.dirname(DISK_CACHE_FILE), { recursive: true });
		const payload = {
			version: WP_POSTS_CACHE_VERSION,
			fetchedAt: Date.now(),
			posts
		};
		fs.writeFileSync(DISK_CACHE_FILE, JSON.stringify(payload), "utf8");
		console.warn(`[wp] disk cache wrote ${posts.length} posts → ${DISK_CACHE_FILE}`);
	} catch (err) {
		console.warn("[wp] disk cache write failed:", err);
	}
}
function stripLeadingStyles(text) {
	let out = text;
	let prev;
	do {
		prev = out;
		out = out.replace(/^\s*<style[\s\S]*?<\/style>\s*/i, "");
	} while (out !== prev);
	return out;
}
function decodeEntities(text) {
	return text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&#8217;/g, "’").replace(/&#8216;/g, "‘").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”").replace(/&#8211;/g, "–").replace(/&#8212;/g, "—").replace(/&nbsp;/g, " ");
}
function stripTags(html) {
	return html.replace(/<[^>]*>/g, " ");
}
function collapseWhitespace(text) {
	return text.replace(/\s+/g, " ").trim();
}
function plainFromHtml(html) {
	return collapseWhitespace(decodeEntities(stripTags(html || "")));
}
function trimExcerpt(text, max = 120) {
	if (text.length <= max) return text;
	const slice = text.slice(0, max + 1);
	const lastSpace = slice.lastIndexOf(" ");
	return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : text.slice(0, max)).replace(/[.,;:!\s]+$/u, "")}…`;
}
function buildExcerpt(excerptHtml, contentHtml) {
	return trimExcerpt(plainFromHtml(excerptHtml) || plainFromHtml(contentHtml));
}
function firstCategoryTerm(terms) {
	if (!terms?.length) return null;
	for (const group of terms) for (const term of group) {
		if (term.taxonomy !== "category") continue;
		const name = plainFromHtml(term.name || "");
		const slug = (term.slug || "").trim();
		if (!name && !slug) continue;
		if (/^uncategorised$/i.test(name) || /^uncategorized$/i.test(name)) continue;
		if (/^uncategorized$/i.test(slug) || /^uncategorised$/i.test(slug)) continue;
		return {
			name: name || slug,
			slug: slug || "uncategorized"
		};
	}
	return null;
}
function withTrailingSlash(path2) {
	if (!path2 || path2 === "/") return "/";
	const cleaned = path2.split("?")[0].split("#")[0].replace(/\/+$/, "");
	return `${cleaned.startsWith("/") ? cleaned : `/${cleaned}`}/`;
}
function categoryKey(nameOrSlug) {
	const t = (nameOrSlug || "").trim().toLowerCase();
	if (!t) return "";
	if (t === "all articles" || t === "all") return "all";
	return t;
}
function postUrl(post) {
	const pathValue = typeof post.path === "string" ? post.path.trim() : "";
	if (!pathValue || pathValue === "/") {
		const label = post.slug || post.title || String(post.id ?? "?");
		throw new Error(`[wp] postUrl: post "${label}" has no path — cannot fall back to /blogs/<slug>`);
	}
	if (isLegacyBlogsPostPath(pathValue)) {
		const label = post.slug || post.title || String(post.id ?? "?");
		throw new Error(`[wp] postUrl: post "${label}" still has legacy path "${pathValue}" — refetch CMS link`);
	}
	return pathValue;
}
function resolvePostPath(link, slug, categorySlug) {
	const postSlug = slug;
	let usedFallback = false;
	let pathname = "";
	if (link) try {
		pathname = new URL(link).pathname;
	} catch {
		pathname = "";
	}
	const normalized = pathname.replace(/\/+$/, "");
	const endsWithSlug = normalized === `/${postSlug}` || normalized.endsWith(`/${postSlug}`);
	if (!pathname || !endsWithSlug) {
		usedFallback = true;
		const cat = categorySlug || "uncategorized";
		console.warn(`[wp] post "${slug}": CMS link missing or path does not end with slug — fallback /${cat}/${slug}/`);
		return {
			path: withTrailingSlash(`/${cat}/${postSlug}`),
			categorySlug: cat,
			postSlug,
			usedFallback
		};
	}
	const segments = normalized.split("/").filter(Boolean);
	const catFromPath = segments.length >= 2 ? segments[0] : categorySlug || "uncategorized";
	return {
		path: withTrailingSlash(normalized),
		categorySlug: catFromPath,
		postSlug: segments[segments.length - 1] || postSlug,
		usedFallback
	};
}
function mapImage(media, title) {
	if (!media) return null;
	const sizes = media.media_details?.sizes ?? {};
	let chosen;
	for (const key of PREFERRED_SIZES) if (sizes[key]?.source_url) {
		chosen = sizes[key];
		break;
	}
	const src = chosen?.source_url || media.source_url || Object.values(sizes).find((s) => s.source_url)?.source_url;
	if (!src) return null;
	const width = chosen?.width ?? media.media_details?.width ?? 1200;
	const height = chosen?.height ?? media.media_details?.height ?? 720;
	const srcsetParts = [];
	const seen = /* @__PURE__ */ new Set();
	for (const size of Object.values(sizes)) {
		if (!size?.source_url || !size.width) continue;
		const entry = `${size.source_url} ${size.width}w`;
		if (seen.has(entry)) continue;
		seen.add(entry);
		srcsetParts.push(entry);
	}
	if (media.source_url && media.media_details?.width) {
		const full = `${media.source_url} ${media.media_details.width}w`;
		if (!seen.has(full)) srcsetParts.push(full);
	}
	const alt = plainFromHtml(media.alt_text || "") || title;
	return {
		src,
		srcset: srcsetParts.join(", "),
		width,
		height,
		alt
	};
}
function mapWpPost(raw) {
	const id = typeof raw.id === "number" ? raw.id : null;
	const slug = typeof raw.slug === "string" ? raw.slug : "";
	if (id == null || !slug) return null;
	const status = typeof raw.status === "string" ? raw.status : "publish";
	if (status !== "publish") return null;
	const title = plainFromHtml(raw.title?.rendered || "");
	const content = raw.content?.rendered || "";
	const excerpt = buildExcerpt(raw.excerpt?.rendered || "", content);
	const term = firstCategoryTerm(raw._embedded?.["wp:term"]);
	const category = term?.name || "";
	const media = raw._embedded?.["wp:featuredmedia"]?.[0];
	const resolved = resolvePostPath(raw.link, slug, term?.slug || "");
	const noindex = raw.yoast_head_json?.robots?.index === "noindex";
	return {
		id,
		slug,
		date: raw.date || "",
		status,
		title,
		excerpt,
		category,
		path: resolved.path,
		categorySlug: resolved.categorySlug,
		postSlug: resolved.postSlug,
		noindex,
		image: mapImage(media, title),
		content
	};
}
async function fetchPostsPage(page, perPage) {
	const base = getApiBase();
	const params = new URLSearchParams({
		_embed: "1",
		per_page: String(perPage),
		page: String(page),
		status: "publish",
		orderby: "date",
		order: "desc",
		_fields: POST_FIELDS
	});
	if (!isDev()) params.set("_", String(Date.now()));
	const url = `${base}/posts?${params}`;
	const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
	const clean = stripLeadingStyles(await res.text());
	if (!res.ok) throw new Error(`WordPress posts fetch failed (${res.status}) ${url} — ${clean.slice(0, 160)}`);
	let data;
	try {
		data = JSON.parse(clean);
	} catch (err) {
		throw new Error(`WordPress posts JSON parse failed for ${url}: ${String(err)} (body starts: ${clean.slice(0, 120)})`);
	}
	if (!Array.isArray(data)) throw new Error(`WordPress posts: expected an array from ${url}`);
	const total = Number(res.headers.get("X-WP-Total") || "0") || 0;
	const totalPages = Number(res.headers.get("X-WP-TotalPages") || "1") || 1;
	return {
		posts: data,
		total,
		totalPages,
		url
	};
}
var allPostsPromise = null;
var allPostsExpiresAt = 0;
function memoryTtlMs() {
	if (isDev()) return DISK_CACHE_TTL_SEC * 1e3;
	const life = typeof process !== "undefined" ? process.env?.npm_lifecycle_event : "";
	const argv = typeof process !== "undefined" ? process.argv.join(" ") : "";
	if (life === "build" || life === "prebuild" || /\bastro\s+build\b/.test(argv)) return 18e5;
	return 0;
}
function clearWpPostsCache(opts) {
	allPostsPromise = null;
	allPostsExpiresAt = 0;
	forceRefresh = true;
	if (opts?.disk !== false) try {
		if (fs.existsSync(DISK_CACHE_FILE)) fs.unlinkSync(DISK_CACHE_FILE);
	} catch {}
}
async function fetchAllPosts() {
	if (shouldUseDiskCache()) {
		const cached = readDiskCache();
		if (cached) return cached;
	} else if (!isDev()) console.warn("[wp] production/CI build — skipping disk cache, fetching live posts");
	const first = await fetchPostsPage(1, 100);
	const pages = [first.posts];
	const expectedTotal = first.total;
	console.warn(`[wp] fetching posts: page 1/${first.totalPages} (X-WP-Total=${expectedTotal}) ${first.url}`);
	for (let page = 2; page <= first.totalPages; page++) {
		const next = await fetchPostsPage(page, 100);
		console.warn(`[wp] fetching posts: page ${page}/${first.totalPages}`);
		pages.push(next.posts);
	}
	const rawAll = pages.flat();
	if (expectedTotal > 0 && rawAll.length < expectedTotal) throw new Error(`[wp] incomplete posts fetch: got ${rawAll.length} raw items but X-WP-Total=${expectedTotal} — refusing to build a partial list`);
	const mapped = [];
	for (const raw of rawAll) {
		const post = mapWpPost(raw);
		if (post) mapped.push(post);
	}
	mapped.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
	console.warn(`[wp] published posts ready: ${mapped.length} (X-WP-Total=${expectedTotal})`);
	forceRefresh = false;
	if (shouldUseDiskCache()) writeDiskCache(mapped);
	return mapped;
}
async function getPosts(options = {}) {
	const { perPage, all = false } = options;
	if (forceRefresh || !allPostsPromise || Date.now() >= allPostsExpiresAt) {
		const ttl = memoryTtlMs();
		allPostsPromise = fetchAllPosts().then((posts) => {
			allPostsExpiresAt = Date.now() + ttl;
			return posts;
		}).catch((err) => {
			allPostsPromise = null;
			allPostsExpiresAt = 0;
			throw err;
		});
	}
	try {
		const posts = await allPostsPromise;
		if (all || perPage == null) return posts;
		return posts.slice(0, perPage);
	} catch (err) {
		if (isDev()) {
			console.error("[wp] getPosts failed (dev — returning []):", err);
			return [];
		}
		throw new Error(`[wp] getPosts failed — cannot serve /blogs without live CMS data: ${String(err)}`);
	}
}
var BLOG_IMAGE_PLACEHOLDER = "/images/1st.webp";
async function getBlogCategoryPrefixes() {
	const posts = await getPosts({ all: true });
	const set = /* @__PURE__ */ new Set();
	for (const post of posts) if (post.categorySlug) set.add(`/${post.categorySlug}`);
	return [...set];
}
//#endregion
export { getPosts as a, getBlogCategoryPrefixes as i, categoryKey as n, postUrl as o, clearWpPostsCache as r, BLOG_IMAGE_PLACEHOLDER as t };
