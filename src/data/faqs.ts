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
		pill: 'FAQ',
		heading: 'Frequently Asked Questions',
		text: 'The only way to find what’s wrong is to ask. Read what our clients have often asked us.',
		items: [
			{
				question: 'What makes Xoomplus different from other UK digital marketing agencies?',
				answer:
					'Most digital marketing agencies operate in disconnected silos, running ads, writing code or performing SEO in complete isolation. Xoomplus bridges these disciplines into a single full-funnel growth engine. Our senior developers, technical SEO strategists and performance marketers collaborate in-house, ensuring your site speed, organic visibility and paid media work together to reduce acquisition costs and maximise revenue.',
			},
			{
				question: 'How does an agency based in Blackburn effectively serve Manchester businesses?',
				answer:
					'Our primary office at 33 King Street, Blackburn provides an agile regional base just outside the city. We actively build and execute campaigns targeting the Manchester commercial market, offering clients direct senior-level attention, high responsiveness and lower overheads without the inflated retainers typical of central Manchester agencies.',
			},
			{
				question: 'How quickly can we expect to see measurable results from our campaigns?',
				answer:
					'Timelines vary by service channel. Paid search (Google Ads) and paid social can generate qualified commercial traffic and leads within the first two to four weeks. Technical SEO, Generative Engine Optimisation (GEO) and organic content strategies compound over time, typically delivering measurable ranking and pipeline growth within three to six months.',
			},
			{
				question: 'Will I work directly with specialists or a junior account manager?',
				answer:
					'You work directly with the dedicated specialists managing your account. We eliminate intermediate account executives to keep communication clear, short and technically sound. When you have a strategy question or need technical adjustments, you speak straight to the senior engineer, SEO director or performance marketer executing the work.',
			},
			{
				question: 'Do you offer flexible contracts, or are we locked into long-term retainers?',
				answer:
					'We believe client retention should be earned through consistent commercial performance, not restrictive lock-ins. Following an initial 3-month foundational onboarding period, where technical audits, architecture builds and core tracking are deployed, we offer transparent rolling monthly agreements backed by clear attribution reporting.',
			},
			{
				question: 'Do you have experience handling compliance-driven and regulated industries?',
				answer:
					'Yes. We regularly work across high-trust sectors including healthcare, property and professional B2B services. Our team builds compliant user funnels, secure web platforms and authoritative organic search strategies that adhere strictly to industry standards while consistently generating high-value qualified inquiries.',
			},
		],
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
		items: [
			{
				question: 'Can we start with just one service, or do we have to take all of them?',
				answer:
					'You can start with a single service. Many clients begin by fixing urgent technical SEO issues, redesigning an underperforming website or taking over their Google Ads campaigns. Once that channel operates profitably, we can include additional services to build an integrated growth engine.',
			},
			{
				question: 'How do your services work together to deliver better results?',
				answer:
					'When your services are managed under one roof, they reinforce each other instead of competing. Your website is built with clean code and fast load times, so your SEO ranks higher, and your Google Ads cost less per click. Social media campaigns direct visitors to dedicated landing pages engineered to convert, giving you better returns across every marketing pound.',
			},
			{
				question: 'How do you tailor these services for businesses in Manchester?',
				answer:
					'We incorporate local geographic targeting across our campaigns. For Manchester clients, our SEO team optimises local map packs, builds North West business citations and targets regional search terms. Our paid media team sets up precise geo-fencing so your ads appear only to decision-makers within your target operational territory.',
			},
			{
				question: 'How long does it take to see measurable results from these services?',
				answer:
					'PPC and Google Ads deliver targeted traffic and leads within the first few weeks of campaign launch. Website design and development projects typically take 4 to 8 weeks depending on scope. SEO and organic content strategies compound over time, typically showing strong ranking growth and qualified pipeline expansion within 3 to 6 months.',
			},
			{
				question: 'Will I have a dedicated point of contact for all services?',
				answer:
					'Yes. You work directly with experienced senior specialists rather than junior account executives. Our web engineers, SEO directors and media buyers communicate directly with you, providing straightforward updates, transparent reporting and zero agency jargon.',
			},
			{
				question: 'What should we prepare before our first discovery call?',
				answer:
					'Just a few basics: your website URL, a quick summary of what your business does, your primary growth goals and an approximate monthly budget. We will review your current online footprint before our call so we can share practical, meaningful insights right away.',
			},
		],
	},
	industries: {
		pill: 'FAQ',
		heading: 'Frequently Asked Questions',
		text: 'Common questions and practical answers about how our Manchester digital marketing agency tailors growth for your sector.',
		items: [
			{
				question: 'Why does my business need an industry-specific digital marketing strategy?',
				answer:
					'A local trade business needs quick leads from homeowners, while a commercial law firm or medical agency requires weeks of trust-building, technical authority and compliance. We shape your website, messaging and advertising around how your specific customers evaluate and purchase.',
			},
			{
				question: 'Can Xoomplus handle strictly regulated sectors like legal or healthcare?',
				answer:
					'Yes. We regularly build digital platforms for healthcare practices, medical reporting firms and legal solicitors. We ensure your website content, inquiry forms and data collection meet UK standards (like GDPR) while generating qualified leads.',
			},
			{
				question:
					'How do you help regional companies compete with large national brands in Manchester?',
				answer:
					'Large national competitors often rely on one-size-fits-all campaigns. We help you dominate your target market using localised SEO, optimised Google Business Profiles and geo-targeted ads that reach local decision-makers directly.',
			},
			{
				question: 'What if our service is technical and difficult to explain online?',
				answer:
					'That is where clean web design and straightforward copy matter most. We break down your multi-step processes into clear diagrams, step-by-step guides and plain English, giving prospective clients complete clarity so they feel confident reaching out.',
			},
			{
				question: 'How do we measure whether our industry campaign is successful?',
				answer:
					'We focus on tangible commercial outcomes: confirmed phone calls, completed quote forms, qualified consultations and revenue. You receive clear, monthly reporting without any jargon. So you always know your exact return on investment.',
			},
			{
				question: 'How do we get started with Xoomplus?',
				answer:
					'Book an introductory discovery call with our senior team. We will review your current website, assess your industry competitors and give you practical, straightforward advice on your best opportunities for growth.',
			},
		],
	},
	seo: {
		pill: 'Clear Answers',
		heading: 'Frequently Asked Questions About SEO Services',
		text: 'Straightforward answers on how our Manchester SEO agency helps businesses rank, convert and scale.',
		items: [
			{
				question: 'How long does it take to see measurable results from SEO?',
				answer:
					'SEO is a compounding organic investment. Technical fixes and on-page adjustments often show early ranking movements within the first 6 to 8 weeks. For competitive commercial terms in Manchester and across the UK, substantial traffic growth, lead volume and revenue gains typically occur between months 3 and 6.',
			},
			{
				question: 'How does Xoomplus prepare websites for AI Search (GEO & AEO)?',
				answer:
					'Generative Engine Optimisation (GEO) prepares your content to be cited directly in AI overviews from Google Gemini, Perplexity and ChatGPT Search. We structure your content with verified data, clean entity markup and clear frameworks that AI models reference as trusted answers.',
			},
			{
				question: 'Why should a Manchester business choose Xoomplus over local agencies?',
				answer:
					'We regularly meet clients across Greater Manchester for in-person strategy sessions, while running technical operations from our dedicated North West hub, giving you direct senior-level execution without funding an inflated city-centre agency overhead.',
			},
			{
				question: 'Do I need to rebuild my entire website to succeed at SEO?',
				answer:
					'Not usually. If your current site is secure and flexible, our developers can fix code errors, optimise speed and restructure content directly on your existing CMS (WordPress, Shopify, etc.).',
			},
			{
				question: 'Are your SEO contracts locked in for 12 months?',
				answer:
					'No. We believe client retention should be earned through commercial performance, not restrictive contracts. All SEO retainers operate on flexible, rolling monthly agreements.',
			},
			{
				question: 'What do you need from us to begin an SEO campaign?',
				answer:
					'Just your website domain, your primary service goals, target locations and an understanding of your target customers. Our senior search team will run a complimentary audit to identify immediate ranking opportunities before our first strategy call.',
			},
		],
	},
	'web-design-development': {
		pill: 'FAQ',
		heading: 'Frequently Asked Questions About Web Design & Development',
		items: [
			{
				question: 'What is included in web design and development services?',
				answer:
					'Web design and development services can include website planning, UI/UX design, responsive layouts, development, integrations, testing and launch. Deliverables depend on your project requirements and agreed scope.',
			},
			{
				question: 'Which website service does my business need?',
				answer:
					'UI/UX design improves usability, landing page design supports specific campaigns, and website redesign improves existing sites. Web development builds the functionality your website needs.',
			},
			{
				question: 'How long does it take to design and develop a website?',
				answer:
					"Timelines depend on the website's size, complexity, functionality and content readiness. We'll provide a realistic estimate once we've discussed your requirements.",
			},
			{
				question: 'Will my website work on mobile devices?',
				answer:
					'Yes. Our responsive web design adapts layouts, navigation and key interactions to mobile phones, tablets and desktop screens.',
			},
			{
				question: 'Can you improve my existing website instead of building a new one?',
				answer:
					'Yes. We can assess your existing website and recommend targeted improvements or a complete redesign, depending on its condition and your business goals.',
			},
			{
				question: 'Should I choose WordPress, Shopify or custom development?',
				answer:
					'WordPress suits many business websites and blogs, while Shopify is designed for online stores. Custom development is worth considering when you need specialised features, integrations or workflows.',
			},
			{
				question: 'Do you provide web design and development services outside Manchester?',
				answer:
					"XoomPlus supports businesses in Manchester and across the UK. We'll discuss your requirements and recommend an approach suited to your project, platform and business goals.",
			},
		],
	},
	'social-media-marketing': {
		heading: 'You Asked, We Answered',
		items: [
			{
				question: 'Which platforms can you manage?',
				answer:
					'We work across platforms, including Instagram, Facebook, TikTok and LinkedIn, selecting the channels that best match your audience and goals.',
			},
			{
				question: 'Do you create social media content?',
				answer:
					'Yes. We help plan content ideas, create calendars, develop creative concepts and support ongoing content production.',
			},
			{
				question: 'Can you manage paid social media marketing campaigns?',
				answer:
					'Yes. We provide Meta Ads and TikTok Ads management, including campaign planning, optimisation and performance reviews.',
			},
			{
				question: 'How often should businesses post on social media?',
				answer:
					'The right frequency depends on your audience, platform and goals. We create a consistent content approach based on what works best for your business.',
			},
			{
				question: 'Can I start with only one service?',
				answer:
					'Yes. You can begin with a specific service such as content planning, paid advertising or account management and expand when needed.',
			},
		],
	},
	'ppc-google-ads': {
		heading: 'You Asked, We Answered',
		items: [
			{
				question: 'How quickly can PPC campaigns start generating results?',
				answer:
					'PPC campaigns can begin receiving traffic shortly after launch, but optimisation usually improves performance over time.',
			},
			{
				question: 'What platforms do you manage?',
				answer:
					'We specialise in Google Ads, including Search, Display, Remarketing and Shopping campaigns.',
			},
			{
				question: 'Do you provide PPC audits?',
				answer:
					'Yes. We review campaign structure, keywords, targeting, tracking and performance opportunities.',
			},
			{
				question: 'How much should I spend on Google Ads?',
				answer:
					'Budget depends on your industry, competition, goals and target audience. We help create a suitable advertising approach.',
			},
			{
				question: 'Can you improve my existing campaigns?',
				answer:
					'Yes. We analyse existing campaigns and identify opportunities to improve efficiency and conversions.',
			},
		],
	},
	/** Shared default for nested child service pages — override per child via `ChildService.faq`. */
	'child-service': {
		items: cloneFaqItems(generalFaqItems),
	},
	pricing: {
		pill: 'FAQ',
		heading: 'Frequently Asked Questions About Packages & Investment',
		text: 'Straightforward answers about packages, contracts and how we deliver commercial value.',
		items: [
			{
				question: 'Can we start with just one specific service?',
				answer:
					'Yes. While an integrated approach delivers the strongest long-term return, many clients start with a single priority, such as a custom website build, technical SEO overhaul, or Google Ads management. As your inbound pipeline grows, we can easily expand into additional channels.',
			},
			{
				question: 'What if my industry is not listed on your website?',
				answer:
					'The core commercial framework, such as clear positioning, high-speed website engineering and high-intent search capture, applies across every sector. During our discovery call, we examine your target customer personas, sales cycles and competitors to build a bespoke strategy for your niche.',
			},
			{
				question: 'Do I need an entirely new website to start digital marketing?',
				answer:
					'Not always. If your existing site is technically sound, secure and fast, we can optimise your current pages and conversion paths. If your site has severe technical flaws or fails Core Web Vitals, we will be transparent about whether an upgrade is needed to protect your marketing investment.',
			},
			{
				question: 'Are these fixed-price packages or can they be tailored?',
				answer:
					'Our Silver, Gold, and Platinum tiers offer structured baselines, but every package is adapted to your specific business requirements, geographic coverage and target acquisition volumes. You receive a customised scope of work before any project begins.',
			},
			{
				question: 'Are we locked into rigid, long-term agency contracts?',
				answer:
					'No. We focus on building lasting client partnerships through measurable commercial outcomes, not restrictive long-term lock-ins.',
			},
			{
				question: 'What should I include in my initial project inquiry?',
				answer:
					'A few basic details are plenty: your website URL, a quick summary of what your business does, your main growth goals and an approximate monthly budget. That gives our senior team everything needed to prepare meaningful insights for our first call.',
			},
		],
	},
};

export function getFaqSet(page: string): FaqSet | undefined {
	return faqs[page];
}
