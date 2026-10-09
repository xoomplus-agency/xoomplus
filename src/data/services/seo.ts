import type { MainService } from './types';
import { makeChildService } from './children';
import {
	serviceHeroImage,
	serviceProcessImage,
	serviceShowcaseImage,
} from './images';

const SLUG = 'seo';
const NAME = 'SEO';

export const seo: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Build visibility. Reach the right audience.',
	metaTitle: 'SEO Services | Xoomplus',
	metaDescription:
		'Improve search visibility and reach the right audience with SEO strategy, technical foundations, and content that supports long-term organic growth.',
	children: [
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'ai-seo-geo-aeo', 'AI SEO (GEO & AEO)'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'local-seo', 'Local SEO'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'technical-seo', 'Technical SEO'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'on-page-seo', 'On-Page SEO'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'link-building-off-page', 'Link Building (Off-Page)'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'seo-audit', 'SEO Audit'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'seo-content-marketing', 'SEO Content Marketing'),
	],
	hero: {
		pill: 'SEO',
		pillBrand: 'XoomPlus',
		titleLines: ['Be found', 'for the right reasons.'],
		// PLACEHOLDER: replace with real content
		text: 'Improve your search visibility, reach the right audience, and build a clearer foundation for long-term organic growth.',
		primaryButton: { label: 'Discuss your project', href: '/contact' },
		secondaryLink: { label: 'Explore the possibilities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'AI SEO + Local + Technical',
		// PLACEHOLDER: replace with real content
		panelLabel: 'SEARCH / CONTENT / GROWTH',
		panelImage: {
			src: serviceHeroImage(SLUG), // expected: /images/seo-hero-image.webp
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear priorities', 'Useful content', 'Measurable growth'],
	},
	features: {
		// PLACEHOLDER: replace with real content
		pill: 'Built around people',
		// PLACEHOLDER: replace with real content
		titleLines: ['Not just rankings.', 'The right visibility.'],
		// PLACEHOLDER: replace with real content
		text: 'Search is where intent meets your offer. We bring strategy, content and technical foundations into one conversation, so the people who find you are the people you want to reach.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'make-the-next-step-clear',
				// PLACEHOLDER: replace with real content
				title: 'Make the next step clear',
				// PLACEHOLDER: replace with real content
				text: 'Help people understand your offer in search, find what matters and move naturally towards an enquiry or purchase.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'bring-your-brand-into-focus',
				// PLACEHOLDER: replace with real content
				title: 'Bring your brand into focus',
				// PLACEHOLDER: replace with real content
				text: 'Create a consistent search presence that gives your content clarity and your business a recognisable voice in the results.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'think-beyond-one-screen',
				// PLACEHOLDER: replace with real content
				title: 'Think beyond one keyword',
				// PLACEHOLDER: replace with real content
				text: 'Shape visibility around how people search — from a local query to a deeper research journey across channels and devices.',
			},
		],
	},
	experience: {
		// PLACEHOLDER: replace with real content
		pill: 'Strategy & foundations',
		// PLACEHOLDER: replace with real content
		titleLines: ['Make every page', 'earn its place.'],
		// PLACEHOLDER: replace with real content
		text: 'Start with the people searching for what you offer. Then shape structure, content and technical foundations around what they need to find and trust.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'ui-ux-design',
				// PLACEHOLDER: replace with real content
				title: 'On-Page SEO',
				// PLACEHOLDER: replace with real content
				text: 'Give each page a clearer role in search, with considered titles, structure and content that matches intent.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'landing-page-design',
				// PLACEHOLDER: replace with real content
				title: 'Local SEO',
				// PLACEHOLDER: replace with real content
				text: 'Bring your local presence into focus — so nearby customers can find you when it matters.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'website-redesign',
				// PLACEHOLDER: replace with real content
				title: 'Technical SEO',
				// PLACEHOLDER: replace with real content
				text: 'Strengthen the foundations that help search engines crawl, understand and trust your site.',
			},
		],
		// PLACEHOLDER: replace with real content
		footnote:
			'We shape priorities, page requirements and measurement around your goals, rather than starting with a one-size-fits-all checklist.',
	},
	bento: {
		// PLACEHOLDER: replace with real content
		pill: 'Search capabilities',
		// PLACEHOLDER: replace with real content
		title: 'Clear priorities. The right foundations.',
		// PLACEHOLDER: replace with real content
		text: 'Choose the work around your audience, your market and your goals. Search strategy should serve visibility — not define it before the conversation begins.',
		mainCard: {
			// PLACEHOLDER: replace with real content — reuse overview icon until SEO art lands
			icon: '/icons/service-circles.svg',
			title: 'SEO',
			// PLACEHOLDER: replace with real content
			description:
				'Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.',
			items: [
				'AI SEO (GEO & AEO)',
				'Local SEO',
				'Technical SEO',
				'On-Page SEO',
				'Link Building (Off-Page)',
				'SEO Audit',
				'SEO Content Marketing',
			],
			// PLACEHOLDER: replace with real content
			buttonLabel: 'Discuss your SEO',
			href: '/contact',
		},
		cards: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'wordpress-development',
				// PLACEHOLDER: replace with real content
				title: 'AI SEO (GEO & AEO)',
				// PLACEHOLDER: replace with real content
				text: 'Prepare your content for AI-driven search and answer experiences, so your brand stays visible as discovery changes.',
				// PLACEHOLDER: replace with real content
				tag: 'GEO + AEO readiness',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'sopify-development',
				// PLACEHOLDER: replace with real content
				title: 'Local SEO',
				// PLACEHOLDER: replace with real content
				text: 'Strengthen your local signals and presence so nearby customers can find and trust you.',
				// PLACEHOLDER: replace with real content
				tag: 'Maps + local intent',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'ecommerce-development',
				// PLACEHOLDER: replace with real content
				title: 'Technical SEO',
				// PLACEHOLDER: replace with real content
				text: 'Improve crawlability, performance and structure so search engines can understand your site clearly.',
				// PLACEHOLDER: replace with real content
				tag: 'Crawl + performance',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
				icon: 'custom-website-development',
				// PLACEHOLDER: replace with real content
				title: 'SEO Content Marketing',
				// PLACEHOLDER: replace with real content
				text: 'Shape useful content around search intent, so visibility is backed by pages people actually want to read.',
				// PLACEHOLDER: replace with real content
				tag: 'Content + intent',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'Not sure where to start? Begin with your goals, your market and your current visibility. We can explore the priorities together.',
	},
	showcase: {
		// PLACEHOLDER: replace with real content
		pill: 'One connected experience',
		// PLACEHOLDER: replace with real content
		titleLines: ['Different queries.', 'The same clarity.'],
		// PLACEHOLDER: replace with real content
		text: 'Good SEO is more than ranking a single page. It means aligning content, structure and technical foundations so every search journey feels coherent.',
		panel: {
			// PLACEHOLDER: replace with real content
			label: 'SEARCH EXPLORATION',
			// PLACEHOLDER: replace with real content
			note: 'Concept · Not client work',
			image: {
				src: serviceShowcaseImage(SLUG), // expected: /images/seo-showcase-image.webp
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
			'Content that matches intent',
			// PLACEHOLDER: replace with real content
			'Structure that search can follow',
			// PLACEHOLDER: replace with real content
			'Signals that build trust',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		// PLACEHOLDER: replace with real content
		pill: 'Working together',
		// PLACEHOLDER: replace with real content
		titleLines: ['Good work starts', 'with a good partnership.'],
		image: {
			src: serviceProcessImage(SLUG), // expected: /images/seo-working-together-image.webp
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
				text: 'Agree the priorities, technical requirements and measurement before the work begins. A shared brief keeps SEO focused and makes decisions easier.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A shared view of the work',
				// PLACEHOLDER: replace with real content
				text: 'Bring your market knowledge, content and business goals into the conversation. Review direction together as visibility takes shape.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A considered handover',
				// PLACEHOLDER: replace with real content
				text: 'Discuss reporting, content ownership and the practical information you need to keep improving. Any ongoing support can be scoped separately.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'A useful starting point: your existing website, your goals, your target audience and any search or analytics insight you already have.',
	},
	faqKey: 'seo',
};
