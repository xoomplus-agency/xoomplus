/**
 * Extract blog CTA content from cleaned WordPress post HTML.
 * Supports:
 *   1. `<div class="cta-section">` — first line heading, second line text, `<a>` → button
 *   2. `<h2>CTA</h2>` marker (like FAQs) followed by 1–2 content lines until FAQs / next section
 * Server-side only; never throws.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync } from 'ultrahtml';

export type BlogCtaContent = {
	heading: string;
	text: string;
	href: string;
	buttonLabel: string;
};

export type ExtractCtaResult = {
	html: string;
	cta: BlogCtaContent | null;
};

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

const BLOCK_TAGS = new Set(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'li']);

const CTA_MARKERS = new Set(['cta', 'call to action', 'call-to-action']);
const FAQ_MARKERS = new Set([
	'faqs',
	'faq',
	"faq's",
	'frequently asked questions',
]);

const DEFAULT_TEXT =
	"Tell us what you're working towards. We'll explore the challenge, the possibilities and the right place to start.";
const DEFAULT_HREF = '#contact';
const DEFAULT_BUTTON_LABEL = 'Discuss your project';

function untouched(html: string): ExtractCtaResult {
	return { html, cta: null };
}

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

function normalizeSpace(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function textContent(node: Node): string {
	if (node.type === TEXT_NODE) return node.value ?? '';
	if (!isElement(node) || !node.children) return '';
	return node.children.map(textContent).join('');
}

function renderNodes(nodes: Node[]): string {
	if (!nodes.length) return '';
	const ast = parse('<div></div>');
	const wrap = ast.children?.[0];
	if (!isElement(wrap)) return '';
	wrap.children = nodes;
	const html = renderSync(wrap);
	return html.replace(/^<div>/i, '').replace(/<\/div>$/i, '').trim();
}

function isEmptyText(node: Node): boolean {
	return node.type === TEXT_NODE && !normalizeSpace(node.value ?? '');
}

/** Plain text with anchor tags unwrapped (link label kept as plain text). */
function textWithoutAnchors(node: Node): string {
	if (node.type === TEXT_NODE) return node.value ?? '';
	if (!isElement(node) || !node.children) return '';
	if (tagName(node) === 'a') {
		return node.children.map(textWithoutAnchors).join('');
	}
	return node.children.map(textWithoutAnchors).join('');
}

function findFirstAnchor(node: Node): { href: string; label: string } | null {
	if (!isElement(node)) return null;
	if (tagName(node) === 'a') {
		const href = (node.attributes?.href || '').trim();
		if (href) {
			return { href, label: normalizeSpace(textContent(node)) };
		}
	}
	for (const child of node.children || []) {
		const found = findFirstAnchor(child);
		if (found) return found;
	}
	return null;
}

function collectBlocks(node: ElementNode): ElementNode[] {
	const blocks: ElementNode[] = [];
	for (const child of node.children || []) {
		if (!isElement(child)) continue;
		const name = tagName(child);
		if (name === 'br') continue;
		if (BLOCK_TAGS.has(name)) {
			if (normalizeSpace(textContent(child))) blocks.push(child);
			continue;
		}
		if (name === 'span' || name === 'section') {
			blocks.push(...collectBlocks(child));
		}
	}
	return blocks;
}

function isHeadingTag(name: string): boolean {
	return /^h[1-6]$/.test(name);
}

function isCtaMarker(node: Node): boolean {
	if (!isElement(node) || !isHeadingTag(tagName(node))) return false;
	return CTA_MARKERS.has(normalizeSpace(textContent(node)).toLowerCase());
}

function isFaqMarker(node: Node): boolean {
	if (!isElement(node) || !isHeadingTag(tagName(node))) return false;
	return FAQ_MARKERS.has(normalizeSpace(textContent(node)).toLowerCase());
}

function buildCta(
	heading: string,
	text: string,
	anchor: { href: string; label: string } | null,
): BlogCtaContent | null {
	if (!heading && !text && !anchor) return null;
	return {
		heading,
		text: text || DEFAULT_TEXT,
		href: anchor?.href || DEFAULT_HREF,
		buttonLabel: anchor?.label || DEFAULT_BUTTON_LABEL,
	};
}

