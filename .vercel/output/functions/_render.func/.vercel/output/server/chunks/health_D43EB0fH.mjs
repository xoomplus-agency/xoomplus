import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { c as getSiteUrl, l as getWpBaseUrl } from "./wp-seo_tkf0J7_Y.mjs";
import { n as isProduction, r as isStaging } from "./site-env_4rlXcH-v.mjs";
//#region src/pages/api/health.ts
var health_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const wpBase = getWpBaseUrl();
	const siteUrl = getSiteUrl();
	let wpOk = null;
	let wpStatus = null;
	let wpMs = null;
	if (wpBase) {
		const started = Date.now();
		try {
			const res = await fetch(`${wpBase}/wp-json/wp/v2/pages/215?_fields=id`, {
				signal: AbortSignal.timeout(1e4),
				headers: { "Cache-Control": "no-cache" }
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
		siteEnv: isProduction() ? "production" : isStaging() ? "staging" : "unknown",
		env: {
			WP_BASE_URL: wpBase ? "set" : "missing",
			SITE_URL: siteUrl ? "set" : "missing"
		},
		wordpress: {
			reachable: wpOk,
			status: wpStatus,
			latencyMs: wpMs
		},
		runtime: {
			node: process.version,
			vercel: process.env.VERCEL === "1"
		}
	};
	return new Response(JSON.stringify(body, null, 2), {
		status: body.ok ? 200 : 503,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/health@_@ts
var page = () => health_exports;
//#endregion
export { page };
