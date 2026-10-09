/**
 * Location pages — one entry per `/locations/<slug>` route.
 * Hero image convention: `/images/<slug>-location-hero.webp`
 * Industries image: `/images/<slug>-industries-we-serve.webp`
 * Missing files fall back so builds never 404.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { IndustryFeatureRow } from './industry-features';
import type { IndustryClaritySection } from './industry-clarity';
import type { IndustryFundamentalsSection } from './industry-fundamentals';
import type { FaqSet } from './faqs';

export interface LocationHeroButton {
	label: string;
	href: string;
}

export interface LocationHero {
	pill: string;
	pillBrand: string;
	title: string;
	text: string;
	button: LocationHeroButton;
	/** Preferred public path; resolved at build time via locationHeroImage(). */
	image: string;
}

export interface LocationIndustriesImage {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

export interface LocationIndustries {
	pill: string;
	title: string;
	text: string;
	heading: [string, string];
	paragraphs: string[];
	button: LocationHeroButton;
	image: LocationIndustriesImage;
}

export interface LocationIntentItem {
	title: string;
	text: string;
}

export interface LocationIntentCard {
	title: string;
	items: LocationIntentItem[];
}

export interface LocationIntent {
	pill: string;
	titleLines: [string, string];
	text: string;
	card: LocationIntentCard;
}

export type LocationRow = IndustryFeatureRow;
export type LocationClarity = IndustryClaritySection;
export type LocationFundamentals = IndustryFundamentalsSection;
export type LocationFaq = FaqSet;

export interface Location {
	slug: string;
	name: string;
	metaTitle: string;
	metaDescription: string;
	hero: LocationHero;
	/** When omitted, the Industries we serve section is not rendered. */
	industries?: LocationIndustries;
	/** When omitted, the Local intent section is not rendered. */
	intent?: LocationIntent;
	/** When omitted, the image/text rows section is not rendered. */
	rows?: LocationRow[];
	/** When omitted, the dark Clarity section is not rendered. */
	clarity?: LocationClarity;
	/** When omitted, the light Clarity earns attention section is not rendered. */
	clarityLight?: LocationClarity;
	/**
	 * When omitted, the Location page falls back to the Industries fundamentals
	 * content so the section still renders.
	 */
	fundamentals?: LocationFundamentals;
	/** When omitted, the FAQ section is not rendered. */
	faq?: LocationFaq;
}

const LOCATION_HERO_FALLBACK = '/images/blackburn-location-hero.webp';
const LOCATION_INDUSTRIES_FALLBACK = '/images/industries-we-serve-location-page.webp';
const LOCATION_INDUSTRIES_FALLBACK_SIZE = { width: 708, height: 458 };
const LOCATION_TURN_INTEREST_FALLBACK = '/images/turn-interest-location-image.webp';
const LOCATION_LET_DETAILS_FALLBACK = '/images/let-the-details-do-the-talking-location-page.webp';
const LOCATION_ROW_IMAGE_SIZE = { width: 600, height: 390 };

function publicFileExists(publicUrl: string): boolean {
	const relative = publicUrl.replace(/^\//, '');
	return fs.existsSync(path.join(process.cwd(), 'public', relative));
}

/** Prefer the given path when it exists under public/; otherwise Blackburn hero. */
export function locationHeroImage(preferred: string): string {
	return publicFileExists(preferred) ? preferred : LOCATION_HERO_FALLBACK;
}

/** Prefer `/images/<slug>-industries-we-serve.webp`; fall back to shared industries image. */
export function locationIndustriesImage(slug: string, preferred?: string): string {
	const candidate = preferred ?? `/images/${slug}-industries-we-serve.webp`;
	return publicFileExists(candidate) ? candidate : LOCATION_INDUSTRIES_FALLBACK;
}

/** Prefer preferred path when present; otherwise fallback. */
export function locationRowImage(preferred: string, fallback: string): string {
	return publicFileExists(preferred) ? preferred : fallback;
}

const industriesContent: Omit<LocationIndustries, 'image'> & {
	image: LocationIndustriesImage;
} = {
	pill: 'Industries we serve',
	title: 'Digital Solutions Built Around Your Industry',
	text: 'Different industries have different audiences, challenges, and digital opportunities. Our services can be tailored around the needs of your business and the people you want to reach.',
	heading: ['Built around your business.', 'Not around silos.'],
	paragraphs: [
		'A great website should support your marketing. Your marketing should reflect your brand. And every decision should start with your business.',
		'That is the thinking behind XoomPlus. We bring digital marketing, design and development into one conversation, so ideas can move from strategy to execution without losing their purpose along the way.',
		'We see ourselves as a digital partner: curious about your challenges, clear about our thinking and invested in building something useful together.',
	],
	button: { label: "Let's Talk", href: '/contact' },
	image: {
		src: LOCATION_INDUSTRIES_FALLBACK,
		alt: 'Colourful 3D illustration of a website on a dark screen with floating icons',
		width: LOCATION_INDUSTRIES_FALLBACK_SIZE.width,
		height: LOCATION_INDUSTRIES_FALLBACK_SIZE.height,
	},
};

const intentContent: LocationIntent = {
	pill: 'Local intent. Considered decisions.',
	titleLines: ['From a nearby search to a', 'worthwhile conversation.'],
	text: 'For trade and project-led businesses, useful digital work could connect the area you serve, the work you do and the enquiry you want.',
	card: {
		title: 'Be found when the need is local.',
		items: [
			{ title: 'Show up for relevant areas', text: 'Local SEO + On-Page SEO' },
			{ title: 'Explain the job and the next step', text: 'Landing Page Design + UI/UX Design' },
			{ title: 'Connect a search to a quote', text: 'PPC & Google Ads + landing page alignment' },
			{ title: 'Show up for relevant areas', text: 'Local SEO + On-Page SEO' },
			{ title: 'Explain the job and the next step', text: 'Landing Page Design + UI/UX Design' },
			{ title: 'Connect a search to a quote', text: 'PPC & Google Ads + landing page alignment' },
		],
	},
};

const clarityContent: LocationClarity = {
	id: 'clarity',
	variant: 'centered',
	pill: 'Clarity before the enquiry',
	title: 'Make complex services easier to understand.',
	text: 'When people need to make a considered decision, clear information and a purposeful next step matter more than noise.',
	columns: [
		{
			title: 'Medical Reporting',
			text: 'Help potential referrers and enquirers understand your reporting services, coverage and enquiry requirements.',
			items: [
				{
					title: 'Explain the service clearly',
					text: 'Organise service pages around report types, how an enquiry begins and what information your team needs.',
				},
				{
					title: 'Connect discovery to a quote request',
					text: 'Align location and service content with clear contact routes, without asking visitors to navigate unnecessary steps.',
				},
			],
		},
		{
			title: 'Legal',
			text: 'Give visitors a clear view of your practice areas and help them find the most relevant route to your team.',
			items: [
				{
					title: 'Build an informative first impression',
					text: 'Structure practice-area pages and useful articles around the questions prospective enquirers are asking.',
				},
				{
					title: 'Make the next step specific',
					text: 'Bring search intent, campaign messaging and enquiry pages together around the services you want to communicate.',
				},
			],
		},
	],
};

const clarityLightContent: LocationClarity = {
	id: 'clarity-light',
	theme: 'light',
	pill: 'Clarity earns attention',
	titleLines: ['Help people understand before', 'asking them to act.'],
	text: 'For services that need a little more explanation, the digital opportunity is often a clearer path through the information.',
	columns: [
		{
			eyebrow: 'Professional Services',
			title: 'Make expertise understandable.',
			text: 'Longer decisions need useful information. A clear service structure and considered content could help prospective clients understand fit before they enquire.',
			items: [
				{ title: 'Explain your offer', text: 'UI/UX Design + Website Redesign' },
				{ title: 'Answer the questions people search', text: 'SEO Content Marketing + On-Page SEO' },
				{ title: 'Give every campaign a relevant destination', text: 'Landing Page Design + PPC & Google Ads' },
			],
		},
		{
			eyebrow: 'Healthcare & Wellness',
			title: 'Put clarity before complexity.',
			text: 'People need to understand your services, locations and next steps. A clear, mobile-friendly website could make that information easier to navigate.',
			items: [
				{ title: 'Organise service and location information', text: 'Web Design & Development + Local SEO' },
				{ title: 'Make journeys easier to follow', text: 'UI/UX Design + Website Redesign' },
				{ title: 'Keep messaging useful and considered', text: 'Content & creative direction + social planning' },
			],
		},
	],
	note: 'Healthcare & Wellness applications are about digital presentation, not clinical or regulated-sector expertise. Any specialist claims, approvals or regulatory requirements would need to be defined and reviewed with your qualified advisers.',
};

const fundamentalsContent: LocationFundamentals = {
	id: 'location-fundamentals',
	pill: 'Different sectors. Shared fundamentals.',
	title: 'Start with the journey. Not a list of channels.',
	text: 'We connect what people are looking for with what your business can offer. Industry context shapes each step.',
	items: [
		{
			icon: 'be-found',
			title: 'Be found',
			text: 'Understand search intent, locations and audience needs. Choose organic, social or paid activity with a clear purpose.',
		},
		{
			icon: 'bring-your-brand-into-focus',
			title: 'Be understood',
			text: 'Give your services a clear structure, useful content and a consistent message across your website and campaigns.',
		},
		{
			icon: 'make-the-next-step-clear',
			title: 'Make it easy to act',
			text: 'Connect the first click to a relevant enquiry, appointment or booking route, then review the journey together.',
		},
	],
	cta: {
		text: 'Not sure where to begin? Share the challenge — we can explore the right starting point.',
		label: 'Help me choose',
		href: '/contact',
	},
};

/** Location-page FAQ — per slug so copy can diverge later. */
const faqContent: LocationFaq = {
	pill: 'FAQ',
	heading: 'Frequently Asked Questions',
	text: 'Common questions about working with Xoomplus in your area.',
	items: [
		{
			question: 'Do you work with businesses in my area?',
			answer:
				'Yes. We are based in Blackburn and work with clients across Manchester and the wider North West — and remotely beyond that when the fit is right.',
		},
		{
			question: 'Can you help if I already have a website?',
			answer:
				'Absolutely. Many projects start by improving what you already have — clearer pages, stronger local search, or better campaign destinations — before considering a rebuild.',
		},
		{
			question: 'Do I need to buy every service at once?',
			answer:
				'No. We often begin with one priority — SEO, a landing page, or paid search — then build out once the direction is clear and results support the next step.',
		},
		{
			question: 'How do local SEO and website work connect?',
			answer:
				'Search brings people in; your site has to explain the offer and make the next step obvious. We plan those pieces together so the journey feels joined up.',
		},
		{
			question: 'What should I bring to the first conversation?',
			answer:
				'A short overview of your business, the area you serve, your main goals, and links to your current site or campaigns. That is enough for a useful first call.',
		},
	],
};

/** Shared rows shape — image src resolved per slug at export time. */
function buildLocationRows(slug: string): LocationRow[] {
	return [
		{
			id: 'turn-interest',
			reverse: false,
			titleLines: ['Turn interest into a', 'reason to get in touch.'],
			image: {
				src: locationRowImage(
					`/images/${slug}-turn-interest.webp`,
					LOCATION_TURN_INTEREST_FALLBACK,
				),
				alt: 'Aerial view of green hills, a river and ruined abbey in the countryside',
				width: LOCATION_ROW_IMAGE_SIZE.width,
				height: LOCATION_ROW_IMAGE_SIZE.height,
			},
			paragraphs: [
				'Bring your facilities, programmes and approach to life. Give prospective members the information they need before an enquiry or introductory visit.',
			],
		},
		{
			id: 'let-the-details',
			reverse: true,
			titleLines: ['Let the details do', 'the talking.'],
			image: {
				src: locationRowImage(
					`/images/${slug}-let-the-details.webp`,
					LOCATION_LET_DETAILS_FALLBACK,
				),
				alt: 'A row of traditional shopfronts including a fish restaurant',
				caption: 'Illustrative sector photography — not client work.',
				width: LOCATION_ROW_IMAGE_SIZE.width,
				height: LOCATION_ROW_IMAGE_SIZE.height,
			},
			paragraphs: [
				'Help people explore your property offering through thoughtful imagery, useful location information and an intuitive browsing experience.',
			],
		},
	];
}

const locationsSource: Location[] = [
	{
		slug: 'blackburn',
		name: 'Blackburn',
		metaTitle: 'Blackburn UK | Xoomplus',
		metaDescription:
			'Digital marketing, web design, SEO and social media for businesses in Blackburn, UK. Talk to Xoomplus about your project.',
		hero: {
			pill: 'Location',
			pillBrand: 'XoomPlus',
			title: 'Blackburn UK',
			text: 'Connect search, websites and campaigns around the way your business works and the people you need to reach.',
			button: { label: 'Discuss your project', href: '/contact' },
			image: '/images/blackburn-location-hero.webp',
		},
		industries: {
			...industriesContent,
			image: {
				...industriesContent.image,
				src: '/images/blackburn-industries-we-serve.webp',
			},
		},
		intent: intentContent,
		rows: buildLocationRows('blackburn'),
		clarity: clarityContent,
		clarityLight: clarityLightContent,
		fundamentals: fundamentalsContent,
		faq: faqContent,
	},
	// PLACEHOLDER: replace with real content
	{
		slug: 'manchester',
		name: 'Manchester',
		metaTitle: 'Manchester UK | Xoomplus',
		metaDescription:
			'Digital marketing, web design, SEO and social media for businesses in Manchester, UK. Talk to Xoomplus about your project.',
		hero: {
			pill: 'Location',
			pillBrand: 'XoomPlus',
			title: 'Manchester UK',
			text: 'Connect search, websites and campaigns around the way your business works and the people you need to reach.',
			button: { label: 'Discuss your project', href: '/contact' },
			image: '/images/manchester-location-hero.webp',
		},
		industries: {
			...industriesContent,
			image: {
				...industriesContent.image,
				src: '/images/manchester-industries-we-serve.webp',
			},
		},
		intent: intentContent,
		rows: buildLocationRows('manchester'),
		clarity: clarityContent,
		clarityLight: clarityLightContent,
		fundamentals: fundamentalsContent,
		faq: faqContent,
	},
];

export const locations: Location[] = locationsSource.map((loc) => ({
	...loc,
	hero: {
		...loc.hero,
		image: locationHeroImage(loc.hero.image),
	},
	industries: loc.industries
		? {
				...loc.industries,
				image: {
					...loc.industries.image,
					src: locationIndustriesImage(loc.slug, loc.industries.image.src),
					width: loc.industries.image.width ?? LOCATION_INDUSTRIES_FALLBACK_SIZE.width,
					height: loc.industries.image.height ?? LOCATION_INDUSTRIES_FALLBACK_SIZE.height,
				},
			}
		: undefined,
}));

/** Slugs whose preferred hero file was missing and now use the Blackburn fallback. */
export const locationsUsingHeroFallback: string[] = locationsSource
	.filter((loc) => !publicFileExists(loc.hero.image))
	.map((loc) => loc.slug);

/** Slugs whose preferred industries image was missing and now use the shared fallback. */
export const locationsUsingIndustriesFallback: string[] = locationsSource
	.filter(
		(loc) =>
			loc.industries != null && !publicFileExists(loc.industries.image.src),
	)
	.map((loc) => loc.slug);

export function getLocationBySlug(slug: string): Location | undefined {
	return locations.find((loc) => loc.slug === slug);
}
