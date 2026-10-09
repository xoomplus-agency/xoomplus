export type ServicesBehindCard = {
	icon: string;
	title: string;
	description: string;
	items: string[];
	buttonLabel: string;
	href: string;
};

export type ServicesBehindSection = {
	id: string;
	pill: string;
	title: string;
	text: string;
	/** Exactly 3 ServiceCards. */
	cards: [ServicesBehindCard, ServicesBehindCard, ServicesBehindCard];
};

/**
 * Icons match home Our Services cards (`src/data/services.ts`):
 * SEO / Social → service-circles.svg, Web → service-layers.svg.
 * Third card links to `/services/social-media-marketing` as a placeholder
 * (covers Social + Paid; no combined route yet).
 */
export const servicesBehind: ServicesBehindSection = {
	id: 'services-behind',
	pill: 'The services behind the possibilities',
	title: 'Different needs. Connected digital capabilities.',
	text: 'The same core services can be shaped around different audiences, journeys and business priorities. Explore the full offer on our Services page.',
	cards: [
		{
			icon: '/icons/service-circles.svg',
			title: 'SEO',
			description:
				"Connect your audience's questions with useful content and stronger search foundations.",
			items: [
				'AI SEO (GEO & AEO)',
				'Local SEO',
				'Technical SEO',
				'On-Page SEO',
				'Link Building (Off-Page)',
				'SEO Audit',
				'SEO Content Marketing',
			],
			buttonLabel: 'Explore search capabilities',
			href: '/services/seo',
		},
		{
			icon: '/icons/service-layers.svg',
			title: 'Web Design & Development',
			description:
				'Build a purposeful experience around your services, products and the way people choose.',
			items: [
				'UI/UX Design',
				'Landing Page Design',
				'Website Redesign',
				'WordPress Development',
				'Shopify Development',
				'Ecommerce Development',
				'Custom Website Development',
			],
			buttonLabel: 'Explore website capabilities',
			href: '/services/web-design-development',
		},
		{
			icon: '/icons/service-circles.svg',
			title: 'Social & Paid Campaigns',
			description:
				'Connect creative, audience thinking and relevant landing pages in one shared direction.',
			items: [
				'Social Media Marketing',
				'Content & creative direction',
				'Campaign planning',
				'PPC & Google Ads',
				'Audience & keyword research',
				'Landing page alignment',
				'Reporting & refinement',
			],
			buttonLabel: 'Explore campaign services',
			href: '/services/social-media-marketing',
		},
	],
};
