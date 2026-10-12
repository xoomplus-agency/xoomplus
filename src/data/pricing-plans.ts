export type PricingPlanTab = {
	id: 'packages' | 'adhoc';
	label: string;
};

export type PricingPackageCard = {
	icon: string;
	title: string;
	price: string;
	period: string;
	text: string;
	items: string[];
	buttonLabel: string;
	href: string;
};

export type PricingHelpCard = {
	title: string;
	text: string;
	buttonLabel: string;
	href: string;
};

export type PricingAdhocCard = {
	name: string;
	price: string;
	period: string;
	text: string;
	includedLabel: string;
	items: string[];
	buttonLabel: string;
	href: string;
	badge?: string;
	featured?: boolean;
};

export type PricingPlansSection = {
	id: string;
	pill: string;
	pillBrand: string;
	title: string;
	text: string;
	tabs: PricingPlanTab[];
	packages: {
		cards: PricingPackageCard[];
		help: PricingHelpCard;
	};
	adhoc: {
		cards: PricingAdhocCard[];
		cta: {
			text: string;
			buttonLabel: string;
			href: string;
		};
	};
};

/** Same SEO body + feature list as the design (repeated on Social / PPC). */
const seoPlaceholderText =
	'Improve your search visibility, reach the right audience, and create a stronger foundation for long-term organic growth.';

const seoPlaceholderItems = [
	'AI SEO (GEO & AEO)',
	'Local SEO',
	'Technical SEO',
	'On-Page SEO',
	'Link Building (Off-Page)',
	'SEO Audit',
	'SEO Content Marketing',
];

const webDesignItems = [
	'UI/UX Design',
	'Landing Page Design',
	'Website Redesign',
	'WordPress Development',
	'Shopify Development',
	'Ecommerce Development',
	'Custom Website Development',
];

const webDesignText =
	'From user experience and landing pages to complete website development, create a digital experience designed around your business goals.';

/** Icons match home page Our Services cards (src/data/services.ts). */
export const pricingPlans: PricingPlansSection = {
	id: 'web-design-development',
	pill: 'Web Design & Development',
	pillBrand: 'XoomPlus',
	title: 'Choose the Right Service for Your Business',
	text: "Every business has different goals, challenges, and priorities. That's why our digital marketing services are designed to be flexible, with solutions tailored around what your business actually needs.",
	tabs: [
		{ id: 'packages', label: 'Packages' },
		{ id: 'adhoc', label: 'Ad Hoc' },
	],
	packages: {
		cards: [
			{
				icon: '/icons/service-circles.svg',
				title: 'SEO',
				price: '£299',
				period: '/month',
				text: seoPlaceholderText,
				items: seoPlaceholderItems,
				buttonLabel: 'View Service',
				href: '/services/seo',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'Social Media Marketing',
				price: '£299',
				period: '/month',
				// PLACEHOLDER: replace with real content (design repeats SEO copy/list)
				text: seoPlaceholderText,
				items: seoPlaceholderItems,
				buttonLabel: 'View Service',
				href: '/services/social-media-marketing',
			},
			{
				icon: '/icons/service-layers.svg',
				title: 'Web Design & Development',
				price: '£299',
				period: '/month',
				text: webDesignText,
				items: webDesignItems,
				buttonLabel: 'View Service',
				href: '/services/web-design-development',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'PPC & Google Ads',
				price: '£299',
				period: '/month',
				// PLACEHOLDER: replace with real content (design repeats SEO copy/list)
				text: seoPlaceholderText,
				items: seoPlaceholderItems,
				buttonLabel: 'View Service',
				href: '/services/ppc-google-ads',
			},
		],
		help: {
			title: 'Not Sure Which Service Is Right for Your Business?',
			text: 'Tell us what you are trying to achieve and we can help you identify the right digital service for your needs.',
			buttonLabel: 'Get in touch',
			href: '/contact',
		},
	},
	adhoc: {
		cards: [
			{
				name: 'Silver',
				price: '£299',
				period: '/month',
				text: webDesignText,
				includedLabel: "What's Included",
				items: webDesignItems,
				buttonLabel: 'Get Website Pricing',
				href: '/contact',
			},
			{
				name: 'Gold',
				badge: 'Best Value',
				featured: true,
				price: '£599',
				period: '/month',
				text: webDesignText,
				includedLabel: "What's Included",
				items: webDesignItems,
				buttonLabel: 'Get Website Pricing',
				href: '/contact',
			},
			{
				name: 'Platinum',
				price: '£899',
				period: '/month',
				text: webDesignText,
				includedLabel: "What's Included",
				items: webDesignItems,
				buttonLabel: 'Get Website Pricing',
				href: '/contact',
			},
		],
		cta: {
			text: 'Ready to find the right service for your business?',
			buttonLabel: 'Get in touch',
			href: '/contact',
		},
	},
};
