/**
 * Extract FAQ Q&A pairs from WordPress `content.rendered` on single blog posts.
 * Only wrappers with class `faq-items` or `faq-item` are used.
 * Inside the wrapper, take Q&A pairs only — skip the FAQs heading; do not leave
 * accordion chrome in the article body.
 * Supports:
 *   - Plain CMS: alternating question / answer (p or text)
 *   - Elementor: <details><summary>Question</summary>Answer</details>
 *   - Bootstrap: <h3><button>Question</button></h3> + answer siblings
 * Server-side only. Uses ultrahtml — never regex-parse nested HTML. Never throws.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync } from 'ultrahtml';
import { decodeHtmlEntities } from './decode-html-entities';

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

const FAQ_WRAPPER_CLASSES = new Set(['faq-items', 'faq-item']);

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

function isFaqWrapper(node: ElementNode): boolean {
	return classList(node).some((c) => FAQ_WRAPPER_CLASSES.has(c));
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

function isEmptyText(node: Node): boolean {
	return node.type === TEXT_NODE && !normalizeSpace(node.value ?? '');
}

function isFaqTitleHeading(node: ElementNode): boolean {
	const name = tagName(node);
	if (name !== 'h2' && name !== 'h3' && name !== 'h4') return false;
	const t = plainText(textContent(node)).toLowerCase();
	return (
		t === 'faqs' ||
		t === 'faq' ||
		t === "faq's" ||
		t === 'faq\u2019s' ||
		t === 'frequently asked questions'
	);
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
			const raw = node.value ?? '';
			out.push({ ...node, value: decodeHtmlEntities(raw) });
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
	if (!summary) return plainText(textWithoutStripTags(node));
	return plainText(textWithoutStripTags(summary));
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
	return plainText(textContent(node));
}

/** Plain CMS block used as either a question or an answer line. */
function isPlainQaBlock(node: Node): boolean {
	if (isEmptyText(node)) return false;
	if (node.type === TEXT_NODE) return normalizeSpace(node.value ?? '').length > 0;
	if (!isElement(node)) return false;
	if (isFaqTitleHeading(node)) return false;
	if (tagName(node) === 'details') return false;
	if (isQuestionHeading(node)) return false;
	if (isFaqWrapper(node)) return false;
	return normalizeSpace(textContent(node)).length > 0;
}

function questionFromPlainBlock(node: Node): string {
	return plainText(textContent(node));
}

/**
 * CMS questions are short lines ending in `?`.
 * Avoid treating long answer sentences that happen to end with `?` as questions.
 */
function looksLikePlainQuestion(text: string): boolean {
	const t = normalizeSpace(text);
	if (!t.endsWith('?')) return false;
	if (t.length > 200) return false;
	if ((t.match(/\?/g) || []).length !== 1) return false;
	return true;
}

function textNode(value: string): Node {
	return { type: TEXT_NODE, value };
}

/**
 * Expand CMS plain content into atomic blocks:
 * - newline-separated text → one block per line
 * - `<p>Q?<br>Answer</p>` → separate blocks at `<br>`
 */
function expandPlainBlocks(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (node.type === TEXT_NODE) {
			const lines = (node.value ?? '')
				.split(/\n+/)
				.map((line) => line.trim())
				.filter(Boolean);
			if (lines.length > 1) {
				for (const line of lines) out.push(textNode(line));
				continue;
			}
			if (lines.length === 1) out.push(textNode(lines[0]));
			continue;
		}

		if (
			isElement(node) &&
			tagName(node) === 'p' &&
			(node.children || []).some((c) => isElement(c) && tagName(c) === 'br')
		) {
			let buf = '';
			const flush = () => {
				const t = normalizeSpace(buf);
				if (t) out.push(textNode(t));
				buf = '';
			};
			for (const child of node.children || []) {
				if (isElement(child) && tagName(child) === 'br') {
					flush();
					continue;
				}
				if (child.type === TEXT_NODE) {
					buf += child.value ?? '';
					continue;
				}
				flush();
				out.push(child);
			}
			flush();
			continue;
		}

		out.push(node);
	}
	return out;
}

/**
 * Pair plain CMS FAQs: each short `…?` line is a question; following blocks
 * until the next question are the answer (supports `<ul>` answer tails).
 */
