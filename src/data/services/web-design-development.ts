import type { MainService } from './types';
import { makeChildService } from './children';
import { serviceHeroImage } from './images';
const SLUG = 'web-design-development';
const NAME = 'Web Design & Development';

// Menu URL source of truth: uiux-design (not ui-ux-design)
const uiuxChild = makeChildService(NAME, 'uiux-design', 'UI/UX Design', {
	placeholder: false,
	shortName: 'UI/UX',
	secondaryLabel: 'Explore Our Design Process ↓',
});

const landingChild = makeChildService(NAME, 'landing-page-design', 'Landing Page Design', {
	placeholder: false,
	shortName: 'Landing Page',
	secondaryLabel: 'Explore Our Design Process ↓',
});

const redesignChild = makeChildService(NAME, 'website-redesign', 'Website Redesign', {
	placeholder: false,
	shortName: 'Website Redesign',
	secondaryLabel: 'Explore Our Approach ↓',
});

const wordpressChild = makeChildService(
	NAME,
	'wordpress-development',
	'WordPress Development',
	{
		placeholder: false,
		shortName: 'WordPress',
		secondaryLabel: 'Explore Our Approach ↓',
	},
);

const shopifyChild = makeChildService(NAME, 'shopify-development', 'Shopify Development', {
	placeholder: false,
	shortName: 'Shopify',
	secondaryLabel: 'Explore Our Approach ↓',
});

const ecommerceChild = makeChildService(NAME, 'ecommerce-development', 'Ecommerce Development', {
	placeholder: false,
	shortName: 'Ecommerce',
	secondaryLabel: 'Explore Our Approach ↓',
});

const customWebsiteChild = makeChildService(
	NAME,
	'custom-website-development',
	'Custom Website Development',
	{
		placeholder: false,
		shortName: 'Custom Website',
		secondaryLabel: 'Explore Our Approach ↓',
	},
);

