/**
 * Location pages — one entry per `/locations/<slug>` route.
 * Hero image convention: `/images/<slug>-location-hero.webp`
 * Industries image: `/images/<slug>-industries-we-serve.webp` (or location-specific override)
 * Row images: `/images/<slug>-turn-interest-into.webp`, `/images/<slug>-let-the-details.webp`
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
	/** Optional brand segment in the pill (primary orange). After “: ” or “ · ”. Omit for a single-label pre-header. */
	pillBrand?: string;
	title: string;
	/** One string or multiple paragraphs. */
	text: string | string[];
	/**
	 * Primary CTA. Defaults to `Book a {name} Strategy Call` → `/contact`
	 * when omitted (also accepts legacy `button`).
	 */
	primaryButton?: LocationHeroButton;
	/** @deprecated Prefer `primaryButton`. */
	button?: LocationHeroButton;
	/**
	 * Secondary CTA. Defaults to `Explore Local Services` → `#local-intent`
	 * when omitted.
	 */
	secondaryButton?: LocationHeroButton;
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

export interface LocationCta {
	pill: string;
	heading: string;
	text: string;
}

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
	/** Optional section rendered directly under Regional Market Expertise (e.g. Strategic Methodology). */
	clarityStrategy?: LocationClarity;
	/** When omitted, the light Clarity earns attention section is not rendered. */
	clarityLight?: LocationClarity;
	/**
	 * When omitted, the Location page falls back to the Industries fundamentals
	 * content so the section still renders.
	 */
	fundamentals?: LocationFundamentals;
	/** When omitted, the FAQ section is not rendered. */
	faq?: LocationFaq;
	/** When omitted, CTASection uses its site-wide defaults. */
	cta?: LocationCta;
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
				{ title: 'Answer the questions people search', text: 'On-Page SEO' },
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
	const turnInterestImage = {
		src: locationRowImage(
			`/images/${slug}-turn-interest-into.webp`,
			LOCATION_TURN_INTEREST_FALLBACK,
		),
		alt: 'Aerial view of green hills, a river and ruined abbey in the countryside',
		width: LOCATION_ROW_IMAGE_SIZE.width,
		height: LOCATION_ROW_IMAGE_SIZE.height,
	};
	const letDetailsImage = {
		src: locationRowImage(
			`/images/${slug}-let-the-details.webp`,
			LOCATION_LET_DETAILS_FALLBACK,
		),
		alt: 'A row of traditional shopfronts including a fish restaurant',
		caption: 'Illustrative sector photography — not client work.',
		width: LOCATION_ROW_IMAGE_SIZE.width,
		height: LOCATION_ROW_IMAGE_SIZE.height,
	};

	if (slug === 'blackburn' || slug === 'manchester') {
		const searchArea =
			slug === 'manchester'
				? 'Manchester and Greater Manchester'
				: 'Blackburn and the UK';
		return [
			{
				id: 'turn-interest',
				reverse: false,
				titleLines: ['Turn interest into a', 'reason to get in touch.'],
				image: turnInterestImage,
				subtitle: 'Be Found When the Intent Is Local',
				list: [
					`Dominate competitive Google search queries across ${searchArea}.`,
					'Optimise your Google Business Profile and local citations for map pack visibility.',
					'Connect nearby searchers directly to a live call or frictionless inquiry form.',
				],
			},
			{
				id: 'let-the-details',
				reverse: true,
				titleLines: ['Let the details do', 'the talking.'],
				image: letDetailsImage,
				subtitle: 'Make Your Service Easy to Buy',
				list: [
					'Explain complex services clearly to remove buyer friction and build trust.',
					'Showcase relevant client proof and local case studies to validate your expertise.',
					'Pre-qualified inquiries so your team focuses only on profitable work.',
				],
			},
		];
	}

	return [
		{
			id: 'turn-interest',
			reverse: false,
			titleLines: ['Turn interest into a', 'reason to get in touch.'],
			image: turnInterestImage,
			paragraphs: [
				'Bring your facilities, programmes and approach to life. Give prospective members the information they need before an enquiry or introductory visit.',
			],
		},
		{
			id: 'let-the-details',
			reverse: true,
			titleLines: ['Let the details do', 'the talking.'],
			image: letDetailsImage,
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
			pill: 'Location:',
			pillBrand: 'Blackburn',
			title: 'Blackburn Digital Growth Hub',
			text: 'Whether you are a growing SME in Bradford, a specialist practice in Leeds or an established company across Blackburn, generic marketing does not cut it.',
			primaryButton: { label: 'Book a Blackburn Strategy Call', href: '/contact' },
			secondaryButton: { label: 'Explore Local Services', href: '#local-intent' },
			image: '/images/blackburn-location-hero.webp',
		},
		industries: {
			pill: 'Why We Serve',
			title: 'Digital Marketing Agency in Blackburn Created for Measurable Business Growth',
			text: 'Xoomplus builds connected digital engines that combine high-ranking Blackburn SEO, custom web development and precision paid advertising to turn online search intent into commercial revenue.',
			heading: ['Built Around Your Commercial Growth.', 'Not Agency Overhead'],
			paragraphs: [
				'Too many Blackburn agencies charge premium retainers to pay for expensive city-centre office spaces while outsourcing your work or handing you off to junior account coordinators. Xoomplus takes a different approach.',
				'We operate from our technical engineering centre in Blackburn and serve clients across the UK. We give you direct access to senior developers, SEO directors and paid media strategists to scale your digital business.',
			],
			button: { label: "Let's Talk", href: '/contact' },
			image: {
				...industriesContent.image,
				src: '/images/blackburn-why-we-serve.webp',
			},
		},
		intent: {
			pill: 'Digital Growth: Localised',
			titleLines: ['Build Your Digital Footprint', 'Where Your Audience Is'],
			text: 'When your business targets the audience near you, your investment unfolds into valuable commercial returns and builds your authority within your reach.',
			card: {
				title: 'Let The Audience Find You',
				items: [
					{
						title: 'Local Search',
						text: 'High-intent local SEO with a clear strategy',
					},
					{
						title: 'Unique Design',
						text: 'Creative web design and precise landing pages',
					},
					{
						title: 'Clear Directions',
						text: 'Optimised Google Business Profile for clear positioning',
					},
					{
						title: 'Authority and Relevance',
						text: 'Reviews and Testimonials to build authority',
					},
					{
						title: 'Social Queues',
						text: 'Social media management to drive authority',
					},
					{
						title: 'Focused Targeting',
						text: 'Paid Ads run with precision',
					},
				],
			},
		},
		rows: buildLocationRows('blackburn'),
		clarity: {
			id: 'clarity',
			variant: 'centered',
			pill: 'Regional Market Expertise',
			title: 'Digital Marketing Built Around Blackburn’s Key Industries',
			text: 'Tailored digital strategies designed around how businesses and consumers buy across Blackburn.',
			columns: [
				{
					items: [
						{
							title: 'Professional & Legal Services',
							text: 'Authority-led local search optimisation and clean conversion paths for Blackburn law firms, corporate consultancies and financial advisers.',
						},
						{
							title: 'Property & Construction',
							text: 'High-speed development portals and geo-targeted buyer acquisition campaigns for North West property developers and estate agents.',
						},
						{
							title: 'Healthcare & Private Clinics',
							text: 'Compliant, trust-first web architecture and local patient acquisition funnels for private medical and diagnostic practices.',
						},
					],
				},
				{
					items: [
						{
							title: 'B2B & Industrial Services',
							text: 'Lead-generation funnels and technical SEO capturing corporate decision-makers across Blackburn’s industrial and logistics hubs.',
						},
						{
							title: 'Trade & Home Services',
							text: 'Dominating localised search queries to deliver consistent quote requests and incoming calls from regional homeowners.',
						},
						{
							title: 'E-Commerce & Scale-Ups',
							text: 'High-converting Shopify and custom web builds paired with performance media to scale online sales across the UK.',
						},
					],
				},
			],
		},
		clarityLight: {
			id: 'clarity-light',
			theme: 'light',
			pill: 'Targeted Regional Pillars',
			titleLines: ['Complete Digital Marketing Agency Services', 'in Blackburn'],
			text: 'Dedicated services aligned with our core internal architecture to drive local market dominance.',
			columns: [
				{
					eyebrow: '01',
					title: 'SEO Agency Blackburn',
					text: 'Dominate local search results and Google Map packs across Blackburn and surrounding boroughs.',
					items: [
						{ title: 'Local Blackburn Citation Building' },
						{ title: 'Technical SEO Audits & Core Web Vitals' },
						{ title: 'Generative Engine Optimisation (GEO)' },
						{ title: 'Commercial Content Marketing' },
					],
					button: { label: 'Explore SEO Blackburn', href: '/services/seo' },
				},
				{
					eyebrow: '02',
					title: 'Web Design Blackburn',
					text: 'Bespoke, fast-loading websites built on WordPress, Shopify and custom frameworks designed to convert visitors into clients.',
					items: [
						{ title: 'Mobile-First UI/UX Design' },
						{ title: 'Conversion-Centred Landing Pages' },
						{ title: 'Technical Speed Optimisation' },
						{ title: 'Enterprise CMS Development' },
					],
					button: {
						label: 'Explore Web Design Blackburn',
						href: '/services/web-design-development',
					},
				},
				{
					eyebrow: '03',
					title: 'Social Media Marketing Blackburn',
					text: 'Build brand authority and capture customer attention across LinkedIn, Meta and TikTok.',
					items: [
						{ title: 'Data-Led Content Strategy' },
						{ title: 'AI-Driven Visual Asset Design' },
						{ title: 'Local Community Engagement' },
						{ title: 'Multi-Channel Social Growth' },
					],
					button: {
						label: 'Explore Social Media Blackburn',
						href: '/services/social-media-marketing',
					},
				},
				{
					eyebrow: '04',
					title: 'PPC Management Blackburn',
					text: 'Target high-intent commercial buyers actively looking for your services across Blackburn.',
					items: [
						{ title: 'Google Search & Performance Max Ads' },
						{ title: 'Precision Geo-Targeting' },
						{ title: 'Negative Keyword Management' },
						{ title: 'Transparent ROI Tracking' },
					],
					button: {
						label: 'Explore PPC Blackburn',
						href: '/services/ppc-google-ads',
					},
				},
			],
		},
		fundamentals: {
			id: 'location-fundamentals',
			pill: 'The Path Forward',
			title: 'Start with the Customer Journey. Not a List of Channels.',
			text: 'Xoomplus builds tailored digital solutions for your businesses so you can focus on commercial growth.',
			items: [
				{
					icon: 'be-found',
					title: 'Be Found',
					text: 'Show up when Blackburn decision-makers search for your solutions on Google or AI search tools.',
				},
				{
					icon: 'bring-your-brand-into-focus',
					title: 'Be Understood',
					text: 'Explain your value simply, showcase verified proof and remove buyer hesitation.',
				},
				{
					icon: 'make-the-next-step-clear',
					title: 'Make It Easy to Act',
					text: 'Provide fast, clear ways to get in touch, request a quote or schedule a consultation.',
				},
			],
			cta: fundamentalsContent.cta,
		},
		faq: {
			pill: 'Clear Answers',
			heading: 'Frequently Asked Questions About Digital Marketing in Blackburn',
			text: '',
			items: [
				{
					question: 'Why should a Blackburn business choose Xoomplus?',
					answer:
						'<p>Blackburn businesses get the best of both worlds: direct access to senior digital specialists and high-level execution, without the inflated retainers common with city-centre agencies.</p><p>We run integrated SEO, web development and paid search campaigns that focus strictly on your commercial return.</p>',
				},
				{
					question: 'How do you manage campaigns for clients from your Blackburn office?',
					answer:
						'Our operational headquarters at 33 King Street, Blackburn is situated within the North West commercial corridor, allowing us to regularly meet with clients across the North-West region.',
				},
				{
					question: 'How do you help Blackburn companies rank locally on Google?',
					answer:
						'We combine targeted local keyword optimisation, Google Business Profile enhancements, location-specific schema markup and high-authority regional citations. This ensures your business appears prominently in the Google Local Map Pack and organic search results when nearby clients look for your services.',
				},
				{
					question: 'Can we hire Xoomplus for a single service like SEO or Web Design?',
					answer:
						'Yes. Many of our Blackburn clients begin with a specific priority, such as rebuilding an underperforming website or fixing technical SEO issues. Once initial targets are met, we can expand into paid ads and social content to build an integrated growth engine.',
				},
				{
					question: 'How quickly can we expect to see results in the Blackburn market?',
					answer:
						'Paid advertising (Google Ads) can generate qualified inbound traffic and leads within the first two to four weeks. Organic search (SEO) and content strategies compound over time, typically showing strong ranking growth and commercial traction within three to six months.',
				},
				{
					question: 'What do we need to provide to get started?',
					answer:
						'Just your website URL, a quick summary of what your business does, your main growth goals and an approximate budget. We will review your current online presence and prepare a tailored strategy for our first conversation.',
				},
			],
		},
		cta: {
			pill: 'Ready to Scale',
			heading: 'Let’s Grow Your Business in Blackburn and Across the UK',
			text: 'Speak directly with our senior strategy team. We will review your market presence, audit your competitors and map out a clear growth plan.',
		},
	},
	{
		slug: 'manchester',
		name: 'Manchester',
		metaTitle: 'Manchester UK | Xoomplus',
		metaDescription:
			'Digital marketing, web design, SEO and social media for businesses in Manchester, UK. Talk to Xoomplus about your project.',
		hero: {
			pill: 'Location:',
			pillBrand: 'Manchester',
			title: 'Manchester Digital Growth Hub',
			text: 'Whether you are a growing SME in Spinningfields, a specialist practice in Salford Quays or an established company across Greater Manchester, generic marketing does not cut it.',
			primaryButton: { label: 'Book a Manchester Strategy Call', href: '/contact' },
			secondaryButton: { label: 'Explore Local Services', href: '#local-intent' },
			image: '/images/manchester-hero.webp',
		},
		industries: {
			pill: 'Why We Serve',
			title: 'Digital Marketing Agency in Manchester Created for Measurable Business Growth',
			text: 'Xoomplus builds connected digital engines that combine high-ranking Manchester SEO, custom web development and precision paid advertising to turn online search intent into commercial revenue.',
			heading: ['Built Around Your Commercial Growth.', 'Not Agency Overhead'],
			paragraphs: [
				'Too many Manchester agencies charge premium retainers to pay for expensive city-centre office spaces while outsourcing your work or handing you off to junior account coordinators. Xoomplus takes a different approach.',
				'We operate from our technical engineering centre in Blackburn and serve clients across Manchester and the UK. We give you direct access to senior developers, SEO directors and paid media strategists to scale your digital business.',
			],
			button: { label: "Let's Talk", href: '/contact' },
			image: {
				...industriesContent.image,
				src: '/images/manchester-industries-we-serve.webp',
			},
		},
		intent: {
			pill: 'Digital Growth: Localised',
			titleLines: ['Build Your Digital Footprint', 'Where Your Audience Is'],
			text: 'When your business targets the audience near you, your investment unfolds into valuable commercial returns and builds your authority within your reach.',
			card: {
				title: 'Let The Audience Find You',
				items: [
					{
						title: 'Local Search',
						text: 'High-intent local SEO with a clear strategy',
					},
					{
						title: 'Unique Design',
						text: 'Creative web design and precise landing pages',
					},
					{
						title: 'Clear Directions',
						text: 'Optimised Google Business Profile for clear positioning',
					},
					{
						title: 'Authority and Relevance',
						text: 'Reviews and Testimonials to build authority',
					},
					{
						title: 'Social Queues',
						text: 'Social media management to drive authority',
					},
					{
						title: 'Focused Targeting',
						text: 'Paid Ads run with precision',
					},
				],
			},
		},
		rows: buildLocationRows('manchester'),
		clarity: {
			id: 'clarity',
			variant: 'centered',
			pill: 'Regional Market Expertise',
			title: 'Digital Marketing Built Around Manchester’s Key Industries',
			text: 'Tailored digital strategies designed around how businesses and consumers buy across Greater Manchester.',
			columns: [
				{
					items: [
						{
							title: 'Professional & Legal Services',
							text: 'Authority-led local search optimisation and clean conversion paths for Manchester law firms, corporate consultancies and financial advisers.',
						},
						{
							title: 'Property & Construction',
							text: 'High-speed development portals and geo-targeted buyer acquisition campaigns for North West property developers and estate agents.',
						},
						{
							title: 'Healthcare & Private Clinics',
							text: 'Compliant, trust-first web architecture and local patient acquisition funnels for private medical and diagnostic practices.',
						},
					],
				},
				{
					items: [
						{
							title: 'B2B & Industrial Services',
							text: 'Lead-generation funnels and technical SEO capturing corporate decision-makers across Manchester’s industrial and logistics hubs.',
						},
						{
							title: 'Trade & Home Services',
							text: 'Dominating localised search queries to deliver consistent quote requests and incoming calls from regional homeowners.',
						},
						{
							title: 'E-Commerce & Scale-Ups',
							text: 'High-converting Shopify and custom web builds paired with performance media to scale online sales across the UK.',
						},
					],
				},
			],
		},
		clarityStrategy: {
			id: 'clarity-strategy',
			theme: 'light',
			pill: 'Strategic Methodology',
			title: 'Help Potential Clients Understand Before Asking Them to Act',
			text: 'Xoomplus builds clarity and ease with which your clients reach and understand you. Our philosophy is simple: ‘Make you accessible for the right audience.’',
			columns: [
				{
					title: 'Make Expertise Understandable',
					items: [
						{ title: 'Put clarity before complex industry jargon.' },
						{
							title:
								'Explain your services, processes and pricing structures in plain English.',
						},
						{
							title:
								'Answer the exact questions prospective clients search before making contact.',
						},
					],
				},
				{
					title: 'Structure for Conversion',
					items: [
						{
							title:
								'Organise service and location information so visitors find answers in seconds.',
						},
						{
							title:
								'Give every ad campaign and search query a dedicated, relevant landing page.',
						},
						{
							title: 'Keep user journeys fast, intuitive and mobile-optimised.',
						},
					],
				},
			],
		},
		clarityLight: {
			id: 'clarity-light',
			theme: 'light',
			pill: 'Targeted Regional Pillars',
			titleLines: ['Complete Digital Marketing Agency Services', 'in Manchester'],
			text: 'Dedicated services aligned with our core internal architecture to drive local market dominance.',
			columns: [
				{
					eyebrow: '01',
					title: 'SEO Agency Manchester',
					text: 'Dominate local search results and Google Map packs across Manchester and surrounding boroughs.',
					items: [
						{ title: 'Local Manchester Citation Building' },
						{ title: 'Technical SEO Audits & Core Web Vitals' },
						{ title: 'Generative Engine Optimisation (GEO)' },
						{ title: 'Commercial Content Marketing' },
					],
					button: { label: 'Explore SEO Manchester', href: '/services/seo' },
				},
				{
					eyebrow: '02',
					title: 'Web Design Manchester',
					text: 'Bespoke, fast-loading websites built on WordPress, Shopify and custom frameworks designed to convert visitors into clients.',
					items: [
						{ title: 'Mobile-First UI/UX Design' },
						{ title: 'Conversion-Centred Landing Pages' },
						{ title: 'Technical Speed Optimisation' },
						{ title: 'Enterprise CMS Development' },
					],
					button: {
						label: 'Explore Web Design Manchester',
						href: '/services/web-design-development',
					},
				},
				{
					eyebrow: '03',
					title: 'Social Media Marketing Manchester',
					text: 'Build brand authority and capture customer attention across LinkedIn, Meta and TikTok.',
					items: [
						{ title: 'Data-Led Content Strategy' },
						{ title: 'AI-Driven Visual Asset Design' },
						{ title: 'Local Community Engagement' },
						{ title: 'Multi-Channel Social Growth' },
					],
					button: {
						label: 'Explore Social Media Manchester',
						href: '/services/social-media-marketing',
					},
				},
				{
					eyebrow: '04',
					title: 'PPC Management Manchester',
					text: 'Target high-intent commercial buyers actively looking for your services across Manchester.',
					items: [
						{ title: 'Google Search & Performance Max Ads' },
						{ title: 'Precision Geo-Targeting' },
						{ title: 'Negative Keyword Management' },
						{ title: 'Transparent ROI Tracking' },
					],
					button: {
						label: 'Explore PPC Manchester',
						href: '/services/ppc-google-ads',
					},
				},
			],
		},
		fundamentals: {
			id: 'location-fundamentals',
			pill: 'The Path Forward',
			title: 'Start with the Customer Journey. Not a List of Channels.',
			text: 'Xoomplus builds tailored digital solutions for your businesses so you can focus on commercial growth.',
			items: [
				{
					icon: 'be-found',
					title: 'Be Found',
					text: 'Show up when Manchester decision-makers search for your solutions on Google or AI search tools.',
				},
				{
					icon: 'bring-your-brand-into-focus',
					title: 'Be Understood',
					text: 'Explain your value simply, showcase verified proof and remove buyer hesitation.',
				},
				{
					icon: 'make-the-next-step-clear',
					title: 'Make It Easy to Act',
					text: 'Provide fast, clear ways to get in touch, request a quote or schedule a consultation.',
				},
			],
			cta: fundamentalsContent.cta,
		},
		faq: {
			pill: 'Clear Answers',
			heading: 'Frequently Asked Questions About Digital Marketing in Manchester',
			text: '',
			items: [
				{
					question: 'Why should a Manchester business choose Xoomplus?',
					answer:
						'<p>Manchester businesses get the best of both worlds: direct access to senior digital specialists and high-level execution, without the inflated retainers common with city-centre agencies.</p><p>We run integrated SEO, web development and paid search campaigns that focus strictly on your commercial return.</p>',
				},
				{
					question: 'How do you manage campaigns for Manchester clients from your Blackburn office?',
					answer:
						'Our operational headquarters at 33 King Street, Blackburn is situated within the North West commercial corridor, allowing us to regularly meet with clients across Manchester, Salford and the wider region.',
				},
				{
					question: 'How do you help Manchester companies rank locally on Google?',
					answer:
						'We combine targeted local keyword optimisation, Google Business Profile enhancements, location-specific schema markup and high-authority regional citations. This ensures your business appears prominently in the Google Local Map Pack and organic search results when nearby clients look for your services.',
				},
				{
					question: 'Can we hire Xoomplus for a single service like SEO or Web Design?',
					answer:
						'Yes. Many of our Manchester clients begin with a specific priority, such as rebuilding an underperforming website or fixing technical SEO issues. Once initial targets are met, we can expand into paid ads and social content to build an integrated growth engine.',
				},
				{
					question: 'How quickly can we expect to see results in the Manchester market?',
					answer:
						'Paid advertising (Google Ads) can generate qualified inbound traffic and leads within the first two to four weeks. Organic search (SEO) and content strategies compound over time, typically showing strong ranking growth and commercial traction within three to six months.',
				},
				{
					question: 'What do we need to provide to get started?',
					answer:
						'Just your website URL, a quick summary of what your business does, your main growth goals and an approximate budget. We will review your current online presence and prepare a tailored strategy for our first conversation.',
				},
			],
		},
	},
];

export const locations: Location[] = locationsSource.map((loc) => ({
	...loc,
	hero: {
		...loc.hero,
		image: locationHeroImage(loc.hero.image),
		primaryButton: loc.hero.primaryButton ??
			loc.hero.button ?? {
				label: `Book a ${loc.name} Strategy Call`,
				href: '/contact',
			},
		secondaryButton: loc.hero.secondaryButton ?? {
			label: 'Explore Local Services',
			href: '#local-intent',
		},
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
