/**
 * Enhance WordPress `content.rendered` for Astro blog prose (tables + callouts).
 * Server-side only. Uses ultrahtml — never regex-parse nested HTML. Never throws.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync } from 'ultrahtml';

type Node = {
	type: number;
	name?: string;
	value?: string;
	attributes?: Record<string, string>;
	children?: Node[];
};

type ElementNode = Node & {
	type: typeof ELEMENT_NODE;
	name: string;
	attributes: Record<string, string>;
	children: Node[];
};

const STRIP_ATTRS = new Set([
	'style',
	'width',
	'height',
	'bgcolor',
	'align',
	'valign',
]);

const STRIP_TAGS = new Set(['table', 'tr', 'td', 'th', 'span']);

const CALLOUT_CLASSES = new Set(['custom-callout', 'key-takeaways']);

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/** WP block / typography classes that fight global heading tokens. */
const HEADING_DROP_CLASS = /^(?:has-.+-font-size|has-text-align-.+)$/i;

function isElement(node: Node | null | undefined): node is ElementNode {
	return !!node && node.type === ELEMENT_NODE && typeof node.name === 'string';
}

function tagName(node: ElementNode): string {
	return node.name.toLowerCase();
}

function classList(node: ElementNode): string[] {
	const raw = node.attributes?.class;
	if (!raw || typeof raw !== 'string') return [];
	return raw.split(/\s+/).filter(Boolean);
}

function hasClass(node: ElementNode, name: string): boolean {
	return classList(node).includes(name);
}

function addClass(node: ElementNode, name: string): void {
	const list = classList(node);
	if (!list.includes(name)) {
		node.attributes = { ...(node.attributes || {}), class: [...list, name].join(' ') };
	}
}

