/**
 * Main service page contract — every service provides the same fixed blocks.
 * Section order and ids live in `src/pages/services/[slug].astro`, not here.
 *
 * Optional future escape hatch (not implemented):
 * // overrides?: { hide?: (...); reorder?: (...) }
 */

import type {
	IndustryClarityColumn,
	IndustryClarityItem,
	IndustryClaritySection,
} from '../industry-clarity';

export type ServiceHeroLink = {
	label: string;
	href: string;
};

export type ServiceHeroMetric = {
	label: string;
	value: string;
};

export type ServiceHeroData = {
	pill: string;
	/** Amber part after the middle dot; defaults to "XoomPlus" in ServiceHero. */
	pillBrand?: string;
	titleLines: [string, string];
	text?: string;
	textParagraphs?: string[];
	primaryButton: ServiceHeroLink;
	secondaryLink: ServiceHeroLink;
	footerLeft: string;
	footerRight: string;
	metricBadges?: [ServiceHeroMetric, ServiceHeroMetric];
	panelLabel: string;
	panelImage: { src: string; alt: string };
	/** Amber plus behind the panel image; defaults in ServiceHero. */
	panelPlus?: string;
	panelCaptions: [string, string, string];
	/** Defaults to "/images/main-services-hero-bg.webp" in ServiceHero. */
	bgImage?: string;
};

export type ServiceFeatureItem = {
	icon: string;
	title: string;
	text: string;
	/** Child service page when this card maps to one. */
	href?: string;
};

/** "Built around people" / "Experience & design" — exactly 3 cards. */
export type ServiceFeaturesData = {
	pill: string;
	titleLines: [string, string];
	text: string;
	items: [ServiceFeatureItem, ServiceFeatureItem, ServiceFeatureItem];
	footnote?: string;
};

export type ServiceBentoMainCard = {
	icon: string;
	title: string;
	description: string;
	items: string[];
	buttonLabel: string;
	href: string;
};

export type ServiceBentoCard = {
	icon: string;
	title: string;
	text: string;
	tag?: string;
	linkLabel?: string;
	/** Child service page when this card maps to one. */
	href?: string;
};

/** Main card + supporting cards, or a card-only capabilities grid. */
export type ServiceBentoData = {
	pill: string;
	title: string;
	text: string;
	mainCard?: ServiceBentoMainCard;
	cards: ServiceBentoCard[];
	note?: string;
};

export type ServiceShowcasePanel = {
	label: string;
	note: string;
	image: { src: string; alt: string; width?: number; height?: number };
	caption: string;
};

/** "One connected experience" — list items rendered with the shared arrow icon. */
export type ServiceShowcaseData = {
	pill: string;
	titleLines: [string, string];
	text: string;
	compactHeading?: boolean;
	/** Skip dark panel chrome (black background / padding). */
	plainPanel?: boolean;
	panel: ServiceShowcasePanel;
	items: string[];
	icon: string;
};

export type ServiceProcessItem = {
	title: string;
	text: string;
};

/** "Working together" — service process steps. */
export type ServiceProcessData = {
	pill: string;
	titleLines: [string, string];
	text?: string;
	image: { src: string; alt: string; width?: number; height?: number };
	items: ServiceProcessItem[];
	itemTextSize?: '18px';
	note?: string;
};

export type ChildServiceHeroData = {
	pill: string;
	titleLines: [string, string];
	/** Lead copy under the H1 — typically 2 or 3 short paragraphs. */
	paragraphs: [string, string] | [string, string, string];
	/**
	 * Optional primary CTA label override.
	 * Default on the page: `Book a ${shortName} Consultation`.
	 */
	buttonLabel?: string;
	image: { src: string; alt: string; width?: number; height?: number };
};

export type ChildClarityItem = IndustryClarityItem;
export type ChildClarityColumn = IndustryClarityColumn;
/** Child-page clarity block — same shape as IndustryClarity. */
export type ChildClarityData = IndustryClaritySection;

/** Name-only stub — kept for mega menu; no page generated when `disabled: true`. */
export type ChildServiceDisabled = {
	slug: string;
	name: string;
	shortName?: string;
	disabled: true;
};

/** Full child page — generated at /services/<main>/<child>. */
export type ChildServiceLive = {
	slug: string;
	name: string;
	/** Short name for hero primary CTA — falls back to `name`. */
	shortName?: string;
	disabled?: false;
	/**
	 * Secondary hero CTA label.
	 * Default: "Explore Our Design Process" (Web Design & Development) or
	 * "Explore Our Process" (other main services).
	 */
	secondaryLabel?: string;
	metaTitle: string;
	metaDescription: string;
	hero: ChildServiceHeroData;
	/** Optional override; falls back to `defaultChildFeatures` on the child page. */
	features?: ServiceFeaturesData;
	/** ChildProcess heading — default: `What Better ${shortName} Can Do for Your Business`. */
	processHeading?: string;
	/** ChildProcess lead copy — placeholder unless overridden per child. */
	processText?: string | string[];
	processPill?: string;
	processPrimaryLabel?: string;
	processSecondaryLabel?: string;
	/** ChildProcess image — else `/images/<slug>-working-together.webp` → collaborative-thinking. */
	processImage?: { src: string; alt: string; width?: number; height?: number };
	/** Optional override; falls back to `defaultChildClarity` on the child page. */
	clarity?: ChildClarityData;
	/** Optional Services behind; falls back to `defaultChildServicesBehind`. */
	servicesBehind?: import('../services-behind').ServicesBehindSection;
	/** Optional FAQ; falls back to `defaultChildFaq` (`faqs['child-service']`). */
	faq?: import('../faqs').FaqSet;
	/** Optional page-specific CTA content; otherwise the shared CTA is used. */
	cta?: {
		pill: string;
		heading: string;
		text: string;
		buttonLabel: string;
		buttonHref?: string;
		/** Optional outline secondary button (e.g. Explore Our Approach). */
		secondaryButtonLabel?: string;
		secondaryButtonHref?: string;
		/** Defaults to mailto:info@xoomplus.co.uk / info@xoomplus.co.uk in CTASection. */
		secondaryLabel?: string;
		secondaryHref?: string;
	};
	/**
	 * Optional "Services" card grid below Working together.
	 * Falls back to shared UI/UX seven-card default until per-child assets exist.
	 * Omit `cards` / empty `cards` to hide the section.
	 */
	services?: import('../child-services').ChildServicesDraft;
	/**
	 * Optional scroll-stack section below Clarity.
	 * Falls back to shared UI/UX five-card default until per-child assets exist.
	 * Omit `cards` / empty `cards` to hide the section.
	 */
	serviceStack?: import('../child-services').ChildServicesDraft;
};

export type ChildService = ChildServiceLive | ChildServiceDisabled;

export function isChildServiceLive(child: ChildService): child is ChildServiceLive {
	return child.disabled !== true;
}

export type MainService = {
	slug: string;
	name: string;
	shortName?: string;
	menuDescription: string;
	metaTitle: string;
	metaDescription: string;
	hero: ServiceHeroData;
	features: ServiceFeaturesData;
	experience: ServiceFeaturesData;
	bento: ServiceBentoData;
	showcase: ServiceShowcaseData;
	process: ServiceProcessData;
	/** Nested pages at /services/<slug>/<child-slug>. */
	children?: ChildService[];
	faqKey?: string;
	// Optional future escape hatch — hide/reorder blocks without forking the template.
	// overrides?: { ... };
};
