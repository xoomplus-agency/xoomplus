import type { MainService } from './types';
import { makeChildService } from './children';
import { childServiceHeroImage } from './images';

const SLUG = 'seo';
const NAME = 'SEO';
const aiSeoChild = makeChildService(NAME, 'ai-seo', 'AI SEO (GEO & AEO)', {
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
	secondaryLabel: 'How On Page Optimisation Works ↓',
});

const linkBuildingChild = makeChildService(NAME, 'link-building', 'Link Building (Off-Page)', {
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
	secondaryLabel: 'How Our SEO Audit Services Work ↓',
});

export const seo: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Build visibility. Reach the right audience.',
	metaTitle: 'SEO Agency Manchester | Grow Your Business with XoomPlus',
	metaDescription:
		'Grow your business with XoomPlus, an SEO Agency in Manchester helping brands improve search visibility, attract customers and increase sales.',
	children: [
		{
			...aiSeoChild,
			metaTitle: 'AI SEO Agency Manchester | GEO & AEO Services | XoomPlus',
			metaDescription:
				'Grow your brand with XoomPlus, an AI SEO Agency in Manchester offering AI search optimisation, GEO strategies and expert AEO services.',
			hero: {
				...aiSeoChild.hero,
				pill: 'GEO & AEO',
				titleLines: ['AI SEO Agency Manchester &', 'Across the UK'],
				paragraphs: [
					'As an AI SEO agency in Manchester, Xoom Plus helps your business stay visible across platforms like Google AI Overviews, ChatGPT Search, Perplexity and Gemini through clear content, structured data and strategic optimisation.',
					'Our AI SEO services in Manchester combine traditional SEO with Generative Engine Optimisation (GEO) to strengthen your online visibility, build brand authority and attract customers with genuine buying intent.',
				],
				buttonLabel: 'Request an AI Visibility Review',
				image: {
					...aiSeoChild.hero.image,
					src: childServiceHeroImage('ai-seo-geo-and-aeo'),
				},
			},
			hideProcess: true,
			heroSecondaryHref: '#features',
			features: {
				pill: 'The Mechanics of AI Search',
				titleLines: ['What Is AI SEO and Why Does', 'Your Business Need It?'],
				text: 'AI SEO is the process of optimising your website and content so AI-powered platforms like ChatGPT, Google AI Overviews, Gemini and Perplexity can understand, recommend and reference your business. AI search optimisation services help businesses reach potential customers wherever they search.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Stay Visible in AI-Powered Search',
						text: 'AI SEO helps your brand appear in relevant AI-generated answers, so potential customers can discover you when making decisions.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Build Trust and Brand Authority',
						text: 'AI platforms rely on relevant, clear and credible information to generate answers. Optimising your website helps establish your business as a reliable source, increasing the chances of your brand being mentioned and recommended.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Attract High-Intent Customers',
						text: 'AI SEO helps your business reach people who are actively researching solutions, comparing providers and looking for specific services. This improves your chances of attracting qualified visitors who are more likely to become leads and paying customers.',
					},
				],
			},
			services: {
				pill: 'Specialised Technical Delivery',
				heading: 'Our AI Visibility Services in Manchester',
				text: 'We deploy targeted AI search optimisations to make sure AI platforms read, trust and quote your website accurately.',
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
						text: 'People speak to AI engines using long, natural questions rather than short keywords. We map out how customers talk about your services in real life and customise your content to match those exact phrasing patterns.',
						imageSrc: '/images/crm-and-custom-business-software-design.png',
					},
					{
						title: 'Generative Brand Tracking & Visibility Audits',
						text: 'We track how often and in what context tools like ChatGPT, Perplexity and Google Gemini mention your brand, systematically fixing factual gaps and incorrect references.',
						imageSrc: '/images/uiux-redesign.png',
					},
				],
			},
			afterServices: {
				id: 'ai-platforms',
				pill: 'AI Search Platform',
				title: 'Which AI Search Platforms Can Your Business Appear On?',
				titleLines: [
					'Which AI Search Platforms Can',
					'Your Business Appear On?',
				],
				text: 'Our AI search optimisation strategies help your business improve its visibility across leading AI platforms including:',
				cards: [
					{
						title: 'ChatGPT Search Optimisation',
						text: 'Our AI SEO helps ChatGPT understand your business. Our approach focuses on clear answers, relevant information and credible sources to improve your chances of appearing in ChatGPT Search results.',
					},
					{
						title: 'Google AI Overviews and AI Mode Optimisation',
						text: "Google AI Overviews and AI Mode provide AI-generated responses to user queries. We structure your content around search intent, useful answers and relevant entities to improve your chances of being referenced in Google's AI-powered search experiences.",
					},
					{
						title: 'Google Gemini Optimisation',
						text: "We strengthen your website's content, topical relevance and brand information so Gemini can better understand what your business offers and when it may be relevant to users.",
					},
					{
						title: 'Perplexity AI Optimisation',
						text: 'We create informative, well-structured content backed by reliable information to increase your chances of being cited in relevant Perplexity answers.',
					},
				],
			},
			serviceStack: {
				pill: 'Our Process',
				heading: 'A Step-by-Step Process',
				text: 'Our simple AI SEO services help your website to become the trusted choice for AI platforms.',
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
						text: 'We explain every change in a simple language before touching your site. You receive a clear roadmap outlining where AI models currently overlook your brand and how we will fix it.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Seamless Collaboration with Your Existing Web Team',
						text: 'We provide developer-ready schema code and content layouts that your internal team can drop into place without causing delays.',
						imageSrc:
							'/images/ai-seo-geo-and-aeo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Continuous Monitoring Across Evolving AI Platforms',
						text: "AI search engines update their retrieval methods frequently. We monitor how ChatGPT, Gemini and Google adjust their citations and update your website's data so you stay cited.",
						imageSrc:
							'/images/ai-seo-geo-and-aeo-continuous-monitoring-across-evolving-ai-platforms.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Choose Xoom Plus',
				title: 'Why Choose Xoom Plus as Your AI SEO Agency in Manchester?',
				text: 'At Xoom Plus, we combine traditional SEO, GEO and AEO to improve your visibility across search engines and AI platforms.',
				cards: [
					{
						icon: '/icons/result-focused.svg',
						title: 'Commercially Focused Strategies',
						text: 'We build AI SEO strategies around your business goals, target audience and commercial priorities to attract customers who are ready to take action.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'SEO and AI Search Expertise',
						text: 'Our team combines traditional SEO with modern AI search optimisation to help your business remain visible across Google, ChatGPT, Gemini and Perplexity.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Industry-Specific Optimisation',
						text: 'As an AI SEO company in Manchester, we understand that every industry has different search needs. We develop strategies that reflect your services, audience and competitive market.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting and Measurable Growth',
						text: 'We track organic performance, AI visibility, brand mentions and qualified leads to show how our AI SEO solutions contribute to your business growth.',
					},
				],
			},
			comparisonTable: {
				id: 'seo-geo-aeo-comparison',
				pill: 'SEO vs GEO vs AEO',
				title: ['AI SEO vs GEO vs AEO:', 'Understanding the Differences'],
				columns: ['Comparison', 'AI SEO', 'GEO', 'AEO'],
				rows: [
					{
						label: 'Main Focus',
						values: [
							'Improving visibility across traditional and AI-powered search.',
							'Getting your brand mentioned and cited in AI-generated responses.',
							'Helping your content appear as a direct answer to user questions.',
						],
					},
					{
						label: 'Primary Goal',
						values: [
							'Increase search visibility, relevant traffic and conversions.',
							'Build brand recognition and authority across generative AI platforms.',
							'Make your content easy to understand, extract and present as an answer.',
						],
					},
					{
						label: 'Where It Works',
						values: [
							'Google, Bing, ChatGPT, Gemini and other AI search platforms.',
							'ChatGPT, Perplexity, Google AI Overviews and Gemini.',
							'Google Featured Snippets, voice search and AI-generated answers.',
						],
					},
					{
						label: 'Content Strategy',
						values: [
							'Combines keyword research, helpful content, technical SEO and structured data.',
							'Focuses on credible information, brand mentions, citations and topical authority.',
							'Uses question-based headings, concise answers, FAQs and structured content.',
						],
					},
					{
						label: 'Success Metrics',
						values: [
							'Organic traffic, rankings, leads and conversions.',
							'AI citations, brand mentions and AI-generated recommendations.',
							'Featured snippets, answer visibility and relevant search impressions.',
						],
					},
					{
						label: 'Business Benefit',
						values: [
							'Attracts relevant visitors and supports long-term organic growth.',
							'Helps customers discover and trust your brand through AI recommendations.',
							'Makes your business easier to find when customers search for specific answers.',
						],
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel digital solution',
				title: 'Different Needs. Connected Digital Solutions.',
				text: 'AI SEO is most powerful when paired with our core services. It maximises real outcomes for your business.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Pairs foundational technical site health and traditional Google rankings with advanced generative search visibility.',
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Fast-loading, semantic HTML architecture that ensures both human users and AI bots parse your site effortlessly.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Generates active multi-channel engagement and brand signals that strengthen your overall digital footprint across the web.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Impact',
				title: 'AI SEO Services for Different Industries',
				text: 'Our AI SEO services help businesses improve their visibility across AI-powered search platforms by creating relevant content.',
				columns: [
					{
						items: [
							{
								title: 'Property & Construction',
								text: 'Improve AI visibility for property developments and construction projects through structured content and location-based optimisation.',
							},
							{
								title: 'Healthcare & Wellness',
								text: 'Build trust through practitioner credentials and clear answers that help AI platforms understand your healthcare services.',
							},
							{
								title: 'Professional & B2B Services',
								text: 'Strengthen industry authority with expert-led content and detailed service pages that support AI-driven business recommendations.',
							},
						],
					},
					{
						items: [
							{
								title: 'Home & Trade Services',
								text: 'Help AI search platforms recognise your services, service areas and expertise so potential customers can discover your business.',
							},
							{
								title: 'Hospitality & Leisure',
								text: 'Improve your visibility in AI-generated results for hotels, restaurants and leisure facilities.',
							},
							{
								title: 'Retail & E-commerce',
								text: 'Optimise product information, category pages and structured data to help AI platforms understand your products.',
							},
						],
						button: {
							label: 'Explore All Industry Solutions',
							href: '/industries',
						},
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'Frequently Asked Questions About AI SEO Services in Manchester',
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
							'They look for sites that provide direct, authoritative answers to specific questions, verified by clear schemas, professional accreditations and consistent brand information across reputable web directories and industry publications.',
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
			metaTitle: 'Local SEO Services Manchester | Improve Google Maps Visibility',
			metaDescription:
				'Improve your local search presence with XoomPlus. Get expert Local SEO Services in Manchester to attract nearby customers and grow your business.',
			hero: {
				...localSeoChild.hero,
				pill: 'Local Search & Google Map Pack Visibility',
				titleLines: [
					'Local SEO Agency Manchester |',
					'Grow Your Business Locally',
				],
				paragraphs: [
					'At Xoom Plus, we help businesses improve their local visibility with effective local SEO services in Manchester. We optimise your Google Business Profile, create location-focused pages, improve local listings and build your online reputation.',
					'Whether you serve Manchester, Salford, Trafford or nearby areas, our local SEO strategies help more people find your business, contact you and become your customers.',
				],
				buttonLabel: 'Claim Your Local SEO Audit',
				image: {
					...localSeoChild.hero.image,
					src: childServiceHeroImage('local-seo'),
				},
			},
			features: {
				pill: 'Understanding Local Search',
				titleLines: ['What Is', 'Local SEO?'],
				text: 'Local SEO is the process of improving your business visibility in location-based Google searches. It helps nearby customers find your services through Google Search, Google Maps and local business listings.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Google Business Profile Optimisation',
						text: 'Your Google Business Profile helps customers find your business, contact details, services, opening hours and location.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Location-Based Website Optimisation',
						text: 'We optimise your website pages with relevant local keywords, location details and structured data to reach customers in your target areas.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Local Citations & Business Reputation',
						text: 'Accurate business listings and genuine customer reviews help build trust and strengthen your local online presence.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Local SEO Services Can Do for Your Business',
			processText: [
				'When people search for products or services in nearby areas, they often prefer businesses they can easily find and contact. Appearing in local search results helps your business reach these potential customers.',
				'Without a proper local SEO strategy, your competitors may get the attention and enquiries that could have gone to your business. Optimising your local digital footprint secures your market share, captures ready-to-buy enquiries and establishes your company as the leading regional authority.',
			],
			processImage: {
				src: '/images/local-seo-practical-commercial-value.webp',
				alt: 'Local SEO practical commercial value',
			},
			processPrimaryLabel: 'Claim Your Local SEO Audit',
			processSecondaryLabel: 'Explore Our Local SEO Process ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Complete Local Search Solutions',
				heading: 'Our Professional Local SEO Services',
				text: 'From Google Business Profile optimisation to local link building, we cover the key areas that support your local visibility.',
				cards: [
					{
						title: 'Google Business Profile Setup & Management',
						text: 'We set up and optimise your Google Business Profile to help customers find your business. This includes selecting the right categories, adding services, updating business information, uploading photos and sharing regular updates.',
						imageSrc: '/images/local-seo-google-business-profile-setup-management.webp',
					},
					{
						title: 'Location Pages & Local Landing Pages',
						text: 'We create dedicated pages for the areas your business serves, such as Manchester City Centre, Salford, Didsbury, Stockport and Trafford. Each page includes relevant local information and services to match what nearby customers are searching for.',
						imageSrc: '/images/local-seo-geo-targeted-landing-pages-borough-silos.webp',
					},
					{
						title: 'Local Business Schema Markup',
						text: 'We add local business schema to your website to help search engines understand your business details. This can include your address, contact information, opening hours, services and service areas.',
						imageSrc: '/images/local-seo-local-business-json-ld-schema-structuring.webp',
					},
					{
						title: 'Local Citation Building & Clean-Up',
						text: 'We create new listings on relevant UK directories to improve your online presence and maintain consistent business details.',
						imageSrc: '/images/local-seo-regional-citation-cleanup-directory-building.webp',
					},
					{
						title: 'Customer Reviews & Reputation Management',
						text: 'We help you create a simple process for requesting genuine customer feedback, responding to reviews and building a stronger online reputation.',
						imageSrc: '/images/local-seo-review-generation-reputation-systems.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Local SEO Across Different Industries',
				title: 'Our Local SEO Services for Different Industries',
				titleLines: [
					'Our Local SEO Services for Different',
					'Industries',
				],
				text: 'Every industry has different customers. Our local SEO services help your business reach the right audience in your target locations at the right time.',
				columns: [
					{
						items: [
							{
								title: 'Legal Practices & Law Firms',
								text: 'We optimise law firm websites and location pages to help solicitors reach people searching for legal services in Manchester.',
							},
							{
								title: 'Private Healthcare & Diagnostic Clinics',
								text: 'We help healthcare providers improve their local search presence through optimised clinic pages, accurate contact details, directions, opening hours and appointment links.',
							},
							{
								title: 'Commercial Trades & Field Services',
								text: 'We help plumbers, electricians, builders and other service providers reach customers in their target areas. Our strategy includes service-area pages, Google Business Profile optimisation and local citations.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Services & Professional Consultancies',
								text: 'We help accountants, IT companies, consultants and other professional service providers improve their visibility in key business areas such as Spinningfields and Salford Quays. This helps them reach businesses looking for professional services nearby.',
							},
							{
								title: 'Retail Shops & Hospitality Businesses',
								text: 'We optimise business listings, opening hours, photos, customer reviews and location pages to help shops, restaurants and hospitality businesses attract more local visitors.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'The Xoom Plus Approach',
				heading: 'Our Local SEO Process for Better Search Visibility',
				text: 'As a trusted Manchester local SEO company, we follow a clear process to improve your local search performance.',
				cards: [
					{
						title: 'Understanding Your Business & Target Areas',
						text: 'We start by learning about your business, services and target customers. We also review the areas you serve across Manchester and Greater Manchester to identify valuable local search opportunities.',
						imageSrc: '/images/clear-communication-and-collaboration.webp',
					},
					{
						title: 'Working Directly with Local SEO Experts',
						text: 'You work directly with our SEO specialists and technical team. We keep communication simple and make sure you understand what we are doing, why it matters and how it supports your business goals.',
						imageSrc: '/images/a-shared-vision-before-development.webp',
					},
					{
						title: 'Creating a Clear Local SEO Strategy',
						text: 'Based on our findings, we create a clear plan that highlights problems, opportunities and the work needed to improve your local visibility.',
						imageSrc: '/images/your-brand-reflected-in-the-interface.webp',
					},
					{
						title: 'Working with Your Website Team',
						text: 'Our team can work alongside your existing web team. We provide the required page recommendations, technical guidance and schema markup to make implementation easier.',
						imageSrc: '/images/strategy-before-decoration.webp',
					},
					{
						title: 'Tracking Results & Improving Performance',
						text: 'We monitor your local rankings, Google Business Profile performance, website traffic and enquiries. We use this information to find new opportunities and improve your local SEO strategy over time.',
						imageSrc: '/images/clear-communication-and-collaboration.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for Local SEO Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other Local SEO Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium SEO services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Complete Digital Growth Solutions',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Local SEO works best when combining it with other digital services, which can help your business reach more people and turn website visitors into customers.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
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
							"Standard SEO focuses on improving your website's organic visibility for broad keywords. Local SEO specifically targets search queries with regional intent (such as ‘accountant in Manchester’ or ‘solicitor near me’) and optimises for the Google Map 3-Pack, local business directories and localised mobile searches.",
					},
					{
						question:
							'Can I rank in the Manchester Map Pack if my office is based outside the city centre?',
						answer:
							"Yes. While Google's primary ranking factor for map searches includes physical proximity, a properly structured website with dedicated location pages, geo-targeted schema markup, regional authority links and local directory citations can rank prominently across multiple boroughs and surrounding districts.",
					},
					{
						question: 'Why is NAP (Name, Address, Phone) consistency so important?',
						answer:
							"Search engines cross-reference your business information across dozens of directories and web platforms to verify legitimacy. If your business name, address, or phone number varies across the web, it creates data conflicts that reduce search engines' confidence in your business, directly pulling down your local search rankings.",
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
				pill: 'Grow Your Local Presence',
				heading: 'Ready to Grow Your Business with Local SEO?',
				text: 'Get in touch with Xoom Plus today and discover how our local SEO strategies can support your business growth in Manchester.',
				buttonLabel: 'Claim Your Free Local SEO Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...technicalSeoChild,
			metaTitle: 'Technical SEO Agency Manchester | Boost Website Health',
			metaDescription:
				'Need better website performance? XoomPlus, a Technical SEO Agency in Manchester, helps resolve technical issues and improve search visibility.',
			hero: {
				...technicalSeoChild.hero,
				pill: 'Technical Website Architecture & Search Engine Crawlability',
				titleLines: [
					'Technical SEO Agency Manchester |',
					'Improve Your Website Health',
				],
				paragraphs: [
					'Technical issues can prevent your website from ranking, even when your content is valuable. Slow loading pages, broken links, crawling errors and indexing problems can stop search engines from finding and understanding your website.',
					'As a technical SEO agency in Manchester, our aim is to resolve the issues that stop your website from appearing in search results. Our specialists improve your site speed, fix crawl and indexing errors and optimise Core Web Vitals to build a technically strong website that performs better across Google and other search engines.',
				],
				buttonLabel: 'Request a Technical SEO Audit',
				image: {
					...technicalSeoChild.hero.image,
					src: childServiceHeroImage('technical-seo'),
				},
			},
			features: {
				pill: 'Understanding Technical SEO',
				titleLines: ['What Is', 'Technical SEO?'],
				text: "Technical SEO is the process of improving your website's structure and performance so search engines can find, crawl and index your pages.",
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Website Crawling & Indexing',
						text: 'Search engines need to find and understand your website pages before they can appear in search results. We fix crawl errors, broken links, duplicate pages and indexing issues to make important pages easier to access.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Website Speed & Core Web Vitals',
						text: 'A slow website can affect user experience and make visitors leave. We improve page loading speed, mobile performance and website stability to help visitors browse your website smoothly.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Website Structure & Schema Markup',
						text: 'A clear website structure helps search engines understand how your pages are connected. We improve internal links, organise website content and add schema markup to explain your business and services more clearly.',
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What Technical SEO Can Do for Your Business',
			processText: [
				'When people in Manchester and across the UK search for your services, search engines need to access, understand and index your website quickly.',
				'A website with technical issues can prevent both search engines and visitors from accessing important pages. Slow loading speeds, broken links, redirect errors and rendering problems can affect user experience and stop your pages from appearing in search results.',
				'Fixing these problems creates a strong technical foundation for your website. We improve site speed, resolve crawling and indexing issues and make sure search engines can find your important pages easily. This helps improve your search visibility, attract more relevant visitors and turn website traffic into potential customers.',
			],
			processImage: {
				src: '/images/technical-seo-practical-commercial-value.webp',
				alt: 'Technical SEO practical commercial value',
			},
			processPrimaryLabel: 'Request a Technical SEO Audit',
			processSecondaryLabel: 'Explore Our Technical Process ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Complete Technical SEO Solutions',
				heading: 'Our Technical SEO Services',
				text: 'We provide complete website technical SEO services to improve website health. From technical audits to website speed optimisation, we fix issues that affect your website.',
				cards: [
					{
						title: 'Technical Website Audits & Crawl Analysis',
						text: 'We review your website to find broken links, crawl errors, missing pages, duplicate URLs and other technical problems. Our audit helps identify what needs fixing and which issues should be addressed first.',
						imageSrc: '/images/technical-seo-deep-crawl-auditing-log-file-analysis.webp',
					},
					{
						title: 'Core Web Vitals & Website Speed Optimisation',
						text: 'We improve your website loading speed by compressing images, enabling browser caching and improving server response times. Our website speed optimisation services also focus on creating a smoother mobile experience.',
						imageSrc: '/images/technical-seo-core-web-vitals-frontend-speed-engineering.webp',
					},
					{
						title: 'Schema Markup & Structured Data',
						text: 'We add relevant schema markup to help search engines understand your website information. This may include organisation, local business, product and service schema, depending on your website and business needs.',
						imageSrc: '/images/technical-seo-structured-data-advanced-json-ld-schema.webp',
					},
					{
						title: 'Indexing & Canonical Tag Management',
						text: 'We use canonical tags and XML sitemaps to help search engines understand which pages should be considered for indexing.',
						imageSrc: '/images/technical-seo-indexation-management-canonical-hierarchy.webp',
					},
					{
						title: 'Mobile Usability & Website Structure',
						text: 'We check mobile usability to ensure your website works smoothly across different screen sizes and devices.',
						imageSrc:
							'/images/technical-seo-mobile-usability-technical-architecture-alignment.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Technical SEO Across Different Industries',
				title: 'Our Technical SEO Services Support Different Industries',
				titleLines: [
					'Our Technical SEO Services Support Different',
					'Industries',
				],
				text: 'Different industries have different website requirements. Our professional technical SEO services support your website, no matter which industry your business belongs to.',
				columns: [
					{
						items: [
							{
								title: 'E-Commerce & Online Retail Businesses',
								text: 'Online stores often have many product pages, filters and categories. These can create duplicate URLs and indexing problems. We improve your website structure, product schema and page performance to help search engines find your important product pages.',
							},
							{
								title: 'Legal Practices & Law Firms',
								text: 'Law firm websites need a clear structure so potential clients can easily find legal services and useful information. We improve website navigation, fix broken links and optimise important service pages to support better search visibility.',
							},
							{
								title: 'Private Healthcare & Diagnostic Clinics',
								text: 'Healthcare websites need to provide clear and reliable information. We improve website speed, mobile usability, security and page structure to make it easier for patients to access your services and make appointments.',
							},
						],
					},
					{
						items: [
							{
								title: 'Commercial Trades & Field Services',
								text: 'Customers often search for local trades and services using their mobile phones. We improve mobile loading speed, fix technical errors and make important service pages easier to access, helping businesses provide a better online experience.',
							},
							{
								title: 'B2B Technology & Software Companies',
								text: 'Software websites often contain complex features and interactive pages. We review their technical setup, improve JavaScript rendering and fix indexing issues so search engines can better understand and access important website content.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'Our Process',
				heading: 'Our Technical SEO Process for Better Website Performance',
				text: 'As an experienced technical SEO company in Manchester, we follow a clear process to identify problems and improve website performance.',
				cards: [
					{
						title: 'Understanding Your Website & Technical Needs',
						text: 'We start by reviewing your website, its structure and current performance. We identify technical issues, indexing problems and areas that need improvement to build a clear action plan.',
						imageSrc:
							'/images/technical-seo-Scoped-around-root-cause-code-resolution.webp',
					},
					{
						title: 'Working Directly with Technical SEO Specialists',
						text: 'You work directly with our SEO specialists and technical team. We keep communication simple and make sure you understand the issues affecting your website and how we plan to fix them.',
						imageSrc:
							'/images/technical-seo-direct-access-to-senior-web-engineers-seo-directors.webp',
					},
					{
						title: 'Creating a Clear Technical SEO Strategy',
						text: 'We explain our audit findings in simple language and prioritise the issues that need attention. You receive a clear plan covering website speed, crawling, indexing, mobile usability and other technical improvements.',
						imageSrc:
							'/images/technical-seo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Working with Your Existing Development Team',
						text: 'Our team can work with your in-house developers. We provide clear instructions, technical recommendations and code updates to make website improvements easier to implement.',
						imageSrc:
							'/images/technical-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Monitoring Website Health & Performance',
						text: 'Technical SEO needs regular checks. We monitor website performance, indexing status, crawl errors and Core Web Vitals. We also review website updates to identify new problems and keep your website in good technical condition.',
						imageSrc:
							'/images/technical-seo-continuous-monitoring-regression-protection.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for Technical SEO Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other Technical SEO Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium technical SEO services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Complete Digital Growth Solutions',
				title: 'Different Needs. Connected Digital Solutions.',
				text: 'Technical SEO creates a strong foundation for your website when combined with our other digital services.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'FAQs About Technical SEO',
				text: 'Find answers to common questions about technical SEO',
				items: [
					{
						question: 'What is technical SEO, and why does my business need it?',
						answer:
							'Technical SEO improves the backend structure and performance of your website. It includes fixing crawl errors, improving website speed, managing indexing and making your website mobile-friendly.',
					},
					{
						question: "How do Core Web Vitals affect my website's performance?",
						answer:
							'Core Web Vitals measure important parts of the user experience, including loading speed, responsiveness and visual stability.',
					},
					{
						question: 'What is the difference between crawling and indexing?',
						answer:
							'Crawling is when search engines discover and visit your website pages. Indexing happens when search engines process and store information about those pages.',
					},
					{
						question: 'Can technical SEO issues affect my Google rankings?',
						answer:
							'Yes. Problems such as broken links, incorrect indexing settings, slow loading times and server errors can affect how search engines access your website.',
					},
					{
						question: 'How long does it take to see results from technical SEO?',
						answer:
							'The time depends on the type of issues and the size of your website. Some technical fixes may show improvements within a few weeks. However, Google needs time to crawl and process website changes. Ranking and traffic improvements may take longer.',
					},
					{
						question: 'Do I need a new website to fix technical SEO problems?',
						answer:
							'No. Most technical SEO issues can be fixed on your existing website. Our team can improve your website code, fix broken links, manage indexing, optimise images and improve loading speed without rebuilding the entire website.',
					},
				],
			},
			cta: {
				pill: 'Build a Stronger Website',
				heading: 'Ready to Fix the Technical Issues Holding Your Website Back?',
				text: 'Speak with our technical SEO experts to improve your website performance, fix technical errors and build a stronger foundation for better search visibility.',
				buttonLabel: 'Request Your Technical Site Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...onPageSeoChild,
			metaTitle: 'On Page SEO Services Manchester | Content & Page Optimisation',
			metaDescription:
				'Get On Page SEO Services in Manchester from XoomPlus. Optimise website pages, improve keyword targeting and strengthen organic search visibility.',
			hero: {
				...onPageSeoChild.hero,
				pill: 'On Page Search Optimisation',
				titleLines: [
					'On Page SEO Services Manchester |',
					'Improve Page Performance',
				],
				paragraphs: [
					'Poorly optimised website pages can struggle to rank in search results, even when they offer valuable content. Missing keywords, weak headings, poorly written meta descriptions and weak internal links can make it harder for search engines to understand your pages and connect them with the right audience.',
					'At Xoom Plus, we provide professional on page SEO services in Manchester to fix these issues. We optimise page titles, headings, descriptions, content, images and internal links to make every page more relevant and search-friendly.',
				],
				buttonLabel: 'Request an On Page SEO Audit',
				image: {
					...onPageSeoChild.hero.image,
					src: childServiceHeroImage('on-page-seo'),
				},
			},
			features: {
				pill: 'Understanding On Page SEO',
				titleLines: ['What Is', 'On Page SEO?'],
				text: 'On page SEO is the process of improving individual website pages to make them more useful for visitors and easier for search engines to understand.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Keyword Research & Search Intent',
						text: 'We identify the keywords your potential customers use when searching for your services. We use them naturally in page titles, headings and content to match what people are looking for.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Content Structure & Internal Linking',
						text: 'We organise your website content with clear headings and relevant internal links. This helps visitors find useful information and allows search engines to understand how your pages are connected.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Content Quality & User Experience',
						text: 'We improve your page content with clear information, easy-to-read sections and relevant calls to action. This makes your website easier to use and helps visitors take the next step.',
					},
				],
			},
			processPill: 'Practical Business Benefits',
			processHeading: 'What On Page SEO Can Do for Your Business',
			processText: [
				'When potential customers in Manchester and across the UK search for your business, they usually land on specific service pages rather than your homepage. If these pages are poorly structured, difficult to read or unclear about what you offer, visitors may leave without taking action. This can also affect your search rankings.',
				'Even websites with strong domain authority can struggle to generate leads if their pages are not properly optimised. Aligning your content with what potential customers are searching for helps search engines and AI platforms understand your pages.',
			],
			processImage: {
				src: '/images/on-page-seo-practical-commercial-value.webp',
				alt: 'On-Page SEO practical commercial value',
			},
			processPrimaryLabel: 'Request an On Page SEO Audit',
			processSecondaryLabel: 'Explore Our On Page Process ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Complete On Page Optimisation Services',
				heading: 'Our Professional On Page SEO Services',
				text: 'We provide complete on page SEO services to improve your website content, structure and search visibility.',
				cards: [
					{
						title: 'Keyword Research & Search Intent Mapping',
						text: 'We research relevant keywords and understand what your target audience is looking for. We assign the right keywords to the right pages to avoid overlap and help each page target a clear search topic.',
						imageSrc: '/images/on-page-seo-search-intent-commercial-keyword-mapping.webp',
					},
					{
						title: 'Heading Structure & Content Optimisation',
						text: 'We organise your content using clear H1, H2 and H3 headings. We also improve page copy, add useful information and make your content easier to read and understand.',
						imageSrc: '/images/on-page-seo-semantic-heading-content-architecture.webp',
					},
					{
						title: 'Title Tags & Meta Descriptions',
						text: 'We write clear and relevant title tags and meta descriptions for your website pages. These explain what each page offers and encourage people to visit your website from search results.',
						imageSrc: '/images/on-page-seo-metadata-engineering-organic-ctr-optimisation.webp',
					},
					{
						title: 'Internal Linking & Content Structure',
						text: 'We add relevant internal links between related pages to help visitors find useful information. A clear linking structure also helps search engines discover your important pages and understand their relationship.',
						imageSrc: '/images/on-page-seo-silo-internal-linking-topical-depth.webp',
					},
					{
						title: 'Image Optimisation & Alt Text',
						text: 'We optimise website images by reducing file sizes, using descriptive file names and adding relevant alt text. This helps improve page performance and makes visual content more accessible.',
						imageSrc: '/images/on-page-seo-media-optimisation-accessibility-tagging.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'On Page SEO Across Different Industries',
				title: 'Our On-Page SEO Services for Different Industries',
				titleLines: [
					'Our On-Page SEO Services for Different',
					'Industries',
				],
				text: 'Our on-page SEO strategies are tailored to your industry, helping your business attract relevant visitors and build trust.',
				columns: [
					{
						items: [
							{
								title: 'Legal Practices & Law Firms',
								text: 'Legal websites often contain complex information that can be difficult for visitors to understand. We improve service pages with clear headings, simple explanations and relevant FAQs to help potential clients understand your legal services.',
							},
							{
								title: 'Medical Reporting, Clinics & Private Healthcare',
								text: 'Healthcare visitors need clear and reliable information before choosing a provider. We organise clinical service pages, improve treatment descriptions, add relevant FAQs and make appointment information easier to find.',
							},
							{
								title: 'Commercial Trades & Field Service Contractors',
								text: 'Customers looking for plumbers, electricians and other trades want quick answers. We optimise service pages with clear descriptions, relevant keywords and easy-to-find contact details to help generate more enquiries.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Business & Technology Solutions',
								text: 'Technology and consultancy services can be difficult to explain. We organise your content around customer problems, service benefits and solutions so potential business clients can understand what you offer.',
							},
							{
								title: 'E-Commerce & Specialist Retail',
								text: 'Online shoppers need clear product and category information before making a purchase. We optimise product descriptions, category pages, headings and images to help customers find the right products.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'Our On Page SEO Process',
				heading: 'Our On Page SEO Process for Better Search Performance',
				text: 'As an on page SEO company in Manchester, we follow a clear process to improve your website content and page structure.',
				cards: [
					{
						title: 'Understanding Your Business & Target Keywords',
						text: 'We start by learning about your business, services and target audience. We research relevant search terms and identify the pages that have the best opportunities to attract potential customers.',
						imageSrc: '/images/on-page-seo-scoped-around-commercial.webp',
					},
					{
						title: 'Working Directly with On Page SEO Experts',
						text: 'You work directly with our on page SEO specialists and content team. We understand your business needs and make sure every optimisation supports your website goals and target audience.',
						imageSrc: '/images/on-page-seo-direct-access-to-senior.webp',
					},
					{
						title: 'Creating a Clear Optimisation Strategy',
						text: 'We review your website content, headings, page titles, descriptions and internal links. We then create a clear plan explaining what needs improvement and how each change can support your on page SEO performance.',
						imageSrc: '/images/on-page-seo-plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Working with Your Existing Website Team',
						text: 'Our team can work with your existing developers. We provide optimised content, heading recommendations and internal linking suggestions to make implementation easier.',
						imageSrc:
							'/images/on-page-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Monitoring Results & Improving Content',
						text: 'We track keyword rankings, organic traffic and page performance. We also review your content regularly and make improvements when search trends or business needs change.',
						imageSrc: '/images/on-page-seo-continuous-refinement-performance-tracking.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for On Page SEO Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other On Page SEO Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium on page SEO services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Complete Digital Growth Solutions',
				title: 'Different Needs. Connected Digital Solutions.',
				text: 'On Page SEO is one part of our connected digital growth ecosystem.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Your Questions Answered',
				heading: 'FAQs About On-Page SEO',
				text: 'Find answers to common questions about on-page optimisation, website content and keyword research.',
				items: [
					{
						question:
							'What is the difference between on-page SEO and technical SEO?',
						answer:
							"On-page SEO focuses on the content and elements of individual website pages. Technical SEO focuses on the website's backend, including loading speed, crawling, indexing and website structure.",
					},
					{
						question: 'Can On-Page SEO fix keyword cannibalisation?',
						answer:
							'Yes. Keyword cannibalisation happens when multiple pages target the same or very similar search terms. This can make it difficult for search engines to understand which page is most relevant.',
					},
					{
						question: 'How do title tags and meta descriptions affect SEO?',
						answer:
							'Title tags help search engines and visitors understand what a page is about. Meta descriptions do not directly affect rankings, but a clear and useful description can encourage more people to click on your website in search results.',
					},
					{
						question: 'Why are internal links important for on-page SEO?',
						answer:
							'Internal links connect different pages on your website. They help visitors find related information and allow search engines to discover your important pages.',
					},
					{
						question: 'How often should I update my website content?',
						answer:
							'You should review your important website pages regularly, especially when your services, prices or business information change.',
					},
					{
						question: 'Do I need to rewrite all the content on my website?',
						answer:
							'No. Not every page needs a complete rewrite. Sometimes, improving headings, updating page titles, adding relevant keywords and making existing content clearer is enough.',
					},
				],
			},
			cta: {
				pill: 'Turn Your Content into Results',
				heading: 'Are your website pages struggling to rank or generate enquiries?',
				text: 'Speak with our on-page SEO team to discover how our on-page optimisation strategies can help your website reach more potential customers.',
				buttonLabel: 'Request Your On-Page Content Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...linkBuildingChild,
			metaTitle: 'Link Building Services Manchester | Build Quality Backlinks',
			metaDescription:
				'Grow your website authority with XoomPlus. Get Link Building Services in Manchester through quality backlinks, editorial outreach and digital PR.',
			hero: {
				...linkBuildingChild.hero,
				pill: 'Off-Page SEO & Link Building Services',
				titleLines: [
					'Link Building Services Manchester |',
					'Earn Quality Backlinks',
				],
				paragraphs: [
					'A lack of quality backlinks can make it harder for your website to build authority and compete for higher search rankings. Without links from relevant and trusted websites, search engines may have fewer signals to recognise your business as a reliable source of information.',
					'At Xoomplus, our link building services in Manchester help businesses strengthen their online authority through quality backlinks from relevant websites, industry publications and trusted UK sources.',
				],
				buttonLabel: 'Request Off-Page SEO Audit',
				image: {
					...linkBuildingChild.hero.image,
					src: childServiceHeroImage('link-building-off-page'),
				},
			},
			features: {
				pill: 'Understanding Off-Page SEO',
				titleLines: ['What Is', 'Off-Page SEO?'],
				text: 'Link building/off-page SEO includes activities outside your website that help improve its reputation, trust and authority. It mainly focuses on earning quality backlinks, getting brand mentions and building relationships with relevant websites.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Quality Backlinks & Relevant Websites',
						text: "We help your website earn links from trusted websites, industry publications and relevant blogs. These backlinks help build your website's authority and improve its chances of ranking in search results.",
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Website Authority & Online Reputation',
						text: "We build your online presence through relevant website mentions, industry features and quality link placements. This helps improve your brand's reputation and makes your business more recognisable.",
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Natural Link Building & Trust',
						text: 'We focus on earning genuine backlinks through useful content, guest posts and digital PR. A natural backlink profile helps build long-term trust and reduces the risks of poor-quality link-building practices.',
					},
				],
			},
			processPill: 'Practical Business Benefits',
			processHeading: 'What Link Building Can Do for Your Business',
			processText: [
				'In competitive markets across Manchester and the UK, many businesses have well-written content and technically strong websites. However, these factors alone may not be enough to achieve higher search rankings.',
				"Search engines also consider the quality and relevance of backlinks when assessing a website's authority. Without links from trusted and relevant websites, your pages may struggle to compete with established businesses, even if your content is well-optimised.",
				"Earning quality backlinks from industry websites and trusted publications helps build your website's authority and credibility. This can support better keyword rankings, improve your search visibility and bring relevant referral traffic to your website.",
			],
			processImage: {
				src: '/images/link-building-off-page-practical-commercial-value.webp',
				alt: 'Link Building off-page practical commercial value',
			},
			processPrimaryLabel: 'Request a Backlink Profile Audit',
			processSecondaryLabel: 'Explore Our Link Building Process ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Specialist Link Building Services',
				heading: 'Our Professional Link-Building Services',
				text: 'As a link building agency in Manchester, we use different methods to help your website earn relevant links, build authority and improve its online presence.',
				cards: [
					{
						title: 'Competitor Backlink Analysis',
						text: "We analyse your competitors' backlinks to find websites and publications linking to them. This helps us identify new link-building opportunities for your business.",
						imageSrc: '/images/link-building-off-page-competitor-backlink-gap-analysis.webp',
					},
					{
						title: 'Digital PR & Guest Posting',
						text: "We reach out to relevant publications, blogs and industry websites to secure guest posts, expert contributions and editorial mentions that build your brand's visibility.",
						imageSrc: '/images/link-building-off-page-digital-pr-editorial-media-outreach.webp',
					},
					{
						title: 'Linkable Content & Resource Creation',
						text: 'We create useful content, industry guides, research and other resources that give relevant websites a reason to link to your business.',
						imageSrc: '/images/link-building-off-page-linkable-asset-creation-research-data.webp',
					},
					{
						title: 'Local Link Building',
						text: 'We find relevant local link opportunities through Manchester business directories, regional publications, trade associations and trusted local websites.',
						imageSrc:
							'/images/link-building-off-page-regional-manchester-north-west-citation-building.webp',
					},
					{
						title: 'Backlink Profile Audit & Toxic Link Review',
						text: 'We review your existing backlinks to identify suspicious, irrelevant or potentially harmful links. Where necessary, we recommend suitable action to maintain a healthy backlink profile.',
						imageSrc: '/images/link-building-off-page-toxic-link-auditing-disavow-management.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry-Specific Link Building',
				title: 'How Our Link Building Services Support Different Industries',
				titleLines: [
					'How Our Link Building Services Support Different',
					'Industries',
				],
				text: 'We make link-building strategies around your business, target audience and industry to help you earn relevant links and improve online visibility.',
				columns: [
					{
						items: [
							{
								title: 'Legal Practices & Law Firms',
								text: "We help law firms earn backlinks from relevant legal publications, professional websites and regional business platforms. These links can strengthen your online reputation and help you compete in Manchester's legal market.",
							},
							{
								title: 'Private Healthcare, Clinics & Medical Reporting',
								text: 'We identify relevant healthcare publications, medical resources and professional organisations where your business can earn useful mentions and backlinks.',
							},
							{
								title: 'Commercial Trades & Engineering Contractors',
								text: 'We find link opportunities through construction websites, trade directories, industry associations and regional business platforms. These links help contractors improve their online presence and reach potential clients.',
							},
						],
					},
					{
						items: [
							{
								title: 'B2B Technology & Professional Consultancies',
								text: 'We help technology companies and consultancies earn links from relevant business publications, technology blogs and industry resources. This supports their authority and helps them reach business decision-makers.',
							},
							{
								title: 'E-Commerce & Retail Businesses',
								text: 'We build links through product features, relevant blogs, industry publications and online shopping guides. These placements can improve brand awareness, attract potential customers and support organic search visibility.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'Our Process',
				heading: 'Our Effective Link Building Process',
				text: 'Our link-building process focuses on quality, relevance and transparency.',
				cards: [
					{
						title: 'Understanding Your Business & Goals',
						text: 'We learn about your business, services, target audience and competitors. This helps us understand which websites and backlink opportunities are most relevant to your industry.',
						imageSrc: '/images/on-page-seo-scoped-around-commercial.webp',
					},
					{
						title: 'Backlink Research & Opportunity Analysis',
						text: 'We review your existing backlink profile and research your competitors. Our team identifies relevant websites, publications and platforms that offer suitable link-building opportunities.',
						imageSrc:
							'/images/link-building-off-page-direct-access-to-senior-digital-pr-specialists.webp',
					},
					{
						title: 'Clear Strategy Before Outreach',
						text: 'We prepare a link-building plan based on your goals, target pages and industry. We explain our approach in simple language so you understand where and how we plan to build links.',
						imageSrc:
							'/images/link-building-off-page-plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Manual Outreach & Link Acquisition',
						text: 'We contact relevant website owners, editors and publishers to secure suitable placements. We focus on genuine outreach and relevant websites rather than automated link schemes.',
						imageSrc:
							'/images/link-building-off-page-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Backlink Monitoring & Reporting',
						text: 'We monitor your acquired links and share regular reports showing live placements, linking websites and campaign progress. This helps you understand how your backlink profile is developing.',
						imageSrc:
							'/images/link-building-off-page-continuous-monitoring-verified-reporting.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for Off Page SEO Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other Off Page SEO Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium off page SEO services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Complete Digital Solution',
				title: 'Different Needs. Connected Digital Solution.',
				text: 'Link building works best when combined with other SEO and digital marketing services.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'FAQs About Link Building',
				text: 'Find answers to common questions about backlinks, off-page SEO and our link-building services.',
				items: [
					{
						question: 'What is link building in SEO?',
						answer:
							"Link building is the process of getting other websites to link to your website. These links, known as backlinks, help search engines discover your pages and assess your website's authority and relevance.",
					},
					{
						question: 'Why are backlinks important for SEO?',
						answer:
							"Backlinks can help improve your website's authority and search visibility.",
					},
					{
						question: 'What makes a backlink high quality?',
						answer:
							'A quality backlink usually comes from a trusted website that is relevant to your industry. The link should appear naturally within useful content and provide value to readers.',
					},
					{
						question: 'How does Xoomplus build safe backlinks?',
						answer:
							'We focus on manual outreach, relevant publications, useful content and genuine website relationships. We avoid automated link schemes, spammy websites and private blog networks that can put your website at risk.',
					},
					{
						question: 'How long does link building take to show results?',
						answer:
							"Link building is a long-term SEO activity. Results depend on your website's current authority, industry competition and the quality of links you earn.",
					},
					{
						question: 'How many backlinks does my website need?',
						answer:
							'There is no fixed number of backlinks every website needs. It depends on your industry, competitors, target keywords and current backlink profile.',
					},
				],
			},
			cta: {
				pill: 'Build Your Online Authority',
				heading: 'Want to Build a Stronger Backlink Profile for Your Business?',
				text: 'Speak with our SEO specialists to find the right link-building opportunities for your business.',
				buttonLabel: 'Request Your Backlink Profile Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...ecommerceSeoChild,
			metaTitle: 'Ecommerce SEO Agency Manchester | Turn Traffic Into Sales',
			metaDescription:
				'Struggling to grow online sales? XoomPlus, an Ecommerce SEO Agency in Manchester, optimises product pages, rankings and overall organic traffic.',
			hero: {
				...ecommerceSeoChild.hero,
				pill: 'Ecommerce SEO Services across the UK',
				titleLines: [
					'Ecommerce SEO Agency Manchester |',
					'Grow Online Sales',
				],
				paragraphs: [
					'Poor search visibility can make it difficult for online stores to reach potential customers and compete with other retailers. If your product and category pages are not properly optimised, your products may struggle to appear in relevant search results.',
					'As an ecommerce agency in Manchester, we help online stores to overcome these challenges. We optimise product pages, category pages, website structure and technical SEO across Shopify, WooCommerce, Magento and other ecommerce platforms.',
				],
				buttonLabel: 'Request an Ecommerce SEO Audit',
				image: {
					...ecommerceSeoChild.hero.image,
					src: childServiceHeroImage('e-commerce-seo'),
				},
			},
			features: {
				pill: 'Understanding Ecommerce SEO',
				titleLines: ['What Is Ecommerce', 'Website SEO?'],
				text: 'Ecommerce website SEO is the process of improving an online store so its products and category pages appear in relevant Google searches.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Product & Category Optimisation',
						text: 'We optimise product descriptions, category pages, titles and headings so shoppers can find the products they are looking for.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Website Structure & Crawlability',
						text: "Our ecommerce SEO experts improve your store's structure, internal links and URLs so search engines can find, crawl and index your important product pages.",
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Product Schema & Search Visibility',
						text: 'We add structured product information, including prices, availability and reviews, to help search engines understand your products and display eligible rich results.',
					},
				],
			},
			processPill: 'Practical Business Benefits',
			processHeading: 'What an Ecommerce SEO Agency Can Do for Your Business',
			processText: [
				'When potential customers across Manchester search for products, they are more likely to visit stores that appear in search results. If your product pages are not indexed properly, your category pages are poorly structured or your website lacks important product details, shoppers may choose your competitors instead.',
				'Without a strong ecommerce SEO strategy, your online store may also become too dependent on paid advertising to generate sales.',
				'Optimising your product pages, category structure, website speed and product information helps search engines understand your store and connect your products with the right audience. This improves your organic search visibility, attracts visitors who are ready to buy and helps your store generate more sales over time.',
			],
			processImage: {
				src: '/images/e-commerce-seo-practical-commercial-value.webp',
				alt: 'E-Commerce SEO practical commercial value',
			},
			processPrimaryLabel: 'Request an Ecommerce SEO Audit',
			processSecondaryLabel: 'Explore Our Ecommerce SEO Process ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Specialist Ecommerce SEO Services',
				heading: 'Our Professional ECommerce SEO Services',
				text: 'As an ecommerce SEO agency in Manchester, we improve the key areas of your online store to help search engines find your products.',
				cards: [
					{
						title: 'Product & Category Page Optimisation',
						text: 'We optimise product descriptions, category content, page titles and headings with relevant keywords. This helps your products and collections appear for searches made by potential customers.',
						imageSrc: '/images/e-commerce-seo-collection-category-architecture-structuring.webp',
					},
					{
						title: 'Website Structure & Duplicate URL Management',
						text: 'We organise your product categories, menus and internal links to make your store easier to navigate. We also manage duplicate URLs created by product filters and variations to avoid unnecessary indexing issues.',
						imageSrc:
							'/images/e-commerce-seo-faceted-navigation-parameter-indexation-control.webp',
					},
					{
						title: 'Product Schema & Product Merchant Optimisation',
						text: 'We add structured product information, including prices, availability, product details and reviews. We also help improve product feeds for Google Merchant Centre to support your shopping campaigns.',
						imageSrc: '/images/e-commerce-seo-product-schema-merchant-feed-optimization.webp',
					},
					{
						title: 'Out-of-Stock Product Management',
						text: 'We manage product pages when items become unavailable or are discontinued. We use suitable redirects, alternative product suggestions and updated category pages to protect valuable traffic.',
						imageSrc: '/images/e-commerce-seo-out-of-stock-seasonal-inventory-management.webp',
					},
					{
						title: 'Website Speed & Mobile Shopping Experience',
						text: 'We improve website loading speed and mobile performance. We also review the checkout journey to make it easier for customers to browse products and complete their purchases.',
						imageSrc:
							'/images/e-commerce-seo-ecommerce-conversion-mobile-checkout-optimisation.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry-Specific SEO',
				title: 'How Ecommerce SEO Helps Different Retail Businesses Grow',
				titleLines: [
					'How Ecommerce SEO Helps Different Retail',
					'Businesses Grow',
				],
				text: 'We create strategies based on your product range, industry and business goals.',
				columns: [
					{
						items: [
							{
								title: 'Fashion, Clothing & Accessories',
								text: 'Fashion stores often have many products, sizes, colours and seasonal collections. We optimise product variations, category pages and product descriptions to help shoppers find the right items and improve organic visibility.',
							},
							{
								title: 'B2B Wholesale & Industrial Products',
								text: 'Wholesale businesses often sell products with technical names, specifications and product codes. We optimise product pages, category descriptions and technical information to help buyers find the products they need.',
							},
							{
								title: 'Furniture, Home Interiors & Lifestyle Products',
								text: 'Customers often compare designs, materials, prices and product features before buying furniture and home products. We improve product descriptions, images, category pages and website navigation to make product research easier.',
							},
						],
					},
					{
						items: [
							{
								title: 'Health, Beauty & Personal Care Products',
								text: 'Beauty and personal care shoppers often search for products based on ingredients, benefits and skin concerns. We create clear product descriptions, useful category content and relevant FAQs to help customers understand your products.',
							},
							{
								title: 'Electronics, Tools & Multi-Brand Stores',
								text: 'Electronics and tool stores often manage large product catalogues with similar products and technical specifications. We improve product information, category structures and comparison content to help customers find suitable products.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'Our Process',
				heading: 'Our Effective E-commerce Website SEO Process',
				text: "Our e-commerce SEO process focuses on improving your store's search visibility.",
				cards: [
					{
						title: 'Understanding Your Products & Business Goals',
						text: 'We review your online store, product range, target audience and competitors. This helps us identify the products and categories that offer the best opportunities for organic growth.',
						imageSrc: '/images/e-commerce-seo-scoped-around-revenue-high-margin-collections.webp',
					},
					{
						title: 'Detailed E-commerce SEO Audit & Research',
						text: 'We analyse your website structure, product pages, category pages, keywords and technical performance.',
						imageSrc:
							'/images/e-commerce-seo-direct-access-to-senior-ecommerce-seo-engineers.webp',
					},
					{
						title: 'Clear Strategy Before Implementation',
						text: 'We prepare a practical SEO plan based on our findings. We explain what needs improvement, which pages need attention and how our recommendations can support your business goals.',
						imageSrc:
							'/images/e-commerce-seo-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Optimisation & Implementation',
						text: 'Our team works on product pages, category content, website structure, technical issues and product schema. We can also work with your existing developers to make the required changes.',
						imageSrc:
							'/images/e-commerce-seo-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Performance Monitoring & Reporting',
						text: 'We monitor keyword rankings, organic traffic, product visibility and sales performance. Regular reports help us understand what is working and where further improvements are needed.',
						imageSrc: '/images/e-commerce-seo-continuous-monitoring-revenue-attribution.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for Ecommerce SEO Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other Ecommerce SEO Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium ecommerce SEO services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Solutions.',
				text: 'Ecommerce SEO works best when combined with other digital marketing services.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'FAQs About Ecommerce Website SEO',
				text: 'Find answers to common questions about e-commerce website optimisation',
				items: [
					{
						question:
							'What is e-commerce SEO, and why does my online store need it?',
						answer:
							'E-commerce SEO is the process of improving an online store so its products and category pages appear in relevant search results. It includes keyword research, product optimisation, technical SEO and website structure improvements.',
					},
					{
						question: 'Why are category pages important for e-commerce SEO?',
						answer:
							'Category pages group similar products together and help customers find what they need. They can also target broader product-related keywords.',
					},
					{
						question: 'How do you manage out-of-stock and discontinued products?',
						answer:
							'For temporarily unavailable products, we usually recommend keeping the page live and showing when the product may return.',
					},
					{
						question:
							'Can you optimise Shopify, WooCommerce and Magento websites?',
						answer:
							'Yes. Our Ecommerce SEO specialists work with popular platforms, including Shopify, WooCommerce and Magento.',
					},
					{
						question: 'How does product schema help an ecommerce website?',
						answer:
							'Product schema gives search engines clear information about your products, such as their names, prices, availability and reviews.',
					},
					{
						question: 'How long does e-commerce SEO take to show results?',
						answer:
							'E-commerce SEO takes time because search engines need to crawl and understand your website changes. Some improvements may appear within a few weeks, while stronger traffic and ranking growth can take several months.',
					},
				],
			},
			cta: {
				pill: 'Grow Your Online Store',
				heading: 'Want more people to find your products through Google?',
				text: "Speak with our Ecommerce SEO specialists to discover how we can improve your store's visibility, attract potential buyers and support long-term growth.",
				buttonLabel: 'Request Your E-commerce Store Audit →',
				buttonHref: '/contact',
			},
		},
		{
			...seoAuditChild,
			metaTitle: 'SEO Audit Services Manchester | Find & Fix SEO Issues',
			metaDescription:
				'Not getting the rankings you expect? XoomPlus offers SEO Audit Services in Manchester to identify problems and build a clear improvement plan.',
			hero: {
				...seoAuditChild.hero,
				pill: 'Complete Website Analysis',
				titleLines: [
					'SEO Audit Services Manchester |',
					'Fix Issues, Improve Rankings',
				],
				paragraphs: [
					'Poor website performance, technical errors, weak content and low-quality backlinks can prevent your website from achieving better search rankings. Without understanding what affects your website, it can be difficult to improve search visibility and attract the right audience.',
					'At Xoomplus, we provide professional SEO audit services in Manchester to identify these issues and find opportunities for improvement.',
					"Our SEO specialists review your website's technical setup, content, keywords, backlinks and competitors to understand what needs attention. We then provide a clear action plan to fix problems, strengthen your SEO strategy, improve search rankings and attract more potential customers.",
				],
				buttonLabel: 'Request an SEO Audit',
				image: {
					...seoAuditChild.hero.image,
					src: childServiceHeroImage('seo-audit'),
				},
			},
			features: {
				pill: 'Understanding SEO Audit',
				titleLines: ['What Is an', 'SEO Audit?'],
				text: 'An SEO audit is a detailed review of your website to find issues that affect its search rankings, traffic and performance. It helps identify technical errors, content gaps and backlink problems that may stop your website from reaching its full potential.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Technical SEO & Website Health',
						text: "We check your website's speed, mobile performance, broken links, redirects and crawlability. This helps search engines access your pages and understand your website without technical issues.",
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Content Quality & Indexation',
						text: 'We review your page titles, headings, keywords and content to find duplicate pages, missing information and keyword conflicts. We also check whether Google can find and index your important pages.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Backlink Profile & Competitor Analysis',
						text: "We review your website's backlinks and compare your SEO performance with competitors. This helps us find link quality issues, missed opportunities and areas where your website needs to improve its authority.",
					},
				],
			},
			processPill: 'Practical Commercial Value',
			processHeading: 'What an SEO Audit Can Do for Your Business',
			processText: [
				'When an established business in Manchester or across the UK experiences a sudden drop in website traffic, making changes without understanding the cause can waste time and resources. Complex websites may have hidden technical issues, such as broken links, indexing issues or problems that prevent search engines from accessing important content. These issues can affect your rankings, even when your website has useful and relevant content.',
				'Without a detailed SEO audit, it can be difficult for your team to identify which problems need attention and how they affect your business.',
				'A comprehensive SEO audit helps uncover these issues and provides a clear plan for fixing them. It also helps protect your search visibility during website redesigns or platform migrations, ensures your development team focuses on the most important fixes and supports your long-term business growth.',
			],
			processImage: {
				src: '/images/seo-audit-practical-commercial-value.webp',
				alt: 'SEO Audit practical commercial value',
			},
			processPrimaryLabel: 'Claim SEO Audit Now',
			processSecondaryLabel: 'Explore Our Audit Framework ↓',
			processSecondaryHref: '#service-stack',
			services: {
				pill: 'Complete Website SEO Audit Services',
				heading: 'Our Professional SEO Analysis Services',
				text: 'As an SEO audit agency in Manchester, we review every part of your website to find issues, improve performance and identify opportunities for growth.',
				cards: [
					{
						title: 'Technical SEO & Website Health Audit',
						text: 'We check your website for broken links, crawl errors, redirect issues, slow pages and other technical problems. We also review your robots.txt file and XML sitemap to make sure search engines can access your important pages.',
						imageSrc: '/images/seo-audit-log-file-ingestion-crawl-behaviour-analysis.webp',
					},
					{
						title: 'Website Speed & Core Web Vitals Analysis',
						text: 'We review your website loading speed, mobile performance and Core Web Vitals. We identify issues with images, code and page layouts that may slow down your website or affect the user experience.',
						imageSrc: '/images/seo-audit-rendering-javaScript-core-web-vitals-inspection.webp',
					},
					{
						title: 'Indexing & Website Structure Audit',
						text: 'We check which pages Google can find and index. We also review duplicate URLs, canonical tags, internal links and website structure to help search engines understand your most important pages.',
						imageSrc: '/images/seo-audit-indexation-governance-canonical-hierarchy-audit.webp',
					},
					{
						title: 'Content & Keyword Analysis',
						text: 'We review your page titles, headings, content and keyword targeting. We identify missing topics, outdated information, thin content and pages competing for the same keywords.',
						imageSrc: '/images/seo-audit-content-cannibalisation-commercial-intent-mapping.webp',
					},
					{
						title: 'Backlink Profile & Competitor Analysis',
						text: "We analyse your backlinks to understand the quality and relevance of websites linking to yours. We also compare your SEO performance with competitors to find opportunities to improve your website's authority.",
						imageSrc: '/images/seo-audit-backlink-profile-quality-toxic-link-review.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry-Specific Analysis',
				title:
					'How Our SEO Analysis Services Help Businesses Across Different Industries',
				titleLines: [
					'How Our SEO Analysis Services Help Businesses Across',
					'Different Industries',
				],
				text: 'Every industry has different SEO challenges. We adjust our audit approach to your website, business model and target audience to identify the improvements that matter most.',
				columns: [
					{
						items: [
							{
								title: 'Ecommerce Stores & Online Retailers',
								text: 'Online stores often have thousands of product pages, category pages and filters. We check duplicate URLs, product indexing, page speed and product schema to help search engines find your most important products.',
							},
							{
								title: 'Website Migrations & Redesign Projects',
								text: 'Changing your website design, domain or CMS can affect your existing rankings if important pages and links are not managed properly. We review redirects, URL structures, tracking and indexing to help protect your organic traffic during a migration.',
							},
							{
								title: 'Legal, Financial & Professional Services',
								text: 'Professional service websites need clear information and strong trust signals. We review service pages, website structure, content quality and professional information to identify ways to improve search visibility and build user confidence.',
							},
						],
					},
					{
						items: [
							{
								title: 'Private Healthcare & Medical Websites',
								text: 'Healthcare websites need accurate information and a clear user experience. We review clinical content, service pages, mobile performance and relevant structured data to identify areas that need improvement.',
							},
							{
								title: 'B2B Technology & SaaS Companies',
								text: 'Technology websites often have complex service pages and JavaScript-based features. We check how search engines access and understand these pages, review content structure and identify opportunities to improve organic visibility.',
							},
						],
					},
				],
			},
			serviceStack: {
				pill: 'SEO Audit Process',
				heading: 'Our Professional SEO Audit Process',
				text: 'Our SEO audit process is designed to find the problems affecting your website and turn our findings into practical solutions.',
				cards: [
					{
						title: 'Understanding Your Website & Business Goals',
						text: 'We start by learning about your business, services, target audience and competitors. This helps us understand what you want to achieve and which website areas need the most attention.',
						imageSrc: '/images/seo-audit-scoped-around-codebase-level-investigation.webp',
					},
					{
						title: 'Complete Website Analysis',
						text: 'Our SEO experts review your technical SEO, website content, keywords, backlinks and overall performance. We use website crawls and search data to identify errors.',
						imageSrc: '/images/seo-audit-direct-access-to-senior-technical-directors.webp',
					},
					{
						title: 'Clear Findings & Action Plan',
						text: 'We organise our findings into a clear report. Each issue is explained in simple language, with solutions based on its importance and potential impact on your website.',
						imageSrc: '/images/seo-audit-Plain-english-strategy-before-implementation.webp',
					},
					{
						title: 'Working with Your Development Team',
						text: 'We provide practical recommendations, technical instructions and content suggestions that your existing developers can use. If needed, our team can also help implement the improvements.',
						imageSrc: '/images/seo-audit-seamless-collaboration-with-your-existing-web-team.webp',
					},
					{
						title: 'Testing & Performance Monitoring',
						text: 'After the recommended changes are made, we review the affected pages and check whether the issues have been resolved. We also monitor rankings, organic traffic and website performance to measure progress.',
						imageSrc: '/images/seo-audit-continuous-post-audit-verification-testing.webp',
					},
				],
			},
			why: {
				id: 'why-xoomplus',
				pill: 'Why Xoomplus',
				title: 'Why Choose Xoomplus for SEO Audit Services',
				text: '6 Reasons Why Brands Choose Xoomplus Over Other SEO Audit Agencies',
				cards: [
					{
						icon: '/icons/strategy-first.svg',
						title: 'Audit & Research',
						text: 'We conduct thorough research to understand your audience, competitors, trends and gaps before we do anything.',
					},
					{
						icon: '/icons/experienced-team.svg',
						title: 'The A Team',
						text: 'Each member of Xoomplus has a strong portfolio and years of experience to deliver premium SEO audit services and the results you need.',
					},
					{
						icon: '/icons/clear-reporting.svg',
						title: 'Transparent Reporting',
						text: 'Transparency is our non-negotiable practice. We ensure clear and transparent communication from the start.',
					},
					{
						icon: '/icons/tailored-strategies.svg',
						title: 'Customised Plans',
						text: 'Every business is a unique idea and has distinct digital needs. We craft customised plans that reflect your unique business needs.',
					},
					{
						icon: '/icons/result-focused.svg',
						title: 'Focused Efforts',
						text: 'Everything we do has a clear purpose and goal. That is why our efforts don’t waver, and our results aren’t delayed.',
					},
					{
						icon: '/icons/long-term-growth.svg',
						title: 'Lasting Growth',
						text: 'We deliver immediate outcomes that also form the foundation for long-term digital growth.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Full-Funnel Growth',
				title: 'Different Needs. Connected Digital Solution.',
				text: 'We use audit findings to inform our core digital services.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							"Our SEO services improve your website's visibility in organic search results. We focus on technical SEO, quality content, keyword targeting and website authority to support long-term growth.",
						items: [],
						buttonLabel: 'Explore Full SEO Services →',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'We build fast, user-friendly and mobile-friendly websites that make it easier for visitors to explore your services.',
						items: [],
						buttonLabel: 'Explore Web Development →',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social Media & Paid Advertising',
						description:
							'We use targeted Google Ads and social media campaigns to help you reach potential customers. These services can support your local SEO strategy by increasing your visibility across different online channels.',
						items: [],
						buttonLabel: 'Explore Paid Media →',
						href: '/services/ppc-google-ads',
					},
				],
			},
			faq: {
				pill: 'Clear Information',
				heading: 'FAQs About SEO Audit',
				text: 'Find answers to common questions about SEO audits.',
				items: [
					{
						question: 'What is an SEO audit?',
						answer:
							'An SEO audit is a detailed review of your website to find issues that may affect its search engine performance. It checks technical SEO, content, keywords, backlinks and website structure.',
					},
					{
						question:
							'How is a professional SEO audit different from free online tools?',
						answer:
							"Free SEO tools usually check basic website issues and provide automated reports. A professional SEO audit goes further by reviewing your website's technical setup, content quality, keyword targeting, backlinks and competitors.",
					},
					{
						question: 'When should I get an SEO audit for my website?',
						answer:
							'You should consider an SEO audit if your website is losing traffic, struggling to rank, receiving fewer enquiries or experiencing technical problems.',
					},
					{
						question:
							'Can my development team fix the issues found in an SEO audit?',
						answer:
							'Yes. We provide clear recommendations and technical instructions that your in-house developers can follow. If you need additional support, our team can also help implement the recommended changes.',
					},
					{
						question: 'How long does a complete SEO audit take?',
						answer:
							"The time depends on your website's size, structure and complexity. A standard website may take a few days, while larger ecommerce stores and complex websites may take one to two weeks. We allow enough time to review important issues and prepare a useful action plan.",
					},
					{
						question: 'What access do you need to conduct an SEO audit?',
						answer:
							'We may need your website URL and access to Google Search Console and Google Analytics 4 (GA4). For more detailed technical checks, we may also request server logs or access to a staging website. We discuss the required access before starting the audit.',
					},
				],
			},
			cta: {
				pill: 'Diagnostic Clarity',
				heading: 'Not getting the search traffic your business deserves?',
				text: 'Speak with our SEO audit experts to identify website problems, discover growth opportunities and get a clear plan for improving your search performance.',
				buttonLabel: 'Request Your SEO Audit →',
				buttonHref: '/contact',
			},
		},
	],
	hero: {
		pill: 'Search Engine Optimisation (SEO)',
		titleLines: ['SEO Agency Manchester |', 'Built to Turn Visibility into Revenue'],
		textParagraphs: [
			'As an SEO agency in Manchester, we focus on more than just improving your Google rankings. We help your business attract the right visitors, turn website traffic into qualified leads and generate more sales.',
			'At Xoom Plus, we create SEO strategies that improve your search visibility and prepare your website for AI-powered platforms like Google Gemini and ChatGPT Search.',
		],
		primaryButton: { label: 'Claim Your Free SEO Audit', href: '/contact#enquiry-form' },
		secondaryLink: { label: 'Compare SEO Service', href: '/pricing#pricing-plans' },
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
		pill: 'SEO Services',
		titleLines: ['What Is Search Engine', 'Optimisation (SEO)?'],
		text: 'Search Engine Optimisation (SEO) is the process of improving your website so it appears higher in Google search results. At Xoom Plus, we focus on three key areas:',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Target the Right Keywords',
				text: 'We find the search terms your potential customers use and create content that matches what they are looking for.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Improve Your Website Performance',
				text: 'We fix technical issues, improve page speed and make your website easier for search engines to crawl and understand.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Turn Visitors into Customers',
				text: 'We improve your website content, page structure and calls to action to help turn organic visitors into enquiries and sales.',
			},
		],
	},
	experience: {
		pill: 'SEO Strategy',
		titleLines: ['How We Build an SEO Strategy', 'That Drives Business Growth'],
		text: 'We focus on the key areas that help your business improve search visibility, build trust and generate more enquiries across the UK.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'Keyword Research & Search Intent',
				text: 'We find what your potential customers are searching for and target keywords that match their needs, interests and buying decisions.',
			},
			{
				icon: 'landing-page-design',
				title: 'Technical SEO & Website Health',
				text: 'We check your website for issues that affect search performance, including slow pages, broken links, indexing problems and mobile usability.',
			},
			{
				icon: 'website-redesign',
				title: 'SEO Reporting & Performance Tracking',
				text: 'We monitor rankings, organic traffic, enquiries and conversions to understand what is working and where your SEO strategy needs improvement.',
			},
		],
	},
	bento: {
		pill: 'Our SEO Services',
		title: 'Our Professional SEO Services in Manchester',
		text: 'As a professional SEO agency Manchester, we provide a range of SEO services to help your business improve Google rankings, attract the right audience and generate more enquiries.',
		cards: [
			{
				icon: 'wordpress-development',
				title: 'AI SEO (GEO & AEO)',
				text: 'We create content and improve your online presence so AI search tools can find, understand and mention your brand.',
				linkLabel: 'Explore AI SEO →',
				href: '/services/seo/ai-seo',
			},
			{
				icon: 'sopify-development',
				title: 'Local SEO Manchester',
				text: 'Improve your Google Maps visibility, attract nearby customers and help your business rank across Manchester.',
				linkLabel: 'Explore Local SEO →',
				href: '/services/seo/local-seo',
			},
			{
				icon: 'ecommerce-development',
				title: 'Technical SEO',
				text: 'We improve site structure, loading speed, mobile performance and overall website health.',
				linkLabel: 'Explore Technical SEO →',
				href: '/services/seo/technical-seo',
			},
			{
				icon: 'custom-website-development',
				title: 'On-Page SEO',
				text: 'We optimise page titles, meta descriptions, headings, content and schema markup to target the right keywords and attract relevant traffic.',
				linkLabel: 'Explore On-Page SEO →',
				href: '/services/seo/on-page-seo',
			},
			{
				icon: 'wordpress-development',
				title: 'High-Authority Link Building',
				text: 'Our link-building strategies help improve search visibility, credibility and organic rankings.',
				linkLabel: 'Explore Link Building →',
				href: '/services/seo/link-building',
			},
			{
				icon: 'ecommerce-development',
				title: 'Ecommerce SEO',
				text: 'We optimise product pages, category pages, site structure and product schema for Shopify, WooCommerce and other ecommerce platforms.',
				linkLabel: 'Explore Ecommerce SEO →',
				href: '/services/seo/e-commerce-seo',
			},
		],
	},
	showcase: {
		pill: 'User Experience on Every Screen',
		titleLines: ['Desktop or Mobile.', 'A Smooth Experience on Every Screen.'],
		text: 'Google uses mobile-first indexing, so your mobile website plays an important role in search rankings. We improve website speed, navigation and page layouts to make it easier for visitors to find information and contact your business.',
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
			'Quick Answers: Clear, helpful content that answers customer questions and makes important information easy to find.',
			'Easy Navigation: Simple website layouts that help visitors browse your pages smoothly on any device.',
			'Easy Mobile Conversions: Convenient tap-to-call buttons, booking forms and quote requests that make it easier for mobile users to get in touch.',
		],
		// PLACEHOLDER: replace with real content — reuse Web Design icon until SEO icons land
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'The Xoomplus Standard',
		titleLines: ['Why Choose XoomPlus as', 'Your SEO Partner'],
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
