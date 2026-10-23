export type CaseStudyOverview = {
	pill: string;
	heading: string;
	/** Each paragraph is an array of visual lines */
	paragraphs: string[][];
};

export type CaseStudyChallengeCard = {
	icon: string;
	title: string;
	text: string;
};

export type CaseStudyChallenge = {
	pill: string;
	heading: string;
	/** Intro — one string per visual line */
	paragraph: string[];
	cards: CaseStudyChallengeCard[];
};

export type CaseStudyStrategyCard = {
	icon: string;
	title: string;
	text: string;
};

export type CaseStudyStrategy = {
	pill: string;
	heading: string;
	/** Intro — one string per visual line */
	paragraph: string[];
	plusIcon: string;
	cards: CaseStudyStrategyCard[];
};

export type CaseStudyDeliveredCard = {
	title: string;
	text: string;
	icon?: string;
};

export type CaseStudyDelivered = {
	pill: string;
	heading: string;
	/** Intro — one string per visual line */
	paragraph: string[];
	cards: CaseStudyDeliveredCard[];
};

export type CaseStudyOutcomeCard = {
	title: string;
	label: string;
	value: string;
};

export type CaseStudyOutcome = {
	pill: string;
	heading: string;
	paragraph: string;
	plusIcon: string;
	cards: CaseStudyOutcomeCard[];
};

export type CaseStudyShowcaseFrame = {
	title: string;
	tag: string;
	imageSrc: string;
	barLabel: string;
	alt?: string;
};

export type CaseStudyShowcase = {
	pill: string;
	heading: string;
	text: string;
	button: { label: string; href: string };
	panel: {
		label: string;
		note: string;
		desktop: { title: string; url: string; imageSrc: string; alt?: string };
		mobile: { title: string; imageSrc: string; alt?: string };
		caption: string;
	};
	frames: CaseStudyShowcaseFrame[];
};

export type CaseStudy = {
	slug: string;
	title: string;
	highlight: string;
	/** Hero intro — one string per visual line */
	description: string[];
	heroPill: string;
	/** Full-bleed hero background (defaults to shared case-study hero) */
	heroImage?: string;
	liveUrl: string;
	client: string;
	industry: string;
	location: string;
	services: string;
	overview: CaseStudyOverview;
	challenge: CaseStudyChallenge;
	strategy: CaseStudyStrategy;
	delivered: CaseStudyDelivered;
	outcome: CaseStudyOutcome;
	showcase?: CaseStudyShowcase;
};

/**
 * Shared detail template (Sterling Cooper). Other studies clone this so styling/structure
 * match; replace body copy/assets per client when final content is ready.
 */
