export type HomeIndustryCard = {
	icon: string;
	title: string;
	description: string;
};

export type HomeIndustriesContent = {
	title: string;
	intro: string;
	cards: HomeIndustryCard[];
	button: { label: string; href: string };
};

/** Homepage “Industries We Serve” only — does not affect /industries. */
export const homeIndustries: HomeIndustriesContent = {
	title: 'Tailored Digital Strategies for High-Growth Sectors',
	intro:
		'Our industry-specific approach ensures our strategies are built to target the right audience in the right manner, whether it is B2B, B2C or D2C.',
	cards: [
		{
			icon: '/icons/real-estate.svg',
			title: 'Property & Construction',
			description:
				'High-value pipelines, regional search authority and portfolio showcases.',
		},
		{
			icon: '/icons/health-and-fitness.svg',
			title: 'Healthcare & Wellness',
			description:
				'Trust-first, compliant patient generation systems and secure booking funnels.',
		},
		{
			icon: '/icons/accounting-and-finance.svg',
			title: 'Professional & B2B Services',
			description:
				'Authority positioning engineered to capture high-value commercial contracts.',
		},
		{
			icon: '/icons/home-trade-services.svg',
			title: 'Home & Trade Services',
			description:
				'Dominating high-intent local search to secure consistent quote requests and calls.',
		},
		{
			icon: '/icons/transportation-industry.svg',
			title: 'Hospitality & Leisure',
			description:
				'Direct reservation engines and location-targeted digital acquisition campaigns.',
		},
		{
			icon: '/icons/ecommerce-development.svg',
			title: 'Retail & E-commerce',
			description: 'Targeted efforts for commercial growth.',
		},
	],
	button: { label: 'Explore All Industry Solutions', href: '/industries' },
};
