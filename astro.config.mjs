// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import react from '@astrojs/react';

// Load all env keys (not only VITE_/PUBLIC_) for `site` configuration.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // Only set when SITE_URL is provided — prevents accidental production canonicals in staging.
  site: env.SITE_URL || undefined,

  integrations: [react()],
});