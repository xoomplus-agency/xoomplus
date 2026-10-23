export type ProjectMetric = {
	value: string;
	label: string;
};

export type ProjectTestimonial = {
	quote: string;
	author: string;
	role: string;
};

export type Project = {
	id: string;
	slug: string;
	category: string;
	name: string;
	image: string;
	imageAlt: string;
	imageClass?: string;
	tags: string[];
	title: string;
	excerpt: string;
	href: string;
	/** Home section only — metrics footer instead of “View Details” */
	metrics?: ProjectMetric[];
	/** Home section category/tags/excerpt overrides (listing uses fields above) */
	homeCategory?: string;
	homeTags?: string[];
	homeExcerpt?: string;
	showOnHome?: boolean;
	homeOrder?: number;
	/** Detail page — client label (defaults to name when omitted) */
	client?: string;
	overview?: string;
	challenge?: string;
	solution?: string;
	results?: string;
	testimonial?: ProjectTestimonial;
	metaTitle?: string;
	metaDescription?: string;
};

const placeholderTags = ['Social Media', 'Web Design'] as const;
const placeholderExcerpt =
	'A modern carpentry website designed to generate leads and showcase custom work.';

/**
 * Shared project data for the home Case Studies section and /case-studies.
 * Listing page uses category / tags / title / excerpt / href as defined here.
 * Home uses metrics + optional homeCategory / homeTags / homeExcerpt when present.
 *
 * Image notes:
 * - Immolibre → /images/Immolibre-project.webp
 * - Gopsych → /images/gopsych-project.webp
 * - Concise Medico → /images/concisemedico-project.webp
 * - Sterling Cooper → /images/sterling-cooper-project.webp
 *
 * Detail routes: /case-studies/<slug> (see pages/case-studies/[slug].astro).
 */
const detailPlaceholder = {
	overview: 'Short project overview. Replace with final copy.',
	challenge: 'Short challenge summary. Replace with final copy.',
	solution: 'Short solution summary. Replace with final copy.',
	results: 'Short results summary. Replace with final copy.',
} as const;

export const projects: Project[] = [
	{
		id: 'concise-medico',
		slug: 'concise-medico',
		category: 'Medico-Legal',
		name: 'Concise Medico',
		image: '/images/concisemedico-project.webp',
		imageAlt: 'Concise Medico website mockup',
		tags: [...placeholderTags],
		title: 'Concise Medico | Medico-Legal',
		excerpt: placeholderExcerpt,
		href: '/case-studies/concise-medico',
		client: 'Concise Medico',
		...detailPlaceholder,
		metrics: [
			{ value: '—', label: 'Metric placeholder' },
			{ value: '—', label: 'Metric placeholder' },
		],
		metaTitle: 'Concise Medico Case Study | Xoomplus',
		metaDescription:
			'Case study: Concise Medico — overview, challenge, solution and results.',
	},
	{
		id: 'gopsych',
		slug: 'gopsych',
		category: 'Psychology & Healthcare Services',
		name: 'Gopsych',
		image: '/images/gopsych-project.webp',
		imageAlt: 'Gopsych website mockup',
		tags: ['Web Design', 'SEO'],
		title: 'Gopsych | Psychology & Healthcare Services',
		excerpt: placeholderExcerpt,
		href: '/case-studies/gopsych',
		homeCategory: 'Psychology & Healthcare Services',
		homeTags: ['Web Design', 'SEO'],
		homeExcerpt:
			'The client needed verified client bookings in a strictly regulated healthcare space. Our strategy included an authoritative technical SEO aligned with targeted regional search optimisation.',
		metrics: [
			{ value: '+240%', label: 'Growth in Organic Inquiries' },
			{ value: '50+', label: 'Leads' },
		],
		showOnHome: true,
		homeOrder: 2,
		client: 'Gopsych',
		overview:
			'Technical SEO and regional search work for a regulated psychology and healthcare service.',
		challenge: 'Needed verified bookings in a strictly regulated healthcare space.',
		solution:
			'Authoritative technical SEO aligned with targeted regional search optimisation.',
		results: 'Strong growth in organic inquiries and qualified leads.',
		metaTitle: 'Gopsych Case Study | Xoomplus',
		metaDescription:
			'Case study: Gopsych — technical SEO and regional search for healthcare bookings.',
	},
	{
		id: 'immolibre',
		slug: 'immolibre',
		category: 'Real Estate Solutions',
		name: 'Immolibre',
		image: '/images/Immolibre-project.webp',
		imageAlt: 'Immolibre website mockup',
		tags: ['Web Design', 'SEO'],
		title: 'Immolibre | Real Estate Solutions',
		excerpt: placeholderExcerpt,
		href: '/case-studies/immolibre',
		homeTags: ['Web Design', 'SEO'],
		homeExcerpt:
			'The client faced limited organic search visibility and low inquiry conversion rates. We built a bespoke custom website paired with targeted Manchester local SEO architecture.',
		metrics: [
			{ value: '+180%', label: 'Organic Traffic Within 6 Months' },
			{ value: '+50', label: 'Leads Per Month' },
		],
		showOnHome: true,
		homeOrder: 1,
		client: 'Immolibre',
		overview:
			'Custom website and Manchester local SEO for a real estate solutions brand.',
		challenge: 'Limited organic visibility and low inquiry conversion rates.',
		solution:
			'Bespoke website paired with targeted Manchester local SEO architecture.',
		results: 'Higher organic traffic and more monthly leads within six months.',
		metaTitle: 'Immolibre Case Study | Xoomplus',
		metaDescription:
			'Case study: Immolibre — custom website and local SEO for real estate growth.',
	},
	{
		id: 'sterling-cooper-consultants',
		slug: 'sterling-cooper-consultants',
		category: 'Accounting & Financial Services',
		name: 'Sterling Cooper Consultants',
		image: '/images/sterling-cooper-project.webp',
		imageAlt: 'Sterling Cooper Consultants website mockup',
		imageClass: 'project-img--sterling',
		tags: [...placeholderTags],
		title: 'Sterling Cooper Consultants | Accounting & Financial Services',
		excerpt: placeholderExcerpt,
		href: '/case-studies/sterling-cooper-consultants',
		client: 'Sterling Cooper Consultants',
		...detailPlaceholder,
		metrics: [
			{ value: '—', label: 'Metric placeholder' },
			{ value: '—', label: 'Metric placeholder' },
		],
		metaTitle: 'Sterling Cooper Consultants Case Study | Xoomplus',
		metaDescription:
			'Case study: Sterling Cooper Consultants — overview, challenge, solution and results.',
	},
];

/** Home Case Studies section — same three cards, same order as before */
export const homeProjects = projects
	.filter((p) => p.showOnHome)
	.sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
