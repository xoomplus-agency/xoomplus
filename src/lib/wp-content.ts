/**
 * Clean WordPress `content.rendered` for Astro blog detail pages.
 * Strips Elementor chrome while keeping semantic article HTML.
 * Uses `ultrahtml` (already present via Astro) — do not regex-parse nested HTML.
 */
import { ELEMENT_NODE, TEXT_NODE, parse, renderSync, walkSync } from 'ultrahtml';

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

const DROP_TAGS = new Set([
	'script',
	'style',
	'link',
	'noscript',
	'meta',
	'iframe',
	'form',
	'svg',
]);

const UNWRAP_TAGS = new Set(['div', 'span', 'section', 'font']);

const KEEP_ATTR = new Set([
	'href',
	'src',
	'srcset',
	'sizes',
	'alt',
	'title',
	'width',
	'height',
	'loading',
	'decoding',
	'fetchpriority',
	'target',
	'rel',
	'id',
	'name',
	'colspan',
	'rowspan',
	'scope',
	'headers',
	'cite',
	'start',
	'type',
	'value',
	'open',
	'role',
	'tabindex',
]);

const ELEMENTOR_CLASS =
	/^(?:elementor|e-con|e-flex|e-n-|e-opened|e-closed|e-parent|e-child|hfe-|premium-|jki|eael-)/i;

function classList(node: ElementNode): string[] {
	const raw = node.attributes?.class;
	if (!raw || typeof raw !== 'string') return [];
	return raw.split(/\s+/).filter(Boolean);
}

function hasClass(node: ElementNode, re: RegExp): boolean {
	return classList(node).some((c) => re.test(c));
}

function attr(node: ElementNode, name: string): string {
	const value = node.attributes?.[name];
	return typeof value === 'string' ? value : '';
}

function isElementorChrome(node: ElementNode): boolean {
	if (attr(node, 'data-elementor-type') || attr(node, 'data-elementor-id')) return true;
	if (attr(node, 'data-element_type') || attr(node, 'data-e-type')) return true;
	if (attr(node, 'data-widget_type') || attr(node, 'data-id')) return true;
	if (attr(node, 'data-settings')) return true;
	return classList(node).some((c) => ELEMENTOR_CLASS.test(c));
}

function isPageTitleWidget(node: ElementNode): boolean {
	const widget = attr(node, 'data-widget_type').toLowerCase();
	if (widget.startsWith('page-title')) return true;
	if (hasClass(node, /^elementor-widget-page-title$/i)) return true;
	if (hasClass(node, /^hfe-page-title(?:-wrapper)?$/i)) return true;
	return false;
}

/** Icon-only Elementor / JKIcons chrome with no article text. */
function isPresentationOnly(node: ElementNode): boolean {
	const name = node.name.toLowerCase();
	if (hasClass(node, /^e-n-accordion-item-title-icon$/i)) return true;
	if (hasClass(node, /^e-opened$/i) || hasClass(node, /^e-closed$/i)) return true;
	if (name === 'i' && hasClass(node, /^(?:eicon|jki)/i)) return true;
	if (name === 'i' && !hasMeaningfulText(node) && isElementorChrome(node)) return true;
	return false;
}

function hasMeaningfulText(node: Node): boolean {
	let found = false;
	walkSync(node, (child) => {
		if (found) return;
		if (child.type === TEXT_NODE) {
			const text = (child as { value?: string }).value ?? '';
			if (text.replace(/\u00a0/g, ' ').trim()) found = true;
		}
	});
	return found;
}

function hasMeaningfulContent(node: ElementNode): boolean {
	const name = node.name.toLowerCase();
	if (['img', 'br', 'hr', 'video', 'audio', 'picture', 'source', 'iframe'].includes(name)) {
		return name !== 'iframe';
	}
	if (['table', 'thead', 'tbody', 'tr', 'th', 'td', 'ul', 'ol', 'li'].includes(name)) {
		return true;
	}
	return (node.children || []).some((child) => {
		if (child.type === TEXT_NODE) {
			const text = (child as { value?: string }).value ?? '';
			return Boolean(text.replace(/\u00a0/g, ' ').trim());
		}
		if (child.type === ELEMENT_NODE) {
			return hasMeaningfulContent(child as ElementNode);
		}
		return false;
	});
}

/** Editorial callout boxes from WP — keep the element + class allowlist intact. */
function isEditorialCallout(node: ElementNode): boolean {
	return classList(node).some(
		(c) => c === 'custom-callout' || c === 'key-takeaways',
	);
}

/** In-post CTA block — extracted later into CTASection; must survive sanitizer. */
function isCtaSection(node: ElementNode): boolean {
	return classList(node).some((c) => c === 'cta-section');
}

function shouldUnwrap(node: ElementNode): boolean {
	const name = node.name.toLowerCase();
	if (!UNWRAP_TAGS.has(name)) return false;
	// Never unwrap CMS callout/takeaways/CTA wrappers (class must survive sanitizer).
	if (isEditorialCallout(node)) return false;
	if (isCtaSection(node)) return false;
	if (isElementorChrome(node)) return true;
	if (hasClass(node, /^e-con-inner$/i)) return true;
	if (hasClass(node, /^elementor-widget-container$/i)) return true;
	if (hasClass(node, /^premium-button-text-icon-wrapper$/i)) return true;
	if (hasClass(node, /^e-n-accordion-item-title-header$/i)) return true;
	if (hasClass(node, /^e-n-accordion-item-title-text$/i)) return true;
	return false;
}

