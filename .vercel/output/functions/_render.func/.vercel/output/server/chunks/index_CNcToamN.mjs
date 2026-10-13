import { l as getWpPagePath, v as __exportAll } from "./wp-seo_BlJOjkiY.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, j as maybeRenderHead, w as renderComponent } from "./sequence_D_4a4hvD.mjs";
import { t as createComponent } from "./compiler_Bit0EL8V.mjs";
import { a as $$Button, i as $$ButtonOutline, n as $$CTASection, r as $$Layout, t as $$BlogCard } from "./BlogCard_DSwypSUq.mjs";
import { a as getPosts } from "./wp_B1K4Gk81.mjs";
import { a as $$ContactSection, d as $$ServiceCard, i as $$Industries, l as helpCard, r as $$ProjectCard, s as $$OurProcess, t as homeProjects, u as services } from "./projects_BVvrVinc.mjs";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region src/components/Hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section data-bg="dark" class="page-section page-section--flush-top relative isolate flex h-[780px] flex-col justify-center overflow-hidden bg-[#0b0b0b] pb-section pt-[calc(5.5rem+var(--section-padding-y))] text-secondary-white max-[960px]:h-auto max-[960px]:min-h-0" data-astro-cid-ge2uvauf><div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]" aria-hidden="true" data-astro-cid-ge2uvauf><video class="absolute inset-0 z-0 size-full bg-[#0b0b0b] object-cover object-center" autoplay muted loop playsinline preload="auto" data-astro-cid-ge2uvauf><source src="/videos/bg-hero-video.webm" type="video/webm" data-astro-cid-ge2uvauf></video><div class="pointer-events-none absolute inset-0 z-[1] bg-black/[0.85]" aria-hidden="true" data-astro-cid-ge2uvauf></div></div><div class="container container--wide pt-[clamp(1.5rem,4vh,3rem)] text-center" data-astro-cid-ge2uvauf><p class="pill-dark mb-5 text-[#ff9a3c]" data-astro-cid-ge2uvauf>Your All-in-one digital growth partner</p><h1 class="text-hero-h1 mx-auto mb-[0.5em] max-w-[24ch]" data-astro-cid-ge2uvauf>Digital Marketing That Moves Your Business Forward</h1><p class="text-on-dark mx-auto mb-7 max-w-[640px] tracking-[-0.01em]" data-astro-cid-ge2uvauf>We combine SEO, web design and development, social media marketing, and paid search to help businesses build stronger digital experiences, reach the right audience, and create opportunities for growth.</p><div class="flex flex-wrap items-center justify-center gap-x-7 gap-y-5 max-[560px]:flex-col max-[560px]:gap-4" data-astro-cid-ge2uvauf>${renderComponent($$result, "Button", $$Button, {
		"size": "hero",
		"class": "btn-book-call",
		"href": "#contact",
		"data-astro-cid-ge2uvauf": true
	}, { "default": ($$result) => renderTemplate`
				Book a Call
				<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" data-astro-cid-ge2uvauf><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ge2uvauf></path></svg>` })}<a class="text-[0.98rem] font-medium tracking-[-0.01em] text-secondary-white underline decoration-1 underline-offset-[0.28em] hover:opacity-90" href="#case-studies" data-astro-cid-ge2uvauf>View Case Studies</a></div></div><div class="hero-trust container container--wide mt-[clamp(2.5rem,6vh,4rem)] grid w-full grid-cols-4 items-center rounded-[1.35rem] bg-[linear-gradient(180deg,rgb(45_45_45_/_0.4)_0%,rgb(32_32_32_/_0.4)_50%,rgb(46_46_46_/_0.4)_100%)] px-5 py-4 max-[960px]:grid-cols-2 max-[960px]:gap-y-[0.85rem] max-[960px]:p-4 max-[560px]:grid-cols-1" role="list" aria-label="Trust signals" data-astro-cid-ge2uvauf>${[
		{
			id: "partner",
			icon: "/icons/google.svg",
			iconW: 47,
			iconH: 47,
			title: "Google Partner",
			subtitle: "CERTIFIED AGENCY"
		},
		{
			id: "rating",
			icon: "/icons/star.svg",
			iconW: 47,
			iconH: 47,
			ratingValue: "5.0",
			ratingSuffix: "/ 5",
			subtitle: "Rating on Google"
		},
		{
			id: "reviews",
			icon: "/icons/google-reviews.svg",
			iconW: 47,
			iconH: 47,
			title: "Google Reviews",
			subtitle: "100+ REVIEWS",
			stars: 5
		},
		{
			id: "trustpilot",
			icon: "/icons/trustpilot.svg",
			iconW: 47,
			iconH: 47,
			title: "Trustpilot",
			subtitleBefore: "Based on ",
			subtitleLink: "56 reviews"
		}
	].map((item, index) => renderTemplate`<div${addAttribute([
		"flex min-w-0 items-center gap-3 px-[0.85rem] py-[0.35rem]",
		index > 0 && "border-l border-white/14 max-[560px]:border-l-0 max-[560px]:border-t max-[560px]:border-white/10 max-[560px]:pt-[0.85rem]",
		index % 2 === 0 && "max-[960px]:border-l-0",
		index % 2 === 1 && "max-[960px]:border-l max-[960px]:border-white/14",
		index >= 2 && "max-[960px]:border-t max-[960px]:border-white/10 max-[960px]:pt-[0.85rem]"
	], "class:list")} role="listitem" data-astro-cid-ge2uvauf><img${addAttribute(item.icon, "src")} alt=""${addAttribute(item.iconW, "width")}${addAttribute(item.iconH, "height")} class="size-[47px] shrink-0 object-contain" decoding="async" loading="lazy" data-astro-cid-ge2uvauf><div class="min-w-0 text-left" data-astro-cid-ge2uvauf>${item.id === "rating" ? renderTemplate`<p class="m-0 flex items-baseline gap-1 whitespace-nowrap leading-tight max-[560px]:whitespace-normal" data-astro-cid-ge2uvauf><span class="text-[21px] font-semibold tracking-[-0.015em] text-[#F5F5F5]" data-astro-cid-ge2uvauf>${item.ratingValue}</span><span class="text-[12px] font-medium text-[#A7A7A7]" data-astro-cid-ge2uvauf>${item.ratingSuffix}</span></p>` : renderTemplate`<p class="m-0 text-[21px] font-semibold leading-tight tracking-[-0.015em] text-[#F5F5F5] whitespace-nowrap max-[560px]:whitespace-normal" data-astro-cid-ge2uvauf>${item.title}</p>`}${item.id === "reviews" ? renderTemplate`<p class="mt-[0.2rem] flex flex-wrap items-center gap-[0.35rem] text-[12px] font-medium leading-snug tracking-[0.04em] text-[#A7A7A7] whitespace-nowrap max-[560px]:whitespace-normal" data-astro-cid-ge2uvauf><span class="inline-flex gap-0.5" aria-hidden="true" data-astro-cid-ge2uvauf>${Array.from({ length: item.stars }).map(() => renderTemplate`<img src="/icons/star.svg" alt="" width="12" height="12" class="size-3" data-astro-cid-ge2uvauf>`)}</span>${item.subtitle}</p>` : item.id === "trustpilot" ? renderTemplate`<p class="mt-[0.2rem] text-[14px] font-medium leading-snug text-[#FFFFFF] whitespace-nowrap max-[560px]:whitespace-normal" data-astro-cid-ge2uvauf>${item.subtitleBefore}<span class="underline underline-offset-[0.18em]" data-astro-cid-ge2uvauf>${item.subtitleLink}</span></p>` : renderTemplate`<p class="mt-[0.2rem] text-[12px] font-medium leading-snug tracking-[0.04em] text-[#A7A7A7] whitespace-nowrap max-[560px]:whitespace-normal" data-astro-cid-ge2uvauf>${item.subtitle}</p>`}</div></div>`)}</div></section>`;
}, "C:/Xoomplus/src/components/Hero.astro", void 0);
//#endregion
//#region src/components/LogoLoop.tsx
/** @jsxImportSource react */
var ANIMATION_CONFIG = {
	SMOOTH_TAU: .25,
	MIN_COPIES: 2,
	COPY_HEADROOM: 2
};
var toCssLength = (value) => typeof value === "number" ? `${value}px` : value ?? void 0;
var useResizeObserver = (callback, elements, dependencies) => {
	useEffect(() => {
		if (!window.ResizeObserver) {
			const handleResize = () => callback();
			window.addEventListener("resize", handleResize);
			callback();
			return () => window.removeEventListener("resize", handleResize);
		}
		const observers = elements.map((ref) => {
			if (!ref.current) return null;
			const observer = new ResizeObserver(callback);
			observer.observe(ref.current);
			return observer;
		});
		callback();
		return () => {
			observers.forEach((observer) => observer?.disconnect());
		};
	}, [
		callback,
		elements,
		dependencies
	]);
};
var useImageLoader = (seqRef, onLoad, dependencies) => {
	useEffect(() => {
		const images = seqRef.current?.querySelectorAll("img") ?? [];
		if (images.length === 0) {
			onLoad();
			return;
		}
		let remainingImages = images.length;
		const handleImageLoad = () => {
			remainingImages -= 1;
			if (remainingImages === 0) onLoad();
		};
		images.forEach((img) => {
			const htmlImg = img;
			if (htmlImg.complete) handleImageLoad();
			else {
				htmlImg.addEventListener("load", handleImageLoad, { once: true });
				htmlImg.addEventListener("error", handleImageLoad, { once: true });
			}
		});
		return () => {
			images.forEach((img) => {
				img.removeEventListener("load", handleImageLoad);
				img.removeEventListener("error", handleImageLoad);
			});
		};
	}, [
		onLoad,
		seqRef,
		dependencies
	]);
};
var useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
	const rafRef = useRef(null);
	const lastTimestampRef = useRef(null);
	const offsetRef = useRef(0);
	const velocityRef = useRef(0);
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const seqSize = isVertical ? seqHeight : seqWidth;
		if (seqSize <= 0) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			track.style.transform = "translate3d(0, 0, 0)";
			return;
		}
		offsetRef.current = (offsetRef.current % seqSize + seqSize) % seqSize;
		track.style.transform = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
		const animate = (timestamp) => {
			if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
			const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1e3;
			lastTimestampRef.current = timestamp;
			const target = isHovered && hoverSpeed !== void 0 ? hoverSpeed : targetVelocity;
			const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
			velocityRef.current += (target - velocityRef.current) * easingFactor;
			let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
			nextOffset = (nextOffset % seqSize + seqSize) % seqSize;
			offsetRef.current = nextOffset;
			track.style.transform = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
			rafRef.current = requestAnimationFrame(animate);
		};
		rafRef.current = requestAnimationFrame(animate);
		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
			lastTimestampRef.current = null;
		};
	}, [
		targetVelocity,
		seqWidth,
		seqHeight,
		isHovered,
		hoverSpeed,
		isVertical,
		trackRef
	]);
};
var LogoLoop = memo(({ logos, speed = 120, direction = "left", width = "100%", logoHeight = 28, gap = 32, pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor, scaleOnHover = false, renderItem, ariaLabel = "Partner logos", className, style }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const seqRef = useRef(null);
	const [seqWidth, setSeqWidth] = useState(0);
	const [seqHeight, setSeqHeight] = useState(0);
	const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
	const [isHovered, setIsHovered] = useState(false);
	const effectiveHoverSpeed = useMemo(() => {
		if (hoverSpeed !== void 0) return hoverSpeed;
		if (pauseOnHover === true) return 0;
		if (pauseOnHover === false) return void 0;
		return 0;
	}, [hoverSpeed, pauseOnHover]);
	const isVertical = direction === "up" || direction === "down";
	const targetVelocity = useMemo(() => {
		const magnitude = Math.abs(speed);
		let directionMultiplier;
		if (isVertical) directionMultiplier = direction === "up" ? 1 : -1;
		else directionMultiplier = direction === "left" ? 1 : -1;
		const speedMultiplier = speed < 0 ? -1 : 1;
		return magnitude * directionMultiplier * speedMultiplier;
	}, [
		speed,
		direction,
		isVertical
	]);
	const updateDimensions = useCallback(() => {
		const measure = () => {
			const containerWidth = containerRef.current?.clientWidth ?? 0;
			const sequenceEl = seqRef.current;
			const sequenceRect = sequenceEl?.getBoundingClientRect?.();
			const sequenceWidth = Math.max(sequenceRect?.width ?? 0, sequenceEl?.scrollWidth ?? 0);
			const sequenceHeight = Math.max(sequenceRect?.height ?? 0, sequenceEl?.scrollHeight ?? 0);
			if (isVertical) {
				const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
				if (containerRef.current && parentHeight > 0) {
					const targetHeight = Math.ceil(parentHeight);
					if (containerRef.current.style.height !== `${targetHeight}px`) containerRef.current.style.height = `${targetHeight}px`;
				}
				if (sequenceHeight > 0) {
					setSeqHeight(Math.ceil(sequenceHeight));
					const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
					const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
					setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
				}
			} else if (sequenceWidth > 0) {
				setSeqWidth(Math.ceil(sequenceWidth));
				const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
				setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
			}
		};
		requestAnimationFrame(() => {
			requestAnimationFrame(measure);
		});
	}, [isVertical]);
	useResizeObserver(updateDimensions, [containerRef, seqRef], [
		logos,
		gap,
		logoHeight,
		isVertical
	]);
	useImageLoader(seqRef, updateDimensions, [
		logos,
		gap,
		logoHeight,
		isVertical
	]);
	useEffect(() => {
		updateDimensions();
	}, [
		updateDimensions,
		logos,
		gap,
		logoHeight
	]);
	useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);
	const cssVariables = useMemo(() => ({
		"--logoloop-gap": `${gap}px`,
		"--logoloop-logoHeight": `${logoHeight}px`,
		...fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }
	}), [
		gap,
		logoHeight,
		fadeOutColor
	]);
	const rootClassName = useMemo(() => [
		"logoloop",
		isVertical ? "logoloop--vertical" : "logoloop--horizontal",
		fadeOut && "logoloop--fade",
		scaleOnHover && "logoloop--scale-hover",
		className
	].filter(Boolean).join(" "), [
		isVertical,
		fadeOut,
		scaleOnHover,
		className
	]);
	const handleMouseEnter = useCallback(() => {
		if (effectiveHoverSpeed !== void 0) setIsHovered(true);
	}, [effectiveHoverSpeed]);
	const handleMouseLeave = useCallback(() => {
		if (effectiveHoverSpeed !== void 0) setIsHovered(false);
	}, [effectiveHoverSpeed]);
	const renderLogoItem = useCallback((item, key) => {
		if (renderItem) return /* @__PURE__ */ jsx("li", {
			className: "logoloop__item",
			role: "listitem",
			children: renderItem(item, key)
		}, key);
		const isNodeItem = "node" in item;
		const content = isNodeItem ? /* @__PURE__ */ jsx("span", {
			className: "logoloop__node",
			"aria-hidden": !!item.href && !item.ariaLabel,
			children: item.node
		}) : /* @__PURE__ */ jsx("img", {
			src: item.src,
			srcSet: item.srcSet,
			sizes: item.sizes,
			width: item.width,
			height: item.height,
			alt: item.alt ?? "",
			title: item.title,
			loading: "eager",
			decoding: "async",
			draggable: false
		});
		const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;
		const itemContent = item.href ? /* @__PURE__ */ jsx("a", {
			className: "logoloop__link",
			href: item.href,
			"aria-label": itemAriaLabel || "logo link",
			target: "_blank",
			rel: "noreferrer noopener",
			children: content
		}) : content;
		return /* @__PURE__ */ jsx("li", {
			className: "logoloop__item",
			role: "listitem",
			children: itemContent
		}, key);
	}, [renderItem]);
	const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => /* @__PURE__ */ jsx("ul", {
		className: "logoloop__list",
		role: "list",
		"aria-hidden": copyIndex > 0,
		ref: copyIndex === 0 ? seqRef : void 0,
		children: logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))
	}, `copy-${copyIndex}`)), [
		copyCount,
		logos,
		renderLogoItem
	]);
	const containerStyle = useMemo(() => ({
		width: isVertical ? toCssLength(width) === "100%" ? void 0 : toCssLength(width) : toCssLength(width) ?? "100%",
		...cssVariables,
		...style
	}), [
		width,
		cssVariables,
		style,
		isVertical
	]);
	return /* @__PURE__ */ jsx("div", {
		ref: containerRef,
		className: rootClassName,
		style: containerStyle,
		role: "region",
		"aria-label": ariaLabel,
		children: /* @__PURE__ */ jsx("div", {
			className: "logoloop__track",
			ref: trackRef,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			children: logoLists
		})
	});
});
LogoLoop.displayName = "LogoLoop";
//#endregion
//#region src/components/Brands.astro
var $$Brands = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section data-bg="light" class="page-section overflow-x-clip bg-secondary-white py-section" aria-labelledby="brands-heading" data-astro-cid-sjvofkio><div class="container container--wide text-center" data-astro-cid-sjvofkio><div data-reveal="up" data-astro-cid-sjvofkio><h2 id="brands-heading" class="text-h2 mb-[0.5em] font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-sjvofkio>Brands That Believe in Us</h2><p class="text-on-light mx-auto mb-11 max-w-[640px]" data-astro-cid-sjvofkio>Illustrated stand-ins: logos, review counts, quotes, screens and photos are examples to swap for real client assets at launch.</p></div><div class="brands-logo-loop mx-auto w-full max-w-full" data-astro-cid-sjvofkio>${renderComponent($$result, "LogoLoop", LogoLoop, {
		"client:load": true,
		"logos": [
			{
				src: "/images/brand-concisemedico.webp",
				alt: "ConciseMedico",
				width: 300,
				height: 68
			},
			{
				src: "/images/brand-sterling-cooper.webp",
				alt: "Sterling Cooper Consultants Ltd.",
				width: 300,
				height: 68
			},
			{
				src: "/images/brand-bodykite.webp",
				alt: "Bodykite",
				width: 300,
				height: 68
			},
			{
				src: "/images/brand-gopsych.webp",
				alt: "Go Psych",
				width: 300,
				height: 68
			}
		],
		"speed": 70,
		"direction": "left",
		"logoHeight": 68,
		"gap": 56,
		"hoverSpeed": 0,
		"fadeOut": true,
		"fadeOutColor": "#FFFFFF",
		"scaleOnHover": false,
		"ariaLabel": "Xoomplus clients and technology partners",
		"data-astro-cid-sjvofkio": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Xoomplus/src/components/LogoLoop.tsx",
		"client:component-export": "default"
	})}</div></div></section>`;
}, "C:/Xoomplus/src/components/Brands.astro", void 0);
//#endregion
//#region src/components/Services.astro
var $$Services = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="services" data-bg="dark" class="page-section services relative isolate overflow-hidden bg-[#0B0A0B] py-section text-secondary-white" aria-labelledby="services-heading" data-astro-cid-lesv7jgp><div class="services-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" data-astro-cid-lesv7jgp></div><div class="relative container" data-astro-cid-lesv7jgp><div class="mx-auto mb-12 w-full text-center lg:mb-14" data-reveal="up" data-astro-cid-lesv7jgp><p class="pill-dark mb-5 text-primary" data-astro-cid-lesv7jgp>OUR SERVICES</p><h2 id="services-heading" class="text-heading-dark mb-4" data-astro-cid-lesv7jgp>Everything You Need to Build a Stronger Digital Presence</h2><p class="mx-auto max-w-[640px] text-lead font-normal leading-[1.55] text-[var(--text-body-dark)] [font-family:var(--font-inter)]" data-astro-cid-lesv7jgp>${"From search visibility to website experiences and social campaigns, Xoomplus brings key digital services together to help your business reach, engage, and the right audience."}</p></div><div class="services-grid" data-reveal-group data-astro-cid-lesv7jgp>${services.map((service) => renderTemplate`<div data-reveal="up" data-astro-cid-lesv7jgp>${renderComponent($$result, "ServiceCard", $$ServiceCard, {
		"title": service.title,
		"icon": service.icon,
		"description": service.description,
		"features": service.features,
		"cta": service.cta,
		"data-astro-cid-lesv7jgp": true
	})}</div>`)}<article class="service-card service-card--help flex h-full flex-col justify-between text-center" data-reveal="up" data-astro-cid-lesv7jgp><div class="flex flex-1 flex-col items-center justify-center px-2 py-6" data-astro-cid-lesv7jgp><h3 class="text-h3 mb-4 font-semibold tracking-[-0.02em] text-secondary-white" data-astro-cid-lesv7jgp>${helpCard.title}</h3><p class="text-small mx-auto max-w-[320px] text-[var(--text-body-dark)] [font-family:var(--font-inter)]" data-astro-cid-lesv7jgp>${helpCard.description}</p></div><a class="service-card-btn"${addAttribute(helpCard.cta.href, "href")} data-astro-cid-lesv7jgp>${helpCard.cta.label}<span aria-hidden="true" data-astro-cid-lesv7jgp>→</span></a></article></div><div class="services-cta-bar mt-8 flex flex-col items-center justify-between gap-5 rounded-[1.25rem] bg-[rgb(255_255_255_/_0.06)] px-6 py-5 sm:flex-row sm:px-8" data-astro-cid-lesv7jgp><p class="text-h3-sm m-0 text-center font-semibold tracking-[-0.01em] text-[var(--text-body-dark)] sm:text-left" data-astro-cid-lesv7jgp>Ready to find the right service for your business?</p>${renderComponent($$result, "Button", $$Button, {
		"size": "nav",
		"href": "#contact",
		"data-astro-cid-lesv7jgp": true
	}, { "default": ($$result) => renderTemplate`Get in touch` })}</div></div></section>`;
}, "C:/Xoomplus/src/components/Services.astro", void 0);
//#endregion
//#region src/components/OurGrowth.astro
var $$OurGrowth = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="growth" data-bg="dark" class="page-section growth relative isolate overflow-hidden py-section" aria-labelledby="growth-heading" data-astro-cid-upqucldu><div class="growth-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" data-astro-cid-upqucldu></div><div class="relative container" data-astro-cid-upqucldu><div data-reveal="up" data-astro-cid-upqucldu><p class="growth-pill mb-5" data-astro-cid-upqucldu>OUR GROWTH</p><div class="growth-header" data-astro-cid-upqucldu><h2 id="growth-heading" class="text-heading-dark growth-heading m-0" data-astro-cid-upqucldu>Everything You Need to Build a Stronger Digital<br data-astro-cid-upqucldu>Presence</h2><p class="growth-intro m-0" data-astro-cid-upqucldu>Every number here reflects our journey helping<br data-astro-cid-upqucldu>tech companies grow smarter and faster.</p></div></div><ul class="growth-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-upqucldu>${[
		{
			value: "50+",
			label: "Projects Done",
			icon: "/icons/projects-done.svg"
		},
		{
			value: "2K+",
			label: "Happy Clients",
			icon: "/icons/happy-clients.svg"
		},
		{
			value: "25+",
			label: "Team Members",
			icon: "/icons/team-members.svg"
		}
	].map((stat) => renderTemplate`<li class="growth-card" data-reveal="up" data-astro-cid-upqucldu><div class="growth-card-copy" data-astro-cid-upqucldu><p class="growth-stat m-0" data-astro-cid-upqucldu>${stat.value}</p><p class="growth-label m-0" data-astro-cid-upqucldu>${stat.label}</p></div><img class="growth-card-icon"${addAttribute(stat.icon, "src")} alt="" width="66" height="64" decoding="async" loading="lazy" data-astro-cid-upqucldu></li>`)}</ul></div></section>`;
}, "C:/Xoomplus/src/components/OurGrowth.astro", void 0);
//#endregion
//#region src/data/why-xoomplus.ts
/** Home page Why Xoomplus — word for word from the previous hardcoded section. */
var defaultWhyXoomplus = {
	id: "why-xoomplus",
	pill: "WHY XOOMPLUS",
	title: "A Digital Partner Focused on Your Business Goals",
	text: "Your digital presence should do more than look good. We bring strategy, creativity, technology, and performance together to create digital experiences that support your business objectives.",
	cards: [
		{
			icon: "/icons/strategy-first.svg",
			title: "Strategy First",
			text: "We start with your goals, audience, and opportunities before moving into execution."
		},
		{
			icon: "/icons/experienced-team.svg",
			title: "Experienced Team",
			text: "Bring together the expertise needed across design, development, SEO, social media, and digital marketing."
		},
		{
			icon: "/icons/clear-reporting.svg",
			title: "Clear Reporting",
			text: "Understand what is being worked on, what is changing, and where opportunities are developing."
		},
		{
			icon: "/icons/tailored-strategies.svg",
			title: "Tailored Strategies",
			text: "Your business is different, so your digital strategy should be built around your specific needs."
		},
		{
			icon: "/icons/result-focused.svg",
			title: "Results Focused",
			text: "Keep the work connected to meaningful business objectives rather than activity alone."
		},
		{
			icon: "/icons/long-term-growth.svg",
			title: "Long-Term Growth",
			text: "Build digital foundations that can continue to improve as your business grows."
		}
	],
	button: {
		label: "Let’s Talk",
		href: "#contact"
	}
};
//#endregion
//#region src/components/WhyXoomplus.astro
createAstro("https://xoomplus.co.uk");
var $$WhyXoomplus = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WhyXoomplus;
	const { content = defaultWhyXoomplus, id, buttonWidth } = Astro.props;
	const sectionId = id ?? content.id;
	const headingId = content.id === "why-xoomplus" ? "why-heading" : `${content.id}-heading`;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(sectionId, "id")} data-bg="light" class="page-section bg-secondary-white py-section"${addAttribute(headingId, "aria-labelledby")} data-astro-cid-itt4xm6v><div class="container" data-astro-cid-itt4xm6v><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-itt4xm6v><p class="pill-light mb-5" data-astro-cid-itt4xm6v>${content.pill}</p><h2${addAttribute(headingId, "id")} class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-itt4xm6v>${content.title}</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-itt4xm6v>${content.text}</p></div><ul class="why-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-itt4xm6v>${content.cards.map((item) => renderTemplate`<li class="why-card" data-reveal="up" data-astro-cid-itt4xm6v><div class="why-card-icon" aria-hidden="true" data-astro-cid-itt4xm6v><img${addAttribute(item.icon, "src")} alt="" width="28" height="28" class="size-7 object-contain" decoding="async" loading="lazy" data-astro-cid-itt4xm6v></div><h3 class="m-0 text-[1.25rem] font-bold tracking-[-0.02em] text-primary-black" data-astro-cid-itt4xm6v>${item.title}</h3><p class="m-0 text-[15px] leading-[1.5] text-[var(--color-text-on-light)] [font-family:var(--font-inter)]" data-astro-cid-itt4xm6v>${item.text}</p></li>`)}</ul>${content.button ? renderTemplate`<div class="mt-12 flex justify-center lg:mt-14"${addAttribute(buttonWidth ? `--why-btn-width: ${buttonWidth}` : void 0, "style")} data-astro-cid-itt4xm6v>${renderComponent($$result, "Button", $$Button, {
		"size": buttonWidth ? "default" : "nav",
		"href": content.button.href,
		"class": buttonWidth ? "why-xoomplus__btn" : void 0,
		"data-astro-cid-itt4xm6v": true
	}, { "default": ($$result) => renderTemplate`${content.button.label}` })}</div>` : null}</div></section>`;
}, "C:/Xoomplus/src/components/WhyXoomplus.astro", void 0);
//#endregion
//#region src/components/CaseStudies.astro
var $$CaseStudies = createComponent(async ($$result, $$props, $$slots) => {
	const caseStudiesHref = await getWpPagePath("caseStudies");
	return renderTemplate`${maybeRenderHead($$result)}<section id="case-studies" data-bg="light" class="page-section case-studies bg-secondary-white py-section" aria-labelledby="case-studies-heading" data-astro-cid-6uufqrtv><div class="container" data-astro-cid-6uufqrtv><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-6uufqrtv><p class="pill-light mb-5" data-astro-cid-6uufqrtv>Case Studies</p><h2 id="case-studies-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-6uufqrtv>Real Projects. Clear Challenges. Measurable Outcomes.</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-6uufqrtv>${"Your digital presence should do more than look good. We bring strategy, creativity, technology, and performance together to create digital experiences that support your business objectives."}</p></div><ul class="case-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-6uufqrtv>${homeProjects.map((project) => {
		const category = project.homeCategory ?? project.category;
		const tags = project.homeTags ?? project.tags;
		const title = `${project.name} | ${category}`;
		return renderTemplate`<li class="case-grid__item" data-reveal="up" data-astro-cid-6uufqrtv>${renderComponent($$result, "ProjectCard", $$ProjectCard, {
			"category": category,
			"name": project.name,
			"image": project.image,
			"imageAlt": "",
			"imageClass": project.imageClass,
			"tags": tags,
			"title": title,
			"excerpt": project.excerpt,
			"href": "#case-studies",
			"metrics": project.metrics,
			"shiftBodykite": project.id === "bodykite",
			"data-astro-cid-6uufqrtv": true
		})}</li>`;
	})}</ul><div class="mt-12 flex justify-center lg:mt-14" data-astro-cid-6uufqrtv>${renderComponent($$result, "Button", $$Button, {
		"href": caseStudiesHref,
		"data-astro-cid-6uufqrtv": true
	}, { "default": ($$result) => renderTemplate`View All Case Studies` })}</div></div></section>`;
}, "C:/Xoomplus/src/components/CaseStudies.astro", void 0);
//#endregion
//#region src/components/Testimonials.astro
var $$Testimonials = createComponent(($$result, $$props, $$slots) => {
	const sampleText = "Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it. Farther be chapter at visited married in it pressed. By distrusts procuring be oh frankness existence believing instantly if. Doubtful on an juvenile as of servants insisted.";
	const testimonials = [
		{
			name: "Sophia Moore",
			role: "CEO at Webflow Agency",
			text: sampleText,
			avatar: "/images/avatar.webp"
		},
		{
			name: "Sophia Moore",
			role: "CEO at Webflow Agency",
			text: sampleText,
			avatar: "/images/avatar.webp"
		},
		{
			name: "Sophia Moore",
			role: "CEO at Webflow Agency",
			text: sampleText,
			avatar: "/images/avatar.webp"
		},
		{
			name: "Sophia Moore",
			role: "CEO at Webflow Agency",
			text: sampleText,
			avatar: "/images/avatar.webp"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<section id="testimonials" data-bg="light" class="page-section bg-secondary-white py-section" aria-labelledby="testimonials-heading" data-astro-cid-gakqr736><div class="container" data-astro-cid-gakqr736><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-gakqr736><p class="pill-light mb-5" data-astro-cid-gakqr736>TESTIMONIALS</p><h2 id="testimonials-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-gakqr736>What Our Clients Say</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-gakqr736>Hear directly from the businesses we work with about their experience working with Xoomplus.</p></div><div class="testimonials-marquee infinite-marquee" style="--marquee-duration: 50s; --marquee-gap: 24px;" role="region" aria-label="Client testimonials" data-reveal="fade" data-astro-cid-gakqr736><div class="infinite-marquee__track" data-astro-cid-gakqr736>${[false, true].map((isClone) => renderTemplate`<ul class="infinite-marquee__group" role="list"${addAttribute(isClone ? "true" : void 0, "aria-hidden")} data-astro-cid-gakqr736>${testimonials.map((item) => renderTemplate`<li class="testimonial-card" data-astro-cid-gakqr736><img class="testimonial-card__logo" src="/images/testimonials-gogle.webp"${addAttribute(isClone ? "" : "Google Reviews", "alt")} width="106" height="53" decoding="async" loading="lazy" data-astro-cid-gakqr736><div class="testimonial-card__quote" data-astro-cid-gakqr736><span class="testimonial-card__mark testimonial-card__mark--open" aria-hidden="true" data-astro-cid-gakqr736>“</span><p class="testimonial-card__text" data-astro-cid-gakqr736>${item.text}</p><span class="testimonial-card__mark testimonial-card__mark--close" aria-hidden="true" data-astro-cid-gakqr736>”</span></div><div class="testimonial-card__author" data-astro-cid-gakqr736><img class="testimonial-card__avatar"${addAttribute(item.avatar, "src")} alt="" width="36" height="36" decoding="async" loading="lazy" data-astro-cid-gakqr736><p class="testimonial-card__name" data-astro-cid-gakqr736>${item.name}</p><p class="testimonial-card__role" data-astro-cid-gakqr736>${item.role}</p></div></li>`)}</ul>`)}</div></div></div></section>`;
}, "C:/Xoomplus/src/components/Testimonials.astro", void 0);
//#endregion
//#region src/components/Blogs.astro
var $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
	const posts = await getPosts({ perPage: 3 });
	return renderTemplate`${maybeRenderHead($$result)}<section id="blogs" data-bg="light" class="page-section bg-secondary-white py-section" aria-labelledby="blogs-heading" data-astro-cid-jzdwe7h2><div class="container" data-astro-cid-jzdwe7h2><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-jzdwe7h2><p class="pill-light mb-5" data-astro-cid-jzdwe7h2>Blogs</p><h2 id="blogs-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-jzdwe7h2>Insights to Help You Navigate Digital Growth</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-jzdwe7h2>Hear directly from the businesses we work with about their experience working with Xoomplus.</p></div><ul class="blogs-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-jzdwe7h2>${posts.map((post) => renderTemplate`<li class="blogs-grid__item" data-reveal="up" data-astro-cid-jzdwe7h2>${renderComponent($$result, "BlogCard", $$BlogCard, {
		"headingLevel": "h2",
		"post": post,
		"image": post.image?.src ?? "/images/1st.webp",
		"alt": post.image?.alt ?? post.title,
		"srcset": post.image?.srcset,
		"width": post.image?.width ?? 400,
		"height": post.image?.height ?? 240,
		"category": post.category,
		"title": post.title,
		"excerpt": post.excerpt,
		"data-astro-cid-jzdwe7h2": true
	})}</li>`)}</ul><div class="mt-10 flex justify-center" data-astro-cid-jzdwe7h2>${renderComponent($$result, "Button", $$Button, {
		"size": "nav",
		"class": "!w-[220px]",
		"href": "/blogs",
		"data-astro-cid-jzdwe7h2": true
	}, { "default": ($$result) => renderTemplate`Read all` })}</div></div></section>`;
}, "C:/Xoomplus/src/components/Blogs.astro", void 0);
//#endregion
//#region src/components/OurLocations.astro
var $$OurLocations = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section id="locations" data-bg="light" class="page-section bg-secondary-white py-section" aria-labelledby="locations-heading" data-astro-cid-cjw4daaa><div class="container" data-astro-cid-cjw4daaa><div class="mx-auto mb-12 max-w-[820px] text-center lg:mb-14" data-reveal="up" data-astro-cid-cjw4daaa><p class="pill-light mb-5" data-astro-cid-cjw4daaa>OUR LOCATIONS</p><h2 id="locations-heading" class="mb-4 text-h2 font-semibold tracking-[-0.02em] text-primary-black" data-astro-cid-cjw4daaa>Based in Blackburn Working across Manchester.</h2><p class="text-on-light mx-auto max-w-[640px]" data-astro-cid-cjw4daaa>Different industries have different audiences, challenges, and digital opportunities. Our services can be tailored around the needs of your business and the people you want to reach.</p></div><ul class="locations-grid m-0 list-none p-0" role="list" data-reveal-group data-astro-cid-cjw4daaa>${[{
		slug: "manchester",
		title: "Manchester",
		image: "/images/manchester-1.webp",
		alt: "Aerial view of the Manchester city skyline",
		items: [
			"SEO Manchester",
			"Web Design Manchester",
			"PPC Manchester",
			"Social Media Manchester"
		]
	}, {
		slug: "blackburn",
		title: "Blackburn",
		image: "/images/manchester-2.webp",
		alt: "Green hills and countryside near Blackburn",
		items: [
			"SEO Blackburn",
			"Web Design Blackburn",
			"PPC Blackburn",
			"Social Media Blackburn"
		]
	}].map((location) => {
		const href = `/locations/${location.slug}`;
		return renderTemplate`<li class="location-card card-hover" data-reveal="up" data-astro-cid-cjw4daaa><div class="location-card-media" data-astro-cid-cjw4daaa><img${addAttribute(location.image, "src")}${addAttribute(location.alt, "alt")} width="320" height="280" class="location-card-img" decoding="async" loading="lazy" data-astro-cid-cjw4daaa></div><div class="location-card-body" data-astro-cid-cjw4daaa><div class="location-card-copy" data-astro-cid-cjw4daaa><h3 class="location-card-title m-0" data-astro-cid-cjw4daaa>${location.title}</h3><ul class="location-list m-0 list-none p-0" role="list" data-astro-cid-cjw4daaa>${location.items.map((item) => renderTemplate`<li class="location-list-item" data-astro-cid-cjw4daaa><span class="location-check" aria-hidden="true" data-astro-cid-cjw4daaa><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-cjw4daaa><circle cx="9" cy="9" r="9" fill="#FFA800" data-astro-cid-cjw4daaa></circle><path d="M5.25 9.25L7.75 11.75L12.75 6.5" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-cjw4daaa></path></svg></span><span data-astro-cid-cjw4daaa>${item}</span></li>`)}</ul></div>${renderComponent($$result, "ButtonOutline", $$ButtonOutline, {
			"class": "w-full location-card-link",
			"href": href,
			"data-astro-cid-cjw4daaa": true
		}, { "default": ($$result) => renderTemplate`<span data-astro-cid-cjw4daaa>View Details</span><svg class="btn-outline__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-astro-cid-cjw4daaa><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-cjw4daaa></path></svg>` })}</div></li>`;
	})}</ul></div></section>`;
}, "C:/Xoomplus/src/components/OurLocations.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="page-home flex-1">${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "Brands", $$Brands, {})}${renderComponent($$result, "Services", $$Services, {})}${renderComponent($$result, "WhyXoomplus", $$WhyXoomplus, {})}${renderComponent($$result, "OurProcess", $$OurProcess, {})}${renderComponent($$result, "OurGrowth", $$OurGrowth, {})}${renderComponent($$result, "CaseStudies", $$CaseStudies, {})}${renderComponent($$result, "Industries", $$Industries, {})}${renderComponent($$result, "OurLocations", $$OurLocations, {})}${renderComponent($$result, "Testimonials", $$Testimonials, {})}${renderComponent($$result, "Blogs", $$Blogs, {})}<!-- <FAQ page="home" /> -->${renderComponent($$result, "ContactSection", $$ContactSection, {})}${renderComponent($$result, "CTASection", $$CTASection, {})}</main>` })}`;
}, "C:/Xoomplus/src/pages/index.astro", void 0);
var $$file = "C:/Xoomplus/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
