import type { MainService } from './types';
import { makeChildService } from './children';
import {
	serviceHeroImage,
	serviceProcessImage,
	serviceShowcaseImage,
} from './images';

const SLUG = 'web-design-development';
const NAME = 'Web Design & Development';

export const webDesignDevelopment: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Purposeful experiences. Stronger websites.',
	metaTitle: 'Web Design & Development | Xoomplus',
	metaDescription:
		'Purposeful web design and development — responsive sites, clear user journeys, and experiences aligned with your business goals.',
	children: [
		// PLACEHOLDER: replace with real content
		// Menu URL source of truth: uiux-design (not ui-ux-design)
		makeChildService(NAME, 'uiux-design', 'UI/UX Design'),
		makeChildService(NAME, 'landing-page-design', 'Landing Page Design', {
			placeholder: false,
		}),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'website-redesign', 'Website Redesign'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'wordpress-development', 'WordPress Development'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'shopify-development', 'Shopify Development'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'ecommerce-development', 'Ecommerce Development'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'custom-website-development', 'Custom Website Development'),
	],
	hero: {
		pill: 'Web Design & Development',
		pillBrand: 'XoomPlus',
		titleLines: ['A better website.', 'A stronger foundation.'],
		text: 'Create clear, responsive, and purposeful websites designed around your users and business goals.',
		primaryButton: { label: 'Discuss your project', href: '/contact' },
		secondaryLink: { label: 'Explore the possibilities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'UI/UX + Websites + Ecommerce',
		panelLabel: 'EXPERIENCE / DESIGN / DEVELOPMENT',
		panelImage: {
			src: serviceHeroImage(SLUG),
			alt: 'Website shown on a laptop and a phone',
		},
		panelCaptions: ['Clear structure', 'Considered design', 'Purposeful journeys'],
	},
	features: {
		pill: 'Built around people',
		titleLines: ['Not just how it looks.', 'How it works for you.'],
		text: 'Your website is where your message becomes an experience. We bring design and development into one conversation, so the pages people see and the journeys they take share a clear purpose.',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Make the next step clear',
				text: 'Help people understand your offer, find what matters and move naturally towards an enquiry or purchase.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Bring your brand into focus',
				text: 'Create a consistent visual language that gives your content clarity and your business a recognisable presence.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Think beyond one screen',
				text: 'Shape the experience around the way people browse, from a first mobile visit to a deeper desktop exploration.',
			},
		],
	},
	experience: {
		pill: 'Experience & design',
		titleLines: ['Make every page', 'feel purposeful.'],
		text: 'Start with the people using your website. Then shape the content, structure and visual language around what they need to understand and do.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'UI/UX Design',
				text: 'Give your audience a clearer route through your content, with considered layouts and purposeful interactions.',
				href: `/services/${SLUG}/uiux-design`,
			},
			{
				icon: 'landing-page-design',
				title: 'Landing Page Design',
				text: "Bring one message into focus. Shape a page around the visitor's intent and the action you want them to take.",
				href: `/services/${SLUG}/landing-page-design`,
			},
			{
				icon: 'website-redesign',
				title: 'Website Redesign',
				text: "Reconsider what your website needs to say and do, retaining what works and bringing clarity to what doesn't.",
				href: `/services/${SLUG}/website-redesign`,
			},
		],
		footnote:
			'We shape the platform, page requirements and handover around your needs, rather than starting with a one-size-fits-all build.',
	},
	bento: {
		pill: 'Development & commerce',
		title: 'Considered design. The right foundation.',
		text: 'Choose the build around your content, your products and your requirements. The platform should serve the experience — not define it before the conversation begins.',
		mainCard: {
			icon: '/icons/service-layers.svg',
			title: 'Web Design & Development',
			description:
				'Create clear, responsive, and purposeful websites designed around your users and business goals.',
			items: [
				'UI/UX Design',
				'Landing Page Design',
				'Website Redesign',
				'WordPress Development',
				'Shopify Development',
				'Ecommerce Development',
				'Custom Website Development',
			],
			buttonLabel: 'Discuss your website',
			href: '/contact',
		},
		cards: [
			{
				icon: 'wordpress-development',
				title: 'WordPress Development',
				text: 'Build a content-led website with a structure that makes your pages and publishing needs easier to manage.',
				tag: 'Page templates + content structure',
				href: `/services/${SLUG}/wordpress-development`,
			},
			{
				/* Filename typo in public/icons: sopify-development.svg */
				icon: 'sopify-development',
				title: 'Shopify Development',
				text: 'Shape a storefront around your products, with considered collection pages and a coherent shopping journey.',
				tag: 'Storefront + product presentation',
				href: `/services/${SLUG}/shopify-development`,
			},
			{
				icon: 'ecommerce-development',
				title: 'Ecommerce Development',
				text: 'Bring browsing, product information and the path to purchase into one connected website experience.',
				tag: 'Catalogue + shopping journey',
				href: `/services/${SLUG}/ecommerce-development`,
			},
			{
				icon: 'custom-website-development',
				title: 'Custom Website Development',
				text: 'Translate specific page and functionality requirements into a website shaped around your business.',
				tag: 'Bespoke layouts + scoped functionality',
				href: `/services/${SLUG}/custom-website-development`,
			},
		],
		note: 'Not sure which route fits? Start with your content, products and priorities. We can explore the website requirements together.',
	},
	showcase: {
		pill: 'One connected experience',
		titleLines: ['Different screens.', 'The same clarity.'],
		text: 'Responsive design is more than making a page smaller. It means rethinking the hierarchy, the navigation and the space your content needs.',
		panel: {
			label: 'RESPONSIVE EXPLORATION',
			note: 'Concept · Not client work',
			image: {
				src: serviceShowcaseImage(SLUG),
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			caption:
				'Illustrative layout exploration with generated architectural photography.',
		},
		items: [
			'Content that keeps its hierarchy',
			'Navigation that feels natural',
			'Calls to action within reach',
		],
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'Working together',
		titleLines: ['Good work starts', 'with a good partnership.'],
		image: {
			src: serviceProcessImage(SLUG),
			alt: 'Team members sketching ideas on paper at a wooden table',
			width: 960,
			height: 540,
		},
		items: [
			{
				title: 'A scope shaped around your needs',
				text: 'Agree the pages, platform requirements and handover before the build. A shared brief keeps the work focused and makes decisions easier.',
			},
			{
				title: 'A shared view of the work',
				text: 'Bring your brand assets, content and business knowledge into the conversation. Review the direction together as the website takes shape.',
			},
			{
				title: 'A considered handover',
				text: 'Discuss content management and the practical information you need to take ownership of the website. Any ongoing support can be scoped separately.',
			},
		],
		note: 'A useful starting point: your existing website, your goals, the pages you need and any content or brand assets you already have.',
	},
	faqKey: 'web-design-development',
};
