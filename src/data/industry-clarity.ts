export type IndustryClarityItem = {
	title: string;
	/** Supporting line. Omit to hide with no reserved space. */
	text?: string;
	/** Amber service-line tag (dark theme). Omit to hide with no reserved space. */
	tag?: string;
};

export type IndustryClarityColumn = {
	/** Column heading. Omit to hide with no reserved space. */
	title?: string;
	/** Eyebrow label. Dark: amber under title. Light: gray above title. */
	eyebrow?: string;
	/** Column intro. Omit to hide with no reserved space. */
	text?: string;
	items: IndustryClarityItem[];
	/** Optional CTA under the items (e.g. Explore service →). */
	button?: { label: string; href: string };
};

export type IndustryClarityVariant = 'default' | 'centered';
export type IndustryClarityTheme = 'dark' | 'light';

export type IndustryClaritySection = {
	id: string;
	/** `centered` = location dark header stack; default = side-by-side header. */
	variant?: IndustryClarityVariant;
	/** `light` = #F7F7F5 surface + dark text. Default dark. */
	theme?: IndustryClarityTheme;
	pill: string;
	/** Single-line title (dark sections). Prefer `titleLines` for light two-line headings. */
	title?: string;
	/** Two-line title (light section). When set, used instead of `title`. */
	titleLines?: [string, string];
	text: string;
	columns: IndustryClarityColumn[];
	/** Footer note. Omit to hide with no reserved space. */
	note?: string;
};

export const industryClarity: IndustryClaritySection = {
	id: 'clarity',
	pill: 'Authority & Compliance',
	title: 'Simplify Complex Services for Easier Conversion',
	text: 'In high-trust, regulated industries, clear explanations build confidence much faster than buzzwords.',
	columns: [
		{
			items: [
				{
					title: 'Medical Reporting',
					text: 'We help your audience understand what you offer, how you can deliver and the credentials you have for the job.',
				},
				{
					title: 'Legal Practices',
					text: 'We break down complex casework, legal steps and fee structures so clients feel confident booking an initial consultation.',
				},
				{
					title: 'Accounting & Finance',
					text: 'We simplify corporate tax advice, payroll, and bookkeeping retainers with total clarity and zero ambiguity for better conversion.',
				},
			],
		},
		{
			items: [
				{
					title: 'Property Valuation & Development',
					text: 'We help you explain planning permissions, development yields and property specifications for buyers and investors.',
				},
				{
					title: 'Fleet & Logistics',
					text: 'Our strategy highlights fleet capacity, nationwide route networks and quick rate calculations for commercial logistics contracts.',
				},
				{
					title: 'Specialist Health Clinics',
					text: 'We help you build medically accurate information that answers patient concerns and makes private consultations simple to book.',
				},
			],
		},
	],
};
