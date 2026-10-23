export type ServicesBehindCard = {
	icon: string;
	title: string;
	description: string;
	items: string[];
	buttonLabel: string;
	href: string;
};

export type ServicesBehindAdvisory = {
	/** Optional supporting line. Omit to show the button only. */
	text?: string;
	buttonLabel: string;
	href: string;
};

export type ServicesBehindSection = {
	id: string;
	pill: string;
	title: string;
	text: string;
	cards: ServicesBehindCard[];
	/** Optional bottom CTA bar. Omit to hide. */
	advisory?: ServicesBehindAdvisory;
};

/**
 * Icons match home Our Services cards (`src/data/services.ts`):
 * SEO / Social / PPC → service-circles.svg, Web → service-layers.svg.
 */
export const servicesBehind: ServicesBehindSection = {
	id: 'services-behind',
	pill: 'Full-Funnel Digital Marketing Agency',
	title: 'Every Need, Matched With Digital Speed',
	text: 'Every sector relies on different channels to win clients. As a full-service digital marketing agency serving Manchester and the UK, we bring these capabilities together.',
	cards: [
		{
			icon: '/icons/service-circles.svg',
			title: 'Search Engine Optimisation (SEO)',
			description:
				'Our SEO specialists build high-ranking organic systems through rigorous technical site audits, authoritative backlink acquisition and Generative Engine Optimisation (GEO & AEO).',
			items: [
				'AI SEO (GEO & AEO)',
				'Local SEO',
				'Technical SEO',
				'On-Page SEO',
				'Off-Page SEO (Link Building)',
				'Ecommerce SEO',
				'SEO Audit',
			],
			buttonLabel: 'Explore SEO Services',
			href: '/services/seo',
		},
		{
			icon: '/icons/service-layers.svg',
			title: 'Web Design & Development',
			description:
				'Your website should be your most effective commercial asset. We engineer fast, responsive and purpose-driven websites from bespoke WordPress builds to enterprise Shopify solutions.',
			items: [
				'UI/UX Design',
				'Landing Page Design',
				'Website Redesign',
				'WordPress Development',
				'Shopify Development',
				'Ecommerce Development',
				'Custom Website Development',
				'Maintenance & Support',
				'Hosting & Domain Management',
			],
			buttonLabel: 'Explore Web Development',
			href: '/services/web-design-development',
		},
		{
			icon: '/icons/service-circles.svg',
			title: 'Social Media Marketing & AI Creative Strategy',
			description:
				'We combine clear content strategies with bespoke AI-driven creative design and active community management to turn impressions into meaningful brand advocates.',
			items: [
				'Social Media Management',
				'Commercial Content Strategy',
				'Brand Storytelling',
				'AI-Enhanced Visual Design',
				'Creative Direction',
				'Community Engagement',
				'Brand Authority',
			],
			buttonLabel: 'Explore Social Media Marketing',
			href: '/services/social-media-marketing',
		},
		{
			icon: '/icons/service-circles.svg',
			title: 'PPC & Paid Search Advertising',
			description:
				'Our performance media team develops and continuously refines Google Search, Display, and Shopping campaigns to reduce acquisition costs and scale your business predictably.',
			items: [
				'Google Ads Management',
				'Precision Retargeting & Commercial Funnels',
				'High-converting landing pages',
				'Persuasive Ad Copy',
				'Display Ads Optimisation',
				'Performance Monitoring & Reporting',
			],
			buttonLabel: 'Explore PPC Solutions',
			href: '/services/ppc-google-ads',
		},
	],
	advisory: {
		buttonLabel: 'Request an Audit',
		href: '#contact',
	},
};
