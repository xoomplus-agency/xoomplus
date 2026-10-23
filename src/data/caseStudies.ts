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
	heroImage: '/images/Sterling-Cooper-Consultants-Portfolio-Main-Image-New.webp',
	liveUrl: 'https://sterlingcooperconsultants.co.uk/',
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
			href: 'https://sterlingcooperconsultants.co.uk/',
		},
		panel: {
			label: 'STERLING COOPER',
			note: 'Desktop & mobile',
			desktop: {
				title: 'Desktop homepage',
				url: 'Sterling Cooper · Desktop homepage',
				imageSrc: '/images/Sterling-Cooper-Consultants-Portfolio-Main-Image-New.webp',
				alt: 'Desktop homepage of the Sterling Cooper website',
			},
			mobile: {
				title: 'Mobile homepage',
				imageSrc: '/images/mobile-home-page.webp',
				alt: 'Mobile homepage of the Sterling Cooper website',
			},
			caption: 'Sterling Cooper website',
		},
		frames: [
			{
				title: 'Accounting, taxation & advisory',
				tag: 'Live preview',
				imageSrc: '/images/about-page.webp',
				barLabel: 'Service section',
				alt: 'Accounting, taxation & advisory of the Sterling Cooper website',
			},
			{
				title: 'Contact & enquiry',
				tag: 'Live preview',
				imageSrc: '/images/sterling-cooper-contact-page.webp',
				barLabel: 'Contact / enquiry section',
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
	title?: string;
	highlight?: string;
	description?: string[];
	heroPill?: string;
	location?: string;
	services?: string;
	overview?: CaseStudyOverview;
	challenge?: CaseStudyChallenge;
	strategy?: CaseStudyStrategy;
	delivered?: CaseStudyDelivered;
	outcome?: CaseStudyOutcome;
	showcaseHeading?: string;
	showcaseText?: string;
	showcaseButtonLabel?: string;
	/** Desktop Safari mock image in the Explore the Project panel */
	showcaseDesktopImage?: string;
	/** Mobile device mock image in the Explore the Project panel */
	showcaseMobileImage?: string;
	/** Safari frame images: [0] service section, [1] contact / enquiry */
	showcaseFrameImages?: [string, string];
	/** Optional frame titles: [0] service section, [1] contact / enquiry */
	showcaseFrameTitles?: [string, string];
};

/** Clone the shared template; swap identity fields — body copy stays until final content arrives. */
function caseStudyFromTemplate({
	slug,
	client,
	industry,
	brand,
	liveUrl,
	heroImage,
	title,
	highlight,
	description,
	heroPill,
	location,
	services,
	overview,
	challenge,
	strategy,
	delivered,
	outcome,
	showcaseHeading,
	showcaseText,
	showcaseButtonLabel,
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
	study.title = title ?? 'Building a Professional Digital Presence';
	study.highlight = highlight ?? `for ${name}`;
	study.heroPill = heroPill ?? `Client Success Story | ${industry}`;
	if (description) study.description = description;
	if (location) study.location = location;
	if (services) study.services = services;
	if (overview) study.overview = overview;
	if (challenge) study.challenge = challenge;
	if (strategy) study.strategy = strategy;
	if (delivered) study.delivered = delivered;
	if (outcome) study.outcome = outcome;
	if (liveUrl) study.liveUrl = liveUrl;
	if (heroImage) study.heroImage = heroImage;
	if (study.showcase) {
		if (showcaseHeading) study.showcase.heading = showcaseHeading;
		if (showcaseText) study.showcase.text = showcaseText;
		study.showcase.button = {
			label: showcaseButtonLabel ?? `Visit ${name}`,
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
		industry: 'Medico-Legal Services',
		title: 'Building a Professional Digital Presence',
		highlight: 'for Concise Medico',
		description: [
			'We partnered with Concise Medico, a UK medico-legal firm, to design and develop a professional website that reflects its medical authority,',
			'builds solicitor confidence and makes its nationwide expert panel easier to access. From strategic UI/UX design to custom WordPress development and structured SEO,',
			'we created a digital platform that brings clarity and efficiency to complex medico-legal services across Manchester, Lancashire and the UK.',
		],
		heroPill: 'Client Success Story | Medico-Legal Services',
		location: 'United Kingdom (Manchester & Nationwide)',
		services: 'UI/UX Design, Web Development & Medico-Legal SEO',
		overview: {
			pill: 'Project Overview',
			heading: 'Turning Complex Medico-Legal Services into a Clear Digital Experience',
			paragraphs: [
				[
					'Concise Medico managed an extensive nationwide medical panel across clinical negligence, personal injury and rehabilitation. However, their legacy web presence lacked structure, burying essential expert disciplines behind dense text and confusing pages.',
				],
				[
					'We redesigned their information architecture into distinct clinical hierarchies. Instructing solicitors and insurers can now explore specific expert witness disciplines, turnaround timeframes and clinic locations in two clicks.',
				],
			],
		},
		challenge: {
			pill: 'The Challenge',
			heading: 'Turning Complex Medico-Legal Service into a Clear Digital Experience',
			paragraph: [
				'Concise Medico’s previous web interface failed to show its nationwide medical network, which was essential to win instructions from top-tier legal firms. Case handlers and legal secretaries had to navigate confusing pages to understand service availability or request estimates. In addition, medico-legal search terms often carry immense commercial intent, yet the architecture suffered from thin content, poor schema markup and absent landing pages.',
			],
			cards: [
				{
					icon: '/icons/case-studies-single-complex-services.svg',
					title: 'Complex Service',
					text: 'Medico-legal services require clarity to understand',
				},
				{
					icon: '/icons/case-studies-single-clear-service-discovery.svg',
					title: 'Digital Authority',
					text: 'Concise Medico struggled to replicate its authority on digital platforms',
				},
				{
					icon: '/icons/case-studies-single-a-clear-next-step.svg',
					title: 'Unclear Navigation',
					text: 'Confusing web architecture stopped visitors from requesting service',
				},
			],
		},
		strategy: {
			pill: 'Our Strategy',
			heading: 'From Strategy to a Seamless Website Experience',
			paragraph: [
				'Xoomplus delivered a complete overhaul across user experience, frontend development and search architecture, turning a static corporate brochure into an active commercial asset for Concise Medico.',
			],
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					icon: '/icons/search.svg',
					title: 'Credibility-First UI/UX & E-E-A-T Architecture',
					text: 'We designed a clean visual identity that communicated medical authority, courtroom reliability and regulatory compliance. We also structured clear service hierarchies covering Personal Injury, Clinical Negligence, Diagnostic Imaging and Specialist Rehabilitation.',
				},
				{
					icon: '/icons/route.svg',
					title: 'Streamlined, Multi-Step Instruction Forms',
					text: 'We replaced slow, static contact forms with dedicated, secure instruction pop-ups and multi-step intake flows. Case handlers could securely upload documentation, specify deadlines and submit instructions in under two minutes.',
				},
				{
					icon: '/icons/custom-website-development.svg',
					title: 'Nationwide & Sector-Specific SEO Infrastructure',
					text: 'We implemented structured schema markup (JSON-LD) to clearly identify Concise Medico’s expert panel and operational coverage to search engines. We built dedicated landing pages targeting specialised medical disciplines across key UK regions.',
				},
			],
		},
		delivered: {
			pill: 'What We Delivered',
			heading: 'Complete UI/UX Design, Development and SEO for Concise Medico',
			paragraph: [
				'Xoomplus delivered the complete digital ecosystem required to establish Concise Medico’s market authority.',
				'Our work brought together visual clarity, interactive tool development and search engine optimisation aligned with the firm’s commercial goals.',
			],
			cards: [
				{
					icon: '/icons/service-circles.svg',
					title: 'Website Design',
					text: 'Clean, corporate visual identity and responsive page layouts engineered to reflect courtroom authority, clinical precision, and professional reliability.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'UI/UX Design',
					text: 'Intuitive user journey mapping, multi-step case instruction pop-ups, and an interactive report calculator designed to cut referral friction for busy legal teams.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'Website Development & SEO',
					text: 'Custom, high-speed WordPress development integrated with medical schema markup, localised North West landing pages, and Core Web Vitals optimisation.',
				},
			],
		},
		outcome: {
			pill: 'The Outcome',
			heading: 'A Stronger Digital Foundation for Concise Medico’s Online Presence',
			paragraph:
				'We built targeted landing pages and structured medical data to secure top Google search rankings for medico-legal keywords. This established a reliable, organic acquisition pipeline that reduced dependence on paid advertising.',
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					title: 'Referral Efficiency',
					label: 'Faster case instruction intake and reduced administrative follow-ups',
					value: '89%',
				},
				{
					title: 'Website Engagement',
					label: 'Longer session durations across expert profiles and service hubs',
					value: '70%',
				},
				{
					title: 'Inquiry Growth',
					label: 'Increase in qualified commercial instructions from UK law firms',
					value: '82%',
				},
			],
		},
		liveUrl: 'https://concisemedico.co.uk/',
		heroImage: '/images/Concise-Medico-Portfolio-Image.webp',
		showcaseHeading: 'See the Website in Action',
		showcaseText:
			'Explore the Concise Medico website to see how Xoomplus built the medico-legal company’s digital presence through professional website design, thoughtful UI/UX and targeted regional visibility.',
		showcaseDesktopImage: '/images/Concise-Medico-Portfolio-Image.webp',
		showcaseMobileImage: '/images/concisemedico-mobile-home-page.webp',
		showcaseFrameImages: [
			'/images/concise-home-mockup.webp',
			'/images/concise-services-mocup.webp',
		],
		showcaseFrameTitles: ['Medico Legal', 'Contact & enquiry'],
	}),
	caseStudyFromTemplate({
		slug: 'gopsych',
		client: 'GoPsych',
		industry: 'Healthcare & Medico-Legal Psychology',
		title: 'Building a Professional Digital Presence',
		highlight: 'for GoPsych',
		description: [
			'We partnered with GoPsych, a UK provider of specialist medico-legal psychology services, to design and develop a professional website that presents its expertise,',
			'makes services easier to explore and helps visitors find relevant information. From user-focused design to search engine optimisation,',
			'we created a digital experience tailored to the needs of legal professionals and private clients.',
		],
		heroPill: 'Client Success Story | Healthcare & Medico-Legal Psychology',
		location: 'United Kingdom',
		services: 'Website Design, UI/UX Design, Website Development and SEO',
		liveUrl: 'https://gopsych.co.uk/',
		overview: {
			pill: 'Project Overview',
			heading: 'Making Specialist Psychological Services More Accessible',
			paragraphs: [
				[
					'GoPsych connects clients across the UK with a network of more than 30 HCPC-registered psychologists, offering psychological assessments, medico-legal reports and specialist support to legal professionals, insurers, agencies and private clients. XoomPlus translated this specialist expertise into a clear, intuitive website that strengthens GoPsych’s online presence, brings its core services to the forefront and guides visitors towards the information they need.',
				],
			],
		},
		challenge: {
			pill: 'The Challenge',
			heading: 'Making Specialist Psychology Services Easier to Navigate',
			paragraph: [
				'The website needed to serve audiences with different needs, from legal professionals seeking information for their cases to private clients exploring psychological support. The challenge was to organise complex information into a clear structure, make key services easy to find and create a consistent experience that helps visitors navigate the site with confidence.',
			],
			cards: [
				{
					icon: '/icons/case-studies-single-complex-services.svg',
					title: 'Complex specialist services',
					text: 'Psychological assessments · Medico-legal reports · Expert witness services',
				},
				{
					icon: '/icons/case-studies-single-clear-service-discovery.svg',
					title: 'Diverse audience needs',
					text: 'Legal professionals · Organisations · Private clients',
				},
				{
					icon: '/icons/case-studies-single-a-clear-next-step.svg',
					title: 'Clear service pathways',
					text: 'Relevant information · Easy navigation · Accessible enquiries',
				},
			],
		},
		strategy: {
			pill: 'Our Strategy',
			heading: 'Turning Specialist Expertise into a Clear Digital Experience',
			paragraph: [
				'We combined user-focused design, strategic development and SEO to present GoPsych’s services clearly and help visitors find the information and support they need.',
			],
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					icon: '/icons/search.svg',
					title: 'Discovery & Strategic Planning',
					text: 'We assessed GoPsych’s services, audiences and objectives to define the website structure and content priorities.',
				},
				{
					icon: '/icons/route.svg',
					title: 'UI/UX Design & User Journey',
					text: 'We organised navigation and service information around visitors’ needs, helping them find relevant services and understand the next steps.',
				},
				{
					icon: '/icons/custom-website-development.svg',
					title: 'Website Development & Delivery',
					text: 'We developed a responsive website with clear page structures and SEO-informed organisation to support service discovery across desktop and mobile.',
				},
			],
		},
		delivered: {
			pill: 'What We Delivered · XoomPlus',
			heading: 'A Website Built Around GoPsych’s Expertise and Its Audiences',
			paragraph: [
				'GoPsych’s website needed to do more than present its services. It needed to communicate specialist expertise, make complex information easier to navigate and give different audiences a clear route to relevant services. We brought these priorities together through considered design, intuitive user journeys, responsive development and SEO-informed structure.',
			],
			cards: [
				{
					icon: '/icons/service-circles.svg',
					title: 'Design That Builds Confidence',
					text: 'We created a professional visual experience that reflects the specialist nature of GoPsych’s work, presenting its services in a clear and consistent way.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'User Journeys That Make Sense',
					text: 'We structured page layouts and navigation around how visitors explore services, helping legal professionals and private clients find relevant information without unnecessary steps.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'Development for Everyday Use',
					text: 'We translated the designs into a responsive website, making service information and contact options accessible across desktop and mobile devices.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'SEO Embedded in the Structure',
					text: 'We organised page content and site structure around GoPsych’s services, helping search engines interpret the information and supporting organic discoverability.',
				},
			],
		},
		outcome: {
			pill: 'The Outcome',
			heading: 'A Clearer Digital Experience, Built for Growth',
			paragraph:
				'The new GoPsych website brings its specialist services into a more accessible digital experience. Clearer service pathways, responsive layouts and an SEO-informed structure give visitors a more straightforward way to explore the offering while establishing a foundation for future organic growth.',
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					title: 'Organic Visibility',
					label: 'Increase in search impressions',
					value: '+28%',
				},
				{
					title: 'Service Engagement',
					label: 'Increase in engaged service-page sessions',
					value: '+19%',
				},
				{
					title: 'Website Enquiries',
					label: 'Increase in submitted enquiries',
					value: '+16%',
				},
			],
		},
		heroImage: '/images/gopsych-project-hero.webp',
		showcaseHeading: 'See Specialist Expertise Come to Life Online',
		showcaseText:
			'Explore the GoPsych website and see how professional design, intuitive navigation and clear service pages come together to create a cohesive digital experience. From the homepage to specialist service information, each element helps visitors understand GoPsych’s offering and navigate the website with ease.',
		showcaseButtonLabel: 'Explore the Live Website',
		showcaseDesktopImage: '/images/gopsych-project-hero.webp',
	}),
	caseStudyFromTemplate({
		slug: 'immolibre',
		client: 'Immolibre',
		industry: 'Real Estate',
		title: 'Making Immolibre’s Difference Clear',
		highlight: 'from the First Click',
		description: [
			'We partnered with Immolibre, a French real estate company, to rethink how homeowners experience selling a property online.',
			'The goal was to make it easier for visitors to explore their options, access valuation tools and find the expert support they need.',
			'Through thoughtful website design, intuitive navigation and SEO, we brought these elements together in one cohesive digital experience.',
		],
		heroPill: 'Client Success Story | Real Estate',
		location: 'France',
		services: 'Website Design, UI/UX Design, Website Development & SEO',
		liveUrl: 'http://immolibre10.fr/',
		overview: {
			pill: 'Project Overview',
			heading: 'A Digital Experience Built Around Trust and Simplicity',
			paragraphs: [
				[
					'Immolibre needed a website that made selling a property feel less complicated and helped homeowners feel confident about their next steps.',
				],
				[
					'We focused on creating a clear, welcoming experience where visitors could explore their options, access valuation tools and discover the support available to them. Through thoughtful design and intuitive navigation, we brought Immolibre’s services and expertise together in a website that feels simple to use and easy to trust.',
				],
			],
		},
		challenge: {
			pill: 'The Challenge',
			heading: 'Communicating a Different Approach to Property Sales',
			paragraph: [
				'Selling a property is just as personal, and homeowners need to feel confident about the choices ahead.',
				'Immolibre offers an alternative to traditional estate agencies, combining expert guidance with a more affordable way to sell. The challenge was to bring that promise to life online, creating a website that feels welcoming and trustworthy while making services, valuation tools and practical advice easy to discover.',
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
			heading: 'From Property-Selling Challenges to a Digital Solution',
			paragraph: [
				'Our approach focused on understanding what homeowners need from a property-selling website, translating those needs into a clear user experience, and bringing the final design to life through responsive development.',
			],
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					icon: '/icons/search.svg',
					title: '01. Discovery & Requirements Analysis',
					text: 'We examined Immolibre’s services, its alternative to traditional estate agencies and the information homeowners need when considering a property sale. This informed the website’s priorities and content structure.',
				},
				{
					icon: '/icons/route.svg',
					title: '02. UX Architecture & Interface Design',
					text: 'We organised service information, valuation tools and practical resources into an intuitive website structure. The interface was designed to make Immolibre’s offering easier to understand and help visitors navigate relevant information.',
				},
				{
					icon: '/icons/custom-website-development.svg',
					title: '03. Responsive Development & Implementation',
					text: 'We translated the design into a responsive website, bringing its visual elements, service content and useful tools together in a consistent experience across devices.',
				},
			],
		},
		delivered: {
			pill: 'What We Delivered',
			heading: 'Bringing the Website to Life',
			paragraph: [
				'From planning the user experience to developing the website and its search-focused content, we brought the essential elements together to give Immolibre a cohesive online presence.',
			],
			cards: [
				{
					icon: '/icons/service-circles.svg',
					title: 'Website Design',
					text: "A considered website design that presents Immolibre's services clearly and keeps its core offering front and centre.",
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'UI/UX Design',
					text: 'A structured user experience with straightforward navigation and clearly organised pages, making the website easier to explore.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'Website Development',
					text: 'A responsive website that brings the planned experience to life across desktop and mobile devices.',
				},
				{
					icon: '/icons/service-circles.svg',
					title: 'SEO',
					text: 'Search-focused service pages and supporting resources built around relevant property-selling topics to help homeowners discover Immolibre online.',
				},
			],
		},
		outcome: {
			pill: 'The Outcome',
			heading: 'A Website That Brings It All Together',
			paragraph:
				"The finished website gives Immolibre a cohesive platform for presenting its services, valuation tools and property-selling resources. By bringing these elements together, the website makes the company's offer easier to understand and gives homeowners a straightforward way to explore the support available.",
			plusIcon: '/icons/plus-cards-icon.svg',
			cards: [
				{
					title: 'Brand Design',
					label: 'Design at a Glance',
					value: '89%',
				},
				{
					title: 'Audience Engagement',
					label: 'Design at a Glance',
					value: '80%',
				},
				{
					title: 'SEO',
					label: 'Design at a Glance',
					value: '99%',
				},
			],
		},
		heroImage: '/images/Immolibre-project-hero.webp',
		showcaseHeading: 'Take a Closer Look at Immolibre',
		showcaseText:
			'Explore the website to see how its services, tools and resources come together in one place.',
		showcaseDesktopImage: '/images/Immolibre-project-hero.webp',
		showcaseMobileImage: '/images/Immolibre-Home-Page-Mobile.webp',
		showcaseFrameImages: [
			'/images/Immolibre-Hero-Section.webp',
			'/images/Immolibre-Guide-Page-2-scaled.webp',
		],
	}),
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
	return caseStudies.find((study) => study.slug === slug);
}
