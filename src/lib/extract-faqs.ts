/**
 * Extract FAQ Q&A pairs from WordPress `content.rendered` (after Elementor clean).
 * Server-side only. Uses ultrahtml — never regex-parse nested HTML. Never throws.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync } from 'ultrahtml';

export type FaqPair = {
	question: string;
	answerHtml: string;
};

export type ExtractFaqsResult = {
	before: string;
	faqs: FaqPair[];
	after: string;
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

const FAQ_MARKERS = new Set([
	'faqs',
	'faq',
	"faq's",
	'frequently asked questions',
]);

const ANSWER_ALLOW_TAGS = new Set([
	'p',
	'a',
	'ul',
	'ol',
	'li',
	'strong',
	'b',
	'em',
	'i',
	'br',
	'span',
	'blockquote',
	'code',
	'pre',
	'h3',
	'h4',
	'h5',
	'h6',
]);

const ANSWER_ALLOW_ATTR: Record<string, Set<string>> = {
	a: new Set(['href', 'title', 'rel', 'target']),
	span: new Set([]),
};

function untouched(html: string): ExtractFaqsResult {
	return { before: html, faqs: [], after: '' };
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

function isEmptyText(node: Node): boolean {
	return node.type === TEXT_NODE && !normalizeSpace(node.value ?? '');
}

function isFaqMarkerText(text: string): boolean {
	return FAQ_MARKERS.has(normalizeSpace(text).toLowerCase());
}

/** Entire content is one or more <strong>/<b> wrapping only text (and nested strong/b). */
function isStrongOnlyBlock(node: ElementNode): boolean {
	const children = (node.children || []).filter((c) => !isEmptyText(c));
	if (children.length === 0) return false;
	return children.every((child) => {
		if (!isElement(child)) return false;
		const t = tagName(child);
		if (t !== 'strong' && t !== 'b') return false;
		return onlyTextAndStrong(child);
	});
}

function onlyTextAndStrong(node: ElementNode): boolean {
	for (const child of node.children || []) {
		if (child.type === TEXT_NODE) continue;
		if (!isElement(child)) return false;
		const t = tagName(child);
		if (t !== 'strong' && t !== 'b') return false;
		if (!onlyTextAndStrong(child)) return false;
	}
	return true;
}

function isFaqMarker(node: Node): boolean {
	if (!isElement(node)) return false;
	const name = tagName(node);
	const text = normalizeSpace(textContent(node));
	if (!isFaqMarkerText(text)) return false;
	if (name === 'h2' || name === 'h3' || name === 'h4') return true;
	if (name === 'p' && isStrongOnlyBlock(node)) return true;
	return false;
}

function isHeadingQuestion(node: ElementNode): boolean {
	const name = tagName(node);
	return name === 'h3' || name === 'h4' || name === 'h5';
}

function isQuestionBlock(node: Node): boolean {
	if (!isElement(node)) return false;
	const name = tagName(node);
	if (name === 'details') return true;
	if (isHeadingQuestion(node)) return true;
	if ((name === 'p' || name === 'div') && isStrongOnlyBlock(node)) return true;
	return false;
}

function isSectionEnd(node: Node): boolean {
	if (!isElement(node)) return false;
	return tagName(node) === 'h2' && !isFaqMarker(node);
}

function sanitizeAnswerHtml(html: string): string {
	if (!html || !html.trim()) return '';
	try {
		const ast = parse(html);
		ast.children = sanitizeNodes(ast.children || []);
		const out = renderSync(ast).trim();
		return normalizeSpace(out) ? out : '';
	} catch {
		return '';
	}
}

function sanitizeNodes(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (node.type === TEXT_NODE) {
			out.push(node);
			continue;
		}
		if (!isElement(node)) continue;
		const name = tagName(node);
		if (name === 'script' || name === 'style' || name === 'iframe' || name === 'object') {
			continue;
		}
		node.children = sanitizeNodes(node.children || []);
		if (!ANSWER_ALLOW_TAGS.has(name)) {
			out.push(...(node.children || []));
			continue;
		}
		const allowed = ANSWER_ALLOW_ATTR[name];
		const nextAttrs: Record<string, string> = {};
		if (allowed && node.attributes) {
			for (const [key, value] of Object.entries(node.attributes)) {
				const k = key.toLowerCase();
				if (k.startsWith('on')) continue;
				if (allowed.has(k)) nextAttrs[k] = value;
			}
			if (name === 'a' && nextAttrs.href) {
				const href = nextAttrs.href.trim();
				if (/^\s*javascript:/i.test(href)) delete nextAttrs.href;
			}
		} else {
			node.attributes = {};
		}
		node.attributes = nextAttrs;
		out.push(node);
	}
	return out;
}

function renderNodes(nodes: Node[]): string {
	if (!nodes.length) return '';
	return nodes
		.map((node) => {
			if (node.type === TEXT_NODE) return node.value ?? '';
			return renderSync(node);
		})
		.join('')
		.trim();
}

function questionFromBlock(node: ElementNode): string {
	if (tagName(node) === 'details') {
		const summary = (node.children || []).find(
			(c) => isElement(c) && tagName(c) === 'summary',
		) as ElementNode | undefined;
		return normalizeSpace(summary ? textContent(summary) : textContent(node));
	}
	return normalizeSpace(textContent(node));
}

