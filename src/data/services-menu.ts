/** Services mega menu — single source of truth for desktop panel + mobile accordion. */

export type MenuLink = {
	label: string;
	href: string;
};

export type ServiceGroup = {
	label: string;
	links: MenuLink[];
};

export type ServiceColumn = {
	type: 'service';
	title: string;
	href: string;
	description: string;
	links?: MenuLink[];
	groups?: ServiceGroup[];
};

export type StackItem = {
	title: string;
	href: string;
	description: string;
	textLinks: MenuLink[];
};

export type StackColumn = {
	type: 'stack';
	items: StackItem[];
};

export type ServicesMenuColumn = ServiceColumn | StackColumn;

export type ServicesMenuFooter = {
	allServicesHref: string;
	heading: string;
	text: string;
	buttonLabel: string;
	buttonHref: string;
};

export type ServicesMenu = {
	columns: ServicesMenuColumn[];
	footer: ServicesMenuFooter;
};

function slugify(label: string): string {
	return label
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[()/]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function link(label: string, parentSlug?: string): MenuLink {
	const slug = slugify(label);
	return {
		label,
		href: parentSlug ? `/services/${parentSlug}/${slug}` : `/services/${slug}`,
	};
}

/** Text links in stacked columns point at the parent service page (placeholders). */
function textLink(label: string, parentHref: string): MenuLink {
	return { label, href: parentHref };
}

export const servicesMenu: ServicesMenu = {
	columns: [
		{
			type: 'service',
			title: 'SEO',
			href: '/services/seo',
			description: 'Build visibility. Reach the right audience.',
			links: [
				link('AI SEO (GEO & AEO)', 'seo'),
				link('Local SEO', 'seo'),
				link('Technical SEO', 'seo'),
				link('On-Page SEO', 'seo'),
				link('Link Building (Off-Page)', 'seo'),
				link('SEO Audit', 'seo'),
				link('SEO Content Marketing', 'seo'),
			],
		},
		{
			type: 'service',
			title: 'Web Design & Development',
			href: '/services/web-design-development',
			description: 'Purposeful experiences. Stronger websites.',
			groups: [
				{
					label: 'Experience and design',
					links: [
						link('UI/UX Design', 'web-design-development'),
						link('Landing Page Design', 'web-design-development'),
						link('Website Redesign', 'web-design-development'),
					],
				},
				{
					label: 'Development and commerce',
					links: [
						link('WordPress Development', 'web-design-development'),
						link('Shopify Development', 'web-design-development'),
						link('Ecommerce Development', 'web-design-development'),
						link('Custom Website Development', 'web-design-development'),
					],
				},
			],
		},
		{
			type: 'stack',
			items: [
				{
					title: 'Social Media Marketing',
					href: '/services/social-media-marketing',
					description: 'Connect your message with the right people.',
					textLinks: [
						textLink('Content & creative direction', '/services/social-media-marketing'),
						textLink('Campaign planning', '/services/social-media-marketing'),
						textLink('Reporting & refinement', '/services/social-media-marketing'),
					],
				},
				{
					title: 'PPC & Google Ads',
					href: '/services/ppc-google-ads',
					description: 'Focused campaigns. A clearer path from click to conversion.',
					textLinks: [
						textLink('Audience & keyword research', '/services/ppc-google-ads'),
						textLink('Landing page alignment', '/services/ppc-google-ads'),
						textLink('Reporting & refinement', '/services/ppc-google-ads'),
					],
				},
			],
		},
	],
	footer: {
		allServicesHref: '/services',
		heading: 'Not sure where to start?',
		text: "Tell us what you're working towards.",
		buttonLabel: 'Discuss your project',
		buttonHref: '/contact',
	},
};

/** Flatten menu columns for the mobile accordion (title + child links). */
export function getServicesMenuSections() {
	const sections: { title: string; href: string; links: MenuLink[] }[] = [];

	for (const column of servicesMenu.columns) {
		if (column.type === 'service') {
			const links = column.links
				? column.links
				: (column.groups?.flatMap((g) => g.links) ?? []);
			sections.push({ title: column.title, href: column.href, links });
		} else {
			for (const item of column.items) {
				sections.push({
					title: item.title,
					href: item.href,
					links: item.textLinks,
				});
			}
		}
	}

	return sections;
}
