/**
 * Runs before `astro build`. Skips WP route check when:
 * - SKIP_WP_ROUTE_CHECK=1
 * - scripts/check-wp-routes.ts is not in the deploy package
 */
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const skip = process.env.SKIP_WP_ROUTE_CHECK === '1' || process.env.SKIP_WP_ROUTE_CHECK === 'true';
if (skip) {
	console.warn('[prebuild] SKIP_WP_ROUTE_CHECK set — skipping check:wp-routes');
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
