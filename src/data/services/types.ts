/**
 * Main service page contract — every service provides the same fixed blocks.
 * Section order and ids live in `src/pages/services/[slug].astro`, not here.
 *
 * Optional future escape hatch (not implemented):
 * // overrides?: { hide?: (...); reorder?: (...) }
 */

export type ServiceHeroLink = {
	label: string;
	href: string;
};

export type ServiceHeroData = {
	pill: string;
	/** Amber part after the middle dot; defaults to "XoomPlus" in ServiceHero. */
	pillBrand?: string;
	titleLines: [string, string];
	text: string;
	primaryButton: ServiceHeroLink;
	secondaryLink: ServiceHeroLink;
	footerLeft: string;
	footerRight: string;
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
	tag: string;
	/** Child service page when this card maps to one. */
	href?: string;
};

/** "Development & commerce" — main card + exactly 4 small cards. */
export type ServiceBentoData = {
	pill: string;
	title: string;
	text: string;
	mainCard: ServiceBentoMainCard;
	cards: [ServiceBentoCard, ServiceBentoCard, ServiceBentoCard, ServiceBentoCard];
	note: string;
};

export type ServiceShowcasePanel = {
	label: string;
	note: string;
	image: { src: string; alt: string; width?: number; height?: number };
	caption: string;
};

/** "One connected experience" — exactly 3 list items. */
export type ServiceShowcaseData = {
	pill: string;
	titleLines: [string, string];
	text: string;
	panel: ServiceShowcasePanel;
	items: [string, string, string];
	icon: string;
};

export type ServiceProcessItem = {
	title: string;
	text: string;
};

/** "Working together" — exactly 3 partnership points. */
export type ServiceProcessData = {
	pill: string;
	titleLines: [string, string];
	image: { src: string; alt: string; width?: number; height?: number };
	items: [ServiceProcessItem, ServiceProcessItem, ServiceProcessItem];
	note: string;
};

export type ChildServiceHeroData = {
	pill: string;
	titleLines: [string, string];
	paragraphs: [string, string, string];
	button: { label: string; href: string };
	image: { src: string; alt: string; width?: number; height?: number };
};

export type ChildClarityItem = {
	title: string;
	text: string;
	tag: string;
};

export type ChildClarityColumn = {
	title: string;
	eyebrow: string;
	text: string;
	items: [ChildClarityItem, ChildClarityItem];
};

/** Child-page clarity block — exactly 2 columns × 2 items (IndustryClarity-compatible). */
export type ChildClarityData = {
	id: string;
	pill: string;
	title: string;
	text: string;
	columns: [ChildClarityColumn, ChildClarityColumn];
	note: string;
};

export type ChildService = {
	slug: string;
	name: string;
	metaTitle: string;
	metaDescription: string;
	hero: ChildServiceHeroData;
	/** Optional override; falls back to `defaultChildFeatures` on the child page. */
	features?: ServiceFeaturesData;
	/** Optional override; falls back to `defaultChildProcess` on the child page. */
	process?: ServiceProcessData;
	/** Optional override; falls back to `defaultChildClarity` on the child page. */
	clarity?: ChildClarityData;
	/**
	 * Optional home-style "Our Process" override.
	 * Named `ourProcess` because `process` is already Working together (ServiceProcess).
	 * Falls back to `defaultProcess` from `src/data/process.ts`.
	 */
	ourProcess?: import('../process').OurProcessContent;
	/** Optional image-text rows; falls back to `defaultChildRows`. */
	rows?: import('../industry-features').IndustryFeatureRow[];
	/** Optional How we work; falls back to `defaultChildHowWeWork`. */
	howWeWork?: import('../how-we-work').HowWeWorkContent;
	/** Optional Services behind; falls back to `defaultChildServicesBehind`. */
	servicesBehind?: import('../services-behind').ServicesBehindSection;
	/** Optional FAQ; falls back to `defaultChildFaq` (`faqs['child-service']`). */
	faq?: import('../faqs').FaqSet;
};

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
