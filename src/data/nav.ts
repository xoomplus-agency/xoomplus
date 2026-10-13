import { type WpPageKey, WP_PAGE_FALLBACK_ROUTES } from '../lib/wp-seo';

/** Primary site navigation — shared by desktop Header and mobile nav. */
export type NavItem = {
	label: string;
	href: string;
	hasDropdown?: boolean;
	/** Extra path prefixes that also mark this item active (trailing slashes ignored). */
	matchPrefixes?: string[];
	/** When true, also active on /{category}/{slug}/ blog posts (not under /blogs). */
	matchBlogPosts?: boolean;
};

/**
 * Build-time / static nav — no per-request WordPress calls.
 * Hrefs match WP_PAGE_FALLBACK_ROUTES (verified by `check:wp-routes` at build).
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
	{
		label: 'Blog',
		href: '/blogs',
		matchPrefixes: ['/blogs'],
		matchBlogPosts: true,
	},
];

const NAV_KEYS: {
	label: string;
	key: WpPageKey;
	hasDropdown?: boolean;
	matchBlogPosts?: boolean;
}[] = [
	{ label: 'Home', key: 'home' },
	{ label: 'Services', key: 'services', hasDropdown: true },
	{ label: 'About', key: 'about' },
	{ label: 'Industries', key: 'industries' },
	{ label: 'Case Studies', key: 'caseStudies' },
	{ label: 'Contact', key: 'contact' },
	{ label: 'Blog', key: 'blogs', matchBlogPosts: true },
];

/** Sync nav for Header/Layout — zero WordPress round-trips. */
export function getNavItemsStatic(): NavItem[] {
	return navItems.map((item) => ({ ...item }));
}

/**
 * Nav with hrefs resolved from live WordPress CMS slugs.
 * Prefer `getNavItemsStatic()` for request-path TTFB; use this only when
 * a live CMS slug map is already warm (e.g. scripts / revalidate).
 */
export async function getNavItemsResolved(): Promise<NavItem[]> {
	const { getAllWpPageRoutes } = await import('../lib/wp-seo');
	const routes = await getAllWpPageRoutes();
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
			matchPrefixes = [href, servicesHref, '/services'];
		} else if (def.key === 'blogs') {
			matchPrefixes = [href, '/blogs'];
		}
		items.push({
			label: def.label,
			href,
			hasDropdown: def.hasDropdown,
			matchPrefixes,
			matchBlogPosts: def.matchBlogPosts,
		});
	}
	return items;
}

/** Normalize pathname for active matching. */
export function normalizePath(pathname: string): string {
	return pathname.replace(/\/+$/, '') || '/';
}

function isBlogPostPath(pathname: string): boolean {
	const p = normalizePath(pathname);
	return (
		/^\/[^/]+\/[^/]+$/.test(p) &&
		!p.startsWith('/services/') &&
		!p.startsWith('/api/') &&
		!p.startsWith('/locations/')
	);
}

export function isNavActive(
	pathname: string,
	href: string,
	matchPrefixes?: string[],
	matchBlogPosts?: boolean,
): boolean {
	const path = normalizePath(pathname);
	const itemPath = normalizePath(href);
	if (itemPath === '/') return path === '/';
	if (matchBlogPosts && isBlogPostPath(path)) return true;
	const prefixes = (matchPrefixes?.length ? matchPrefixes : [itemPath]).map(normalizePath);
	return prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
