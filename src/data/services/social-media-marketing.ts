import type { MainService } from './types';
import { makeChildService } from './children';
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
		makeChildService(NAME, 'content-creative-direction', 'Content & creative direction', {
			shortName: 'Content & Creative',
		}),
		// PLACEHOLDER: replace with real content
		makeChildService(NAME, 'campaign-planning', 'Campaign planning', {
			shortName: 'Campaign Planning',
		}),
		// PLACEHOLDER: replace with real content
		// Slug mismatch vs menu slugify: slugify would be reporting-and-refinement
		makeChildService(NAME, 'reporting-refinement', 'Reporting & refinement', {
			shortName: 'Reporting & Refinement',
		}),
	],
	hero: {
		pill: 'Social Media Marketing & Management',
		pillBrand: 'XoomPlus',
		titleLines: [
			'Social Media Marketing Strategy',
			'That Drives Meaningful Growth.',
		],
		text: 'At XoomPlus, we provide strategic social media marketing in Manchester and across the UK, helping businesses build brand awareness, connect with the right audiences and turn engagement into meaningful growth.',
		primaryButton: { label: 'Book a free audit call', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Explore our process', href: '#process' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Content + Creative + Campaigns',
		// PLACEHOLDER: replace with real content
		panelLabel: 'CONTENT / CREATIVE / CAMPAIGNS',
		panelPlus: '',
		panelImage: {
			src: '/images/social-media-marketing-hero.webp',
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear messaging', 'Consistent presence', 'Ongoing refinement'],
	},
	features: {
		pill: 'Strategy that works for you',
		titleLines: ['Not just what you post.', 'How your audience connects.'],
		text: 'Your social media presence is where people discover your brand and understand your message. Our social media marketing services in Manchester combine strategy and targeted advertising to create social experiences that are built for growth.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'make-the-next-step-clear',
				title: 'Create a Clear Brand Voice',
				text: 'Help your audience recognise your business through consistent messaging, visual direction and meaningful content.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'bring-your-brand-into-focus',
				title: 'Reach the right people',
				text: 'Use targeted campaigns and audience insights to connect with potential customers in Manchester and across the UK who are most likely to engage with your business.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'think-beyond-one-screen',
				title: 'Build beyond one platform',
				text: 'Create a connected social presence across Instagram, Facebook, TikTok and LinkedIn.',
			},
		],
	},
	experience: {
		pill: 'Content & Management',
		titleLines: ['Make every post', 'feel purposeful.'],
		text: 'We start with understanding your audience. Then shape your content, campaigns and creative direction around what they need to see, understand and act on.',
		items: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'ui-ux-design',
				title: 'Social Media Management',
				text: 'Build a consistent online presence with planned content, audience engagement and ongoing account management.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'landing-page-design',
				title: 'Reels & Short-Form Content',
				text: 'Turn ideas into engaging videos designed for modern audiences and fast-moving platforms.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'website-redesign',
				title: 'Monthly Content Calendar',
				text: 'Bring structure to your social media with a clear monthly plan designed around your goals.',
			},
		],
		// PLACEHOLDER: replace with real content
		footnote:
			'We shape the channel mix, content requirements and reporting around your needs, rather than starting with a one-size-fits-all calendar.',
	},
	bento: {
		pill: 'Paid Growth & Advertising',
		title: 'The right message. In front of the right audience.',
		text: 'Great content builds attention. Strategic social media marketing turns that attention into measurable opportunities.',
		mainCard: {
			// PLACEHOLDER: replace with real content — reuse overview icon until social art lands
			icon: '/icons/service-circles.svg',
			title: 'Social Media Marketing',
			description:
				"Whether you're a Manchester-based business looking to attract local customers or a UK company aiming to expand its reach, we develop a strategy around your objectives.",
			items: [
				'Social Media Management',
				'Facebook & Instagram Ads',
				'TikTok Advertising',
				'LinkedIn Growth Strategy',
				'Reels & Creative Content',
				'Monthly Content Planning',
				'Audience & Campaign Strategy',
			],
			buttonLabel: 'Discuss your plan',
			href: '/contact',
		},
		cards: [
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'wordpress-development',
				title: 'Meta Ads',
				text: 'Create targeted Facebook and Instagram campaigns designed around your objectives.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'sopify-development',
				title: 'TikTok Ads',
				text: 'Connect with audiences through creative campaigns designed for TikTok’s fast-moving environment.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'ecommerce-development',
				title: 'LinkedIn Marketing',
				text: 'Build professional authority and connect with valuable business audiences.',
			},
			{
				// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
				icon: 'custom-website-development',
				title: 'Google Business Profile',
				text: 'Improve your local visibility across Manchester and other UK locations, helping nearby customers discover, trust and connect with your business online.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'Not sure which channels fit? Start with your audience, message and priorities. We can explore the social requirements together.',
	},
	showcase: {
		pill: 'A Connected Social Experience',
		titleLines: ['Different platforms.', 'Different Strategies.'],
		text: 'Your audience moves between platforms every day. A successful social media marketing strategy creates consistency while adapting to how people use each channel.',
		plainPanel: true,
		panel: {
			label: '',
			note: '',
			image: {
				src: '/images/social-media-marketing-a-connected-social-experience.webp',
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			caption: '',
		},
		items: [
			'Content that reflects your brand',
			'Messaging that converts audience',
			'Campaigns built around your goals',
			'Social experiences designed for action',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until social icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'Working together',
		titleLines: ['You have a vision.', 'We have a team to get you there.'],
		image: {
			src: '/images/social-media-marketing-working-together.webp',
			alt: 'Team collaborating on social media strategy and creative planning',
			width: 960,
			height: 540,
		},
		items: [
			{
				title: 'A strategy shaped around your business',
				text: 'Your audience, goals and brand identity guide every decision. We avoid one-size-fits-all approaches and create social media marketing strategies that fit your needs.',
			},
			{
				title: 'A Shared Creative Process',
				text: 'Your brand insight combined with our content expertise helps create posts, campaigns and ideas that represent your business in the right way.',
			},
			{
				title: 'Clear Communication Throughout',
				text: 'From planning and content creation to campaign reporting, we keep you involved with clear updates and a transparent process.',
			},
		],
		// PLACEHOLDER: replace with real content
		note: 'A useful starting point: your existing channels, your goals, the audiences you want to reach and any content or brand assets you already have.',
	},
	faqKey: 'social-media-marketing',
};
