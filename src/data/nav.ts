import { type WpPageKey, WP_PAGE_FALLBACK_ROUTES } from '../lib/wp-seo';
import { getBlogCategoryPrefixes } from '../lib/wp';

/** Primary site navigation — shared by desktop Header and mobile nav. */
export type NavItem = {
	label: string;
	href: string;
	hasDropdown?: boolean;
	/** Extra path prefixes that also mark this item active (trailing slashes ignored). */
	matchPrefixes?: string[];
};

/**
 * Static labels only — hrefs here are unused at runtime.
 * Prefer getNavItemsResolved() which always uses live CMS slugs by page ID.
 */
export const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{
		label: 'Services',
		href: '/services',
		hasDropdown: true,
		matchPrefixes: ['/services'],
	},
	{ label: 'About', href: '/about' },
	{ label: 'Industries', href: '/industries' },
	{ label: 'Case Studies', href: '/projects' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Blog', href: '/blogs' },
];

const NAV_KEYS: { label: string; key: WpPageKey; hasDropdown?: boolean }[] = [
	{ label: 'Home', key: 'home' },
	{ label: 'Services', key: 'services', hasDropdown: true },
	{ label: 'About', key: 'about' },
	{ label: 'Industries', key: 'industries' },
	{ label: 'Case Studies', key: 'caseStudies' },
	{ label: 'Contact', key: 'contact' },
	{ label: 'Blog', key: 'blogs' },
];

/** Nav with hrefs resolved from live WordPress CMS slugs. */
export async function getNavItemsResolved(): Promise<NavItem[]> {
	const { getAllWpPageRoutes } = await import('../lib/wp-seo');
	const [routes, blogCategoryPrefixes] = await Promise.all([
		getAllWpPageRoutes(),
		getBlogCategoryPrefixes(),
	]);
	const byKey = new Map(routes.map((r) => [r.key, r.route]));
	const servicesHref = byKey.get('services') ?? '/services';

	const items: NavItem[] = [];
	for (const def of NAV_KEYS) {
		const href = byKey.get(def.key) ?? WP_PAGE_FALLBACK_ROUTES[def.key];
		if (!byKey.get(def.key)) {
			console.error(
				`[nav] live CMS path missing for "${def.key}" — using fallback ${href}`,
			);
		}
		let matchPrefixes: string[] | undefined;
		if (def.hasDropdown) {
			// Keep nested /services/* detail pages highlighting Services even if the
			// CMS listing slug differs (detail routes stay under /services/…).
			matchPrefixes = [href, servicesHref, '/services'];
		} else if (def.key === 'blogs') {
			// Post URLs are /<category>/<slug>/ (not under /blogs) — still highlight Blog.
			matchPrefixes = [href, '/blogs', ...blogCategoryPrefixes];
		}
		items.push({
			label: def.label,
			href,
			hasDropdown: def.hasDropdown,
			matchPrefixes,
		});
	}
	return items;
}

/** Normalize pathname for active matching. */
export function normalizePath(pathname: string): string {
	return pathname.replace(/\/+$/, '') || '/';
}

export function isNavActive(
	pathname: string,
	href: string,
	matchPrefixes?: string[],
): boolean {
	const path = normalizePath(pathname);
	const itemPath = normalizePath(href);
	if (itemPath === '/') return path === '/';
	const prefixes = (matchPrefixes?.length ? matchPrefixes : [itemPath]).map(normalizePath);
	return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
