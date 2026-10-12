/**
 * Prints normalized Yoast SEO for route "/about" and lists null fields.
 *
 * Usage:
 *   npx --yes tsx --env-file=.env scripts/print-about-seo.ts
 */
import { getPageSEOForRoute } from '../src/lib/wp-seo';

function collectNullPaths(value: unknown, path = '', found: string[] = []): string[] {
	if (value === null) {
		found.push(path || '(root)');
		return found;
	}
	if (Array.isArray(value)) {
		value.forEach((item, i) => collectNullPaths(item, `${path}[${i}]`, found));
		return found;
	}
	if (value && typeof value === 'object') {
		for (const [key, child] of Object.entries(value)) {
			collectNullPaths(child, path ? `${path}.${key}` : key, found);
		}
	}
	return found;
}

const seo = await getPageSEOForRoute('/about');
console.log(JSON.stringify(seo, null, 2));

const nulls = collectNullPaths(seo);
console.log('\n--- null fields ---');
if (nulls.length === 0) {
	console.log('(none)');
} else {
	for (const p of nulls) console.log(p);
}
