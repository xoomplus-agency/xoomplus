import type { MainService } from './types';
import { makeChildService } from './children';
import { childServiceHeroImage } from './images';

const SLUG = 'seo';
const NAME = 'SEO';
const aiSeoChild = makeChildService(NAME, 'ai-seo-geo-and-aeo', 'AI SEO (GEO & AEO)', {
	placeholder: false,
	shortName: 'AI SEO',
	secondaryLabel: 'Learn How AI Search Works ↓',
});

const localSeoChild = makeChildService(NAME, 'local-seo', 'Local SEO', {
	placeholder: false,
	shortName: 'Local SEO',
	secondaryLabel: 'How Local Search Works ↓',
});

const technicalSeoChild = makeChildService(NAME, 'technical-seo', 'Technical SEO', {
	placeholder: false,
	shortName: 'Technical SEO',
	secondaryLabel: 'How Technical SEO Works ↓',
});

const onPageSeoChild = makeChildService(NAME, 'on-page-seo', 'On-Page SEO', {
	placeholder: false,
	shortName: 'On-Page SEO',
	secondaryLabel: 'How On-Page Optimisation Works ↓',
});

const linkBuildingChild = makeChildService(NAME, 'link-building-off-page', 'Link Building (Off-Page)', {
	placeholder: false,
	shortName: 'Link Building',
	secondaryLabel: 'How Editorial Link Building Works ↓',
});

const ecommerceSeoChild = makeChildService(NAME, 'e-commerce-seo', 'E-Commerce SEO', {
	placeholder: false,
	shortName: 'E-Commerce SEO',
	secondaryLabel: 'How Ecommerce SEO Works ↓',
});

const seoAuditChild = makeChildService(NAME, 'seo-audit', 'SEO Audit', {
	placeholder: false,
	shortName: 'SEO Audit',
	secondaryLabel: 'How Our Forensic Audit Works ↓',
});

