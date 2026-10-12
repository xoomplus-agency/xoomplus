export type FaqItem = {
	question: string;
	/** Trusted content only — may include simple HTML (links, strong, lists). */
	answer: string;
};

export type FaqSet = {
	pill?: string;
	heading?: string;
	text?: string;
	items: FaqItem[];
};

export const FAQ_DEFAULTS = {
	pill: 'FAQ',
	heading: 'Frequently Asked Questions',
	text: 'Hear directly from the businesses we work with about their experience working with Xoomplus.',
} as const;

/** Same copy on home / about / our-services for now — edit each page’s set in `faqs` when ready. */
const cloneFaqItems = (items: FaqItem[]): FaqItem[] => items.map((item) => ({ ...item }));

const generalFaqItems: FaqItem[] = [
	{
		question: 'Are these examples of industries you have worked in?',
		answer:
			"This page describes possible uses of XoomPlus's services across the listed sectors. It is not a portfolio of sector projects or a claim of specialist experience. We would discuss suitability and any relevant experience in your first conversation.",
	},
	{
		question: 'What if my industry is not listed?',
		answer:
			'We work with businesses across many sectors. If yours is not listed, get in touch — we will tell you honestly whether we are a good fit and how we can help.',
	},
	{
		question: 'Do I need a whole new website?',
		answer:
			'Not always. Some clients need a full rebuild; others only need targeted improvements to pages, SEO, or lead generation. We recommend what matches your goals and budget.',
	},
	{
		question: 'Can I start with just one service?',
		answer:
			'Yes. Many clients begin with a single service such as SEO, Google Ads, or a website refresh, then expand once they see results.',
	},
	{
		question: 'How do you handle specialist or regulated content?',
		answer:
			'We follow your compliance requirements and work with your team or advisors on sensitive copy. Accuracy and approval processes come first in regulated industries.',
	},
	{
		question: 'What should I include in my enquiry?',
		answer:
			'A short overview of your business, your main goals, your current website or marketing setup, and any timeline or budget range helps us prepare a useful first conversation.',
	},
];

export const faqs: Record<string, FaqSet> = {
	home: {
		items: cloneFaqItems(generalFaqItems),
	},
	about: {
		items: cloneFaqItems(generalFaqItems),
	},
	contact: {
		items: [
			{
				question: 'What happens after I submit the form?',
				answer:
					'We review your message and respond within one working day with next steps or a few clarifying questions.',
			},
			{
				question: 'Is there a cost for an initial conversation?',
				answer: 'No. The first call is exploratory — there is no obligation to proceed.',
			},
			{
				question: 'What information should I include?',
				answer:
					'Your business, what you are trying to achieve, and any deadlines or constraints. Links to your current website or campaigns are helpful.',
			},
			{
				question: 'Do you offer on-site visits?',
				answer:
					'Yes, when useful — especially for local clients. Many projects run entirely online.',
			},
		],
	},
	blogs: {
		items: [
			{
				question: 'How often do you publish new articles?',
				answer:
					'We add posts when we have something useful to share — not on a fixed schedule. Subscribe or check back for updates.',
			},
			{
				question: 'Can I suggest a topic?',
				answer:
					'Yes. If there is a question your industry keeps asking, <a href="/contact">get in touch</a> — we may turn it into a future post.',
			},
			{
				question: 'Who writes the content?',
				answer:
					'Articles are written by people on the Xoomplus team with hands-on experience in web, search and marketing.',
			},
			{
				question: 'May I reuse or quote your articles?',
				answer:
					'Please link to the original post and credit Xoomplus. For republishing, ask us first.',
			},
		],
	},
	'case-studies': {
		items: [
			{
				question: 'Are these live client projects?',
				answer:
					'The case studies on this page are draft directions and illustrative examples unless stated otherwise.',
			},
			{
				question: 'Can you share results or metrics?',
				answer:
					'When we publish verified client work, we share metrics with permission. Draft examples focus on approach, not performance claims.',
			},
			{
				question: 'Do you work in my industry?',
				answer:
					'We adapt our process to many sectors. Tell us about your business and we will be honest about fit and experience.',
			},
			{
				question: 'How do I start a similar project?',
				answer:
					'<a href="/contact">Contact us</a> with your goals and constraints. We will outline a sensible first step.',
			},
		],
	},
	'our-services': {
		items: cloneFaqItems(generalFaqItems),
	},
	industries: {
		items: cloneFaqItems(generalFaqItems),
	},
	seo: {
		items: cloneFaqItems(generalFaqItems),
	},
	'web-design-development': {
		items: cloneFaqItems(generalFaqItems),
	},
	'social-media-marketing': {
		items: cloneFaqItems(generalFaqItems),
	},
	'ppc-google-ads': {
		items: cloneFaqItems(generalFaqItems),
	},
	/** Shared default for nested child service pages — override per child via `ChildService.faq`. */
	'child-service': {
		items: cloneFaqItems(generalFaqItems),
	},
	// PLACEHOLDER: replace with real pricing FAQs
	pricing: {
		pill: 'FAQ',
		heading: 'Pricing questions, answered',
		text: "Clear answers about how our packages and ad hoc pricing work. Can't find what you need? Get in touch and we'll help.",
		items: [
			{
				question: 'What is the difference between Packages and Ad Hoc?',
				answer:
					'Packages are ongoing monthly services built around a single discipline, such as SEO or social media. Ad hoc options are tiered one-off or project-based plans, such as website design and development. We can help you choose the right route.',
			},
			{
				question: 'Are your prices fixed?',
				answer:
					'The prices shown are starting points. The final cost depends on your goals, the scope of work and the level of support you need. We confirm everything in a clear proposal before work begins.',
			},
			{
				question: 'Is there a minimum contract length?',
				answer:
					'We will agree contract terms with you before you commit. Monthly services are scoped around your goals, and we are happy to talk through what suits your business.',
			},
			{
				question: 'What is included in each package?',
				answer:
					'Each package lists its main capabilities. If you need something that is not listed, or want a mix of services, we can build a tailored recommendation.',
			},
			{
				question: 'Can I combine different services?',
				answer:
					'Yes. Many businesses combine services such as SEO, social media and web design. We bring them into one plan so the work stays connected.',
			},
			{
				question: 'How do I get a custom quote?',
				answer:
					'Send us a few details using the form on this page, or get in touch directly. We will review your needs and come back with a tailored recommendation.',
			},
		],
	},
};

export function getFaqSet(page: string): FaqSet | undefined {
	return faqs[page];
}