const sterlingCooperCaseStudy: CaseStudy = {
	slug: 'sterling-cooper-consultants',
	title: 'Building a Professional Digital Presence',
	highlight: 'for Sterling Cooper',
	description: [
		'We partnered with Sterling Cooper, a UK-based accountancy firm, to design and develop a professional website that reflects its expertise,',
		'builds client confidence and makes its services easier to explore. From strategic UI/UX design to website development,',
		'we created a digital experience that brings clarity to complex financial services.',
	],
	heroPill: 'Client Success Story | Accounting & Financial Services',
	liveUrl: 'https://example.com',
	client: 'Sterling Cooper Consultants',
	industry: 'Accounting & Financial Services',
	location: 'United Kingdom',
	services: 'Website Design, UI/UX Design and Website Development',
	overview: {
		pill: 'Project Overview',
		heading: 'Creating a Website That Reflects Expertise and Builds Trust',
		paragraphs: [
			[
				'Sterling Cooper needed a professional online presence to present its services clearly',
				'to businesses and individuals across the UK.',
			],
			[
				'At Xoom Plus, we approached the project with a focus on usability',
				'and visual consistency. We designed and developed a website that',
				"brings Sterling Cooper's core services into focus and helps visitors",
				'navigate relevant information with ease.',
			],
		],
	},
	challenge: {
		pill: 'The Challenge',
		heading: 'Turning Complex Accounting Services into a Clear Digital Experience',
		paragraph: [
			'With a range of accounting, taxation and business advisory services to present, the challenge was to make complex offerings',
			'easy to understand without overwhelming visitors. The website also needed to establish credibility from the first',
			'interaction, guide users towards relevant services and make the next step clear.',
		],
		cards: [
			{
				icon: '/icons/case-studies-single-complex-services.svg',
				title: 'Complex services',
				text: 'Accounting · Taxation · Business advisory',
			},
			{
				icon: '/icons/case-studies-single-clear-service-discovery.svg',
				title: 'Clear service discovery',
				text: 'Relevant information, easier to navigate',
			},
			{
				icon: '/icons/case-studies-single-a-clear-next-step.svg',
				title: 'A clear next step',
				text: 'Credibility, confidence and contact',
			},
		],
	},
	strategy: {
		pill: 'Our Strategy',
		heading: 'From Strategy to a Seamless Website Experience',
		paragraph: [
			'Our approach combined thoughtful UI/UX design with purposeful website development. Rather than focusing on appearance alone,',
			'we considered how visitors would explore the website, understand the firm’s services',
			'and decide whether to get in touch.',
		],
		plusIcon: '/icons/plus-cards-icon.svg',
		cards: [
			{
				icon: '/icons/search.svg',
				title: 'Discovery & Strategic Planning',
				text: 'We began by understanding Sterling Cooper’s services, target audience and business objectives.',
			},
			{
				icon: '/icons/route.svg',
				title: 'UI/UX Design & User Journey',
				text: 'We designed an intuitive, user-focused experience with clear navigation and service pages to guide visitors towards making an enquiry.',
			},
			{
				icon: '/icons/custom-website-development.svg',
				title: 'Website Development & Delivery',
				text: 'We developed a responsive, user-friendly website that strengthens Sterling Cooper’s online presence and makes client enquiries easier.',
			},
		],
	},
	delivered: {
		pill: 'What We Delivered',
		heading: 'Complete UI/UX Design and Development for Sterling Cooper',
		paragraph: [
			'Xoom Plus delivered the core digital experience needed to establish',
			"Sterling Cooper's online presence. Our work brought together visual",
			'design, user experience planning and website development to create a',
			"website aligned with the firm's professional services and business objectives.",
		],
		cards: [
			{
				icon: '/icons/service-circles.svg',
				title: 'Website Design',
				text: "We created a professional website design that communicates credibility and presents Sterling Cooper's services in a clear and structured format.",
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'UI/UX Design',
				text: 'We focused on how visitors interact with the website. The aim was to make the overall experience straightforward, intuitive and user-friendly.',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'Website Development',
				text: 'We developed the website to bring the approved design and user experience to life. The focus was on translating the visual concept into a functional digital platform that supports service discovery and client enquiries.',
			},
			{
				icon: '/icons/service-circles.svg',
				title: 'Responsive Website Experience',
				text: 'We designed the website experience with different screen sizes in mind, helping users access important content across desktop and mobile devices.',
			},
		],
	},
	outcome: {
		pill: 'The Outcome',
		heading: "A Stronger Digital Foundation for Sterling Cooper's Online Presence",
		paragraph:
			"Through the combination of UI/UX design and website development, we created a structured online experience that makes the firm's service offering easier to explore and gives visitors clearer routes towards relevant information and contact options.",
		plusIcon: '/icons/plus-cards-icon.svg',
		cards: [
			{
				title: 'Businesses Served',
				label: 'Value context',
				value: '89%',
			},
			{
				title: 'Website Engagement',
				label: 'Increased by',
				value: '70%',
			},
			{
				title: 'Conversion Rate',
				label: 'Increased by',
				value: '82%',
			},
		],
	},
	showcase: {
		pill: 'Explore the Project',
		heading: 'See the Website in Action',
		text: "Explore the Sterling Cooper website to see how Xoom Plus brought the firm's digital presence to life through professional website design, thoughtful UI/UX and functional development.",
		button: {
			label: 'Visit Sterling Cooper',
			href: 'https://example.com',
		},
		panel: {
			label: 'STERLING COOPER',
			note: 'Desktop & mobile · Awaiting client screenshots',
			desktop: {
				title: 'Desktop homepage',
				url: 'Desktop homepage · Pending client asset',
				imageSrc: '',
				alt: 'Desktop homepage of the Sterling Cooper website',
			},
			mobile: {
				title: 'Mobile homepage',
				imageSrc: '',
				alt: 'Mobile homepage of the Sterling Cooper website',
			},
			caption: 'Website screenshot to be supplied',
		},
		frames: [
			{
				title: 'Accounting, taxation & advisory',
				tag: 'Pending asset',
				imageSrc: '',
				barLabel: 'Service section · Pending client asset',
				alt: 'Accounting, taxation & advisory of the Sterling Cooper website',
			},
			{
				title: 'Contact & enquiry',
				tag: 'Pending asset',
				imageSrc: '',
				barLabel: 'Contact / enquiry section · Pending client asset',
				alt: 'Contact & enquiry of the Sterling Cooper website',
			},
		],
	},
};

