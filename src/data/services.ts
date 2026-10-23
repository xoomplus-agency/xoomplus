export type ServiceItem = {
	title: string;
	icon: string;
	description: string;
	features: string[];
	cta: { label: string; href: string };
};

/** Home page "Our Services" cards — keep content stable for identical output. */
export const services: ServiceItem[] = [
	{
		title: 'Search Engine Optimisation (SEO)',
		icon: '/icons/service-circles.svg',
		description:
			'Our SEO specialists build high-ranking organic systems to scale your business.',
		features: [
			'AI SEO (GEO & AEO)',
			'Local SEO',
			'Technical SEO',
			'On-Page SEO',
			'Off-Page SEO (Link Building)',
			'E-commerce SEO',
			'SEO Audit',
		],
		cta: { label: 'Explore SEO Services', href: '/services/seo' },
	},
	{
		title: 'Web Design & Development',
		icon: '/icons/service-layers.svg',
		description:
			'We engineer fast, responsive and purpose-driven websites to build your commercial asset.',
		features: [
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
		cta: { label: 'Explore Web Development', href: '/services/web-design-development' },
	},
	{
		title: 'Social Media Marketing & AI Creative Strategy',
		icon: '/icons/service-circles.svg',
		description:
			'We combine clear content strategies with bespoke creative design and active community management to turn visitors into brand advocates.',
		features: [
			'Social Media Management',
			'Commercial Content Strategy',
			'Brand Storytelling',
			'AI-Enhanced Visual Design',
			'Creative Direction',
			'Community Engagement',
			'Brand Authority',
		],
		cta: { label: 'Explore Social Media Marketing', href: '/services/social-media-marketing' },
	},
	{
		title: 'PPC & Paid Search Advertising',
		icon: '/icons/service-circles.svg',
		description:
			'We develop and refine Google Search, Display and Shopping campaigns to reduce acquisition costs and scale your business predictably.',
		features: [
			'Google Ads Management',
			'Precision Retargeting & Commercial Funnels',
			'High-converting landing pages',
			'Persuasive Ad Copy',
			'Display Ads Optimisation',
			'Performance Monitoring & Reporting',
		],
		cta: { label: 'Explore PPC Solutions', href: '/services/ppc-google-ads' },
	},
];

export const helpCard = {
	title: 'Not Sure Which Service Is Right for Your Business?',
	description:
		'Tell us what you are trying to achieve and we can help you identify the right digital service for your needs.',
	cta: { label: 'Get in touch', href: '#contact' },
};

/** About page "Our Expertise" — same card shape as home Services. */
export const expertiseServices: ServiceItem[] = [
	{
		title: 'Organic Search Authority (SEO)',
		icon: '/icons/service-circles.svg',
		description:
			'High-intent organic visibility driven by technical audits, high-authority backlink development, Manchester local SEO and GEO to capture qualified search demand.',
		features: [
			'AI SEO (GEO & AEO)',
			'Local SEO',
			'Technical SEO',
			'On-Page SEO',
			'Link Building',
			'Ecommerce SEO',
			'SEO Audit',
		],
		cta: { label: 'Explore SEO Services', href: '/services/seo' },
	},
	{
		title: 'Web Design & Custom Development',
		icon: '/icons/service-layers.svg',
		description:
			'Fast, conversion-focused websites engineered on bespoke frameworks to deliver smooth user journeys and turn inbound traffic into qualified leads.',
		features: [
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
		cta: { label: 'Explore Web Development', href: '/services/web-design-development' },
	},
	{
		title: 'Social Media Strategy & AI Creative Design',
		icon: '/icons/service-circles.svg',
		description:
			'Brand positioning supported by data-backed content roadmaps, AI-driven visual design and community management that builds brand authority.',
		features: [
			'Social Media Management',
			'Commercial Content Strategy',
			'Brand Storytelling',
			'AI-Enhanced Visual Design',
			'Creative Direction',
			'Community Engagement',
			'Brand Authority',
		],
		cta: { label: 'Explore Social Media Marketing', href: '/services/social-media-marketing' },
	},
	{
		title: 'Targeted PPC & Google Ads',
		icon: '/icons/service-circles.svg',
		description:
			'High-intent search advertising and retargeting campaigns built on Google Search, Shopping and Performance Max to drive prospects into optimised conversion funnels.',
		features: [
			'Google Ads Management',
			'Precision Retargeting & Commercial Funnels',
			'High-converting landing pages',
			'Persuasive Ad Copy',
			'Display Ads Optimisation',
			'Performance Monitoring & Reporting',
		],
		cta: { label: 'Explore PPC Solutions', href: '/services/ppc-google-ads' },
	},
];
