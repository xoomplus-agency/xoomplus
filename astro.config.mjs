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
  // Homepage SSR calls WordPress several times — give the serverless function enough time.
  adapter: useVercel
    ? vercel({
        maxDuration: 60,
        // Match package.json engines (22.x). Avoid auto-picking unsupported local Node majors.
        // Cache SSR HTML at the edge after first render; purge via /api/revalidate + bypass token.
        isr: {
          expiration: 300,
          bypassToken:
            env.ISR_BYPASS_TOKEN || env.REVALIDATE_SECRET || undefined,
          exclude: [
            '/api/revalidate',
            '/api/health',
            '/api/blog-posts',
            '/api/contact',
            /^\/api\/.+/,
          ],
        },
      })
    : node({ mode: 'standalone' }),

  integrations: [react()],

  // Prefetch in-site links so first navigation after landing feels like a cache hit.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  experimental: {
    // Speculation Rules — Chrome prerenders likely next pages when supported.
    clientPrerender: true,
  },

  // Total CSS is small (~25KB) — inline to eliminate render-blocking stylesheet requests.
  build: {
    inlineStylesheets: 'always',
  },

  // /services is served by src/pages/services/index.astro (WP page ID 1062).
  // No redirects — clean URLs only.

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    // Keep Astro CSP/encryption deps in the server bundle. Leaving them external
    // breaks Vercel when .vercel/output is committed without nested node_modules.
    ssr: {
      noExternal: ['@oslojs/encoding'],
    },
  },
});
