/**
 * Extract blog CTA content from cleaned WordPress post HTML.
 * Supports:
 *   1. `<div class="cta-section">` — first line heading, second line text, `<a>` → button(s)
 *   2. `<h2>CTA</h2>` marker (like FAQs) followed by 1–2 content lines until FAQs / next section
 * Phone (`tel:`) → button with number only (never “Book a Service Call” in copy).
 * Service/page link + phone → both buttons; email is wired on the blog page.
 * Server-side only; never throws.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync } from 'ultrahtml';
import { SITE_PHONE } from '../data/site-contact';
import { decodeHtmlEntities } from './decode-html-entities';

export type BlogCtaContent = {
	heading: string;
	text: string;
	/** Primary button — service/page link when present, otherwise phone or default. */
	href: string;
	scrollTarget?: string;
	buttonLabel: string;
	/** Second button when both a page link and a phone number exist. */
	phoneHref?: string;
	/** Display number only (e.g. +44 330 010 4786). */
	phoneLabel?: string;
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

function isFaqWrapper(node: ElementNode): boolean {
	return hasClass(node, 'faq-items') || hasClass(node, 'faq-item');
}

function normalizeSpace(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function plainText(text: string): string {
	return decodeHtmlEntities(normalizeSpace(text));
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

type CtaAnchor = { href: string; label: string; scrollTarget?: string };

function findAllAnchors(node: Node, out: CtaAnchor[] = []): CtaAnchor[] {
	if (!isElement(node)) return out;
	/* Never harvest links from FAQ blocks nested under a broken CMS CTA wrapper. */
	if (isFaqWrapper(node)) return out;
	if (tagName(node) === 'a') {
		const href = (node.attributes?.href || '').trim();
		if (href) {
			out.push({
				href,
				label: plainText(textContent(node)),
				scrollTarget: node.attributes?.['data-scroll-target'],
			});
		}
		return out;
	}
	for (const child of node.children || []) findAllAnchors(child, out);
	return out;
}

function isTelHref(href: string): boolean {
	return /^tel:/i.test(href.trim());
}

function phoneDigits(href: string): string {
	return href.replace(/^tel:/i, '').replace(/[^\d+]/g, '');
}

function phoneButtonLabel(href: string): string {
	const digits = phoneDigits(href).replace(/\D/g, '');
	const siteDigits = SITE_PHONE.e164.replace(/\D/g, '');
	if (digits === siteDigits || digits.endsWith(siteDigits) || siteDigits.endsWith(digits)) {
		return SITE_PHONE.display;
	}
	return SITE_PHONE.display;
}

function phoneButtonHref(href: string): string {
	const digits = phoneDigits(href).replace(/\D/g, '');
	const siteDigits = SITE_PHONE.e164.replace(/\D/g, '');
	if (digits === siteDigits || digits.endsWith(siteDigits) || siteDigits.endsWith(digits)) {
		return SITE_PHONE.href;
	}
	return href.startsWith('tel:') ? href : `tel:${href}`;
}

/** Drop phone / “Book a Service Call” chrome from CTA body copy. */
function stripCtaChromeFromText(text: string): string {
	return normalizeSpace(
		text
			.replace(/\+?\d[\d\s().-]{6,}\d(?:\s*Book a Service Call)?/gi, ' ')
			.replace(/Book a Service Call/gi, ' ')
			.replace(/\s*[|·•]\s*/g, ' '),
	);
}

/** If FAQ markup leaked into CTA copy, cut before the FAQs heading / first FAQ Q. */
function stripFaqBleedFromText(text: string): string {
	const cutFaqHeading = text.search(/\bFAQs?\b/i);
	if (cutFaqHeading !== -1) {
		return normalizeSpace(text.slice(0, cutFaqHeading));
	}
	return text;
}

function classifyAnchors(anchors: CtaAnchor[]): {
	page: CtaAnchor | null;
	phone: CtaAnchor | null;
} {
	let page: CtaAnchor | null = null;
	let phone: CtaAnchor | null = null;
	for (const a of anchors) {
		if (isTelHref(a.href)) {
			if (!phone) phone = a;
			continue;
		}
		if (!page) page = a;
	}
	return { page, phone };
}

function collectBlocks(node: ElementNode): ElementNode[] {
	const blocks: ElementNode[] = [];
	for (const child of node.children || []) {
		/* CMS often omits <p> — treat direct text as a soft paragraph block. */
		if (child.type === TEXT_NODE) {
			const t = normalizeSpace(child.value ?? '');
			if (!t) continue;
			blocks.push({
				type: ELEMENT_NODE,
				name: 'p',
				attributes: {},
				children: [child],
			} as ElementNode);
			continue;
		}
		if (!isElement(child)) continue;
		if (isFaqWrapper(child)) continue;
		const name = tagName(child);
		if (name === 'br' || name === 'details') continue;
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

/** Pull nested `.faq-items` out of a CTA wrapper so extractFaqs can still find them. */
function hoistFaqWrappers(node: ElementNode): Node[] {
	const faqs: Node[] = [];
	const keep: Node[] = [];
	for (const child of node.children || []) {
		if (isElement(child) && isFaqWrapper(child)) {
			faqs.push(child);
			continue;
		}
		if (isElement(child) && child.children?.length) {
			faqs.push(...hoistFaqWrappers(child));
		}
		keep.push(child);
	}
	node.children = keep;
	return faqs;
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
	page: CtaAnchor | null,
	phone: CtaAnchor | null,
): BlogCtaContent | null {
	if (!heading && !text && !page && !phone) return null;

	const cleanHeading = plainText(stripFaqBleedFromText(stripCtaChromeFromText(heading)));
	const cleanText =
		plainText(stripFaqBleedFromText(stripCtaChromeFromText(text))) || DEFAULT_TEXT;

	if (page && phone) {
		return {
			heading: cleanHeading,
			text: cleanText,
			href: page.href,
			scrollTarget: page.scrollTarget,
			buttonLabel: page.label || DEFAULT_BUTTON_LABEL,
			phoneHref: phoneButtonHref(phone.href),
			phoneLabel: phoneButtonLabel(phone.href),
		};
	}

	if (page) {
		return {
			heading: cleanHeading,
			text: cleanText,
			href: page.href,
			scrollTarget: page.scrollTarget,
			buttonLabel: page.label || DEFAULT_BUTTON_LABEL,
		};
	}

	if (phone) {
		return {
			heading: cleanHeading,
			text: cleanText,
			href: phoneButtonHref(phone.href),
			buttonLabel: phoneButtonLabel(phone.href),
		};
	}

	return {
		heading: cleanHeading,
		text: cleanText,
		href: DEFAULT_HREF,
		buttonLabel: DEFAULT_BUTTON_LABEL,
	};
}

function isPureLinkBlock(block: ElementNode): boolean {
	const kids = (block.children || []).filter((c) => !isEmptyText(c));
	if (kids.length !== 1 || !isElement(kids[0])) return false;
	return tagName(kids[0]) === 'a';
}

function parseCtaFromBlocks(
	blocks: ElementNode[],
	anchorRoot?: ElementNode,
): BlogCtaContent | null {
	const contentBlocks = blocks.filter((b) => {
		if (isFaqWrapper(b)) return false;
		const name = tagName(b);
		// Skip nested CTA/FAQ headings if any
		if (isHeadingTag(name) && (isCtaMarker(b) || isFaqMarker(b))) return false;
		return true;
	});

	const anchors: CtaAnchor[] = [];
	if (anchorRoot) findAllAnchors(anchorRoot, anchors);
	for (const block of contentBlocks) findAllAnchors(block, anchors);
	const { page, phone } = classifyAnchors(anchors);

	const lines: string[] = [];
	for (const block of contentBlocks) {
		const name = tagName(block);
		const plain = stripFaqBleedFromText(stripCtaChromeFromText(textWithoutAnchors(block)));
		if (!plain) continue;
		// Pure link paragraph: only use for button, not as a copy line
		if (name === 'p' && isPureLinkBlock(block)) continue;
		// Standalone CTA link row (often not wrapped in <p>)
		if (name === 'a') continue;
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
			text = stripFaqBleedFromText(single.slice(q + 1).trim());
		} else {
			text = single;
		}
	}

	return buildCta(heading, text, page, phone);
}

function parseCtaSection(node: ElementNode): BlogCtaContent | null {
	return parseCtaFromBlocks(collectBlocks(node), node);
}

function removeCtaSections(nodes: Node[]): { nodes: Node[]; cta: BlogCtaContent | null } {
	let cta: BlogCtaContent | null = null;
	const out: Node[] = [];

	for (const node of nodes) {
		if (isElement(node) && hasClass(node, 'cta-section')) {
			/* CMS sometimes nests faq-items inside cta-section — keep FAQs in the HTML stream. */
			const hoistedFaqs = hoistFaqWrappers(node);
			if (!cta) cta = parseCtaSection(node);
			out.push(...hoistedFaqs);
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
		if (isElement(node) && isFaqWrapper(node)) break;
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
