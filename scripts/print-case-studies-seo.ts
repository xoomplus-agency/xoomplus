/**
 * Prints normalized Yoast SEO for WP page ID 1037 (/case-studies alias → live slug).
 */
import { getPageSEO, getPageSEOById, CASE_STUDIES_WP_ID, getLiveWpSlugForId } from '../src/lib/wp-seo';

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

const liveSlug = await getLiveWpSlugForId(CASE_STUDIES_WP_ID);
console.log(`Live WP slug for id ${CASE_STUDIES_WP_ID}: ${liveSlug ?? '(none)'}`);
console.log(`Astro serves at: /${liveSlug}/ (alias /case-studies → 301 when different)\n`);

const seo = await getPageSEOById(CASE_STUDIES_WP_ID);
console.log(JSON.stringify(seo, null, 2));

const viaAlias = await getPageSEO('/case-studies');
console.log('\n--- canonical via /case-studies alias ---');
console.log(viaAlias.canonical);

const nulls = collectNullPaths(seo);
console.log('\n--- null fields ---');
console.log(nulls.length ? nulls.join('\n') : '(none)');
