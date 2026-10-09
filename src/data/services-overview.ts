export type ServicesOverviewItem = {
	id: string;
	icon: string;
	title: string;
	description: string;
	items: string[];
	buttonLabel: string;
	href: string;
};

/** Our Services page overview cards — separate from home `services` data. */
export const servicesOverview: ServicesOverviewItem[] = [
	{
		id: 'seo',
		icon: '/icons/service-circles.svg',
		title: 'SEO',
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
		buttonLabel: 'Explore search capabilities',
		href: '#seo',
	},
	{
		id: 'web-design',
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
		buttonLabel: 'Explore website capabilities',
		href: '#web-design',
	},
	{
		id: 'social-media',
		icon: '/icons/service-circles.svg',
		title: 'Social Media Marketing',
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
		buttonLabel: 'Explore social marketing',
		href: '#social-media',
	},
	{
		id: 'ppc',
		icon: '/icons/service-circles.svg',
		title: 'PPC & Google Ads',
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
		buttonLabel: 'Explore paid campaigns',
		href: '#ppc',
	},
];
