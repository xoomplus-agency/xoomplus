/**
 * "How we work together" — About page source content (shared with child defaults).
 */

export type HowWeWorkImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
	/** Wider first frame on desktop (About layout). */
	wide?: boolean;
};

export type HowWeWorkCard = {
	title: string;
	text: string;
};

export type HowWeWorkContent = {
	pill: string;
	titleLines: [string] | [string, string];
	/** Three lines for desktop forced breaks (About). */
	introLines: [string, string, string];
	images: [HowWeWorkImage, HowWeWorkImage];
	cards: [HowWeWorkCard, HowWeWorkCard, HowWeWorkCard];
};

export const defaultHowWeWork: HowWeWorkContent = {
	pill: 'Collaborative Culture & Industry Insights',
	titleLines: ['High-Performance Strategy Demands', 'Direct Collaboration'],
	introLines: [
		'Exceptional digital performance is not built through disjointed work.',
		'It is built when every department works in synergy towards a single goal:',
		'maximise commercial outcome for you.',
	],
	images: [
		{
			src: '/images/how-we-work-1.webp',
			width: 1020,
			height: 320,
			alt: 'Team members sketching ideas on paper at a wooden table',
			wide: true,
		},
		{
			src: '/images/how-we-work-2.webp',
			width: 600,
			height: 320,
			alt: 'A hand sketching a wireframe in a notebook beside a laptop',
			wide: false,
		},
	],
	cards: [
		{
			title: 'Cross-Disciplinary Strategy',
			text: 'Our developers and SEO strategists work together to ensure technical performance and search readiness are baked into the site from day one.',
		},
		{
			title: 'Direct & Open Feedback Loops',
			text: 'We act as an active extension of your internal team, holding direct conversations that keep projects moving without administrative bottlenecks.',
		},
		{
			title: 'Proactive Innovation',
			text: 'We continually evaluate emerging search trends, Generative AI models (GEO/AEO) and tracking technologies to ensure your business stays ahead.',
		},
	],
};