function normalizeSpace(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function textContent(node: Node): string {
	if (node.type === TEXT_NODE) return node.value ?? '';
	if (!isElement(node) || !node.children) return '';
	return node.children.map(textContent).join('');
}

function isEmptyText(node: Node): boolean {
	return node.type === TEXT_NODE && !normalizeSpace(node.value ?? '');
}

function elementChildren(node: ElementNode): ElementNode[] {
	return (node.children || []).filter(isElement);
}

function rowCells(row: ElementNode): ElementNode[] {
	return elementChildren(row).filter((c) => {
		const t = tagName(c);
		return t === 'td' || t === 'th';
	});
}

function colspanOf(cell: ElementNode): number {
	const raw = cell.attributes?.colspan;
	const n = raw ? Number.parseInt(raw, 10) : 1;
	return Number.isFinite(n) && n > 0 ? n : 1;
}

function rowSpanWidth(row: ElementNode): number {
	return rowCells(row).reduce((sum, cell) => sum + colspanOf(cell), 0);
}

function collectRows(table: ElementNode): ElementNode[] {
	const rows: ElementNode[] = [];
	const walk = (node: ElementNode) => {
		const name = tagName(node);
		if (name === 'tr') {
			rows.push(node);
			return;
		}
		if (name === 'thead' || name === 'tbody' || name === 'tfoot' || name === 'table') {
			for (const child of elementChildren(node)) walk(child);
		}
	};
	walk(table);
	return rows;
}

function getThead(table: ElementNode): ElementNode | null {
	return elementChildren(table).find((c) => tagName(c) === 'thead') ?? null;
}

function getTbody(table: ElementNode): ElementNode | null {
	return elementChildren(table).find((c) => tagName(c) === 'tbody') ?? null;
}

function columnCount(table: ElementNode): number {
	const rows = collectRows(table);
	let max = 0;
	for (const row of rows) {
		max = Math.max(max, rowSpanWidth(row));
	}
	return Math.max(max, 1);
}

function parseFontWeight(style: string | undefined): number | null {
	if (!style) return null;
	const match = /font-weight\s*:\s*([^;]+)/i.exec(style);
	if (!match) return null;
	const raw = match[1].trim().toLowerCase();
	if (raw === 'bold' || raw === 'bolder') return 700;
	const n = Number.parseInt(raw, 10);
	return Number.isFinite(n) ? n : null;
}

function hasHeadingDescendant(node: ElementNode): boolean {
	if (HEADING_TAGS.has(tagName(node))) return true;
	return elementChildren(node).some(hasHeadingDescendant);
}

/** True when all meaningful text is inside <b>/<strong> or font-weight >= 600. */
function isFullyBold(node: ElementNode): boolean {
	let sawText = false;
	let allBold = true;

	const walk = (n: Node, boldContext: boolean) => {
		if (n.type === TEXT_NODE) {
			if (!normalizeSpace(n.value ?? '')) return;
			sawText = true;
			if (!boldContext) allBold = false;
			return;
		}
		if (!isElement(n)) return;

		const name = tagName(n);
		const weight = parseFontWeight(n.attributes?.style);
		const nextBold =
			boldContext ||
			name === 'b' ||
			name === 'strong' ||
			(weight !== null && weight >= 600);

		for (const child of n.children || []) {
			walk(child, nextBold);
		}
	};

	const selfWeight = parseFontWeight(node.attributes?.style);
	const startBold = selfWeight !== null && selfWeight >= 600;
	walk(node, startBold);
	return sawText && allBold;
}

function isTitleRow(row: ElementNode, cols: number): boolean {
	const cells = rowCells(row);
	if (cells.length !== 1) return false;
	const cell = cells[0];
	if (colspanOf(cell) < cols) return false;
	if (!normalizeSpace(textContent(cell))) return false;
	return hasHeadingDescendant(cell) || isFullyBold(cell);
}

function isPlainThHeaderRow(row: ElementNode): boolean {
	const cells = rowCells(row);
	if (cells.length < 1) return false;
	// Title rows are a single spanning cell — not plain column headers.
	if (cells.length === 1 && colspanOf(cells[0]) > 1) return false;
	return cells.every((c) => tagName(c) === 'th');
}

function isBoldHeaderRow(row: ElementNode): boolean {
	const cells = rowCells(row);
	if (cells.length < 1) return false;
	if (cells.length === 1 && colspanOf(cells[0]) > 1) return false;
	return cells.every(isFullyBold);
}

function markTocExcludedHeadings(node: ElementNode): void {
	if (HEADING_TAGS.has(tagName(node))) {
		node.attributes = { ...(node.attributes || {}), 'data-toc-exclude': '' };
	}
	for (const child of elementChildren(node)) {
		markTocExcludedHeadings(child);
	}
}

function stripPresentationAttrs(node: ElementNode): void {
	const name = tagName(node);
	if (STRIP_TAGS.has(name) && node.attributes) {
		const next: Record<string, string> = {};
		for (const [key, value] of Object.entries(node.attributes)) {
			if (STRIP_ATTRS.has(key.toLowerCase())) continue;
			next[key] = value;
		}
		node.attributes = next;
	}
	for (const child of elementChildren(node)) {
		stripPresentationAttrs(child);
	}
}

function isCalloutBox(node: ElementNode): boolean {
	return classList(node).some((c) => CALLOUT_CLASSES.has(c));
}

/** Drop inline style on callout containers so theme CSS owns the look. */
function stripCalloutContainerStyle(node: ElementNode): void {
	if (!node.attributes) return;
	const next: Record<string, string> = {};
	for (const [key, value] of Object.entries(node.attributes)) {
		if (key.toLowerCase() === 'style') continue;
		next[key] = value;
	}
	node.attributes = next;
}

function enhanceCalloutBox(node: ElementNode): void {
	stripCalloutContainerStyle(node);
	markTocExcludedHeadings(node);
}

function isHeading(node: ElementNode): boolean {
	return HEADING_TAGS.has(tagName(node));
}

function unwrapDecorativeSpans(node: ElementNode): void {
	const next: Node[] = [];
	for (const child of node.children || []) {
		if (!isElement(child)) {
			next.push(child);
			continue;
		}
		unwrapDecorativeSpans(child);
		const name = tagName(child);
		if (name === 'span') {
			const attrs = child.attributes || {};
			const keys = Object.keys(attrs).filter((k) => attrs[k] !== undefined && attrs[k] !== '');
			const onlyEmptyClass =
				keys.length === 0 ||
				(keys.length === 1 && keys[0] === 'class' && !attrs.class?.trim());
			if (onlyEmptyClass) {
				next.push(...(child.children || []));
				continue;
			}
		}
		next.push(child);
	}
	node.children = next;
}

/** Strip WP presentation from headings; demote content <h1> → <h2 class="post-h1">. */
function enhanceHeading(node: ElementNode): ElementNode {
	unwrapDecorativeSpans(node);

	const attrs = { ...(node.attributes || {}) };
	delete attrs.style;

	const classes = (attrs.class || '')
		.split(/\s+/)
		.filter(Boolean)
		.filter((c) => !HEADING_DROP_CLASS.test(c));

	if (tagName(node) === 'h1') {
		node.name = 'h2';
		if (!classes.includes('post-h1')) classes.push('post-h1');
	}

	if (classes.length) attrs.class = classes.join(' ');
	else delete attrs.class;

	node.attributes = attrs;
	return node;
}

function enhanceTable(table: ElementNode): ElementNode {
	const cols = columnCount(table);
	addClass(table, `bt-cols-${cols}`);

	const thead = getThead(table);
	const tbody = getTbody(table);
	const allRows = collectRows(table);

	let titleRow: ElementNode | null = null;
	if (thead) {
		const theadRows = collectRows(thead);
		if (theadRows[0] && isTitleRow(theadRows[0], cols)) {
			titleRow = theadRows[0];
		}
	}
	if (!titleRow && allRows[0] && isTitleRow(allRows[0], cols)) {
		titleRow = allRows[0];
	}
	if (titleRow) addClass(titleRow, 'bt-title');

	let headRow: ElementNode | null = null;

	if (thead) {
		const theadRows = collectRows(thead);
		for (const row of theadRows) {
			if (row === titleRow) continue;
			if (isPlainThHeaderRow(row) || isBoldHeaderRow(row)) {
				headRow = row;
				break;
			}
		}
	}

	if (!headRow && tbody) {
		const bodyRows = collectRows(tbody);
		const candidate = bodyRows.find((r) => r !== titleRow) ?? null;
		if (candidate && isBoldHeaderRow(candidate)) {
			headRow = candidate;
		}
	}

	if (!headRow && !thead && allRows.length) {
		const candidate = allRows.find((r) => r !== titleRow) ?? null;
		if (candidate && (isPlainThHeaderRow(candidate) || isBoldHeaderRow(candidate))) {
			headRow = candidate;
		}
	}

	if (headRow) addClass(headRow, 'bt-head');

	markTocExcludedHeadings(table);
	stripPresentationAttrs(table);

	return {
		type: ELEMENT_NODE,
		name: 'div',
		attributes: { class: 'blog-table-wrap' },
		children: [table],
	} as ElementNode;
}

function unwrapExistingWrap(node: ElementNode): ElementNode | null {
	const classes = classList(node);
	if (
		tagName(node) === 'div' &&
		(classes.includes('table-wrap') || classes.includes('blog-table-wrap'))
	) {
		const tables = elementChildren(node).filter((c) => tagName(c) === 'table');
		if (tables.length === 1 && elementChildren(node).length === 1) {
			return tables[0];
		}
	}
	return null;
}

function processNodes(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (!isElement(node)) {
			out.push(node);
			continue;
		}

		const existingTable = unwrapExistingWrap(node);
		if (existingTable) {
			existingTable.children = processNodes(existingTable.children || []);
			out.push(enhanceTable(existingTable));
			continue;
		}

		node.children = processNodes(node.children || []);

		if (isCalloutBox(node)) {
			enhanceCalloutBox(node);
			out.push(node);
			continue;
		}

		if (tagName(node) === 'table') {
			out.push(enhanceTable(node));
			continue;
		}

		if (isHeading(node)) {
			out.push(enhanceHeading(node));
			continue;
		}

		out.push(node);
	}
	return out;
}

/**
 * Wrap/classify tables and normalize callout boxes in post HTML for `.prose-blog`.
 * On any error, returns the original html unchanged.
 */
export function enhanceTables(html: string): string {
	try {
		if (!html || !html.trim()) return html ?? '';
		const ast = parse(html);
		ast.children = processNodes(ast.children || []);
		return renderSync(ast);
	} catch {
		return html ?? '';
	}
}