type CaseStudyIdentity = {
	slug: string;
	client: string;
	industry: string;
	/** Short name for titles / showcase labels (defaults to client) */
	brand?: string;
	liveUrl?: string;
	heroImage?: string;
	/** Desktop Safari mock image in the Explore the Project panel */
	showcaseDesktopImage?: string;
	/** Mobile device mock image in the Explore the Project panel */
	showcaseMobileImage?: string;
	/** Safari frame images: [0] service section, [1] contact / enquiry */
	showcaseFrameImages?: [string, string];
	/** Optional frame titles: [0] service section, [1] contact / enquiry */
	showcaseFrameTitles?: [string, string];
};

/** Clone the shared template; swap identity fields only — body copy stays until final content arrives. */
function caseStudyFromTemplate({
	slug,
	client,
	industry,
	brand,
	liveUrl,
	heroImage,
	showcaseDesktopImage,
	showcaseMobileImage,
	showcaseFrameImages,
	showcaseFrameTitles,
}: CaseStudyIdentity): CaseStudy {
	const name = brand ?? client;
	const study = structuredClone(sterlingCooperCaseStudy);
	study.slug = slug;
	study.client = client;
	study.industry = industry;
	study.highlight = `for ${name}`;
	study.heroPill = `Client Success Story | ${industry}`;
	study.title = 'Building a Professional Digital Presence';
	if (liveUrl) study.liveUrl = liveUrl;
	if (heroImage) study.heroImage = heroImage;
	if (study.showcase) {
		study.showcase.button = {
			label: `Visit ${name}`,
			href: study.liveUrl,
		};
		study.showcase.panel.label = name.toUpperCase();
		study.showcase.panel.desktop.alt = `Desktop homepage of the ${name} website`;
		study.showcase.panel.mobile.alt = `Mobile homepage of the ${name} website`;
		if (showcaseDesktopImage) {
			study.showcase.panel.desktop.imageSrc = showcaseDesktopImage;
			study.showcase.panel.desktop.url = `${name} · Desktop homepage`;
			study.showcase.panel.note = 'Desktop & mobile';
			study.showcase.panel.caption = `${name} website`;
		}
		if (showcaseMobileImage) {
			study.showcase.panel.mobile.imageSrc = showcaseMobileImage;
			study.showcase.panel.note = 'Desktop & mobile';
			study.showcase.panel.caption = `${name} website`;
		}
		study.showcase.frames = study.showcase.frames.map((frame, index) => {
			const imageSrc = showcaseFrameImages?.[index];
			const title = showcaseFrameTitles?.[index];
			const next = {
				...frame,
				alt: frame.alt?.replace(/Sterling Cooper/g, name) ?? frame.alt,
			};
			if (title) {
				next.title = title;
				next.alt = `${title} of the ${name} website`;
			}
			if (imageSrc) {
				next.imageSrc = imageSrc;
				next.tag = 'Live preview';
				next.barLabel = next.barLabel.replace(' · Pending client asset', '');
			}
			return next;
		});
	}
	return study;
}

/**
 * Case study detail pages — routes: /case-studies/<slug>
 * Listing hrefs in projects.ts must match these slugs.
 */
export const caseStudies: CaseStudy[] = [
	sterlingCooperCaseStudy,
	caseStudyFromTemplate({
		slug: 'concise-medico',
		client: 'Concise Medico',
		industry: 'Medico-Legal',
		liveUrl: 'https://concisemedico.co.uk/',
		heroImage: '/images/Concise-Medico-Portfolio-Image.webp',
		showcaseDesktopImage: '/images/Concise-Medico-Portfolio-Image.webp',
		showcaseMobileImage: '/images/concisemedico-mobile-home-page.webp',
		showcaseFrameImages: [
			'/images/concise-home-mockup.webp',
			'/images/concise-services-mocup.webp',
		],
		showcaseFrameTitles: ['Medico Legal', 'Contact & enquiry'],
	}),
	caseStudyFromTemplate({
		slug: 'bodykite',
		client: 'Bodykite',
		industry: 'Health and Fitness',
	}),
	caseStudyFromTemplate({
		slug: 'gopsych',
		client: 'Gopsych',
		industry: 'Psychology & Healthcare Services',
	}),
	caseStudyFromTemplate({
		slug: 'immolibre',
		client: 'Immolibre',
		industry: 'Real Estate Solutions',
	}),
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
	return caseStudies.find((study) => study.slug === slug);
}
