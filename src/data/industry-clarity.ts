export type IndustryClarityItem = {
	title: string;
	text: string;
	/** Amber service-line tag (dark theme). Omit to hide with no reserved space. */
	tag?: string;
};

export type IndustryClarityColumn = {
	title: string;
	/** Eyebrow label. Dark: amber under title. Light: gray above title. */
	eyebrow?: string;
	text: string;
	items: IndustryClarityItem[];
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
	pill: 'Clarity before the enquiry',
	title: 'Make complex services easier to understand.',
	text: 'When people need to make a considered decision, clear information and a purposeful next step matter more than noise.',
	columns: [
		{
			title: 'Medical Reporting',
			eyebrow: 'Local visibility · Quote enquiries',
			text: 'Help potential referrers and enquirers understand your reporting services, coverage and enquiry requirements.',
			items: [
				{
					title: 'Explain the service clearly',
					text: 'Organise service pages around report types, how an enquiry begins and what information your team needs.',
					tag: 'UI/UX Design · WordPress Development',
				},
				{
					title: 'Connect discovery to a quote request',
					text: 'Align location and service content with clear contact routes, without asking visitors to navigate unnecessary steps.',
					tag: 'Local SEO · On-Page SEO · Landing Page Design',
				},
			],
		},
		{
			title: 'Legal',
			eyebrow: 'Authority building · Qualified enquiries',
			text: 'Give visitors a clear view of your practice areas and help them find the most relevant route to your team.',
			items: [
				{
					title: 'Build an informative first impression',
					text: 'Structure practice-area pages and useful articles around the questions prospective enquirers are asking.',
					tag: 'SEO Content Marketing · Website Redesign',
				},
				{
					title: 'Make the next step specific',
					text: 'Bring search intent, campaign messaging and enquiry pages together around the services you want to communicate.',
					tag: 'PPC & Google Ads · Landing Page Design',
				},
			],
		},
	],
	note: 'Your subject experts review service information and any professional or regulatory wording. We shape the digital experience around that approved content.',
};
