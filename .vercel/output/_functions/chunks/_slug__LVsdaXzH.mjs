import { f as normalizeSeoPath, l as getWpPagePath, r as getAllWpPageRoutes, v as __exportAll } from "./wp-seo_BlJOjkiY.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, R as unescapeHTML, T as Fragment$1, j as maybeRenderHead, w as renderComponent } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { a as $$Button, n as $$CTASection, o as renderScript, r as $$Layout } from "./BlogCard_DSwypSUq.mjs";
import { n as $$Section, r as $$PageHero, t as $$BlogListing } from "./BlogListing_BhBQvAZY.mjs";
import { a as $$ContactSection, c as expertiseServices, d as $$ServiceCard, i as $$Industries, n as projects, o as $$LocationMap, r as $$ProjectCard, s as $$OurProcess } from "./projects_BVvrVinc.mjs";
import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import fs from "node:fs";
import path from "node:path";
import { cn } from "cn";
import { Accordion } from "radix-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
//#region src/components/OurStory.astro
var $$OurStory = createComponent(($$result, $$props, $$slots) => {
	const storyImage = {
		src: "/images/our-story-image.webp",
		width: 602,
		height: 447,
		alt: "The Xoomplus team collaborating around a laptop"
	};
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "our-story-heading",
		"data-astro-cid-p7fr4qq6": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="our-story" data-astro-cid-p7fr4qq6><div class="our-story__content" data-astro-cid-p7fr4qq6><div data-reveal="up" data-astro-cid-p7fr4qq6><p class="pill-light" data-astro-cid-p7fr4qq6>Our story</p><h2 id="our-story-heading" class="our-story__heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-p7fr4qq6>Built around your business.<br data-astro-cid-p7fr4qq6>Not around silos.</h2><div class="our-story__copy" data-astro-cid-p7fr4qq6><p class="text-on-light m-0" data-astro-cid-p7fr4qq6>A great website should support your marketing. Your marketing should reflect your brand. And every decision should start with your business.</p><p class="text-on-light m-0" data-astro-cid-p7fr4qq6>That is the thinking behind XoomPlus. We bring digital marketing, design and development into one conversation, so ideas can move from strategy to execution without losing their purpose along the way.</p><p class="text-on-light m-0" data-astro-cid-p7fr4qq6>We see ourselves as a digital partner: curious about your challenges, clear about our thinking and invested in building something useful together.</p></div></div><div class="our-story__cta" data-astro-cid-p7fr4qq6>${renderComponent($$result, "Button", $$Button, {
		"href": "#contact",
		"class": "!w-[212px]",
		"data-astro-cid-p7fr4qq6": true
	}, { "default": ($$result) => renderTemplate`Let’s Talk` })}</div></div><div class="our-story__media" data-reveal="fade" data-astro-cid-p7fr4qq6><img class="our-story__image"${addAttribute(storyImage.src, "src")}${addAttribute(storyImage.alt, "alt")}${addAttribute(storyImage.width, "width")}${addAttribute(storyImage.height, "height")} loading="lazy" decoding="async" data-astro-cid-p7fr4qq6></div></div>` })}`;
}, "C:/Xoomplus/src/components/OurStory.astro", void 0);
//#endregion
//#region src/components/ExpertiseImpact.astro
var $$ExpertiseImpact = createComponent(($$result, $$props, $$slots) => {
	const stats = [
		{
			value: "99%",
			label: "Client Satisfaction"
		},
		{
			value: "99%",
			label: "Client Satisfaction"
		},
		{
			value: "500+",
			label: "Proven Results"
		},
		{
			value: "2k+",
			label: "Happy Clients"
		}
	];
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "expertise-heading",
		"data-astro-cid-wclxasst": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="expertise-header" data-reveal="up" data-astro-cid-wclxasst><p class="pill-light mb-5" data-astro-cid-wclxasst>Our Expertise & Impact</p><h2 id="expertise-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-wclxasst>Driving Digital Success with Proven Strategies</h2><p class="expertise-intro text-on-light mx-auto max-w-[1100px]" data-astro-cid-wclxasst>At XoomPlus, we combine creativity, technology, and data to deliver exceptional results. From innovative marketing campaigns to${" "}<br class="expertise-intro__break" data-astro-cid-wclxasst>high-performance websites, we help businesses build strong digital footprints, increase brand awareness, and maximize ROI.</p></div><ul class="expertise-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-wclxasst>${stats.map((stat) => renderTemplate`<li class="surface-card expertise-card" data-reveal="up" data-astro-cid-wclxasst><span class="expertise-card__value" data-astro-cid-wclxasst>${stat.value}</span><span class="expertise-card__label" data-astro-cid-wclxasst>${stat.label}</span></li>`)}</ul>` })}`;
}, "C:/Xoomplus/src/components/ExpertiseImpact.astro", void 0);
//#endregion
//#region src/components/OurPurpose.astro
var $$OurPurpose = createComponent(($$result, $$props, $$slots) => {
	const intro = "From search visibility to website experiences and social campaigns, Xoomplus brings key digital services together to help your business reach, engage, and the right audience.";
	const cards = [{
		pill: "Our mission",
		title: "Make digital work harder for your business.",
		text: "Turn business challenges into clear digital direction. Create experiences and campaigns that connect with the right people, and keep improving the work as needs change."
	}, {
		pill: "Our vision",
		title: "A more connected way to move forward.",
		text: "A digital presence where brand, experience and marketing strengthen each other. Where businesses feel confident in their next step, and good ideas have room to grow."
	}];
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"background": "dark",
		"aria-labelledby": "purpose-heading",
		"class": "our-purpose section-glow-top-left",
		"data-astro-cid-gj6hdeqr": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="purpose-header" data-reveal="up" data-astro-cid-gj6hdeqr><h2 id="purpose-heading" class="text-heading-dark dark-section-heading purpose-heading m-0" data-astro-cid-gj6hdeqr>Our purpose</h2><p class="dark-section-intro purpose-intro m-0" data-astro-cid-gj6hdeqr>${intro}</p></div><div class="purpose-grid" data-reveal-group data-astro-cid-gj6hdeqr>${cards.map((card) => renderTemplate`<article class="service-card service-card--wide purpose-card" data-reveal="up" data-astro-cid-gj6hdeqr><p class="pill-dark text-primary m-0" data-astro-cid-gj6hdeqr>${card.pill}</p><h3 class="purpose-card__title m-0" data-astro-cid-gj6hdeqr>${card.title}</h3><p class="dark-glass-card__text purpose-card__text m-0" data-astro-cid-gj6hdeqr>${card.text}</p></article>`)}</div>` })}`;
}, "C:/Xoomplus/src/components/OurPurpose.astro", void 0);
//#endregion
//#region src/components/WhatGuidesUs.astro
var $$WhatGuidesUs = createComponent(($$result, $$props, $$slots) => {
	const principles = [
		{
			icon: "/icons/simplicity-essential.svg",
			title: "Simplicity is essential.",
			text: "Simplify the complex. Use straightforward language to clarify choices and next steps."
		},
		{
			icon: "/icons/remain-inquisitive.svg",
			title: "Remain inquisitive",
			text: "Pose thoughtful questions. Know your audience and challenge the obvious."
		},
		{
			icon: "/icons/focus-on-every-detail.svg",
			title: "Focus on every detail.",
			text: "Appreciate both aesthetics and functionality. Concentrate on the minor choices."
		},
		{
			icon: "/icons/evolve-through-teamwork.svg",
			title: "Evolve through teamwork.",
			text: "Exchange ideas, take ownership, and learn collectively for improved results."
		}
	];
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "guides-heading",
		"data-astro-cid-xlqynmgr": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="guides-header" data-reveal="up" data-astro-cid-xlqynmgr><p class="pill-light mb-5" data-astro-cid-xlqynmgr>What guides us</p><h2 id="guides-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-xlqynmgr>Good work starts with good principles.</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-xlqynmgr>The way we think matters just as much as the work we make.</p></div><ul class="guides-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-xlqynmgr>${principles.map((item) => renderTemplate`<li class="why-card guides-card" data-reveal="up" data-astro-cid-xlqynmgr><div class="guides-card__icon" aria-hidden="true" data-astro-cid-xlqynmgr><img${addAttribute(item.icon, "src")} alt="" width="20" height="20" decoding="async" loading="lazy" data-astro-cid-xlqynmgr></div><h3 class="guides-card__title m-0" data-astro-cid-xlqynmgr>${item.title}</h3><p class="guides-card__text m-0" data-astro-cid-xlqynmgr>${item.text}</p></li>`)}</ul>` })}`;
}, "C:/Xoomplus/src/components/WhatGuidesUs.astro", void 0);
//#endregion
//#region src/components/OurExpertise.astro
var $$OurExpertise = createComponent(async ($$result, $$props, $$slots) => {
	const servicesHref = await getWpPagePath("services");
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"background": "dark",
		"aria-labelledby": "our-expertise-heading",
		"class": "our-expertise",
		"data-astro-cid-otlakib3": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="expertise-header" data-reveal="up" data-astro-cid-otlakib3><p class="pill-dark text-primary m-0" data-astro-cid-otlakib3>OUR EXPERTISE</p><h2 id="our-expertise-heading" class="text-heading-dark dark-section-heading expertise-heading m-0" data-astro-cid-otlakib3>Different disciplines. A joined-up view.</h2><p class="expertise-intro m-0" data-astro-cid-otlakib3>From the first impression to the next interaction, our capabilities are designed to work together.</p></div><div class="expertise-grid" data-reveal-group data-astro-cid-otlakib3>${expertiseServices.map((service) => renderTemplate`<div data-reveal="up" data-astro-cid-otlakib3>${renderComponent($$result, "ServiceCard", $$ServiceCard, {
		"title": service.title,
		"icon": service.icon,
		"description": service.description,
		"features": service.features,
		"cta": service.cta,
		"data-astro-cid-otlakib3": true
	})}</div>`)}</div><p class="expertise-footer m-0" data-astro-cid-otlakib3>One conversation. A shared direction. The right expertise for your next step.</p><div class="expertise-cta" data-astro-cid-otlakib3>${renderComponent($$result, "Button", $$Button, {
		"href": servicesHref,
		"class": "!w-[220px] max-sm:!w-full",
		"data-astro-cid-otlakib3": true
	}, { "default": ($$result) => renderTemplate`View all Services` })}</div>` })}`;
}, "C:/Xoomplus/src/components/OurExpertise.astro", void 0);
//#endregion
//#region src/data/how-we-work.ts
var defaultHowWeWork = {
	pill: "How we work together",
	titleLines: ["Good ideas don't happen in isolation."],
	introLines: [
		"Our approach to collaboration is simple: bring different perspectives",
		"into the room, respect the craft and keep the business goal in view.",
		"The work gets stronger when everyone can contribute."
	],
	images: [{
		src: "/images/how-we-work-1.webp",
		width: 1020,
		height: 320,
		alt: "Team members sketching ideas on paper at a wooden table",
		wide: true
	}, {
		src: "/images/how-we-work-2.webp",
		width: 600,
		height: 320,
		alt: "A hand sketching a wireframe in a notebook beside a laptop",
		wide: false
	}],
	cards: [
		{
			title: "Ideas are shared early.",
			text: "We make space for questions, constructive feedback and perspectives from every discipline."
		},
		{
			title: "The handover is a conversation.",
			text: "Design, development and marketing stay connected rather than working in separate lanes."
		},
		{
			title: "Learning is part of the work.",
			text: "We review, reflect and stay open to a better way of solving the next challenge."
		}
	]
};
//#endregion
//#region src/components/HowWeWork.astro
createAstro("https://xoomplus.co.uk");
var $$HowWeWork = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$HowWeWork;
	const { content = defaultHowWeWork, id = "how-we-work" } = Astro.props;
	const { pill, titleLines, introLines, images, cards } = content;
	const headingId = `${id}-heading`;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": id,
		"background": "light-gray",
		"aria-labelledby": headingId,
		"class": "hww-section",
		"data-astro-cid-2whukpv5": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="hww-header" data-reveal="up" data-astro-cid-2whukpv5><div class="hww-header__left" data-astro-cid-2whukpv5><p class="pill-light m-0" data-astro-cid-2whukpv5>${pill}</p><h2${addAttribute(headingId, "id")} class="hww-heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-2whukpv5>${titleLines.length > 1 ? titleLines.map((line) => renderTemplate`<span class="hww-heading__line" data-astro-cid-2whukpv5>${line}</span>`) : titleLines[0]}</h2></div><p class="hww-intro m-0" data-astro-cid-2whukpv5>${introLines[0]}<br class="hww-intro__break" data-astro-cid-2whukpv5>${introLines[1]}<br class="hww-intro__break" data-astro-cid-2whukpv5>${introLines[2]}</p></div><div class="hww-images" data-astro-cid-2whukpv5>${images.map((image) => renderTemplate`<div${addAttribute(["hww-images__frame", image.wide && "hww-images__frame--wide"], "class:list")} data-reveal="fade" data-astro-cid-2whukpv5><img class="hww-images__img"${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")}${addAttribute(image.width, "width")}${addAttribute(image.height, "height")} loading="lazy" decoding="async" data-astro-cid-2whukpv5></div>`)}</div><ul class="hww-columns m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-2whukpv5>${cards.map((card) => renderTemplate`<li class="hww-column" data-reveal="up" data-astro-cid-2whukpv5><article class="hww-card card-hover" data-astro-cid-2whukpv5><h3 class="hww-card__title m-0" data-astro-cid-2whukpv5>${card.title}</h3><p class="hww-card__text m-0" data-astro-cid-2whukpv5>${card.text}</p></article></li>`)}</ul>` })}`;
}, "C:/Xoomplus/src/components/HowWeWork.astro", void 0);
//#endregion
//#region src/components/WhatToExpect.astro
var $$WhatToExpect = createComponent(($$result, $$props, $$slots) => {
	const items = [
		{
			title: "A plan you can understand",
			text: "Clear priorities, a practical scope and an honest conversation about the next step."
		},
		{
			title: "A conversation that stays open",
			text: "Space for your questions, regular updates and decisions explained in context."
		},
		{
			title: "A focus that stays on your business",
			text: "Recommendations shaped around your audience, your needs and where you want to go."
		}
	];
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "expect-heading",
		"data-astro-cid-ehhfuuq2": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="expect" data-astro-cid-ehhfuuq2><div class="expect__left" data-reveal="up" data-astro-cid-ehhfuuq2><p class="pill-light m-0" data-astro-cid-ehhfuuq2>What you can expect</p><h2 id="expect-heading" class="expect__heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-ehhfuuq2>A digital partner. Not just a delivery team.</h2><p class="expect__intro text-on-light m-0" data-astro-cid-ehhfuuq2>The best partnerships make the work feel clearer. We aim to give you the context, confidence and collaboration to move forward with purpose.</p></div><ul class="expect__list m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-ehhfuuq2>${items.map((item) => renderTemplate`<li class="expect__item" data-reveal="up" data-astro-cid-ehhfuuq2><span class="expect__check" aria-hidden="true" data-astro-cid-ehhfuuq2><svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ehhfuuq2><circle cx="9" cy="9" r="9" fill="#FFA800" data-astro-cid-ehhfuuq2></circle><path d="M5.25 9.25L7.75 11.75L12.75 6.5" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ehhfuuq2></path></svg></span><div class="expect__item-body" data-astro-cid-ehhfuuq2><h3 class="expect__item-title m-0" data-astro-cid-ehhfuuq2>${item.title}</h3><p class="expect__item-text m-0" data-astro-cid-ehhfuuq2>${item.text}</p></div></li>`)}</ul></div>` })}`;
}, "C:/Xoomplus/src/components/WhatToExpect.astro", void 0);
//#endregion
//#region src/components/ui/accordion.tsx
function Accordion$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Root, {
		"data-slot": "accordion",
		className: cn("flex w-full flex-col", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Item, {
		"data-slot": "accordion-item",
		className: cn(className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Header, {
		className: "flex",
		children: /* @__PURE__ */ jsx(Accordion.Trigger, {
			"data-slot": "accordion-trigger",
			className: cn("group relative flex flex-1 items-center justify-between text-left outline-none transition-none hover:no-underline", className),
			...props,
			children
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ jsx(Accordion.Content, {
		"data-slot": "accordion-content",
		className: "overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up duration-300 ease-[ease]",
		...props,
		children: /* @__PURE__ */ jsx("div", {
			className: cn(className),
			children
		})
	});
}
//#endregion
//#region src/components/FAQAccordion.tsx
function ToggleIcon() {
	return /* @__PURE__ */ jsxs("span", {
		className: "relative flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,168,0,0.3)] transition-colors duration-[250ms] ease-in-out group-data-[state=open]:bg-[#FFA800]",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("svg", {
			className: "absolute size-3 group-data-[state=open]:hidden",
			viewBox: "0 0 12 12",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", {
				d: "M6 2.5V9.5M2.5 6H9.5",
				stroke: "white",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			})
		}), /* @__PURE__ */ jsx("svg", {
			className: "absolute size-3 hidden group-data-[state=open]:block",
			viewBox: "0 0 12 12",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsx("path", {
				d: "M2.5 6H9.5",
				stroke: "white",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			})
		})]
	});
}
function FAQAccordion({ items, defaultOpen = 0 }) {
	const defaultValue = defaultOpen === null || defaultOpen === void 0 ? void 0 : items[defaultOpen]?.id;
	return /* @__PURE__ */ jsx(Accordion$1, {
		type: "single",
		collapsible: true,
		defaultValue,
		className: "flex w-full flex-col gap-2.5",
		children: items.map((item) => /* @__PURE__ */ jsxs(AccordionItem, {
			value: item.id,
			className: "overflow-hidden rounded-lg border border-solid border-[#E9E9E7] bg-white transition-[background-color] duration-[250ms] ease-in-out data-[state=closed]:bg-white data-[state=open]:bg-[#F7F7F5] max-sm:max-w-full [@media(hover:hover)]:data-[state=closed]:hover:border-[#DEDEDC] [@media(hover:hover)]:data-[state=closed]:hover:bg-[#FCFCFB]",
			children: [/* @__PURE__ */ jsxs(AccordionTrigger, {
				className: "text-h4 w-full gap-4 p-[clamp(1rem,0.8rem+1vw,1.625rem)] text-left font-[family-name:var(--font-inter)] text-primary-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#FFA800]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1 pr-2",
					children: item.question
				}), /* @__PURE__ */ jsx(ToggleIcon, {})]
			}), /* @__PURE__ */ jsx(AccordionContent, {
				className: "faq-answer text-small px-[clamp(1rem,0.8rem+1vw,1.625rem)] pb-[clamp(1rem,0.8rem+1vw,1.625rem)] pt-0 font-[family-name:var(--font-inter)] text-[#555555]",
				children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: item.answer } })
			})]
		}, item.id))
	});
}
//#endregion
//#region src/data/faqs.ts
var FAQ_DEFAULTS = {
	pill: "FAQ",
	heading: "Frequently Asked Questions",
	text: "Hear directly from the businesses we work with about their experience working with Xoomplus."
};
/** Same copy on home / about / our-services for now — edit each page’s set in `faqs` when ready. */
var cloneFaqItems = (items) => items.map((item) => ({ ...item }));
var generalFaqItems = [
	{
		question: "Are these examples of industries you have worked in?",
		answer: "This page describes possible uses of XoomPlus's services across the listed sectors. It is not a portfolio of sector projects or a claim of specialist experience. We would discuss suitability and any relevant experience in your first conversation."
	},
	{
		question: "What if my industry is not listed?",
		answer: "We work with businesses across many sectors. If yours is not listed, get in touch — we will tell you honestly whether we are a good fit and how we can help."
	},
	{
		question: "Do I need a whole new website?",
		answer: "Not always. Some clients need a full rebuild; others only need targeted improvements to pages, SEO, or lead generation. We recommend what matches your goals and budget."
	},
	{
		question: "Can I start with just one service?",
		answer: "Yes. Many clients begin with a single service such as SEO, Google Ads, or a website refresh, then expand once they see results."
	},
	{
		question: "How do you handle specialist or regulated content?",
		answer: "We follow your compliance requirements and work with your team or advisors on sensitive copy. Accuracy and approval processes come first in regulated industries."
	},
	{
		question: "What should I include in my enquiry?",
		answer: "A short overview of your business, your main goals, your current website or marketing setup, and any timeline or budget range helps us prepare a useful first conversation."
	}
];
var faqs = {
	home: { items: cloneFaqItems(generalFaqItems) },
	about: { items: cloneFaqItems(generalFaqItems) },
	contact: { items: [
		{
			question: "What happens after I submit the form?",
			answer: "We review your message and respond within one working day with next steps or a few clarifying questions."
		},
		{
			question: "Is there a cost for an initial conversation?",
			answer: "No. The first call is exploratory — there is no obligation to proceed."
		},
		{
			question: "What information should I include?",
			answer: "Your business, what you are trying to achieve, and any deadlines or constraints. Links to your current website or campaigns are helpful."
		},
		{
			question: "Do you offer on-site visits?",
			answer: "Yes, when useful — especially for local clients. Many projects run entirely online."
		}
	] },
	blogs: { items: [
		{
			question: "How often do you publish new articles?",
			answer: "We add posts when we have something useful to share — not on a fixed schedule. Subscribe or check back for updates."
		},
		{
			question: "Can I suggest a topic?",
			answer: "Yes. If there is a question your industry keeps asking, <a href=\"/contact\">get in touch</a> — we may turn it into a future post."
		},
		{
			question: "Who writes the content?",
			answer: "Articles are written by people on the Xoomplus team with hands-on experience in web, search and marketing."
		},
		{
			question: "May I reuse or quote your articles?",
			answer: "Please link to the original post and credit Xoomplus. For republishing, ask us first."
		}
	] },
	"case-studies": { items: [
		{
			question: "Are these live client projects?",
			answer: "The case studies on this page are draft directions and illustrative examples unless stated otherwise."
		},
		{
			question: "Can you share results or metrics?",
			answer: "When we publish verified client work, we share metrics with permission. Draft examples focus on approach, not performance claims."
		},
		{
			question: "Do you work in my industry?",
			answer: "We adapt our process to many sectors. Tell us about your business and we will be honest about fit and experience."
		},
		{
			question: "How do I start a similar project?",
			answer: "<a href=\"/contact\">Contact us</a> with your goals and constraints. We will outline a sensible first step."
		}
	] },
	"our-services": { items: cloneFaqItems(generalFaqItems) },
	industries: { items: cloneFaqItems(generalFaqItems) },
	seo: { items: cloneFaqItems(generalFaqItems) },
	"web-design-development": { items: cloneFaqItems(generalFaqItems) },
	"social-media-marketing": { items: cloneFaqItems(generalFaqItems) },
	"ppc-google-ads": { items: cloneFaqItems(generalFaqItems) },
	/** Shared default for nested child service pages — override per child via `ChildService.faq`. */
	"child-service": { items: cloneFaqItems(generalFaqItems) },
	pricing: {
		pill: "FAQ",
		heading: "Pricing questions, answered",
		text: "Clear answers about how our packages and ad hoc pricing work. Can't find what you need? Get in touch and we'll help.",
		items: [
			{
				question: "What is the difference between Packages and Ad Hoc?",
				answer: "Packages are ongoing monthly services built around a single discipline, such as SEO or social media. Ad hoc options are tiered one-off or project-based plans, such as website design and development. We can help you choose the right route."
			},
			{
				question: "Are your prices fixed?",
				answer: "The prices shown are starting points. The final cost depends on your goals, the scope of work and the level of support you need. We confirm everything in a clear proposal before work begins."
			},
			{
				question: "Is there a minimum contract length?",
				answer: "We will agree contract terms with you before you commit. Monthly services are scoped around your goals, and we are happy to talk through what suits your business."
			},
			{
				question: "What is included in each package?",
				answer: "Each package lists its main capabilities. If you need something that is not listed, or want a mix of services, we can build a tailored recommendation."
			},
			{
				question: "Can I combine different services?",
				answer: "Yes. Many businesses combine services such as SEO, social media and web design. We bring them into one plan so the work stays connected."
			},
			{
				question: "How do I get a custom quote?",
				answer: "Send us a few details using the form on this page, or get in touch directly. We will review your needs and come back with a tailored recommendation."
			}
		]
	}
};
function getFaqSet(page) {
	return faqs[page];
}
//#endregion
//#region src/components/FAQ.astro
createAstro("https://xoomplus.co.uk");
var $$FAQ = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FAQ;
	const { items: itemsProp, page, pill: pillProp, heading: headingProp, text: textProp, defaultOpen = 0, id = "faq", jsonLd = true } = Astro.props;
	const set = page ? getFaqSet(page) : void 0;
	const sourceItems = itemsProp?.length ? itemsProp : set?.items?.length ? set.items : [];
	if (sourceItems.length === 0) return;
	const pill = pillProp ?? set?.pill ?? FAQ_DEFAULTS.pill;
	const heading = headingProp ?? set?.heading ?? FAQ_DEFAULTS.heading;
	const text = textProp ?? set?.text ?? FAQ_DEFAULTS.text;
	const headingId = `${id}-heading`;
	const faqItems = sourceItems.map((item, index) => ({
		id: `${id}-item-${index}`,
		question: item.question,
		answer: item.answer
	}));
	function stripHtml(html) {
		return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
	}
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqItems.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: stripHtml(item.answer)
			}
		}))
	};
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": id,
		"aria-labelledby": headingId
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="mx-auto mb-12 max-w-[900px] text-center lg:mb-14" data-reveal="up"><p class="pill-light mb-5">${pill}</p><h2${addAttribute(headingId, "id")} class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black">${heading}</h2><p class="text-on-light mx-auto max-w-[860px]">${text}</p></div>${renderComponent($$result, "FAQAccordion", FAQAccordion, {
		"client:load": true,
		"items": faqItems,
		"defaultOpen": defaultOpen,
		"client:component-hydration": "load",
		"client:component-path": "C:/Xoomplus/src/components/FAQAccordion.tsx",
		"client:component-export": "default"
	})}` })}${jsonLd && renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(faqJsonLd))}<\/script>`}`;
}, "C:/Xoomplus/src/components/FAQ.astro", void 0);
//#endregion
//#region src/components/wp-pages/AboutPage.astro
var $$AboutPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="page-about flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "About us" })}${renderComponent($$result, "OurStory", $$OurStory, {})}${renderComponent($$result, "ExpertiseImpact", $$ExpertiseImpact, {})}${renderComponent($$result, "OurPurpose", $$OurPurpose, {})}${renderComponent($$result, "WhatGuidesUs", $$WhatGuidesUs, {})}${renderComponent($$result, "OurExpertise", $$OurExpertise, {})}${renderComponent($$result, "OurProcess", $$OurProcess, {})}${renderComponent($$result, "HowWeWork", $$HowWeWork, {})}${renderComponent($$result, "WhatToExpect", $$WhatToExpect, {})}${renderComponent($$result, "FAQ", $$FAQ, {
		"page": "about",
		"id": "about-faq"
	})}${renderComponent($$result, "ContactSection", $$ContactSection, {})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>`;
}, "C:/Xoomplus/src/components/wp-pages/AboutPage.astro", void 0);
//#endregion
//#region src/components/GlideSelect.jsx
var SIZES = {
	sm: {
		chip: 28,
		row: 26,
		font: 12
	},
	md: {
		chip: 32,
		row: 30,
		font: 13
	},
	lg: {
		chip: 44,
		row: 40,
		font: 14
	}
};
var PAD = 4;
var GAP = 1;
var MENU_GAP = 6;
var DEFAULT_OPTIONS = [
	"One",
	"Two",
	"Three"
];
var norm = (o) => typeof o === "string" ? {
	value: o,
	label: o
} : o;
var textOf = (it) => typeof it.label === "string" ? it.label : it.value;
var typeaheadIndex = (items, from, ch) => {
	const c = ch.toLowerCase();
	const n = items.length;
	for (let k = 1; k <= n; k++) {
		const i = (from + k) % n;
		if (textOf(items[i]).toLowerCase().startsWith(c)) return i;
	}
	return from;
};
function GlideSelect({ options = DEFAULT_OPTIONS, value, defaultValue, onChange, placeholder = "Select…", showTags = true, accentColor = "#f5f5f5", surfaceColor = "#27272a", highlightColor = "#3f3f46", textColor = "#f5f5f5", size = "md", radius = 10, menuWidth = 176, placement = "bottom", align = "left", popDuration = 180, glideDuration = 220, rememberPosition = true, disabled = false, ariaLabel = "Select", className = "", id: triggerId }) {
	const items = options.map(norm);
	const [inner, setInner] = useState(defaultValue ?? "");
	const current = value ?? inner;
	const selected = items.findIndex((it) => it.value === current);
	const [phase, setPhase] = useState("closed");
	const [active, setActive] = useState(null);
	const [side, setSide] = useState(placement);
	const rootRef = useRef(null);
	const triggerRef = useRef(null);
	const menuRef = useRef(null);
	const pillRef = useRef(null);
	const instant = useRef(false);
	const closeTimer = useRef(void 0);
	const scrub = useRef(null);
	const id = useId();
	const S = SIZES[size] ?? SIZES.md;
	const step = S.row + GAP;
	const popOut = Math.round(popDuration * 2 / 3);
	useLayoutEffect(() => {
		if (phase !== "open") return;
		const el = menuRef.current;
		const root = rootRef.current;
		if (!el || !root) return;
		const r = root.getBoundingClientRect();
		const need = el.offsetHeight + MENU_GAP;
		setSide(placement === "bottom" && r.bottom + need > window.innerHeight ? "top" : placement === "top" && r.top - need < 0 ? "bottom" : placement);
		el.style.transitionDuration = instant.current ? "0ms" : "";
		el.dataset.state = "closed";
		el.offsetHeight;
		el.dataset.state = "open";
		const p = pillRef.current;
		if (p) {
			p.style.transition = "none";
			p.style.transform = `translateY(${Math.max(0, selected) * step}px)`;
			p.style.opacity = "0";
			p.offsetHeight;
			p.style.transition = "";
		}
	}, [phase]);
	useLayoutEffect(() => {
		const p = pillRef.current;
		if (!p || phase !== "open") return;
		if (active === null) {
			p.style.opacity = "0";
			return;
		}
		const jump = instant.current || p.style.opacity !== "1";
		p.style.transitionDuration = jump ? "0ms, 150ms" : "";
		p.style.transform = `translateY(${active * step}px)`;
		p.style.opacity = "1";
		instant.current = false;
	}, [
		active,
		phase,
		step
	]);
	const open = (viaKey) => {
		if (disabled) return;
		clearTimeout(closeTimer.current);
		instant.current = true;
		setActive(selected >= 0 ? selected : viaKey ? 0 : null);
		setPhase("open");
	};
	const close = (mode) => {
		setActive(null);
		clearTimeout(closeTimer.current);
		const el = menuRef.current;
		if (mode === "instant" || !el) {
			setPhase("closed");
			return;
		}
		el.style.transitionDuration = "";
		el.dataset.state = "closed";
		setPhase("closing");
		closeTimer.current = setTimeout(() => setPhase("closed"), popOut + 20);
	};
	const pick = (i, viaKey) => {
		const it = items[i];
		if (!it) {
			close("instant");
			return;
		}
		if (it.value !== current) {
			if (value === void 0) setInner(it.value);
			onChange?.(it.value, it);
			if (!viaKey && rootRef.current) rootRef.current.dataset.swap = "";
		}
		close("instant");
		triggerRef.current?.focus({ preventScroll: true });
	};
	const onTriggerKey = (e) => {
		const k = e.key;
		const n = items.length;
		const cur = active ?? Math.max(0, selected);
		if (phase !== "open") {
			if (k === "Enter" || k === " " || k === "ArrowDown" || k === "ArrowUp") {
				e.preventDefault();
				open(true);
			}
			return;
		}
		const go = (i) => {
			e.preventDefault();
			instant.current = true;
			setActive(Math.min(n - 1, Math.max(0, i)));
		};
		if (k === "ArrowDown" || k === "ArrowUp") go(active === null ? cur : cur + (k === "ArrowDown" ? 1 : -1));
		else if (k === "Home" || k === "End") go(k === "Home" ? 0 : n - 1);
		else if (k === "Enter" || k === " ") {
			e.preventDefault();
			pick(cur, true);
		} else if (k === "Escape" || k === "Tab") {
			if (k === "Escape") e.preventDefault();
			close("instant");
		} else if (k.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) go(typeaheadIndex(items, cur, k));
	};
	useEffect(() => {
		if (phase === "closed") return void 0;
		const onDown = (e) => {
			if (rootRef.current && !rootRef.current.contains(e.target)) close("pop");
		};
		document.addEventListener("pointerdown", onDown, true);
		return () => document.removeEventListener("pointerdown", onDown, true);
	}, [phase]);
	useEffect(() => {
		if (disabled && phase !== "closed") close("instant");
	}, [disabled]);
	useEffect(() => () => clearTimeout(closeTimer.current), []);
	const rowAt = (y) => {
		const s = scrub.current;
		if (!s) return null;
		const i = Math.floor((y - s.top - PAD) / step);
		return i >= 0 && i < items.length ? i : null;
	};
	const onListDown = (e) => {
		if (scrub.current) return;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {}
		scrub.current = {
			id: e.pointerId,
			top: e.currentTarget.getBoundingClientRect().top
		};
		instant.current = true;
		setActive(rowAt(e.clientY));
	};
	const onListMove = (e) => {
		if (!scrub.current || scrub.current.id !== e.pointerId) return;
		const i = rowAt(e.clientY);
		if (i !== active) setActive(i);
	};
	const onListUp = (e) => {
		if (!scrub.current || scrub.current.id !== e.pointerId) return;
		const i = e.type === "pointerup" ? rowAt(e.clientY) : null;
		scrub.current = null;
		if (i !== null) pick(i, false);
		else if (!rememberPosition) setActive(null);
	};
	const onListOver = (e) => {
		if (e.pointerType === "touch" || scrub.current) return;
		const row = e.target.closest("[data-index]");
		if (!row) return;
		const i = Number(row.dataset.index);
		if (i !== active) setActive(i);
	};
	const origin = `${side === "bottom" ? "top" : "bottom"} ${align}`;
	return /* @__PURE__ */ jsxs("div", {
		ref: rootRef,
		className: `glide-select${className ? ` ${className}` : ""}`,
		"data-size": size,
		"data-disabled": disabled ? "" : void 0,
		style: {
			"--gs-accent": accentColor,
			"--gs-surface": surfaceColor,
			"--gs-highlight": highlightColor,
			"--gs-text": textColor,
			"--gs-radius": `${radius}px`,
			"--gs-inner-radius": `${Math.max(3, radius - 4)}px`,
			"--gs-chip": `${S.chip}px`,
			"--gs-row": `${S.row}px`,
			"--gs-font": `${S.font}px`,
			"--gs-menu-w": `${menuWidth}px`,
			"--gs-pop": `${popDuration}ms`,
			"--gs-pop-out": `${popOut}ms`,
			"--gs-glide": `${glideDuration}ms`,
			"--gs-origin": origin
		},
		onAnimationEnd: (e) => {
			if (e.animationName === "gs-swap" && rootRef.current) delete rootRef.current.dataset.swap;
		},
		children: [/* @__PURE__ */ jsxs("button", {
			ref: triggerRef,
			type: "button",
			id: triggerId,
			role: "combobox",
			"aria-haspopup": "listbox",
			"aria-expanded": phase === "open",
			"aria-controls": `${id}-list`,
			"aria-activedescendant": active !== null ? `${id}-${active}` : void 0,
			"aria-label": ariaLabel,
			disabled,
			className: "glide-select__trigger",
			onPointerDown: (e) => {
				if (e.button !== 0 || disabled) return;
				e.currentTarget.focus({ preventScroll: true });
				if (phase === "open") close("pop");
				else open(false);
			},
			onKeyDown: onTriggerKey,
			children: [/* @__PURE__ */ jsx("span", {
				className: "glide-select__label",
				"data-empty": selected < 0 ? "" : void 0,
				children: selected >= 0 ? items[selected].label : placeholder
			}, current), /* @__PURE__ */ jsx("span", {
				className: "glide-select__chevron",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx(HugeiconsIcon, {
					icon: ArrowDown01Icon,
					size: 12,
					strokeWidth: 2.5
				})
			})]
		}), phase !== "closed" ? /* @__PURE__ */ jsx("div", {
			ref: menuRef,
			className: "glide-select__menu",
			"data-state": "open",
			"data-side": side,
			"data-align": align,
			children: /* @__PURE__ */ jsxs("div", {
				id: `${id}-list`,
				role: "listbox",
				"aria-label": ariaLabel,
				className: "glide-select__list",
				"data-live": active !== null ? "" : void 0,
				onPointerOver: onListOver,
				onPointerLeave: () => {
					if (!scrub.current && !rememberPosition) setActive(null);
				},
				onPointerDown: onListDown,
				onPointerMove: onListMove,
				onPointerUp: onListUp,
				onPointerCancel: onListUp,
				onLostPointerCapture: onListUp,
				children: [/* @__PURE__ */ jsx("span", {
					ref: pillRef,
					className: "glide-select__pill",
					"aria-hidden": "true"
				}), items.map((it, i) => /* @__PURE__ */ jsxs("div", {
					id: `${id}-${i}`,
					role: "option",
					"aria-selected": i === selected,
					"data-index": i,
					className: "glide-select__option",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "glide-select__name",
							children: it.label
						}),
						showTags && it.tag ? /* @__PURE__ */ jsx("span", {
							className: "glide-select__tag",
							children: it.tag
						}) : null,
						/* @__PURE__ */ jsx("span", {
							className: "glide-select__check",
							"data-on": i === selected ? "" : void 0,
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx(HugeiconsIcon, {
								icon: Tick02Icon,
								size: 13,
								strokeWidth: 2.5
							})
						})
					]
				}, it.value))]
			})
		}) : null]
	});
}
//#endregion
//#region src/components/FormSelect.tsx
function normalizeOptions(options) {
	return options.map((option) => typeof option === "string" ? {
		value: option,
		label: option
	} : option);
}
function FormSelect({ name, options, placeholder, id, ariaLabel, defaultValue = "" }) {
	const items = useMemo(() => normalizeOptions(options), [options]);
	const [value, setValue] = useState(defaultValue);
	return /* @__PURE__ */ jsxs("div", {
		className: "form-select",
		children: [/* @__PURE__ */ jsx(GlideSelect, {
			id,
			options: items,
			value,
			placeholder,
			ariaLabel,
			showTags: false,
			size: "lg",
			placement: "bottom",
			align: "left",
			popDuration: 180,
			glideDuration: 220,
			rememberPosition: true,
			radius: 12,
			menuWidth: 400,
			surfaceColor: "#FFFFFF",
			highlightColor: "#F7F7F5",
			textColor: "#1A1A1A",
			accentColor: "#FFA800",
			onChange: (next) => setValue(next ?? "")
		}), /* @__PURE__ */ jsx("input", {
			type: "hidden",
			name,
			value,
			disabled: value === ""
		})]
	});
}
//#endregion
//#region src/components/ContactForm.astro
createAstro("https://xoomplus.co.uk");
var $$ContactForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ContactForm;
	const { idPrefix = "contact", align = "left", source = "contact", heading = "Tell us about your project", text = "A few details help us understand the right next step. * Required fields", headingLevel = 3 } = Astro.props;
	const HeadingTag = headingLevel === 2 ? "h2" : "h3";
	const serviceOptions = [
		{
			label: "SEO",
			value: "seo"
		},
		{
			label: "Web Design & Development",
			value: "web-design-development"
		},
		{
			label: "Social Media Marketing",
			value: "social-media-marketing"
		},
		{
			label: "PPC & Google Ads",
			value: "ppc-google-ads"
		},
		{
			label: "Not sure yet",
			value: "not-sure"
		}
	];
	const budgetOptions = [
		"Under £1,000",
		"£1,000 - £3,000",
		"£3,000 - £5,000",
		"£5,000 - £10,000",
		"£10,000+",
		"Not sure yet"
	];
	const timelineOptions = [
		"As soon as possible",
		"Within 1 month",
		"1-3 months",
		"3+ months",
		"Just exploring"
	];
	const ids = {
		form: `${idPrefix}-form`,
		hp: `${idPrefix}-hp-website`,
		name: `${idPrefix}-name`,
		email: `${idPrefix}-email`,
		company: `${idPrefix}-company`,
		website: `${idPrefix}-website`,
		services: `${idPrefix}-services`,
		servicesHelp: `${idPrefix}-services-help`,
		budget: `${idPrefix}-budget`,
		timeline: `${idPrefix}-timeline`,
		details: `${idPrefix}-details`,
		detailsHelp: `${idPrefix}-details-help`,
		submit: `${idPrefix}-submit`,
		status: `${idPrefix}-status`
	};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"contact-card",
		"enquiry__card",
		align === "center" && "enquiry__card--align-center"
	], "class:list")} data-astro-cid-vekgkm42><div data-reveal="up" data-astro-cid-vekgkm42>${renderComponent($$result, "HeadingTag", HeadingTag, {
		"class": "contact-card__title m-0",
		"data-astro-cid-vekgkm42": true
	}, { "default": ($$result) => renderTemplate`${heading}` })}<p class="contact-card__subtitle enquiry__card-subtitle m-0" data-astro-cid-vekgkm42>${text}</p></div><form class="contact-form"${addAttribute(ids.form, "id")} data-contact-form data-enquiry-form novalidate data-astro-cid-vekgkm42><input type="hidden" name="source"${addAttribute(source, "value")} data-astro-cid-vekgkm42><div class="contact-honeypot" aria-hidden="true" data-astro-cid-vekgkm42><label${addAttribute(ids.hp, "for")} data-astro-cid-vekgkm42>Website</label><input type="text"${addAttribute(ids.hp, "id")} name="hp_website" tabindex="-1" autocomplete="off" data-astro-cid-vekgkm42></div><div class="enquiry__row" data-astro-cid-vekgkm42><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.name, "for")} data-astro-cid-vekgkm42>Your name <span aria-hidden="true" data-astro-cid-vekgkm42>*</span></label><input type="text"${addAttribute(ids.name, "id")} name="name" placeholder="Full name" autocomplete="name" required data-astro-cid-vekgkm42></div><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.email, "for")} data-astro-cid-vekgkm42>Email address <span aria-hidden="true" data-astro-cid-vekgkm42>*</span></label><input type="email"${addAttribute(ids.email, "id")} name="email" placeholder="Your email address" autocomplete="email" required data-astro-cid-vekgkm42></div></div><div class="enquiry__row" data-astro-cid-vekgkm42><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.company, "for")} data-astro-cid-vekgkm42>Company <span class="contact-field__optional" data-astro-cid-vekgkm42>(optional)</span></label><input type="text"${addAttribute(ids.company, "id")} name="company" placeholder="Your business name" autocomplete="organization" data-astro-cid-vekgkm42></div><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.website, "for")} data-astro-cid-vekgkm42>Website <span class="contact-field__optional" data-astro-cid-vekgkm42>(optional)</span></label><input type="url"${addAttribute(ids.website, "id")} name="website" placeholder="Your website URL" autocomplete="url" data-astro-cid-vekgkm42></div></div><fieldset class="enquiry-services contact-field"${addAttribute(ids.services, "id")}${addAttribute(ids.servicesHelp, "aria-describedby")} data-astro-cid-vekgkm42><legend data-astro-cid-vekgkm42>What can we help with?</legend><p class="enquiry-services__help m-0"${addAttribute(ids.servicesHelp, "id")} data-astro-cid-vekgkm42>Select all that apply. It's okay if you're not sure yet.</p><div class="enquiry-chips" data-astro-cid-vekgkm42>${serviceOptions.map((option) => renderTemplate`<label class="enquiry-chip" data-astro-cid-vekgkm42><input type="checkbox" name="services"${addAttribute(option.value, "value")} data-astro-cid-vekgkm42><span class="enquiry-chip__text" data-astro-cid-vekgkm42>${option.label}</span></label>`)}</div></fieldset><div class="enquiry__row" data-astro-cid-vekgkm42><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.budget, "for")} data-astro-cid-vekgkm42>Budget <span class="contact-field__optional" data-astro-cid-vekgkm42>(optional)</span></label>${renderComponent($$result, "FormSelect", FormSelect, {
		"client:load": true,
		"id": ids.budget,
		"name": "budget",
		"placeholder": "Select a budget range",
		"ariaLabel": "Budget (optional)",
		"options": [...budgetOptions],
		"data-astro-cid-vekgkm42": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Xoomplus/src/components/FormSelect.tsx",
		"client:component-export": "default"
	})}<noscript><select class="form-select__noscript" name="budget"${addAttribute(`${ids.budget}-noscript`, "id")} data-astro-cid-vekgkm42><option value="" disabled selected data-astro-cid-vekgkm42>Select a budget range</option>${budgetOptions.map((option) => renderTemplate`<option${addAttribute(option, "value")} data-astro-cid-vekgkm42>${option}</option>`)}</select></noscript></div><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.timeline, "for")} data-astro-cid-vekgkm42>Ideal timeline <span class="contact-field__optional" data-astro-cid-vekgkm42>(optional)</span></label>${renderComponent($$result, "FormSelect", FormSelect, {
		"client:load": true,
		"id": ids.timeline,
		"name": "timeline",
		"placeholder": "When would you like to start?",
		"ariaLabel": "Ideal timeline (optional)",
		"options": [...timelineOptions],
		"data-astro-cid-vekgkm42": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Xoomplus/src/components/FormSelect.tsx",
		"client:component-export": "default"
	})}<noscript><select class="form-select__noscript" name="timeline"${addAttribute(`${ids.timeline}-noscript`, "id")} data-astro-cid-vekgkm42><option value="" disabled selected data-astro-cid-vekgkm42>When would you like to start?</option>${timelineOptions.map((option) => renderTemplate`<option${addAttribute(option, "value")} data-astro-cid-vekgkm42>${option}</option>`)}</select></noscript></div></div><div class="contact-field" data-astro-cid-vekgkm42><label${addAttribute(ids.details, "for")} data-astro-cid-vekgkm42>Project details <span aria-hidden="true" data-astro-cid-vekgkm42>*</span></label><textarea${addAttribute(ids.details, "id")} name="details" rows="5" placeholder="What are you working on? Share your goals, the challenges you're facing and anything else we should know." required${addAttribute(ids.detailsHelp, "aria-describedby")} data-astro-cid-vekgkm42></textarea><p class="enquiry-field-help m-0"${addAttribute(ids.detailsHelp, "id")} data-astro-cid-vekgkm42>No polished brief needed. A few sentences is a good start.</p></div><label class="enquiry-consent" data-astro-cid-vekgkm42><input type="checkbox" name="consent" value="yes" required data-astro-cid-vekgkm42><span class="enquiry-consent__text" data-astro-cid-vekgkm42>I agree to XoomPlus using my details to respond to this enquiry.<a class="enquiry-consent__link" href="/privacy-policy" data-astro-cid-vekgkm42>Privacy Policy</a></span></label><div class="enquiry__actions" data-astro-cid-vekgkm42>${renderComponent($$result, "Button", $$Button, {
		"type": "submit",
		"id": ids.submit,
		"data-astro-cid-vekgkm42": true
	}, { "default": ($$result) => renderTemplate`
				Send enquiry
				<svg class="contact-submit__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-vekgkm42><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vekgkm42></path></svg>` })}</div><p class="contact-status"${addAttribute(ids.status, "id")} role="status" aria-live="polite" hidden data-astro-cid-vekgkm42></p></form></div>${renderScript($$result, "C:/Xoomplus/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Xoomplus/src/components/ContactForm.astro", void 0);
//#endregion
//#region src/components/ContactEnquiry.astro
var $$ContactEnquiry = createComponent(($$result, $$props, $$slots) => {
	const emailIcon = "/icons/contact-email.svg";
	const phoneIcon = "/icons/contact-phone.svg";
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "contact-enquiry-heading",
		"data-astro-cid-3ml2fg6f": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="enquiry" data-astro-cid-3ml2fg6f><div class="enquiry__info" data-reveal="up" data-astro-cid-3ml2fg6f><p class="pill-light m-0" data-astro-cid-3ml2fg6f>Let's start</p><h2 id="contact-enquiry-heading" class="enquiry__heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-3ml2fg6f>Your ambition.<br data-astro-cid-3ml2fg6f>Our next conversation.</h2><p class="enquiry__intro text-on-light m-0" data-astro-cid-3ml2fg6f>A new website, a stronger search presence or a more connected marketing plan. Share a little about your business and where you want to go.</p><div class="enquiry-glass" data-astro-cid-3ml2fg6f><h3 class="enquiry-glass__title m-0" data-astro-cid-3ml2fg6f>Prefer another way?</h3><div class="enquiry-glass__block" data-astro-cid-3ml2fg6f><div class="enquiry-glass__row" data-astro-cid-3ml2fg6f><img${addAttribute(emailIcon, "src")} alt="" aria-hidden="true" width="20" height="20" decoding="async" data-astro-cid-3ml2fg6f><p class="enquiry-glass__block-title m-0" data-astro-cid-3ml2fg6f>Send us an email</p></div><p class="enquiry-glass__text m-0" data-astro-cid-3ml2fg6f>For a project, a partnership or a general question, start with a short introduction.</p><a class="enquiry-glass__link" href="mailto:info@xoomplus.co.uk" data-astro-cid-3ml2fg6f>info@xoomplus.co.uk</a></div><hr class="enquiry-glass__divider" data-astro-cid-3ml2fg6f><div class="enquiry-glass__block" data-astro-cid-3ml2fg6f><div class="enquiry-glass__row" data-astro-cid-3ml2fg6f><img${addAttribute(phoneIcon, "src")} alt="" aria-hidden="true" width="20" height="20" decoding="async" data-astro-cid-3ml2fg6f><p class="enquiry-glass__block-title m-0" data-astro-cid-3ml2fg6f>Talk it through</p></div><p class="enquiry-glass__text m-0" data-astro-cid-3ml2fg6f>Prefer a conversation? Let us know what you'd like to discuss.</p><a class="enquiry-glass__link" href="tel:+443300104786" data-astro-cid-3ml2fg6f>+44 330 010 4786</a></div></div><div class="enquiry__address" data-astro-cid-3ml2fg6f><h3 class="enquiry__address-title m-0" data-astro-cid-3ml2fg6f>Find us in Blackburn</h3><p class="enquiry__address-text m-0" data-astro-cid-3ml2fg6f>UK: 33 King St, Blackburn BB2 2DH, United Kingdom</p></div></div>${renderComponent($$result, "ContactForm", $$ContactForm, {
		"idPrefix": "enquiry",
		"source": "contact",
		"headingLevel": 3,
		"align": "left",
		"data-astro-cid-3ml2fg6f": true
	})}</div>` })}`;
}, "C:/Xoomplus/src/components/ContactEnquiry.astro", void 0);
//#endregion
//#region src/components/WhatHappensNext.astro
var $$WhatHappensNext = createComponent(($$result, $$props, $$slots) => {
	const cards = [
		{
			number: "01",
			icon: "/icons/contact-message-circle.svg",
			title: "We understand the challenge",
			text: "We read through your enquiry and consider your goals, your current situation and the expertise that could help."
		},
		{
			number: "02",
			icon: "/icons/contact-message-square.svg",
			title: "We start a conversation",
			text: "We get in touch to ask questions, explore the brief and understand what a useful partnership would look like."
		},
		{
			number: "03",
			icon: "/icons/contact-arrow-up.svg",
			title: "We shape the next step",
			text: "Together, we discuss the right direction, the scope and the practicalities before any project moves forward."
		}
	];
	return renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"background": "dark",
		"aria-labelledby": "what-next-heading",
		"class": "what-happens-next section-glow-top-left",
		"data-astro-cid-lhb5hchy": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="what-next-header" data-reveal="up" data-astro-cid-lhb5hchy><p class="pill-dark text-primary m-0" data-astro-cid-lhb5hchy>What happens next</p><h2 id="what-next-heading" class="text-heading-dark dark-section-heading what-next-heading m-0" data-astro-cid-lhb5hchy>A clear path from hello.</h2><p class="dark-section-intro what-next-intro m-0" data-astro-cid-lhb5hchy>Thoughtful questions. Shared direction. No pressure to have every answer.</p></div><ul class="what-next-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-lhb5hchy>${cards.map((card) => renderTemplate`<li data-reveal="up" data-astro-cid-lhb5hchy><article class="service-card what-next-card" data-astro-cid-lhb5hchy><div class="what-next-card__top" data-astro-cid-lhb5hchy><span class="what-next-card__number" data-astro-cid-lhb5hchy>${card.number}</span><img class="what-next-card__icon"${addAttribute(card.icon, "src")} alt="" aria-hidden="true" width="20" height="20" decoding="async" data-astro-cid-lhb5hchy></div><h3 class="what-next-card__title m-0" data-astro-cid-lhb5hchy>${card.title}</h3><p class="dark-glass-card__text what-next-card__text m-0" data-astro-cid-lhb5hchy>${card.text}</p></article></li>`)}</ul>` })}${renderComponent($$result, "LocationMap", $$LocationMap, {
		"class": "what-next-map",
		"radius": 0,
		"data-astro-cid-lhb5hchy": true
	})}` })}`;
}, "C:/Xoomplus/src/components/WhatHappensNext.astro", void 0);
//#endregion
//#region src/components/wp-pages/ContactPage.astro
var $$ContactPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="page-contact flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "Contact us" })}${renderComponent($$result, "ContactEnquiry", $$ContactEnquiry, {})}${renderComponent($$result, "WhatHappensNext", $$WhatHappensNext, {})}</main>`;
}, "C:/Xoomplus/src/components/wp-pages/ContactPage.astro", void 0);
//#endregion
//#region src/data/industry-intent.ts
var industryIntent = {
	id: "local-intent",
	pill: "Local intent. Considered decisions.",
	title: "From a nearby search to a worthwhile conversation",
	text: "For trade and project-led businesses, useful digital work could connect the area you serve, the work you do and the enquiry you want.",
	cards: [{
		eyebrow: "Home & Trade Services",
		title: "Be found when the need is local.",
		items: [
			{
				title: "Show up for relevant areas",
				text: "Local SEO + On-Page SEO"
			},
			{
				title: "Explain the job and the next step",
				text: "Landing Page Design + UI/UX Design"
			},
			{
				title: "Connect a search to a quote",
				text: "PPC & Google Ads + landing page alignment"
			}
		]
	}, {
		eyebrow: "Property & Construction",
		title: "Make the work easier to understand.",
		items: [
			{
				title: "Show projects in context",
				text: "Web Design & Development"
			},
			{
				title: "Answer practical project questions",
				text: "SEO Content Marketing + On-Page SEO"
			},
			{
				title: "Focus enquiries on the right work",
				text: "PPC & Google Ads + audience research"
			}
		]
	}]
};
//#endregion
//#region src/components/IndustryIntent.astro
var $$IndustryIntent = createComponent(($$result, $$props, $$slots) => {
	const section = industryIntent;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"background": "dark",
		"aria-labelledby": "local-intent-heading",
		"class": "industry-intent section-glow-top-left",
		"data-astro-cid-hos5ot3v": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="industry-intent__header" data-reveal="up" data-astro-cid-hos5ot3v><div class="industry-intent__heading-group" data-astro-cid-hos5ot3v><p class="pill-dark text-primary m-0" data-astro-cid-hos5ot3v>${section.pill}</p><h2 id="local-intent-heading" class="text-heading-dark dark-section-heading industry-intent__title m-0" data-astro-cid-hos5ot3v>${section.title}</h2></div><p class="industry-intent__intro m-0" data-astro-cid-hos5ot3v>${section.text}</p></div><div class="industry-intent__grid" data-reveal-group data-astro-cid-hos5ot3v>${section.cards.map((card) => renderTemplate`<article class="service-card industry-intent__card" data-reveal="up" data-astro-cid-hos5ot3v><p class="industry-intent__eyebrow m-0" data-astro-cid-hos5ot3v>${card.eyebrow}</p><h3 class="text-h3 industry-intent__card-title m-0" data-astro-cid-hos5ot3v>${card.title}</h3><div class="industry-intent__divider" aria-hidden="true" data-astro-cid-hos5ot3v></div><ul class="industry-intent__items m-0 list-none p-0" data-astro-cid-hos5ot3v>${card.items.map((item) => renderTemplate`<li class="industry-intent__item" data-astro-cid-hos5ot3v><p class="industry-intent__item-title m-0" data-astro-cid-hos5ot3v>${item.title}</p><p class="industry-intent__item-text m-0" data-astro-cid-hos5ot3v>${item.text}</p></li>`)}</ul></article>`)}</div>` })}`;
}, "C:/Xoomplus/src/components/IndustryIntent.astro", void 0);
var industryFeatures = [
	{
		id: "retail-ecommerce",
		variant: "panel",
		pill: "Retail & E-commerce",
		titleLines: ["Make discovery feel like the start", "of a better shop."],
		paragraphs: [
			"A store needs more than a good first impression.",
			"Search, product information and the shopping experience should support the same customer journey.",
			"Shopify Development or Ecommerce Development could support the store. Social Media Marketing could bring its products and story into the right conversations."
		],
		items: [
			{
				icon: "industries-discover",
				title: "Discover",
				text: "Relevant categories, helpful content and a search-friendly structure.",
				tag: "Technical SEO · On-Page SEO"
			},
			{
				icon: "industries-consider",
				title: "Consider",
				text: "Product information, clear navigation and thoughtful mobile experiences.",
				tag: "UI/UX Design · Ecommerce Development"
			},
			{
				icon: "industries-take-the-next-step",
				title: "Take the next step",
				text: "Align campaign promises with the product or landing page people reach.",
				tag: "PPC & Google Ads · Landing Page Design"
			}
		]
	},
	{
		id: "hospitality-leisure",
		variant: "image-list",
		reverse: true,
		pill: "Hospitality & Leisure",
		titleLines: ["Bring the experience to life. Make the next", "step simple."],
		image: {
			src: "/images/hospitality-and-leisure.webp",
			alt: "A warm, traditional lounge with leather armchairs, arched windows and a fireplace",
			width: 680,
			height: 460
		},
		paragraphs: ["A visit often starts long before arrival. Photography, useful details and an intuitive website could help people picture the experience and find the route to a booking or enquiry."],
		list: [
			"Local SEO → Help people discover your location",
			"Web Design & Development → Clarify the booking pathway",
			"Social Media Marketing → Share the atmosphere",
			"PPC & Google Ads → Align campaigns with landing pages"
		]
	},
	{
		id: "industry-rows",
		variant: "image-text-rows",
		rows: [{
			id: "row-1",
			reverse: false,
			titleLines: ["Turn interest into a", "reason to get in touch."],
			image: {
				src: "/images/turn-interest-into-a-reason.webp",
				alt: "A bright gym with floor-to-ceiling windows, weights and yoga mats",
				width: 600,
				height: 390
			},
			paragraphs: ["Bring your facilities, programmes and approach to life. Give prospective members the information they need before an enquiry or introductory visit.", "Showcase programmes and spaces with engaging content, then connect social campaigns to a focused enquiry page."],
			tag: "Social Media Marketing · Landing Page Design · UI/UX Design"
		}, {
			id: "row-2",
			reverse: true,
			titleLines: ["Let the details do", "the talking."],
			image: {
				src: "/images/let-the-details-do-talking.webp",
				alt: "A modern apartment building at dusk with warm lit windows",
				width: 600,
				height: 390
			},
			paragraphs: ["Help people explore your property offering through thoughtful imagery, useful location information and an intuitive browsing experience.", "Organise property content for discovery and connect listing interest to a viewing or sales enquiry. Any online sales functionality is scoped to your business model."],
			tag: "Custom Website Development · On-Page SEO · PPC & Google Ads"
		}]
	}
];
function getIndustryFeature(id) {
	return industryFeatures.find((feature) => feature.id === id);
}
//#endregion
//#region src/components/IndustryFeature.astro
createAstro("https://xoomplus.co.uk");
var $$IndustryFeature = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IndustryFeature;
	const { id = "industry-rows", reverse: reverseProp, rows: rowsProp, "aria-label": ariaLabel } = Astro.props;
	const feature = getIndustryFeature(id);
	const industryRowsFallback = getIndustryFeature("industry-rows")?.rows;
	if (!feature && !rowsProp && !industryRowsFallback) throw new Error(`Unknown industry feature id: ${id}`);
	const variant = rowsProp ? "image-text-rows" : feature ? feature.variant ?? "panel" : industryRowsFallback ? "image-text-rows" : "panel";
	const reverse = reverseProp ?? feature?.reverse ?? false;
	const isImageList = variant === "image-list";
	const isImageTextRows = variant === "image-text-rows";
	const isPanel = !isImageList && !isImageTextRows;
	const sectionId = rowsProp ? id : feature?.id ?? id;
	const headingId = `${sectionId}-heading`;
	const [titleLine1, titleLine2] = feature?.titleLines ?? ["", ""];
	const image = feature?.image;
	const imgW = image?.width ?? 680;
	const imgH = image?.height ?? 460;
	const rows = rowsProp ?? feature?.rows ?? (!feature ? industryRowsFallback : void 0) ?? [];
	const firstRowHeadingId = `${rows[0]?.id ?? "row-1"}-heading`;
	return renderTemplate`${isImageTextRows ? renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": sectionId,
		"aria-labelledby": ariaLabel ? void 0 : firstRowHeadingId,
		"aria-label": ariaLabel,
		"class": "industry-feature industry-feature--rows",
		"data-astro-cid-m6mkx6kj": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="industry-feature__rows" data-astro-cid-m6mkx6kj>${rows.map((row, index) => {
		const rowId = row.id ?? `row-${index + 1}`;
		const [line1, line2] = row.titleLines;
		const para1 = row.paragraphs[0];
		const para2 = row.paragraphs[1];
		const rowImgW = row.image.width ?? 600;
		const rowImgH = row.image.height ?? 390;
		const imageOnRight = Boolean(row.reverse);
		const caption = row.image.caption;
		const imgEl = renderTemplate`<img class="industry-feature__image"${addAttribute(row.image.src, "src")}${addAttribute(row.image.alt, "alt")}${addAttribute(rowImgW, "width")}${addAttribute(rowImgH, "height")} loading="lazy" decoding="async" data-astro-cid-m6mkx6kj>`;
		return renderTemplate`<div${addAttribute(rowId, "id")}${addAttribute([
			"industry-feature__layout",
			"industry-feature__layout--rows",
			imageOnRight ? "industry-feature__layout--image-right" : "industry-feature__layout--image-left"
		], "class:list")} data-astro-cid-m6mkx6kj><div class="industry-feature__copy" data-reveal="up" data-astro-cid-m6mkx6kj><h2${addAttribute(`${rowId}-heading`, "id")} class="industry-feature__heading industry-feature__heading--flush m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-m6mkx6kj><span class="industry-feature__line" data-astro-cid-m6mkx6kj>${line1}</span><span class="industry-feature__line" data-astro-cid-m6mkx6kj>${line2}</span></h2>${para1 ? renderTemplate`<p class="industry-feature__row-p1 text-on-light m-0" data-astro-cid-m6mkx6kj>${para1}</p>` : null}${para2 ? renderTemplate`<p class="industry-feature__row-p2 m-0" data-astro-cid-m6mkx6kj>${para2}</p>` : null}${row.tag ? renderTemplate`<p class="industry-feature__row-tag m-0" data-astro-cid-m6mkx6kj>${row.tag}</p>` : null}</div>${caption ? renderTemplate`<figure class="industry-feature__figure m-0" data-reveal="fade" data-astro-cid-m6mkx6kj><div class="industry-feature__media" data-astro-cid-m6mkx6kj>${imgEl}</div><figcaption class="industry-feature__caption" data-astro-cid-m6mkx6kj>${caption}</figcaption></figure>` : renderTemplate`<div class="industry-feature__media" data-reveal="fade" data-astro-cid-m6mkx6kj>${imgEl}</div>`}</div>`;
	})}</div>` })}` : renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": sectionId,
		"aria-labelledby": headingId,
		"class": "industry-feature",
		"data-astro-cid-m6mkx6kj": true
	}, { "default": ($$result) => renderTemplate`<div${addAttribute([
		"industry-feature__layout",
		isImageList ? "industry-feature__layout--image-list" : "industry-feature__layout--panel",
		reverse && "industry-feature__layout--reverse"
	], "class:list")} data-astro-cid-m6mkx6kj><div class="industry-feature__copy" data-reveal="up" data-astro-cid-m6mkx6kj>${feature?.pill ? renderTemplate`<p class="pill-light m-0" data-astro-cid-m6mkx6kj>${feature.pill}</p>` : null}<h2${addAttribute(headingId, "id")}${addAttribute([
		"industry-feature__heading",
		"m-0",
		"text-h1",
		"font-medium",
		"tracking-[-0.03em]",
		"text-primary-black",
		!feature?.pill && "industry-feature__heading--flush"
	], "class:list")} data-astro-cid-m6mkx6kj>${isImageList ? `${titleLine1} ${titleLine2}` : [renderTemplate`<span class="industry-feature__line" data-astro-cid-m6mkx6kj>${titleLine1}</span>`, renderTemplate`<span class="industry-feature__line" data-astro-cid-m6mkx6kj>${titleLine2}</span>`]}</h2><p class="industry-feature__paragraphs text-on-light m-0" data-astro-cid-m6mkx6kj>${(feature?.paragraphs ?? []).map((line) => renderTemplate`<span class="industry-feature__p-line" data-astro-cid-m6mkx6kj>${line}</span>`)}</p>${isPanel ? renderTemplate`<span class="industry-feature__accent" aria-hidden="true" data-astro-cid-m6mkx6kj></span>` : null}${isImageList && feature?.list ? renderTemplate`<ul class="industry-feature__plain-list m-0 list-none p-0" data-astro-cid-m6mkx6kj>${feature.list.map((item) => renderTemplate`<li class="industry-feature__plain-item text-on-light" data-astro-cid-m6mkx6kj>${item}</li>`)}</ul>` : null}</div>${isImageList && image ? renderTemplate`<div class="industry-feature__media" data-reveal="fade" data-astro-cid-m6mkx6kj><img class="industry-feature__image"${addAttribute(image.src, "src")}${addAttribute(image.alt, "alt")}${addAttribute(imgW, "width")}${addAttribute(imgH, "height")} loading="lazy" decoding="async" data-astro-cid-m6mkx6kj></div>` : renderTemplate`<div class="industry-feature__panel" data-astro-cid-m6mkx6kj><ul class="industry-feature__list m-0 list-none p-0" data-reveal-group data-astro-cid-m6mkx6kj>${(feature?.items ?? []).map((item) => renderTemplate`<li class="industry-feature__card" data-reveal="up" data-astro-cid-m6mkx6kj><span class="industry-feature__icon" aria-hidden="true" data-astro-cid-m6mkx6kj><img${addAttribute(`/icons/${item.icon}.svg`, "src")} alt="" width="44" height="44" decoding="async" loading="lazy" data-astro-cid-m6mkx6kj></span><div class="industry-feature__card-text" data-astro-cid-m6mkx6kj><h3 class="industry-feature__card-title m-0" data-astro-cid-m6mkx6kj>${item.title}</h3><p class="industry-feature__card-desc m-0" data-astro-cid-m6mkx6kj>${item.text}</p><p class="industry-feature__card-tag m-0" data-astro-cid-m6mkx6kj>${item.tag}</p></div></li>`)}</ul></div>`}</div>` })}`}`;
}, "C:/Xoomplus/src/components/IndustryFeature.astro", void 0);
//#endregion
//#region src/data/industry-clarity.ts
var industryClarity = {
	id: "clarity",
	pill: "Clarity before the enquiry",
	title: "Make complex services easier to understand.",
	text: "When people need to make a considered decision, clear information and a purposeful next step matter more than noise.",
	columns: [{
		title: "Medical Reporting",
		eyebrow: "Local visibility · Quote enquiries",
		text: "Help potential referrers and enquirers understand your reporting services, coverage and enquiry requirements.",
		items: [{
			title: "Explain the service clearly",
			text: "Organise service pages around report types, how an enquiry begins and what information your team needs.",
			tag: "UI/UX Design · WordPress Development"
		}, {
			title: "Connect discovery to a quote request",
			text: "Align location and service content with clear contact routes, without asking visitors to navigate unnecessary steps.",
			tag: "Local SEO · On-Page SEO · Landing Page Design"
		}]
	}, {
		title: "Legal",
		eyebrow: "Authority building · Qualified enquiries",
		text: "Give visitors a clear view of your practice areas and help them find the most relevant route to your team.",
		items: [{
			title: "Build an informative first impression",
			text: "Structure practice-area pages and useful articles around the questions prospective enquirers are asking.",
			tag: "SEO Content Marketing · Website Redesign"
		}, {
			title: "Make the next step specific",
			text: "Bring search intent, campaign messaging and enquiry pages together around the services you want to communicate.",
			tag: "PPC & Google Ads · Landing Page Design"
		}]
	}],
	note: "Your subject experts review service information and any professional or regulatory wording. We shape the digital experience around that approved content."
};
//#endregion
//#region src/components/IndustryClarity.astro
createAstro("https://xoomplus.co.uk");
var $$IndustryClarity = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IndustryClarity;
	const section = Astro.props.content ?? Astro.props.section ?? industryClarity;
	const isCentered = section.variant === "centered";
	const isLight = section.theme === "light";
	const headingId = `${section.id}-heading`;
	const [titleLine1, titleLine2] = section.titleLines ?? ["", ""];
	const hasTitleLines = Boolean(section.titleLines?.[0]);
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": section.id,
		"background": isLight ? "light-gray" : "dark",
		"aria-labelledby": headingId,
		"class:list": !isLight && "section-glow-top-left",
		"data-astro-cid-wxi2a6vo": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"industry-clarity",
		isCentered && "industry-clarity--centered",
		isLight && "industry-clarity--light"
	], "class:list")} data-astro-cid-wxi2a6vo><div class="industry-clarity__header" data-reveal="up" data-astro-cid-wxi2a6vo><div class="industry-clarity__heading-group" data-astro-cid-wxi2a6vo>${isLight ? renderTemplate`<p class="pill-light m-0" data-astro-cid-wxi2a6vo>${section.pill}</p>` : renderTemplate`<p class="pill-dark text-primary m-0" data-astro-cid-wxi2a6vo>${section.pill}</p>`}<h2${addAttribute(headingId, "id")}${addAttribute([
		"industry-clarity__title",
		"m-0",
		isLight ? "text-h2 font-semibold tracking-[-0.02em] text-primary-black" : "text-heading-dark dark-section-heading"
	], "class:list")} data-astro-cid-wxi2a6vo>${hasTitleLines ? [renderTemplate`<span class="industry-clarity__title-line" data-astro-cid-wxi2a6vo>${titleLine1}</span>`, renderTemplate`<span class="industry-clarity__title-line" data-astro-cid-wxi2a6vo>${titleLine2}</span>`] : section.title}</h2></div><p class="industry-clarity__intro m-0" data-astro-cid-wxi2a6vo>${section.text}</p></div><div class="industry-clarity__columns" data-reveal-group data-astro-cid-wxi2a6vo>${section.columns.map((column) => renderTemplate`<div class="industry-clarity__column" data-reveal="up" data-astro-cid-wxi2a6vo>${isLight && column.eyebrow ? renderTemplate`<p class="industry-clarity__eyebrow m-0" data-astro-cid-wxi2a6vo>${column.eyebrow}</p>` : null}<h3 class="industry-clarity__column-title m-0" data-astro-cid-wxi2a6vo>${column.title}</h3>${!isLight && column.eyebrow ? renderTemplate`<p class="industry-clarity__eyebrow m-0" data-astro-cid-wxi2a6vo>${column.eyebrow}</p>` : null}<p class="industry-clarity__column-text m-0" data-astro-cid-wxi2a6vo>${column.text}</p><div class="industry-clarity__divider" aria-hidden="true" data-astro-cid-wxi2a6vo></div><ul class="industry-clarity__items m-0 list-none p-0" data-astro-cid-wxi2a6vo>${column.items.map((item) => renderTemplate`<li class="industry-clarity__item" data-astro-cid-wxi2a6vo><h4 class="industry-clarity__item-title m-0" data-astro-cid-wxi2a6vo>${item.title}</h4><p class="industry-clarity__item-text m-0" data-astro-cid-wxi2a6vo>${item.text}</p>${item.tag ? renderTemplate`<p class="industry-clarity__item-tag m-0" data-astro-cid-wxi2a6vo>${item.tag}</p>` : null}</li>`)}</ul></div>`)}</div>${section.note ? isLight ? renderTemplate`<div class="industry-clarity__note-row" data-astro-cid-wxi2a6vo><span class="industry-clarity__note-bar" aria-hidden="true" data-astro-cid-wxi2a6vo></span><p class="industry-clarity__note m-0" data-astro-cid-wxi2a6vo>${section.note}</p></div>` : renderTemplate`<p class="industry-clarity__note m-0" data-astro-cid-wxi2a6vo>${section.note}</p>` : null}</div>` })}`;
}, "C:/Xoomplus/src/components/IndustryClarity.astro", void 0);
//#endregion
//#region src/data/services-behind.ts
/**
* Icons match home Our Services cards (`src/data/services.ts`):
* SEO / Social → service-circles.svg, Web → service-layers.svg.
* Third card links to `/services/social-media-marketing` as a placeholder
* (covers Social + Paid; no combined route yet).
*/
var servicesBehind = {
	id: "services-behind",
	pill: "The services behind the possibilities",
	title: "Different needs. Connected digital capabilities.",
	text: "The same core services can be shaped around different audiences, journeys and business priorities. Explore the full offer on our Services page.",
	cards: [
		{
			icon: "/icons/service-circles.svg",
			title: "SEO",
			description: "Connect your audience's questions with useful content and stronger search foundations.",
			items: [
				"AI SEO (GEO & AEO)",
				"Local SEO",
				"Technical SEO",
				"On-Page SEO",
				"Link Building (Off-Page)",
				"SEO Audit",
				"SEO Content Marketing"
			],
			buttonLabel: "Explore search capabilities",
			href: "/services/seo"
		},
		{
			icon: "/icons/service-layers.svg",
			title: "Web Design & Development",
			description: "Build a purposeful experience around your services, products and the way people choose.",
			items: [
				"UI/UX Design",
				"Landing Page Design",
				"Website Redesign",
				"WordPress Development",
				"Shopify Development",
				"Ecommerce Development",
				"Custom Website Development"
			],
			buttonLabel: "Explore website capabilities",
			href: "/services/web-design-development"
		},
		{
			icon: "/icons/service-circles.svg",
			title: "Social & Paid Campaigns",
			description: "Connect creative, audience thinking and relevant landing pages in one shared direction.",
			items: [
				"Social Media Marketing",
				"Content & creative direction",
				"Campaign planning",
				"PPC & Google Ads",
				"Audience & keyword research",
				"Landing page alignment",
				"Reporting & refinement"
			],
			buttonLabel: "Explore campaign services",
			href: "/services/social-media-marketing"
		}
	]
};
//#endregion
//#region src/components/ServicesBehind.astro
createAstro("https://xoomplus.co.uk");
var $$ServicesBehind = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServicesBehind;
	const section = Astro.props.content ?? servicesBehind;
	const headingId = `${section.id}-heading`;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": section.id,
		"background": "dark",
		"aria-labelledby": headingId,
		"class": "services-behind section-glow-top-left",
		"data-astro-cid-3fje2rh5": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="services-behind__header" data-reveal="up" data-astro-cid-3fje2rh5><div class="services-behind__heading-group" data-astro-cid-3fje2rh5><p class="pill-dark text-primary m-0" data-astro-cid-3fje2rh5>${section.pill}</p><h2${addAttribute(headingId, "id")} class="text-heading-dark dark-section-heading services-behind__title m-0" data-astro-cid-3fje2rh5>${section.title}</h2></div><p class="services-behind__intro m-0" data-astro-cid-3fje2rh5>${section.text}</p></div><div class="services-behind__grid" data-reveal-group data-astro-cid-3fje2rh5>${section.cards.map((card) => renderTemplate`<div data-reveal="up" data-astro-cid-3fje2rh5>${renderComponent($$result, "ServiceCard", $$ServiceCard, {
		"title": card.title,
		"icon": card.icon,
		"description": card.description,
		"features": card.items,
		"cta": {
			label: card.buttonLabel,
			href: card.href
		},
		"buttonLabel": card.buttonLabel,
		"buttonIcon": "right",
		"data-astro-cid-3fje2rh5": true
	})}</div>`)}</div>` })}`;
}, "C:/Xoomplus/src/components/ServicesBehind.astro", void 0);
//#endregion
//#region src/components/FeatureCard.astro
createAstro("https://xoomplus.co.uk");
var $$FeatureCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FeatureCard;
	const { icon, title, text, href, showPlus = false, iconSize = 28, class: className = "" } = Astro.props;
	const iconSrc = icon.startsWith("/") ? icon : `/icons/${icon}.svg`;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"surface-card",
		"feature-card",
		href && "feature-card--link",
		className
	], "class:list")} data-astro-cid-a5zxh5oa>${showPlus ? renderTemplate`<div class="feature-card__top" data-astro-cid-a5zxh5oa><img class="feature-card__icon"${addAttribute(iconSrc, "src")} alt=""${addAttribute(iconSize, "width")}${addAttribute(iconSize, "height")} aria-hidden="true" decoding="async" loading="lazy" data-astro-cid-a5zxh5oa><svg class="feature-card__plus" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-a5zxh5oa><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" data-astro-cid-a5zxh5oa></path></svg></div>` : renderTemplate`<img class="feature-card__icon"${addAttribute(iconSrc, "src")} alt=""${addAttribute(iconSize, "width")}${addAttribute(iconSize, "height")} aria-hidden="true" decoding="async" loading="lazy" data-astro-cid-a5zxh5oa>`}<h3 class="feature-card__title m-0" data-astro-cid-a5zxh5oa>${title}</h3><p class="feature-card__text m-0" data-astro-cid-a5zxh5oa>${text}</p>${href ? renderTemplate`<a class="feature-card__stretched"${addAttribute(href, "href")}${addAttribute(title, "aria-label")} data-astro-cid-a5zxh5oa></a>` : null}</article>`;
}, "C:/Xoomplus/src/components/FeatureCard.astro", void 0);
//#endregion
//#region src/data/industry-fundamentals.ts
var industryFundamentals = {
	id: "fundamentals",
	pill: "Different sectors. Shared fundamentals.",
	title: "Start with the journey. Not a list of channels.",
	text: "We connect what people are looking for with what your business can offer. Industry context shapes each step.",
	items: [
		{
			icon: "be-found",
			title: "Be found",
			text: "Understand search intent, locations and audience needs. Choose organic, social or paid activity with a clear purpose."
		},
		{
			icon: "bring-your-brand-into-focus",
			title: "Be understood",
			text: "Give your services a clear structure, useful content and a consistent message across your website and campaigns."
		},
		{
			icon: "make-the-next-step-clear",
			title: "Make it easy to act",
			text: "Connect the first click to a relevant enquiry, appointment or booking route, then review the journey together."
		}
	],
	cta: {
		text: "Not sure where to begin? Share the challenge — we can explore the right starting point.",
		label: "Help me choose",
		href: "/contact"
	}
};
//#endregion
//#region src/components/IndustryFundamentals.astro
createAstro("https://xoomplus.co.uk");
var $$IndustryFundamentals = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$IndustryFundamentals;
	const section = Astro.props.content ?? industryFundamentals;
	const headingId = `${section.id}-heading`;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": section.id,
		"aria-labelledby": headingId,
		"class": "industry-fundamentals",
		"data-astro-cid-b6x6kqvv": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="industry-fundamentals__header" data-reveal="up" data-astro-cid-b6x6kqvv><div class="industry-fundamentals__heading-group" data-astro-cid-b6x6kqvv><p class="pill-light m-0" data-astro-cid-b6x6kqvv>${section.pill}</p><h2${addAttribute(headingId, "id")} class="industry-fundamentals__title m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-b6x6kqvv>${section.title}</h2></div><p class="industry-fundamentals__intro text-on-light m-0" data-astro-cid-b6x6kqvv>${section.text}</p></div><div class="industry-fundamentals__grid" data-reveal-group data-astro-cid-b6x6kqvv>${section.items.map((item) => renderTemplate`<div data-reveal="up" data-astro-cid-b6x6kqvv>${renderComponent($$result, "FeatureCard", $$FeatureCard, {
		"icon": item.icon,
		"title": item.title,
		"text": item.text,
		"data-astro-cid-b6x6kqvv": true
	})}</div>`)}</div><div class="industry-fundamentals__bar" data-astro-cid-b6x6kqvv><p class="industry-fundamentals__bar-text text-on-light m-0" data-astro-cid-b6x6kqvv>${section.cta.text}</p>${renderComponent($$result, "Button", $$Button, {
		"href": section.cta.href,
		"class": "industry-fundamentals__bar-btn shrink-0",
		"data-astro-cid-b6x6kqvv": true
	}, { "default": ($$result) => renderTemplate`${section.cta.label}` })}</div>` })}`;
}, "C:/Xoomplus/src/components/IndustryFundamentals.astro", void 0);
//#endregion
//#region src/components/wp-pages/IndustriesPage.astro
var $$IndustriesPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="page-industries flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "Industries" })}${renderComponent($$result, "Industries", $$Industries, {})}${renderComponent($$result, "IndustryIntent", $$IndustryIntent, {})}${renderComponent($$result, "IndustryFeature", $$IndustryFeature, { "id": "retail-ecommerce" })}${renderComponent($$result, "IndustryClarity", $$IndustryClarity, {})}${renderComponent($$result, "IndustryFeature", $$IndustryFeature, { "id": "hospitality-leisure" })}${renderComponent($$result, "ServicesBehind", $$ServicesBehind, {})}${renderComponent($$result, "IndustryFeature", $$IndustryFeature, { "id": "industry-rows" })}${renderComponent($$result, "IndustryFundamentals", $$IndustryFundamentals, {})}${renderComponent($$result, "FAQ", $$FAQ, {
		"page": "industries",
		"id": "industries-faq"
	})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>`;
}, "C:/Xoomplus/src/components/wp-pages/IndustriesPage.astro", void 0);
//#endregion
//#region src/components/wp-pages/BlogsPage.astro
var $$BlogsPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "Blogs" })}${renderComponent($$result, "BlogListing", $$BlogListing, {})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>`;
}, "C:/Xoomplus/src/components/wp-pages/BlogsPage.astro", void 0);
//#endregion
//#region src/components/BetterTogether.astro
var $$BetterTogether = createComponent(($$result, $$props, $$slots) => {
	const cards = [
		{
			title: "Find +",
			subtitle: "SEO + PPC & Google Ads",
			text: "Search content and paid messaging start with the same understanding of your audience."
		},
		{
			title: "Engage +",
			subtitle: "Social Media Marketing + SEO",
			text: "Useful content and consistent creative carry your message across different moments."
		},
		{
			title: "Act +",
			subtitle: "Web Design & Development",
			text: "The website turns those moments into a clear experience, with an obvious next step."
		}
	];
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "better-together-heading",
		"data-astro-cid-2bkka2l4": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bt-header" data-reveal="up" data-astro-cid-2bkka2l4><div class="bt-header__intro" data-astro-cid-2bkka2l4><p class="pill-light m-0" data-astro-cid-2bkka2l4>Better together</p><h2 id="better-together-heading" class="bt-header__heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-2bkka2l4>Your audience sees a journey.<br data-astro-cid-2bkka2l4>Not a list of services.</h2></div><p class="bt-header__aside text-on-light m-0" data-astro-cid-2bkka2l4>A great website should support your marketing. Your marketing should reflect your brand. And every decision should start with your business.</p></div><ul class="bt-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-2bkka2l4>${cards.map((card) => renderTemplate`<li class="bt-grid__item" data-reveal="up" data-astro-cid-2bkka2l4><article class="surface-card bt-card" data-astro-cid-2bkka2l4><h3 class="bt-card__title m-0" data-astro-cid-2bkka2l4>${card.title}</h3><span class="bt-card__divider" aria-hidden="true" data-astro-cid-2bkka2l4></span><p class="bt-card__subtitle m-0" data-astro-cid-2bkka2l4>${card.subtitle}</p><p class="bt-card__text m-0" data-astro-cid-2bkka2l4>${card.text}</p></article></li>`)}</ul>` })}`;
}, "C:/Xoomplus/src/components/BetterTogether.astro", void 0);
//#endregion
//#region src/data/services-overview.ts
/** Our Services page overview cards — separate from home `services` data. */
var servicesOverview = [
	{
		id: "seo",
		icon: "/icons/service-circles.svg",
		title: "SEO",
		description: "Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.",
		items: [
			"AI SEO (GEO & AEO)",
			"Local SEO",
			"Technical SEO",
			"On-Page SEO",
			"Link Building (Off-Page)",
			"SEO Audit",
			"SEO Content Marketing"
		],
		buttonLabel: "Explore search capabilities",
		href: "#seo"
	},
	{
		id: "web-design",
		icon: "/icons/service-layers.svg",
		title: "Web Design & Development",
		description: "Create clear, responsive, and purposeful websites designed around your users and business goals.",
		items: [
			"UI/UX Design",
			"Landing Page Design",
			"Website Redesign",
			"WordPress Development",
			"Shopify Development",
			"Ecommerce Development",
			"Custom Website Development"
		],
		buttonLabel: "Explore website capabilities",
		href: "#web-design"
	},
	{
		id: "social-media",
		icon: "/icons/service-circles.svg",
		title: "Social Media Marketing",
		description: "Connect your message with the right people through thoughtful content, creative direction and a consistent social presence.",
		items: [
			"Audience understanding",
			"Content & creative direction",
			"Campaign planning",
			"Brand and message alignment",
			"Website journey alignment",
			"Reporting & refinement",
			"A shared direction for your channels"
		],
		buttonLabel: "Explore social marketing",
		href: "#social-media"
	},
	{
		id: "ppc",
		icon: "/icons/service-circles.svg",
		title: "PPC & Google Ads",
		description: "Bring focused paid campaigns and relevant website experiences into one conversation, from the first click to the next step.",
		items: [
			"Audience & keyword research",
			"Campaign planning",
			"Message and creative direction",
			"Landing page alignment",
			"Clear campaign priorities",
			"Reporting & refinement",
			"A shared view of marketing activity"
		],
		buttonLabel: "Explore paid campaigns",
		href: "#ppc"
	}
];
//#endregion
//#region src/data/services/images.ts
/**
* Service page images — preferred paths with fallbacks so missing assets never 404.
*
* Convention for new services:
*   /images/<slug>-hero-image.webp
*   /images/<slug>-showcase-image.webp
*   /images/<slug>-working-together-image.webp
*
* Web Design keeps legacy filenames (see WEB_DESIGN_* constants).
*/
/** Current Web Design panel image (used until web-design-and-development-hero-image.webp lands). */
var WEB_DESIGN_HERO_IMAGE = "/images/main-service-hero-glass-image.webp";
/** Current Web Design showcase image. */
var WEB_DESIGN_SHOWCASE_IMAGE = "/images/one-connected-experience-image.webp";
/** Current Web Design process image. */
var WEB_DESIGN_PROCESS_IMAGE = "/images/working-together-image.webp";
/** Expected final Web Design hero path (not yet in public/). */
var WEB_DESIGN_HERO_PREFERRED = "/images/web-design-and-development-hero-image.webp";
/** Expected final Web Design showcase path (not yet in public/). */
var WEB_DESIGN_SHOWCASE_PREFERRED = "/images/web-design-development-showcase-image.webp";
function publicFileExists(publicUrl) {
	const relative = publicUrl.replace(/^\//, "");
	return fs.existsSync(path.join(process.cwd(), "public", relative));
}
/** Use `preferred` when the file exists under public/; otherwise `fallback`. */
function serviceImage(preferred, fallback) {
	return publicFileExists(preferred) ? preferred : fallback;
}
function serviceHeroImage(slug) {
	if (slug === "web-design-development") return serviceImage(WEB_DESIGN_HERO_PREFERRED, WEB_DESIGN_HERO_IMAGE);
	return serviceImage(`/images/${slug}-hero-image.webp`, WEB_DESIGN_HERO_IMAGE);
}
function serviceShowcaseImage(slug) {
	if (slug === "web-design-development") return serviceImage(WEB_DESIGN_SHOWCASE_PREFERRED, WEB_DESIGN_SHOWCASE_IMAGE);
	return serviceImage(`/images/${slug}-showcase-image.webp`, WEB_DESIGN_SHOWCASE_IMAGE);
}
function serviceProcessImage(slug) {
	if (slug === "web-design-development") return WEB_DESIGN_PROCESS_IMAGE;
	return serviceImage(`/images/${slug}-working-together-image.webp`, WEB_DESIGN_PROCESS_IMAGE);
}
/** Default child-service hero (708×458). Per-child: /images/<child-slug>-hero-image.webp */
var CHILD_SERVICE_HERO_DEFAULT = "/images/single-service-hero-image.webp";
function childServiceHeroImage(childSlug) {
	return serviceImage(`/images/${childSlug}-hero-image.webp`, CHILD_SERVICE_HERO_DEFAULT);
}
//#endregion
//#region src/data/services/children.ts
/** Our Story copy — used as Landing Page Design content and as placeholder for others. */
var CHILD_PLACEHOLDER_TITLE = ["Built around your business.", "Not around silos."];
var CHILD_PLACEHOLDER_PARAGRAPHS = [
	"A great website should support your marketing. Your marketing should reflect your brand. And every decision should start with your business.",
	"That is the thinking behind XoomPlus. We bring digital marketing, design and development into one conversation, so ideas can move from strategy to execution without losing their purpose along the way.",
	"We see ourselves as a digital partner: curious about your challenges, clear about our thinking and invested in building something useful together."
];
function makeChildService(mainName, slug, name, options = {}) {
	const { placeholder = true } = options;
	const imageSrc = childServiceHeroImage(slug);
	return {
		slug,
		name,
		metaTitle: `${name} | ${mainName} | Xoomplus`,
		metaDescription: placeholder ? `Explore ${name} from Xoomplus — part of our ${mainName} services. Placeholder description.` : `${name} from Xoomplus — purposeful digital work shaped around your business, as part of our ${mainName} services.`,
		hero: {
			pill: name,
			titleLines: [...CHILD_PLACEHOLDER_TITLE],
			paragraphs: [...CHILD_PLACEHOLDER_PARAGRAPHS],
			button: {
				label: "Let's Talk",
				href: "/contact"
			},
			image: {
				src: imageSrc,
				alt: `${name} — illustrative service visual`,
				width: 708,
				height: 458
			}
		}
	};
}
//#endregion
//#region src/data/services/seo.ts
var SLUG$3 = "seo";
var NAME$3 = "SEO";
var seo = {
	slug: SLUG$3,
	name: NAME$3,
	menuDescription: "Build visibility. Reach the right audience.",
	metaTitle: "SEO Services | Xoomplus",
	metaDescription: "Improve search visibility and reach the right audience with SEO strategy, technical foundations, and content that supports long-term organic growth.",
	children: [
		makeChildService(NAME$3, "ai-seo-geo-aeo", "AI SEO (GEO & AEO)"),
		makeChildService(NAME$3, "local-seo", "Local SEO"),
		makeChildService(NAME$3, "technical-seo", "Technical SEO"),
		makeChildService(NAME$3, "on-page-seo", "On-Page SEO"),
		makeChildService(NAME$3, "link-building-off-page", "Link Building (Off-Page)"),
		makeChildService(NAME$3, "seo-audit", "SEO Audit"),
		makeChildService(NAME$3, "seo-content-marketing", "SEO Content Marketing")
	],
	hero: {
		pill: "SEO",
		pillBrand: "XoomPlus",
		titleLines: ["Be found", "for the right reasons."],
		text: "Improve your search visibility, reach the right audience, and build a clearer foundation for long-term organic growth.",
		primaryButton: {
			label: "Discuss your project",
			href: "/contact"
		},
		secondaryLink: {
			label: "Explore the possibilities",
			href: "#details"
		},
		footerLeft: "Digital Marketing. Designed for Growth.",
		footerRight: "AI SEO + Local + Technical",
		panelLabel: "SEARCH / CONTENT / GROWTH",
		panelImage: {
			src: serviceHeroImage(SLUG$3),
			alt: "Website shown on a laptop and a phone"
		},
		panelCaptions: [
			"Clear priorities",
			"Useful content",
			"Measurable growth"
		]
	},
	features: {
		pill: "Built around people",
		titleLines: ["Not just rankings.", "The right visibility."],
		text: "Search is where intent meets your offer. We bring strategy, content and technical foundations into one conversation, so the people who find you are the people you want to reach.",
		items: [
			{
				icon: "make-the-next-step-clear",
				title: "Make the next step clear",
				text: "Help people understand your offer in search, find what matters and move naturally towards an enquiry or purchase."
			},
			{
				icon: "bring-your-brand-into-focus",
				title: "Bring your brand into focus",
				text: "Create a consistent search presence that gives your content clarity and your business a recognisable voice in the results."
			},
			{
				icon: "think-beyond-one-screen",
				title: "Think beyond one keyword",
				text: "Shape visibility around how people search — from a local query to a deeper research journey across channels and devices."
			}
		]
	},
	experience: {
		pill: "Strategy & foundations",
		titleLines: ["Make every page", "earn its place."],
		text: "Start with the people searching for what you offer. Then shape structure, content and technical foundations around what they need to find and trust.",
		items: [
			{
				icon: "ui-ux-design",
				title: "On-Page SEO",
				text: "Give each page a clearer role in search, with considered titles, structure and content that matches intent."
			},
			{
				icon: "landing-page-design",
				title: "Local SEO",
				text: "Bring your local presence into focus — so nearby customers can find you when it matters."
			},
			{
				icon: "website-redesign",
				title: "Technical SEO",
				text: "Strengthen the foundations that help search engines crawl, understand and trust your site."
			}
		],
		footnote: "We shape priorities, page requirements and measurement around your goals, rather than starting with a one-size-fits-all checklist."
	},
	bento: {
		pill: "Search capabilities",
		title: "Clear priorities. The right foundations.",
		text: "Choose the work around your audience, your market and your goals. Search strategy should serve visibility — not define it before the conversation begins.",
		mainCard: {
			icon: "/icons/service-circles.svg",
			title: "SEO",
			description: "Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.",
			items: [
				"AI SEO (GEO & AEO)",
				"Local SEO",
				"Technical SEO",
				"On-Page SEO",
				"Link Building (Off-Page)",
				"SEO Audit",
				"SEO Content Marketing"
			],
			buttonLabel: "Discuss your SEO",
			href: "/contact"
		},
		cards: [
			{
				icon: "wordpress-development",
				title: "AI SEO (GEO & AEO)",
				text: "Prepare your content for AI-driven search and answer experiences, so your brand stays visible as discovery changes.",
				tag: "GEO + AEO readiness"
			},
			{
				icon: "sopify-development",
				title: "Local SEO",
				text: "Strengthen your local signals and presence so nearby customers can find and trust you.",
				tag: "Maps + local intent"
			},
			{
				icon: "ecommerce-development",
				title: "Technical SEO",
				text: "Improve crawlability, performance and structure so search engines can understand your site clearly.",
				tag: "Crawl + performance"
			},
			{
				icon: "custom-website-development",
				title: "SEO Content Marketing",
				text: "Shape useful content around search intent, so visibility is backed by pages people actually want to read.",
				tag: "Content + intent"
			}
		],
		note: "Not sure where to start? Begin with your goals, your market and your current visibility. We can explore the priorities together."
	},
	showcase: {
		pill: "One connected experience",
		titleLines: ["Different queries.", "The same clarity."],
		text: "Good SEO is more than ranking a single page. It means aligning content, structure and technical foundations so every search journey feels coherent.",
		panel: {
			label: "SEARCH EXPLORATION",
			note: "Concept · Not client work",
			image: {
				src: serviceShowcaseImage(SLUG$3),
				alt: "Website layout shown on a laptop and a phone",
				width: 960,
				height: 720
			},
			caption: "Illustrative layout exploration with generated architectural photography."
		},
		items: [
			"Content that matches intent",
			"Structure that search can follow",
			"Signals that build trust"
		],
		icon: "one-connected-experience-arrow"
	},
	process: {
		pill: "Working together",
		titleLines: ["Good work starts", "with a good partnership."],
		image: {
			src: serviceProcessImage(SLUG$3),
			alt: "Team members sketching ideas on paper at a wooden table",
			width: 960,
			height: 540
		},
		items: [
			{
				title: "A scope shaped around your needs",
				text: "Agree the priorities, technical requirements and measurement before the work begins. A shared brief keeps SEO focused and makes decisions easier."
			},
			{
				title: "A shared view of the work",
				text: "Bring your market knowledge, content and business goals into the conversation. Review direction together as visibility takes shape."
			},
			{
				title: "A considered handover",
				text: "Discuss reporting, content ownership and the practical information you need to keep improving. Any ongoing support can be scoped separately."
			}
		],
		note: "A useful starting point: your existing website, your goals, your target audience and any search or analytics insight you already have."
	},
	faqKey: "seo"
};
//#endregion
//#region src/data/services/web-design-development.ts
var SLUG$2 = "web-design-development";
var NAME$2 = "Web Design & Development";
var webDesignDevelopment = {
	slug: SLUG$2,
	name: NAME$2,
	menuDescription: "Purposeful experiences. Stronger websites.",
	metaTitle: "Web Design & Development | Xoomplus",
	metaDescription: "Purposeful web design and development — responsive sites, clear user journeys, and experiences aligned with your business goals.",
	children: [
		makeChildService(NAME$2, "uiux-design", "UI/UX Design"),
		makeChildService(NAME$2, "landing-page-design", "Landing Page Design", { placeholder: false }),
		makeChildService(NAME$2, "website-redesign", "Website Redesign"),
		makeChildService(NAME$2, "wordpress-development", "WordPress Development"),
		makeChildService(NAME$2, "shopify-development", "Shopify Development"),
		makeChildService(NAME$2, "ecommerce-development", "Ecommerce Development"),
		makeChildService(NAME$2, "custom-website-development", "Custom Website Development")
	],
	hero: {
		pill: "Web Design & Development",
		pillBrand: "XoomPlus",
		titleLines: ["A better website.", "A stronger foundation."],
		text: "Create clear, responsive, and purposeful websites designed around your users and business goals.",
		primaryButton: {
			label: "Discuss your project",
			href: "/contact"
		},
		secondaryLink: {
			label: "Explore the possibilities",
			href: "#details"
		},
		footerLeft: "Digital Marketing. Designed for Growth.",
		footerRight: "UI/UX + Websites + Ecommerce",
		panelLabel: "EXPERIENCE / DESIGN / DEVELOPMENT",
		panelImage: {
			src: serviceHeroImage(SLUG$2),
			alt: "Website shown on a laptop and a phone"
		},
		panelCaptions: [
			"Clear structure",
			"Considered design",
			"Purposeful journeys"
		]
	},
	features: {
		pill: "Built around people",
		titleLines: ["Not just how it looks.", "How it works for you."],
		text: "Your website is where your message becomes an experience. We bring design and development into one conversation, so the pages people see and the journeys they take share a clear purpose.",
		items: [
			{
				icon: "make-the-next-step-clear",
				title: "Make the next step clear",
				text: "Help people understand your offer, find what matters and move naturally towards an enquiry or purchase."
			},
			{
				icon: "bring-your-brand-into-focus",
				title: "Bring your brand into focus",
				text: "Create a consistent visual language that gives your content clarity and your business a recognisable presence."
			},
			{
				icon: "think-beyond-one-screen",
				title: "Think beyond one screen",
				text: "Shape the experience around the way people browse, from a first mobile visit to a deeper desktop exploration."
			}
		]
	},
	experience: {
		pill: "Experience & design",
		titleLines: ["Make every page", "feel purposeful."],
		text: "Start with the people using your website. Then shape the content, structure and visual language around what they need to understand and do.",
		items: [
			{
				icon: "ui-ux-design",
				title: "UI/UX Design",
				text: "Give your audience a clearer route through your content, with considered layouts and purposeful interactions.",
				href: `/services/${SLUG$2}/uiux-design`
			},
			{
				icon: "landing-page-design",
				title: "Landing Page Design",
				text: "Bring one message into focus. Shape a page around the visitor's intent and the action you want them to take.",
				href: `/services/${SLUG$2}/landing-page-design`
			},
			{
				icon: "website-redesign",
				title: "Website Redesign",
				text: "Reconsider what your website needs to say and do, retaining what works and bringing clarity to what doesn't.",
				href: `/services/${SLUG$2}/website-redesign`
			}
		],
		footnote: "We shape the platform, page requirements and handover around your needs, rather than starting with a one-size-fits-all build."
	},
	bento: {
		pill: "Development & commerce",
		title: "Considered design. The right foundation.",
		text: "Choose the build around your content, your products and your requirements. The platform should serve the experience — not define it before the conversation begins.",
		mainCard: {
			icon: "/icons/service-layers.svg",
			title: "Web Design & Development",
			description: "Create clear, responsive, and purposeful websites designed around your users and business goals.",
			items: [
				"UI/UX Design",
				"Landing Page Design",
				"Website Redesign",
				"WordPress Development",
				"Shopify Development",
				"Ecommerce Development",
				"Custom Website Development"
			],
			buttonLabel: "Discuss your website",
			href: "/contact"
		},
		cards: [
			{
				icon: "wordpress-development",
				title: "WordPress Development",
				text: "Build a content-led website with a structure that makes your pages and publishing needs easier to manage.",
				tag: "Page templates + content structure",
				href: `/services/${SLUG$2}/wordpress-development`
			},
			{
				icon: "sopify-development",
				title: "Shopify Development",
				text: "Shape a storefront around your products, with considered collection pages and a coherent shopping journey.",
				tag: "Storefront + product presentation",
				href: `/services/${SLUG$2}/shopify-development`
			},
			{
				icon: "ecommerce-development",
				title: "Ecommerce Development",
				text: "Bring browsing, product information and the path to purchase into one connected website experience.",
				tag: "Catalogue + shopping journey",
				href: `/services/${SLUG$2}/ecommerce-development`
			},
			{
				icon: "custom-website-development",
				title: "Custom Website Development",
				text: "Translate specific page and functionality requirements into a website shaped around your business.",
				tag: "Bespoke layouts + scoped functionality",
				href: `/services/${SLUG$2}/custom-website-development`
			}
		],
		note: "Not sure which route fits? Start with your content, products and priorities. We can explore the website requirements together."
	},
	showcase: {
		pill: "One connected experience",
		titleLines: ["Different screens.", "The same clarity."],
		text: "Responsive design is more than making a page smaller. It means rethinking the hierarchy, the navigation and the space your content needs.",
		panel: {
			label: "RESPONSIVE EXPLORATION",
			note: "Concept · Not client work",
			image: {
				src: serviceShowcaseImage(SLUG$2),
				alt: "Website layout shown on a laptop and a phone",
				width: 960,
				height: 720
			},
			caption: "Illustrative layout exploration with generated architectural photography."
		},
		items: [
			"Content that keeps its hierarchy",
			"Navigation that feels natural",
			"Calls to action within reach"
		],
		icon: "one-connected-experience-arrow"
	},
	process: {
		pill: "Working together",
		titleLines: ["Good work starts", "with a good partnership."],
		image: {
			src: serviceProcessImage(SLUG$2),
			alt: "Team members sketching ideas on paper at a wooden table",
			width: 960,
			height: 540
		},
		items: [
			{
				title: "A scope shaped around your needs",
				text: "Agree the pages, platform requirements and handover before the build. A shared brief keeps the work focused and makes decisions easier."
			},
			{
				title: "A shared view of the work",
				text: "Bring your brand assets, content and business knowledge into the conversation. Review the direction together as the website takes shape."
			},
			{
				title: "A considered handover",
				text: "Discuss content management and the practical information you need to take ownership of the website. Any ongoing support can be scoped separately."
			}
		],
		note: "A useful starting point: your existing website, your goals, the pages you need and any content or brand assets you already have."
	},
	faqKey: "web-design-development"
};
//#endregion
//#region src/data/services/social-media-marketing.ts
var SLUG$1 = "social-media-marketing";
var NAME$1 = "Social Media Marketing";
var socialMediaMarketing = {
	slug: SLUG$1,
	name: NAME$1,
	menuDescription: "Connect your message with the right people.",
	metaTitle: "Social Media Marketing | Xoomplus",
	metaDescription: "Connect your message with the right people through thoughtful social content, creative direction, and consistent channel presence.",
	children: [
		makeChildService(NAME$1, "content-creative-direction", "Content & creative direction"),
		makeChildService(NAME$1, "campaign-planning", "Campaign planning"),
		makeChildService(NAME$1, "reporting-refinement", "Reporting & refinement")
	],
	hero: {
		pill: "Social Media Marketing",
		pillBrand: "XoomPlus",
		titleLines: ["The right message.", "A more connected journey."],
		text: "Connect your message with the right people through thoughtful content, creative direction and a consistent social presence.",
		primaryButton: {
			label: "Discuss your project",
			href: "/contact"
		},
		secondaryLink: {
			label: "Explore the possibilities",
			href: "#details"
		},
		footerLeft: "Digital Marketing. Designed for Growth.",
		footerRight: "Content + Creative + Campaigns",
		panelLabel: "CONTENT / CREATIVE / CAMPAIGNS",
		panelImage: {
			src: serviceHeroImage(SLUG$1),
			alt: "Website shown on a laptop and a phone"
		},
		panelCaptions: [
			"Clear messaging",
			"Consistent presence",
			"Ongoing refinement"
		]
	},
	features: {
		pill: "Built around people",
		titleLines: ["Not just posts.", "How your message lands."],
		text: "Social is where your brand meets attention. We bring content, creative and campaigns into one conversation, so every channel shares a clear purpose.",
		items: [
			{
				icon: "make-the-next-step-clear",
				title: "Make the next step clear",
				text: "Help people understand your offer, engage with what matters and move naturally towards an enquiry or visit."
			},
			{
				icon: "bring-your-brand-into-focus",
				title: "Bring your brand into focus",
				text: "Create a consistent visual and verbal language that gives your content clarity and your business a recognisable presence."
			},
			{
				icon: "think-beyond-one-screen",
				title: "Think beyond one channel",
				text: "Shape the journey across the platforms your audience uses — from a first scroll to a deeper brand conversation."
			}
		]
	},
	experience: {
		pill: "Content & creative",
		titleLines: ["Make every post", "feel purposeful."],
		text: "Start with the people you want to reach. Then shape the message, creative and channel plan around what they need to notice and do.",
		items: [
			{
				icon: "ui-ux-design",
				title: "Content & creative direction",
				text: "Give your audience a clearer story across posts, with considered visuals and purposeful messaging."
			},
			{
				icon: "landing-page-design",
				title: "Campaign planning",
				text: "Bring one message into focus. Shape a campaign around audience intent and the action you want them to take."
			},
			{
				icon: "website-redesign",
				title: "Brand and message alignment",
				text: "Reconsider what your social presence needs to say and do, retaining what works and bringing clarity to what doesn't."
			}
		],
		footnote: "We shape the channel mix, content requirements and reporting around your needs, rather than starting with a one-size-fits-all calendar."
	},
	bento: {
		pill: "Channels & campaigns",
		title: "Clear messaging. The right channels.",
		text: "Choose the work around your audience, your brand and your goals. Social should serve the journey — not define it before the conversation begins.",
		mainCard: {
			icon: "/icons/service-circles.svg",
			title: "Social Media Marketing",
			description: "Connect your message with the right people through thoughtful content, creative direction and a consistent social presence.",
			items: [
				"Audience understanding",
				"Content & creative direction",
				"Campaign planning",
				"Brand and message alignment",
				"Website journey alignment",
				"Reporting & refinement",
				"A shared direction for your channels"
			],
			buttonLabel: "Discuss your social marketing",
			href: "/contact"
		},
		cards: [
			{
				icon: "wordpress-development",
				title: "Content & creative direction",
				text: "Shape a content-led presence with a structure that makes your messaging and publishing easier to manage.",
				tag: "Creative + content rhythm"
			},
			{
				icon: "sopify-development",
				title: "Campaign planning",
				text: "Shape campaigns around your offer, with considered creative and a coherent path from attention to action.",
				tag: "Campaigns + creative"
			},
			{
				icon: "ecommerce-development",
				title: "Website journey alignment",
				text: "Bring social interest and the path to enquiry into one connected experience across channels and your website.",
				tag: "Social + site journey"
			},
			{
				icon: "custom-website-development",
				title: "Reporting & refinement",
				text: "Translate performance into clear next steps, so your social activity stays focused on what matters.",
				tag: "Insight + iteration"
			}
		],
		note: "Not sure which channels fit? Start with your audience, message and priorities. We can explore the social requirements together."
	},
	showcase: {
		pill: "One connected experience",
		titleLines: ["Different channels.", "The same clarity."],
		text: "Consistent social marketing is more than posting more often. It means aligning message, creative and destination so every touchpoint feels coherent.",
		panel: {
			label: "CHANNEL EXPLORATION",
			note: "Concept · Not client work",
			image: {
				src: serviceShowcaseImage(SLUG$1),
				alt: "Website layout shown on a laptop and a phone",
				width: 960,
				height: 720
			},
			caption: "Illustrative layout exploration with generated architectural photography."
		},
		items: [
			"Messaging that keeps its hierarchy",
			"Creative that feels natural",
			"Calls to action within reach"
		],
		icon: "one-connected-experience-arrow"
	},
	process: {
		pill: "Working together",
		titleLines: ["Good work starts", "with a good partnership."],
		image: {
			src: serviceProcessImage(SLUG$1),
			alt: "Team members sketching ideas on paper at a wooden table",
			width: 960,
			height: 540
		},
		items: [
			{
				title: "A scope shaped around your needs",
				text: "Agree the channels, content requirements and reporting before the work begins. A shared brief keeps social focused and makes decisions easier."
			},
			{
				title: "A shared view of the work",
				text: "Bring your brand assets, audience knowledge and business goals into the conversation. Review direction together as the presence takes shape."
			},
			{
				title: "A considered handover",
				text: "Discuss content ownership and the practical information you need to keep publishing. Any ongoing support can be scoped separately."
			}
		],
		note: "A useful starting point: your existing channels, your goals, the audiences you want to reach and any content or brand assets you already have."
	},
	faqKey: "social-media-marketing"
};
//#endregion
//#region src/data/services/ppc-google-ads.ts
var SLUG = "ppc-google-ads";
var NAME = "PPC & Google Ads";
//#endregion
//#region src/data/services/index.ts
/** Add a service file above, then append it here — getStaticPaths picks it up automatically. */
var mainServices = [
	seo,
	webDesignDevelopment,
	socialMediaMarketing,
	{
		slug: SLUG,
		name: NAME,
		menuDescription: "Focused campaigns. A clearer path from click to conversion.",
		metaTitle: "PPC & Google Ads | Xoomplus",
		metaDescription: "Focused paid search and Google Ads campaigns with clear priorities, aligned landing experiences, and measurable conversion paths.",
		children: [
			makeChildService(NAME, "audience-keyword-research", "Audience & keyword research"),
			makeChildService(NAME, "landing-page-alignment", "Landing page alignment"),
			makeChildService(NAME, "reporting-refinement", "Reporting & refinement")
		],
		hero: {
			pill: "PPC & Google Ads",
			pillBrand: "XoomPlus",
			titleLines: ["Focused campaigns.", "A clearer path."],
			text: "Bring focused paid campaigns and relevant website experiences into one conversation, from the first click to the next step.",
			primaryButton: {
				label: "Discuss your project",
				href: "/contact"
			},
			secondaryLink: {
				label: "Explore the possibilities",
				href: "#details"
			},
			footerLeft: "Digital Marketing. Designed for Growth.",
			footerRight: "Search + Paid Social + Landing pages",
			panelLabel: "RESEARCH / CAMPAIGNS / CONVERSION",
			panelImage: {
				src: serviceHeroImage(SLUG),
				alt: "Website shown on a laptop and a phone"
			},
			panelCaptions: [
				"Clear priorities",
				"Aligned journeys",
				"Measurable results"
			]
		},
		features: {
			pill: "Built around people",
			titleLines: ["Not just clicks.", "How the journey works."],
			text: "Paid media is where intent meets your offer. We bring research, creative and landing experiences into one conversation, so every click has a clear purpose.",
			items: [
				{
					icon: "make-the-next-step-clear",
					title: "Make the next step clear",
					text: "Help people understand your offer from the first ad, find what matters and move naturally towards an enquiry or purchase."
				},
				{
					icon: "bring-your-brand-into-focus",
					title: "Bring your brand into focus",
					text: "Create a consistent message across ads and landing pages that gives your offer clarity and your business a recognisable presence."
				},
				{
					icon: "think-beyond-one-screen",
					title: "Think beyond one click",
					text: "Shape the journey from impression to conversion — across search, paid social and the pages people land on."
				}
			]
		},
		experience: {
			pill: "Research & creative",
			titleLines: ["Make every campaign", "feel purposeful."],
			text: "Start with the people you want to reach. Then shape keywords, creative and landing experiences around what they need to understand and do.",
			items: [
				{
					icon: "ui-ux-design",
					title: "Audience & keyword research",
					text: "Give your campaigns a clearer route to the right audience, with considered keywords and purposeful targeting."
				},
				{
					icon: "landing-page-design",
					title: "Landing page alignment",
					text: "Bring one message into focus. Shape the landing page around the visitor's intent and the action you want them to take."
				},
				{
					icon: "website-redesign",
					title: "Message and creative direction",
					text: "Reconsider what your ads need to say and do, retaining what works and bringing clarity to what doesn't."
				}
			],
			footnote: "We shape the channel mix, campaign priorities and measurement around your needs, rather than starting with a one-size-fits-all account structure."
		},
		bento: {
			pill: "Paid capabilities",
			title: "Focused spend. The right foundation.",
			text: "Choose the campaigns around your audience, your offer and your goals. Paid media should serve the journey — not define it before the conversation begins.",
			mainCard: {
				icon: "/icons/service-circles.svg",
				title: "PPC & Google Ads",
				description: "Bring focused paid campaigns and relevant website experiences into one conversation, from the first click to the next step.",
				items: [
					"Audience & keyword research",
					"Campaign planning",
					"Message and creative direction",
					"Landing page alignment",
					"Clear campaign priorities",
					"Reporting & refinement",
					"A shared view of marketing activity"
				],
				buttonLabel: "Discuss your campaigns",
				href: "/contact"
			},
			cards: [
				{
					icon: "wordpress-development",
					title: "Audience & keyword research",
					text: "Build campaigns on a clear view of who you are reaching and what they are searching for.",
					tag: "Audience + keywords"
				},
				{
					icon: "sopify-development",
					title: "Campaign planning",
					text: "Shape account structure and priorities around your offer, with coherent messaging across ads.",
					tag: "Structure + priorities"
				},
				{
					icon: "ecommerce-development",
					title: "Landing page alignment",
					text: "Bring the ad promise and the path to conversion into one connected website experience.",
					tag: "Ads + landing pages"
				},
				{
					icon: "custom-website-development",
					title: "Reporting & refinement",
					text: "Translate performance into clear next steps, so spend stays focused on what converts.",
					tag: "Insight + optimisation"
				}
			],
			note: "Not sure which campaigns fit? Start with your goals, audience and landing experiences. We can explore the priorities together."
		},
		showcase: {
			pill: "One connected experience",
			titleLines: ["Different clicks.", "The same clarity."],
			text: "Effective paid media is more than winning the click. It means aligning message, creative and landing pages so every journey feels coherent.",
			panel: {
				label: "CAMPAIGN EXPLORATION",
				note: "Concept · Not client work",
				image: {
					src: serviceShowcaseImage(SLUG),
					alt: "Website layout shown on a laptop and a phone",
					width: 960,
					height: 720
				},
				caption: "Illustrative layout exploration with generated architectural photography."
			},
			items: [
				"Messaging that keeps its promise",
				"Landing pages that feel natural",
				"Calls to action within reach"
			],
			icon: "one-connected-experience-arrow"
		},
		process: {
			pill: "Working together",
			titleLines: ["Good work starts", "with a good partnership."],
			image: {
				src: serviceProcessImage(SLUG),
				alt: "Team members sketching ideas on paper at a wooden table",
				width: 960,
				height: 540
			},
			items: [
				{
					title: "A scope shaped around your needs",
					text: "Agree the channels, campaign priorities and measurement before the work begins. A shared brief keeps paid media focused and makes decisions easier."
				},
				{
					title: "A shared view of the work",
					text: "Bring your offer, landing pages and business goals into the conversation. Review direction together as campaigns take shape."
				},
				{
					title: "A considered handover",
					text: "Discuss reporting, account access and the practical information you need to stay informed. Any ongoing support can be scoped separately."
				}
			],
			note: "A useful starting point: your existing campaigns, your goals, your landing pages and any performance insight you already have."
		},
		faqKey: "ppc-google-ads"
	}
];
function getMainServiceBySlug(slug) {
	return mainServices.find((service) => service.slug === slug);
}
/** Lookup child page href by capability/display name under a main service. */
function getChildHrefByName(mainSlug, name) {
	const child = getMainServiceBySlug(mainSlug)?.children?.find((c) => c.name === name);
	return child ? `/services/${mainSlug}/${child.slug}` : void 0;
}
//#endregion
//#region src/components/ServicesOverview.astro
var $$ServicesOverview = createComponent(($$result, $$props, $$slots) => {
	const overviewToMainSlug = {
		seo: "seo",
		"web-design": "web-design-development",
		"social-media": "social-media-marketing",
		ppc: "ppc-google-ads"
	};
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"background": "dark",
		"aria-labelledby": "services-overview-heading",
		"class": "services-overview section-glow-top-left",
		"data-astro-cid-ai6dlasm": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="so-header" data-reveal="up" data-astro-cid-ai6dlasm><div class="so-header__intro" data-astro-cid-ai6dlasm><p class="pill-dark text-primary m-0" data-astro-cid-ai6dlasm>Our services</p><h2 id="services-overview-heading" class="so-header__heading text-heading-dark dark-section-heading m-0" data-astro-cid-ai6dlasm>Everything You Need to Build a<br data-astro-cid-ai6dlasm>Stronger Digital Presence</h2></div><div class="so-header__aside" data-astro-cid-ai6dlasm><p class="so-header__p1 m-0" data-astro-cid-ai6dlasm>Explore the full picture below. Start with one service or shape a connected programme around your business.</p><p class="so-header__p2 m-0" data-astro-cid-ai6dlasm>Scope and deliverables are shaped together around your priorities.</p></div></div><ul class="so-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-ai6dlasm>${servicesOverview.map((service) => {
		const mainSlug = overviewToMainSlug[service.id];
		const features = service.items.map((label) => {
			const href = mainSlug ? getChildHrefByName(mainSlug, label) : void 0;
			return href ? {
				label,
				href
			} : label;
		});
		return renderTemplate`<li class="so-grid__item" data-reveal="up" data-astro-cid-ai6dlasm>${renderComponent($$result, "ServiceCard", $$ServiceCard, {
			"title": service.title,
			"icon": service.icon,
			"description": service.description,
			"features": features,
			"cta": {
				label: service.buttonLabel,
				href: service.href
			},
			"buttonLabel": service.buttonLabel,
			"buttonIcon": "down",
			"data-astro-cid-ai6dlasm": true
		})}</li>`;
	})}</ul><p class="so-footer m-0" data-astro-cid-ai6dlasm>Four core services. A shared direction. All in one place.</p>` })}`;
}, "C:/Xoomplus/src/components/ServicesOverview.astro", void 0);
//#endregion
//#region src/data/services-detail.ts
/** Detail sections on /our-services. */
var servicesDetail = [{
	layout: "table",
	id: "seo",
	pill: "SEO",
	title: ["Be found for the", "right reasons."],
	intro: "Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth. Our SEO capabilities connect the technical foundations with the content people need.",
	columns: [
		"Capability",
		"What it helps address",
		"Scope to explore"
	],
	rows: [
		{
			capability: "AI SEO (GEO & AEO)",
			helps: "Make useful, clearly structured content easier to understand across evolving search experiences.",
			scope: "Content clarity, question-led structure and search relevance."
		},
		{
			capability: "Local SEO",
			helps: "Help people connect your services with the places you serve.",
			scope: "Local business information, location relevance and local content."
		},
		{
			capability: "Technical SEO",
			helps: "Look beneath the surface at how your website can be found and understood.",
			scope: "Crawlability, indexing, site structure and technical priorities."
		},
		{
			capability: "On-Page SEO",
			helps: "Bring each page into focus around the needs of your audience.",
			scope: "Page titles, headings, internal links and content alignment."
		},
		{
			capability: "Link Building (Off-Page)",
			helps: "Consider how your wider online presence supports search relevance.",
			scope: "Relevant link opportunities and off-page priorities."
		},
		{
			capability: "SEO Audit",
			helps: "Understand the current picture before deciding what to change.",
			scope: "A review of issues, opportunities and a prioritised action plan."
		},
		{
			capability: "SEO Content Marketing",
			helps: "Give your audience useful answers at the moments they need them.",
			scope: "Topic direction, content planning and search-led page content."
		}
	],
	note: "Not sure where search is falling short? An SEO Audit can help clarify which foundations and content deserve attention first."
}, {
	layout: "pair",
	id: "social-paid-media",
	pill: "Social & paid media",
	title: ["The right message. A more", "connected journey."],
	intro: "Connect your message with the right people through thoughtful creative, focused campaigns and continual learning.",
	columns: [{
		id: "social-media",
		eyebrow: "03 / Build the conversation",
		title: "Social Media Marketing",
		text: "Bring consistency and purpose to your social presence. Start with who you want to reach, what you want to say and how it connects to your business.",
		items: [
			{
				title: "Content & creative direction",
				text: "Explore themes, messages and creative that reflect your brand and feel relevant to your audience."
			},
			{
				title: "Campaign planning",
				text: "Give social activity a clear purpose and connect it with the wider marketing conversation."
			},
			{
				title: "Reporting & refinement",
				text: "Review the response to the work and use what you learn to inform the next round of activity."
			}
		]
	}, {
		id: "ppc",
		eyebrow: "04 / Connect intent with action",
		title: "PPC & Google Ads",
		text: "Bring focus to paid activity. Align the audience, the message and the experience after the click, so each campaign has a clear role.",
		items: [
			{
				title: "Audience & keyword research",
				text: "Understand who the campaign is for and the needs or intent that should shape the direction."
			},
			{
				title: "Landing page alignment",
				text: "Make the promise in the campaign and the experience on the website feel like one journey."
			},
			{
				title: "Reporting & refinement",
				text: "Keep campaign decisions grounded in a shared view of the activity and the practical priorities."
			}
		]
	}]
}];
function getServiceDetail(id) {
	const item = servicesDetail.find((entry) => entry.id === id);
	return item?.layout === "table" ? item : void 0;
}
function getServiceDetailPair(id) {
	const item = servicesDetail.find((entry) => entry.id === id);
	return item?.layout === "pair" ? item : void 0;
}
//#endregion
//#region src/components/ServiceDetail.astro
createAstro("https://xoomplus.co.uk");
var $$ServiceDetail = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceDetail;
	const { serviceId } = Astro.props;
	const service = getServiceDetail(serviceId);
	if (!service) throw new Error(`Unknown service detail id: ${serviceId}`);
	const mainSlug = { seo: "seo" }[service.id];
	const headingId = `${service.id}-heading`;
	const [titleLine1, titleLine2] = service.title;
	const [colCapability, colHelps, colScope] = service.columns;
	const caption = `${service.pill} capabilities, what each helps address and the scope to explore`;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": service.id,
		"aria-labelledby": headingId,
		"class": "service-detail",
		"data-astro-cid-ibjroa2p": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="sd-header" data-reveal="up" data-astro-cid-ibjroa2p><div class="sd-header__intro" data-astro-cid-ibjroa2p><p class="pill-light m-0" data-astro-cid-ibjroa2p>${service.pill}</p><h2${addAttribute(headingId, "id")} class="sd-header__heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-ibjroa2p>${titleLine1}<br data-astro-cid-ibjroa2p>${titleLine2}</h2></div><p class="sd-header__aside text-on-light m-0" data-astro-cid-ibjroa2p>${service.intro}</p></div><table class="sd-table" data-astro-cid-ibjroa2p><caption class="sr-only" data-astro-cid-ibjroa2p>${caption}</caption><colgroup data-astro-cid-ibjroa2p><col class="sd-table__col sd-table__col--1" data-astro-cid-ibjroa2p><col class="sd-table__col sd-table__col--2" data-astro-cid-ibjroa2p><col class="sd-table__col sd-table__col--3" data-astro-cid-ibjroa2p></colgroup><thead data-astro-cid-ibjroa2p><tr data-astro-cid-ibjroa2p><th scope="col" data-astro-cid-ibjroa2p>${colCapability}</th><th scope="col" data-astro-cid-ibjroa2p>${colHelps}</th><th scope="col" data-astro-cid-ibjroa2p>${colScope}</th></tr></thead><tbody data-astro-cid-ibjroa2p>${service.rows.map((row) => {
		const href = mainSlug ? getChildHrefByName(mainSlug, row.capability) : void 0;
		return renderTemplate`<tr data-astro-cid-ibjroa2p><th scope="row" data-astro-cid-ibjroa2p>${href ? renderTemplate`<a class="sd-table__capability-link"${addAttribute(href, "href")} data-astro-cid-ibjroa2p>${row.capability}</a>` : row.capability}</th><td${addAttribute(colHelps, "data-label")} data-astro-cid-ibjroa2p>${row.helps}</td><td${addAttribute(colScope, "data-label")} data-astro-cid-ibjroa2p>${row.scope}</td></tr>`;
	})}</tbody></table><div class="sd-note" role="note" data-astro-cid-ibjroa2p><div class="sd-note__content" data-astro-cid-ibjroa2p><p class="sd-note__text m-0" data-astro-cid-ibjroa2p>${service.note}</p></div></div>` })}`;
}, "C:/Xoomplus/src/components/ServiceDetail.astro", void 0);
//#endregion
//#region src/components/ServiceDetailPair.astro
createAstro("https://xoomplus.co.uk");
var $$ServiceDetailPair = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceDetailPair;
	const { serviceId } = Astro.props;
	const service = getServiceDetailPair(serviceId);
	if (!service) throw new Error(`Unknown service detail pair id: ${serviceId}`);
	const columnToMainSlug = {
		"social-media": "social-media-marketing",
		ppc: "ppc-google-ads"
	};
	const headingId = `${service.id}-heading`;
	const [titleLine1, titleLine2] = service.title;
	return renderTemplate`${renderComponent($$result, "Section", $$Section, {
		"id": service.id,
		"background": "dark",
		"aria-labelledby": headingId,
		"class": "service-detail-pair section-glow-top-left",
		"data-astro-cid-hcussjs2": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="sdp-header" data-reveal="up" data-astro-cid-hcussjs2><div class="sdp-header__intro" data-astro-cid-hcussjs2><p class="pill-dark text-primary m-0" data-astro-cid-hcussjs2>${service.pill}</p><h2${addAttribute(headingId, "id")} class="sdp-header__heading text-heading-dark dark-section-heading m-0" data-astro-cid-hcussjs2>${titleLine1}<br data-astro-cid-hcussjs2>${titleLine2}</h2></div><p class="sdp-header__aside m-0" data-astro-cid-hcussjs2>${service.intro}</p></div><div class="sdp-columns" data-reveal-group data-astro-cid-hcussjs2>${service.columns.map((column, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment$1, {}, { "default": ($$result) => renderTemplate`${index > 0 && renderTemplate`<div class="sdp-columns__rule" aria-hidden="true" data-astro-cid-hcussjs2></div>`}<div class="sdp-col"${addAttribute(column.id, "id")} data-reveal="up" data-astro-cid-hcussjs2><p class="sdp-col__eyebrow m-0" data-astro-cid-hcussjs2>${column.eyebrow}</p><h3 class="sdp-col__title m-0" data-astro-cid-hcussjs2>${column.title}</h3><p class="sdp-col__text m-0" data-astro-cid-hcussjs2>${column.text}</p><div class="sdp-col__divider" aria-hidden="true" data-astro-cid-hcussjs2></div><ul class="sdp-col__list m-0 list-none p-0" data-astro-cid-hcussjs2>${column.items.map((item) => {
		const mainSlug = columnToMainSlug[column.id];
		const href = mainSlug ? getChildHrefByName(mainSlug, item.title) : void 0;
		return renderTemplate`<li class="sdp-col__item" data-astro-cid-hcussjs2><h4 class="sdp-col__item-title m-0" data-astro-cid-hcussjs2>${href ? renderTemplate`<a class="sdp-col__item-link"${addAttribute(href, "href")} data-astro-cid-hcussjs2>${item.title}</a>` : item.title}</h4><p class="sdp-col__item-text m-0" data-astro-cid-hcussjs2>${item.text}</p></li>`;
	})}</ul></div>` })}`)}</div>` })}`;
}, "C:/Xoomplus/src/components/ServiceDetailPair.astro", void 0);
//#endregion
//#region src/components/wp-pages/ServicesPage.astro
var $$ServicesPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="page-our-services flex-1">${renderComponent($$result, "PageHero", $$PageHero, { "title": "Our services" })}${renderComponent($$result, "BetterTogether", $$BetterTogether, {})}${renderComponent($$result, "ServicesOverview", $$ServicesOverview, {})}${renderComponent($$result, "ServiceDetail", $$ServiceDetail, { "serviceId": "seo" })}${renderComponent($$result, "ServiceDetailPair", $$ServiceDetailPair, { "serviceId": "social-paid-media" })}${renderComponent($$result, "FAQ", $$FAQ, {
		"page": "our-services",
		"id": "our-services-faq"
	})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>`;
}, "C:/Xoomplus/src/components/wp-pages/ServicesPage.astro", void 0);
//#endregion
//#region src/components/CaseStudiesListingPage.astro
var $$CaseStudiesListingPage = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<main id="main-content" class="flex-1" data-astro-cid-g675bgam>${renderComponent($$result, "PageHero", $$PageHero, {
		"title": "Case studies",
		"data-astro-cid-g675bgam": true
	})}${renderComponent($$result, "Section", $$Section, {
		"aria-labelledby": "case-studies-heading",
		"data-astro-cid-g675bgam": true
	}, { "default": ($$result) => renderTemplate`<div class="cs-listing__header" data-reveal="up" data-astro-cid-g675bgam><div class="cs-listing__intro" data-astro-cid-g675bgam><p class="pill-light" data-astro-cid-g675bgam>Selected work</p><h2 id="case-studies-heading" class="cs-listing__heading text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-g675bgam>Clear challenges.<br data-astro-cid-g675bgam>Considered directions.</h2></div><p class="cs-listing__aside text-on-light" data-astro-cid-g675bgam>Draft examples from our landing-page portfolio. Imagery is illustrative; the directions below are not verified client engagements or performance results.</p></div><ul class="cs-listing__grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-g675bgam>${projects.map((project) => renderTemplate`<li class="cs-listing__item" data-reveal="up" data-astro-cid-g675bgam>${renderComponent($$result, "ProjectCard", $$ProjectCard, {
		"category": project.category,
		"name": project.name,
		"image": project.image,
		"imageAlt": project.imageAlt,
		"imageClass": project.imageClass,
		"tags": project.tags,
		"title": project.title,
		"excerpt": project.excerpt,
		"href": project.href,
		"bordered": true,
		"shiftImage": true,
		"glow": true,
		"data-astro-cid-g675bgam": true
	})}</li>`)}</ul>` })}${renderComponent($$result, "CTASection", $$CTASection, { "data-astro-cid-g675bgam": true })}</main>`;
}, "C:/Xoomplus/src/components/CaseStudiesListingPage.astro", void 0);
//#endregion
//#region src/pages/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://xoomplus.co.uk");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const param = Astro.params.slug;
	const hit = (await getAllWpPageRoutes()).find((r) => r.key !== "home" && param != null && normalizeSeoPath(`/${param}`) === r.route);
	if (!hit) return Astro.rewrite("/404");
	const pageKey = hit.key;
	const seoPath = hit.route;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "seoPath": seoPath }, { "default": ($$result) => renderTemplate`${pageKey === "about" && renderTemplate`${renderComponent($$result, "AboutPage", $$AboutPage, {})}`}${pageKey === "contact" && renderTemplate`${renderComponent($$result, "ContactPage", $$ContactPage, {})}`}${pageKey === "industries" && renderTemplate`${renderComponent($$result, "IndustriesPage", $$IndustriesPage, {})}`}${pageKey === "blogs" && renderTemplate`${renderComponent($$result, "BlogsPage", $$BlogsPage, {})}`}${pageKey === "services" && renderTemplate`${renderComponent($$result, "ServicesPage", $$ServicesPage, {})}`}${pageKey === "caseStudies" && renderTemplate`${renderComponent($$result, "CaseStudiesListingPage", $$CaseStudiesListingPage, {})}`}` })}`;
}, "C:/Xoomplus/src/pages/[slug].astro", void 0);
var $$file = "C:/Xoomplus/src/pages/[slug].astro";
var $$url = "/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
