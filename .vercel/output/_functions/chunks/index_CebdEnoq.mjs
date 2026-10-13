import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, j as maybeRenderHead, w as renderComponent } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { n as $$CTASection, r as $$Layout } from "./BlogCard_D8r-GD5p.mjs";
import { r as $$PageHero, t as $$BlogListing } from "./BlogListing_DYdywVeO.mjs";
//#region src/pages/blogs/index.astro
var blogs_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"theme": "light",
		"seoPath": "/blogs"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "Blogs" })}${renderComponent($$result, "BlogListing", $$BlogListing, {})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>` })}`;
}, "C:/Xoomplus/src/pages/blogs/index.astro", void 0);
var $$file = "C:/Xoomplus/src/pages/blogs/index.astro";
var $$url = "/blogs";
//#endregion
//#region \0virtual:astro:page:src/pages/blogs/index@_@astro
var page = () => blogs_exports;
//#endregion
export { page };
