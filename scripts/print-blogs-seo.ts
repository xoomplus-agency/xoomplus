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

const seo = await getPageSEO('/blogs');
console.log(JSON.stringify(seo, null, 2));
const nulls = collectNullPaths(seo);
console.log('\n--- null fields ---');
console.log(nulls.length ? nulls.join('\n') : '(none)');