function parseCtaFromBlocks(
	blocks: ElementNode[],
	anchorRoot?: ElementNode,
): BlogCtaContent | null {
	const contentBlocks = blocks.filter((b) => {
		const name = tagName(b);
		// Skip nested CTA/FAQ headings if any
		if (isHeadingTag(name) && (isCtaMarker(b) || isFaqMarker(b))) return false;
		return true;
	});

	let anchor: { href: string; label: string } | null = anchorRoot
		? findFirstAnchor(anchorRoot)
		: null;
	if (!anchor) {
		for (const block of contentBlocks) {
			anchor = findFirstAnchor(block);
			if (anchor) break;
		}
	}

	const lines: string[] = [];
	for (const block of contentBlocks) {
		const name = tagName(block);
		const plain = normalizeSpace(textWithoutAnchors(block));
		if (!plain) continue;
		// Pure link paragraph: only use for button, not as a copy line
		if (
			name === 'p' &&
			block.children?.length === 1 &&
			isElement(block.children[0]) &&
			tagName(block.children[0]) === 'a'
		) {
			continue;
		}
		lines.push(plain);
	}

	let heading = '';
	let text = '';
	if (lines.length >= 2) {
		heading = lines[0];
		text = lines[1];
	} else if (lines.length === 1) {
		// Single CMS line: split on first "?" so the question becomes the heading
		const single = lines[0];
		const q = single.indexOf('?');
		if (q !== -1 && q < single.length - 1) {
			heading = single.slice(0, q + 1).trim();
			text = single.slice(q + 1).trim();
		} else {
			text = single;
		}
	}

	return buildCta(heading, text, anchor);
}

function parseCtaSection(node: ElementNode): BlogCtaContent | null {
	return parseCtaFromBlocks(collectBlocks(node), node);
}

function removeCtaSections(nodes: Node[]): { nodes: Node[]; cta: BlogCtaContent | null } {
	let cta: BlogCtaContent | null = null;
	const out: Node[] = [];

	for (const node of nodes) {
		if (isElement(node) && hasClass(node, 'cta-section')) {
			if (!cta) cta = parseCtaSection(node);
			continue;
		}
		if (isElement(node) && node.children?.length) {
			const nested = removeCtaSections(node.children);
			node.children = nested.nodes;
			if (!cta && nested.cta) cta = nested.cta;
			out.push(node);
			continue;
		}
		out.push(node);
	}

	return { nodes: out, cta };
}

/**
 * `<h2>CTA</h2>` + following paragraphs until FAQs / next section.
 */
function extractFromHeadingPattern(rootChildren: Node[]): ExtractCtaResult | null {
	const markerIndex = rootChildren.findIndex(isCtaMarker);
	if (markerIndex === -1) return null;

	const blocks: ElementNode[] = [];
	let i = markerIndex + 1;
	let consumedUntil = markerIndex + 1;

	while (i < rootChildren.length) {
		const node = rootChildren[i];
		if (isEmptyText(node)) {
			i += 1;
			continue;
		}
		if (isCtaMarker(node) || isFaqMarker(node)) break;
		if (isElement(node) && isHeadingTag(tagName(node))) {
			// Another real section heading ends the CTA block
			break;
		}
		if (isElement(node)) {
			blocks.push(node);
			i += 1;
			consumedUntil = i;
			// Cap at a few blocks (heading + text + optional link)
			if (blocks.length >= 3) break;
			continue;
		}
		break;
	}

	const cta = parseCtaFromBlocks(blocks);
	if (!cta) return null;

	const before = renderNodes(rootChildren.slice(0, markerIndex));
	const after = renderNodes(rootChildren.slice(consumedUntil));
	const html = [before, after].filter(Boolean).join('\n').trim();

	return { html, cta };
}

/**
 * Pull CTA content out of post HTML and return remaining HTML + CTA fields.
 */
export function extractCta(html: string): ExtractCtaResult {
	try {
		if (!html || !html.trim()) return untouched(html ?? '');

		const hasClassBlock = /cta-section/i.test(html);
		const hasHeadingMarker = /<h[1-6][^>]*>\s*CTA\s*<\/h[1-6]>/i.test(html) ||
			/<h[1-6][^>]*>\s*Call to [Aa]ction\s*<\/h[1-6]>/i.test(html);

		if (!hasClassBlock && !hasHeadingMarker) return untouched(html);

		const ast = parse(html);
		const rootChildren = ast.children || [];

		if (hasClassBlock) {
			const { nodes, cta } = removeCtaSections(rootChildren);
			if (cta) {
				ast.children = nodes;
				return { html: renderSync(ast).trim(), cta };
			}
		}

		const fromHeading = extractFromHeadingPattern(rootChildren);
		if (fromHeading) return fromHeading;

		return untouched(html);
	} catch {
		return untouched(html ?? '');
	}
}
