# Xoomplus

Astro frontend with headless WordPress for blog posts and page SEO.

## Blog publish → rebuild (deploy hook)

The site is **static at build time**. New or updated WordPress posts appear only after a rebuild. Wire WordPress to your host’s **deploy / build hook**.

### 1. Get the hook URL (host)

| Host | Where |
|------|--------|
| **Vercel** | Project → **Settings** → **Git** → **Deploy Hooks** → create a hook (e.g. name `wordpress-posts`, branch `main`) → copy the URL |
| **Netlify** | Site → **Site configuration** → **Build & deploy** → **Build hooks** → add hook → copy URL |
| **Cloudflare Pages** | Deployments → create deploy hook / use Cloudflare API token workflow |

Put the URL in `.env` / `wp-config.php` (and on the VPS listener). Prefer:

```bash
XP_DEPLOY_HOOK_URL=https://your-vps.example/hooks/rebuild
# alias still read by Astro: DEPLOY_HOOK_URL=
```

Never commit real secrets. These are **not** `PUBLIC_` vars.

### 2. WordPress mu-plugin (in this repo)

Copy `wordpress/mu-plugins/xoomplus-deploy-hook.php` into `wp-content/mu-plugins/` on the CMS.

- Fires on publish / update / unpublish / delete
- 60s lock avoids stampeding builds; if a second publish arrives during the lock, schedules **one** follow-up via `wp_schedule_single_event` at +65s
- Expect the VPS listener to answer **202** (or 200)

```php
define('XP_DEPLOY_HOOK_URL', 'https://your-vps.example/hooks/rebuild');
```

### 3. VPS build

Use `./build.sh` on the VPS (logs `X-WP-Total` before `npm run build`). Check:

1. `XP_DEPLOY_HOOK_URL` in `wp-config.php`
2. Listener returns 202 → `journalctl` / build log shows `[build] WordPress published posts (X-WP-Total): N`
3. New release symlink switches; Nginx serves the new `blogs/index.html` (purge any CDN/proxy cache of `/blogs/`)

### 4. Test

1. Create a draft in WordPress → **Publish**.
2. Confirm the host starts a new deployment / VPS build.
3. After the build finishes, open `/`, `/blogs`, and `/<category>/<slug>/` — the post should appear (sorted by CMS `date` desc). Count on `/blogs` must equal `X-WP-Total`.
4. Unpublish or delete → next build removes it; the old URL 404s.
5. Dev only: visit any page with `?refresh=1` (or `WP_CACHE=off`) to bypass the 60s disk cache.
### Hosts without build hooks

Trigger a rebuild manually, use CI cron + `curl -X POST "$DEPLOY_HOOK_URL"`, or switch blog routes to on-demand SSR later (see team notes). Without a rebuild, the static site will not show new posts.

### Optional GitHub Actions cron

Skipped unless you confirm you use GitHub. A `*/30 * * * *` workflow can `curl` `DEPLOY_HOOK_URL` as a safety net.

## Local development

```bash
npm install
cp .env.example .env   # fill values
npm run dev
```

Dev may use a versioned posts disk cache at `node_modules/.cache/wp-cache.json` (TTL **60s**; `WP_CACHE=off` or `?refresh=1` to force). Stale caches (wrong version or missing `path`/`date`/`status`) are discarded. **Production builds always fetch live posts** (with `&_=<timestamp>` cache-bust).

## Config

- `src/config.ts` → `RESPECT_CMS_NOINDEX` (default `true`): CMS-noindex posts still render and link; they emit `noindex, follow`. Yoast decides sitemap inclusion.

## Yoast sitemap (public domain)

Search engines should use **`https://xoomplus.co.uk/sitemap_index.xml`** (Yoast), not a separate Astro URL inventory.

| Layer | Role |
|-------|------|
| **WordPress / Yoast** | Source of truth for sitemap index + child sitemaps |
| **Astro** | On-demand proxy at `/sitemap_index.xml` and `/{type}-sitemap*.xml`; rewrites CMS-host `<loc>` → `SITE_URL` |
| **`/sitemap.xml`** | Same Yoast index XML as `/sitemap_index.xml` (legacy alias, same origin) |
| **`robots.txt`** | Production advertises `sitemap_index.xml` only; staging disallows all and omits Sitemap |

### CMS hostname split

```bash
WP_BASE_URL=https://xoomplusagency.com
PUBLIC_WP_API=https://xoomplusagency.com/wp-json/wp/v2
SITE_URL=https://xoomplus.co.uk
# WP_SITEMAP_ORIGIN=https://xoomplusagency.com   # only if different from WP_BASE_URL
```

WordPress `wp-config.php` (recommended):

```php
define('WP_HOME', 'https://xoomplus.co.uk');
define('WP_SITEURL', 'https://xoomplusagency.com');
define('XP_PUBLIC_HOME_URL', 'https://xoomplus.co.uk');
```

Copy `wordpress/mu-plugins/xoomplus-yoast-public-sitemap.php` into `wp-content/mu-plugins/` so Yoast emits public `<loc>` URLs even when the CMS host differs. Astro still proxies on the apex so crawlers never need the CMS host.

**Important:** Once Astro serves the apex, `WP_BASE_URL` / `WP_SITEMAP_ORIGIN` must point at WordPress (`xoomplusagency.com`), not back at the Astro host — otherwise the proxy loops.
