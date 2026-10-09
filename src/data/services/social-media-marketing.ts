import type { MainService } from './types';
import { makeChildService } from './children';
import {
	serviceHeroImage,
	serviceProcessImage,
	serviceShowcaseImage,
} from './images';

const SLUG = 'social-media-marketing';
const NAME = 'Social Media Marketing';

export const socialMediaMarketing: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Connect your message with the right people.',
	metaTitle: 'Social Media Marketing | Xoomplus',
	metaDescription:
		'Connect your message with the right people through thoughtful social content, creative direction, and consistent channel presence.',
	children: [
		// PLACEHOLDER: replace with real content
		// Slug mismatch vs menu slugify: slugify would be content-and-creative-direction
		makeChildService(NAME, 'content-creative-direction', 'Content & creative direction'),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'campaign-planning', 'Campaign planning'),
		// PLACEHOLDER: replace with real content
		// Slug mismatch vs menu slugify: slugify would be reporting-and-refinement
		makeChildService(NAME, 'reporting-refinement', 'Reporting & refinement'),
	],
	hero: {
		pill: 'Social Media Marketing',
		pillBrand: 'XoomPlus',
		titleLines: ['The right message.', 'A more connected journey.'],
		// PLACEHOLDER: replace with real content
		text: 'Connect your message with the right people through thoughtful content, creative direction and a consistent social presence.',
		primaryButton: { label: 'Discuss your project', href: '/contact' },
		secondaryLink: { label: 'Explore the possibilities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Content + Creative + Campaigns',
		// PLACEHOLDER: replace with real content
		panelLabel: 'CONTENT / CREATIVE / CAMPAIGNS',
		panelImage: {
			src: serviceHeroImage(SLUG), // expected: /images/social-media-marketing-hero-image.webp
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear messaging', 'Consistent presence', 'Ongoing refinement'],
	},
	features: {
		// PLACEHOLDER: replace with real content
		pill: 'Built around people',
		// PLACEHOLDER: replace with real content
		titleLines: ['Not just posts.', 'How your message lands.'],
		// PLACEHOLDER: replace with real content
		text: 'Social is where your brand meets attention. We bring content, creative and campaigns into one conversation, so every channel shares a clear purpose.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'make-the-next-step-clear',
				// PLACEHOLDER: replace with real content
				title: 'Make the next step clear',
				// PLACEHOLDER: replace with real content
				text: 'Help people understand your offer, engage with what matters and move naturally towards an enquiry or visit.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'bring-your-brand-into-focus',
				// PLACEHOLDER: replace with real content
				title: 'Bring your brand into focus',
				// PLACEHOLDER: replace with real content
				text: 'Create a consistent visual and verbal language that gives your content clarity and your business a recognisable presence.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'think-beyond-one-screen',
				// PLACEHOLDER: replace with real content
				title: 'Think beyond one channel',
				// PLACEHOLDER: replace with real content
				text: 'Shape the journey across the platforms your audience uses — from a first scroll to a deeper brand conversation.',
			},
		],
	},
	experience: {
		// PLACEHOLDER: replace with real content
		pill: 'Content & creative',
		// PLACEHOLDER: replace with real content
		titleLines: ['Make every post', 'feel purposeful.'],
		// PLACEHOLDER: replace with real content
		text: 'Start with the people you want to reach. Then shape the message, creative and channel plan around what they need to notice and do.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'ui-ux-design',
				// PLACEHOLDER: replace with real content
				title: 'Content & creative direction',
				// PLACEHOLDER: replace with real content
				text: 'Give your audience a clearer story across posts, with considered visuals and purposeful messaging.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'landing-page-design',
				// PLACEHOLDER: replace with real content
				title: 'Campaign planning',
				// PLACEHOLDER: replace with real content
				text: 'Bring one message into focus. Shape a campaign around audience intent and the action you want them to take.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'website-redesign',
				// PLACEHOLDER: replace with real content
				title: 'Brand and message alignment',
				// PLACEHOLDER: replace with real content
				text: "Reconsider what your social presence needs to say and do, retaining what works and bringing clarity to what doesn't.",
			},
		],
		// PLACEHOLDER: replace with real content
		footnote:
			'We shape the channel mix, content requirements and reporting around your needs, rather than starting with a one-size-fits-all calendar.',
	},
	bento: {
		// PLACEHOLDER: replace with real content
		pill: 'Channels & campaigns',
		// PLACEHOLDER: replace with real content
		title: 'Clear messaging. The right channels.',
		// PLACEHOLDER: replace with real content
		text: 'Choose the work around your audience, your brand and your goals. Social should serve the journey — not define it before the conversation begins.',
		mainCard: {
			// PLACEHOLDER: replace with real content — reuse overview icon until social art lands
			icon: '/icons/service-circles.svg',
			title: 'Social Media Marketing',
			// PLACEHOLDER: replace with real content
			description:
				'Connect your message with the right people through thoughtful content, creative direction and a consistent social presence.',
			items: [
				'Audience understanding',
				'Content & creative direction',
				'Campaign planning',
				'Brand and message alignment',
				'Website journey alignment',
				'Reporting & refinement',
				'A shared direction for your channels',
			],
			// PLACEHOLDER: replace with real content
			buttonLabel: 'Discuss your social marketing',
			href: '/contact',
		},
		cards: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'wordpress-development',
				// PLACEHOLDER: replace with real content
				title: 'Content & creative direction',
				// PLACEHOLDER: replace with real content
				text: 'Shape a content-led presence with a structure that makes your messaging and publishing easier to manage.',
				// PLACEHOLDER: replace with real content
				tag: 'Creative + content rhythm',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'sopify-development',
				// PLACEHOLDER: replace with real content
				title: 'Campaign planning',
				// PLACEHOLDER: replace with real content
				text: 'Shape campaigns around your offer, with considered creative and a coherent path from attention to action.',
				// PLACEHOLDER: replace with real content
				tag: 'Campaigns + creative',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'ecommerce-development',
				// PLACEHOLDER: replace with real content
				title: 'Website journey alignment',
				// PLACEHOLDER: replace with real content
				text: 'Bring social interest and the path to enquiry into one connected experience across channels and your website.',
				// PLACEHOLDER: replace with real content
				tag: 'Social + site journey',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'custom-website-development',
				// PLACEHOLDER: replace with real content
				title: 'Reporting & refinement',
				// PLACEHOLDER: replace with real content
				text: 'Translate performance into clear next steps, so your social activity stays focused on what matters.',
				// PLACEHOLDER: replace with real content
				tag: 'Insight + iteration',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'Not sure which channels fit? Start with your audience, message and priorities. We can explore the social requirements together.',
	},
	showcase: {
		// PLACEHOLDER: replace with real content
		pill: 'One connected experience',
		// PLACEHOLDER: replace with real content
		titleLines: ['Different channels.', 'The same clarity.'],
		// PLACEHOLDER: replace with real content
		text: 'Consistent social marketing is more than posting more often. It means aligning message, creative and destination so every touchpoint feels coherent.',
		panel: {
			// PLACEHOLDER: replace with real content
			label: 'CHANNEL EXPLORATION',
			// PLACEHOLDER: replace with real content
			note: 'Concept · Not client work',
			image: {
				src: serviceShowcaseImage(SLUG), // expected: /images/social-media-marketing-showcase-image.webp
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
			'Messaging that keeps its hierarchy',
			// PLACEHOLDER: replace with real content
			'Creative that feels natural',
			// PLACEHOLDER: replace with real content
			'Calls to action within reach',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		// PLACEHOLDER: replace with real content
		pill: 'Working together',
		// PLACEHOLDER: replace with real content
		titleLines: ['Good work starts', 'with a good partnership.'],
		image: {
			src: serviceProcessImage(SLUG), // expected: /images/social-media-marketing-working-together-image.webp
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
				text: 'Agree the channels, content requirements and reporting before the work begins. A shared brief keeps social focused and makes decisions easier.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A shared view of the work',
				// PLACEHOLDER: replace with real content
				text: 'Bring your brand assets, audience knowledge and business goals into the conversation. Review direction together as the presence takes shape.',
			},
			{
				// PLACEHOLDER: replace with real content
				title: 'A considered handover',
				// PLACEHOLDER: replace with real content
				text: 'Discuss content ownership and the practical information you need to keep publishing. Any ongoing support can be scoped separately.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'A useful starting point: your existing channels, your goals, the audiences you want to reach and any content or brand assets you already have.',
	},
	faqKey: 'social-media-marketing',
};
