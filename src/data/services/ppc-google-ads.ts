import type { MainService } from './types';
import { makeChildService } from './children';
import {
	serviceHeroImage,
	serviceProcessImage,
	serviceShowcaseImage,
} from './images';

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
		// PLACEHOLDER: replace with real content
		// Slug mismatch vs menu slugify: slugify would be audience-and-keyword-research
		makeChildService(NAME, 'audience-keyword-research', 'Audience & keyword research'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'landing-page-alignment', 'Landing page alignment'),
		// PLACEHOLDER: replace with real content
		// Slug mismatch vs menu slugify: slugify would be reporting-and-refinement
		makeChildService(NAME, 'reporting-refinement', 'Reporting & refinement'),
	],
	hero: {
		pill: 'PPC & Google Ads',
		pillBrand: 'XoomPlus',
		titleLines: ['Focused campaigns.', 'A clearer path.'],
		// PLACEHOLDER: replace with real content
		text: 'Bring focused paid campaigns and relevant website experiences into one conversation, from the first click to the next step.',
		primaryButton: { label: 'Discuss your project', href: '/contact' },
		secondaryLink: { label: 'Explore the possibilities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Search + Paid Social + Landing pages',
		// PLACEHOLDER: replace with real content
		panelLabel: 'RESEARCH / CAMPAIGNS / CONVERSION',
		panelImage: {
			src: serviceHeroImage(SLUG), // expected: /images/ppc-google-ads-hero-image.webp
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear priorities', 'Aligned journeys', 'Measurable results'],
	},
	features: {
		// PLACEHOLDER: replace with real content
		pill: 'Built around people',
		// PLACEHOLDER: replace with real content
		titleLines: ['Not just clicks.', 'How the journey works.'],
		// PLACEHOLDER: replace with real content
		text: 'Paid media is where intent meets your offer. We bring research, creative and landing experiences into one conversation, so every click has a clear purpose.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'make-the-next-step-clear',
				// PLACEHOLDER: replace with real content
				title: 'Make the next step clear',
				// PLACEHOLDER: replace with real content
				text: 'Help people understand your offer from the first ad, find what matters and move naturally towards an enquiry or purchase.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'bring-your-brand-into-focus',
				// PLACEHOLDER: replace with real content
				title: 'Bring your brand into focus',
				// PLACEHOLDER: replace with real content
				text: 'Create a consistent message across ads and landing pages that gives your offer clarity and your business a recognisable presence.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'think-beyond-one-screen',
				// PLACEHOLDER: replace with real content
				title: 'Think beyond one click',
				// PLACEHOLDER: replace with real content
				text: 'Shape the journey from impression to conversion — across search, paid social and the pages people land on.',
			},
		],
	},
	experience: {
		// PLACEHOLDER: replace with real content
		pill: 'Research & creative',
		// PLACEHOLDER: replace with real content
		titleLines: ['Make every campaign', 'feel purposeful.'],
		// PLACEHOLDER: replace with real content
		text: 'Start with the people you want to reach. Then shape keywords, creative and landing experiences around what they need to understand and do.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'ui-ux-design',
				// PLACEHOLDER: replace with real content
				title: 'Audience & keyword research',
				// PLACEHOLDER: replace with real content
				text: 'Give your campaigns a clearer route to the right audience, with considered keywords and purposeful targeting.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'landing-page-design',
				// PLACEHOLDER: replace with real content
				title: 'Landing page alignment',
				// PLACEHOLDER: replace with real content
				text: "Bring one message into focus. Shape the landing page around the visitor's intent and the action you want them to take.",
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'website-redesign',
				// PLACEHOLDER: replace with real content
				title: 'Message and creative direction',
				// PLACEHOLDER: replace with real content
				text: "Reconsider what your ads need to say and do, retaining what works and bringing clarity to what doesn't.",
			},
		],
		// PLACEHOLDER: replace with real content
		footnote:
			'We shape the channel mix, campaign priorities and measurement around your needs, rather than starting with a one-size-fits-all account structure.',
	},
	bento: {
		// PLACEHOLDER: replace with real content
		pill: 'Paid capabilities',
		// PLACEHOLDER: replace with real content
		title: 'Focused spend. The right foundation.',
		// PLACEHOLDER: replace with real content
		text: 'Choose the campaigns around your audience, your offer and your goals. Paid media should serve the journey — not define it before the conversation begins.',
		mainCard: {
			// PLACEHOLDER: replace with real content — reuse overview icon until PPC art lands
			icon: '/icons/service-circles.svg',
			title: 'PPC & Google Ads',
			// PLACEHOLDER: replace with real content
			description:
				'Bring focused paid campaigns and relevant website experiences into one conversation, from the first click to the next step.',
			items: [
				'Audience & keyword research',
				'Campaign planning',
				'Message and creative direction',
				'Landing page alignment',
				'Clear campaign priorities',
				'Reporting & refinement',
				'A shared view of marketing activity',
			],
			// PLACEHOLDER: replace with real content
			buttonLabel: 'Discuss your campaigns',
			href: '/contact',
		},
		cards: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'wordpress-development',
				// PLACEHOLDER: replace with real content
				title: 'Audience & keyword research',
				// PLACEHOLDER: replace with real content
				text: 'Build campaigns on a clear view of who you are reaching and what they are searching for.',
				// PLACEHOLDER: replace with real content
				tag: 'Audience + keywords',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'sopify-development',
				// PLACEHOLDER: replace with real content
				title: 'Campaign planning',
				// PLACEHOLDER: replace with real content
				text: 'Shape account structure and priorities around your offer, with coherent messaging across ads.',
				// PLACEHOLDER: replace with real content
				tag: 'Structure + priorities',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'ecommerce-development',
				// PLACEHOLDER: replace with real content
				title: 'Landing page alignment',
				// PLACEHOLDER: replace with real content
				text: 'Bring the ad promise and the path to conversion into one connected website experience.',
				// PLACEHOLDER: replace with real content
				tag: 'Ads + landing pages',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
				icon: 'custom-website-development',
				// PLACEHOLDER: replace with real content
				title: 'Reporting & refinement',
				// PLACEHOLDER: replace with real content
				text: 'Translate performance into clear next steps, so spend stays focused on what converts.',
				// PLACEHOLDER: replace with real content
				tag: 'Insight + optimisation',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'Not sure which campaigns fit? Start with your goals, audience and landing experiences. We can explore the priorities together.',
	},
	showcase: {
		// PLACEHOLDER: replace with real content
		pill: 'One connected experience',
		// PLACEHOLDER: replace with real content
		titleLines: ['Different clicks.', 'The same clarity.'],
		// PLACEHOLDER: replace with real content
		text: 'Effective paid media is more than winning the click. It means aligning message, creative and landing pages so every journey feels coherent.',
		panel: {
			// PLACEHOLDER: replace with real content
			label: 'CAMPAIGN EXPLORATION',
			// PLACEHOLDER: replace with real content
			note: 'Concept · Not client work',
			image: {
				src: serviceShowcaseImage(SLUG), // expected: /images/ppc-google-ads-showcase-image.webp
				// PLACEHOLDER: replace with real content
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			// PLACEHOLDER: replace with real content
			caption:
				'Illustrative layout exploration with generated architectural photography.',
		},
		items: [
			// PLACEHOLDER: replace with real content
			'Messaging that keeps its promise',
			// PLACEHOLDER: replace with real content
			'Landing pages that feel natural',
			// PLACEHOLDER: replace with real content
			'Calls to action within reach',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until PPC icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		// PLACEHOLDER: replace with real content
		pill: 'Working together',
		// PLACEHOLDER: replace with real content
		titleLines: ['Good work starts', 'with a good partnership.'],
		image: {
			src: serviceProcessImage(SLUG), // expected: /images/ppc-google-ads-working-together-image.webp
			// PLACEHOLDER: replace with real content
			alt: 'Team members sketching ideas on paper at a wooden table',
			width: 960,
			height: 540,
		},
		items: [
			{
				// PLACEHOLDER: replace with real content
				title: 'A scope shaped around your needs',
				// PLACEHOLDER: replace with real content
				text: 'Agree the channels, campaign priorities and measurement before the work begins. A shared brief keeps paid media focused and makes decisions easier.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A shared view of the work',
				// PLACEHOLDER: replace with real content
				text: 'Bring your offer, landing pages and business goals into the conversation. Review direction together as campaigns take shape.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A considered handover',
				// PLACEHOLDER: replace with real content
				text: 'Discuss reporting, account access and the practical information you need to stay informed. Any ongoing support can be scoped separately.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'A useful starting point: your existing campaigns, your goals, your landing pages and any performance insight you already have.',
	},
	faqKey: 'ppc-google-ads',
};
