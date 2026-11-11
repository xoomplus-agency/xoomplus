import type { MainService } from './types';

const SLUG = 'social-media-marketing';
const NAME = 'Social Media Marketing';

export const socialMediaMarketing: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Connect your message with the right people.',
	metaTitle: 'Social Media Marketing Manchester | Content & Campaigns',
	metaDescription:
		'Struggling to keep your social pages active? XoomPlus provides Social Media Marketing in Manchester, from content planning to campaign management.',
	children: [
		// Name kept for mega menu; page not generated (disabled).
		{
			slug: 'content-creative-direction',
			name: 'Content & creative direction',
			shortName: 'Content & Creative',
			disabled: true,
		},
		{
			slug: 'campaign-planning',
			name: 'Campaign planning',
			shortName: 'Campaign Planning',
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
		pill: 'Social Media Marketing & Management',
		pillBrand: 'XoomPlus',
		titleLines: [
			'Social Media Marketing Manchester |',
			'Drives Meaningful Growth',
		],
		textParagraphs: [
			'Many businesses struggle to build brand awareness and connect with the right audience on social media. Without a clear strategy, their content may fail to attract engagement, generate leads or deliver meaningful results.',
			'At XoomPlus, we provide strategic social media marketing in Manchester and across the UK to help businesses overcome these challenges. We create targeted strategies that build brand awareness, reach potential customers and encourage meaningful engagement.',
		],
		primaryButton: { label: 'Book a free audit call', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Explore our process', href: '#process' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'Content + Creative + Campaigns',
		panelLabel: 'CONTENT / CREATIVE / CAMPAIGNS',
		panelPlus: '',
		panelImage: {
			src: '/images/social-media-marketing-hero.webp',
			alt: 'Website shown on a laptop and a phone',
		},
		panelCaptions: ['Clear messaging', 'Consistent presence', 'Ongoing refinement'],
	},
	features: {
		pill: 'Strategy That Works For You',
		titleLines: ['What Is Social Media', 'Management?'],
		text: 'Social media management is the process of planning, creating, publishing and managing content across social media platforms such as Facebook, Instagram and LinkedIn.',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Create a Clear Brand Voice',
				text: 'Help your audience recognise your business through consistent messaging, visual direction and meaningful content.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Reach the right people',
				text: 'Use targeted campaigns and audience insights to connect with potential customers in Manchester and across the UK who are most likely to engage with your business.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Build beyond one platform',
				text: 'Create a connected social presence across Instagram, Facebook, TikTok and LinkedIn.',
			},
		],
	},
	experience: {
		pill: 'Content & Management',
		titleLines: ['Make Every Post', 'Feel Purposeful.'],
		text: 'As a social media agency in Manchester, we start with understanding your audience. Then shape your content, campaigns and creative direction around your target audience.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'Social Media Management',
				text: 'Build a consistent online presence with planned content, audience engagement and ongoing account management.',
			},
			{
				icon: 'landing-page-design',
				title: 'Reels & Short-Form Content',
				text: 'Turn ideas into engaging videos designed for modern audiences and fast-moving platforms.',
			},
			{
				icon: 'website-redesign',
				title: 'Monthly Content Calendar',
				text: 'Bring structure to your social media with a clear monthly plan designed around your goals.',
			},
		],
	},
	bento: {
		pill: 'Paid Growth & Advertising',
		title: 'Professional Social Media Advertising Services',
		text: 'Our social media services turn engagement into measurable results and business growth.',
		mainCard: {
			icon: '/icons/service-circles.svg',
			title: 'Social Media Marketing in Manchester',
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
				icon: 'wordpress-development',
				title: 'Meta Ads',
				text: 'Create targeted Facebook and Instagram campaigns designed around your objectives.',
			},
			{
				icon: 'sopify-development',
				title: 'TikTok Ads',
				text: 'Connect with audiences through creative campaigns designed for TikTok’s fast-moving environment.',
			},
			{
				icon: 'ecommerce-development',
				title: 'LinkedIn Marketing',
				text: 'Build professional authority and connect with valuable business audiences.',
			},
			{
				icon: 'custom-website-development',
				title: 'Google Business Profile',
				text: 'Improve your local visibility across Manchester and other UK locations, helping nearby customers discover, trust and connect with your business online.',
			},
		],
	},
	showcase: {
		pill: 'A Connected Social Experience',
		titleLines: ['Different Platforms.', 'Different Strategies.'],
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
		note: 'A useful starting point: your existing channels, your goals, the audiences you want to reach and any content or brand assets you already have.',
	},
	why: {
		id: 'why-xoomplus',
		pill: 'Why Xoomplus',
		title: 'Why Choose Xoomplus for Social Media Marketing Services',
		text: '6 Reasons Why Brands Choose Xoomplus Over Other Social Media Marketing Agencies',
		cards: [
			{
				icon: '/icons/strategy-first.svg',
				title: 'Audit & Research',
				text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
			},
			{
				icon: '/icons/experienced-team.svg',
				title: 'The A Team',
				text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium social media services and the results you need.',
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
	faqKey: 'social-media-marketing',
};
