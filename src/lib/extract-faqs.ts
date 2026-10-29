/**
 * Extract FAQ Q&A pairs from WordPress `content.rendered`.
 * Only blocks with class `faq-items` are used — wrap CMS FAQs in that class.
 * Supports:
 *   - Bootstrap: <h3><button>Question</button></h3> + answer siblings
 *   - Elementor: <details><summary>Question</summary>Answer</details>
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
	'h4',
	'h5',
	'h6',
]);

const ANSWER_ALLOW_ATTR: Record<string, Set<string>> = {
	a: new Set(['href', 'title', 'rel', 'target']),
	span: new Set([]),
};

const STRIP_TAGS = new Set([
	'button',
	'script',
	'style',
	'iframe',
	'object',
	'svg',
	'noscript',
]);

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

function isFaqTitleHeading(node: ElementNode): boolean {
	const name = tagName(node);
	if (name !== 'h2' && name !== 'h3' && name !== 'h4') return false;
	const t = normalizeSpace(textContent(node)).toLowerCase();
	return t === 'faqs' || t === 'faq' || t === "faq's" || t === 'frequently asked questions';
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
		if (STRIP_TAGS.has(name)) continue;
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

function ensureAnswerHtml(html: string): string {
	const trimmed = html.trim();
	if (!trimmed) return '';
	if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
	return `<p>${trimmed}</p>`;
}

function textWithoutStripTags(node: Node): string {
	if (node.type === TEXT_NODE) return node.value ?? '';
	if (!isElement(node)) return '';
	if (STRIP_TAGS.has(tagName(node))) return '';
	return (node.children || []).map(textWithoutStripTags).join('');
}

function questionFromDetails(node: ElementNode): string {
	const summary = (node.children || []).find(
		(c) => isElement(c) && tagName(c) === 'summary',
	) as ElementNode | undefined;
	if (!summary) return normalizeSpace(textWithoutStripTags(node));
	return normalizeSpace(textWithoutStripTags(summary));
}

function answerFromDetails(node: ElementNode): string {
	const parts = (node.children || []).filter(
		(c) => !(isElement(c) && tagName(c) === 'summary') && !isEmptyText(c),
	);
	return sanitizeAnswerHtml(renderNodes(parts));
}

/**
 * Bootstrap / collapse FAQ question:
 * <h3><button …>Why …?</button></h3>
 * or <h3>Why …?</h3> (no button)
 */
function isQuestionHeading(node: Node): node is ElementNode {
	if (!isElement(node)) return false;
	const name = tagName(node);
	if (name !== 'h3' && name !== 'h4' && name !== 'h5') return false;
	if (isFaqTitleHeading(node)) return false;
	const q = normalizeSpace(textContent(node));
	return q.length > 0;
}

function questionFromHeading(node: ElementNode): string {
	return normalizeSpace(textContent(node));
}

function findFaqItemsContainers(root: Node): ElementNode[] {
	const found: ElementNode[] = [];
	const walk = (node: Node) => {
		if (!isElement(node)) return;
		if (hasClass(node, 'faq-items')) {
			found.push(node);
			return;
		}
		for (const child of node.children || []) walk(child);
	};
	walk(root);
	return found;
}

function containsFaqItems(node: Node): boolean {
	if (isElement(node) && hasClass(node, 'faq-items')) return true;
	if (!isElement(node)) return false;
	return (node.children || []).some(containsFaqItems);
}

/**
 * Flatten one `.faq-items` container into Q&A pairs (direct children walk).
 * Nested wrappers: recurse into non-question elements that aren't details.
 */
function extractPairsFromFaqItems(container: ElementNode): FaqPair[] {
	const faqs: FaqPair[] = [];
	const kids = (container.children || []).filter((c) => !isEmptyText(c));
	let i = 0;

	while (i < kids.length) {
		const node = kids[i];

		if (!isElement(node)) {
			i += 1;
			continue;
		}

		if (isFaqTitleHeading(node)) {
			i += 1;
			continue;
		}

		if (tagName(node) === 'details') {
			const question = questionFromDetails(node);
			const answerHtml = ensureAnswerHtml(answerFromDetails(node));
			if (question && answerHtml) faqs.push({ question, answerHtml });
			i += 1;
			continue;
		}

		if (isQuestionHeading(node)) {
			const question = questionFromHeading(node);
			i += 1;
			const answerNodes: Node[] = [];
			while (i < kids.length) {
				const next = kids[i];
				if (isEmptyText(next)) {
					i += 1;
					continue;
				}
				if (isElement(next) && (tagName(next) === 'details' || isQuestionHeading(next) || isFaqTitleHeading(next))) {
					break;
				}
				answerNodes.push(next);
				i += 1;
			}
			const answerHtml = ensureAnswerHtml(sanitizeAnswerHtml(renderNodes(answerNodes)));
			if (question && answerHtml) faqs.push({ question, answerHtml });
			continue;
		}

		/* Nested wrapper (div/section) — pull pairs from inside, don't treat as answer text. */
		if (node.children?.length) {
			faqs.push(...extractPairsFromFaqItems(node));
		}
		i += 1;
	}

	return faqs;
}

function extractFromFaqItems(rootChildren: Node[]): ExtractFaqsResult | null {
	const root = {
		type: ELEMENT_NODE,
		name: 'root',
		attributes: {},
		children: rootChildren,
	} as ElementNode;
	const containers = findFaqItemsContainers(root);
	if (!containers.length) return null;

	const faqs: FaqPair[] = [];
	for (const container of containers) {
		faqs.push(...extractPairsFromFaqItems(container));
	}
	if (!faqs.length) return null;

	const faqIndex = rootChildren.findIndex(containsFaqItems);
	if (faqIndex === -1) return null;

	let end = faqIndex + 1;
	while (end < rootChildren.length && containsFaqItems(rootChildren[end])) {
		end += 1;
	}

	return {
		before: renderNodes(rootChildren.slice(0, faqIndex)),
		faqs,
		after: renderNodes(rootChildren.slice(end)),
	};
}

/**
 * Split HTML into content before `.faq-items`, extracted Q&A pairs, and content after.
 * Without `class="faq-items"`, returns the original HTML as `before` (faqs empty).
 */
export function extractFaqs(html: string): ExtractFaqsResult {
	try {
		if (!html || !html.trim()) return untouched(html ?? '');

		const ast = parse(html);
		const rootChildren = ast.children || [];
		const fromClass = extractFromFaqItems(rootChildren);
		if (fromClass && fromClass.faqs.length > 0) return fromClass;

		return untouched(html);
	} catch {
		return untouched(html ?? '');
	}
}