export const seo: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Build visibility. Reach the right audience.',
	metaTitle: 'SEO Services | Xoomplus',
	metaDescription:
		'Improve search visibility and reach the right audience with SEO strategy, technical foundations, and content that supports long-term organic growth.',
	children: [
		{
			...aiSeoChild,
			metaTitle: 'AI SEO in Manchester | Xoomplus',
			metaDescription:
				'Prepare your website for AI search with GEO and AEO strategies that help your business get cited by leading AI platforms.',
			hero: {
				...aiSeoChild.hero,
				pill: 'GEO & AEO',
				titleLines: ['AI SEO in Manchester:', 'Optimising for the Future of Search'],
				paragraphs: [
					'Search is changing fast. People no longer just browse a list of web links; they ask complete questions and read direct answers written by artificial intelligence.',
					'Platforms like Google AI Overviews, ChatGPT Search, Perplexity and Gemini read across the internet to summarise recommendations directly for the user. If your website is not organised for these tools, your business gets left out of the conversation.',
					'At Xoomplus, we set up your site with clear data, verified facts and direct answers so AI engines recognise your company to cite across Manchester and the North West.',
				],
				buttonLabel: 'Request an AI Visibility Review',
				image: {
					...aiSeoChild.hero.image,
					src: childServiceHeroImage('ai-seo-geo-and-aeo'),
				},
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better AI SEO Can Do for Your Business',
			processText: [
				'When potential clients across Manchester and the UK use Google AI Overviews, ChatGPT Search or Gemini to find solutions, these AI engines do not present a directory; they recommend one or two trusted providers directly.',
				'Without structured AI SEO, your business becomes invisible in zero-click searches and to high-intent inquiries. Optimising for generative engines protects your existing market share, positions your brand as a regional authority and ensures your services are recommended.',
			],
			processImage: {
				src: '/images/ai-seo-geo-and-aeo-practical-commercial-value.webp',
				alt: 'AI SEO practical commercial value',
			},
			processPrimaryLabel: 'Book UI/UX Consultation',
			processSecondaryLabel: 'Explore Our Design Process ↓',
			features: {
				pill: 'The Mechanics of AI Search',
				titleLines: ['Beyond Keywords.', 'How Generative AI Understands Your Business.'],
				text: 'Search engines no longer just match keywords typed into a search bar; they read your website like a human to understand what you actually deliver. Large Language Models (LLMs) analyse entities, brand relationships and factual consensus across the web to answer user questions.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Generative Engine Optimisation (GEO)',
						text: 'GEO structures your website’s facts, service details and authority signals so Large Language Models (LLMs) quote your brand when building comprehensive answers for users.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Answer Engine Optimisation (AEO)',
						text: 'AEO focuses on direct responses. We format your primary service knowledge into clear, bite-sized answers that search bots can lift and display directly at the top of search queries.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Why Both Matter for Your Business',
						text: 'Ranking in traditional search links brings traffic, but being named the trusted choice in an AI summary wins the client before they even click a competitor’s link.',
					},
				],
			},
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our AI SEO & Answer Engine Services',
				text: 'We deploy targeted optimisations to make sure AI platforms read, trust and quote your website accurately.',
				cards: [
					{
						title: 'Structured Entity & Schema Markup',
						text: 'We translate your website content into clean JSON-LD schema code. This acts as a clear digital identity card that tells AI bots who you are, what services you provide and where you operate in Manchester and across the UK.',
						imageSrc: '/images/ai-seo-geo-and-aeo-structured-entity-schema-markup.webp',
					},
					{
						title: 'Direct-Answer Content Structuring (AEO)',
						text: 'We turn complex industry answers into clear, scannable explanations, question hubs and step-by-step guides that AI tools easily extract for conversational search queries.',
						imageSrc: '/images/ai-seo-geo-and-aeo-direct-answer-content-structuring.webp',
					},
					{
						title: 'Digital PR & Third-Party Brand Consensus',
						text: 'AI engines verify information by checking multiple platforms at once. We align your company credentials, press mentions and trade citations across trusted UK publications so algorithms verify your authority.',
						imageSrc: '/images/ai-seo-geo-and-aeo-digital-pr-third-party-brand-consensus.webp',
					},
					{
						title: 'Conversational Search Intent Mapping',
						text: 'People speak to AI engines using long, natural questions rather than short keywords. We map out how customers talk about your services in real life and tailor your content to match those exact phrasing patterns.',
						imageSrc: '/images/crm-and-custom-business-software-design.png',
					},
					{
						title: 'Generative Brand Tracking & Visibility Audits',
						text: 'We track how often and in what context tools like ChatGPT, Perplexity and Google Gemini mention your brand, systematically fixing factual gaps and incorrect references.',
						imageSrc: '/images/uiux-redesign.png',
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance AI SEO Built on Transparent Delivery',
				text: 'Our proven strategies and senior technical team structure your website to become the trusted choice for AI systems.',
				cards: [
					{
						title: 'Scoped Around Verifiable Facts & Clean Data',
						text: 'AI engines ignore vague marketing claims. We work with your team to convert real business data, case studies and transparent service details into machine-readable content that algorithms can quote with confidence.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-Scoped-around-verifiable-facts-clean-data.webp',
					},
					{
						title: 'Direct Access to Senior Technical SEO Directors',
						text: 'No junior account handlers relaying messages. You work directly with the technical search directors who code your schema markup and design your content architecture.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-direct-access-senior-technical-seo-directors.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We explain every change in straightforward language before touching your site. You receive a clear roadmap outlining where AI models currently overlook your brand and how we will fix it.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We supply developer-ready schema code and content layouts that your internal team or agency developers can drop into place without causing delays.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Monitoring Across Evolving AI Platforms',
						text: "AI search engines update their retrieval methods frequently. We monitor how ChatGPT, Gemini and Google adjust their citations and update your website's data so you stay recommended.",
						imageSrc:
							'/images/ai-seo-geo-and-aeo-continuous-monitoring-across-evolving-ai-platforms.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'AI SEO is most powerful when paired with our core disciplines. It maximises real outcomes for your business.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Pairs foundational technical site health and traditional Google rankings with advanced generative search visibility.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Fast-loading, semantic HTML architecture that ensures both human users and AI bots parse your site effortlessly.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Generates active multi-channel engagement and brand signals that strengthen your overall digital footprint across the web.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'How Generative Search Affects Different Commercial Sectors',
				titleLines: [
					'How Generative Search Affects Different Commercial',
					'Sectors',
				],
				text: 'AI platforms look for verified facts before making recommendations, especially in industries where customers make high-stakes decisions.',
				columns: [
					{
						items: [
							{
								title: 'Medical Reporting, Clinics & Healthcare Services',
								text: 'We implement clinical schema markup and publish practitioner credentials so AI engines quote your Manchester clinic for private health consultations.',
							},
							{
								title: 'Legal Practices & Professional Advisory',
								text: 'We build plain-English question-and-answer resource hubs that position your partners as the direct source referenced by conversational AI platforms.',
							},
							{
								title: 'Commercial Trades & Field Services',
								text: 'We link your location pages and trade certifications with regional schema markup so AI assistants list your company for urgent local contracts.',
							},
						],
					},
					{
						items: [
							{
								title: 'E-commerce & Specialist Retail',
								text: 'We embed structured product schema that feeds live pricing, stock availability and verified customer reviews directly to generative shopping bots.',
							},
							{
								title: 'B2B Technology & Business Operations',
								text: 'We rewrite feature pages into clear input-and-outcome summaries, supported by case study data that AI engines cite when businesses evaluate new suppliers.',
							},
						],
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About AI SEO, GEO & AEO',
				text: 'Clear answers on how modern search engines and AI models evaluate your business.',
				items: [
					{
						question: 'What is the difference between traditional SEO and AI SEO (GEO & AEO)?',
						answer:
							'Traditional SEO focuses on optimising web pages to rank in the standard list of search engine results. Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) focus on optimising your content and structured data so conversational AI models (such as Google Gemini, Perplexity, and ChatGPT Search) understand, extract and cite your business as a direct answer to user queries.',
					},
					{
						question: 'Does my business need AI SEO if we already rank well on Google?',
						answer:
							'Yes. As search engines integrate AI Overviews directly above traditional organic rankings, user attention is shifting to these direct summaries. If your site is not optimised for AI extraction, your organic visibility and click-through rates will decline, even if your traditional page-one ranking remains intact.',
					},
					{
						question: 'How do AI search engines decide which businesses to recommend?',
						answer:
							'AI models evaluate semantic clarity, factual consistency, third-party verification and structured data. They look for sites that provide direct, authoritative answers to specific questions, verified by clear schemas, professional accreditations and consistent brand information across reputable web directories and industry publications.',
					},
					{
						question: 'What is structured schema markup and why is it essential for AI SEO?',
						answer:
							'Schema markup is a standardised code format (JSON-LD) added to your website that translates human language into clear, machine-readable facts. It tells search engines exactly who owns the business, what services are offered, what areas are served and how specific topics relate to each other.',
					},
					{
						question: 'How long does it take for AI search engines to start citing a website?',
						answer:
							'Because generative search engines update their models and web indices continuously, structured data changes and optimised question-and-answer formats are often ingested within weeks. Achieving consistent brand citations for competitive commercial terms across Manchester and the UK typically takes 2 to 4 months of structured technical optimisation and entity building.',
					},
					{
						question: 'What information is required to begin an AI SEO project?',
						answer:
							'We start with a thorough review of your current website, your primary commercial services and an analysis of how AI search engines currently represent your brand and competitors. Our senior team will then present a straightforward roadmap highlighting the technical and content adjustments needed.',
					},
				],
			},
			cta: {
				pill: 'Prepare for the Future of Search',
				heading: 'Let’s Move Your Business Forward in the Era of AI Search',
				text: 'Our senior search team will evaluate how AI platforms currently view your company and outline a practical plan to secure your brand’s authority.',
				buttonLabel: 'Request Your AI Visibility Review',
				buttonHref: '/contact',
			},
		},
		{
			...localSeoChild,
			metaTitle: 'Local SEO Agency in Manchester | Xoomplus',
			metaDescription:
				'Turn high-intent regional searches into commercial inquiries with Local SEO across Manchester, Salford, Trafford and surrounding regions.',
			hero: {
				...localSeoChild.hero,
				pill: 'Local Search & Google Map Pack Visibility',
				titleLines: [
					'Local SEO Agency in Manchester:',
					'Turn High-Intent Regional Searches into Real Commercial Inquiries',
				],
				paragraphs: [
					'When potential clients search for your services nearby, they rarely scroll past the top Google Map Pack results or local organic listings. A generic national search approach leaves local commercial demand on the table.',
					'At Xoomplus, our Local SEO specialists optimise your complete local search footprint by combining optimised Google Business Profiles, precise localised landing pages, geo-specific schema markup and authoritative citations.',
					'We ensure your business is the prominent, trusted choice across Manchester, Salford, Trafford and surrounding regions.',
				],
				buttonLabel: 'Claim Your Local SEO Audit',
				image: {
					...localSeoChild.hero.image,
					src: childServiceHeroImage('local-seo'),
				},
			},
			features: {
				pill: 'The Mechanics of Local Search',
				titleLines: [
					'Proximity, Prominence & Relevance.',
					'The Core of Local Search.',
				],
				text: 'Google’s local search algorithms do not just count keyword mentions. Google Local 3-Pack calculates physical proximity, business relevance and verifiable local authority across the area to recommend a business.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Google Business Profile (GBP) & Map Pack Dominance',
						text: 'We audit, optimise and structure your GBP profile by refining primary categories, geo-tagged photography, listed services and localised tags so you rank at the top of local map searches.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Geo-Targeted Page Architecture & Local Schema',
						text: 'We build clear, dedicated service-area landing pages supported by LocalBusiness JSON-LD schema so search engines understand your exact operational territory.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Regional Citations & NAP Consistency',
						text: 'We build and align consistent Name, Address and Phone number (NAP) data across respected industry registers and regional North West business portals.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Strong Local SEO Can Do for Your Business',
			processText: [
				'When prospective buyers across Manchester and the North West search for immediate services, they want reputable providers within their immediate reach. The vast majority of localised clicks and calls go straight to the top three businesses featured in Google’s Map Pack.',
				'Without targeted Local SEO, your business remains invisible to high-intent regional searches, handing qualified local leads to competitors on your doorstep. Optimising your local digital footprint secures your market share, captures ready-to-buy inquiries and establishes your company as the leading regional authority.',
			],
			processImage: {
				src: '/images/local-seo-practical-commercial-value.webp',
				alt: 'Local SEO practical commercial value',
			},
			processPrimaryLabel: 'Claim Your Local SEO Audit',
			processSecondaryLabel: 'Explore Our Local SEO Process ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our Local SEO & Map Pack Services',
				text: 'We deploy targeted, local optimisations to ensure search engines and nearby customers choose your business first.',
				cards: [
					{
						title: 'Google Business Profile Setup & Management',
						text: 'We handle end-to-end optimisation of your Google Business Profile, from category selection and geo-tagged visual assets to product catalogues and weekly regional updates that keep your listing active.',
						imageSrc: '/images/local-seo-google-business-profile-setup-management.webp',
					},
					{
						title: 'Geo-Targeted Landing Pages & Borough Silos',
						text: 'We build high-converting location pages tailored to distinct commercial hubs such as Manchester City Centre, Salford, Didsbury, Stockport and Trafford, matching local customer intent without creating duplicate content.',
						imageSrc: '/images/local-seo-geo-targeted-landing-pages-borough-silos.webp',
					},
					{
						title: 'LocalBusiness JSON-LD Schema Structuring',
						text: 'We write and embed precise machine-readable code detailing your exact coordinates, opening hours, service areas and company contact points so search engines accurately plot your geographic reach.',
						imageSrc: '/images/local-seo-local-business-json-ld-schema-structuring.webp',
					},
					{
						title: 'Regional Citation Clean-Up & Directory Building',
						text: 'We audit existing third-party listings to eliminate conflicting phone numbers or outdated addresses, building verified regional citations on high-authority UK business directories.',
						imageSrc: '/images/local-seo-regional-citation-cleanup-directory-building.webp',
					},
					{
						title: 'Review Generation & Reputation Systems',
						text: 'We set up structured review acquisition workflows that prompt satisfied clients to leave positive feedback, directly lifting your prominence and click-through rates in Google Maps.',
						imageSrc: '/images/local-seo-review-generation-reputation-systems.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'How Local Search Drives Client Inquiries Across Sectors',
				titleLines: [
					'How Local Search Drives Client Inquiries Across',
					'Sectors',
				],
				text: 'When buyers search locally, immediate proximity, clear operational hours and professional credibility make all the difference.',
				columns: [
					{
						items: [
							{
								title: 'Legal Practices & Specialist Law Firms',
								text: 'We optimise fee-earner location landing pages with targeted regional schema, practice histories and client review frameworks, positioning your firm in front of corporate and private clients seeking legal counsel in Manchester.',
							},
							{
								title: 'Private Healthcare & Diagnostic Clinics',
								text: 'We structure clinic pages with clear directions, parking details, clinical registration schema and frictionless booking links that turn urgent local healthcare searches into confirmed patient appointments.',
							},
							{
								title: 'Commercial Trades & Field Services',
								text: 'We link service-area pages and trade accreditations with regional map markers, ensuring your engineers and contractors rank for emergency inquiries across your entire operational radius.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Services & Professional Consultancies',
								text: 'We establish regional authority across commercial districts like Spinningfields and Salford Quays, driving localised inquiries from business owners seeking accountants, IT providers and corporate advisors.',
							},
							{
								title: 'Retail Showrooms & Hospitality Venues',
								text: 'We optimise map pins, local attributes, image galleries and opening hours so local customers can easily find driving directions, contact details and current promotions.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance Local SEO Built on Transparent Delivery',
				text: 'Our proven methodologies and senior technical team build your regional search presence to secure reliable map and local organic rankings.',
				cards: [
					{
						title: 'Scoped Around Commercial Service Areas',
						text: 'We analyse your physical operational reach and high-margin postcodes across Greater Manchester to prioritise profitable search queries that drive valuable in-person visits or regional contracts.',
						imageSrc: '/images/clear-communication-and-collaboration.webp',
					},
					{
						title: 'Direct Access to Senior Local SEO Directors',
						text: 'No junior account managers acting as messengers. You communicate directly with the local search specialists and technical developers who audit, configure and manage your location architecture.',
						imageSrc: '/images/a-shared-vision-before-development.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We walk you through our audit findings and present a clear, step-by-step roadmap showing citation inconsistencies, map ranking gaps and target local search terms before making adjustments.',
						imageSrc: '/images/your-brand-reflected-in-the-interface.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We supply clean location templates, schema code and map embeds that your internal team or agency developers can drop into place without causing delays.',
						imageSrc: '/images/strategy-before-decoration.webp',
					},
					{
						title: 'Continuous Monitoring & Rank Grid Tracking',
						text: 'Google frequently shifts map proximity and algorithmic weights. We track local rank grids across specific Manchester postcodes and optimise your listings to preserve your positions.',
						imageSrc: '/images/clear-communication-and-collaboration.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Local SEO works best alongside our core service pillars.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Builds national organic authority, broad informational rankings and AI search readiness alongside your local map presence.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Mobile-optimised, high-speed website engineering that allows local mobile visitors to call, email or book appointments in seconds.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Geo-targeted Google Ads and paid social media that capture immediate paid search visibility while organic local rankings compound.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About Local SEO in Manchester',
				text: 'Straightforward answers on how localised search strategies work for regional businesses.',
				items: [
					{
						question: 'What is the difference between standard SEO and Local SEO?',
						answer:
							'Standard SEO focuses on improving your website\'s organic visibility for broad keywords. Local SEO specifically targets search queries with regional intent (such as ‘accountant in Manchester’ or ‘solicitor near me’) and optimises for the Google Map 3-Pack, local business directories and localised mobile searches.',
					},
					{
						question:
							'Can I rank in the Manchester Map Pack if my office is based outside the city centre?',
						answer:
							'Yes. While Google\'s primary ranking factor for map searches includes physical proximity, a properly structured website with dedicated location pages, geo-targeted schema markup, regional authority links and local directory citations can rank prominently across multiple boroughs and surrounding districts.',
					},
					{
						question: 'Why is NAP (Name, Address, Phone) consistency so important?',
						answer:
							'Search engines cross-reference your business information across dozens of directories and web platforms to verify legitimacy. If your business name, address, or phone number varies across the web, it creates data conflicts that reduce search engines\' confidence in your business, directly pulling down your local search rankings.',
					},
					{
						question: 'How do customer reviews affect local rankings on Google?',
						answer:
							'Reviews are a major local ranking factor. Google evaluates the volume, average score, recency and keywords included within client reviews. A consistent flow of genuine reviews from verified local customers signals authority, improves click-through rates and lifts your placement in the Google Map Pack.',
					},
					{
						question:
							'How long does it take to see tangible ranking improvements from Local SEO?',
						answer:
							'Correcting citation inconsistencies, updating schema markup and optimising your Google Business Profile often produces noticeable map ranking movements within 4 to 8 weeks.',
					},
					{
						question: 'What information is needed to start a Local SEO campaign?',
						answer:
							'We require your business address, phone details, access to your Google Business Profile and an overview of the key services and geographic zones you want to target. Our senior team will run a localised audit to assess current ranking positions and identify quick-win opportunities before our first conversation.',
					},
				],
			},
			cta: {
				pill: 'Dominate Your Region',
				heading: 'Let’s Grow Your Local Business',
				text: 'Ready to show up where your nearby customers are actually looking? Speak directly with our senior local search team today.',
				buttonLabel: 'Claim Your Free Local SEO Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...technicalSeoChild,
			metaTitle: 'Technical SEO Agency in Manchester | Xoomplus',
			metaDescription:
				'Build fast, error-free website foundations with Technical SEO — Core Web Vitals, crawlability and indexation that Google rewards across Manchester and the UK.',
			hero: {
				...technicalSeoChild.hero,
				pill: 'Technical Website Architecture & Search Engine Crawlability',
				titleLines: [
					'Technical SEO Agency in Manchester:',
					'Build the Fast, Error-Free Foundations Google Rewards',
				],
				paragraphs: [
					'Even the highest quality content cannot rank if search engine crawlers cannot index or understand your site.',
					'Slow page speeds, broken internal links, indexing bloat, and poor mobile code act as invisible barriers to organic traffic.',
					'At Xoomplus, our senior web engineers and technical SEO specialists resolve deep architectural bottlenecks so your site passes Google\'s Core Web Vitals, crawls effortlessly and converts technical health into dependable search rankings across Manchester and the UK.',
				],
				buttonLabel: 'Request a Technical SEO Audit',
				image: {
					...technicalSeoChild.hero.image,
					src: childServiceHeroImage('technical-seo'),
				},
			},
			features: {
				pill: 'The Mechanics of Technical SEO',
				titleLines: [
					'Crawlability, Speed & Structure.',
					'The Anatomy of Technical Health.',
				],
				text: 'Technical SEO optimises your website’s underlying code and server infrastructure, so search engines and AI models can crawl, render, index and understand every page without friction.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Crawl Budget & Indexation Control',
						text: 'Search engines allocate limited crawling resources to your domain. We eliminate crawl waste, redirect loops and duplicate URLs using clean robots.txt directives, canonical tags, and structured XML sitemaps to prioritise your most profitable pages.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Core Web Vitals & Rendering Speed',
						text: 'Page speed directly influences search rankings and user bounce rates. We optimise Largest Contentful Paint (LCP), Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS) through lightweight asset delivery, server-side caching and clean, streamlined code.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Schema Markup & Semantic Data Architecture',
						text: 'We implement comprehensive JSON-LD structured data that translates your web content into clear machine data. This enables rich snippets in Google search results and ensures search engines and AI models accurately interpret your business.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better Technical SEO Can Do for Your Business',
			processText: [
				'When people in Manchester and across the UK search for your services, search engines must be able to load, parse and verify your website in milliseconds.',
				'A technically broken website acts like a locked shop door; if Google\'s bots or mobile users hit slow load times, rendering errors or broken redirect loops, they leave immediately. Without solid technical foundations, all your investments in content marketing and digital advertising are undermined by invisible code errors.',
				'Fixing your site\'s technical architecture eliminates indexation bottlenecks, ensures every commercial page gets discovered and turns backend health into steady organic visibility and increased client conversions.',
			],
			processImage: {
				src: '/images/technical-seo-practical-commercial-value.webp',
				alt: 'Technical SEO practical commercial value',
			},
			processPrimaryLabel: 'Request a Technical SEO Audit',
			processSecondaryLabel: 'Explore Our Technical Process ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our Technical SEO & Architecture Services',
				text: 'We deploy code-level fixes and structural optimisations to ensure search engines crawl, render and index your website with zero friction.',
				cards: [
					{
						title: 'Deep Crawl Auditing & Log File Analysis',
						text: 'We inspect how Googlebot and other web spiders navigate your domain using server access logs, catching crawl traps, orphan pages and wasted server requests before they impact revenue.',
						imageSrc: '/images/technical-seo-deep-crawl-auditing-log-file-analysis.webp',
					},
					{
						title: 'Core Web Vitals & Frontend Speed Engineering',
						text: 'We optimise rendering paths by stripping away unused CSS and JavaScript, configuring browser caching, compressing media payloads and tuning servers for rapid initial response times.',
						imageSrc: '/images/technical-seo-core-web-vitals-frontend-speed-engineering.webp',
					},
					{
						title: 'Structured Data & Advanced JSON-LD Schema',
						text: 'We embed custom nested schema for organisations, local business entities, products and services, making your web content crystal clear for Google rich search results and generative AI models.',
						imageSrc: '/images/technical-seo-structured-data-advanced-json-ld-schema.webp',
					},
					{
						title: 'Indexation Management & Canonical Hierarchy',
						text: 'We eliminate duplicate content, solve faceted navigation issues and resolve 404 errors and 301 redirect chains so search engines index only live, high-priority landing pages.',
						imageSrc: '/images/technical-seo-indexation-management-canonical-hierarchy.webp',
					},
					{
						title: 'Mobile Usability & Technical Architecture Alignment',
						text: 'We clean up site taxonomy, URL hierarchy and internal linking structures, making sure complex, multi-layered websites stay fast and responsive on mobile devices.',
						imageSrc:
							'/images/technical-seo-mobile-usability-technical-architecture-alignment.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'How Technical Site Health Drives Revenue Across Sectors',
				titleLines: [
					'How Technical Site Health Drives Revenue Across',
					'Sectors',
				],
				text: 'Complex web platforms and regulated industries require robust technical foundations to prevent costly traffic drops and lost inquiries.',
				columns: [
					{
						items: [
							{
								title: 'High-Volume E-Commerce & Multi-Category Retailers',
								text: 'Faceted filter menus, variant combinations and out-of-stock items create thousands of duplicate URLs. We structure clean canonicalization, configure server response codes and optimise product schema so search engines index only live, revenue-generating inventory.',
							},
							{
								title: 'Legal Practices & Professional Advisory Firms',
								text: 'Corporate legal sites often hide valuable practice insights behind complex document paths and unindexed PDFs. We restructure site hierarchies, apply legal schema and streamline page templates, so prospective business clients in Manchester discover fee-earners immediately.',
							},
							{
								title: 'Private Healthcare & Diagnostic Clinics',
								text: 'Medical websites require strict security and clinical verification under Google\'s E-E-A-T guidelines. We resolve SSL/HTTPS conflicts, optimise mobile booking portals and embed healthcare schema to ensure clinical pages crawl securely and rank reliably.',
							},
						],
					},
					{
						items: [
							{
								title: 'Commercial Trades & Field Services',
								text: 'Local contractors need rapid mobile load speeds to capture emergency inquiries across Greater Manchester. We strip out heavy plugins, compress mobile assets and clean up code to guarantee pages load in under two seconds on 4G networks.',
							},
							{
								title: 'B2B Technology & Software Companies',
								text: 'Software and SaaS websites frequently rely on heavy JavaScript frameworks that search crawlers struggle to render. We implement dynamic or server-side rendering and clean up asset pipelines so your product features are indexed accurately.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance Technical SEO Built on Transparent Delivery',
				text: 'Our senior technical team works directly inside your codebase and server setup to resolve root-cause architectural issues.',
				cards: [
					{
						title: 'Scoped Around Root-Cause Code Resolution',
						text: 'We do not hand over surface-level checklists or automated software summaries. Our developers and SEO directors resolve errors directly within your templates, server configurations and CMS setup.',
						imageSrc:
							'/images/technical-seo-Scoped-around-root-cause-code-resolution.webp',
					},
					{
						title: 'Direct Access to Senior Web Engineers & SEO Directors',
						text: 'No junior account managers acting as messengers. You work directly with experienced software developers and search directors who write the code and implement architectural fixes.',
						imageSrc:
							'/images/technical-seo-direct-access-to-senior-web-engineers-seo-directors.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We explain every technical adjustment in clear, non-technical language before making changes, showing you exactly what is holding back your site and how our fixes will impact your revenue.',
						imageSrc:
							'/images/technical-seo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'Whether you have an internal dev department or an external agency, we provide developer-ready technical specifications, pull requests and code snippets that deploy without friction.',
						imageSrc:
							'/images/technical-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Monitoring & Regression Protection',
						text: 'Every update is tested in staging environments, verified across Google Search Console and backed by automated alerts to ensure site changes never break rankings or crawl efficiency.',
						imageSrc:
							'/images/technical-seo-continuous-monitoring-regression-protection.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Technical SEO works best when connected across our primary service pillars.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Pairs technical crawlability with targeted keyword research, content marketing, local visibility and link building.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Clean, custom WordPress and Shopify development engineered for speed, mobile responsiveness and clean code.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Fast-loading, technically optimised landing pages maximise Google Ads Quality Scores and reduce cost-per-click across paid media.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About Technical SEO',
				text: 'Straightforward answers on site health, crawlability and search infrastructure.',
				items: [
					{
						question:
							'What exactly is Technical SEO, and why does my business need it?',
						answer:
							'Technical SEO focuses on the backend infrastructure of your website rather than features on the page. It involves optimising server settings, indexing directives, page loading speeds, site architecture and mobile performance. Without proper technical SEO, search engines struggle to crawl and index your site, preventing even the best content from ranking on Google.',
					},
					{
						question:
							'How do Core Web Vitals affect search rankings and user conversions?',
						answer:
							'Core Web Vitals are official Google ranking metrics that evaluate page loading speed, responsiveness to clicks and visual stability during page load. Fast, stable pages provide better user experiences, which Google rewards with higher organic positions.',
					},
					{
						question: 'What is the difference between crawling and indexing?',
						answer:
							'Crawling is the process where search engine bots (like Googlebot) discover and scan the code and links on your website. Indexing is the subsequent step where the search engine evaluates, processes and stores that page in its database to display in search results.',
					},
					{
						question: 'Can technical errors cause a sudden drop in Google rankings?',
						answer:
							'Yes. Issues such as accidental ‘noindex’ tags, server timeouts, redirect loops, broken sitemaps or failed software updates can immediately remove commercial pages from Google\'s index.',
					},
					{
						question:
							'How long does it take for Google to reflect technical SEO fixes?',
						answer:
							'Once technical fixes and sitemaps are deployed, Googlebot must recrawl and reprocess the modified URLs. For established websites, re-indexing and early performance improvements typically show in Google Search Console within 2 to 4 weeks, with compounding ranking and traffic gains following over the next 2 to 3 months.',
					},
					{
						question:
							'Do we need an entirely new website to fix technical SEO issues?',
						answer:
							'In most cases, no. Our technical developers can optimise code, clean up plugins, fix database queries, adjust server configurations and restructure URL hierarchies directly on your existing CMS (WordPress, Shopify, etc.).',
					},
				],
			},
			cta: {
				pill: 'Fix Your Foundations',
				heading: 'Let’s Eliminate the Technical Roadblocks Holding Your Site Back',
				text: 'Speak directly with our senior technical SEO engineers for an honest evaluation of your site health.',
				buttonLabel: 'Request Your Technical Site Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...onPageSeoChild,
			metaTitle: 'On-Page SEO Agency in Manchester | Xoomplus',
			metaDescription:
				'Align every page with commercial search intent through On-Page SEO — title tags, semantic headings, internal linking and conversion pathways across Manchester and the UK.',
			hero: {
				...onPageSeoChild.hero,
				pill: 'On-Page Search Optimisation',
				titleLines: [
					'On-Page SEO Agency in Manchester:',
					'Align Every Page with Commercial Intent',
				],
				paragraphs: [
					'Search engines do not rank websites as a whole; they evaluate individual pages against specific user search intent. If your headings are vague, your internal links are disordered or your copy fails to answer commercial questions, Google will rank a clearer competitor.',
					'At Xoomplus, our On-Page SEO specialists engineer every page template and content asset, optimising title tags, semantic heading hierarchies, internal linking SILOs and conversion pathways.',
					'We make sure your site is easy for search engines to index and simple for visitors in Manchester and across the UK to buy from.',
				],
				buttonLabel: 'Request an On-Page SEO Audit',
				image: {
					...onPageSeoChild.hero.image,
					src: childServiceHeroImage('on-page-seo'),
				},
			},
			features: {
				pill: 'The Mechanics of On-Page SEO',
				titleLines: [
					'Relevance, Structure & Intent.',
					'The Anatomy of High-Ranking Content.',
				],
				text: 'Modern On-Page SEO is not keyword stuffing; it is about organising information so both search algorithms and human visitors immediately understand the page’s commercial value.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Search Intent Mapping & Keyword Architecture',
						text: 'We map target search queries to dedicated pages, ensuring primary and secondary terms sit naturally in titles, H1–H3 tags and body copy without keyword stuffing.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Semantic Topic Clusters & SILO Internal Linking',
						text: 'We build structured internal linking silos that pass authority from your high-ranking pages to deep service pages, helping search crawlers understand your industry expertise.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Conversion-Centred Content & Visual Hierarchy',
						text: 'We format content with clear sub-headings, bullet lists, scannable summaries and prominent calls to action that keep bounce rates low and inquiry rates high.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better On-Page SEO Can Do for Your Business',
			processText: [
				'When prospective clients in Manchester and across the UK search for specific commercial solutions, they land on individual web pages, not your homepage. If those pages are poorly formatted, confusing to read or lack clear service explanations, visitors leave within seconds and Google drops your position.',
				'Without precise on-page structuring, even high-authority domains fail to convert their rankings into inbound leads. Aligning your pages with genuine buyer intent eliminates keyword cannibalisation, clarifies your value proposition for search engines and AI models and turns regular page visitors into high-value commercial enquiries.',
			],
			processImage: {
				src: '/images/on-page-seo-practical-commercial-value.webp',
				alt: 'On-Page SEO practical commercial value',
			},
			processPrimaryLabel: 'Request an On-Page SEO Audit',
			processSecondaryLabel: 'Explore Our On-Page Process ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our On-Page Optimisation & Content Structuring Services',
				text: 'We deploy structured, page-level optimisations to make sure your content satisfies search engine algorithms and prospective customers alike.',
				cards: [
					{
						title: 'Search Intent & Commercial Keyword Mapping',
						text: 'We audit your site to eliminate keyword cannibalisation, mapping distinct primary, secondary and localised Manchester search terms to dedicated URLs so every page has a clear commercial role.',
						imageSrc: '/images/on-page-seo-search-intent-commercial-keyword-mapping.webp',
					},
					{
						title: 'Semantic Heading & Content Architecture',
						text: 'We structure pages using logical H1–H4 heading tags, descriptive answer paragraphs and structured bullet lists that make complex service offerings effortless for humans to scan and search bots to recommend.',
						imageSrc: '/images/on-page-seo-semantic-heading-content-architecture.webp',
					},
					{
						title: 'Metadata Engineering & Organic CTR Optimisation',
						text: 'We write compelling title tags and meta descriptions focused on click-through performance, incorporating target commercial keywords and clear value hooks that capture attention on search results pages.',
						imageSrc: '/images/on-page-seo-metadata-engineering-organic-ctr-optimisation.webp',
					},
					{
						title: 'SILO Internal Linking & Topical Depth',
						text: 'We design contextual internal linking structures that pass link equity directly to your most valuable service pages, reinforcing topical authority and keeping prospective clients exploring your site.',
						imageSrc: '/images/on-page-seo-silo-internal-linking-topical-depth.webp',
					},
					{
						title: 'Media Optimisation & Accessibility Tagging',
						text: 'We optimise descriptive image alt text, compress image filenames and format on-page media elements so visual assets contribute directly to keyword relevance without slowing down page rendering.',
						imageSrc: '/images/on-page-seo-media-optimisation-accessibility-tagging.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'On-Page Structuring Drives Growth Across Sectors',
				titleLines: [
					'On-Page Structuring Drives Growth Across',
					'Sectors',
				],
				text: 'When businesses explain their value with clarity and purpose, both search engines and prospective clients respond immediately.',
				columns: [
					{
						items: [
							{
								title: 'Professional Legal & Commercial Advisory Services',
								text: 'Legal websites often hide expertise behind dense legal jargon that confuses buyers and weakens search relevance. We rewrite core service pages into scannable, plain-English overviews with transparent steps and clear information that win client trust across Manchester.',
							},
							{
								title: 'Medical Reporting, Clinics & Private Healthcare',
								text: 'Healthcare queries demand verified details and immediate clarity. We structure clinical service pages with verified specialist accreditations, treatment FAQs and clear booking links that satisfy Google\'s E-E-A-T standards.',
							},
							{
								title: 'Commercial Trades & Field Service Contractors',
								text: 'Property managers and homeowners need quick answers when looking for local contractors. We structure service-area landing pages with bulleted capabilities, upfront pricing indicators and direct one-click quote forms that turn mobile visits into booked jobs.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Technology & Business Solutions',
								text: 'Complex software and business consultancy pages can easily lose buyers in abstract features. We structure product and service pages around clear commercial problems, inputs and solutions that help procurement teams qualify your solutions quickly.',
							},
							{
								title: 'E-Commerce & Specialist Retail',
								text: 'Online stores often struggle with thin product copy and duplicate descriptions. We write unique category overviews, structure spec tables and align collection copy with transactional buyer queries to capture shoppers ready to buy.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance On-Page SEO Built on Transparent Delivery',
				text: 'Our senior search strategists structure every URL, heading and sentence to build long-term organic authority and buyer clarity.',
				cards: [
					{
						title: 'Scoped Around Commercial Target Queries',
						text: 'We prioritise high-margin service pages and regional intent terms across Manchester, focusing optimisation efforts on search terms that bring in serious, ready-to-buy commercial leads.',
						imageSrc: '/images/on-page-seo-scoped-around-commercial.webp',
					},
					{
						title: 'Direct Access to Senior SEO Strategists',
						text: 'No junior account handlers rewriting your copy. You work directly with experienced search strategists and commercial copywriters who understand UK business tone and conversion mechanics.',
						imageSrc: '/images/on-page-seo-direct-access-to-senior.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'Every title revision, heading adjustment and content framework is mapped out in straightforward language and reviewed with your team before anything goes live on your website.',
						imageSrc: '/images/on-page-seo-plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We supply clean, formatted copy decks, HTML markup recommendations and internal linking schematics that your developers or in-house marketers can implement without friction.',
						imageSrc:
							'/images/on-page-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Refinement & Performance Tracking',
						text: 'We track keyword rankings, user engagement metrics and organic click-through rates in Google Search Console, making ongoing adjustments to maintain top positions against competitors.',
						imageSrc: '/images/on-page-seo-continuous-refinement-performance-tracking.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'On-Page SEO is one part of our connected digital growth ecosystem.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Pairs on-page content alignment with technical site crawlability, AI SEO and off-page link building.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Clean website development that keeps on-page layouts fast, mobile-friendly and simple to navigate.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Well-structured on-page content improves paid ad Quality Scores, reducing cost-per-click and raising campaign returns.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About On-Page SEO',
				text: 'Straightforward answers on content optimisation, keyword intent and internal linking.',
				items: [
					{
						question:
							'What is the difference between On-Page SEO and Technical SEO?',
						answer:
							'Technical SEO focuses on backend infrastructure, such as server response times, crawl budgets, XML sitemaps and Core Web Vitals. On-Page SEO focuses on the visible content and HTML elements of individual pages, including title tags, headings (H1–H3), copy clarity, image alt attributes and contextual internal links. Both must work together for a site to rank well.',
					},
					{
						question: 'Can On-Page SEO fix keyword cannibalisation?',
						answer:
							'Yes. Keyword cannibalisation happens when multiple pages on your site compete for the same search query, confusing search engines and splitting your ranking power. We audit your site, consolidate overlapping pages and give each URL a distinct commercial keyword target to restore search rankings.',
					},
					{
						question:
							'How do title tags and meta descriptions affect Google rankings?',
						answer:
							'Title tags are a confirmed direct ranking signal that tells Google the exact topic of a page. Meta descriptions do not directly influence organic rankings, but an engaging, clear description acts as your organic ad copy, directly raising click-through rates (CTR) from search result pages.',
					},
					{
						question: 'Why is internal linking important for SEO?',
						answer:
							'Internal links guide search engines through your content hierarchy and pass ranking authority (link equity) between related pages. A structured internal linking SILO shows Google which pages are your primary commercial pillars and helps users find relevant information without getting lost.',
					},
					{
						question:
							'How often should on-page content be refreshed or updated?',
						answer:
							'Core commercial service pages should be reviewed every 6 to 12 months, or whenever your service offerings, pricing or target market changes. Updating outdated facts, refining headings to match new search trends and improving calls to action helps protect page-one rankings from newer competitors.',
					},
					{
						question: 'Do we have to rewrite all the copy on our website?',
						answer:
							'Not necessarily. Often, existing copy simply needs to be restructured by refining title tags, adjusting heading levels, clarifying value propositions and adding missing topical sub-sections. We keep your brand voice intact while making sure search engines can properly index your content.',
					},
				],
			},
			cta: {
				pill: 'Turn Content into Revenue',
				heading: 'Let’s Make Every Page on Your Website Work Harder',
				text: 'Speak directly with our senior search specialists to discover how targeted on-page adjustments can lift your rankings.',
				buttonLabel: 'Request Your On-Page Content Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...linkBuildingChild,
			metaTitle: 'Off-Page SEO Agency in Manchester | Xoomplus',
			metaDescription:
				'Drive sustainable search rankings with editorial link building and off-page SEO — genuine UK placements that build durable domain authority across Manchester and the North West.',
			hero: {
				...linkBuildingChild.hero,
				pill: 'Off-Page Search Engine Optimisation & Domain Authority',
				titleLines: [
					'Off-Page SEO Agency in Manchester:',
					'Drive Sustainable Search Rankings',
				],
				paragraphs: [
					'On-page content and technical health tell search engines what your website is about, but off-page backlinks prove whether your business can be trusted. High-authority backlinks act as third-party endorsements that validate your digital reputation in the eyes of Google.',
					'At Xoomplus, our Manchester link building specialists secure genuine, editorial placements across respected UK publications, trade bodies and regional news platforms.',
					'We build durable domain authority that helps businesses across Manchester and the North West outrank established market competitors.',
				],
				buttonLabel: 'Request a Backlink Profile Audit',
				image: {
					...linkBuildingChild.hero.image,
					src: childServiceHeroImage('link-building-off-page'),
				},
			},
			features: {
				pill: 'The Mechanics of Off-Page Authority',
				titleLines: [
					'Relevance, Authority & Trust.',
					'The Fundamentals of Off-Page SEO.',
				],
				text: 'Search algorithms do not evaluate links by raw quantity alone. Modern search engines assess editorial quality, context and topical relevance, penalising artificial link schemes while rewarding genuine third-party citations.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Topical Relevance & Editorial Context',
						text: 'A single backlink from an industry-relevant UK publication carries far more weight than hundreds of generic directory entries. We secure contextual, in-content placements within articles that naturally align with your commercial services.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Domain Authority & Trust Flow',
						text: 'Search engines measure the cumulative authority of the websites referencing your brand. By earning links from established domains with verified organic traffic, we pass authentic ranking equity directly to your primary service pages.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Anchor Text Diversity & Risk Mitigation',
						text: 'Over-optimised, repetitive anchor text triggers algorithmic search penalties. We structure a balanced anchor profile using branded phrases, natural variations and commercial keywords to protect long-term search stability.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better Off-Page SEO Can Do for Your Business',
			processText: [
				'When commercial search terms in Manchester and across the UK are highly contested, multiple competing websites will have well-written content and clean code.',
				'In these competitive spaces, search engines rely on external backlink authority as the deciding factor for who earns page-one positions. Without authentic domain authority, high-value service pages remain pinned below older competitors, regardless of how thoroughly your on-page copy is written.',
				'Earning relevant editorial links builds the institutional trust required to accelerate keyword rankings, safeguard your website against sudden algorithm shifts and capture valuable referral traffic from established industry publications.',
			],
			processImage: {
				src: '/images/link-building-off-page-practical-commercial-value.webp',
				alt: 'Link Building off-page practical commercial value',
			},
			processPrimaryLabel: 'Request a Backlink Profile Audit',
			processSecondaryLabel: 'Explore Our Link Building Process ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our Off-Page SEO & Digital PR Services',
				text: 'We deploy manual outreach campaigns and data-backed content assets to earn high-tier placements that compound your site\'s authority.',
				cards: [
					{
						title: 'Competitor Backlink Gap Analysis',
						text: 'We perform an exhaustive audit of your competitors\' link profiles across Manchester and the UK, identifying the exact publications, directories and trade portals driving their organic positions.',
						imageSrc: '/images/link-building-off-page-competitor-backlink-gap-analysis.webp',
					},
					{
						title: 'Digital PR & Editorial Media Outreach',
						text: 'Our team pitches relevant story angles, expert commentary and business milestones directly to regional journalists, national news desks and trade editors across the UK.',
						imageSrc: '/images/link-building-off-page-digital-pr-editorial-media-outreach.webp',
					},
					{
						title: 'Linkable Asset Creation & Research Data',
						text: 'We develop proprietary industry surveys, calculators and benchmark reports that journalists, bloggers and industry resource hubs actively want to cite and reference.',
						imageSrc: '/images/link-building-off-page-linkable-asset-creation-research-data.webp',
					},
					{
						title: 'Regional Manchester & North West Citation Building',
						text: 'We secure localised mentions in reputable regional business portals, Chamber of Commerce directories and regional trade hubs to build geographic prominence for localised searches.',
						imageSrc:
							'/images/link-building-off-page-regional-manchester-north-west-citation-building.webp',
					},
					{
						title: 'Toxic Link Auditing & Disavow Management',
						text: 'We inspect legacy backlink profiles to identify spammy, low-quality or penalised links, safely neutralising negative SEO footprints through Google Search Console disavow protocols.',
						imageSrc: '/images/link-building-off-page-toxic-link-auditing-disavow-management.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'Domain Authority Drives Commercial Growth Across Sectors',
				titleLines: [
					'Domain Authority Drives Commercial Growth Across',
					'Sectors',
				],
				text: 'Search engines demand verified, third-party validation before granting top rankings to businesses handling high-stakes decisions and regulated services.',
				columns: [
					{
						items: [
							{
								title: 'Legal Practices & Specialist Law Firms',
								text: 'Search results for solicitors and lawyers across Manchester are heavily dominated by established directories and national corporate practices. We secure high-tier editorial mentions in regional business press and legal trade journals, giving independent practices the authority required to compete.',
							},
							{
								title: 'Private Healthcare, Clinics & Medical Reporting',
								text: 'Healthcare websites operate under Google’s strictest ‘Your Money or Your Life’ (YMYL) evaluation, where unverified claims or spammy links actively damage rankings. We earn citations from accredited medical associations, clinical education journals and health publications to build genuine authority.',
							},
							{
								title: 'Commercial Trades & Engineering Contractors',
								text: 'Commercial facility managers look for proven credibility when procuring contractors. We secure placements across regional construction hubs, engineering associations and safety body portals that validate your commercial credentials.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Technology & Professional Consultancies',
								text: 'Enterprise software and corporate advisory firms face long buying cycles with discerning corporate buyers. We place authoritative commentary and white-paper citations in established tech and management publications to generate qualified referral leads.',
							},
							{
								title: 'E-Commerce & Direct-to-Consumer Brands',
								text: 'Online retail demands high brand visibility to outpace marketplace aggregators. We secure product roundups, lifestyle media features and buyer-guide placements that drive qualified referral sales alongside valuable domain equity.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance Link Building Built on Transparent Delivery',
				text: 'Our senior digital PR leads and outreach specialists secure high-impact placements through genuine media relationships, never automated link networks.',
				cards: [
					{
						title: 'Scoped Around Industry-Relevant UK Publications',
						text: 'We build custom, manual outreach targets comprising reputable regional media in Manchester, verified industry trade bodies and national commercial publications relevant to your market.',
						imageSrc: '/images/on-page-seo-scoped-around-commercial.webp',
					},
					{
						title: 'Direct Access to Senior Digital PR Specialists',
						text: 'No junior automated email blasting. You work directly with experienced PR directors and search strategists who write tailored pitches and represent your brand professionally.',
						imageSrc:
							'/images/link-building-off-page-direct-access-to-senior-digital-pr-specialists.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We outline our target publication lists, content angles and anchor-text distribution plans in clear language so you retain complete control over where your brand appears.',
						imageSrc:
							'/images/link-building-off-page-plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We coordinate with your internal content or PR teams to turn corporate announcements, client wins and original data into link-earning media assets without disrupting workflows.',
						imageSrc:
							'/images/link-building-off-page-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Monitoring & Verified Reporting',
						text: 'Every live backlink is catalogued in your monthly report with target URLs, third-party domain metrics, organic referral clicks and indexation checks for complete transparency.',
						imageSrc:
							'/images/link-building-off-page-continuous-monitoring-verified-reporting.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Link building forms an integral part of our digital growth framework.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Combines off-page domain authority with technical crawlability, AI SEO and on-page content relevance.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Clean, fast website architecture that provides a seamless user experience when external visitors land from referral links.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Amplifies content reach across social platforms, increasing organic pickup, shares and secondary backlinks.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About Off-Page SEO',
				text: 'Straightforward answers on backlinks, domain authority and digital outreach.',
				items: [
					{
						question:
							'Why is link building essential if our on-page SEO is already optimised?',
						answer:
							'On-page SEO informs search engines about your topics, but backlinks demonstrate credibility. In competitive commercial sectors, multiple websites have well-optimised pages; search engines use external backlink quality and quantity as the deciding factor for top positions.',
					},
					{
						question: 'What makes a backlink ‘high quality’?',
						answer:
							'A high-quality backlink comes from an established, reputable website with verifiable organic traffic and topical relevance to your business.',
					},
					{
						question: 'How does Xoomplus avoid Google link penalties?',
						answer:
							'We adhere strictly to Google\'s Search Essentials guidelines. We avoid automated link software, public link networks, spammy directory farms and bulk private blog networks (PBNs). All our links are earned through manual PR outreach, quality content creation and authentic industry relationships.',
					},
					{
						question:
							'How many backlinks does a business need to rank on page one?',
						answer:
							'The volume depends on the competitive strength of your sector and target search terms. For localised commercial queries in Manchester, a handful of high-authority regional and trade links can produce significant ranking shifts. For national, highly competitive terms, a continuous acquisition strategy of 3 to 10 quality editorial placements per month is often effective.',
					},
					{
						question:
							'How long does it take for new backlinks to impact search rankings?',
						answer:
							'Once an external page with your backlink is crawled and indexed by Google, authority begins transferring to your domain. Meaningful ranking movements and domain authority increases typically register within 4 to 10 weeks of link placement.',
					},
					{
						question:
							'What information is required to begin an off-page link campaign?',
						answer:
							'We require your domain URL, details of your highest-priority commercial services, target locations and any previous link-building history. Our senior team will audit your current profile and identify target link opportunities before our first conversation.',
					},
				],
			},
			cta: {
				pill: 'Build Real Authority',
				heading: 'Let’s Build the Domain Authority Your Business Deserves',
				text: 'Speak directly with our senior search specialists to discover how targeted link acquisition can lift your visibility.',
				buttonLabel: 'Request Your Backlink Profile Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...ecommerceSeoChild,
			metaTitle: 'Ecommerce SEO Agency in Manchester | Xoomplus',
			metaDescription:
				'Turn product search into predictable revenue with Ecommerce SEO — category architecture, product schema and high-intent shopping queries across Shopify, WooCommerce and Magento.',
			hero: {
				...ecommerceSeoChild.hero,
				pill: 'Ecommerce Search Optimisation & Category Architecture',
				titleLines: [
					'Ecommerce SEO Agency in Manchester:',
					'Turn Product Search into Predictable Revenue',
				],
				paragraphs: [
					'Having hundreds or thousands of products means little if prospective buyers cannot find your collection pages, or if search engines get stuck in faceted navigation and duplicate URLs.',
					'At Xoomplus, our Ecommerce SEO specialists optimise stores across Shopify, WooCommerce, Magento and custom headless builds.',
					'We structure commercial category hierarchies, resolve indexation bloat, deploy rich product schema and capture high-intent shopping queries that grow your bottom line across Manchester and the UK.',
				],
				buttonLabel: 'Request an Ecommerce SEO Audit',
				image: {
					...ecommerceSeoChild.hero.image,
					src: childServiceHeroImage('e-commerce-seo'),
				},
			},
			features: {
				pill: 'The Mechanics of Ecommerce SEO',
				titleLines: [
					'Authority, Crawlability & Schema.',
					'The Revenue Engines.',
				],
				text: 'Unlike standard service websites, e-commerce stores deal with massive URL volumes, dynamic product variations and intense commercial competition on Google.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'High-Intent Category & Collection Structuring',
						text: 'Shoppers rarely start their journey on a single product page; they search for categories, styles and solutions. We structure collection pages with descriptive category copy, clear internal link hierarchies and sub-category taxonomies that rank for high-volume commercial keywords.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Faceted Navigation & Crawl Budget Control',
						text: 'Filter parameters for size, colour, brand and price can generate thousands of duplicate, thin URLs that waste search engine crawl resources. We configure canonical tags, robots directives and parameter handling so Google crawls and indexes only high-value, revenue-driving pages.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Rich Product Schema & Google Merchant Centre Integration',
						text: 'We implement structured JSON-LD Product and Offer markup, including live pricing, stock availability, review ratings and SKU data. This qualifies your store for rich shopping snippets in search results, directly increasing organic click-through rates.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better Ecommerce SEO Can Do for Your Business',
			processText: [
				'When prospective buyers across Manchester and the UK search for products to purchase, they do not browse indefinitely; they compare top-ranking category pages and click through to stores that load quickly and display clear product details.',
				'If your store has indexation bottlenecks, missing schema or poorly structured collections, ready-to-buy shoppers land straight on a competitor\'s checkout page instead. Without tailored Ecommerce SEO, your store remains reliant on expensive pay-per-click ads, leaving your margins vulnerable to rising ad costs.',
				'Structuring your catalogue for organic search captures high-intent transactional queries, drives qualified shoppers straight to your high-margin collections and builds compounding online revenue month after month.',
			],
			processImage: {
				src: '/images/e-commerce-seo-practical-commercial-value.webp',
				alt: 'E-Commerce SEO practical commercial value',
			},
			processPrimaryLabel: 'Request an Ecommerce SEO Audit',
			processSecondaryLabel: 'Explore Our Ecommerce SEO Process ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our Ecommerce SEO & Revenue Growth Services',
				text: 'We deploy code-level fixes, architecture structuring and conversion-focused content to ensure your online store captures high-value shopping traffic.',
				cards: [
					{
						title: 'Collection & Category Architecture Structuring',
						text: 'We reorganise your store’s category tree, menus and breadcrumb navigation into clean SILOs, ensuring search engines pass link authority directly to your most profitable product ranges.',
						imageSrc: '/images/e-commerce-seo-collection-category-architecture-structuring.webp',
					},
					{
						title: 'Faceted Navigation & Parameter Indexation Control',
						text: 'We clean up dynamic filter URLs generated by colour, size and price facets, using canonical tags and indexing rules so search engines focus exclusively on primary collection pages.',
						imageSrc:
							'/images/e-commerce-seo-faceted-navigation-parameter-indexation-control.webp',
					},
					{
						title: 'Product Schema & Merchant Feed Optimisation',
						text: 'We embed nested JSON-LD structured data for products, pricing, stock levels and customer reviews, giving search engines and Google Shopping feeds the clean data needed to earn rich badges and snippets.',
						imageSrc: '/images/e-commerce-seo-product-schema-merchant-feed-optimization.webp',
					},
					{
						title: 'Out-of-Stock & Seasonal Inventory Management',
						text: 'We implement automated redirect workflows and evergreen collection strategies for seasonal and discontinued stock, preventing broken 404 links while protecting accumulated search rankings year-round.',
						imageSrc: '/images/e-commerce-seo-out-of-stock-seasonal-inventory-management.webp',
					},
					{
						title: 'Ecommerce Conversion & Mobile Checkout Optimisation',
						text: 'We audit mobile speed, Core Web Vitals and checkout pathways across your product templates, stripping out heavy app code to ensure organic visitors complete their purchase without hesitation.',
						imageSrc:
							'/images/e-commerce-seo-ecommerce-conversion-mobile-checkout-optimisation.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'Ecommerce Search Drives Revenue Across Retail Sectors',
				titleLines: [
					'Ecommerce Search Drives Revenue Across Retail',
					'Sectors',
				],
				text: 'Different online retail sectors face unique hurdles, from rapid inventory turnover to complex technical specifications.',
				columns: [
					{
						items: [
							{
								title: 'Fashion, Apparel & Fast-Moving Consumer Goods (FMCG)',
								text: 'High SKU counts, seasonal rotations and multi-variant combinations create severe index bloat and keyword cannibalisation. We structure parent-child URL canonicalisation, automate redirects for expired lines and build evergreen category landing pages that preserve search equity season after season.',
							},
							{
								title: 'Specialist B2B Wholesale & Industrial Components',
								text: 'Technical buyers and procurement managers search using exact part numbers, materials and trade specifications. We convert unindexed PDF data into crawlable HTML tables, map specification keywords directly to product templates, and build structured B2B trade hubs that capture high-intent commercial buyers.',
							},
							{
								title: 'Luxury Goods, Home Interiors & Direct-to-Consumer (D2C) Brands',
								text: 'High-ticket items require instant brand credibility, visual richness and fast-loading pages. We streamline heavy theme templates, implement next-generation image compression and embed verified review schema to reassure buyers and keep checkout abandonment low.',
							},
						],
					},
					{
						items: [
							{
								title: 'Health, Supplements & Beauty Retail',
								text: 'Personal care products operate under Google’s strict trust and safety guidelines. We integrate verified ingredient data, structured customer review schema and clear batch details to establish medical and cosmetic authority in search results.',
							},
							{
								title: 'Electronics, Tools & Multi-Brand Distributors',
								text: 'Managing massive catalogues with competing manufacturer descriptions leads to widespread duplicate content. We rewrite high-priority category summaries, structure faceted attribute filters and optimise comparison matrices to help your store outrank generic brand resellers.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance Ecommerce SEO Built on Transparent Delivery',
				text: 'Our senior technical team structures your online catalogue to capture ready-to-buy searchers without relying on bloated apps or vanity metrics.',
				cards: [
					{
						title: 'Scoped Around Revenue & High-Margin Collections',
						text: 'We do not optimise vanity keywords. We review your inventory data, best-sellers and profit margins to prioritise category lines that generate the highest commercial return for your business.',
						imageSrc: '/images/e-commerce-seo-scoped-around-revenue-high-margin-collections.webp',
					},
					{
						title: 'Direct Access to Senior Ecommerce SEO Engineers',
						text: 'No junior account handlers relaying messages. You work directly with senior search strategists and technical developers experienced in Shopify Liquid, WooCommerce, Magento and custom headless platforms.',
						imageSrc:
							'/images/e-commerce-seo-direct-access-to-senior-ecommerce-seo-engineers.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We walk you through our catalogue audit in straightforward language, delivering a prioritised roadmap showing crawl traps, missing schema and keyword gaps before modifying your live templates.',
						imageSrc:
							'/images/e-commerce-seo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'Whether you have an in-house development team or an external agency, we provide developer-ready code snippets, theme modifications and data-entry guides that deploy smoothly without disrupting live sales.',
						imageSrc:
							'/images/e-commerce-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Monitoring & Revenue Attribution',
						text: 'We track organic transactions, average order value (AOV) and conversion rates through Google Analytics 4 (GA4), continuously optimising category pages and product feeds as search algorithms evolve.',
						imageSrc: '/images/e-commerce-seo-continuous-monitoring-revenue-attribution.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Ecommerce SEO functions as a core component of our full-funnel digital ecosystem.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Combines e-commerce category ranking with technical site health, link building and regional visibility.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Custom Shopify and WordPress/WooCommerce builds engineered for rapid checkout, mobile usability and clean architecture.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'High-converting collection pages lower Google Shopping and Performance Max ad costs while maximising blended return on ad spend (ROAS).',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About Ecommerce SEO',
				text: 'Straightforward answers on optimising online stores for organic search growth.',
				items: [
					{
						question:
							'Why should we prioritise category pages over individual product pages for SEO?',
						answer:
							'Category and collection pages target broader, higher-volume commercial search terms (e.g., ‘leather office chairs’ rather than a single specific model name). Since products can go out of stock or be discontinued, building authority on permanent category pages ensures your search rankings remain stable for a long term.',
					},
					{
						question:
							'How do you handle out-of-stock or discontinued products without hurting rankings?',
						answer:
							'If a product is temporarily out of stock, the page should remain live with an email notification signup and clear links to related in-stock items. If a product is permanently discontinued, we assess its historical traffic and backlink equity: high-equity pages are 301-redirected to the closest parent category or replacement model, while low-traffic pages are retired cleanly to preserve crawl budget.',
					},
					{
						question:
							'What is faceted navigation, and why does it cause SEO problems?',
						answer:
							'Faceted navigation allows shoppers to filter products by size, colour, brand or price. Each filter click often generates a new dynamic URL containing parameter strings. Without proper canonical tags and robots directives, search engines attempt to crawl millions of filter combinations, draining your crawl budget and creating massive duplicate content issues.',
					},
					{
						question:
							'Can you optimise e-commerce stores on Shopify, WooCommerce and Magento?',
						answer:
							'Yes. While each platform handles URLs, sitemaps and theme code differently, our developers and technical SEO leads understand the platform-specific constraints of Shopify, WooCommerce, Magento and custom headless frameworks to optimise them directly at the template level.',
					},
					{
						question: 'How does Product Schema markup help organic sales?',
						answer:
							'Product Schema (JSON-LD) provides search engines with structured data about your products, including price, availability, currency and customer review scores. Google uses this data to display rich snippets and product badges directly in search results, making your listings stand out and attracting higher click-through rates from ready-to-buy shoppers.',
					},
					{
						question:
							'What information is needed to begin an Ecommerce SEO campaign?',
						answer:
							'We need your store URL, details on your primary e-commerce CMS platform, an outline of your top-performing product categories and access to Google Search Console and GA4. Our senior team will conduct a thorough store audit to identify crawl roadblocks and high-impact revenue opportunities before our initial strategy call.',
					},
				],
			},
			cta: {
				pill: 'Scale Your Online Store',
				heading: 'Turn Your E-Commerce Store into a High-Performing Search Engine',
				text: 'Speak directly with our senior e-commerce SEO specialists for a clear, actionable review of your store.',
				buttonLabel: 'Request Your E-commerce Store Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...seoAuditChild,
			metaTitle: 'SEO Audit Agency in Manchester | Xoomplus',
			metaDescription:
				'Uncover the bottlenecks stopping your organic revenue with a comprehensive SEO audit — developer-ready technical roadmaps across Manchester and the UK.',
			hero: {
				...seoAuditChild.hero,
				pill: 'Comprehensive Technical & Strategic Diagnostics',
				titleLines: [
					'SEO Audit Agency in Manchester:',
					'Uncover the Bottlenecks Stopping Your Organic Revenue',
				],
				paragraphs: [
					'Generic website scanners generate surface checklists filled with automated warnings, but they fail to explain why your business is losing ground on Google. For established companies, high-volume e-commerce stores and complex websites, declining organic traffic points to deeper structural friction, ranging from crawl-budget waste and JavaScript rendering failures to legacy indexation bloat.',
					'At Xoomplus, our senior search engineers conduct deep, manual SEO audits to isolate root architectural problems.',
					'We deliver an actionable, developer-ready technical roadmap that clarifies what needs fixing, why it matters and where your strongest commercial opportunities lie across Manchester and the UK.',
				],
				buttonLabel: 'Commission a Comprehensive SEO Audit',
				image: {
					...seoAuditChild.hero.image,
					src: childServiceHeroImage('seo-audit'),
				},
			},
			features: {
				pill: 'Beyond Automated Scanners',
				titleLines: [
					'Infrastructure, Indexation & Authority.',
					'Complete Diagnostic Clarity.',
				],
				text: 'Unlike automated online audit tools that flag basic surface issues, an enterprise diagnostic investigates the relationship between your server configurations, search engine crawl logs and commercial revenue paths.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Server Infrastructure & Crawl Governance',
						text: 'We analyse how search engine bots actually navigate your domain. By evaluating server access logs, robots directives, redirect chains and internal crawl paths, we identify crawl traps and redirect crawl resources directly toward your highest-value commercial landing pages.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Indexation Architecture & Code Rendering',
						text: 'We examine how Google renders your pages, assessing modern JavaScript execution, Core Web Vitals performance and canonical logic. We locate hidden indexation roadblocks, duplicate URL loops and orphaned pages that suppress your domain authority.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Content Relevance & Competitive Authority Gaps',
						text: 'We audit your keyword targeting against actual commercial search intent, identifying keyword cannibalisation and thin content. Combined with a toxic link review, we pinpoint the exact authority gaps that competitors exploit across your primary target markets.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Better SEO Audits Can Do for Your Business',
			processText: [
				'When an established business in Manchester or across the UK suffers sudden traffic drops, making arbitrary changes without real data wastes time and engineering budget. Complex websites often hide critical bottlenecks, such as broken redirect logic, unindexed rendering pipelines or wasted crawl budgets that prevent even exceptional content from ranking.',
				'Without a comprehensive technical audit, internal teams are left guessing which issues genuinely impact commercial performance.',
				'A forensic diagnostic provides total architectural clarity, protects your organic revenue during platform migrations or redesigns and supplies a clear, prioritised engineering roadmap that aligns development effort directly with business growth.',
			],
			processImage: {
				src: '/images/seo-audit-practical-commercial-value.webp',
				alt: 'SEO Audit practical commercial value',
			},
			processPrimaryLabel: 'Commission an Enterprise SEO Audit',
			processSecondaryLabel: 'Explore Our Audit Framework ↓',
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our Comprehensive SEO Audit & Diagnostic Services',
				text: 'We deploy manual, codebase-level inspections and server diagnostics to evaluate every part of your website\'s search performance.',
				cards: [
					{
						title: 'Log-File Ingestion & Crawl Behaviour Analysis',
						text: 'We analyse raw server access logs to evaluate exactly how often Googlebot and other web crawlers visit your domain, uncovering hidden 404/500 server errors, redirect loops and wasted crawl budget.',
						imageSrc: '/images/seo-audit-log-file-ingestion-crawl-behaviour-analysis.webp',
					},
					{
						title: 'Rendering, JavaScript & Core Web Vitals Inspection',
						text: 'We run custom headless browser crawls to inspect how search algorithms render dynamic JavaScript frameworks, checking DOM structures, load speeds and visual layout stability.',
						imageSrc: '/images/seo-audit-rendering-javaScript-core-web-vitals-inspection.webp',
					},
					{
						title: 'Indexation Governance & Canonical Hierarchy Audit',
						text: 'We inspect your sitemaps, robots.txt directives and canonical tags to identify parameter bloat, pagination traps and duplicate content issues that dilute organic ranking power.',
						imageSrc: '/images/seo-audit-indexation-governance-canonical-hierarchy-audit.webp',
					},
					{
						title: 'Content Cannibalisation & Commercial Intent Mapping',
						text: 'We evaluate page titles, headings and internal linking SILOs across your domain to resolve keyword cannibalisation, ensuring every commercial URL targets a distinct search query.',
						imageSrc: '/images/seo-audit-content-cannibalisation-commercial-intent-mapping.webp',
					},
					{
						title: 'Backlink Profile Quality & Toxic Link Review',
						text: 'We perform a forensic audit of your historical backlink profile to detect unnatural link patterns, negative SEO footprints or legacy penalties, preparing clean disavow files when necessary.',
						imageSrc: '/images/seo-audit-backlink-profile-quality-toxic-link-review.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Practical Application',
				title: 'How Forensic Audits Protect High-Stakes Web Platforms',
				titleLines: [
					'How Forensic Audits Protect High-Stakes Web',
					'Platforms',
				],
				text: 'For established businesses, an audit is not an experimental exercise; it protects your revenue foundation before migrations, redesigns or high-budget marketing pushes.',
				columns: [
					{
						items: [
							{
								title: 'Enterprise E-Commerce & Multi-Category Retailers',
								text: 'Large stores managing thousands of SKUs across Shopify, Magento or custom builds often experience severe problems. We run complete catalogue crawl simulations to isolate crawl traps, audit product schema accuracy and deliver clean canonical directives that protect revenue-driving collections.',
							},
							{
								title: 'Complex Site Migrations & CMS Platform Overhauls',
								text: 'Moving domains, redesigning core page layouts or transitioning to an enterprise CMS can trigger catastrophic traffic losses if handled incorrectly. We provide structured pre-and-post-migration audits, mapping 301 redirect trees, auditing staging environments and confirming tracking setups to protect your search equity.',
							},
							{
								title: 'Regulated Professional Advisory, Legal & Financial Practices',
								text: 'Corporate law firms and financial advisory practices rely heavily on professional credibility and local market visibility. We audit site structures, author entities and professional accreditations to guarantee full alignment with Google\'s strict E-E-A-T evaluation criteria.',
							},
						],
					},
					{
						items: [
							{
								title: 'Private Healthcare Portals & Diagnostic Clinics',
								text: 'Healthcare providers face strict scrutiny from search algorithms. We audit clinical information architecture, patient booking pathways and medical schema markup to ensure sensitive service pages crawl securely and rank prominently.',
							},
							{
								title: 'High-Growth B2B SaaS & Tech Consultancies',
								text: 'Software platforms frequently rely on modern client-side JavaScript that search crawlers struggle to render properly. We analyse frontend rendering pipelines, API dependencies and feature landing pages to ensure all platform capabilities are indexed cleanly.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoomplus Standard',
				heading: 'High-Performance SEO Audits Built on Transparent Delivery',
				text: 'Our senior technical team conducts a thorough, manual investigation of your codebase and server setup to deliver a reliable engineering plan.',
				cards: [
					{
						title: 'Scoped Around Codebase-Level Investigation',
						text: 'We do not rely on standard software outputs. Our senior SEO directors and web developers manually inspect your template code, CMS configurations, database queries and analytics tracking setups.',
						imageSrc: '/images/seo-audit-scoped-around-codebase-level-investigation.webp',
					},
					{
						title: 'Direct Access to Senior Technical Directors',
						text: 'No junior account handlers delivering surface-level summaries. You speak directly with the senior technical engineers who tore down your codebase and mapped out the fixes.',
						imageSrc: '/images/seo-audit-direct-access-to-senior-technical-directors.webp',
					},
					{
						title: 'Plain-English Strategy Before Implementation',
						text: 'We explain every diagnostic finding in clear, business-focused language, providing an executive summary for commercial leaders alongside detailed technical specifications for engineers.',
						imageSrc: '/images/seo-audit-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We supply developer-ready execution tickets, complete with code snippets, URL mappings and clear priority tags that your internal development team can implement immediately.',
						imageSrc: '/images/seo-audit-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Post-Audit Verification & Testing',
						text: 'Once your developers deploy our recommendations, we re-crawl the modified environments, test redirects in Google Search Console and verify that all technical roadblocks are resolved.',
						imageSrc: '/images/seo-audit-continuous-post-audit-verification-testing.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'We use audit findings to inform our core digital services.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Implement the strategic roadmap through continuous on-page optimisation, AI search readiness and authority building.',
						items: [],
						buttonLabel: 'Explore Full SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Clean codebase refactoring to implement technical audit recommendations directly at the template level.',
						items: [],
						buttonLabel: 'Explore Web Development',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Fix high-bounce landing pages identified during the SEO audit to improve conversion rates and paid media performance.',
						items: [],
						buttonLabel: 'Explore Paid Media',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About Our SEO Audits',
				text: 'Clear answers on what our audit covers and how it differs from free website tools.',
				items: [
					{
						question:
							'How is Xoomplus SEO audit different from the free audits available online?',
						answer:
							'Our comprehensive SEO audit is a manual, senior-led technical diagnostic. We examine server logs, render dynamic JavaScript, review indexation architecture, assess commercial intent and deliver an actionable technical roadmap prioritised around commercial revenue.',
					},
					{
						question:
							'When should an established business commission an SEO audit?',
						answer:
							'An in-depth audit is recommended if your business is experiencing an unexplained drop in organic traffic, planning a site migration or CMS redesign, preparing to launch a major growth campaign or evaluating an acquisition or investment in an online brand.',
					},
					{
						question: 'Who should be involved in reviewing the audit findings?',
						answer:
							'Our audits are structured for both commercial leaders and technical teams. We provide an executive summary focusing on commercial impact and revenue risks for management, alongside detailed code specifications for your in-house developers or development agency.',
					},
					{
						question:
							'Can our in-house developers implement the audit recommendations?',
						answer:
							'Yes. Our audits are designed to be developer-ready, detailing root causes, affected URL sets and exact technical fixes. If you do not have in-house technical resources, our senior engineering team at Xoomplus can handle the implementation directly.',
					},
					{
						question: 'How long does a full technical SEO audit take to complete?',
						answer:
							'A comprehensive forensic audit typically takes 1 to 2 weeks depending on the size and complexity of your website. This timeframe allows us to collect sufficient crawl and log data, analyse edge cases and build a tailored engineering roadmap.',
					},
					{
						question: 'What access is needed to begin the audit?',
						answer:
							'To conduct a complete diagnostic, we request view-only access to Google Search Console and your primary analytics platform (GA4), along with sample server access logs and access to a staging environment if you are currently running a site redesign.',
					},
				],
			},
			cta: {
				pill: 'Diagnostic Clarity',
				heading: 'Get Complete Clarity on Your Website’s Search Health',
				text: 'Stop guessing why your website is struggling. Speak directly with our senior search engineers for a comprehensive diagnostic of your website.',
				buttonLabel: 'Commission an Enterprise SEO Audit →',
				buttonHref: '/contact',
			},
		},
	],
	hero: {
		pill: 'Search Engine Optimisation (SEO)',
		pillBrand: 'Senior-Led UK Delivery',
		titleLines: ['SEO Agency in Manchester |', 'Built to Turn Visibility into Revenue'],
		textParagraphs: [
			'Ranking on Google is only half the battle. If your organic traffic does not convert into qualified leads, high rankings mean very little.',
			'At Xoomplus, our SEO specialists engineer full-funnel search strategies and prepare your website for modern AI search engines like Google Gemini and ChatGPT Search.',
		],
		primaryButton: { label: 'Claim Your Free SEO Audit', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Compare SEO Service Tiers', href: '/pricing#pricing-plans' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'AI SEO + Local + Technical',
		metricBadges: [
			{ label: 'Organic Search Traffic', value: '+180% Qualified Growth' },
			{ label: 'Delivery Model', value: '100% In-House Senior Delivery' },
		],
		// PLACEHOLDER: replace with real content
		panelLabel: 'SEARCH / CONTENT / GROWTH',
		panelPlus: '',
		panelImage: {
			src: '/images/seo-service-hero.webp',
			// PLACEHOLDER: replace with real content
			alt: 'Website shown on a laptop and a phone',
		},
		// PLACEHOLDER: replace with real content
		panelCaptions: ['Clear priorities', 'Useful content', 'Measurable growth'],
	},
	features: {
		pill: 'Commercial Search Strategy',
		titleLines: ['Not Just Page-One Rankings.', 'Real Commercial Return.'],
		text: 'We replace vanity keyword metrics with search campaigns engineered to drive measurable revenue through organic methods.',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Target Ready-to-Buy Commercial Intent',
				text: 'We ignore high-volume, generic search queries that deliver zero revenue. Instead, we focus on high-intent commercial keywords used by serious buyers.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Build Sustainable Technical Authority',
				text: 'We resolve crawling errors, optimise Core Web Vitals and build secure site structures that safeguard your organic visibility against algorithm updates.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Turn Inbound Clicks into Paid Clients',
				text: 'Organic traffic is wasted if your landing pages fail to persuade. We connect search intent directly to clear navigation, persuasive copy and friction-free inquiry forms.',
			},
		],
	},
	experience: {
		pill: 'Technical Foundations',
		titleLines: ['The Right Search Strategy.', 'The Right Technical Foundation.'],
		text: 'Our technical team implements code, schema and performance fixes directly onto your website. Our focus is to help businesses across Manchester and the North West corridor scale their organic market share.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'Core Web Vitals & Speed Optimisation',
				text: 'Ensure your site loads in under 2 seconds, passing Google’s strict performance benchmarks to improve organic rankings.',
			},
			{
				icon: 'landing-page-design',
				title: 'Structured Data & Schema Architecture',
				text: 'Implement advanced JSON-LD schema across your services, reviews and physical locations so search engines can index your data clearly.',
			},
			{
				icon: 'website-redesign',
				title: 'Crawl Budget & Indexation Control',
				text: 'Eliminate duplicate URLs, redirect loops and crawl bloat to ensure Google prioritises your highest-value commercial landing pages.',
			},
		],
	},
	bento: {
		pill: 'Full-Spectrum SEO',
		title: 'Make Every Search Query Work Harder for Your Pipeline',
		text: 'To outrank established competitors across Manchester and the UK, your website needs to perform across technical health, content relevance, local authority and AI search readiness.',
		cards: [
			{
				icon: 'wordpress-development',
				title: 'AI SEO (GEO & AEO)',
				text: 'Position your brand as the primary source cited by conversational AI engines like Google Gemini, Perplexity and ChatGPT Search.',
				linkLabel: 'Explore AI SEO →',
				href: '/services/seo/ai-seo-geo-and-aeo',
			},
			{
				icon: 'sopify-development',
				title: 'Local SEO Manchester',
				text: 'Dominate local search queries and Google Map pack rankings across Greater Manchester and the North West.',
				linkLabel: 'Explore Local SEO →',
				href: '/services/seo/local-seo',
			},
			{
				icon: 'ecommerce-development',
				title: 'Technical SEO',
				text: 'Resolve deep indexing roadblocks, optimise site architecture and ensure lightning-fast mobile performance.',
				linkLabel: 'Explore Technical SEO →',
				href: '/services/seo/technical-seo',
			},
			{
				icon: 'custom-website-development',
				title: 'On-Page SEO',
				text: 'Optimise headings, meta architecture, schema markup and content relevance so search engines understand your exact commercial focus.',
				linkLabel: 'Explore On-Page SEO →',
				href: '/services/seo/on-page-seo',
			},
			{
				icon: 'wordpress-development',
				title: 'High-Authority Link Building',
				text: 'Build domain authority and trust through verified, high-quality editorial links from recognised UK publications.',
				linkLabel: 'Explore Link Building →',
				href: '/services/seo/link-building-off-page',
			},
			{
				icon: 'ecommerce-development',
				title: 'E-Commerce SEO',
				text: 'Increase revenue across Shopify, WooCommerce and custom stores through optimised category hierarchy and product schema.',
				linkLabel: 'Explore E-Commerce SEO →',
				href: '/services/seo/e-commerce-seo',
			},
		],
	},
	showcase: {
		pill: 'User Experience & Conversion',
		titleLines: ['Desktop or Mobile.', 'The Same Flawless Conversion Journey.'],
		text: 'With Google operating strictly on mobile-first indexing, the mobile experience determines your search rankings. We ensure your site delivers intuitive user flows, rapid load speeds and effortless inquiry paths on every screen size.',
		compactHeading: true,
		plainPanel: true,
		panel: {
			label: '',
			note: '',
			image: {
				src: '/images/ai-seo-geo-and-aeo-hero.webp',
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			caption: '',
		},
		items: [
			'Instant Answers: Content engineered to answer high-intent user questions immediately.',
			'Frictionless Navigation: Intuitive mobile layouts that keep browsing natural on any screen.',
			'Thumb-Reach Conversions: Tap-to-call links, booking forms, and quote requests positioned for mobile users.',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'The Xoomplus Standard',
		titleLines: ['High-Performance SEO Built on', 'Direct Partnership'],
		text: 'Our senior delivery model protects your budget and drives dependable growth.',
		image: {
			src: '/images/seo-the-xoomplus-standard.webp',
			alt: 'The Xoomplus Standard for SEO delivery',
			width: 960,
			height: 540,
		},
		items: [
			{
				title: 'A Scope Shaped Around Commercial Needs',
				text: 'We agree on clear technical priorities, content deliverables and measurable search targets before any work begins.',
			},
			{
				title: 'Direct Access to Senior Search Specialists',
				text: 'You communicate directly with the technical SEO directors and content strategists managing your campaigns.',
			},
			{
				title: 'Transparent Reporting & Full Asset Ownership',
				text: 'You retain 100% ownership of your Google Search Console, GA4 property and all content created, with no lock-ins or proprietary platforms.',
			},
		],
		itemTextSize: '18px',
	},
	faqKey: 'seo',
};
