export type IndustryFeatureItem = {
	icon: string;
	title: string;
	text: string;
	tag: string;
};

export type IndustryFeatureImage = {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	/** Optional caption under the image (location rows). Omit = no caption, no space. */
	caption?: string;
};

export type IndustryFeatureVariant = 'panel' | 'image-list' | 'image-text-rows';

/**
 * For `image-text-rows` only:
 * - reverse false → image LEFT, text RIGHT
 * - reverse true → text LEFT, image RIGHT
 * (Opposite boolean of panel/image-list, where reverse true = visual LEFT.)
 *
 * `paragraphs[1]` and `tag` are optional — omit to hide with no reserved space.
 * `id` is optional when rows are passed from location data (generated if missing).
 */
export type IndustryFeatureRow = {
	id?: string;
	reverse?: boolean;
	titleLines: [string, string];
	image: IndustryFeatureImage;
	/** First paragraph required; second is optional (slightly darker when present). */
	paragraphs: [string] | [string, string];
	/** Amber service-line tag; omit when not needed. */
	tag?: string;
};

export type IndustryFeature = {
	id: string;
	/** Optional — omit to hide the pill with no reserved space. */
	pill?: string;
	titleLines?: [string, string];
	paragraphs?: string[];
	/** `panel` = Retail (default). `image-list` = Hospitality. `image-text-rows` = stacked photo rows. */
	variant?: IndustryFeatureVariant;
	items?: IndustryFeatureItem[];
	image?: IndustryFeatureImage;
	list?: string[];
	rows?: IndustryFeatureRow[];
	/**
	 * panel / image-list: when true, visual sits LEFT and copy RIGHT.
	 * (Unused on image-text-rows — each row has its own `reverse`.)
	 */
	reverse?: boolean;
};

/** Shared image-text-rows content (Industries + child service defaults). */
export const industryImageTextRows: IndustryFeatureRow[] = [
	{
		id: 'row-1',
		reverse: false,
		titleLines: ['Turn interest into a', 'reason to get in touch.'],
		image: {
			src: '/images/turn-interest-into-a-reason.webp',
			alt: 'A bright gym with floor-to-ceiling windows, weights and yoga mats',
			width: 600,
			height: 390,
		},
		paragraphs: [
			'Bring your facilities, programmes and approach to life. Give prospective members the information they need before an enquiry or introductory visit.',
			'Showcase programmes and spaces with engaging content, then connect social campaigns to a focused enquiry page.',
		],
		tag: 'Social Media Marketing · Landing Page Design · UI/UX Design',
	},
	{
		id: 'row-2',
		reverse: true,
		titleLines: ['Let the details do', 'the talking.'],
		image: {
			src: '/images/let-the-details-do-talking.webp',
			alt: 'A modern apartment building at dusk with warm lit windows',
			width: 600,
			height: 390,
		},
		paragraphs: [
			'Help people explore your property offering through thoughtful imagery, useful location information and an intuitive browsing experience.',
			'Organise property content for discovery and connect listing interest to a viewing or sales enquiry. Any online sales functionality is scoped to your business model.',
		],
		tag: 'Custom Website Development · On-Page SEO · PPC & Google Ads',
	},
];

export const industryFeatures: IndustryFeature[] = [
	{
		id: 'retail-ecommerce',
		variant: 'panel',
		pill: 'Retail & E-commerce',
		titleLines: ['Make discovery feel like the start', 'of a better shop.'],
		paragraphs: [
			'A store needs more than a good first impression.',
			'Search, product information and the shopping experience should support the same customer journey.',
			'Shopify Development or Ecommerce Development could support the store. Social Media Marketing could bring its products and story into the right conversations.',
		],
		items: [
			{
				icon: 'industries-discover',
				title: 'Discover',
				text: 'Relevant categories, helpful content and a search-friendly structure.',
				tag: 'Technical SEO · On-Page SEO',
			},
			{
				icon: 'industries-consider',
				title: 'Consider',
				text: 'Product information, clear navigation and thoughtful mobile experiences.',
				tag: 'UI/UX Design · Ecommerce Development',
			},
			{
				icon: 'industries-take-the-next-step',
				title: 'Take the next step',
				text: 'Align campaign promises with the product or landing page people reach.',
				tag: 'PPC & Google Ads · Landing Page Design',
			},
		],
	},
	{
		id: 'hospitality-leisure',
		variant: 'image-list',
		reverse: true,
		pill: 'Hospitality & Leisure',
		titleLines: ['Bring the experience to life. Make the next', 'step simple.'],
		image: {
			src: '/images/hospitality-and-leisure.webp',
			alt: 'A warm, traditional lounge with leather armchairs, arched windows and a fireplace',
			width: 680,
			height: 460,
		},
		paragraphs: [
			'A visit often starts long before arrival. Photography, useful details and an intuitive website could help people picture the experience and find the route to a booking or enquiry.',
		],
		list: [
			'Local SEO → Help people discover your location',
			'Web Design & Development → Clarify the booking pathway',
			'Social Media Marketing → Share the atmosphere',
			'PPC & Google Ads → Align campaigns with landing pages',
		],
	},
	{
		id: 'industry-rows',
		variant: 'image-text-rows',
		rows: industryImageTextRows,
	},
];

export function getIndustryFeature(id: string): IndustryFeature | undefined {
	return industryFeatures.find((feature) => feature.id === id);
}