export const webDesignDevelopment: MainService = {
	slug: SLUG,
	name: NAME,
	menuDescription: 'Purposeful experiences. Stronger websites.',
	metaTitle: 'Web Design & Development | Xoomplus',
	metaDescription:
		'Purposeful web design and development — responsive sites, clear user journeys, and experiences aligned with your business goals.',
	children: [
		{
			...uiuxChild,
			metaTitle: 'UI/UX Design Agency in Manchester | Xoomplus',
			metaDescription:
				'UI/UX design that makes websites simple to use, quick to navigate and easy to act on — turning clicks into enquiries and sales across Manchester and the UK.',
			// Hero image: /images/ui-ux-design.webp (falls back to .jpg until webp is added).
			hero: {
				...uiuxChild.hero,
				pill: 'UI/UX Design Agency in Manchester',
				titleLines: [
					'UI/UX Design That Makes',
					'Every Interaction Count',
				],
				paragraphs: [
					'A digital product should do more than look good. It should help people find what they need and complete tasks with ease.',
					'XoomPlus designs websites, mobile apps, web applications and CRM systems for businesses in Manchester and across the UK. We combine usability and visual design to create intuitive experiences that reflect your users’ needs and business goals.',
					'Whether you’re improving an existing interface or planning a new product, we turn your requirements into clear designs before development begins.',
				],
				buttonLabel: 'Book a UI/UX Consultation',
			},
			features: {
				pill: 'User-Centred Design',
				titleLines: [
					'UI/UX Design Built Around',
					'Your Users',
				],
				text: 'Good design helps people find what they need and use your product with confidence. We bring usability, visual appeal and business goals together to create a smoother experience.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'User Experience (UX) Design',
						text: 'Help users find their way around with ease. Clear navigation and user journeys make it easier to find information and complete tasks without confusion.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'User Interface (UI) Design',
						text: 'Make your product visually appealing and easy to use. Thoughtful layouts, colours, buttons and forms reflect your brand and guide users through each screen.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Prototypes Before Development',
						text: 'Bring your ideas to life with wireframes and interactive prototypes. Review how your product will look and work, gather feedback and identify potential issues before development begins.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'Create a More Useful Digital Experience',
			processText: [
				'Thoughtful design makes your website and digital tools easier to use. Clear navigation helps users find what they need, consistent visuals build trust, and intuitive interfaces simplify everyday tasks. Responsive layouts improve usability across devices, while prototypes help identify issues before development.',
				'Design cannot guarantee better conversions or productivity, but it creates a stronger foundation for improvement.',
			],
			// Prefer `/images/uiux-design-working-together.webp` (auto lookup).
			// Card grid (below Working together) + scroll stack (below Clarity).
			services: {
				pill: 'Services',
				heading: 'Our UI/UX Design Services',
				text: 'Every digital product has different goals. Our UI/UX design services shape websites, apps and business systems around your users and needs.',
				cards: [
					{
						title: 'Website UI/UX Design',
						text: 'We design intuitive page structures, user journeys and layouts that help visitors find information and take the next step.',
					},
					{
						title: 'Mobile App UI/UX Design',
						text: 'We plan screen layouts and user journeys around your app’s features, making key tasks easier to complete.',
					},
					{
						title: 'Web Application and SaaS Design',
						text: 'We organise dashboards, accounts and workflows into clear interfaces tailored to how users interact with your platform.',
					},
					{
						title: 'CRM and Custom Business Software Design',
						text: 'We turn your business requirements into practical interfaces for managing customers, tracking activity and streamlining workflows. This may include dashboards, pipelines, forms, user permissions and navigation.',
					},
					{
						title: 'UI/UX Redesign',
						text: 'We improve existing websites, applications and CRMs by addressing navigation issues, inconsistent layouts and difficult workflows.',
					},
					{
						title: 'Wireframing and Prototyping',
						text: 'We map screen layouts and user interactions before development, helping stakeholders review the proposed experience and clarify requirements.',
						imageSrc: '/images/wireframing-prototyping-and-usability-reviews.png',
					},
					{
						title: 'Design Systems and Reusable Components',
						text: 'We establish consistent design patterns and reusable components to support a cohesive user experience across screens and products.',
					},
				],
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'From Requirements to Development-Ready Designs',
				text: 'Our design process aligns business objectives with practical interface decisions, tailored to your product, users and project requirements across Manchester and the UK.',
				cards: [
					{
						title: 'Discovery and Workflow Mapping',
						text: 'We establish your goals, understand your users and identify the features your product needs. For applications and CRMs, this includes mapping user roles, business workflows and key tasks.',
						imageSrc: '/images/strategy-before-decoration.webp',
					},
					{
						title: 'Audit and Opportunity Analysis',
						text: 'We review your existing product or project requirements to identify usability issues, navigation gaps and opportunities for improvement. For new products, we assess proposed features and user journeys to establish a clear design direction.',
						imageSrc: '/images/your-brand-reflected-in-the-interface.webp',
					},
					{
						title: 'Strategy and Execution',
						text: 'We translate the agreed requirements into user flows, wireframes and interface designs. Depending on the project, this may include responsive layouts, reusable components and interactive prototypes.',
						imageSrc: '/images/a-shared-vision-before-development.webp',
					},
					{
						title: 'Reporting and Refinement',
						text: 'We review the designs against your requirements, gather feedback and make agreed refinements. The process concludes with the final designs, prototypes and supporting files specified in the project scope.',
						imageSrc: '/images/clear-communication-and-collaboration.webp',
					},
					{
						title: 'Design Handover',
						text: 'We organise the agreed deliverables for your development team, including relevant design files, component references and handover notes. This gives developers a clearer reference for implementing the intended interface and user journeys.',
						imageSrc: '/images/work-with-your-own-development-team.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Design Around Your Industry and Users',
				titleLines: [
					'Design Around Your Industry',
					'and Users',
				],
				text: 'We adapt each project to the needs of your product, whether it’s a customer-facing website or an internal business platform.',
				columns: [
					{
						items: [
							{
								title: 'Professional and Medical Services',
								text: 'Organise service information, page layouts and forms to help visitors understand their options and find relevant next steps.',
							},
							{
								title: 'Legal and Financial Services',
								text: 'Structure detailed information through clear layouts, consistent terminology and logical user journeys.',
							},
							{
								title: 'E-commerce and Retail',
								text: 'Improve how users discover products, compare options and move through the purchasing journey.',
							},
						],
					},
					{
						items: [
							{
								title: 'Trades and Service Businesses',
								text: 'Make service information, contact details and quote-request forms easier to find, particularly on mobile devices.',
							},
							{
								title: 'SaaS and Business Operations',
								text: 'Plan dashboards, reports, user roles and workflows around the requirements of your software and its users.',
							},
						],
					},
				],
				note: 'These examples reflect common design needs, but our work isn’t limited to specific industries. We assess each project according to its objectives and requirements.',
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'More Than Design. Everything Your Digital Project Needs.',
				text: 'UI/UX design can contribute to a broader digital strategy. Explore our core services to support website development, improve search visibility and align landing pages with wider marketing objectives.',
				cards: [
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Turn website requirements into responsive digital experiences that reflect your brand and support your users.',
						items: [
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'Ecommerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve your website’s visibility through relevant content, technical optimisation and a focused SEO strategy.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect your digital experience with marketing activities designed to reach relevant audiences and support campaign goals.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Learn more about our design services, project costs, deliverables and development handover.',
				items: [
					{
						question: 'What Is the Difference Between UI and UX Design?',
						answer:
							'UX design focuses on usability, structure and user journeys. UI design focuses on visual and interactive elements, such as layouts, colours and buttons.',
					},
					{
						question: 'How Much Does UI/UX Design Cost in the UK?',
						answer:
							'Costs depend on project scope, complexity, research needs and deliverables. We can discuss pricing once we understand your requirements.',
					},
					{
						question: 'How Long Does a UI/UX Design Project Take?',
						answer:
							'Timelines depend on the project’s complexity, number of screens, feedback cycles and agreed deliverables.',
					},
					{
						question: 'What Can You Design?',
						answer:
							'We design websites, mobile apps, web applications, SaaS products and CRM systems, depending on your project requirements.',
					},
					{
						question: 'What Will I Receive at the End of the Project?',
						answer:
							'Deliverables may include user flows, wireframes, screen designs, interactive prototypes, reusable components and handover notes.',
					},
					{
						question: 'Can I Use Your Designs With Another Development Company?',
						answer:
							'Yes. You can share the agreed design deliverables with your chosen development partner, subject to the project’s scope and handover arrangements.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'Let’s Bring Your Digital Product to Life',
				text: 'From websites to apps and CRMs, let’s shape an experience around your users and goals.',
				buttonLabel: 'Book a UI/UX Consultation →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Discuss Your Project →',
				secondaryButtonHref: '/contact',
				secondaryLabel: 'info@xoomplus.co.uk',
				secondaryHref: 'mailto:info@xoomplus.co.uk',
			},
		},
		{
			...landingChild,
			hero: {
				...landingChild.hero,
				pill: 'Landing Page Design Agency in Manchester',
				titleLines: [
					'Landing Pages Built Around',
					'Your Goals',
				],
				paragraphs: [
					'A landing page should do more than attract attention. It should help visitors understand your offer and take the next step.',
					'XoomPlus designs landing pages for businesses in Manchester and across the UK. We combine clear messaging, purposeful layouts and visual design to support service promotions, advertising campaigns and lead generation.',
					'Each page is tailored to your audience and objectives, giving your campaign a clear message and a straightforward route to conversion.',
				],
				buttonLabel: 'Discuss Your Landing Page',
			},
			features: {
				pill: 'Landing Page Design',
				titleLines: [
					'Not Just How It Looks.',
					'How It Works for You.',
				],
				text: 'Effective landing page design aligns your audience, offer and campaign goals. We bring these elements together to create a focused experience that guides visitors towards the next step.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Messaging and Value Proposition',
						text: 'Clear messaging helps visitors understand your offer and why it matters to them. We combine relevant headlines with concise supporting copy to communicate your value from the moment visitors arrive.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Content Structure and Flow',
						text: 'Content structure shapes how visitors explore a landing page and process information. We arrange key messages, supporting details and answers to common questions in a logical order that keeps your offer clear and easy to follow.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Calls to Action and Conversion',
						text: 'Calls to action guide visitors towards the next step. We use purposeful layouts, relevant forms and clear prompts to support actions such as making an enquiry, requesting a quote or booking a service.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading:
				'What Effective Landing Page Design Can Do for Your Business',
			processText:
				'A well-designed landing page helps turn campaign traffic into qualified leads and sales opportunities. Clear messaging communicates your offer, while relevant content builds trust and addresses visitor concerns. Prominent calls to action make it easy to enquire, book a service or request a quote. Mobile-friendly design improves usability, while ongoing testing helps increase conversions and get more value from your marketing budget.',
			processImage: {
				src: '/images/landing-page-design-business-benefits.webp',
				alt: 'Landing page design business benefits',
			},
			services: {
				pill: 'Services',
				heading: 'Our Landing Page Design Services',
				text: 'We design landing pages around your campaign goals, target audience and intended action. From clear messaging to intuitive layouts, every element helps visitors understand your offer and take the next step.',
				cards: [
					{
						title: 'Campaign Landing Pages',
						text: 'We create dedicated landing pages for advertising, email and social media campaigns, aligning the messaging with your campaign objectives.',
					},
					{
						title: 'Service Landing Pages',
						text: 'Our service landing pages communicate your offering, highlight its value and guide potential customers towards making an enquiry.',
					},
					{
						title: 'Lead Generation Pages',
						text: 'We design focused pages with clear value propositions, relevant information and straightforward forms to encourage enquiries.',
					},
					{
						title: 'Product and Offer Pages',
						text: 'We present your products, promotions and special offers with clear messaging and relevant details to support informed decisions.',
					},
					{
						title: 'Landing Page Redesign',
						text: 'We refine existing landing pages by improving messaging, layouts, content hierarchy and calls to action.',
					},
					{
						title: 'Wireframes and Prototypes',
						text: 'Our wireframes and interactive prototypes establish the page structure and user journey, allowing you to review the design direction before development.',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Landing Page Design for Different Industries',
				titleLines: [
					'Landing Page Design for Different',
					'Industries',
				],
				text: 'We tailor each WordPress website to your services, audience and content needs. Our websites help businesses in Manchester and across the UK present their offerings clearly and guide visitors towards the next step.',
				columns: [
					{
						items: [
							{
								title: 'Professional and Business Services',
								text: 'Explain your services, establish credibility and make consultation or quote requests easy to find.',
							},
							{
								title: 'Legal and Financial Services',
								text: 'Present detailed information clearly and provide straightforward contact routes for prospective clients.',
							},
							{
								title: 'E-commerce and Retail',
								text: 'Highlight products, promotions and offers with a clear path towards purchase or enquiry.',
							},
						],
					},
					{
						items: [
							{
								title: 'Healthcare and Wellness',
								text: 'Present service information clearly, with accessible contact details and appointment options where appropriate.',
							},
							{
								title: 'Trades and Home Services',
								text: 'Showcase your services and make quote requests easy, particularly on mobile devices.',
							},
							{
								title: 'SaaS and Technology',
								text: 'Explain your product’s value and guide visitors towards demos, trials or other intended actions.',
							},
						],
					},
				],
				note: 'These examples illustrate common landing page requirements, not a limit on the industries we serve.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'The XoomPlus Approach to Landing Page Design',
				text: 'We combine strategy, messaging and visual design to create landing pages that align with your campaign goals and guide visitors towards the next step.',
				cards: [
					{
						title: 'Strategy Before Design',
						text: 'We start by understanding your audience, offer and campaign goals to establish a clear direction for the design.',
					},
					{
						title: 'Your Message, Made Clear',
						text: 'We structure content around your value proposition and key benefits, helping visitors understand your offer and its relevance to them.',
					},
					{
						title: 'A Consistent Brand Experience',
						text: 'We align the page design with your brand identity and campaign materials to maintain a consistent visual experience.',
					},
					{
						title: 'A User Journey with Purpose',
						text: 'We organise content, forms and calls to action to help visitors find relevant information and take the intended action.',
					},
					{
						title: 'A Clear Plan for Development',
						text: 'We provide a structured design reference covering layouts, content hierarchy and key interactions to support development.',
					},
					{
						title: 'Review, Feedback and Refinement',
						text: 'We review feedback against the agreed requirements and refine the design within the project’s scope.',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'From search visibility and website design to paid campaigns, our digital services support different business goals and work together where needed. Explore our full range of services to find the right fit.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve search visibility through relevant content, technical improvements and a stronger SEO foundation.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Create a website experience that reflects your brand, presents your offer clearly and supports your users’ needs.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'E-commerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect audience insights, creative content and campaign-focused landing pages to support your marketing objectives.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Answers to common questions about landing page design, costs and implementation.',
				items: [
					{
						question:
							'Can You Design Landing Pages for Google Ads and Social Media Campaigns?',
						answer:
							'Yes. We align the page’s messaging and structure with your campaign, audience and intended action.',
					},
					{
						question: 'Can You Build the Landing Page as Well?',
						answer:
							'Yes. We can scope design and development together, including the required platform, forms, and integrations.',
					},
					{
						question: 'Can You Redesign an Existing Landing Page?',
						answer:
							'Yes. We can improve its messaging, content hierarchy, layout and calls to action based on your requirements.',
					},
					{
						question: 'How Is a Landing Page Different from a Website Page?',
						answer:
							'A standard website page supports broader browsing, while a landing page focuses on a specific audience, offer or action.',
					},
					{
						question: 'How Much Does Landing Page Design Cost in the UK?',
						answer:
							'Costs depend on complexity, content, design deliverables and whether development or integrations are included. The project scope helps determine the cost.',
					},
					{
						question: 'How Long Does It Take to Design a Landing Page?',
						answer:
							'Timelines depend on complexity, content readiness, feedback and implementation requirements. We’ll estimate the timeframe once the scope is clear.',
					},
					{
						question:
							'Do You Design Landing Pages for Businesses Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK, tailoring each landing page to their campaign goals, target audiences and requirements.',
					},
				],
			},
			cta: {
				pill: 'Your Next Campaign',
				heading: 'Give Your Campaign a Better Destination.',
				text: 'Give every click a purpose with landing pages that communicate your offer clearly and guide visitors towards action.',
				buttonLabel: 'Discuss Your Landing Page →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
				secondaryLabel: 'info@xoomplus.co.uk',
				secondaryHref: 'mailto:info@xoomplus.co.uk',
			},
		},
		// PLACEHOLDER: replace with real content
		{
			...redesignChild,
			hero: {
				...redesignChild.hero,
				pill: 'Website Redesign',
				titleLines: [
					'Website Redesign Agency',
					'in Manchester',
				],
				paragraphs: [
					'Your business changes. Your website should keep pace.',
					'XoomPlus helps businesses in Manchester and across the UK review their existing websites, identify areas for improvement and align their messaging, structure and visual identity with current goals.',
					'Whether you need a visual refresh, clearer navigation or broader structural changes, we create a more purposeful website around your business and audience.',
				],
				buttonLabel: 'Discuss Your Website Redesign',
			},
			features: {
				pill: 'Website Redesign',
				titleLines: [
					'Not Every Website Needs',
					'to Start Again.',
				],
				text: 'An existing website may still have useful content, established page structures and functionality worth retaining. We help identify what works, what needs improvement and how your website can better support your current business goals.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Content and Brand Messaging',
						text: 'Your website’s content and visual identity should reflect what your business offers today. We refine messaging and visual elements to align with your current services, brand positioning and business priorities.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Website Structure and Navigation',
						text: 'Website structure determines how visitors find and understand information. We organise page hierarchies, navigation and content to make key information easier to locate and follow.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Visual and User Experience Consistency',
						text: 'A consistent website experience helps visitors navigate your content without confusion. We bring visual elements, page layouts and user journeys together to create a more cohesive experience across your site.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'How a Website Redesign Supports Your Business',
			processText:
				'A website redesign helps your business communicate its services clearly and create a stronger brand experience. Improve navigation, make your website easier to use across devices and adapt its structure to changing business needs. You can also assess whether your current platform supports your goals or needs an update.',
			processImage: {
				src: '/images/website-redesign-business-benefits.webp',
				alt: 'Website redesign business benefits',
			},
			services: {
				pill: 'Redesign Solutions',
				heading: 'Our Website Redesign Services',
				text: 'We tailor each website redesign to your existing site, business goals and user needs. From visual updates to structural improvements, we make your website clearer, easier to use and better aligned with your business.',
				cards: [
					{
						title: 'Visual Redesign',
						text: 'We refresh your website with updated typography, colours, imagery and layouts that reflect your brand.',
					},
					{
						title: 'Website Structure and Navigation',
						text: 'We improve page structure and navigation to help visitors find information and move between pages more easily.',
					},
					{
						title: 'Content and Page Refinement',
						text: 'We refine your content and messaging to present your services clearly and help visitors understand your offering.',
					},
					{
						title: 'Responsive Website Redesign',
						text: 'We optimise layouts, navigation and interactions for mobile, tablet and desktop screens to deliver a consistent user experience.',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Website Redesign for Different Industries',
				titleLines: [
					'Website Redesign for Different',
					'Industries',
				],
				text: 'Every industry has unique website needs. We tailor redesigns to your audience, services and goals, helping businesses in Manchester and beyond create clearer, more user-friendly websites.',
				columns: [
					{
						items: [
							{
								title: 'Professional and Medical Services',
								text: 'We improve service pages, navigation and enquiry forms to help visitors find relevant information and understand your services.',
							},
							{
								title: 'Legal and Financial Services',
								text: 'We organise complex information, clarify service offerings and create a professional website experience that builds trust and makes enquiries easier.',
							},
							{
								title: 'E-commerce and Retail',
								text: 'We refine product pages, category structures and checkout journeys to make browsing easier and reduce friction during purchases.',
							},
						],
					},
					{
						items: [
							{
								title: 'Trades and Service Businesses',
								text: 'We highlight key services, service areas and contact options to help potential customers find what they need and request a quote.',
							},
							{
								title: 'SaaS and Business Operations',
								text: 'We simplify product information, improve feature navigation and clarify user journeys to help visitors understand your offering and take the next step.',
							},
						],
					},
				],
				note: 'These examples highlight common industry needs, but our website redesign services aren’t limited to these sectors.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'Our Website Redesign Process',
				text: 'We bring website strategy, visual design and content structure together to create a website that reflects your business today and supports its evolving needs.',
				cards: [
					{
						title: 'Understand Before Redesigning',
						text: 'We review your existing website, business objectives and user needs to identify improvements while retaining content, features and structures that still work.',
					},
					{
						title: 'Create a Better User Experience',
						text: 'We refine navigation, page structure and content presentation to help visitors find information easily across desktop, tablet and mobile devices.',
					},
					{
						title: 'Plan Around Your Requirements',
						text: 'We agree on the pages, visual updates, functionality and platform requirements before development begins.',
					},
					{
						title: 'Review, Feedback and Refinement',
						text: 'We review the updated website against agreed requirements and address feedback and revisions within the project scope before handover.',
						imageSrc:
							'/images/website-redesign-review-feedback-and-refinement.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'A website redesign may also create opportunities to improve search visibility, user experience and campaign performance. Explore our connected digital services to find the right support for your wider business goals.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Support your website’s search visibility through relevant content, technical improvements and a stronger SEO foundation.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Create a website experience that reflects your brand, presents your services clearly and supports your users’ needs.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'E-commerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect campaign messaging, audience insights and relevant landing pages to create a more consistent marketing experience.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Answers to common questions about website redesign, SEO, timelines and implementation.',
				items: [
					{
						question: 'When Should I Consider a Website Redesign?',
						answer:
							'Consider a redesign when your website no longer reflects your business, important information is difficult to find, or the current structure no longer meets your needs.',
					},
					{
						question: 'Do I Need to Replace My Entire Website?',
						answer:
							'Not always. Some projects need targeted design and content improvements, while others require a broader redesign or a new technical foundation.',
					},
					{
						question: 'Will I Lose My Existing Website Content?',
						answer:
							'Existing content can be reviewed before changes are made. The project scope should clarify what will be retained, updated, migrated or removed.',
					},
					{
						question: 'Can a Website Redesign Affect SEO?',
						answer:
							'Yes. Changes to URLs, content, internal links and site structure can affect search visibility. Where relevant, SEO considerations and appropriate redirects should be included in the project plan.',
					},
					{
						question: 'How Long Does a Website Redesign Take?',
						answer:
							'Timelines depend on the number of pages, design requirements, functionality, content readiness and the approval process. We can discuss a realistic schedule once the project scope is clear.',
					},
					{
						question:
							'Do You Redesign Websites for Businesses Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK, tailoring each website redesign to their goals, audience and technical requirements.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'Your Business Has Evolved. Has Your Website?',
				text: 'Let’s identify what works, what needs improving and how a redesign can support your business goals.',
				buttonLabel: 'Discuss Your Website Redesign →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
				secondaryLabel: 'info@xoomplus.co.uk',
				secondaryHref: 'mailto:info@xoomplus.co.uk',
			},
		},
		// PLACEHOLDER: replace with real content
		{
			...wordpressChild,
			hero: {
				...wordpressChild.hero,
				pill: 'WordPress Development',
				titleLines: [
					'WordPress Development Agency',
					'in Manchester',
				],
				paragraphs: [
					'Your website should reflect your business and make content easier to manage.',
					'XoomPlus develops WordPress websites for businesses in Manchester and across the UK. We bring page structure, visual design and website functionality together to create an experience that serves your audience and supports your team’s needs.',
					'Whether you’re building a new business website or moving an existing site to WordPress, we shape the development approach around your goals.',
				],
				buttonLabel: 'Discuss Your WordPress Project',
			},
			features: {
				pill: 'WordPress Development',
				titleLines: [
					'Easy for Your Visitors.',
					'Practical for Your Team.',
				],
				text: 'Your website should make it easy for visitors to find information and for your team to keep content up to date. We build WordPress websites with clear page structures, manageable content layouts and functionality tailored to your business needs.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Content Structure and Navigation',
						text: 'Content structure focuses on how information is organised across your website. We arrange pages, navigation and supporting content to help visitors find relevant information and move through your site more easily.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Content Management',
						text: 'Content management focuses on how your team updates and publishes website information. We use suitable page layouts and reusable templates to make routine changes easier and maintain consistency across your site.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'WordPress Functionality',
						text: 'Website functionality determines what your site can do and how it supports your business needs. We identify the features your website requires and plan an implementation that fits your goals and technical requirements.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'How WordPress Development Benefits Your Business',
			processText:
				'A well-built WordPress website helps you present your business clearly, keep content up to date and deliver a consistent experience across devices. Its flexible structure also makes it easier to add pages, publish new content and adapt your website as your business grows.',
			processImage: {
				src: '/images/wordpress-development-business-benefits.webp',
				alt: 'WordPress development business benefits',
			},
			services: {
				pill: 'Development Solutions',
				heading: 'Our WordPress Development Services',
				text: 'We tailor WordPress development to your content, brand and functional needs, from new websites to custom layouts and migrations, aligning each project with your goals and visitors’ needs.',
				cards: [
					{
						title: 'Business Website Development',
						text: 'We build WordPress websites that present your business and services clearly, with intuitive navigation and easy access to key information.',
					},
					{
						title: 'WordPress Theme and Layout Development',
						text: 'We create page layouts and visual elements that reflect your brand and keep your website consistent.',
					},
					{
						title: 'Custom Templates and Functionality',
						text: 'We develop reusable page templates and tailored features to support your content, user journeys and business processes.',
					},
					{
						title: 'WordPress Migration and Updates',
						text: 'We migrate existing websites to WordPress or improve your current site, carefully planning content, URLs and functionality.',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'WordPress Websites for Different Business Needs',
				titleLines: [
					'WordPress Websites for Different',
					'Business Needs',
				],
				text: 'We build WordPress websites around your services, audience and content needs. Our solutions help businesses in Manchester and across the UK present their offerings clearly and guide visitors towards the next step.',
				columns: [
					{
						items: [
							{
								title: 'Professional and Medical Services',
								text: 'We organise service information, team profiles and contact forms to help visitors understand your services and find relevant information.',
							},
							{
								title: 'Legal and Financial Services',
								text: 'We structure detailed service information into clear, accessible pages, making complex topics easier for visitors to navigate.',
							},
							{
								title: 'E-commerce and Retail',
								text: 'We organise product categories and navigation to help customers explore your store, compare options and find relevant products.',
							},
						],
					},
					{
						items: [
							{
								title: 'Trades and Service Businesses',
								text: 'We make service details, contact information and quote request forms easy to find across desktop and mobile devices.',
							},
							{
								title: 'SaaS and Business Services',
								text: 'We present your solutions, product features and service benefits through structured pages that help potential customers assess their options.',
							},
						],
					},
				],
				note: 'Our WordPress development services support businesses across these and other industries, based on their goals and website requirements.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'Our WordPress Development Process',
				text: 'We bring planning, design and functionality together to build a WordPress website that supports your business goals and meets your audience’s needs.',
				cards: [
					{
						title: 'Understand Your Requirements',
						text: 'We assess your business objectives, target audience, existing content and required features to establish a clear direction for your website.',
						imageSrc:
							'/images/wordpress-development-understand-your-requirements.webp',
					},
					{
						title: 'Plan the Structure and Design',
						text: 'We map out page structures, reusable content templates and visual elements to reflect your brand and create a clear user experience.',
						imageSrc:
							'/images/wordpress-development-plan-the-structure-and-design.webp',
					},
					{
						title: 'Develop Your Website',
						text: 'We implement the agreed layouts, WordPress configuration, functionality and integrations in line with your project requirements.',
						imageSrc:
							'/images/wordpress-development-develop-your-website.webp',
					},
					{
						title: 'Test and Handover',
						text: 'We test the agreed pages and functionality, address feedback within the project scope and provide relevant access details and content management guidance for handover.',
						imageSrc: '/images/wordpress-development-test-and-handover.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Your website is one part of your wider digital presence. Explore our related services to strengthen search visibility, improve user experience and connect your website with your marketing activities.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve your website’s search visibility through relevant content, technical optimisation and a focused SEO strategy.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Create a website that reflects your brand, presents your services clearly and gives visitors a more intuitive experience.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'E-commerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Reach relevant audiences with coordinated campaigns, engaging content and landing pages aligned with your marketing goals.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Find answers to common questions about WordPress development, customisation, migration and ongoing website support.',
				items: [
					{
						question: 'Why Choose WordPress for a Business Website?',
						answer:
							'WordPress is a flexible content management system that supports many types of business websites. Its suitability depends on your content, functionality and management requirements.',
					},
					{
						question: 'Can You Build a Custom WordPress Website?',
						answer:
							'Yes. We can discuss custom layouts, templates and functionality based on your requirements. The level of customisation depends on the agreed project scope and technical needs.',
					},
					{
						question: 'Can You Migrate My Existing Website to WordPress?',
						answer:
							'Migration can be included in the project scope. We first need to review your existing platform, content, URLs, functionality and integrations to establish the requirements.',
					},
					{
						question:
							'Does WordPress Development Include Hosting and Maintenance?',
						answer:
							'Hosting, maintenance, updates and ongoing support depend on the agreed scope. These requirements can be discussed before the project begins.',
					},
					{
						question: 'Can I Update My WordPress Website Myself?',
						answer:
							'WordPress allows authorised users to manage supported content through its administration interface. The editing experience depends on how the website’s pages, templates and features are configured.',
					},
					{
						question: 'Do You Provide WordPress Development Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK. Each project is tailored to the client’s website requirements, business goals and technical needs.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'Ready to Build Your WordPress Website?',
				text: 'Tell us what your business needs. We’ll help you plan a WordPress website built around your goals.',
				buttonLabel: 'Discuss Your WordPress Project →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
			},
		},
		// PLACEHOLDER: replace with real content
		{
			...shopifyChild,
			hero: {
				...shopifyChild.hero,
				pill: 'Shopify Development',
				titleLines: [
					'Shopify Development Agency',
					'in Manchester',
				],
				paragraphs: [
					'Your online store should make it easy for customers to discover products, compare options and complete their purchases.',
					'XoomPlus develops Shopify stores for businesses in Manchester and across the UK. We create storefronts that reflect your brand, showcase your products clearly and provide the functionality needed for a smooth shopping experience.',
					'Whether you’re launching a new store or improving an existing one, we tailor the approach to your goals and customers.',
				],
				buttonLabel: 'Discuss Your Shopify Project',
			},
			features: {
				pill: 'Shopify Development',
				titleLines: [
					'Make Shopping Easier',
					'for Your Customers',
				],
				text: 'Your online store should make it easy for customers to discover products, compare options and move towards checkout. We develop Shopify stores around your product range, brand identity and business needs.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Product Organisation',
						text: 'Product organisation focuses on how customers browse your store. We structure collections, categories and product pages to help shoppers find relevant items, compare options and understand what you’re offering.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Store Design and Branding',
						text: 'Store design shapes how customers perceive and interact with your brand. We use layouts, typography, colours, imagery and content to create a consistent storefront that presents your products clearly.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Shopping Experience',
						text: 'A smooth shopping experience connects product discovery with checkout. We consider product details, cart functionality and checkout flow to make the buying journey easier to follow.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'How Shopify Development Benefits Your Business',
			processText:
				'A well-structured Shopify store helps customers explore your products, understand what you offer and navigate the purchasing process. Clear product information, organised collections and consistent layouts can make the shopping experience easier to use. A storefront built around your requirements also provides a practical foundation for managing products and adapting your store as your business needs change.',
			processImage: {
				src: '/images/shopify-development-business-benefits.webp',
				alt: 'Shopify development business benefits',
			},
			services: {
				pill: 'Development Solutions',
				heading: 'Our Shopify Development Services',
				text: 'We build Shopify stores around your products, brand and functional needs, aligning each project with your business goals and desired shopping experience.',
				cards: [
					{
						title: 'Shopify Store Setup',
						text: 'We set up your Shopify store around your products and business needs, organising its structure and essential settings to prepare you for online sales.',
						imageSrc: '/images/shopify-development-shopify-store-setup.webp',
					},
					{
						title: 'Shopify Storefront Design',
						text: 'We design storefronts that reflect your brand and support the shopping journey, presenting products clearly across homepage, collection and product pages.',
						imageSrc: '/images/shopify-development-shopify-storefront-design.webp',
					},
					{
						title: 'Product and Collection Pages',
						text: 'We organise product details, images, variants and collections to help customers browse, compare options and make informed decisions.',
						imageSrc: '/images/shopify-development-product-and-collection-pages.webp',
					},
					{
						title: 'Shopify Theme Customisation',
						text: 'We customise supported theme layouts and features to match your visual identity, functional needs and desired shopping experience.',
						imageSrc: '/images/shopify-development-shopify-store-setup.webp',
					},
					{
						title: 'Shopify Integrations and Functionality',
						text: 'We identify and implement suitable features and integrations to extend your store’s capabilities and support your business operations.',
						imageSrc: '/images/shopify-development-product-and-collection-pages.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Shopify Stores for Different Business Needs',
				titleLines: [
					'Shopify Stores for Different',
					'Business Needs',
				],
				text: 'We develop Shopify stores that reflect your brand, support your operations and make it easier for customers to browse and buy.',
				columns: [
					{
						items: [
							{
								title: 'Fashion and Apparel',
								text: 'We organise product collections, sizes, colours and imagery to help customers explore styles and compare options.',
							},
							{
								title: 'Beauty and Personal Care',
								text: 'We present product details, ingredients, variants and usage information clearly to help customers make informed purchasing decisions.',
							},
							{
								title: 'Home and Lifestyle',
								text: 'We structure product categories, specifications and imagery to make larger catalogues easier to browse.',
							},
						],
					},
					{
						items: [
							{
								title: 'Food and Speciality Retail',
								text: 'We organise product ranges, available options and purchasing information into clear, consistent layouts.',
							},
							{
								title: 'B2B and Wholesale Retail',
								text: 'We structure product information around business customers and incorporate suitable wholesale features based on your requirements and Shopify setup.',
							},
						],
					},
				],
				note: 'Our Shopify development services can support these and other retail businesses, depending on their products, sales model and store requirements.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'The XoomPlus Approach to Shopify Development',
				text: 'From initial planning to final handover, we bring product organisation, storefront design and functionality together to build a Shopify store around your business goals and customers’ needs.',
				cards: [
					{
						title: 'Understand Your Requirements',
						text: 'We establish your store’s goals, product range, target customers and business requirements before planning the build. This helps keep decisions focused on your priorities and the experience you want to create.',
						imageSrc:
							'/images/shopify-development-understand-your-equirements.webp',
					},
					{
						title: 'Plan the Store Structure and Design',
						text: 'We map out collections, product pages, visual direction and required features around your catalogue and customer journey. This gives the project a clear structure before development begins.',
						imageSrc:
							'/images/shopify-development-plan-the-Store-structure-and-design.webp',
					},
					{
						title: 'Develop Your Store',
						text: 'The agreed design and functionality are brought together through Shopify configuration, theme customisation and relevant integrations. Development follows the approved requirements and project scope.',
						imageSrc: '/images/shopify-development-develop-your-store.webp',
					},
					{
						title: 'Review, Test and Handover',
						text: 'We review the agreed pages and functionality, gather feedback and address relevant changes within scope. Before handover, we provide the necessary store access and guidance to help you manage your products and day-to-day store content.',
						imageSrc:
							'/images/shopify-development-review-test-and-handover.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Your Shopify store is one part of your wider digital presence. Explore our related services to strengthen search visibility, improve the user experience and connect your store with your marketing activities.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve your store’s search visibility through relevant content, technical optimisation and a focused SEO strategy.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Support your wider website and storefront requirements with design and development tailored to your brand and users.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'E-commerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect your store with marketing campaigns that reach relevant audiences and direct potential customers to your products.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Find answers to common questions about Shopify development, storefront customisation, product catalogues and store management.',
				items: [
					{
						question: 'Is Shopify Suitable for My Business?',
						answer:
							'Shopify supports many types of online retail businesses. Its suitability depends on your products, sales model, integrations and operational requirements.',
					},
					{
						question: 'Can You Customise an Existing Shopify Store?',
						answer:
							'Yes. We can discuss changes to your storefront’s design, navigation, product pages and functionality. Available options depend on your current theme, configuration and project requirements.',
					},
					{
						question: 'Can You Help Organise or Migrate My Product Catalogue?',
						answer:
							'We can discuss product organisation and catalogue migration as part of your project. The work depends on your existing data, product variants and collection structure, and should be defined in the agreed scope.',
					},
					{
						question: 'Can Shopify Integrate with Other Business Tools?',
						answer:
							'Shopify supports various integrations, but suitability depends on the specific tool, configuration and business requirements. Required integrations should be assessed before development begins.',
					},
					{
						question:
							'Does Shopify Development Include Ongoing Store Management?',
						answer:
							'Ongoing product updates, technical maintenance and store management depend on the agreed scope. We can discuss your support requirements before the project begins.',
					},
					{
						question:
							'Do You Develop Shopify Stores for Businesses Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK, tailoring Shopify stores to their products, customers and operational requirements.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'Ready to Bring Your Shopify Store to Life?',
				text: 'Let’s plan a Shopify store that reflects your brand and makes shopping easier.',
				buttonLabel: 'Discuss Your Shopify Project →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
			},
		},
		{
			...ecommerceChild,
			hero: {
				...ecommerceChild.hero,
				pill: 'Ecommerce Development',
				titleLines: [
					'Ecommerce Development Agency',
					'in Manchester',
				],
				paragraphs: [
					'XoomPlus provides ecommerce development services for businesses in Manchester and across the UK. We bring product presentation, navigation and purchasing functionality together to create online stores that reflect your brand and provide a clear shopping experience.',
					'Whether you’re launching your first online store or improving an existing one, we tailor the ecommerce website development approach to your business goals and how you sell online.',
				],
				buttonLabel: 'Discuss Your Ecommerce Project',
			},
			features: {
				pill: 'Ecommerce Development',
				titleLines: [
					'Make Every Step of Shopping',
					'Easier to Follow',
				],
				text: 'Customers need to find products, compare options and access key information easily. We bring your catalogue, navigation and checkout journey together to create an ecommerce experience that meets your business and customer needs.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Product Discovery and Navigation',
						text: 'Product discovery focuses on how customers find relevant items in your store. We organise categories, collections and navigation around your product range to help shoppers explore options and move between related products.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Product Information and Presentation',
						text: 'Product presentation shapes how customers understand what you’re selling. We consider descriptions, imagery, specifications and available options to make important information easier to find and compare.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Shopping Journey and Checkout',
						text: 'The shopping journey connects product discovery with purchasing. We consider product selection, cart functionality and checkout requirements to create a clearer path from browsing to placing an order.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'Build a Better Foundation for Online Sales',
			processText: [
				'A well-structured ecommerce website helps customers browse products, compare options and understand what they are buying. Clear navigation and useful product information support purchasing decisions, while a considered checkout journey helps customers move from product selection towards payment.',
				'The right ecommerce platform and functionality also provide a practical foundation for managing products, processing orders and adapting your online store as business requirements change.',
			],
			processImage: {
				src: '/images/ecommerce-development-business-benefits.webp',
				alt: 'Ecommerce development business benefits',
			},
			services: {
				pill: 'Development Solutions',
				heading: 'Ecommerce Development Services for Your Business',
				text: 'Our ecommerce development services cover storefront design, product structure, checkout and integrations. We align each project with your products, customers and business needs, whether launching a new store or improving an existing one.',
				cards: [
					{
						title: 'Ecommerce Store Development',
						text: 'We build well-structured storefronts that bring your brand and products together, with clear navigation and layouts that make browsing easier.',
						imageSrc: '/images/ecommerce-development-ecommerce-store-development.webp',
					},
					{
						title: 'Product Catalogue Structure',
						text: 'We organise product categories and collections to help customers navigate your range, compare options and find relevant products.',
						imageSrc: '/images/ecommerce-development-product-catalogue-structure.webp',
					},
					{
						title: 'Product Page Development',
						text: 'We create informative product pages with clear descriptions, quality imagery, specifications and product options to support purchasing decisions.',
						imageSrc: '/images/ecommerce-development-product-page-development.webp',
					},
					{
						title: 'Cart and Checkout Development',
						text: 'We streamline the checkout experience, helping customers review orders, enter their details and complete purchases with fewer unnecessary steps.',
						imageSrc: '/images/ecommerce-development-cart-and-checkout-development.webp',
					},
					{
						title: 'Ecommerce Integrations',
						text: 'We connect your store with tools for inventory management, order fulfilment and other essential business operations, based on your platform and requirements.',
						imageSrc: '/images/ecommerce-development-ecommerce-integrations.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Ecommerce Websites for Different Business Needs',
				titleLines: [
					'Ecommerce Websites for Different',
					'Business Needs',
				],
				text: 'We build ecommerce websites around your products, customers and operations, helping businesses in Manchester and across the UK create online stores suited to their sales needs.',
				columns: [
					{
						items: [
							{
								title: 'Fashion and Apparel',
								text: 'We organise product collections, sizes, colours and imagery to help customers explore styles and compare options.',
							},
							{
								title: 'Beauty and Personal Care',
								text: 'We present ingredients, product details, variants and usage information clearly to help customers make informed purchasing decisions.',
							},
							{
								title: 'Home and Lifestyle',
								text: 'We structure product categories, dimensions, specifications and imagery to make larger catalogues easier to browse.',
							},
						],
					},
					{
						items: [
							{
								title: 'Food and Specialist Retail',
								text: 'We organise product ranges, available options and purchasing information in a format suited to your products and sales model.',
							},
							{
								title: 'B2B and Wholesale Businesses',
								text: 'We structure product information around business customers and incorporate suitable wholesale features based on your requirements and chosen platform.',
							},
						],
					},
				],
				note: 'Our ecommerce development services can support these and other industries, depending on your products, sales model and technical requirements.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'Our Ecommerce Website Development Process',
				text: 'We combine catalogue planning, storefront design and purchasing functionality to build an online store that aligns with your business goals and customer needs.',
				cards: [
					{
						title: 'Understand Your Business',
						text: 'Every ecommerce project starts with understanding your products, customers and business goals. From your product range to your existing systems, every detail helps us shape an online store that fits your operations and supports your growth.',
						imageSrc: '/images/ecommerce-development-understand-your-business.webp',
					},
					{
						title: 'Plan the Platform and Structure',
						text: 'We map out your product catalogue, page structure, navigation and key ecommerce features. We also assess platform suitability and integration requirements to create a clear development plan that supports your products, operations and future growth.',
						imageSrc: '/images/ecommerce-development-plan-the-platform-and-structure.webp',
					},
					{
						title: 'Design and Develop Your Store',
						text: 'With the structure in place, we develop your storefront design, product presentation and purchasing functionality. Each element follows the planned structure, business needs and capabilities of your chosen platform.',
						imageSrc: '/images/ecommerce-development-design-and-develop-your-store.webp',
					},
					{
						title: 'Review, Test and Handover',
						text: 'We test key pages, product displays and purchasing journeys to check that the store works as expected. After addressing feedback within the agreed scope, we provide the relevant access details and guidance for managing your store.',
						imageSrc: '/images/ecommerce-development-review-test-and-handover.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Your ecommerce website is one part of your wider digital presence. Alongside ecommerce development, explore our related services to strengthen search visibility, improve user experience and connect your online store with your marketing activities.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve your store’s search visibility through relevant content, technical optimisation and a focused SEO strategy.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Support your wider website and digital experience with design and development tailored to your brand, users and business requirements.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'Ecommerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect your store with marketing activities that reach relevant audiences and guide potential customers towards your products.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Ecommerce Development FAQs',
				text: 'Find answers to common questions about ecommerce website development, platform selection, custom functionality and online store management.',
				items: [
					{
						question: 'What Does Ecommerce Development Include?',
						answer:
							'Ecommerce development can include storefront design, product catalogue organisation, product pages, cart and checkout functionality, and relevant integrations. The exact scope depends on your platform, business requirements and project objectives.',
					},
					{
						question: 'What Is the Difference Between Ecommerce and Shopify Development?',
						answer:
							'Ecommerce development covers the broader process of building an online store. Shopify is one platform for ecommerce websites. The right approach depends on your products, required features, integrations and business needs.',
					},
					{
						question: 'Which Ecommerce Platform Should I Choose?',
						answer:
							'Platform suitability depends on your catalogue, required functionality, integrations and operational processes. We can discuss these requirements to help establish a suitable direction for your ecommerce project.',
					},
					{
						question: 'Can You Build an Ecommerce Website with a Large Product Catalogue?',
						answer:
							'Yes, large catalogues can be considered as part of an ecommerce website development project. Product volume, variations, data quality and platform capabilities help determine the appropriate structure and implementation.',
					},
					{
						question: 'Can You Integrate Inventory or Other Business Systems?',
						answer:
							'Potential ecommerce integrations can be assessed against your existing systems and chosen platform. Availability, technical requirements and data flows need to be confirmed before implementation.',
					},
					{
						question: 'Can You Improve an Existing Ecommerce Website?',
						answer:
							'Yes. We can review your current online store, identify the areas you want to improve and discuss whether targeted changes or a wider ecommerce redevelopment would be more appropriate.',
					},
					{
						question: 'Do You Provide Ecommerce Development Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK. Each ecommerce project is tailored to the client’s products, sales model, operational needs and technical requirements.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'More Than a Store. A Better Shopping Experience.',
				text: 'Let’s bring your products, brand and customer journey together in one seamless ecommerce experience.',
				buttonLabel: 'Discuss Your Ecommerce Project →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
				secondaryLabel: 'info@xoomplus.co.uk',
				secondaryHref: 'mailto:info@xoomplus.co.uk',
			},
		},
		{
			...customWebsiteChild,
			hero: {
				...customWebsiteChild.hero,
				pill: 'Custom Website Development',
				titleLines: [
					'Custom Website Development Agency',
					'in Manchester',
				],
				paragraphs: [
					'Some businesses need more than a standard website structure. XoomPlus provides custom website development services for businesses in Manchester and across the UK. We create digital experiences around your specific requirements, users and workflows.',
					'From tailored page layouts to specialised functionality and system integrations, each project is shaped around your business goals and technical requirements.',
				],
				buttonLabel: 'Discuss Your Custom Website Project',
			},
			features: {
				pill: 'Custom Website Development',
				titleLines: [
					'Your Website Should Fit',
					'the Way You Work',
				],
				text: 'Every business has different requirements. We start by understanding what your website needs to achieve, how people will use it and which features will support your goals.',
				items: [
					{
						icon: 'make-the-next-step-clear',
						title: 'Define Functionality',
						text: 'Website functionality determines how visitors interact with your site and complete key tasks. We identify the features, forms and interactions needed to support your website’s purpose and business requirements.',
					},
					{
						icon: 'bring-your-brand-into-focus',
						title: 'Shape the User Experience',
						text: 'The user experience influences how visitors navigate your website and find relevant information. We plan page layouts, navigation and user journeys around their needs to make important actions easier to follow.',
					},
					{
						icon: 'think-beyond-one-screen',
						title: 'Plan the Technical Approach',
						text: 'The technical approach shapes how your website’s features and requirements are implemented. We consider the platform, integrations and development requirements to establish a suitable foundation before development begins.',
					},
				],
			},
			processPill: 'Business Benefits',
			processHeading: 'Build a Website Around Your Specific Needs',
			processText:
				'Custom website development gives you greater control over your website’s structure, functionality and user experience. Tailored layouts help present complex information clearly, while specific features and integrations support workflows that standard website setups may not accommodate. Defining these requirements early also helps establish a clear project scope and suitable technical approach.',
			processImage: {
				src: '/images/custom-website-development-business-benefits.webp',
				alt: 'Custom website development business benefits',
			},
			services: {
				pill: 'Development Solutions',
				heading: 'Custom Website Development Services for Your Business',
				text: 'Our custom website development services cover bespoke builds, tailored layouts, specialised functionality and third-party integrations. We assess your requirements to define a suitable technical approach and project scope.',
				cards: [
					{
						title: 'Custom Website Development',
						text: 'We develop websites around your business requirements, content and user journeys, building the structure and functionality your project needs.',
						imageSrc: '/images/custom-website-development-custom-website-development.webp',
					},
					{
						title: 'Custom Page Layouts and Interfaces',
						text: 'We create page layouts and interface elements that reflect your content, brand identity and the tasks your users need to complete.',
						imageSrc:
							'/images/custom-website-development-custom-page-layouts-and-interfaces.webp',
					},
					{
						title: 'Custom Features and Functionality',
						text: 'We plan and develop features that address specific business needs, considering their scope, complexity and technical requirements.',
						imageSrc:
							'/images/custom-website-development-custom-features-and-functionality.webp',
					},
					{
						title: 'Third-Party Integrations',
						text: 'We connect your website with relevant external tools and business systems, based on available integrations and technical requirements.',
						imageSrc: '/images/custom-website-development-third-party-integrations.webp',
					},
					{
						title: 'Responsive Website Development',
						text: 'We adapt layouts and interactive elements for desktop, tablet and mobile devices, helping users access content and key features across screen sizes.',
						imageSrc:
							'/images/custom-website-development-responsive-website-development.webp',
					},
				],
			},
			clarity: {
				id: 'clarity',
				pill: 'Industry Applications',
				title: 'Custom Websites for Different Business Needs',
				titleLines: [
					'Custom Websites for Different',
					'Business Needs',
				],
				text: 'Different industries have distinct workflows, content requirements and user expectations. We tailor each website to the business’s functional needs and the experience its users expect.',
				columns: [
					{
						items: [
							{
								title: 'Professional and Medical Services',
								text: 'We build clear service pages, enquiry journeys and information structures to help visitors understand your services and find the right next steps.',
							},
							{
								title: 'Legal and Financial Services',
								text: 'We organise detailed service information into clear page structures and user journeys, helping visitors navigate complex information and access relevant services.',
							},
							{
								title: 'E-commerce and Retail',
								text: 'We develop custom product experiences, catalogue structures and relevant integrations to support your online sales processes and customer needs.',
							},
						],
					},
					{
						items: [
							{
								title: 'Trades and Service Businesses',
								text: 'We create service pages, enquiry forms and quote-request journeys that reflect your business processes and make it easier for customers to get in touch.',
							},
							{
								title: 'SaaS and Business Services',
								text: 'We structure complex solutions, product features and specialised user journeys through layouts and functionality that help users understand your offering.',
							},
						],
					},
				],
				note: 'Our custom website development services can support these and other industries, depending on your requirements, technical needs and project scope.',
			},
			serviceStack: {
				pill: 'Our Approach',
				heading: 'The XoomPlus Approach to Custom Website Development',
				text: 'Our development process connects your business requirements with website structure, design and functionality to support your goals and users’ needs across Manchester and the UK.',
				cards: [
					{
						title: 'Understand Your Requirements',
						text: 'We assess your business goals, target audience and functional needs to define the website’s purpose, key features and project priorities.',
						imageSrc:
							'/images/custom-website-development-understand-your-requirements.webp',
					},
					{
						title: 'Plan Before Development',
						text: 'We map out page structures, user journeys, required features and integrations before development begins. This helps us establish a clear direction and identify technical requirements early.',
						imageSrc: '/images/custom-website-development-plan-before-development.webp',
					},
					{
						title: 'Turn Requirements Into a Working Website',
						text: 'We turn the agreed plans into interface designs and functional website components, ensuring each element aligns with your requirements, user experience goals and project scope.',
						imageSrc:
							'/images/custom-website-development-turn-requirements-into-a-working-website.webp',
					},
					{
						title: 'Review, Test and Handover',
						text: 'We review the website’s agreed features and user journeys, address identified issues within scope and prepare the website for handover with relevant access details and guidance.',
						imageSrc: '/images/custom-website-development-review-test-and-handover.webp',
					},
				],
			},
			servicesBehind: {
				id: 'services-behind',
				pill: 'Connected Services',
				title: 'Different Needs. Connected Digital Capabilities.',
				text: 'Your website is one part of your wider digital presence. Explore our related services to strengthen search visibility, improve user experience and connect your website with your marketing activities.',
				cards: [
					{
						icon: '/icons/service-circles.svg',
						title: 'Search Engine Optimisation (SEO)',
						description:
							'Improve your website’s search visibility through relevant content, technical optimisation and a focused SEO strategy.',
						items: [
							'AI SEO (GEO & AEO)',
							'Local SEO',
							'Technical SEO',
							'On-Page SEO',
							'Link Building (Off-Page SEO)',
							'SEO Audits',
						],
						buttonLabel: 'Explore SEO Services',
						href: '/services/seo',
					},
					{
						icon: '/icons/service-layers.svg',
						title: 'Web Design & Development',
						description:
							'Create digital experiences that reflect your brand, support your users and meet your website requirements.',
						items: [
							'UI/UX Design',
							'Landing Page Design',
							'Website Redesign',
							'WordPress Development',
							'Shopify Development',
							'Ecommerce Development',
							'Custom Website Development',
						],
						buttonLabel: 'Explore Web Design Services',
						href: '/services/web-design-development',
					},
					{
						icon: '/icons/service-circles.svg',
						title: 'Social & Paid Campaigns',
						description:
							'Connect your website with marketing activities designed to reach relevant audiences and support your campaign goals.',
						items: [
							'Social Media Marketing',
							'Content & Creative Direction',
							'Campaign Planning',
							'PPC & Google Ads',
							'Audience & Keyword Research',
							'Landing Page Alignment',
							'Reporting & Refinement',
						],
						buttonLabel: 'Explore Campaign Services',
						href: '/services/social-media-marketing',
					},
				],
			},
			faq: {
				pill: 'FAQ',
				heading: 'Frequently Asked Questions',
				text: 'Find answers to common questions about custom website development, functionality, integrations and project requirements.',
				items: [
					{
						question: 'What Is Custom Website Development?',
						answer:
							'Custom website development involves building a website around specific business, design or functional requirements rather than relying entirely on standard templates and features.',
					},
					{
						question: 'Is Custom Development Better Than WordPress or Shopify?',
						answer:
							'Not necessarily. WordPress and Shopify can meet many website requirements. Custom development may be suitable when a project needs a structure or functionality that existing platform options cannot adequately support.',
					},
					{
						question: 'Can You Integrate My Existing Business Systems?',
						answer:
							'We can assess the systems you use and the connections you need. Feasibility depends on available interfaces, technical access, compatibility and project scope.',
					},
					{
						question: 'How Much Does Custom Website Development Cost?',
						answer:
							'Costs depend on the website’s scope, design, functionality, integrations and technical complexity. Defining the requirements helps establish the work involved and an appropriate budget.',
					},
					{
						question: 'How Long Does Custom Website Development Take?',
						answer:
							'Timelines depend on the required features, technical dependencies, design process and review stages. We can discuss a realistic schedule once the project scope is established.',
					},
					{
						question: 'Can You Support the Website After Launch?',
						answer:
							'Post-launch maintenance, technical support and further development can be discussed during project planning. The availability and scope of ongoing assistance should be agreed before work begins.',
					},
					{
						question: 'Do You Provide Custom Website Development Outside Manchester?',
						answer:
							'Yes. XoomPlus works with businesses in Manchester and across the UK. Each project is tailored to the client’s requirements, technical needs and agreed scope.',
					},
				],
			},
			cta: {
				pill: 'Your Next Stage',
				heading: 'Need Something Beyond a Standard Website?',
				text: 'Let’s discuss your requirements and find the right custom solution.',
				buttonLabel: 'Discuss Your Custom Website Project →',
				buttonHref: '/contact',
				secondaryButtonLabel: 'Explore Our Approach →',
				secondaryButtonHref: '#process',
				secondaryLabel: 'info@xoomplus.co.uk',
				secondaryHref: 'mailto:info@xoomplus.co.uk',
			},
		},
	],
	hero: {
		pill: 'Web Design & Development in Manchester',
		pillBrand: 'XoomPlus',
		titleLines: [
			'Web Design and Development in Manchester,',
			'Built Around Your Business',
		],
		text: 'XoomPlus provides web design and development services for businesses in Manchester and across the UK. We create responsive landing pages, WordPress websites, Shopify stores and custom solutions tailored to your users and business goals. Whether you need a new website, a redesign or improved functionality, we help you find the right approach.',
		primaryButton: { label: 'Discuss Your Project', href: '/contact' },
		secondaryLink: { label: 'Explore the Possibilities', href: '#details' },
		footerLeft: 'Digital Marketing. Designed for Growth.',
		footerRight: 'UI/UX + Websites + Ecommerce',
		panelLabel: 'EXPERIENCE / DESIGN / DEVELOPMENT',
		panelPlus: '',
		panelImage: {
			src: serviceHeroImage(SLUG),
			alt: 'Website shown on a laptop and a phone',
		},
		panelCaptions: ['Clear structure', 'Considered design', 'Purposeful journeys'],
	},
	features: {
		pill: 'Built Around People',
		titleLines: ['Not Just How It Looks.', 'How It Works for You.'],
		text: 'Your website should communicate your brand clearly and guide visitors towards their goals. XoomPlus combines effective web design and reliable web development to create user-friendly websites that support your business objectives.',
		items: [
			{
				icon: 'make-the-next-step-clear',
				title: 'Make the Next Step Clear',
				text: 'Organise content and calls to action so visitors can find relevant information and move towards an enquiry, booking or purchase.',
			},
			{
				icon: 'bring-your-brand-into-focus',
				title: 'Bring Your Brand into Focus',
				text: 'Use consistent layouts, clear typography and purposeful visuals to communicate your value and create a recognisable brand experience.',
			},
			{
				icon: 'think-beyond-one-screen',
				title: 'Think Beyond One Screen',
				text: 'Responsive web design adapts your content, navigation and interactions to mobile phones, tablets and desktop screens, helping visitors use your website across devices.',
			},
		],
	},
	experience: {
		pill: 'Experience & Design',
		titleLines: ['Make Every Page', 'Feel Purposeful.'],
		text: 'Effective web design combines clear structure, visual consistency and user-focused navigation. From landing pages to complete redesigns, we create intuitive experiences that reflect your brand and support your business goals.',
		items: [
			{
				icon: 'ui-ux-design',
				title: 'UI/UX Design',
				text: 'Create an intuitive user experience with clear layouts and easy navigation, helping visitors find information and complete key actions effortlessly.',
				href: `/services/${SLUG}/uiux-design`,
			},
			{
				icon: 'landing-page-design',
				title: 'Landing Page Design',
				text: 'Give your campaigns a focused destination with audience-specific messaging, purposeful layouts and clear calls to action that support conversions.',
				href: `/services/${SLUG}/landing-page-design`,
			},
			{
				icon: 'website-redesign',
				title: 'Website Redesign',
				text: 'Align your website with current business needs by improving its visual design, content structure and usability for a clearer, more consistent experience.',
				href: `/services/${SLUG}/website-redesign`,
			},
		],
		footnote:
			'We tailor the platform, page structure and handover to your needs rather than relying on a one-size-fits-all approach.',
	},
	bento: {
		pill: 'Development & Commerce',
		title: 'Thoughtful Development. Practical Solutions.',
		text: 'Every business has different needs. XoomPlus combines thoughtful design with the right platforms and features to build websites that support your goals, work for your business and adapt as it grows.',
		mainCard: {
			icon: '/icons/service-layers.svg',
			title: 'Web Design & Development',
			description:
				'Create a website that looks great, works smoothly and reflects your brand, with responsive design and easy navigation that support your business goals.',
			items: [
				'UI/UX Design',
				'Landing Page Design',
				'Website Redesign',
				'WordPress Development',
				'Shopify Development',
				'Ecommerce Development',
				'Custom Website Development',
			],
			buttonLabel: 'Discuss Your Website',
			href: '/contact',
		},
		cards: [
			{
				icon: 'wordpress-development',
				title: 'WordPress Development',
				text: 'Build an easy-to-manage WordPress website with a clear content structure and the flexibility to grow with your business.',
				linkLabel: 'Read More →',
				href: `/services/${SLUG}/wordpress-development`,
			},
			{
				/* Filename typo in public/icons: sopify-development.svg */
				icon: 'sopify-development',
				title: 'Shopify Development',
				text: 'Create a Shopify store that showcases your products, simplifies browsing and guides customers smoothly towards checkout.',
				linkLabel: 'Read More →',
				href: `/services/${SLUG}/shopify-development`,
			},
			{
				icon: 'ecommerce-development',
				title: 'Ecommerce Development',
				text: 'Create an ecommerce website with clear product listings, easy navigation and a smooth path to checkout.',
				linkLabel: 'Read More →',
				href: `/services/${SLUG}/ecommerce-development`,
			},
			{
				icon: 'custom-website-development',
				title: 'Custom Website Development',
				text: 'Build a custom website with tailored features, integrations and workflows that meet your specific business needs.',
				linkLabel: 'Read More →',
				href: `/services/${SLUG}/custom-website-development`,
			},
		],
		note: "Not sure where to start? Share your goals and requirements, and we'll help you choose the right platform, design and development approach.",
	},
	showcase: {
		pill: 'Seamless Across Devices',
		titleLines: ['Different Screens.', 'The Same Clarity.'],
		text: 'Responsive web design adapts your website’s layout, content and interactions to different screen sizes, making it easier for visitors to navigate and use your website across devices.',
		plainPanel: true,
		panel: {
			label: '',
			note: '',
			image: {
				src: '/images/web-design-development-seamless-across-devices.webp',
				alt: 'Website layout shown on a laptop and a phone',
				width: 960,
				height: 720,
			},
			caption: '',
		},
		items: [
			'Content That Stays Clear',
			'Navigation That Feels Natural',
			'Calls to Action Within Reach',
		],
		icon: 'one-connected-experience-arrow',
	},
	process: {
		pill: 'Working Together',
		titleLines: ['Good Work Starts', 'with a Good Partnership.'],
		text: 'Successful projects need clear expectations, timely feedback and shared priorities. We keep communication focused to ensure decisions stay aligned with the agreed scope.',
		image: {
			src: '/images/web-design-development-working-together.webp',
			alt: 'Team members sketching ideas on paper at a wooden table',
			width: 960,
			height: 540,
		},
		items: [
			{
				title: 'A Scope Shaped Around Your Needs',
				text: 'Define pages, features, platform requirements and deliverables upfront to set clear priorities and avoid uncertainty.',
			},
			{
				title: 'A Shared View of the Work',
				text: 'Share your business insights, brand assets and content to guide decisions as your website takes shape.',
			},
			{
				title: 'A Considered Handover',
				text: 'Get the guidance and access you need to manage your website confidently after launch. Any ongoing support is agreed separately.',
			},
		],
		note: "What Should You Prepare Before We Start? Bring your business goals, required pages and available brand assets. We'll help clarify your requirements and next steps, even if everything isn't finalised.",
	},
	faqKey: 'web-design-development',
};
