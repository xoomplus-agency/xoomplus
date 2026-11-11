/**
 * Strip URL fragments from crawlable `href`s.
 * Same-page / internal `#section` links become a clean path + `data-scroll-target`.
 * Google never receives fragments over HTTP; keeping them out of HTML avoids
 * soft URL variants like `https://xoomplus.co.uk/#contact` in link graphs.
 */
export function normalizeLinkHref(
	href: string | undefined,
	currentUrl: URL,
): { href: string | undefined; scrollTarget?: string } {
	if (!href?.includes('#')) return { href };

	try {
		const destination = new URL(href, currentUrl);
		const scrollTarget = destination.hash.replace(/^#/, '').trim();
		const isInternal = destination.origin === currentUrl.origin;
		destination.hash = '';
		const pathname =
			destination.pathname !== '/' && !destination.pathname.endsWith('/')
				? `${destination.pathname}/`
				: destination.pathname;

		if (!isInternal) {
			return { href: destination.href };
		}

		const cleanHref = `${pathname}${destination.search}` || '/';
		return {
			href: cleanHref,
			...(scrollTarget ? { scrollTarget } : {}),
		};
	} catch {
		const base = href.split('#', 1)[0].trim();
		return { href: base || undefined };
	}
}
