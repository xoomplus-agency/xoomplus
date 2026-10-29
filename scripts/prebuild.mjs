/**
 * Runs before `astro build`.
 * 1) Refresh static combined sitemap (pages + posts → public/sitemap_index.xml)
 * 2) Optional WP route check when REQUIRE_WP_ROUTE_CHECK=1
 */
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const sitemapScript = path.join(process.cwd(), 'scripts', 'generate-combined-sitemap.mjs');
if (existsSync(sitemapScript)) {
	console.log('[prebuild] generating combined static sitemap…');
	const sitemap = spawnSync('npx', ['--yes', 'tsx', sitemapScript], {
		stdio: 'inherit',
		shell: true,
	});
	if (sitemap.status !== 0) {
		console.error('[prebuild] combined sitemap generation failed');
		process.exit(sitemap.status === null ? 1 : sitemap.status);
	}
} else {
	console.warn('[prebuild] scripts/generate-combined-sitemap.mjs missing — skipping sitemap');
}

const requireCheck =
	process.env.REQUIRE_WP_ROUTE_CHECK === '1' ||
	process.env.REQUIRE_WP_ROUTE_CHECK === 'true';
const skip =
	!requireCheck ||
	process.env.SKIP_WP_ROUTE_CHECK === '1' ||
	process.env.SKIP_WP_ROUTE_CHECK === 'true';
if (skip) {
	if (!requireCheck) {
		console.warn(
			'[prebuild] Marketing pages are static — skipping check:wp-routes (set REQUIRE_WP_ROUTE_CHECK=1 to enable)',
		);
	} else {
		console.warn('[prebuild] SKIP_WP_ROUTE_CHECK set — skipping check:wp-routes');
	}
	process.exit(0);
}

const script = path.join(process.cwd(), 'scripts', 'check-wp-routes.ts');
if (!existsSync(script)) {
	console.warn(
		'[prebuild] scripts/check-wp-routes.ts missing — skipping (include scripts/ in the deploy zip, or set SKIP_WP_ROUTE_CHECK=1)',
	);
	process.exit(0);
}

const result = spawnSync(
	'npx',
	['--yes', 'tsx', 'scripts/check-wp-routes.ts'],
	{ stdio: 'inherit', shell: true },
);

process.exit(result.status === null ? 1 : result.status);
