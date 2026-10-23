export type PricingPlanTab = {
	id: 'adhoc' | 'packages';
	label: string;
};

/** Ad Hoc tab — individual service cards (SEO, Social, Web, PPC). */
export type PricingAdhocCard = {
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
	buttonLabel: string;
	href: string;
};

/** Packages tab — Silver / Gold / Platinum tiers. */
export type PricingPackageCard = {
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
	title: string;
	text: string;
	tabs: PricingPlanTab[];
	adhoc: {
		cards: PricingAdhocCard[];
		help: PricingHelpCard;
	};
	packages: {
		cards: PricingPackageCard[];
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
	pill: 'Affordable Scalable Investment',
	title: 'Choose the Right Growth Package for Your Business',
	text: 'Our packages are designed to deliver real value for your money. Our tailored solution gives you access to dedicated experts without any vague retainers.',
	tabs: [
		{ id: 'adhoc', label: 'Ad Hoc' },
		{ id: 'packages', label: 'Packages' },
	],
	adhoc: {
		cards: [
			{
				icon: '/icons/service-circles.svg',
				title: 'SEO',
				price: '£699',
				period: '/month',
				text: seoPlaceholderText,
				items: seoPlaceholderItems,
				buttonLabel: 'View Service',
				href: '/services/seo',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'Social Media Marketing',
				price: '£699',
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
				price: '£1399',
				period: '/month',
				text: webDesignText,
				items: webDesignItems,
				buttonLabel: 'View Service',
				href: '/services/web-design-development',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'PPC & Google Ads',
				price: '£699',
				period: '/month',
				// PLACEHOLDER: replace with real content (design repeats SEO copy/list)
				text: seoPlaceholderText,
				items: seoPlaceholderItems,
				buttonLabel: 'View Service',
				href: '/services/ppc-google-ads',
			},
		],
		help: {
			title: 'Need a bespoke scope tailored to complex multi-site or regulated industry requirements?',
			buttonLabel: 'Request a Custom Commercial Proposal',
			href: '/contact',
		},
	},
	packages: {
		cards: [
			{
				name: 'Growth Essentials (Silver)',
				price: '£1099',
				period: '/month',
				text: 'Best for startups and small businesses establishing a solid digital presence and reliable local leads.',
				includedLabel: "What's Included",
				items: [
					'7-Page Custom Responsive Website',
					'Cloud Hosting, SSL & Daily Backups',
					'4 x Monthly Blog Posts (800–1,000 words)',
					'10 Hours/Mo SEO (On-page & Google Business Profile)',
					'10 Hours/Mo Graphic Design (Socials & Banners)',
					'1 Paid Ad Platform (Google or Meta, up to £1k spend)',
					'Monthly Performance Dashboard',
				],
				buttonLabel: 'Get Silver Package',
				href: '/contact',
			},
			{
				name: 'Performance & Scale (Gold)',
				badge: 'Most Popular',
				featured: true,
				price: '£1699',
				period: '/month',
				text: 'Best for growing companies looking to widen reach, drive steady leads and outrank competitors.',
				includedLabel: "What's Included",
				items: [
					'10-Page Custom Website with Conversion Focus',
					'Dedicated Cloud Hosting & Continuous Monitoring',
					'6 x In-Depth Monthly Articles (1,000–1,500 words)',
					'15 Hours/Mo SEO (Technical, Links & Competitor Gap)',
					'15 Hours/Mo Graphic Design (Ad Creatives & Carousels)',
					'2 Paid Ad Platforms (Google & Meta, up to £3.5k)',
					'Social Media Management (2 Channels)',
					'Monthly Email Newsletter Setup & Dispatch',
					'Bi-Weekly Reports + Monthly Strategy Review Call',
				],
				buttonLabel: 'Get Gold Package',
				href: '/contact',
			},
			{
				name: 'Enterprise & Authority (Platinum)',
				price: '£2299',
				period: '/month',
				text: 'Best for established brands seeking aggressive market expansion and full-scale digital management.',
				includedLabel: "What's Included",
				items: [
					'Bespoke Web App, Custom Build or E-Commerce Store',
					'Enterprise Hosting, CDN & 24/7 Priority Support',
					'8 x Thought-Leadership Articles (1,500+ words)',
					'20 Hours/Mo SEO (Audits, Schema & Global/Local)',
					'20 Hours/Mo Design (Landing Pages, Motion Graphics)',
					'Multi-Platform Paid Ads (Google, Meta, LinkedIn)',
					'Social Media Management (3–4 Channels)',
					'Email Automation & Lead-Nurturing Workflows',
					'Monthly Conversion Rate Optimisation (A/B Testing)',
					'Real-Time Dashboard & Dedicated Account Manager',
				],
				buttonLabel: 'Get Platinum Package',
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
