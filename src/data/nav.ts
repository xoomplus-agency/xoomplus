/** Primary site navigation — shared by desktop Header and mobile nav. */
export type NavItem = {
	label: string;
	href: string;
	hasDropdown?: boolean;
	/** Extra path prefixes that also mark this item active (trailing slashes ignored). */
	matchPrefixes?: string[];
};

export const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{
		label: 'Services',
		href: '/our-services',
		hasDropdown: true,
		matchPrefixes: ['/our-services', '/services'],
	},
	{ label: 'About', href: '/about' },
	{ label: 'Industries', href: '/industries' },
	{ label: 'Case Studies', href: '/case-studies' },
	{ label: 'Contact', href: '/contact' },
	{ label: 'Blog', href: '/blogs' },
];

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
