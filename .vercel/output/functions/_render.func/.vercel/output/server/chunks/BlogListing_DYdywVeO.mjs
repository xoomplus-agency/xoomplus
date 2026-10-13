import { A as renderTemplate, B as createAstro, D as renderSlot, N as addAttribute, R as unescapeHTML, j as maybeRenderHead, w as renderComponent } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { a as $$Button, o as renderScript, t as $$BlogCard } from "./BlogCard_D8r-GD5p.mjs";
import { a as postUrl, i as getPosts, n as categoryKey } from "./wp_3Jg0x5Z_.mjs";
//#region src/components/PageHero.astro
createAstro("https://xoomplus.co.uk");
var $$PageHero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHero;
	const { title = "" } = Astro.props;
	const titleId = "page-hero-title";
	return renderTemplate`${maybeRenderHead($$result)}<section class="page-hero page-section page-section--flush-top" data-bg="dark"${addAttribute(titleId, "aria-labelledby")} data-astro-cid-75ysl5lo><h1${addAttribute(titleId, "id")} class="text-hero-h1 page-hero__title" data-astro-cid-75ysl5lo>${title}</h1></section>`;
}, "C:/Xoomplus/src/components/PageHero.astro", void 0);
//#endregion
//#region src/components/Section.astro
createAstro("https://xoomplus.co.uk");
var $$Section = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Section;
	const { id, "aria-labelledby": labelledBy, "aria-label": ariaLabel, class: className = "", background = "white", reveal = true } = Astro.props;
	const dataBg = background === "dark" ? "dark" : background === "none" ? void 0 : "light";
	const hasHeader = Astro.slots.has("header");
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(id, "id")}${addAttribute(labelledBy, "aria-labelledby")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(dataBg, "data-bg")}${addAttribute(reveal ? void 0 : "", "data-reveal-off")}${addAttribute([
		"page-section py-section",
		background === "white" && "bg-secondary-white",
		background === "dark" && "relative overflow-hidden bg-[var(--color-primary-black)]",
		background === "light-gray" && "bg-[#F7F7F5]",
		className
	], "class:list")}><div class="container relative z-[1]">${hasHeader && (reveal ? renderTemplate`<div data-reveal="up">${renderSlot($$result, $$slots["header"])}</div>` : renderTemplate`${renderSlot($$result, $$slots["header"])}`)}${renderSlot($$result, $$slots["default"])}</div></section>`;
}, "C:/Xoomplus/src/components/Section.astro", void 0);
//#endregion
//#region src/components/BlogListing.astro
var $$BlogListing = createComponent(async ($$result, $$props, $$slots) => {
	const PAGE_SIZE = 9;
	const blogs = await getPosts({ all: true });
	const categoryByKey = /* @__PURE__ */ new Map();
	for (const post of blogs) {
		const key = categoryKey(post.category || post.categorySlug);
		if (!key || key === "all") continue;
		if (!categoryByKey.has(key)) categoryByKey.set(key, post.category || post.categorySlug);
	}
	const categoryFilters = [...categoryByKey.entries()].sort((a, b) => a[1].localeCompare(b[1]));
	const initialVisible = Math.min(PAGE_SIZE, blogs.length);
	const searchIndex = blogs.map((post) => ({
		t: post.title,
		e: post.excerpt,
		c: post.category || "",
		p: postUrl(post),
		i: post.image?.src ?? "/images/1st.webp"
	}));
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "blogs-heading",
		"data-astro-cid-szwo6uhb": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div data-blog-listing data-astro-cid-szwo6uhb><script type="application/json" id="blog-search-index">${unescapeHTML(JSON.stringify(searchIndex))}<\/script><div class="blog-listing__header" data-astro-cid-szwo6uhb><div class="blog-listing__intro" data-reveal="up" data-astro-cid-szwo6uhb><p class="pill-light" data-astro-cid-szwo6uhb>Explore the blog</p><h2 id="blogs-heading" class="blog-listing__heading text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-szwo6uhb>The latest thinking.</h2></div><div class="blog-listing__search" data-blog-search-wrap data-astro-cid-szwo6uhb><label class="sr-only" for="blog-search" data-astro-cid-szwo6uhb>Search articles</label><svg class="blog-listing__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-szwo6uhb><path d="M7 12.5A5.5 5.5 0 1 0 7 1.5a5.5 5.5 0 0 0 0 11Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-szwo6uhb></path><path d="m11.5 11.5 2.75 2.75" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-szwo6uhb></path></svg><input id="blog-search" class="blog-listing__search-input" type="search" name="q" placeholder="Search articles" autocomplete="off" role="combobox" aria-autocomplete="list" aria-controls="blog-search-results" aria-expanded="false" aria-haspopup="listbox" data-blog-search data-astro-cid-szwo6uhb><div id="blog-search-results" class="blog-listing__search-results" role="listbox" aria-label="Search results" hidden data-blog-search-results data-astro-cid-szwo6uhb></div><p class="sr-only" role="status" aria-live="polite" data-blog-search-live data-astro-cid-szwo6uhb></p></div></div><div class="blog-listing__filters" role="group" aria-label="Filter articles by category" data-blog-filters data-astro-cid-szwo6uhb><button type="button" class="blog-listing__chip is-active" aria-pressed="true" data-filter-chip data-filter="all" data-astro-cid-szwo6uhb>All articles</button>${categoryFilters.map(([key, label]) => renderTemplate`<button type="button" class="blog-listing__chip" aria-pressed="false" data-filter-chip${addAttribute(key, "data-filter")} data-astro-cid-szwo6uhb>${label}</button>`)}</div><hr class="blog-listing__divider" data-astro-cid-szwo6uhb><div class="blog-listing__meta" data-astro-cid-szwo6uhb><p class="blog-listing__meta-left" data-astro-cid-szwo6uhb><span data-blog-perspective data-astro-cid-szwo6uhb>All perspectives</span>${" "}· <span data-blog-count data-astro-cid-szwo6uhb>${initialVisible}</span> of${" "}<span data-blog-matching data-astro-cid-szwo6uhb>${blogs.length}</span> articles shown</p></div><p class="blog-listing__empty" role="status" aria-live="polite" hidden data-blog-empty data-astro-cid-szwo6uhb>No articles in this category.</p><noscript><style>
			[data-post-card][hidden] {
				display: block !important;
			}
			[data-blog-load-more],
			[data-blog-search-wrap] {
				display: none !important;
			}
		</style></noscript><ul id="blog-listing-grid" class="blog-listing__grid m-0 list-none p-0" role="list"${addAttribute(String(PAGE_SIZE), "data-page-size")}${addAttribute(String(blogs.length), "data-total")} data-blog-grid data-reveal-group data-astro-cid-szwo6uhb>${blogs.map((post, index) => renderTemplate`<li class="blog-listing__item" data-reveal="up" data-post-card${addAttribute(categoryKey(post.category || post.categorySlug), "data-category")}${addAttribute(index >= PAGE_SIZE ? true : void 0, "hidden")} data-astro-cid-szwo6uhb>${renderComponent($$result, "BlogCard", $$BlogCard, {
		"headingLevel": "h3",
		"post": post,
		"image": post.image?.src ?? "/images/1st.webp",
		"alt": post.image?.alt ?? post.title,
		"srcset": post.image?.srcset,
		"width": post.image?.width ?? 400,
		"height": post.image?.height ?? 240,
		"category": post.category,
		"title": post.title,
		"excerpt": post.excerpt,
		"data-astro-cid-szwo6uhb": true
	})}</li>`)}</ul><div class="blog-listing__load-more" data-blog-load-more${addAttribute(blogs.length <= PAGE_SIZE ? true : void 0, "hidden")} data-astro-cid-szwo6uhb>${renderComponent($$result, "Button", $$Button, {
		"type": "button",
		"id": "load-more",
		"class": "!w-[220px]",
		"aria-controls": "blog-listing-grid",
		"aria-label": "Load more articles",
		"hidden": blogs.length <= PAGE_SIZE ? true : void 0,
		"data-astro-cid-szwo6uhb": true
	}, { "default": ($$result) => renderTemplate`
			Load more
			<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-szwo6uhb><path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-szwo6uhb></path></svg>` })}<p class="blog-listing__load-status" role="status" aria-live="polite" data-blog-load-status data-astro-cid-szwo6uhb>Showing ${initialVisible} of ${blogs.length} articles</p></div></div>` })}${renderScript($$result, "C:/Xoomplus/src/components/BlogListing.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Xoomplus/src/components/BlogListing.astro", void 0);
//#endregion
export { $$Section as n, $$PageHero as r, $$BlogListing as t };
