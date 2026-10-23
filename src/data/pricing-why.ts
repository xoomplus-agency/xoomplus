import type { WhyXoomplusContent } from './why-xoomplus';

/**
 * Pricing page Why Xoomplus content.
 * Icons reuse the home Why Xoomplus set (see mapping in why-xoomplus / component notes).
 */
export const pricingWhy: WhyXoomplusContent = {
	id: 'pricing-why',
	pill: 'Tangible Value',
	title: 'A Digital Marketing Agency Focused on Your Commercial Goals.',
	cards: [
		{
			icon: '/icons/strategy-first.svg',
			title: 'Audit & Research',
			text: 'We conduct thorough research to understand your audience, competitors, trends and opportunities before we do anything. A clear plan can only come from reliable data.',
		},
		{
			icon: '/icons/experienced-team.svg',
			title: 'The A Team',
			text: 'Each member of Xoomplus has a history of successful ventures and years of experience to give you a premium service and bring the results you are looking for.',
		},
		{
			icon: '/icons/clear-reporting.svg',
			title: 'Transparent Reporting',
			text: 'Transparency is our non-negotiable practice. We build clear and transparent communication with every client so they know exactly what is going on.',
		},
		{
			icon: '/icons/tailored-strategies.svg',
			title: 'Tailored Plans',
			text: 'Every business is a unique idea and has distinct digital needs. We understand that and craft tailored plans that reflect your unique business needs.',
		},
		{
			icon: '/icons/result-focused.svg',
			title: 'Focused Efforts',
			text: 'Everything we do has a clear purpose and goal driving it. That is why our efforts don’t waver, and our results aren’t delayed. We follow the objective, not the clock.',
		},
		{
			icon: '/icons/long-term-growth.svg',
			title: 'Lasting Growth',
			text: 'Our efforts are designed for the present and the future. That is how we bring short-term results while building a long-term foundation for digital growth.',
		},
	],
	button: { label: 'Let’s Talk', href: '/contact' },
};
