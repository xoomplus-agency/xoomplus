import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isYoastSitemapFile, r as yoastSitemapResponse, t as fetchYoastSitemap } from "./yoast-sitemap_CNfSMreD.mjs";
//#region src/pages/[sitemap].xml.ts
var _sitemap__xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params }) => {
	const fileName = `${(params.sitemap || "").trim()}.xml`;
	if (!isYoastSitemapFile(fileName) || /^sitemap_index\.xml$/i.test(fileName)) return new Response("Not found", { status: 404 });
	const result = await fetchYoastSitemap(fileName);
	return yoastSitemapResponse(result);
};
//#endregion
//#region \0virtual:astro:page:src/pages/[sitemap].xml@_@ts
var page = () => _sitemap__xml_exports;
//#endregion
export { page };