function pushPlainPairs(faqs: FaqPair[], blocks: Node[]): void {
	const expanded = expandPlainBlocks(blocks);
	let i = 0;
	while (i < expanded.length) {
		const question = questionFromPlainBlock(expanded[i]);
		if (!looksLikePlainQuestion(question)) {
			i += 1;
			continue;
		}
		i += 1;
		const answerNodes: Node[] = [];
		while (i < expanded.length) {
			const nextText = questionFromPlainBlock(expanded[i]);
			if (looksLikePlainQuestion(nextText)) break;
			answerNodes.push(expanded[i]);
			i += 1;
		}
		const answerHtml = ensureAnswerHtml(sanitizeAnswerHtml(renderNodes(answerNodes)));
		if (question && answerHtml) faqs.push({ question, answerHtml });
	}
}

function findFaqItemsContainers(root: Node): ElementNode[] {
	const found: ElementNode[] = [];
	const walk = (node: Node) => {
		if (!isElement(node)) return;
		if (isFaqWrapper(node)) {
			found.push(node);
			return;
		}
		for (const child of node.children || []) walk(child);
	};
	walk(root);
	return found;
}

/**
 * Flatten one `.faq-items` / `.faq-item` container into Q&A pairs.
 * Only the wrapper class matters for detection; inside, pair each question with its answer.
 */
function extractPairsFromFaqItems(container: ElementNode): FaqPair[] {
	const faqs: FaqPair[] = [];
	const kids = (container.children || []).filter((c) => !isEmptyText(c));
	let i = 0;

	while (i < kids.length) {
		const node = kids[i];

		if (!isElement(node) && node.type !== TEXT_NODE) {
			i += 1;
			continue;
		}

		if (isElement(node) && isFaqTitleHeading(node)) {
			i += 1;
			continue;
		}

		if (isElement(node) && tagName(node) === 'details') {
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
				if (
					isElement(next) &&
					(tagName(next) === 'details' || isQuestionHeading(next) || isFaqTitleHeading(next))
				) {
					break;
				}
				answerNodes.push(next);
				i += 1;
			}
			const answerHtml = ensureAnswerHtml(sanitizeAnswerHtml(renderNodes(answerNodes)));
			if (question && answerHtml) faqs.push({ question, answerHtml });
			continue;
		}

		/* Plain CMS: Q, A, Q, A as consecutive paragraphs / text. */
		if (isPlainQaBlock(node)) {
			const blocks: Node[] = [];
			while (i < kids.length && isPlainQaBlock(kids[i])) {
				blocks.push(kids[i]);
				i += 1;
			}
			pushPlainPairs(faqs, blocks);
			continue;
		}

		/* Nested non-wrapper element — walk children once (do not invent structure). */
		if (isElement(node) && node.children?.length) {
			faqs.push(...extractPairsFromFaqItems(node));
		}
		i += 1;
	}

	return faqs;
}

/** Remove `.faq-items` / `.faq-item` nodes; keep every other node in place. */
function stripFaqWrappers(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (isElement(node) && isFaqWrapper(node)) continue;
		if (isElement(node) && node.children?.length) {
			node.children = stripFaqWrappers(node.children);
		}
		out.push(node);
	}
	return out;
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

	/*
	 * Prefer a clean root-level split when `.faq-items` is a top-level sibling
	 * (preserves content after FAQs). If the wrapper is nested (e.g. WP unclosed
	 * `<p>` pulled later sections into a `<ul>`), strip only the FAQ nodes so
	 * the rest of the article is not discarded.
	 */
	const faqIndex = rootChildren.findIndex(
		(n) => isElement(n) && isFaqWrapper(n),
	);
	if (faqIndex !== -1) {
		let end = faqIndex + 1;
		while (
			end < rootChildren.length &&
			isElement(rootChildren[end]) &&
			isFaqWrapper(rootChildren[end] as ElementNode)
		) {
			end += 1;
		}
		return {
			before: renderNodes(stripFaqWrappers(rootChildren.slice(0, faqIndex))),
			faqs,
			after: renderNodes(stripFaqWrappers(rootChildren.slice(end))),
		};
	}

	return {
		before: renderNodes(stripFaqWrappers(rootChildren)),
		faqs,
		after: '',
	};
}

/**
 * Split HTML into content before FAQ wrapper, extracted Q&A pairs, and content after.
 * Without `class="faq-items"` / `faq-item`, returns the original HTML as `before` (faqs empty).
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
