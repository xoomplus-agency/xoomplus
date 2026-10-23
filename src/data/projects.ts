export type ProjectMetric = {
	value: string;
	label: string;
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
};

const placeholderTags = ['Social Media', 'Web Design'] as const;
const placeholderTitle = 'Bodykite | Health and Fitness';
const placeholderExcerpt =
	'A modern carpentry website designed to generate leads and showcase custom work.';

/**
 * Shared project data for the home Case Studies section and /case-studies.
 * Listing page uses category / tags / title / excerpt / href as defined here.
 * Home uses metrics + optional homeCategory / homeTags / homeExcerpt when present.
 *
 * Image notes:
 * - Bodykite → /images/Bodykite-project.webp
 * - Immolibre → /images/Immolibre-project.webp
 * - Gopsych → /images/gopsych-project.webp
 * - Concise Medico → /images/concisemedico-project.webp
 * - Sterling Cooper → /images/sterling-cooper-project.webp
 *
 * Detail routes /case-studies/<slug> are placeholders until detail pages exist.
 */
export const projects: Project[] = [
	{
		id: 'concise-medico',
		slug: 'concise-medico',
		category: 'Medico-Legal',
		name: 'Concise Medico',
		image: '/images/concisemedico-project.webp',
		imageAlt: 'Concise Medico website mockup',
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: '/case-studies/concise-medico',
	},
	{
		id: 'bodykite',
		slug: 'bodykite',
		category: 'Health and Fitness',
		name: 'Bodykite',
		image: '/images/Bodykite-project.webp',
		imageAlt: 'Bodykite website mockup',
		imageClass: 'case-hero-img--bodykite',
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: '/case-studies/bodykite',
		homeCategory: 'Health & Fitness',
		homeTags: ['Social Media', 'Web Design'],
		homeExcerpt:
			'The client struggled with rising customer acquisition costs. So we built conversion-led landing pages paired with restructured acquisition campaigns.',
		metrics: [
			{ value: '3.8x', label: 'ROAS' },
			{ value: '45%', label: 'Reduction in Acquisition Cost' },
		],
		showOnHome: true,
		homeOrder: 2,
	},
	{
		id: 'gopsych',
		slug: 'gopsych',
		category: 'Medico-Legal',
		name: 'Gopsych',
		image: '/images/gopsych-project.webp',
		imageAlt: 'Gopsych website mockup',
		tags: [...placeholderTags],
		title: placeholderTitle,
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
		homeOrder: 3,
	},
	{
		id: 'immolibre',
		slug: 'immolibre',
		category: 'Real Estate Solutions',
		name: 'Immolibre',
		image: '/images/Immolibre-project.webp',
		imageAlt: 'Immolibre website mockup',
		tags: [...placeholderTags],
		title: placeholderTitle,
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
	},
	{
		id: 'sterling-cooper-consultants',
		slug: 'sterling-cooper-consultants',
		category: 'Smart Solutions, Secure Better Growth',
		name: 'Sterling Cooper Consultants',
		image: '/images/sterling-cooper-project.webp',
		imageAlt: 'Sterling Cooper Consultants website mockup',
		imageClass: 'project-img--sterling',
		tags: [...placeholderTags],
		title: placeholderTitle,
		excerpt: placeholderExcerpt,
		href: '/case-studies/sterling-cooper-consultants',
	},
];

/** Home Case Studies section — same three cards, same order as before */
export const homeProjects = projects
	.filter((p) => p.showOnHome)
	.sort((a, b) => (a.homeOrder ?? 0) - (b.homeOrder ?? 0));
