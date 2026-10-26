import type { MainService } from './types';
const SLUG = 'ppc-google-ads';
const NAME = 'PPC & Google Ads';

export const ppcGoogleAds: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Focused campaigns. A clearer path from click to conversion.',
	metaTitle: 'PPC & Google Ads | Xoomplus',
	metaDescription:
		'Focused paid search and Google Ads campaigns with clear priorities, aligned landing experiences, and measurable conversion paths.',
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
		titleLines: ['More visibility.', 'Better conversions.'],
		text: 'As a UK-based PPC marketing agency, we help businesses in Manchester and across the UK improve online visibility, attract qualified traffic and turn clicks into meaningful sales.',
		primaryButton: { label: 'Free Demo Call', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Explore PPC opportunities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Search + Paid Social + Landing pages',
		// PLACEHOLDER: replace with real content
		panelLabel: 'RESEARCH / CAMPAIGNS / CONVERSION',
		panelPlus: '',
		panelImage: {
			src: '/images/ppc-google-ads-hero.webp',
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear priorities', 'Aligned journeys', 'Measurable results'],
	},
	features: {
		pill: 'Built for growth',
		titleLines: ['Not just more clicks.', 'Focus on more sales'],
		text: 'We create PPC campaigns that connect your business with the right audience at the right moment. From keyword research and campaign setup to optimisation and reporting, we focus on improving visibility, reducing wasted spend and generating measurable results for businesses in Manchester and across the UK.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'make-the-next-step-clear',
				title: 'Reach the right audience',
				text: 'Target customers actively searching for your products or services. Our PPC campaigns help your business reach potential customers across the UK when they are most likely to take action.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'bring-your-brand-into-focus',
				title: 'Turn traffic into enquiries',
				text: 'Attract relevant visitors through Google Ads campaigns and guide them towards actions that matter.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'think-beyond-one-screen',
				title: 'Improve performance over time',
				text: 'Analyse campaign data, identify opportunities and continuously refine your Google ads for stronger returns.',
			},
		],
	},
	experience: {
		pill: 'Purpose & Experience',
		titleLines: ['Every PPC campaign needs', 'a clear purpose.'],
		text: 'Whether you are launching Google Ads for the first time or improving existing campaigns, we help businesses in Manchester and throughout the UK make more informed decisions.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'ui-ux-design',
				title: 'PPC & Google Ads Management',
				text: 'Build structured PPC campaigns with clear goals, accurate tracking and performance-focused optimisation.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'landing-page-design',
				title: 'Google Ads Audit',
				text: 'Identify opportunities within your existing campaigns and discover ways to improve performance.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'website-redesign',
				title: 'Conversion Tracking Setup',
				text: 'We help configure Google Analytics, Google Ads conversion tracking, goal measurement and performance reporting so you can make decisions based on meaningful data.',
			},
		],
	},
	bento: {
		pill: 'PPC & Ad Management',
		title: 'Campaign Strategy. The right foundation.',
		text: 'Our PPC marketing services combine relevant keywords, compelling ad copy, accurate tracking and continuous optimisation to help your business reach potential customers.',
		mainCard: {
			// PLACEHOLDER: replace with real content — reuse overview icon until PPC art lands
			icon: '/icons/service-circles.svg',
			title: 'PPC & Google Ads Services',
			description:
				'Build high-performing paid campaigns that connect your business with customers actively searching for your products and services.',
			items: [
				'Google Ads Management',
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
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'wordpress-development',
				title: 'Google Search Ads',
				text: 'Appear at the top of Google’s search results. We create targeted search campaigns around relevant keywords.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'sopify-development',
				title: 'Google Shopping Ads',
				text: 'Show your products visually to customers ready to purchase. We help optimise Shopping campaigns so your products can reach relevant audiences across the UK.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'ecommerce-development',
				title: 'Performance Max Campaigns',
				text: "Use Google's automated campaign technology to reach potential customers across multiple Google channels.",
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'custom-website-development',
				title: 'Google Display Ads',
				text: 'Google Display Ads let you promote your business with banner or image ads across millions of websites, apps and Google properties like YouTube.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'Not sure which campaigns fit? Start with your goals, audience and landing experiences. We can explore the priorities together.',
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
		// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
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
		// PLACEHOLDER: replace with real content
		note: 'A useful starting point: your existing campaigns, your goals, your landing pages and any performance insight you already have.',
	},
	faqKey: 'ppc-google-ads',
};
