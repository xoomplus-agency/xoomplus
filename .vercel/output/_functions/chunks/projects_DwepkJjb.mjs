import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { a as $$Button, o as renderScript } from "./BlogCard_D8r-GD5p.mjs";
//#region src/components/ServiceCard.astro
createAstro("https://xoomplus.co.uk");
var $$ServiceCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceCard;
	const { title, icon, description, features, cta, buttonLabel, buttonIcon = "right", price, period, showIcon = true, class: className = "" } = Astro.props;
	const label = buttonLabel ?? cta.label;
	const arrow = buttonIcon === "down" ? "↓" : "→";
	const hasPrice = Boolean(price);
	function featureLabel(feature) {
		return typeof feature === "string" ? feature : feature.label;
	}
	function featureHref(feature) {
		return typeof feature === "string" ? void 0 : feature.href;
	}
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"service-card",
		"flex",
		"h-full",
		"flex-col",
		className
	], "class:list")} data-astro-cid-3vpt37q6>${showIcon ? renderTemplate`<img${addAttribute(icon, "src")} alt="" width="47" height="47" class="mb-5 size-[47px] object-contain" decoding="async" loading="lazy" aria-hidden="true" data-astro-cid-3vpt37q6>` : null}<h3${addAttribute(["text-h3 font-semibold tracking-[-0.02em] text-secondary-white", hasPrice ? "mb-0" : "mb-3"], "class:list")} data-astro-cid-3vpt37q6>${title}</h3>${hasPrice ? renderTemplate`<p class="service-card__price m-0" data-astro-cid-3vpt37q6><span class="service-card__price-amount" data-astro-cid-3vpt37q6>${price}</span>${period ? renderTemplate`<span class="service-card__price-period" data-astro-cid-3vpt37q6>${period}</span>` : null}</p>` : null}<p${addAttribute(["text-small mb-5 text-[var(--text-body-dark)] [font-family:var(--font-inter)]", hasPrice && "mt-3"], "class:list")} data-astro-cid-3vpt37q6>${description}</p><ul class="mb-8 flex flex-1 list-none flex-col gap-2.5 p-0" data-astro-cid-3vpt37q6>${features.map((feature) => {
		const text = featureLabel(feature);
		const href = featureHref(feature);
		return renderTemplate`<li class="service-feature flex items-start gap-2.5 text-[14px] leading-snug [font-family:var(--font-inter)]" data-astro-cid-3vpt37q6><span class="service-check mt-0.5 inline-flex size-[18px] shrink-0 items-center justify-center rounded-full" aria-hidden="true" data-astro-cid-3vpt37q6><svg width="10" height="8" viewBox="0 0 10 8" fill="none" data-astro-cid-3vpt37q6><path d="M1 4l2.5 2.5L9 1" stroke="#0B0A0B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-3vpt37q6></path></svg></span>${href ? renderTemplate`<a class="service-feature__link"${addAttribute(href, "href")} data-astro-cid-3vpt37q6>${text}</a>` : text}</li>`;
	})}</ul><a class="service-card-btn mt-auto"${addAttribute(cta.href, "href")} data-astro-cid-3vpt37q6>${label}<span aria-hidden="true" data-astro-cid-3vpt37q6>${arrow}</span></a></article>`;
}, "C:/Xoomplus/src/components/ServiceCard.astro", void 0);
//#endregion
//#region src/data/services.ts
/** Home page "Our Services" cards — keep content stable for identical output. */
var services = [
	{
		title: "SEO",
		icon: "/icons/service-circles.svg",
		description: "Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.",
		features: [
			"AI SEO (GEO & AEO)",
			"Local SEO",
			"Technical SEO",
			"On-Page SEO",
			"Link Building (Off-Page)",
			"SEO Audit",
			"SEO Content Marketing"
		],
		cta: {
			label: "View Service",
			href: "#services-seo"
		}
	},
	{
		title: "Web Design & Development",
		icon: "/icons/service-layers.svg",
		description: "Create clear, responsive, and purposeful websites designed around your users and business goals.",
		features: [
			"UI/UX Design",
			"Landing Page Design",
			"Website Redesign",
			"WordPress Development",
			"Shopify Development",
			"Ecommerce Development",
			"Custom Website Development"
		],
		cta: {
			label: "View Service",
			href: "#services-web"
		}
	},
	{
		title: "Social Media Marketing",
		icon: "/icons/service-circles.svg",
		description: "Build a stronger brand presence, engage your audience, and drive consistent growth across the platforms that matter.",
		features: [
			"Social Media Strategy",
			"Content Creation",
			"Community Management",
			"Paid Social Advertising",
			"Influencer Campaigns",
			"Analytics & Reporting",
			"Platform Management"
		],
		cta: {
			label: "View Service",
			href: "#services-social"
		}
	},
	{
		title: "PPC & Google Ads",
		icon: "/icons/service-circles.svg",
		description: "Drive qualified traffic and measurable conversions with paid campaigns built around your goals and budget.",
		features: [
			"Google Search Ads",
			"Display Advertising",
			"Remarketing Campaigns",
			"Shopping Ads",
			"YouTube Ads",
			"Landing Page Optimization",
			"Conversion Tracking"
		],
		cta: {
			label: "Get in touch",
			href: "#contact"
		}
	}
];
var helpCard = {
	title: "Not Sure Which Service Is Right for Your Business?",
	description: "Tell us what you are trying to achieve and we can help you identify the right digital service for your needs.",
	cta: {
		label: "Get in touch",
		href: "#contact"
	}
};
/** About page "Our Expertise" — same card shape, reference copy. */
var expertiseServices = [
	{
		title: "SEO",
		icon: "/icons/service-circles.svg",
		description: "Build a stronger search presence with technical thinking, useful content and a clear understanding of your audience.",
		features: [
			"AI SEO (GEO & AEO)",
			"Local SEO",
			"Technical SEO",
			"On-Page SEO",
			"Link Building (Off-Page)",
			"SEO Audit",
			"SEO Content Marketing"
		],
		cta: {
			label: "Explore service",
			href: "/services"
		}
	},
	{
		title: "Web Design & Development",
		icon: "/icons/service-circles.svg",
		description: "Bring brand and function together in websites that feel considered, work intuitively and support your business.",
		features: [
			"Website strategy",
			"User experience & journeys",
			"Interface design",
			"Responsive development",
			"E-commerce experiences",
			"Website content",
			"Ongoing website care"
		],
		cta: {
			label: "Explore service",
			href: "/services"
		}
	},
	{
		title: "Social Media & Paid Ads",
		icon: "/icons/service-circles.svg",
		description: "Connect your message with the right people through thoughtful creative, focused campaigns and continual learning.",
		features: [
			"Social Media Marketing",
			"Content & creative direction",
			"Campaign planning",
			"PPC & Google Ads",
			"Audience & keyword research",
			"Landing page alignment",
			"Reporting & refinement"
		],
		cta: {
			label: "Explore service",
			href: "/services"
		}
	}
];
//#endregion
//#region src/data/process.ts
var defaultProcess = {
	pill: "OUR PROCESS",
	title: "A Clear Process From First Conversation to Ongoing Improvement",
	intro: "We keep the process straightforward so you always know what happens next. From the first conversation through strategy, implementation, and reporting, every stage has a clear purpose.",
	steps: [
		{
			icon: "/icons/discovery-call.svg",
			width: 214,
			height: 190,
			title: "Discovery Call",
			description: "We start by understanding your business, goals, audience, current challenges, and what you want to achieve."
		},
		{
			icon: "/icons/audit-and-opportunity-review.svg",
			width: 214,
			height: 190,
			title: "Audit & Opportunity Review",
			description: "We start by understanding your business, goals, audience, current challenges, and what you want to achieve."
		},
		{
			icon: "/icons/strategy-and-implementation.svg",
			width: 212,
			height: 184,
			title: "Strategy & Implementation",
			description: "We turn the findings into a clear strategy and begin implementing the work across the agreed digital services."
		},
		{
			icon: "/icons/reporting-and-refinement.svg",
			width: 201,
			height: 171,
			title: "Reporting & Refinement",
			description: "We track progress, review performance, and refine the work based on what we learn."
		}
	],
	bgImage: "/icons/our-process-svgs-bg-image.svg"
};
//#endregion
//#region src/components/OurProcess.astro
createAstro("https://xoomplus.co.uk");
var $$OurProcess = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OurProcess;
	const { content = defaultProcess, id = "process" } = Astro.props;
	const { pill, title, intro, steps, bgImage } = content;
	const headingId = `${id}-heading`;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(id, "id")} data-bg="light" class="page-section bg-secondary-white py-section"${addAttribute(headingId, "aria-labelledby")} data-astro-cid-almqthyd><div class="container" data-astro-cid-almqthyd><div class="mx-auto mb-12 w-full text-center lg:mb-16" data-reveal="up" data-astro-cid-almqthyd><p class="pill-light mb-5" data-astro-cid-almqthyd>${pill}</p><h2${addAttribute(headingId, "id")} class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-almqthyd>${title}</h2><p class="process-intro mx-auto max-w-[640px]" data-astro-cid-almqthyd>${intro}</p></div><div class="process-visual" data-astro-cid-almqthyd><img class="process-bg" data-reveal="fade"${addAttribute(bgImage, "src")} alt="" width="1183" height="90" decoding="async" loading="lazy" aria-hidden="true" data-astro-cid-almqthyd><ol class="process-steps m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-almqthyd>${steps.map((step, index) => {
		const iconSrc = step.icon.startsWith("/") ? step.icon : `/icons/${step.icon}.svg`;
		const width = step.width ?? 214;
		const height = step.height ?? 190;
		return renderTemplate`<li${addAttribute(`process-step process-step--${index + 1}`, "class")} data-reveal="up" data-astro-cid-almqthyd><div class="process-icon" aria-hidden="true" data-astro-cid-almqthyd><img${addAttribute(iconSrc, "src")} alt=""${addAttribute(width, "width")}${addAttribute(height, "height")} class="process-icon-img" decoding="async" loading="lazy" data-astro-cid-almqthyd></div><h3 class="process-title m-0" data-astro-cid-almqthyd>${step.title}</h3><p class="process-desc m-0" data-astro-cid-almqthyd>${step.description}</p></li>`;
	})}</ol></div></div></section>`;
}, "C:/Xoomplus/src/components/OurProcess.astro", void 0);
//#endregion
//#region src/components/LocationMap.astro
createAstro("https://xoomplus.co.uk");
var $$LocationMap = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$LocationMap;
	const MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.045703617947!2d73.04037407515959!3d33.65597763855125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95000d84e457%3A0xe13a404eab3f5547!2sXoomplus!5e0!3m2!1sen!2s!4v1791444163528!5m2!1sen!2s";
	const { radius = 20, class: className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["location-map", className], "class:list")}${addAttribute(`--map-radius: ${radius}px`, "style")} data-astro-cid-4eth3l44><iframe${addAttribute(MAP_EMBED_SRC, "src")} title="Xoomplus location map" width="600" height="450" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" data-astro-cid-4eth3l44></iframe></div>`;
}, "C:/Xoomplus/src/components/LocationMap.astro", void 0);
//#endregion
//#region src/components/ContactSection.astro
var $$ContactSection = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="contact" data-bg="light" class="page-section bg-secondary-white py-section" aria-labelledby="contact-heading" data-astro-cid-uukcahgk><div class="contact-grid container" data-astro-cid-uukcahgk><div class="contact-info" data-astro-cid-uukcahgk><div data-reveal="up" data-astro-cid-uukcahgk><h2 id="contact-heading" class="contact-heading m-0 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-uukcahgk><span class="contact-heading__accent" data-astro-cid-uukcahgk>Let's Start</span><br data-astro-cid-uukcahgk>the Conversation</h2><p class="contact-intro text-on-light m-0 mt-4 max-w-[540px]" data-astro-cid-uukcahgk>Tell us what you are looking to achieve and let's discuss how Xoomplus can help with your digital marketing, website, SEO, social media, or paid search needs.</p><ul class="contact-list m-0 list-none p-0" role="list" data-astro-cid-uukcahgk>${[
		{
			icon: "/icons/phone.svg",
			label: "+44 330 010 4786",
			href: "tel:+443300104786"
		},
		{
			icon: "/icons/email.svg",
			label: "info@xoomplus.co.uk",
			href: "mailto:info@xoomplus.co.uk"
		},
		{
			icon: "/icons/location.svg",
			label: "UK: 33 King St, Blackburn BB2 2DH, United Kingdom",
			href: "https://www.google.com/maps/search/?api=1&query=33+King+St,+Blackburn+BB2+2DH"
		}
	].map((item) => renderTemplate`<li class="contact-list__item" data-astro-cid-uukcahgk><span class="contact-list__icon" aria-hidden="true" data-astro-cid-uukcahgk><img${addAttribute(item.icon, "src")} alt="" width="36" height="36" decoding="async" data-astro-cid-uukcahgk></span>${item.href ? renderTemplate`<a class="contact-list__text"${addAttribute(item.href, "href")} data-astro-cid-uukcahgk>${item.label}</a>` : renderTemplate`<span class="contact-list__text" data-astro-cid-uukcahgk>${item.label}</span>`}</li>`)}</ul></div>${renderComponent($$result, "LocationMap", $$LocationMap, {
		"class": "contact-map",
		"radius": 20,
		"data-astro-cid-uukcahgk": true
	})}</div><div class="contact-card" data-astro-cid-uukcahgk><h3 class="contact-card__title m-0" data-astro-cid-uukcahgk>Tell us about your project</h3><p class="contact-card__subtitle m-0" data-astro-cid-uukcahgk>A few details help us understand the right next step.</p><form class="contact-form" id="contact-form" data-contact-form novalidate data-astro-cid-uukcahgk><div class="contact-honeypot" aria-hidden="true" data-astro-cid-uukcahgk><label for="contact-hp-website" data-astro-cid-uukcahgk>Website</label><input type="text" id="contact-hp-website" name="hp_website" tabindex="-1" autocomplete="off" data-astro-cid-uukcahgk></div><div class="contact-field" data-astro-cid-uukcahgk><label for="contact-name" data-astro-cid-uukcahgk>Your name</label><input type="text" id="contact-name" name="name" autocomplete="name" required data-astro-cid-uukcahgk></div><div class="contact-field" data-astro-cid-uukcahgk><label for="contact-company" data-astro-cid-uukcahgk>Company</label><input type="text" id="contact-company" name="company" autocomplete="organization" data-astro-cid-uukcahgk></div><div class="contact-field" data-astro-cid-uukcahgk><label for="contact-email" data-astro-cid-uukcahgk>Email</label><input type="email" id="contact-email" name="email" autocomplete="email" required data-astro-cid-uukcahgk></div><div class="contact-field" data-astro-cid-uukcahgk><label for="contact-phone" data-astro-cid-uukcahgk>Phone</label><input type="tel" id="contact-phone" name="phone" autocomplete="tel" data-astro-cid-uukcahgk></div><div class="contact-field" data-astro-cid-uukcahgk><label for="contact-details" data-astro-cid-uukcahgk>Project Details</label><textarea id="contact-details" name="details" rows="4" data-astro-cid-uukcahgk></textarea></div>${renderComponent($$result, "Button", $$Button, {
		"type": "submit",
		"id": "contact-submit",
		"size": "nav",
		"class": "!w-full",
		"data-astro-cid-uukcahgk": true
	}, { "default": ($$result) => renderTemplate`
					Submit
					<svg class="contact-submit__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-uukcahgk><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-uukcahgk></path></svg>` })}<p class="contact-status" id="contact-status" role="status" aria-live="polite" hidden data-astro-cid-uukcahgk></p></form></div></div></section>${renderScript($$result, "C:/Xoomplus/src/components/ContactSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Xoomplus/src/components/ContactSection.astro", void 0);
//#endregion
//#region src/components/Industries.astro
var $$Industries = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="industries" data-bg="light" class="page-section bg-secondary-white py-section" aria-labelledby="industries-heading" data-astro-cid-blrye27w><div class="container" data-astro-cid-blrye27w><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-blrye27w><p class="pill-light mb-5" data-astro-cid-blrye27w>INDUSTRIES WE SERVE</p><h2 id="industries-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-blrye27w>Digital Solutions Built Around Your Industry</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-blrye27w>Different industries have different audiences, challenges, and digital opportunities. Our services can be tailored around the needs of your business and the people you want to reach.</p></div><ul class="industry-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-blrye27w>${[
		{
			icon: "/icons/home-trade-services.svg",
			title: "Home & Trade Services",
			description: "Local visibility · Quote enquiries"
		},
		{
			icon: "/icons/accounting-and-finance.svg",
			title: "Accounting and Finance",
			description: "Project showcases · Lead generation"
		},
		{
			icon: "/icons/health-and-fitness.svg",
			title: "Health and fitness",
			description: "Search discovery · Appointment bookings"
		},
		{
			icon: "/icons/real-estate.svg",
			title: "Real Estate",
			description: "Product discovery · Online sales"
		},
		{
			icon: "/icons/legal.svg",
			title: "Legal",
			description: "Authority building · Qualified enquiries"
		},
		{
			icon: "/icons/medical-reporting.svg",
			title: "Medical Reporting",
			description: "Local discovery · Direct bookings"
		}
	].map((item) => renderTemplate`<li class="industry-card" data-reveal="up" data-astro-cid-blrye27w><div class="industry-card-icon" aria-hidden="true" data-astro-cid-blrye27w><img${addAttribute(item.icon, "src")} alt="" width="28" height="28" class="size-7 object-contain" decoding="async" loading="lazy" data-astro-cid-blrye27w></div><h3 class="m-0 text-[1.25rem] font-bold tracking-[-0.02em] text-primary-black" data-astro-cid-blrye27w>${item.title}</h3><p class="m-0 text-[15px] leading-[1.5] text-[var(--color-text-on-light)] [font-family:var(--font-inter)]" data-astro-cid-blrye27w>${item.description}</p></li>`)}</ul></div></section>`;
}, "C:/Xoomplus/src/components/Industries.astro", void 0);
//#endregion
//#region src/components/ProjectCard.astro
createAstro("https://xoomplus.co.uk");
var $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectCard;
	const { category, name, image, imageAlt = "", imageClass, tags, title, excerpt, href, metrics, bordered = false, shiftImage = false, shiftBodykite = false, glow = false } = Astro.props;
	const showMetrics = Boolean(metrics && metrics.length >= 2);
	const linkLabel = showMetrics ? `${name} case study` : `View details: ${name}`;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute([
		"case-card",
		bordered && "case-card--bordered",
		shiftImage && "case-card--shift-image",
		shiftBodykite && "case-card--shift-bodykite"
	], "class:list")} data-astro-cid-y2vllrex><a class="case-card-link"${addAttribute(href, "href")}${addAttribute(linkLabel, "aria-label")} data-astro-cid-y2vllrex><div${addAttribute(["case-hero", glow && "project-card--glow"], "class:list")} data-astro-cid-y2vllrex><span class="case-glow" aria-hidden="true" data-astro-cid-y2vllrex></span><div class="case-hero-copy" data-astro-cid-y2vllrex><p class="case-industry m-0" data-astro-cid-y2vllrex>${category}</p><p class="case-hero-title m-0" data-astro-cid-y2vllrex>${name}</p></div><div class="case-hero-media" data-astro-cid-y2vllrex><div class="case-hero-img-wrap" data-astro-cid-y2vllrex><img${addAttribute(image, "src")}${addAttribute(imageAlt, "alt")} width="280" height="150"${addAttribute(["case-hero-img", imageClass], "class:list")} decoding="async" loading="lazy" data-astro-cid-y2vllrex></div></div></div><div class="case-body" data-astro-cid-y2vllrex><ul class="case-categories m-0 flex list-none flex-wrap gap-2 p-0" role="list" data-astro-cid-y2vllrex>${tags.map((tag) => renderTemplate`<li class="case-category" data-astro-cid-y2vllrex>${tag}</li>`)}</ul><h3 class="case-title m-0" data-astro-cid-y2vllrex>${title}</h3><p class="case-desc m-0" data-astro-cid-y2vllrex>${excerpt}</p>${showMetrics && metrics ? renderTemplate`<div class="case-footer" data-astro-cid-y2vllrex><div class="case-metrics" data-astro-cid-y2vllrex><div class="case-metric" data-astro-cid-y2vllrex><p class="case-metric-value m-0" data-astro-cid-y2vllrex>${metrics[0].value}</p><p class="case-metric-label m-0" data-astro-cid-y2vllrex>${metrics[0].label}</p></div><span class="case-metric-sep" aria-hidden="true" data-astro-cid-y2vllrex>|</span><div class="case-metric" data-astro-cid-y2vllrex><p class="case-metric-value m-0" data-astro-cid-y2vllrex>${metrics[1].value}</p><p class="case-metric-label m-0" data-astro-cid-y2vllrex>${metrics[1].label}</p></div></div><span class="case-arrow" aria-hidden="true" data-astro-cid-y2vllrex><svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-astro-cid-y2vllrex><path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-y2vllrex></path></svg></span></div>` : renderTemplate`<div class="case-footer case-footer--details" data-astro-cid-y2vllrex><span class="case-view-details" data-astro-cid-y2vllrex>View Details</span><span class="case-arrow" aria-hidden="true" data-astro-cid-y2vllrex><svg width="18" height="18" viewBox="0 0 18 18" fill="none" data-astro-cid-y2vllrex><path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-y2vllrex></path></svg></span></div>`}</div></a></article>`;
}, "C:/Xoomplus/src/components/ProjectCard.astro", void 0);
//#endregion
//#region src/data/projects.ts
var placeholderTags = ["Social Media", "Web Design"];
var placeholderTitle = "Bodykite | Health and Fitness";
var placeholderExcerpt = "A modern carpentry website designed to generate leads and showcase custom work.";
var homeMetrics = [{
	value: "+180%",
	label: "Organic Traffic"
}, {
	value: "+50",
	label: "Leads / month"
}];
/**
* Shared project data for the home Case Studies section and /case-studies.
* Listing page uses category / tags / title / excerpt / href as defined here.
* Home uses metrics + optional homeCategory / homeTags when present.
*
* Image notes:
* - Bodykite → /images/Bodykite-project.webp
* - Immolibre → /images/Immolibre-project.webp
* - Gopsych → /images/gopsych-project.webp
* - Concise Medico → /images/concisemedico-project.webp
* - Sterling Cooper → /images/sterling-cooper-project.webp
*
* Detail routes /case-studies/<slug> are placeholders until detail pages exist.
*/
var projects = [
	{
		id: "concise-medico",
		slug: "concise-medico",
		category: "Medico-Legal",
		name: "Concise Medico",
		image: "/images/concisemedico-project.webp",
		imageAlt: "Concise Medico website mockup",
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: "/case-studies/concise-medico"
	},
	{
		id: "bodykite",
		slug: "bodykite",
		category: "Health and Fitness",
		name: "Bodykite",
		image: "/images/Bodykite-project.webp",
		imageAlt: "Bodykite website mockup",
		imageClass: "case-hero-img--bodykite",
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: "/case-studies/bodykite",
		homeTags: ["Social Media", "Web Design"],
		metrics: homeMetrics,
		showOnHome: true,
		homeOrder: 2
	},
	{
		id: "gopsych",
		slug: "gopsych",
		category: "Medico-Legal",
		name: "Gopsych",
		image: "/images/gopsych-project.webp",
		imageAlt: "Gopsych website mockup",
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: "/case-studies/gopsych",
		homeCategory: "Psychology Services",
		homeTags: ["Web Design", "SEO"],
		metrics: homeMetrics,
		showOnHome: true,
		homeOrder: 3
	},
	{
		id: "immolibre",
		slug: "immolibre",
		category: "Real Estate Solutions",
		name: "Immolibre",
		image: "/images/Immolibre-project.webp",
		imageAlt: "Immolibre website mockup",
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: "/case-studies/immolibre",
		homeTags: ["Web Design", "SEO"],
		metrics: homeMetrics,
		showOnHome: true,
		homeOrder: 1
	},
	{
		id: "sterling-cooper-consultants",
		slug: "sterling-cooper-consultants",
		category: "Smart Solutions, Secure Better Growth",
		name: "Sterling Cooper Consultants",
		image: "/images/sterling-cooper-project.webp",
		imageAlt: "Sterling Cooper Consultants website mockup",
		imageClass: "project-img--sterling",
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: "/case-studies/sterling-cooper-consultants"
	}
];
/** Home Case Studies section — same three cards, same order as before */
var homeProjects = projects.filter((p) => p.showOnHome).sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
//#endregion
export { $$ContactSection as a, expertiseServices as c, $$ServiceCard as d, $$Industries as i, helpCard as l, projects as n, $$LocationMap as o, $$ProjectCard as r, $$OurProcess as s, homeProjects as t, services as u };
