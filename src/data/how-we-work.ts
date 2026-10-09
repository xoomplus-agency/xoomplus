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
	pill: 'How we work together',
	titleLines: ["Good ideas don't happen in isolation."],
	introLines: [
		'Our approach to collaboration is simple: bring different perspectives',
		'into the room, respect the craft and keep the business goal in view.',
		'The work gets stronger when everyone can contribute.',
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
			title: 'Ideas are shared early.',
			text: 'We make space for questions, constructive feedback and perspectives from every discipline.',
		},
		{
			title: 'The handover is a conversation.',
			text: 'Design, development and marketing stay connected rather than working in separate lanes.',
		},
		{
			title: 'Learning is part of the work.',
			text: 'We review, reflect and stay open to a better way of solving the next challenge.',
		},
	],
};
