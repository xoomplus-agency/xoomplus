/**
 * /blogs — one page of cards in the HTML. Load more, category chips, and
 * search each request the next slim page. Search never filters the grid.
 * Search-only roots (e.g. 404) opt in with `data-blog-search-only`.
 */
import { setButtonLoading } from './btn-loading';

const PAGE_SIZE = 9;
const KEY = 'xoomplus-blog-list-visible';
const INIT_ATTR = 'data-blog-list-ready';
const MIN_Q = 2;
const MAX_HITS = 6;
/** Soft UX delay on the Load more button — do not wait on image decode (OOM risk). */
const LOAD_MORE_MIN_MS = 280;
/** Cap session restore so refresh never re-fetches dozens of pages at once. */
const MAX_RESTORE_PAGES = 2;
const MAX_PERSIST_CARDS = PAGE_SIZE * 4;
/** Match BlogCard.astro default — without sizes, srcset can pick the largest WP variant. */
const CARD_SIZES = '(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw';

type Card = {
	title: string;
	excerpt: string;
	category: string;
	categoryKey: string;
	href: string;
	image: string;
	alt: string;
	srcset: string;
	width: number;
	height: number;
};

type ListPage = {
	page: number;
	total: number;
	totalPages: number;
	posts: Card[];
};

type ListResponse = { pages: ListPage[] };

function restore(): number {
	try {
		const n = Number(sessionStorage.getItem(KEY));
		if (Number.isFinite(n) && n >= PAGE_SIZE) return Math.floor(n);
	} catch {
		/* ignore */
	}
	return PAGE_SIZE;
}

function persist(n: number): void {
	try {
		sessionStorage.setItem(KEY, String(n));
	} catch {
		/* ignore */
	}
}

