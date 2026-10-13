import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as yoastSitemapResponse, t as fetchYoastSitemap } from "./yoast-sitemap_CNfSMreD.mjs";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const result = await fetchYoastSitemap("sitemap_index.xml");
	return yoastSitemapResponse(result);
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
