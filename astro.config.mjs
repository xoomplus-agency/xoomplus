// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// Load all env keys (not only VITE_/PUBLIC_) for `site` configuration.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// Vercel sets VERCEL=1 during build/runtime. Keep Node standalone for VPS builds.
const useVercel = process.env.VERCEL === '1';

// https://astro.build/config
export default defineConfig({
  // Only set when SITE_URL is provided — prevents accidental production canonicals in staging.
  site: env.SITE_URL || undefined,

  // Static by default; SEO pages + revalidate API opt into on-demand via `prerender = false`.
  // Vercel Hobby defaults to a short function limit; homepage hits WP several times.
  adapter: useVercel
    ? vercel({ maxDuration: 60 })
    : node({ mode: 'standalone' }),

  integrations: [react()],

  // /services is served by src/pages/services/index.astro (WP page ID 1062).
  // No redirects — clean URLs only.

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },
});
