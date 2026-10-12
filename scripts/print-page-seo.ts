/**
 * Prints normalized Yoast SEO for "/", "/about", and "/industries".
 *
 * Usage:
 *   npx --yes tsx --env-file=.env scripts/print-page-seo.ts
 */
import { getPageSEO } from '../src/lib/wp-seo';

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

const paths = ['/', '/about', '/industries'] as const;

for (const path of paths) {
	const seo = await getPageSEO(path);
	console.log(`\n========== ${path} ==========`);
	console.log(JSON.stringify(seo, null, 2));
	const nulls = collectNullPaths(seo);
	console.log('\n--- null fields ---');
	if (nulls.length === 0) console.log('(none)');
	else for (const p of nulls) console.log(p);
}
