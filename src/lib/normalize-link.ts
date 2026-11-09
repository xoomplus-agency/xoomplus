export function normalizeLinkHref(
	href: string | undefined,
	currentUrl: URL,
): { href: string | undefined; scrollTarget?: string } {
	if (!href?.includes('#')) return { href };

	try {
		const destination = new URL(href, currentUrl);
		const scrollTarget = destination.hash.slice(1);
		const isInternal = destination.origin === currentUrl.origin;
		destination.hash = '';
		const pathname =
			destination.pathname !== '/' && !destination.pathname.endsWith('/')
				? `${destination.pathname}/`
				: destination.pathname;

		return {
			href: isInternal
				? `${pathname}${destination.search}`
				: destination.href,
			...(isInternal && scrollTarget ? { scrollTarget } : {}),
		};
	} catch {
		return { href: href.split('#', 1)[0] };
	}
}
