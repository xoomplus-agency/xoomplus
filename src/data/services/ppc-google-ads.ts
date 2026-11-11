import type { MainService } from './types';

const SLUG = 'ppc-google-ads';
const NAME = 'PPC & Google Ads';

export const ppcGoogleAds: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Focused campaigns. A clearer path from click to conversion.',
	metaTitle: 'PPC Agency Manchester | Google Ads for Business Growth',
	metaDescription:
		'From keyword research to conversion tracking, XoomPlus is a PPC Agency in Manchester helping businesses get more from paid advertising.',
	children: [
		// Name kept for mega menu; page not generated (disabled).
		{
			slug: 'audience-keyword-research',
			name: 'Audience & keyword research',
			shortName: 'Audience & Keywords',
			disabled: true,
		},
		{
			slug: 'landing-page-alignment',
			name: 'Landing page alignment',
			shortName: 'Landing Page Alignment',
			disabled: true,
		},
		{
			slug: 'reporting-refinement',
			name: 'Reporting & refinement',
			shortName: 'Reporting & Refinement',
			disabled: true,
		},
	],
	hero: {
		pill: 'PPC Marketing & Google Ads Services',
		pillBrand: 'XoomPlus',
		titleLines: ['PPC Agency Manchester |', 'Grow Your Business Faster'],
		textParagraphs: [
			'Many businesses struggle to attract qualified visitors and generate sales through paid advertising. Without the right targeting and campaign strategy, PPC campaigns can waste budget on clicks that rarely turn into customers.',
			'As a PPC agency in Manchester, we help businesses create targeted advertising campaigns that reach the right audience, increase online visibility and turn more clicks into meaningful leads and sales.',
		],
		primaryButton: { label: 'Free Demo Call', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Explore PPC Services', href: '#development-commerce' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Search + Paid Social + Landing pages',
		panelLabel: 'RESEARCH / CAMPAIGNS / CONVERSION',
		panelPlus: '',
		panelImage: {
			src: '/images/ppc-google-ads-hero.webp',
			alt: 'Website shown on a laptop and a phone',
		},
		panelCaptions: ['Clear priorities', 'Aligned journeys', 'Measurable results'],
	},
	features: {
		pill: 'Built for growth',
		titleLines: ['What Is PPC', 'Management?'],
		text: 'PPC management is the process of planning, creating, monitoring and optimising pay-per-click advertising campaigns across platforms such as Google Ads and Microsoft Ads. It involves keyword research, audience targeting, budget management and performance tracking.',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Reach the right audience',
				text: 'Target customers actively searching for your products or services. Our PPC campaigns help your business reach potential customers across the UK when they are most likely to take action.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Turn traffic into enquiries',
				text: 'Attract relevant visitors through Google Search Ads and guide them towards actions that matter.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Improve performance over time',
				text: 'Analyse PPC campaign data, identify opportunities and continuously refine your Google ads for stronger returns.',
			},
		],
	},
	experience: {
		pill: 'Purpose & Experience',
		titleLines: ['Every PPC campaign needs', 'a clear purpose.'],
		text: 'Whether you are launching Google Ads for the first time or improving existing campaigns, we help businesses make more informed decisions.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'PPC & Google Ads Management',
				text: 'Build structured PPC campaigns with clear goals, accurate tracking and performance-focused optimisation.',
			},
			{
				icon: 'landing-page-design',
				title: 'Google Ads Audit',
				text: 'Identify opportunities within your existing campaigns and discover ways to improve performance.',
			},
			{
				icon: 'website-redesign',
				title: 'Conversion Tracking Setup',
				text: 'We help configure Google Analytics, Google Ads conversion tracking, goal measurement and performance reporting so you can make decisions based on meaningful data.',
			},
		],
	},
	bento: {
		pill: 'PPC & Ad Management',
		title: 'Our PPC Advertising Services',
		text: 'Our services combine relevant keywords, compelling ad copy, accurate tracking and continuous optimisation to help your business reach potential customers.',
		mainCard: {
			icon: '/icons/service-circles.svg',
			title: 'PPC & Google Ads Services',
			description:
				'Build high-performing paid campaigns that connect your business with customers actively searching for your products and services.',
			items: [
				'Professional Google Ads Management',
				'Search Campaign Setup',
				'Audience Targeting',
				'Ad Copy Creation',
				'Landing Page Optimisation',
				'Conversion Tracking',
				'Ongoing Optimisation',
			],
			buttonLabel: 'Grow your visibility',
			href: '/contact',
		},
		cards: [
			{
				icon: 'wordpress-development',
				title: 'Google Search Ads',
				text: 'Appear at the top of Google’s search results. We create targeted Google search ads around relevant keywords.',
			},
			{
				icon: 'sopify-development',
				title: 'Google Shopping Ads',
				text: 'Show your products visually to customers ready to purchase. We help optimise Shopping campaigns so your products can reach relevant audiences across Manchester and nearby areas.',
			},
			{
				icon: 'ecommerce-development',
				title: 'Performance Max Campaigns',
				text: "Use Google's automated campaign technology to reach potential customers across multiple Google channels.",
			},
			{
				icon: 'custom-website-development',
				title: 'Google Display Ads',
				text: 'Google Display Ads let you promote your business with banner or image ads across millions of websites, apps and Google properties like YouTube.',
			},
		],
	},
	showcase: {
		pill: 'One connected advertising experience',
		titleLines: ['Different campaigns.', 'The same clear strategy.'],
		text: 'Effective PPC marketing requires every element to work together. From search intent to landing pages and conversion tracking, we create campaigns where each step supports the next.',
		plainPanel: true,
		panel: {
			label: '',
			note: '',
			image: {
				src: '/images/ppc-google-ads-one-connected-advertising-experience.webp',
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			caption: '',
		},
		items: [
			'Clear audience targeting',
			'Relevant keywords and messaging',
			'Optimised landing experiences',
			'Measurable campaign performance',
		],
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'Working Together',
		titleLines: ['Better campaigns start', 'with better collaboration.'],
		image: {
			src: '/images/ppc-google-ads-working-together.webp',
			alt: 'Team collaborating on campaign planning and performance',
			width: 960,
			height: 540,
		},
		items: [
			{
				title: 'A strategy shaped around your goals',
				text: 'We align PPC campaign structure, targeting and budget with your business objectives.',
			},
			{
				title: 'A shared view of performance',
				text: 'We keep you informed with clear insights into campaign performance, results and opportunities.',
			},
			{
				title: 'Continuous improvement',
				text: 'Advertising performance changes over time. We refine campaigns to help maintain growth and improve results.',
			},
		],
		note: 'A useful starting point: your existing campaigns, your goals, your landing pages and any performance insight you already have.',
	},
	why: {
		id: 'why-xoomplus',
		pill: 'Why Xoomplus',
		title: 'Why Choose Xoomplus for PPC and Google Ads Services',
		text: '6 Reasons Why Brands Choose Xoomplus Over Other PPC Agencies',
		cards: [
			{
				icon: '/icons/strategy-first.svg',
				title: 'Audit & Research',
				text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
			},
			{
				icon: '/icons/experienced-team.svg',
				title: 'The A Team',
				text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium PPC and Google ads services and the results you need.',
			},
			{
				icon: '/icons/clear-reporting.svg',
				title: 'Transparent Reporting',
				text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
			},
			{
				icon: '/icons/tailored-strategies.svg',
				title: 'Customised Plans',
				text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
			},
			{
				icon: '/icons/result-focused.svg',
				title: 'Focused Efforts',
				text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
			},
			{
				icon: '/icons/long-term-growth.svg',
				title: 'Lasting Growth',
				text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
			},
		],
	},
	faqKey: 'ppc-google-ads',
};