function answerFromDetails(node: ElementNode): string {
	const parts = (node.children || []).filter(
		(c) => !(isElement(c) && tagName(c) === 'summary') && !isEmptyText(c),
	);
	return sanitizeAnswerHtml(renderNodes(parts));
}

function findYoastSections(root: Node): ElementNode[] {
	const found: ElementNode[] = [];
	const walk = (node: Node) => {
		if (isElement(node)) {
			if (hasClass(node, 'schema-faq-section')) found.push(node);
			for (const child of node.children || []) walk(child);
		}
	};
	walk(root);
	return found;
}

function extractYoastPair(section: ElementNode): FaqPair | null {
	let question = '';
	const answerParts: Node[] = [];
	for (const child of section.children || []) {
		if (!isElement(child)) {
			if (!isEmptyText(child)) answerParts.push(child);
			continue;
		}
		if (hasClass(child, 'schema-faq-question') || classList(child).some((c) => c.includes('schema-faq-question'))) {
			question = normalizeSpace(textContent(child));
			continue;
		}
		if (hasClass(child, 'schema-faq-answer') || classList(child).some((c) => c.includes('schema-faq-answer'))) {
			answerParts.push(...(child.children?.length ? child.children : [child]));
			continue;
		}
	}
	// Fallback: strong question + following siblings inside section
	if (!question) {
		const kids = (section.children || []).filter((c) => !isEmptyText(c));
		const qEl = kids.find((c) => isElement(c) && (tagName(c) === 'strong' || hasClass(c as ElementNode, 'schema-faq-question')));
		if (qEl && isElement(qEl)) {
			question = normalizeSpace(textContent(qEl));
			const qi = kids.indexOf(qEl);
			answerParts.push(...kids.slice(qi + 1));
		}
	}
	const answerHtml = sanitizeAnswerHtml(renderNodes(answerParts));
	if (!question || !answerHtml) return null;
	return { question, answerHtml };
}

function containsYoastSection(node: Node): boolean {
	if (isElement(node) && hasClass(node, 'schema-faq-section')) return true;
	if (!isElement(node)) return false;
	return (node.children || []).some(containsYoastSection);
}

function extractFromYoast(rootChildren: Node[]): ExtractFaqsResult | null {
	const root = {
		type: ELEMENT_NODE,
		name: 'root',
		attributes: {},
		children: rootChildren,
	} as ElementNode;
	const sections = findYoastSections(root);
	if (!sections.length) return null;

	const faqs: FaqPair[] = [];
	for (const section of sections) {
		const pair = extractYoastPair(section);
		if (pair) faqs.push(pair);
	}
	if (!faqs.length) return null;

	const faqIndex = rootChildren.findIndex(containsYoastSection);
	if (faqIndex === -1) return null;

	// Consume consecutive top-level FAQ wrappers
	let end = faqIndex + 1;
	while (end < rootChildren.length && containsYoastSection(rootChildren[end])) {
		end += 1;
	}

	return {
		before: renderNodes(rootChildren.slice(0, faqIndex)),
		faqs,
		after: renderNodes(rootChildren.slice(end)),
	};
}

function extractFromHeadingPattern(rootChildren: Node[]): ExtractFaqsResult | null {
	const markerIndex = rootChildren.findIndex(isFaqMarker);
	if (markerIndex === -1) return null;

	const faqs: FaqPair[] = [];
	let i = markerIndex + 1;
	let consumedUntil = markerIndex + 1;

	while (i < rootChildren.length) {
		const node = rootChildren[i];
		if (isEmptyText(node)) {
			i += 1;
			continue;
		}
		if (isSectionEnd(node)) break;

		if (isElement(node) && tagName(node) === 'details') {
			const question = questionFromBlock(node);
			const answerHtml = answerFromDetails(node);
			if (question && answerHtml) {
				faqs.push({ question, answerHtml });
				i += 1;
				consumedUntil = i;
				continue;
			}
			break;
		}

		if (isQuestionBlock(node) && isElement(node)) {
			const question = questionFromBlock(node);
			i += 1;
			const answerNodes: Node[] = [];
			while (i < rootChildren.length) {
				const next = rootChildren[i];
				if (isEmptyText(next)) {
					i += 1;
					continue;
				}
				if (isSectionEnd(next) || isQuestionBlock(next) || isFaqMarker(next)) break;
				answerNodes.push(next);
				i += 1;
			}
			const answerHtml = sanitizeAnswerHtml(renderNodes(answerNodes));
			if (question && answerHtml) {
				faqs.push({ question, answerHtml });
				consumedUntil = i;
				continue;
			}
			break;
		}

		// Non-question content after the marker — end of FAQ section
		break;
	}

	if (!faqs.length) return null;

	return {
		before: renderNodes(rootChildren.slice(0, markerIndex)),
		faqs,
		after: renderNodes(rootChildren.slice(consumedUntil)),
	};
}

/**
 * Split HTML into content before the FAQ section, extracted Q&A pairs, and content after.
 * Returns the original HTML as `before` (faqs empty) when nothing usable is found.
 */
export function extractFaqs(html: string): ExtractFaqsResult {
	try {
		if (!html || !html.trim()) return untouched(html ?? '');

		const ast = parse(html);
		const rootChildren = ast.children || [];

		const yoast = extractFromYoast(rootChildren);
		if (yoast && yoast.faqs.length > 0) return yoast;

		const heading = extractFromHeadingPattern(rootChildren);
		if (heading && heading.faqs.length > 0) return heading;

		return untouched(html);
	} catch {
		return untouched(html ?? '');
	}
}
