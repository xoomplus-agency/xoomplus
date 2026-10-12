/**
 * /blogs — category chips + Load more (grid) and search dropdown (index only).
 * Search never filters the grid. Static, no fetches.
 */
const PAGE_SIZE = 9;
const KEY = 'xoomplus-blog-list-visible';
const INIT_ATTR = 'data-blog-list-ready';
const MIN_Q = 2;
const MAX_HITS = 6;

type SearchHit = {
	t: string;
	e: string;
	c: string;
	p: string;
	i: string;
};

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

function loadIndex(): SearchHit[] {
	const el = document.getElementById('blog-search-index');
	if (!(el instanceof HTMLScriptElement)) return [];
	try {
		const data = JSON.parse(el.textContent || '[]') as unknown;
		return Array.isArray(data) ? (data as SearchHit[]) : [];
	} catch {
		console.warn('[blog-list] invalid #blog-search-index');
		return [];
	}
}

function initBlogList(root: HTMLElement): void {
	if (root.getAttribute(INIT_ATTR) === '1') return;
	root.setAttribute(INIT_ATTR, '1');

	const grid = root.querySelector('[data-blog-grid]');
	const filtersEl = root.querySelector('[data-blog-filters]');
	const search = root.querySelector('[data-blog-search]');
	const searchWrap = root.querySelector('[data-blog-search-wrap]');
	const resultsEl = root.querySelector('[data-blog-search-results]');
	const liveEl = root.querySelector('[data-blog-search-live]');
	const cards = [...root.querySelectorAll<HTMLElement>('[data-post-card]')];
	const perspectiveEl = root.querySelector('[data-blog-perspective]');
	const countEl = root.querySelector('[data-blog-count]');
	const matchEl = root.querySelector('[data-blog-matching]');
	const emptyEl = root.querySelector('[data-blog-empty]');
	const loadMore = root.querySelector<HTMLButtonElement>('#load-more');
	const statusEl = root.querySelector('[data-blog-load-status]');
	const loadMoreWrap = root.querySelector('[data-blog-load-more]');
	const index = loadIndex();

	if (!(grid instanceof HTMLElement)) {
		console.warn('[blog-list] missing [data-blog-grid]');
		return;
	}
	if (!cards.length) {
		console.warn('[blog-list] missing [data-post-card] items');
		return;
	}

	let activeCategory = 'all';
	let visibleCount = restore();
	let debounceId = 0;
	let activeIndex = -1;

	function matchCat(card: HTMLElement, cat: string): boolean {
		return cat === 'all' || (card.getAttribute('data-category') || '') === cat;
	}

	function revealCard(card: HTMLElement, staggerIndex: number): void {
		card.style.setProperty('--i', String(Math.min(Math.max(staggerIndex, 0), 8)));
		card.classList.add('is-visible');
	}

	function applyFilters(opts?: { focusNew?: boolean; prev?: number }): void {
		const matched = cards.filter((c) => matchCat(c, activeCategory));
		const matching = matched.length;
		const show = Math.min(visibleCount, matching);
		const prev = opts?.prev ?? 0;

		requestAnimationFrame(() => {
			let i = 0;
			let firstNew: HTMLElement | null = null;
			for (const card of cards) {
				if (!matchCat(card, activeCategory)) {
					card.hidden = true;
					continue;
				}
				const idx = i++;
				const on = idx < show;
				card.hidden = !on;
				if (!on) continue;
				if (opts?.focusNew && idx >= prev && !firstNew) firstNew = card;
				revealCard(card, opts?.focusNew ? idx - prev : idx);
			}

			const label = `Showing ${show} of ${matching} articles`;
			if (countEl) countEl.textContent = String(show);
			if (matchEl) matchEl.textContent = String(matching);
			if (statusEl) statusEl.textContent = label;
			if (perspectiveEl) {
				const chip =
					filtersEl instanceof HTMLElement
						? filtersEl.querySelector<HTMLElement>(
								`[data-filter-chip][data-filter="${CSS.escape(activeCategory)}"]`,
							)
						: null;
				perspectiveEl.textContent =
					activeCategory === 'all'
						? 'All perspectives'
						: chip?.textContent?.trim() || activeCategory;
			}
			if (emptyEl instanceof HTMLElement) emptyEl.hidden = matching !== 0;
			const done = show >= matching;
			if (loadMore) loadMore.hidden = done || matching === 0;
			if (loadMoreWrap instanceof HTMLElement) loadMoreWrap.hidden = matching === 0;
			persist(visibleCount);

			if (opts?.focusNew && firstNew) {
				firstNew.querySelector('a')?.focus({ preventScroll: true });
			}
		});
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

	function searchHits(q: string): SearchHit[] {
		const titleHits: SearchHit[] = [];
		const excerptHits: SearchHit[] = [];
		for (const item of index) {
			const tl = item.t.toLowerCase();
			const el = item.e.toLowerCase();
			if (tl.includes(q)) titleHits.push(item);
			else if (el.includes(q)) excerptHits.push(item);
			if (titleHits.length + excerptHits.length >= MAX_HITS * 2) break;
		}
		return [...titleHits, ...excerptHits].slice(0, MAX_HITS);
	}

	function renderResults(): void {
		if (!(searchWrap instanceof HTMLElement) || !(resultsEl instanceof HTMLElement)) return;
		if (!(search instanceof HTMLInputElement)) return;
		const q = search.value.trim().toLowerCase();
		if (q.length < MIN_Q) {
			closeResults();
			announce('');
			return;
		}
		const hits = searchHits(q);
		const rows = hits.map((h, i) => {
			const cat = h.c
				? `<span class="blog-listing__search-cat">${esc(h.c)}</span>`
				: '';
			const img = h.i
				? `<img class="blog-listing__search-thumb" src="${esc(h.i)}" alt="" width="64" height="48" loading="lazy" decoding="async">`
				: '';
			return `<a id="blog-search-option-${i}" class="blog-listing__search-option" role="option" aria-selected="false" href="${esc(h.p)}" data-search-option><span class="blog-listing__search-media">${img}</span><span class="blog-listing__search-body"><span class="blog-listing__search-title">${esc(h.t)}</span>${cat}</span></a>`;
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

	if (filtersEl instanceof HTMLElement) {
		filtersEl.addEventListener('click', (e) => {
			const chip = (e.target as Element | null)?.closest?.('[data-filter-chip]');
			if (!(chip instanceof HTMLElement) || !filtersEl.contains(chip)) return;
			filtersEl.querySelectorAll('[data-filter-chip]').forEach((o) => {
				if (!(o instanceof HTMLElement)) return;
				const on = o === chip;
				o.classList.toggle('is-active', on);
				o.setAttribute('aria-pressed', on ? 'true' : 'false');
			});
			activeCategory = chip.getAttribute('data-filter') || 'all';
			visibleCount = PAGE_SIZE;
			applyFilters();
		});
	}

	if (search instanceof HTMLInputElement) {
		search.addEventListener('input', () => {
			clearTimeout(debounceId);
			debounceId = window.setTimeout(renderResults, 120);
		});
		search.addEventListener('focus', () => {
			if (search.value.trim().length >= MIN_Q) renderResults();
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

	if (loadMore instanceof HTMLButtonElement) {
		loadMore.addEventListener('click', () => {
			const matching = cards.filter((c) => matchCat(c, activeCategory)).length;
			const prev = Math.min(visibleCount, matching);
			visibleCount += PAGE_SIZE;
			applyFilters({ focusNew: true, prev });
		});
	}

	const total = Number(grid.getAttribute('data-total') || cards.length) || cards.length;
	if (visibleCount > total) visibleCount = Math.max(PAGE_SIZE, total);

	applyFilters();
}

function boot(): void {
	const root = document.querySelector('[data-blog-listing]');
	if (!(root instanceof HTMLElement)) return;
	initBlogList(root);
}

boot();
document.addEventListener('astro:page-load', boot);