function esc(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function fillCard(li: HTMLElement, post: Card): void {
	li.hidden = false;
	li.classList.add('blog-listing__item--cv');
	li.setAttribute('data-category', post.categoryKey);
	const link = li.querySelector('a.blog-card');
	if (link instanceof HTMLAnchorElement) link.href = post.href;
	const img = li.querySelector('img');
	if (img instanceof HTMLImageElement) {
		img.loading = 'lazy';
		img.decoding = 'async';
		img.removeAttribute('fetchpriority');
		img.alt = post.alt || '';
		img.width = post.width || 400;
		img.height = post.height || 240;
		if (post.srcset) {
			img.setAttribute('srcset', post.srcset);
			img.setAttribute('sizes', CARD_SIZES);
		} else {
			img.removeAttribute('srcset');
			img.removeAttribute('sizes');
		}
		// Set src last so sizes/srcset apply before the browser picks a candidate.
		if (post.image) img.src = post.image;
	}
	const title = li.querySelector('.blog-card__title');
	if (title) title.textContent = post.title;
	const excerpt = li.querySelector('.blog-card__excerpt');
	if (excerpt) excerpt.textContent = post.excerpt;
	const cat = li.querySelector('.blog-card__category');
	if (cat) {
		const dot = cat.querySelector('.blog-card__dot');
		[...cat.childNodes].forEach((node) => {
			if (node !== dot) node.remove();
		});
		if (post.category) {
			cat.append(document.createTextNode(post.category));
			cat.removeAttribute('aria-hidden');
		} else {
			cat.setAttribute('aria-hidden', 'true');
		}
	}
}

function initBlogList(root: HTMLElement): void {
	if (root.getAttribute(INIT_ATTR) === '1') return;

	const grid = root.querySelector('[data-blog-grid]');
	const filtersEl = root.querySelector('[data-blog-filters]');
	const search = root.querySelector('[data-blog-search]');
	const searchWrap = root.querySelector('[data-blog-search-wrap]');
	const resultsEl = root.querySelector('[data-blog-search-results]');
	const liveEl = root.querySelector('[data-blog-search-live]');
	const perspectiveEl = root.querySelector('[data-blog-perspective]');
	const countEl = root.querySelector('[data-blog-count]');
	const matchEl = root.querySelector('[data-blog-matching]');
	const emptyEl = root.querySelector('[data-blog-empty]');
	const loadMore = root.querySelector<HTMLButtonElement>('#load-more');
	const statusEl = root.querySelector('[data-blog-load-status]');
	const loadMoreWrap = root.querySelector('[data-blog-load-more]');
	const template = root.querySelector('#blog-card-template');
	const api = root.getAttribute('data-api') || '/api/blog-posts';
	const searchOnly = root.hasAttribute('data-blog-search-only');

	const gridEl = grid instanceof HTMLElement ? grid : null;
	const templateEl = template instanceof HTMLTemplateElement ? template : null;
	const hasGrid = gridEl != null && templateEl != null;

	// Grid arrives via server:defer — do not mark ready until it exists,
	// unless this root is explicitly search-only (404).
	if (!hasGrid) {
		if (!searchOnly || !(search instanceof HTMLInputElement)) return;
	}

	root.setAttribute(INIT_ATTR, '1');

	let categoryId = '';
	let nextPage = hasGrid
		? Number(gridEl.getAttribute('data-page') || '1') + 1
		: 1;
	let total = hasGrid ? Number(gridEl.getAttribute('data-total') || '0') || 0 : 0;
	let loading = false;
	let debounceId = 0;
	let activeIndex = -1;
	let searchSeq = 0;
	let loadSeq = 0;
	const filterSkel = root.querySelector('[data-blog-filter-skeleton]');

	function shownCount(): number {
		if (!gridEl) return 0;
		return gridEl.querySelectorAll('[data-post-card]').length;
	}

	function paintCounts(opts?: { keepStatus?: boolean }): void {
		if (!gridEl) return;
		const shown = shownCount();
		const label = `Showing ${shown} of ${total} articles`;
		if (countEl) countEl.textContent = String(shown);
		if (matchEl) matchEl.textContent = String(total);
		// Status is only the "Showing X of Y" line (loading copy lives in the button).
		if (statusEl && !opts?.keepStatus) statusEl.textContent = label;
		const done = shown >= total || total === 0;
		if (loadMore) loadMore.hidden = done;
		if (loadMoreWrap instanceof HTMLElement) loadMoreWrap.hidden = total === 0;
		if (emptyEl instanceof HTMLElement) {
			emptyEl.hidden = shown !== 0;
		}
		persist(Math.min(Math.max(shown, PAGE_SIZE), MAX_PERSIST_CARDS));
	}

	function makeCard(post: Card): HTMLElement | null {
		if (!templateEl) return null;
		const fragment = templateEl.content.cloneNode(true);
		if (!(fragment instanceof DocumentFragment)) return null;
		const li = fragment.querySelector('[data-post-card]');
		if (!(li instanceof HTMLElement)) return null;
		fillCard(li, post);
		// Keep data-reveal so reveal.ts MutationObserver can bind.
		// Cards inside [data-blog-grid] are forced visible — never left at opacity 0.
		return li;
	}

	function buildPostFragment(posts: Card[]): {
		fragment: DocumentFragment;
		first: HTMLElement | null;
	} {
		const fragment = document.createDocumentFragment();
		let first: HTMLElement | null = null;
		for (const post of posts) {
			const li = makeCard(post);
			if (!li) continue;
			fragment.append(li);
			if (!first) first = li;
		}
		return { fragment, first };
	}

	function appendPosts(posts: Card[], focusFirst: boolean): void {
		if (!gridEl) return;
		const { fragment, first } = buildPostFragment(posts);
		gridEl.append(fragment);
		paintCounts();
		if (focusFirst) first?.querySelector('a')?.focus({ preventScroll: true });
	}

	function setLoadMoreLoading(on: boolean): void {
		if (!(loadMore instanceof HTMLButtonElement)) return;
		setButtonLoading(loadMore, on, {
			loadingLabel: on ? 'Loading articles...' : undefined,
			ariaLabel: on ? 'Loading articles...' : undefined,
			lockWidth: true,
		});
	}

	function setFilterSkeleton(visible: boolean): void {
		if (!(filterSkel instanceof HTMLElement) || !gridEl) return;
		filterSkel.hidden = !visible;
		const meta = root
			.querySelector('[data-blog-perspective]')
			?.closest('.blog-listing__meta');
		if (meta instanceof HTMLElement) meta.hidden = visible;
		if (emptyEl instanceof HTMLElement && visible) emptyEl.hidden = true;
		if (loadMoreWrap instanceof HTMLElement && visible) loadMoreWrap.hidden = true;
		if (visible) {
			gridEl.hidden = true;
			gridEl.setAttribute('aria-busy', 'true');
		} else {
			gridEl.removeAttribute('aria-busy');
		}
	}

	async function loadPages(
		pages: number[],
		opts: { replace?: boolean; focusFirst?: boolean; silent?: boolean } = {},
	): Promise<void> {
		if (!gridEl || !pages.length) return;
		const replace = Boolean(opts.replace);
		const silent = Boolean(opts.silent);
		// Load more stays serialized; category replace may supersede an in-flight fetch.
		if (loading && !replace) return;
		const seq = ++loadSeq;
		loading = true;
		const useButtonLoading = !replace && loadMore instanceof HTMLButtonElement;
		const loadStarted = performance.now();
		if (useButtonLoading) setLoadMoreLoading(true);
		else if (loadMore) loadMore.disabled = true;
		// Silent boot sync keeps SSR cards visible while refreshing from the live API
		// (CDN often serves stale HTML with broken featured-image URLs).
		if (replace && !silent) setFilterSkeleton(true);
		try {
			const params = new URLSearchParams();
			if (pages.length === 1) params.set('page', String(pages[0]));
			else params.set('pages', pages.join(','));
			if (categoryId) params.set('category', categoryId);
			const res = await fetch(`${api}?${params}`, { cache: 'no-store' });
			if (!res.ok) throw new Error(`blog list ${res.status}`);
			const body = (await res.json()) as ListResponse;
			if (seq !== loadSeq) return;
			const ordered = [...(body.pages || [])].sort((a, b) => a.page - b.page);
			if (ordered[0]) {
				total = ordered[0].total;
				gridEl.setAttribute('data-total', String(total));
			}
			const posts = ordered.flatMap((page) => page.posts);
			if (replace) {
				gridEl.replaceChildren();
				if (!silent) setFilterSkeleton(false);
			}
			if (posts.length === 0) {
				gridEl.hidden = true;
				if (emptyEl instanceof HTMLElement) {
					emptyEl.textContent = 'No articles in this category.';
				}
			} else {
				gridEl.hidden = false;
			}

			// Append immediately — never decode a batch of WP images before insert
			// (that path was crashing Chrome under memory pressure).
			if (useButtonLoading) {
				const remaining = LOAD_MORE_MIN_MS - (performance.now() - loadStarted);
				if (remaining > 0) await sleep(remaining);
				if (seq !== loadSeq) return;
			}
			appendPosts(posts, Boolean(opts.focusFirst));

			const last = ordered[ordered.length - 1];
			if (last) nextPage = last.page + 1;
		} catch (err) {
			if (seq !== loadSeq) return;
			console.error('[blog-list] load failed:', err);
			if (replace) {
				if (!silent) setFilterSkeleton(false);
				gridEl.hidden = shownCount() === 0;
			}
			if (statusEl && !silent) statusEl.textContent = "Couldn't load more articles.";
			paintCounts({ keepStatus: true });
		} finally {
			// Always clear our own button loading (even if superseded by a category replace).
			if (useButtonLoading) setLoadMoreLoading(false);
			if (seq === loadSeq) {
				loading = false;
				if (!useButtonLoading && loadMore) loadMore.disabled = false;
			}
		}
	}

	function closeResults(): void {
		if (!(searchWrap instanceof HTMLElement) || !(resultsEl instanceof HTMLElement)) return;
		if (!(search instanceof HTMLInputElement)) return;
		searchWrap.classList.remove('is-open');
		resultsEl.hidden = true;
		resultsEl.innerHTML = '';
		search.setAttribute('aria-expanded', 'false');
		search.removeAttribute('aria-activedescendant');
		activeIndex = -1;
	}

	function announce(msg: string): void {
		if (liveEl instanceof HTMLElement) liveEl.textContent = msg;
	}

	function renderHits(hits: Card[]): void {
		if (!(searchWrap instanceof HTMLElement) || !(resultsEl instanceof HTMLElement)) return;
		if (!(search instanceof HTMLInputElement)) return;
		const rows = hits.slice(0, MAX_HITS).map((h, i) => {
			const cat = h.category
				? `<span class="blog-listing__search-cat">${esc(h.category)}</span>`
				: '';
			const img = h.image
				? `<img class="blog-listing__search-thumb" src="${esc(h.image)}" alt="" width="64" height="48" loading="lazy" decoding="async">`
				: '';
			return `<a id="blog-search-option-${i}" class="blog-listing__search-option" role="option" aria-selected="false" href="${esc(h.href)}" data-search-option><span class="blog-listing__search-media">${img}</span><span class="blog-listing__search-body"><span class="blog-listing__search-title">${esc(h.title)}</span>${cat}</span></a>`;
		});
		searchWrap.classList.add('is-open');
		resultsEl.hidden = false;
		search.setAttribute('aria-expanded', 'true');
		activeIndex = -1;
		search.removeAttribute('aria-activedescendant');
		resultsEl.innerHTML = rows.length
			? rows.join('')
			: '<p class="blog-listing__search-empty" role="status">No articles found</p>';
		announce(rows.length ? `${rows.length} results` : 'No results');
	}

	async function runSearch(): Promise<void> {
		if (!(search instanceof HTMLInputElement)) return;
		const q = search.value.trim();
		if (q.length < MIN_Q) {
			closeResults();
			announce('');
			return;
		}
		const seq = ++searchSeq;
		if (searchWrap instanceof HTMLElement && resultsEl instanceof HTMLElement) {
			searchWrap.classList.add('is-open');
			resultsEl.hidden = false;
			search.setAttribute('aria-expanded', 'true');
			activeIndex = -1;
			search.removeAttribute('aria-activedescendant');
			resultsEl.innerHTML =
				'<p class="blog-listing__search-empty" role="status">Loading…</p>';
			announce('Loading results');
		}
		try {
			const params = new URLSearchParams({ search: q, per_page: String(MAX_HITS) });
			const res = await fetch(`${api}?${params}`);
			if (!res.ok) throw new Error(`blog search ${res.status}`);
			const body = (await res.json()) as ListResponse;
			if (seq !== searchSeq) return;
			renderHits(body.pages?.[0]?.posts ?? []);
		} catch (err) {
			if (seq !== searchSeq) return;
			console.error('[blog-list] search failed:', err);
			renderHits([]);
		}
	}

	function setActive(i: number): void {
		if (!(resultsEl instanceof HTMLElement)) return;
		const opts = resultsEl.querySelectorAll('[data-search-option]');
		if (!opts.length) return;
		activeIndex = ((i % opts.length) + opts.length) % opts.length;
		opts.forEach((el, j) => {
			const on = j === activeIndex;
			el.classList.toggle('is-active', on);
			el.setAttribute('aria-selected', on ? 'true' : 'false');
			if (on && el instanceof HTMLElement) {
				el.scrollIntoView({ block: 'nearest' });
				if (search instanceof HTMLInputElement && el.id) {
					search.setAttribute('aria-activedescendant', el.id);
				}
			}
		});
	}

	if (hasGrid && filtersEl instanceof HTMLElement) {
		filtersEl.addEventListener('click', (e) => {
			const chip = (e.target as Element | null)?.closest?.('[data-filter-chip]');
			if (!(chip instanceof HTMLElement) || !filtersEl.contains(chip)) return;
			filtersEl.querySelectorAll('[data-filter-chip]').forEach((o) => {
				if (!(o instanceof HTMLElement)) return;
				const on = o === chip;
				o.classList.toggle('is-active', on);
				o.setAttribute('aria-pressed', on ? 'true' : 'false');
			});
			const filter = chip.getAttribute('data-filter') || 'all';
			categoryId = filter === 'all' ? '' : chip.getAttribute('data-category-id') || '';
			if (perspectiveEl) {
				perspectiveEl.textContent =
					filter === 'all' ? 'All perspectives' : chip.textContent?.trim() || filter;
			}
			nextPage = 1;
			void loadPages([1], { replace: true });
		});
	}

	if (search instanceof HTMLInputElement) {
		search.addEventListener('input', () => {
			clearTimeout(debounceId);
			debounceId = window.setTimeout(() => void runSearch(), 180);
		});
		search.addEventListener('focus', () => {
			if (search.value.trim().length >= MIN_Q) void runSearch();
		});
		search.addEventListener('keydown', (e) => {
			const open =
				resultsEl instanceof HTMLElement &&
				!resultsEl.hidden &&
				searchWrap instanceof HTMLElement &&
				searchWrap.classList.contains('is-open');

			if (e.key === 'Escape') {
				e.preventDefault();
				search.value = '';
				closeResults();
				announce('');
				return;
			}
			if (e.key === 'Tab') {
				closeResults();
				return;
			}
			if (!open) return;
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setActive(activeIndex + 1);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setActive(activeIndex <= 0 ? 0 : activeIndex - 1);
			} else if (e.key === 'Enter') {
				const opts = resultsEl.querySelectorAll('[data-search-option]');
				if (!opts.length) return;
				e.preventDefault();
				const t = activeIndex >= 0 ? opts[activeIndex] : opts[0];
				if (t instanceof HTMLAnchorElement) location.assign(t.href);
			}
		});
	}

	document.addEventListener('pointerdown', (e) => {
		if (!(searchWrap instanceof HTMLElement)) return;
		if (e.target instanceof Node && !searchWrap.contains(e.target)) closeResults();
	});

	if (hasGrid && loadMore instanceof HTMLButtonElement) {
		loadMore.addEventListener('click', () => {
			void loadPages([nextPage], { focusFirst: true });
		});
	}

	if (!hasGrid) return;

	// Re-sync page 1 from /api/blog-posts on every load. Filter chips already do this
	// (which is why images look fine after clicking a filter). Refresh alone served
	// CDN-stale SSR HTML with 404 image URLs and removed posts like "test".
	void (async () => {
		await loadPages([1], { replace: true, silent: true });
		const wanted = Math.min(restore(), PAGE_SIZE * MAX_RESTORE_PAGES);
		const already = shownCount();
		const pagesNeeded = Math.ceil(wanted / PAGE_SIZE);
		if (!categoryId && pagesNeeded > 1 && already < wanted && total > already) {
			for (let page = 2; page <= pagesNeeded; page++) {
				await loadPages([page]);
				if (shownCount() >= wanted) break;
			}
		} else {
			paintCounts();
		}
	})();
}

let gridObserver: MutationObserver | null = null;

function boot(): void {
	const root = document.querySelector('[data-blog-listing]');
	if (!(root instanceof HTMLElement)) return;

	initBlogList(root);
	if (root.getAttribute(INIT_ATTR) === '1') {
		gridObserver?.disconnect();
		gridObserver = null;
		return;
	}

	// Grid arrives via server:defer after the shell — retry when it appears.
	// Without this, boot can run once against the skeleton and never attach search.
	gridObserver?.disconnect();
	gridObserver = new MutationObserver(() => {
		initBlogList(root);
		if (root.getAttribute(INIT_ATTR) === '1') {
			gridObserver?.disconnect();
			gridObserver = null;
		}
	});
	gridObserver.observe(root, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
	boot();
}