function cleanAttributes(node: ElementNode): void {
	const next: Record<string, string> = {};
	const attrs = node.attributes || {};

	for (const [key, value] of Object.entries(attrs)) {
		if (typeof value !== 'string') continue;
		const lower = key.toLowerCase();

		if (lower.startsWith('on')) continue;
		if (lower === 'style') continue;
		if (lower.startsWith('data-elementor')) continue;
		if (
			lower === 'data-id' ||
			lower === 'data-element_type' ||
			lower === 'data-e-type' ||
			lower === 'data-widget_type' ||
			lower === 'data-settings' ||
			lower === 'data-accordion-index'
		) {
			continue;
		}

		if (lower.startsWith('aria-') || lower.startsWith('data-')) {
			// Keep aria-* and non-Elementor data-* (rare legitimate anchors)
			if (lower.startsWith('data-') && /elementor|e-n-|widget/i.test(lower)) continue;
			next[key] = value;
			continue;
		}

		if (lower === 'class') {
			const kept = value
				.split(/\s+/)
				.filter(Boolean)
				.filter((c) => !ELEMENTOR_CLASS.test(c))
				.filter((c) => !/^(?:attachment-|size-|wp-image-)/i.test(c));
			if (kept.length) next.class = kept.join(' ');
			continue;
		}

		if (KEEP_ATTR.has(lower)) {
			next[key] = value;
		}
	}

	node.attributes = next;
}

function cleanNodes(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		out.push(...cleanNode(node));
	}
	return out;
}

function cleanNode(node: Node): Node[] {
	if (node.type === TEXT_NODE) {
		const text = ((node as { value?: string }).value ?? '').replace(/\u00a0/g, ' ');
		(node as { value: string }).value = text;
		return [node];
	}
	if (node.type !== ELEMENT_NODE) return [];

	const el = node as ElementNode;
	const name = el.name.toLowerCase();

	if (DROP_TAGS.has(name)) return [];
	if (isPageTitleWidget(el)) return [];
	if (isPresentationOnly(el)) return [];

	// Decide unwrap before attributes/classes are stripped.
	const unwrap = shouldUnwrap(el);
	const keepId = attr(el, 'id');

	el.children = cleanNodes(el.children || []);
	cleanAttributes(el);

	// Body images compete with featured LCP — always lazy unless already eager.
	if (name === 'img') {
		const loading = (el.attributes.loading || '').toLowerCase();
		if (loading !== 'eager') {
			el.attributes.loading = 'lazy';
		}
		if (!el.attributes.decoding) {
			el.attributes.decoding = 'async';
		}
		if ((el.attributes.fetchpriority || '').toLowerCase() === 'high') {
			delete el.attributes.fetchpriority;
		}
	}

	if (unwrap) {
		return el.children || [];
	}

	// Keep editorial callout / CTA wrappers even if momentarily empty after clean.
	if (isEditorialCallout(el) || isCtaSection(el)) {
		return [el];
	}

	// Empty Elementor leftovers / empty paragraphs of &nbsp;
	if (
		['div', 'span', 'p', 'section'].includes(name) &&
		!hasMeaningfulContent(el) &&
		!keepId
	) {
		return [];
	}

	return [el];
}

/** Collapse anonymous wrapper divs/spans left after Elementor unwrapping. */
function collapseAnonymousWrappers(nodes: Node[]): Node[] {
	const out: Node[] = [];
	for (const node of nodes) {
		if (node.type !== ELEMENT_NODE) {
			out.push(node);
			continue;
		}
		const el = node as ElementNode;
		el.children = collapseAnonymousWrappers(el.children || []);
		const name = el.name.toLowerCase();
		const attrs = el.attributes || {};
		const keys = Object.keys(attrs).filter((k) => attrs[k] !== undefined && attrs[k] !== '');
		const onlyClassMissing =
			keys.length === 0 || (keys.length === 1 && keys[0] === 'class' && !attrs.class);
		if (
			(name === 'div' || name === 'span') &&
			onlyClassMissing &&
			!attrs.id &&
			!attrs.role
		) {
			out.push(...(el.children || []));
			continue;
		}
		out.push(el);
	}
	return out;
}

/**
 * Return article HTML safe for Astro `.prose-blog` rendering.
 * Idempotent for already-clean semantic HTML.
 * Table wrapping / classification is handled by `enhanceTables`.
 */
export function cleanWpPostHtml(html: string): string {
	if (!html || !html.trim()) return '';

	const needsClean =
		/elementor|data-elementor|data-widget_type|e-n-accordion|hfe-page-title|premium-button/i.test(
			html,
		) || /<(?:script|style|link)\b/i.test(html);

	const ast = parse(html);
	ast.children = collapseAnonymousWrappers(cleanNodes(ast.children || []));
	return renderSync(ast).trim();
}
