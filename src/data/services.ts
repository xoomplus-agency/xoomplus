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
		title: 'SEO',
		icon: '/icons/service-circles.svg',
		description:
			'Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.',
		features: [
			'AI SEO (GEO & AEO)',
			'Local SEO',
			'Technical SEO',
			'On-Page SEO',
			'Link Building (Off-Page)',
			'SEO Audit',
			'SEO Content Marketing',
		],
		cta: { label: 'View Service', href: '#services-seo' },
	},
	{
		title: 'Web Design & Development',
		icon: '/icons/service-layers.svg',
		description:
			'Create clear, responsive, and purposeful websites designed around your users and business goals.',
		features: [
			'UI/UX Design',
			'Landing Page Design',
			'Website Redesign',
			'WordPress Development',
			'Shopify Development',
			'Ecommerce Development',
			'Custom Website Development',
		],
		cta: { label: 'View Service', href: '#services-web' },
	},
	{
		title: 'Social Media Marketing',
		icon: '/icons/service-circles.svg',
		description:
			'Build a stronger brand presence, engage your audience, and drive consistent growth across the platforms that matter.',
		features: [
			'Social Media Strategy',
			'Content Creation',
			'Community Management',
			'Paid Social Advertising',
			'Influencer Campaigns',
			'Analytics & Reporting',
			'Platform Management',
		],
		cta: { label: 'View Service', href: '#services-social' },
	},
	{
		title: 'PPC & Google Ads',
		icon: '/icons/service-circles.svg',
		description:
			'Drive qualified traffic and measurable conversions with paid campaigns built around your goals and budget.',
		features: [
			'Google Search Ads',
			'Display Advertising',
			'Remarketing Campaigns',
			'Shopping Ads',
			'YouTube Ads',
			'Landing Page Optimization',
			'Conversion Tracking',
		],
		cta: { label: 'Get in touch', href: '#contact' },
	},
];

export const helpCard = {
	title: 'Not Sure Which Service Is Right for Your Business?',
	description:
		'Tell us what you are trying to achieve and we can help you identify the right digital service for your needs.',
	cta: { label: 'Get in touch', href: '#contact' },
};

/** About page "Our Expertise" — same card shape, reference copy. */
export const expertiseServices: ServiceItem[] = [
	{
		title: 'SEO',
		icon: '/icons/service-circles.svg',
		description:
			'Build a stronger search presence with technical thinking, useful content and a clear understanding of your audience.',
		features: [
			'AI SEO (GEO & AEO)',
			'Local SEO',
			'Technical SEO',
			'On-Page SEO',
			'Link Building (Off-Page)',
			'SEO Audit',
			'SEO Content Marketing',
		],
		cta: { label: 'Explore service', href: '/services' },
	},
	{
		title: 'Web Design & Development',
		icon: '/icons/service-circles.svg',
		description:
			'Bring brand and function together in websites that feel considered, work intuitively and support your business.',
		features: [
			'Website strategy',
			'User experience & journeys',
			'Interface design',
			'Responsive development',
			'E-commerce experiences',
			'Website content',
			'Ongoing website care',
		],
		cta: { label: 'Explore service', href: '/services' },
	},
	{
		title: 'Social Media & Paid Ads',
		icon: '/icons/service-circles.svg',
		description:
			'Connect your message with the right people through thoughtful creative, focused campaigns and continual learning.',
		features: [
			'Social Media Marketing',
			'Content & creative direction',
			'Campaign planning',
			'PPC & Google Ads',
			'Audience & keyword research',
			'Landing page alignment',
			'Reporting & refinement',
		],
		cta: { label: 'Explore service', href: '/services' },
	},
];
