import { A as renderTemplate, B as createAstro, Ct as generateCspDigest, D as renderSlot, M as renderHead, N as addAttribute, P as createRenderInstruction, R as unescapeHTML, j as maybeRenderHead, w as renderComponent, x as spreadAttributes } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { f as isMappedSeoPath, i as getAllWpPageRoutes, o as getPageSEO, t as WP_PAGE_FALLBACK_ROUTES, u as getWpPagePath } from "./wp-seo_tkf0J7_Y.mjs";
import { r as isStaging, t as STAGING_ROBOTS } from "./site-env_4rlXcH-v.mjs";
import { a as postUrl, r as getBlogCategoryPrefixes } from "./wp_3Jg0x5Z_.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/Seo.astro
createAstro("https://xoomplus.co.uk");
var $$Seo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Seo;
	const { title = "", description = "", image, type = "website", canonicalPath = Astro.url.pathname, pageSeo, noindex = false, robots: robotsProp } = Astro.props;
	const site = Astro.site;
	const fromWp = pageSeo != null;
	const seoTitle = fromWp ? pageSeo.seoTitle ?? title : title;
	const seoDescription = fromWp ? pageSeo.metaDescription : description || void 0;
	const canonical = noindex ? void 0 : fromWp ? pageSeo.canonical ?? void 0 : site != null ? new URL(canonicalPath, site).href : void 0;
	const og = fromWp ? pageSeo.social.og : null;
	const x = fromWp ? pageSeo.social.x : null;
	const ogTitle = fromWp ? og?.title ?? seoTitle : seoTitle;
	const ogDescription = fromWp ? og?.description ?? void 0 : seoDescription;
	const ogType = fromWp ? og?.type ?? type : type;
	const ogUrl = noindex ? void 0 : fromWp ? og?.url ?? canonical : canonical;
	const ogSiteName = fromWp ? og?.siteName ?? void 0 : void 0;
	const ogLocale = fromWp ? og?.locale ?? void 0 : void 0;
	const ogImage = fromWp ? og?.image ?? void 0 : image ? image.startsWith("http") ? image : site ? new URL(image, site).href : void 0 : void 0;
	const ogImageWidth = fromWp ? og?.imageWidth ?? void 0 : void 0;
	const ogImageHeight = fromWp ? og?.imageHeight ?? void 0 : void 0;
	const ogImageType = fromWp ? og?.imageType ?? void 0 : void 0;
	const twitterCard = fromWp ? x?.card ?? (ogImage ? "summary_large_image" : "summary") : ogImage ? "summary_large_image" : "summary";
	const twitterTitle = fromWp ? x?.title ?? seoTitle : seoTitle;
	const twitterDescription = fromWp ? x?.description ?? void 0 : seoDescription;
	const twitterImage = fromWp ? x?.image ?? ogImage : ogImage;
	function robotsContent(seo) {
		const parts = [];
		if (seo.robots.index) parts.push(seo.robots.index);
		if (seo.robots.follow) parts.push(seo.robots.follow);
		for (const value of Object.values(seo.robots.advanced)) if (value) parts.push(value);
		return parts.length > 0 ? parts.join(", ") : void 0;
	}
	const yoastRobots = fromWp ? robotsContent(pageSeo) : void 0;
	const schemaJson = fromWp && pageSeo.schema ? JSON.stringify(pageSeo.schema) : void 0;
	return renderTemplate`${seoTitle && renderTemplate`<title>${seoTitle}</title>`}${seoDescription && renderTemplate`<meta name="description"${addAttribute(seoDescription, "content")}>`}${isStaging() && renderTemplate`<meta name="robots"${addAttribute("noindex, nofollow, noarchive, nosnippet, noimageindex", "content")}>`}${!isStaging() && noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}${!isStaging() && !noindex && robotsProp && renderTemplate`<meta name="robots"${addAttribute(robotsProp, "content")}>`}${!isStaging() && !noindex && !robotsProp && yoastRobots && renderTemplate`<meta name="robots"${addAttribute(yoastRobots, "content")}>`}${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}${ogTitle && renderTemplate`<meta property="og:title"${addAttribute(ogTitle, "content")}>`}${ogDescription && renderTemplate`<meta property="og:description"${addAttribute(ogDescription, "content")}>`}${ogType && renderTemplate`<meta property="og:type"${addAttribute(ogType, "content")}>`}${ogUrl && renderTemplate`<meta property="og:url"${addAttribute(ogUrl, "content")}>`}${ogSiteName && renderTemplate`<meta property="og:site_name"${addAttribute(ogSiteName, "content")}>`}${ogLocale && renderTemplate`<meta property="og:locale"${addAttribute(ogLocale, "content")}>`}${ogImage && renderTemplate`<meta property="og:image"${addAttribute(ogImage, "content")}>`}${ogImageWidth != null && renderTemplate`<meta property="og:image:width"${addAttribute(String(ogImageWidth), "content")}>`}${ogImageHeight != null && renderTemplate`<meta property="og:image:height"${addAttribute(String(ogImageHeight), "content")}>`}${ogImageType && renderTemplate`<meta property="og:image:type"${addAttribute(ogImageType, "content")}>`}<meta name="twitter:card"${addAttribute(twitterCard, "content")}>${twitterTitle && renderTemplate`<meta name="twitter:title"${addAttribute(twitterTitle, "content")}>`}${twitterDescription && renderTemplate`<meta name="twitter:description"${addAttribute(twitterDescription, "content")}>`}${twitterImage && renderTemplate`<meta name="twitter:image"${addAttribute(twitterImage, "content")}>`}${schemaJson && renderTemplate`<script type="application/ld+json">${unescapeHTML(schemaJson)}<\/script>`}${renderSlot($$result, $$slots["json-ld"])}`;
}, "C:/Xoomplus/src/components/Seo.astro", void 0);
//#endregion
//#region node_modules/astro/dist/assets/runtime.js
function createSvgComponent({ meta, attributes, children, styles }) {
	const hasStyles = styles.length > 0;
	const Component = createComponent({
		async factory(result, props) {
			const normalizedProps = normalizeProps(attributes, props);
			if (hasStyles && result.cspDestination) for (const style of styles) {
				const hash = await generateCspDigest(style, result.cspAlgorithm);
				result._metadata.extraStyleHashes.push(hash);
			}
			return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
		},
		propagation: hasStyles ? "self" : "none"
	});
	Object.defineProperty(Component, "toJSON", {
		value: () => meta,
		enumerable: false
	});
	return Object.assign(Component, meta);
}
var ATTRS_TO_DROP = [
	"xmlns",
	"xmlns:xlink",
	"version"
];
var DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
	for (const attr of ATTRS_TO_DROP) delete attributes[attr];
	return attributes;
}
function normalizeProps(attributes, props) {
	return dropAttributes({
		...DEFAULT_ATTRS,
		...attributes,
		...props
	});
}
//#endregion
//#region src/assets/icons/btn-loading-icon.svg
var btn_loading_icon_default = createSvgComponent({
	"meta": {
		"src": "/_astro/btn-loading-icon.BAXe0bAP.svg",
		"width": 21,
		"height": 21,
		"format": "svg"
	},
	"attributes": {
		"width": "21",
		"height": "21",
		"viewBox": "0 0 21 21",
		"fill": "none"
	},
	"children": "\n<path d=\"M10.2958 20.592C8.8745 20.592 7.53983 20.3233 6.29183 19.786C5.04383 19.266 3.94316 18.538 2.98983 17.602C2.05383 16.6487 1.31716 15.548 0.779828 14.3C0.259828 13.052 -0.000171803 11.7173 -0.000171803 10.296C-0.000171803 8.85734 0.259828 7.52267 0.779828 6.29201C1.31716 5.04401 2.05383 3.95201 2.98983 3.01601C3.94316 2.06267 5.04383 1.32601 6.29183 0.806006C7.53983 0.268674 8.8745 7.39098e-06 10.2958 7.39098e-06C11.7345 7.39098e-06 13.0692 0.268674 14.2998 0.806006C15.5478 1.32601 16.6398 2.06267 17.5758 3.01601C18.5292 3.95201 19.2658 5.04401 19.7858 6.29201C20.3232 7.52267 20.5918 8.85734 20.5918 10.296C20.5918 11.7173 20.3232 13.052 19.7858 14.3C19.2658 15.548 18.5292 16.6487 17.5758 17.602C16.6398 18.538 15.5478 19.266 14.2998 19.786C13.0692 20.3233 11.7345 20.592 10.2958 20.592ZM10.2958 19.5C11.5785 19.5 12.7745 19.266 13.8838 18.798C14.9932 18.3127 15.9638 17.654 16.7958 16.822C17.6452 15.9727 18.3038 14.9933 18.7718 13.884C19.2572 12.7747 19.4998 11.5787 19.4998 10.296H10.2958V1.09201C9.01316 1.09201 7.81716 1.33467 6.70783 1.82001C5.5985 2.28801 4.61916 2.94667 3.76983 3.79601C2.93783 4.62801 2.27916 5.59867 1.79383 6.70801C1.32583 7.81734 1.09183 9.01334 1.09183 10.296C1.09183 11.5787 1.32583 12.7747 1.79383 13.884C2.27916 14.9933 2.93783 15.9727 3.76983 16.822C4.61916 17.654 5.5985 18.3127 6.70783 18.798C7.81716 19.266 9.01316 19.5 10.2958 19.5Z\" fill=\"#0A0A0A\" />\n",
	"styles": []
});
//#endregion
//#region src/components/Button.astro
createAstro("https://xoomplus.co.uk");
var $$Button = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Button;
	const { href, type = "button", loading = false, disabled = false, size = "default", variant = "primary", class: className = "", id, "aria-label": ariaLabel, "aria-controls": ariaControls, hidden = false } = Astro.props;
	const isDisabled = disabled || loading;
	const isLight = variant === "light";
	const classes = [
		"btn",
		isLight && "btn--light",
		"inline-flex items-center justify-center",
		"box-border",
		!isLight && "rounded-button",
		size === "nav" ? "btn-size-nav" : size === "hero" ? "btn-size-hero" : "px-[28px] py-[18px]",
		"text-primary-black",
		!isLight && "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
		isDisabled && !loading && !isLight && "bg-button-disabled text-[#888888] pointer-events-none",
		loading && "pointer-events-none",
		className
	].filter(Boolean).join(" ");
	const Tag = href && !isDisabled ? "a" : "button";
	return renderTemplate`${renderComponent($$result, "Tag", Tag, {
		"class": classes,
		"id": id,
		"href": Tag === "a" ? href : void 0,
		"type": Tag === "button" ? type : void 0,
		"disabled": Tag === "button" ? isDisabled : void 0,
		"aria-busy": loading || void 0,
		"aria-label": loading ? ariaLabel || "Loading" : ariaLabel,
		"aria-controls": ariaControls,
		"hidden": hidden || void 0
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<span class="btn__label inline-flex items-center justify-center gap-2">${loading ? renderTemplate`<img class="btn-loading-icon size-[21px]"${addAttribute(btn_loading_icon_default.src, "src")} width="21" height="21" alt="" aria-hidden="true">` : renderTemplate`${renderSlot($$result, $$slots["default"])}`}</span>` })}`;
}, "C:/Xoomplus/src/components/Button.astro", void 0);
//#endregion
//#region src/data/services-menu.ts
function slugify(label) {
	return label.toLowerCase().replace(/&/g, "and").replace(/[()/]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function link(label, parentSlug, childSlug) {
	const slug = childSlug ?? slugify(label);
	return {
		label,
		href: parentSlug ? `/services/${parentSlug}/${slug}` : `/services/${slug}`
	};
}
/** Text links in stacked columns — prefer child page when `childSlug` is set. */
function textLink(label, parentSlug, childSlug) {
	return {
		label,
		href: `/services/${parentSlug}/${childSlug}`
	};
}
var servicesMenu = {
	columns: [
		{
			type: "service",
			title: "SEO",
			href: "/services/seo",
			description: "Build visibility. Reach the right audience.",
			links: [
				link("AI SEO (GEO & AEO)", "seo"),
				link("Local SEO", "seo"),
				link("Technical SEO", "seo"),
				link("On-Page SEO", "seo"),
				link("Link Building (Off-Page)", "seo"),
				link("SEO Audit", "seo"),
				link("SEO Content Marketing", "seo")
			]
		},
		{
			type: "service",
			title: "Web Design & Development",
			href: "/services/web-design-development",
			description: "Purposeful experiences. Stronger websites.",
			groups: [{
				label: "Experience and design",
				links: [
					link("UI/UX Design", "web-design-development", "uiux-design"),
					link("Landing Page Design", "web-design-development"),
					link("Website Redesign", "web-design-development")
				]
			}, {
				label: "Development and commerce",
				links: [
					link("WordPress Development", "web-design-development"),
					link("Shopify Development", "web-design-development"),
					link("Ecommerce Development", "web-design-development"),
					link("Custom Website Development", "web-design-development")
				]
			}]
		},
		{
			type: "stack",
			items: [{
				title: "Social Media Marketing",
				href: "/services/social-media-marketing",
				description: "Connect your message with the right people.",
				textLinks: [
					textLink("Content & creative direction", "social-media-marketing", "content-creative-direction"),
					textLink("Campaign planning", "social-media-marketing", "campaign-planning"),
					textLink("Reporting & refinement", "social-media-marketing", "reporting-refinement")
				]
			}, {
				title: "PPC & Google Ads",
				href: "/services/ppc-google-ads",
				description: "Focused campaigns. A clearer path from click to conversion.",
				textLinks: [
					textLink("Audience & keyword research", "ppc-google-ads", "audience-keyword-research"),
					textLink("Landing page alignment", "ppc-google-ads", "landing-page-alignment"),
					textLink("Reporting & refinement", "ppc-google-ads", "reporting-refinement")
				]
			}]
		}
	],
	footer: {
		allServicesHref: "/services",
		heading: "Not sure where to start?",
		text: "Tell us what you're working towards.",
		buttonLabel: "Discuss your project",
		buttonHref: "/contact"
	}
};
/** Flatten menu columns for the mobile accordion (title + child links). */
function getServicesMenuSections() {
	const sections = [];
	for (const column of servicesMenu.columns) if (column.type === "service") {
		const links = column.links ? column.links : column.groups?.flatMap((g) => g.links) ?? [];
		sections.push({
			title: column.title,
			href: column.href,
			links
		});
	} else for (const item of column.items) sections.push({
		title: item.title,
		href: item.href,
		links: item.textLinks
	});
	return sections;
}
//#endregion
//#region src/components/ServicesMegaMenu.astro
var $$ServicesMegaMenu = createComponent(async ($$result, $$props, $$slots) => {
	const { columns, footer } = servicesMenu;
	const allServicesHref = await getWpPagePath("services");
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute("services-mega-menu", "id")} class="services-mega" role="region" aria-label="Services" data-open="false" aria-hidden="true" inert data-services-mega data-astro-cid-exgqxqx5><div class="services-mega__body" data-astro-cid-exgqxqx5>${columns.map((column, colIndex) => {
		if (column.type === "service") {
			const isGrouped = Boolean(column.groups?.length);
			return renderTemplate`<div${addAttribute(["services-mega__col", colIndex > 0 && "services-mega__col--divided"], "class:list")} data-astro-cid-exgqxqx5><a class="services-mega__title-row"${addAttribute(column.href, "href")} data-mega-link data-astro-cid-exgqxqx5><span class="services-mega__title" data-astro-cid-exgqxqx5>${column.title}</span><svg class="services-mega__title-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-exgqxqx5><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-exgqxqx5></path></svg></a><p class="services-mega__desc" data-astro-cid-exgqxqx5>${column.description}</p>${!isGrouped && renderTemplate`<div class="services-mega__rule" aria-hidden="true" data-astro-cid-exgqxqx5></div>`}${column.links && renderTemplate`<ul class="services-mega__links" data-astro-cid-exgqxqx5>${column.links.map((item) => renderTemplate`<li data-astro-cid-exgqxqx5><a class="services-mega__link"${addAttribute(item.href, "href")} data-mega-link data-astro-cid-exgqxqx5><span data-astro-cid-exgqxqx5>${item.label}</span><svg class="services-mega__link-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" data-astro-cid-exgqxqx5><path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-exgqxqx5></path></svg></a></li>`)}</ul>`}${column.groups?.map((group, groupIndex) => renderTemplate`<div${addAttribute([groupIndex === 0 && "services-mega__group--first"], "class:list")} data-astro-cid-exgqxqx5><p class="services-mega__group-label" data-astro-cid-exgqxqx5>${group.label}</p><ul class="services-mega__links" data-astro-cid-exgqxqx5>${group.links.map((item) => renderTemplate`<li data-astro-cid-exgqxqx5><a class="services-mega__link"${addAttribute(item.href, "href")} data-mega-link data-astro-cid-exgqxqx5><span data-astro-cid-exgqxqx5>${item.label}</span><svg class="services-mega__link-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" data-astro-cid-exgqxqx5><path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-exgqxqx5></path></svg></a></li>`)}</ul></div>`)}</div>`;
		}
		return renderTemplate`<div${addAttribute([
			"services-mega__col",
			"services-mega__col--stack",
			colIndex > 0 && "services-mega__col--divided"
		], "class:list")} data-astro-cid-exgqxqx5>${column.items.map((item, itemIndex) => renderTemplate`<div${addAttribute(["services-mega__stack-block", itemIndex > 0 && "services-mega__stack-block--divided"], "class:list")} data-astro-cid-exgqxqx5><a class="services-mega__title-row"${addAttribute(item.href, "href")} data-mega-link data-astro-cid-exgqxqx5><span class="services-mega__title" data-astro-cid-exgqxqx5>${item.title}</span><svg class="services-mega__title-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-exgqxqx5><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-exgqxqx5></path></svg></a><p class="services-mega__desc" data-astro-cid-exgqxqx5>${item.description}</p><div class="services-mega__rule" aria-hidden="true" data-astro-cid-exgqxqx5></div><ul class="services-mega__text-links" data-astro-cid-exgqxqx5>${item.textLinks.map((tl) => renderTemplate`<li data-astro-cid-exgqxqx5><a class="services-mega__text-link"${addAttribute(tl.href, "href")} data-mega-link data-astro-cid-exgqxqx5>${tl.label}</a></li>`)}</ul></div>`)}</div>`;
	})}</div><div class="services-mega__footer" data-astro-cid-exgqxqx5><a class="services-mega__all"${addAttribute(allServicesHref, "href")} data-mega-link data-astro-cid-exgqxqx5><span data-astro-cid-exgqxqx5>All Services</span><svg class="services-mega__all-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-exgqxqx5><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-exgqxqx5></path></svg></a><div class="services-mega__footer-right" data-astro-cid-exgqxqx5><div class="services-mega__cta-copy" data-astro-cid-exgqxqx5><p class="services-mega__cta-heading" data-astro-cid-exgqxqx5>${footer.heading}</p><p class="services-mega__cta-text" data-astro-cid-exgqxqx5>${footer.text}</p></div>${renderComponent($$result, "Button", $$Button, {
		"href": footer.buttonHref,
		"data-astro-cid-exgqxqx5": true
	}, { "default": ($$result) => renderTemplate`${footer.buttonLabel}` })}</div></div></div>`;
}, "C:/Xoomplus/src/components/ServicesMegaMenu.astro", void 0);
//#endregion
//#region src/data/nav.ts
var NAV_KEYS = [
	{
		label: "Home",
		key: "home"
	},
	{
		label: "Services",
		key: "services",
		hasDropdown: true
	},
	{
		label: "About",
		key: "about"
	},
	{
		label: "Industries",
		key: "industries"
	},
	{
		label: "Case Studies",
		key: "caseStudies"
	},
	{
		label: "Contact",
		key: "contact"
	},
	{
		label: "Blog",
		key: "blogs"
	}
];
/** Nav with hrefs resolved from live WordPress CMS slugs. */
async function getNavItemsResolved() {
	const { getAllWpPageRoutes } = await import("./wp-seo_tkf0J7_Y.mjs").then((n) => n.v);
	const routes = await getAllWpPageRoutes();
	const byKey = new Map(routes.map((r) => [r.key, r.route]));
	const servicesHref = byKey.get("services") ?? "/services";
	const blogCategoryPrefixes = await getBlogCategoryPrefixes();
	const items = [];
	for (const def of NAV_KEYS) {
		const href = byKey.get(def.key) ?? WP_PAGE_FALLBACK_ROUTES[def.key];
		if (!byKey.get(def.key)) console.error(`[nav] live CMS path missing for "${def.key}" — using fallback ${href}`);
		let matchPrefixes;
		if (def.hasDropdown) matchPrefixes = [
			href,
			servicesHref,
			"/services"
		];
		else if (def.key === "blogs") matchPrefixes = [
			href,
			"/blogs",
			...blogCategoryPrefixes
		];
		items.push({
			label: def.label,
			href,
			hasDropdown: def.hasDropdown,
			matchPrefixes
		});
	}
	return items;
}
/** Normalize pathname for active matching. */
function normalizePath(pathname) {
	return pathname.replace(/\/+$/, "") || "/";
}
function isNavActive(pathname, href, matchPrefixes) {
	const path = normalizePath(pathname);
	const itemPath = normalizePath(href);
	if (itemPath === "/") return path === "/";
	return (matchPrefixes?.length ? matchPrefixes : [itemPath]).map(normalizePath).some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
//#endregion
//#region src/components/Header.astro
createAstro("https://xoomplus.co.uk");
var $$Header = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { variant = "default", theme = "dark", suppressActive = false } = Astro.props;
	const pathname = Astro.url.pathname.replace(/\/+$/, "") || "/";
	const nav = await getNavItemsResolved();
	const allServicesHref = nav.find((item) => item.label === "Services")?.href ?? "/services";
	const megaPanelId = "services-mega-menu";
	const mobileDrawerId = "mobile-nav-drawer";
	const mobileServicesId = "mobile-services-sheet";
	const servicesSections = getServicesMenuSections();
	function isActive(href, matchPrefixes) {
		if (suppressActive) return false;
		if (href.startsWith("#")) return false;
		return isNavActive(pathname, href, matchPrefixes);
	}
	return renderTemplate`${maybeRenderHead($$result)}<header class="pointer-events-none fixed inset-x-0 top-0 z-50" data-site-header${addAttribute(variant, "data-variant")}${addAttribute(theme === "light" ? "light" : void 0, "data-theme")} data-astro-cid-nen7h5rs><!--
		Default: Logo left · glass nav (links only) center · CTA right
		Scrolled: one unified glass shell around logo + links + CTA
	--><div class="pointer-events-auto relative mx-auto hidden w-full max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center gap-x-6 bg-transparent pl-8 pr-8 pt-6 lg:grid lg:pl-12 lg:pr-12" data-nav-desktop data-astro-cid-nen7h5rs><a class="nav-logo-link z-[1] shrink-0 justify-self-start" href="/" aria-label="Xoomplus home" data-nav-logo data-astro-cid-nen7h5rs><img src="/images/logo-xoomplus.webp" alt="Xoomplus" width="132" height="36" class="logo logo--white" loading="eager" decoding="async" data-astro-cid-nen7h5rs><img src="/images/logo-black.webp" alt="" width="132" height="36" class="logo logo--black" loading="eager" decoding="async" aria-hidden="true" data-astro-cid-nen7h5rs></a><nav class="nav-glass relative min-w-0 justify-self-center rounded-full" aria-label="Primary" data-nav-cluster data-astro-cid-nen7h5rs><div class="nav-indicator" data-nav-indicator aria-hidden="true" style="--nav-ind-opacity: 0; --nav-ind-x: 0px; --nav-ind-w: 0px;" data-astro-cid-nen7h5rs></div><ul class="nav-pill-links relative z-[1] m-0 flex list-none items-center gap-0 p-1" data-nav-links data-astro-cid-nen7h5rs>${nav.map((item) => {
		const active = isActive(item.href, item.matchPrefixes);
		if (Boolean(item.hasDropdown)) return renderTemplate`<li class="services-nav-item" data-services-nav data-astro-cid-nen7h5rs><a${addAttribute(["nav-pill-link inline-flex items-center justify-center gap-[0.3rem] whitespace-nowrap rounded-full px-3.5 py-2.5 text-[0.875rem] font-medium tracking-[-0.01em]", active && "nav-link-active font-semibold"], "class:list")}${addAttribute(item.href, "href")}${addAttribute(active ? "page" : void 0, "aria-current")} aria-haspopup="true" aria-expanded="false"${addAttribute(megaPanelId, "aria-controls")} data-services-trigger data-nav-link data-astro-cid-nen7h5rs>${item.label}<svg class="opacity-85" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" data-astro-cid-nen7h5rs><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-nen7h5rs></path></svg></a>${renderComponent($$result, "ServicesMegaMenu", $$ServicesMegaMenu, { "data-astro-cid-nen7h5rs": true })}</li>`;
		return renderTemplate`<li data-astro-cid-nen7h5rs><a${addAttribute(["nav-pill-link inline-flex items-center justify-center gap-[0.3rem] whitespace-nowrap rounded-full px-3.5 py-2.5 text-[0.875rem] font-medium tracking-[-0.01em]", active && "nav-link-active font-semibold"], "class:list")}${addAttribute(item.href, "href")}${addAttribute(active ? "page" : void 0, "aria-current")} data-nav-link data-astro-cid-nen7h5rs>${item.label}</a></li>`;
	})}</ul></nav><div class="z-[1] shrink-0 justify-self-end" data-nav-cta data-astro-cid-nen7h5rs>${renderComponent($$result, "Button", $$Button, {
		"size": "nav",
		"href": "#contact",
		"data-astro-cid-nen7h5rs": true
	}, { "default": ($$result) => renderTemplate`Let’s Talk` })}</div></div><!-- Mobile top: Logo ………… Menu (<1024px); glass shell when scrolled --><div class="pointer-events-auto mx-auto flex w-full items-center justify-between gap-3 bg-transparent pl-4 pr-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] sm:pl-6 sm:pr-6 lg:hidden" data-nav-mobile data-astro-cid-nen7h5rs><a class="nav-logo-link shrink-0" href="/" aria-label="Xoomplus home" data-nav-logo-mobile data-astro-cid-nen7h5rs><img src="/images/logo-xoomplus.webp" alt="Xoomplus" width="132" height="36" class="logo logo--white" loading="eager" decoding="async" data-astro-cid-nen7h5rs><img src="/images/logo-black.webp" alt="" width="132" height="36" class="logo logo--black" loading="eager" decoding="async" aria-hidden="true" data-astro-cid-nen7h5rs></a><button class="mobile-menu-btn shrink-0" type="button" aria-expanded="false"${addAttribute(mobileDrawerId, "aria-controls")} aria-label="Open menu" data-mobile-menu-toggle data-astro-cid-nen7h5rs><span class="mobile-menu-btn__icon" aria-hidden="true" data-astro-cid-nen7h5rs></span><span class="mobile-menu-btn__label" data-astro-cid-nen7h5rs>Menu</span></button></div><!-- Right drawer (full links) --><div class="mobile-drawer-root lg:hidden" data-mobile-drawer-root hidden inert data-astro-cid-nen7h5rs><button class="mobile-drawer__backdrop" type="button" tabindex="-1" aria-label="Close menu" data-mobile-drawer-backdrop data-astro-cid-nen7h5rs></button><aside${addAttribute(mobileDrawerId, "id")} class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu" data-mobile-drawer data-astro-cid-nen7h5rs><div class="mobile-drawer__head" data-astro-cid-nen7h5rs><p class="mobile-drawer__title" data-astro-cid-nen7h5rs>Menu</p><button class="mobile-drawer__close" type="button" aria-label="Close menu" data-mobile-drawer-close data-astro-cid-nen7h5rs><span aria-hidden="true" data-astro-cid-nen7h5rs>×</span></button></div><nav aria-label="Mobile menu" data-astro-cid-nen7h5rs><ul class="mobile-drawer__list" data-astro-cid-nen7h5rs>${nav.map((item) => {
		const active = isActive(item.href, item.matchPrefixes);
		if (Boolean(item.hasDropdown)) return renderTemplate`<li data-astro-cid-nen7h5rs><button${addAttribute(["mobile-drawer__link", active && "is-active"], "class:list")} type="button" aria-expanded="false"${addAttribute(mobileServicesId, "aria-controls")} aria-haspopup="dialog" data-mobile-drawer-services data-astro-cid-nen7h5rs>${item.label}<svg class="mobile-drawer__chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" data-astro-cid-nen7h5rs><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-nen7h5rs></path></svg></button></li>`;
		return renderTemplate`<li data-astro-cid-nen7h5rs><a${addAttribute(["mobile-drawer__link", active && "is-active"], "class:list")}${addAttribute(item.href, "href")}${addAttribute(active ? "page" : void 0, "aria-current")} data-mobile-drawer-link data-astro-cid-nen7h5rs>${item.label}</a></li>`;
	})}</ul></nav><div class="mobile-drawer__cta" data-astro-cid-nen7h5rs>${renderComponent($$result, "Button", $$Button, {
		"size": "nav",
		"class": "!w-full",
		"href": "#contact",
		"data-astro-cid-nen7h5rs": true
	}, { "default": ($$result) => renderTemplate`Let’s Talk` })}</div></aside></div><!-- Mobile Services mega sheet (from bottom nav) --><div class="mobile-services-root lg:hidden" data-mobile-services-root hidden inert data-astro-cid-nen7h5rs><button class="mobile-services__backdrop" type="button" tabindex="-1" aria-label="Close services menu" data-mobile-services-backdrop data-astro-cid-nen7h5rs></button><div${addAttribute(mobileServicesId, "id")} class="mobile-services-sheet" role="dialog" aria-modal="true" aria-label="Services" data-mobile-services-sheet data-astro-cid-nen7h5rs><div class="mobile-services-sheet__head" data-astro-cid-nen7h5rs><button class="mobile-services-sheet__back" type="button" data-mobile-services-close data-astro-cid-nen7h5rs><span aria-hidden="true" data-astro-cid-nen7h5rs>←</span><span data-astro-cid-nen7h5rs>Back</span></button><p class="mobile-services-sheet__title" data-astro-cid-nen7h5rs>Services</p><button class="mobile-services-sheet__close" type="button" aria-label="Close services menu" data-mobile-services-close data-astro-cid-nen7h5rs><span aria-hidden="true" data-astro-cid-nen7h5rs>×</span></button></div><div class="mobile-services-sheet__body" data-astro-cid-nen7h5rs><a class="mobile-services-sheet__all"${addAttribute(allServicesHref, "href")} data-mobile-services-link data-astro-cid-nen7h5rs>All Services</a>${servicesSections.map((section) => renderTemplate`<details class="mobile-services-acc" data-astro-cid-nen7h5rs><summary class="mobile-services-acc__summary" data-astro-cid-nen7h5rs><span data-astro-cid-nen7h5rs>${section.title}</span><svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" data-astro-cid-nen7h5rs><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-nen7h5rs></path></svg></summary><ul class="mobile-services-acc__list" data-astro-cid-nen7h5rs><li data-astro-cid-nen7h5rs><a class="mobile-services-acc__parent"${addAttribute(section.href, "href")} data-mobile-services-link data-astro-cid-nen7h5rs>Overview</a></li>${section.links.map((link) => renderTemplate`<li data-astro-cid-nen7h5rs><a${addAttribute(link.href, "href")} data-mobile-services-link data-astro-cid-nen7h5rs>${link.label}</a></li>`)}</ul></details>`)}</div><div class="mobile-services-sheet__footer" data-astro-cid-nen7h5rs><p class="mobile-services-sheet__footer-heading" data-astro-cid-nen7h5rs>${servicesMenu.footer.heading}</p><p class="mobile-services-sheet__footer-text" data-astro-cid-nen7h5rs>${servicesMenu.footer.text}</p>${renderComponent($$result, "Button", $$Button, {
		"size": "nav",
		"class": "!w-full",
		"href": servicesMenu.footer.buttonHref,
		"data-astro-cid-nen7h5rs": true
	}, { "default": ($$result) => renderTemplate`${servicesMenu.footer.buttonLabel}` })}</div></div></div></header>${renderScript($$result, "C:/Xoomplus/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Xoomplus/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	const routes = await getAllWpPageRoutes();
	const byKey = new Map(routes.map((r) => [r.key, r.route]));
	const aboutHref = byKey.get("about") ?? WP_PAGE_FALLBACK_ROUTES.about;
	const servicesHref = byKey.get("services") ?? WP_PAGE_FALLBACK_ROUTES.services;
	const industriesHref = byKey.get("industries") ?? WP_PAGE_FALLBACK_ROUTES.industries;
	const caseStudiesHref = byKey.get("caseStudies") ?? WP_PAGE_FALLBACK_ROUTES.caseStudies;
	const contactHref = byKey.get("contact") ?? WP_PAGE_FALLBACK_ROUTES.contact;
	const blogsHref = byKey.get("blogs") ?? WP_PAGE_FALLBACK_ROUTES.blogs;
	if (routes.length === 0) console.error("[footer] live CMS paths unavailable — using fallback routes");
	const linkColumns = [
		{
			title: "Company",
			ariaLabel: "Company",
			links: [
				{
					label: "About",
					href: aboutHref
				},
				{
					label: "Services",
					href: servicesHref
				},
				{
					label: "Industries",
					href: industriesHref
				},
				{
					label: "Case Studies",
					href: caseStudiesHref
				},
				{
					label: "Pricing",
					href: "/pricing"
				},
				{
					label: "Contact",
					href: contactHref
				},
				{
					label: "Blog",
					href: blogsHref
				}
			]
		},
		{
			title: "Services",
			ariaLabel: "Services",
			links: [
				{
					label: "SEO",
					href: "/services/seo"
				},
				{
					label: "Web Design & Development",
					href: "/services/web-design-development"
				},
				{
					label: "Social Media Marketing",
					href: "/services/social-media-marketing"
				},
				{
					label: "PPC & Google Ads",
					href: "/services/ppc-google-ads"
				}
			]
		},
		{
			title: "Industries",
			ariaLabel: "Industries",
			links: [
				{
					label: "Home & Trade Services",
					href: "/industries/home-trade-services"
				},
				{
					label: "Retail & E-commerce",
					href: "/industries/retail-ecommerce"
				},
				{
					label: "Property & Construction",
					href: "/industries/property-construction"
				},
				{
					label: "Professional Services",
					href: "/industries/professional-services"
				},
				{
					label: "Healthcare & Wellness",
					href: "/industries/healthcare-wellness"
				},
				{
					label: "Hospitality & Leisure",
					href: "/industries/hospitality-leisure"
				}
			]
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer" data-astro-cid-jo6i4kqk><img class="site-footer__plus" src="/icons/plus-icon.svg" alt="" aria-hidden="true" width="164" height="147" decoding="async" data-astro-cid-jo6i4kqk><div class="site-footer__inner container container--wide" data-astro-cid-jo6i4kqk><div class="site-footer__grid" data-astro-cid-jo6i4kqk><div class="site-footer__brand" data-astro-cid-jo6i4kqk><a href="/" aria-label="Xoomplus home" class="site-footer__logo-link" data-astro-cid-jo6i4kqk><img src="/images/logo-xoomplus.webp" alt="Xoomplus" width="202" height="47" class="site-footer__logo" decoding="async" data-astro-cid-jo6i4kqk></a><p class="site-footer__tagline" data-astro-cid-jo6i4kqk><span class="site-footer__tagline-line" data-astro-cid-jo6i4kqk>Digital Marketing.</span><span class="site-footer__tagline-line" data-astro-cid-jo6i4kqk>Designed for Growth.</span></p></div>${linkColumns.map((column) => renderTemplate`<nav class="site-footer__col"${addAttribute(column.ariaLabel, "aria-label")} data-astro-cid-jo6i4kqk><h3 class="site-footer__heading" data-astro-cid-jo6i4kqk>${column.title}</h3><ul class="site-footer__list" data-astro-cid-jo6i4kqk>${column.links.map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a class="site-footer__link"${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></nav>`)}<div class="site-footer__col site-footer__col--locations" data-astro-cid-jo6i4kqk><nav aria-label="Locations" data-astro-cid-jo6i4kqk><h3 class="site-footer__heading" data-astro-cid-jo6i4kqk>Locations</h3><ul class="site-footer__list" data-astro-cid-jo6i4kqk>${[{
		label: "Blackburn",
		href: "/locations/blackburn"
	}, {
		label: "Manchester",
		href: "/locations/manchester"
	}].map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a class="site-footer__link"${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></nav><nav class="site-footer__social-block" aria-label="Social Links" data-astro-cid-jo6i4kqk><h3 class="site-footer__heading" data-astro-cid-jo6i4kqk>Social Links</h3><ul class="site-footer__social-list" data-astro-cid-jo6i4kqk>${[
		{
			label: "Facebook",
			href: "#",
			icon: "/icons/footer-facebook.svg"
		},
		{
			label: "Instagram",
			href: "#",
			icon: "/icons/footer-instagram.svg"
		},
		{
			label: "X",
			href: "#",
			icon: "/icons/footer-x.svg"
		},
		{
			label: "LinkedIn",
			href: "#",
			icon: "/icons/footer-linkedin.svg"
		}
	].map((social) => renderTemplate`<li data-astro-cid-jo6i4kqk><a class="site-footer__social"${addAttribute(social.href, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(social.label, "aria-label")} data-astro-cid-jo6i4kqk><img${addAttribute(social.icon, "src")} alt="" aria-hidden="true" width="30" height="30" decoding="async" data-astro-cid-jo6i4kqk></a></li>`)}</ul></nav></div></div><div class="site-footer__bottom" data-astro-cid-jo6i4kqk><p class="site-footer__copy" data-astro-cid-jo6i4kqk>© ${year} Xoomplus. All rights reserved.</p><nav aria-label="Legal" data-astro-cid-jo6i4kqk><ul class="site-footer__legal" data-astro-cid-jo6i4kqk>${[
		{
			label: "Legal",
			href: "/legal"
		},
		{
			label: "Privacy Policy",
			href: "/privacy-policy"
		},
		{
			label: "Terms & Conditions",
			href: "/terms"
		}
	].map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a class="site-footer__legal-link"${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></nav></div></div></footer>`;
}, "C:/Xoomplus/src/components/Footer.astro", void 0);
//#endregion
//#region src/components/ButtonOutline.astro
createAstro("https://xoomplus.co.uk");
var $$ButtonOutline = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ButtonOutline;
	const { href, type = "button", disabled = false, class: className = "", id, "aria-label": ariaLabel } = Astro.props;
	const classes = ["btn-outline", className].filter(Boolean).join(" ");
	const Tag = href && !disabled ? "a" : "button";
	return renderTemplate`${renderComponent($$result, "Tag", Tag, {
		"class": classes,
		"id": id,
		"href": Tag === "a" ? href : void 0,
		"type": Tag === "button" ? type : void 0,
		"disabled": Tag === "button" ? disabled : void 0,
		"aria-disabled": Tag === "a" && disabled ? "true" : void 0,
		"aria-label": ariaLabel
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "C:/Xoomplus/src/components/ButtonOutline.astro", void 0);
//#endregion
//#region src/components/ScrollToTop.astro
var $$ScrollToTop = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="scroll-to-top" data-scroll-to-top inert data-astro-cid-p774adf7>${renderComponent($$result, "ButtonOutline", $$ButtonOutline, {
		"type": "button",
		"class": "scroll-to-top__btn",
		"id": "scroll-to-top",
		"aria-label": "Scroll to top",
		"data-astro-cid-p774adf7": true
	}, { "default": ($$result) => renderTemplate`<svg class="btn-outline__icon scroll-to-top__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-p774adf7><path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-p774adf7></path></svg>` })}</div>${renderScript($$result, "C:/Xoomplus/src/components/ScrollToTop.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Xoomplus/src/components/ScrollToTop.astro", void 0);
//#endregion
//#region src/assets/fonts/SFPRODISPLAYBOLD.OTF
var SFPRODISPLAYBOLD_default = "/_astro/SFPRODISPLAYBOLD.CkqE-6tD.OTF";
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://xoomplus.co.uk");
var $$Layout = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title = "Xoomplus — Digital Marketing & Growth Partner", description = "Xoomplus combines SEO, web design and development, social media marketing, and paid search to help businesses grow.", image, type = "website", canonicalPath, seoPath, headerVariant = "default", theme: themeProp, headerTheme = "dark", noindex = false, robots: robotsProp, suppressNavActive = false } = Astro.props;
	const theme = themeProp ?? headerTheme;
	const path = seoPath ?? Astro.url.pathname;
	const mapped = !noindex && await isMappedSeoPath(path);
	const pageSeo = mapped ? await getPageSEO(path) : null;
	if (isStaging()) Astro.response.headers.set("X-Robots-Tag", STAGING_ROBOTS);
	else if (noindex) Astro.response.headers.set("X-Robots-Tag", "noindex, nofollow");
	else if (robotsProp) Astro.response.headers.set("X-Robots-Tag", robotsProp);
	return renderTemplate`<html lang="en"${addAttribute(theme === "light" ? "light" : void 0, "data-theme")}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="preload"${addAttribute(SFPRODISPLAYBOLD_default, "href")} as="font" type="font/otf" crossorigin><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><script>
			document.documentElement.classList.add('js');
		<\/script>${renderComponent($$result, "Seo", $$Seo, {
		"title": mapped ? void 0 : title,
		"description": mapped ? void 0 : description,
		"image": image,
		"type": type,
		"canonicalPath": canonicalPath,
		"pageSeo": pageSeo,
		"noindex": noindex,
		"robots": robotsProp
	}, { "json-ld": ($$result) => renderTemplate`${renderSlot($$result, $$slots["json-ld"])}` })}${renderHead($$result)}</head><body class="m-0 flex min-h-screen w-full flex-col">${renderComponent($$result, "Header", $$Header, {
		"variant": headerVariant,
		"theme": theme,
		"suppressActive": suppressNavActive
	})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "ScrollToTop", $$ScrollToTop, {})}${renderScript($$result, "C:/Xoomplus/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "C:/Xoomplus/src/layouts/Layout.astro", void 0);
//#endregion
//#region src/components/CTASection.astro
var $$CTASection = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="cta" data-bg="dark" class="page-section bg-secondary-white py-section" aria-labelledby="cta-heading" data-astro-cid-dybu6lt7><div class="container" data-astro-cid-dybu6lt7><div class="cta-card" style="background-image: url('/images/cta-bg-image.webp')" data-astro-cid-dybu6lt7><div class="cta-card__inner" data-astro-cid-dybu6lt7><div class="cta-card__left" data-reveal="up" data-astro-cid-dybu6lt7><p class="pill-dark text-primary m-0" data-astro-cid-dybu6lt7>Your next chapter</p><h2 id="cta-heading" class="cta-card__heading text-hero-h1 m-0 mt-4" data-astro-cid-dybu6lt7>Let's move your business forward.</h2><p class="cta-card__copy m-0" data-astro-cid-dybu6lt7>Tell us what you're working towards. We'll explore the challenge, the possibilities and the right place to start.</p></div><div class="cta-card__right" data-astro-cid-dybu6lt7>${renderComponent($$result, "Button", $$Button, {
		"href": "#contact",
		"data-astro-cid-dybu6lt7": true
	}, { "default": ($$result) => renderTemplate`Discuss your project` })}<a class="cta-card__email" href="mailto:info@xoomplus.co.uk" data-astro-cid-dybu6lt7>info@xoomplus.co.uk</a></div></div></div></div></section>`;
}, "C:/Xoomplus/src/components/CTASection.astro", void 0);
//#endregion
//#region src/components/BlogCard.astro
createAstro("https://xoomplus.co.uk");
var $$BlogCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogCard;
	const { image, alt, category, title, excerpt, post, href: hrefProp, size = "default", headingLevel = "h3", srcset, sizes = "(min-width:1024px) 33vw, 100vw", width = 400, height = 240 } = Astro.props;
	const href = post ? postUrl(post) : hrefProp ? postUrl({
		path: hrefProp,
		slug: title,
		id: 0,
		title
	}) : (() => {
		throw new Error(`[BlogCard] "${title}" needs a post (or href from postUrl) — no /blogs/<slug> fallback`);
	})();
	const TitleTag = headingLevel;
	const showCategory = Boolean(category?.trim());
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(["blog-card-wrap", size === "compact" && "blog-card-wrap--compact"], "class:list")} data-astro-cid-vqljwchw><a class="blog-card"${addAttribute(href, "href")} data-astro-cid-vqljwchw><div class="blog-card__media" data-astro-cid-vqljwchw><img class="blog-card__img"${addAttribute(image, "src")}${addAttribute(srcset || void 0, "srcset")}${addAttribute(srcset ? sizes : void 0, "sizes")}${addAttribute(alt, "alt")}${addAttribute(width, "width")}${addAttribute(height, "height")} loading="lazy" decoding="async" data-astro-cid-vqljwchw></div><div class="blog-card__meta" data-astro-cid-vqljwchw>${showCategory ? renderTemplate`<span class="blog-card__category" data-astro-cid-vqljwchw><span class="blog-card__dot" aria-hidden="true" data-astro-cid-vqljwchw></span>${category}</span>` : renderTemplate`<span class="blog-card__category" aria-hidden="true" data-astro-cid-vqljwchw></span>`}<span class="blog-card__label" data-astro-cid-vqljwchw>From our blog</span></div>${renderComponent($$result, "TitleTag", TitleTag, {
		"class": "blog-card__title",
		"data-astro-cid-vqljwchw": true
	}, { "default": ($$result) => renderTemplate`${title}` })}<p class="blog-card__excerpt" data-astro-cid-vqljwchw>${excerpt}</p><div class="blog-card__footer" data-astro-cid-vqljwchw><span class="blog-card__read" data-astro-cid-vqljwchw>Read more</span><svg class="blog-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-vqljwchw><path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="#FFA800" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vqljwchw></path></svg></div></a></article>`;
}, "C:/Xoomplus/src/components/BlogCard.astro", void 0);
//#endregion
export { $$Button as a, $$ButtonOutline as i, $$CTASection as n, renderScript as o, $$Layout as r, $$BlogCard as t };
