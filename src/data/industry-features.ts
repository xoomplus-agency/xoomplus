export type IndustryFeatureItem = {
	icon: string;
	title: string;
	text: string;
	/** Amber service-line tag; omit when not needed. */
	tag?: string;
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
	/** Optional CTA under the copy. */
	button?: { label: string; href: string };
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
		titleLines: ['Turn Interest into a', 'Reason to Get in Touch'],
		image: {
			src: '/images/turn-interest-into-a-reason.webp',
			alt: 'A bright gym with floor-to-ceiling windows, weights and yoga mats',
			width: 600,
			height: 390,
		},
		paragraphs: [
			'Regulated medical and clinical reporting requires trust and speed.',
			'With simplified online instruction forms and a targeted search strategy, we streamlined client onboarding and grew qualified instructions for our healthcare partners.',
		],
		button: {
			label: 'View Healthcare Case Study',
			href: '/case-studies/concise-medico',
		},
	},
	{
		id: 'row-2',
		reverse: true,
		titleLines: ['Let the Details Do', 'the Talking'],
		image: {
			src: '/images/let-the-details-do-talking.webp',
			alt: 'A modern apartment building at dusk with warm lit windows',
			width: 600,
			height: 390,
		},
		paragraphs: [
			'High-value property developments need clear, detailed presentations.',
			'For Immolibre and our Manchester property clients, we built interactive portals highlighting floor plans, locations and specifications, delivering a 180% increase in qualified inquiries.',
		],
		button: {
			label: 'View Property Case Study',
			href: '/case-studies/immolibre',
		},
	},
];

export const industryFeatures: IndustryFeature[] = [
	{
		id: 'retail-ecommerce',
		variant: 'panel',
		pill: 'Frictionless Discovery',
		titleLines: ['Give a premium shopping experience', 'from the start'],
		paragraphs: [
			'Whether you sell consumer goods, wellness products or trade supplies, your digital storefront must be fast, clear and reassuring.',
			'We eliminate lags and drop-off points so visitors can browse with confidence and buy without confusion.',
		],
		items: [
			{
				icon: 'industries-discover',
				title: 'Browse',
				text: 'Clean layouts, fast load speeds and intuitive filters that help buyers find what they need right away.',
			},
			{
				icon: 'industries-consider',
				title: 'Select',
				text: 'Transparent details, high-resolution visuals and practical specifications that build buying confidence.',
			},
			{
				icon: 'industries-take-the-next-step',
				title: 'To Checkout',
				text: 'Streamlined, secure checkout steps designed to prevent cart abandonment and drive repeat business.',
			},
		],
	},
	{
		id: 'hospitality-leisure',
		variant: 'image-list',
		reverse: true,
		pill: 'Physical Spaces & Ambience',
		titleLines: ['Bring the Physical Experience to Life. Make the Next Step Simple', 'step simple.'],
		image: {
			src: '/images/hospitality-and-leisure.webp',
			alt: 'A warm, traditional lounge with leather armchairs, arched windows and a fireplace',
			width: 680,
			height: 460,
		},
		paragraphs: [
			'If you run a venue, hotel, clinic or property firm, your online presence should match your physical appearance. We design visually stunning, responsive web platforms that capture your real atmosphere.',
		],
		list: [
			'High-speed visual layouts that showcase spaces beautifully on every device.',
			'Simple digital schedules, service menus and floor plans that eliminate guesswork.',
			'Clear calls to action connecting visitor interest to confirmed viewings or reservations.',
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
