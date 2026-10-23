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
		title: 'Search Engine Optimisation (SEO)',
		description:
			'Capture long-term organic demand on Google and emerging AI search engines. We build technical authority, fix indexation blockers and dominate competitive regional search terms across Manchester and nationwide.',
		items: [
			'AI SEO (GEO & AEO)',
			'Local SEO',
			'Technical SEO',
			'On-Page SEO',
			'Off-Page SEO (Link Building)',
			'SEO Audits',
			'E-commerce SEO',
		],
		buttonLabel: 'Explore Full SEO Services',
		href: '/services/seo',
	},
	{
		id: 'web-design',
		icon: '/icons/service-layers.svg',
		title: 'Web Design & Custom Development',
		description:
			'Your website is your primary sales engine. We engineer custom, mobile-optimised WordPress, Shopify and bespoke web platforms built for speed, security and maximum conversion.',
		items: [
			'UI/UX Design',
			'Custom Web Development',
			'WordPress & Shopify',
			'Landing Pages',
			'Website Redesigns',
			'Maintenance & Support',
		],
		buttonLabel: 'Explore Web Development Services',
		href: '/services/web-design-development',
	},
	{
		id: 'social-media',
		icon: '/icons/service-circles.svg',
		title: 'Social Media Marketing',
		description:
			'Build authentic brand authority where your audience spends their time. We blend commercial content planning with intelligent AI-driven visual design to keep your business top of mind.',
		items: [
			'Social Media Strategy',
			'AI Creative Direction',
			'Multi-Platform Management (LinkedIn, Meta, TikTok)',
			'Community Growth',
		],
		buttonLabel: 'Explore Social Media Services',
		href: '/services/social-media-marketing',
	},
	{
		id: 'ppc',
		icon: '/icons/service-circles.svg',
		title: 'PPC & Google Ads',
		description:
			'Generate commercial inquiries from ready-to-buy customers. We build, manage and continuously optimise Google Search, Shopping and Performance Max ad campaigns.',
		items: [
			'Google Search Ads',
			'Performance Max Campaigns',
			'Precision Retargeting',
			'Negative Keyword Optimisation',
			'Commercial ROAS Tracking',
		],
		buttonLabel: 'Explore PPC & Paid Search',
		href: '/services/ppc-google-ads',
	},
];
