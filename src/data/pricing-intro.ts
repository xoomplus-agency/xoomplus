export type PricingIntroButton = {
	label: string;
	href: string;
};

export type PricingIntroImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type PricingIntroSection = {
	id: string;
	pill: string;
	titleDark: string;
	titleAccent: string;
	paragraphs: string[];
	primaryButton: PricingIntroButton;
	secondaryButton: PricingIntroButton;
	image: PricingIntroImage;
};

export const pricingIntro: PricingIntroSection = {
	id: 'pricing-intro',
	pill: 'Transparent Commercial Investment',
	titleDark: 'Digital Marketing Agency',
	titleAccent: 'Engineered for Real Value',
	paragraphs: [
		'We believe pricing should reflect genuine commercial returns, not generic agency retainers. That is what makes Xoomplus a different type of digital marketing agency.',
		'Whether you need targeted local SEO across Manchester, a conversion-engineered custom website or a connected multi-channel growth system, Xoomplus designs flexible packages around your margins, audience and actual revenue targets.',
	],
	primaryButton: { label: 'Book a Strategy Call', href: '#pricing-form' },
	secondaryButton: { label: 'Explore Packages', href: '#pricing-plans' },
	image: {
		src: '/images/pricing-section-image.webp',
		alt: 'Illustration of marketing dashboards showing brand growth, services and website traffic',
		width: 730,
		height: 707,
	},
};
