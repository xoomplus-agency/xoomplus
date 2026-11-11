# Astro Site Development Playbook

Portable context for building new Astro marketing/agency sites without repeating past mistakes (speed, cPanel deploy, builds, tokens, prompting).

**How to use**

1. Copy this file into the new project as `.cursor/ASTRO-SITE-PLAYBOOK.md`.
2. On the first chat of a new site, say: *“Follow `.cursor/ASTRO-SITE-PLAYBOOK.md` for this project.”*
3. Optionally paste the **Starter always-apply rule** (bottom) into `.cursor/rules/astro-playbook.mdc` with `alwaysApply: true`.
4. Do **not** paste this whole playbook into every message — that burns tokens. Point to it once, then give task-scoped prompts.

---

## 1. How you should prompt (saves money + mistakes)

### Do

- **One job per message.** “Fix LCP on the homepage hero” beats “optimize the whole site and also fix deploy and also redesign mobile.”
- **Name the target.** Page path, section name, component file if known.
- **State the constraint.** “Match the Figma exactly”, “cPanel static only — no Node on server”, “do not change design”, “reuse existing Button”.
- **Separate phases.** Analyze → plan → implement. Say which phase you want.
- **Attach only what is needed.** One screenshot of the section, not the whole Figma dump every turn.
- **Say stop conditions.** “Ask before adding packages”, “do not invent UI”, “production build only”.
- **Correct with diffs of intent.** “Only change margin on the outer section — do not touch padding or nested spacing.”

### Don’t

- Drop a design and assume the agent should start coding (it shouldn’t until you say *build / implement / create*).
- Ask for “best / modern / AI-looking” UI when a design exists — that causes redesign drift.
- Ask for 3 alternative implementations unless you will pick one immediately.
- Say “review the whole codebase” or “scan everything” — forces huge context reads.
- Mix deploy + redesign + content + SEO into one vague prompt.
- Paste secrets, full `.env`, or large build logs when a 20-line error is enough.

### Prompt templates

**Analyze only**

> Analyze this homepage design. List sections, reusable components, assets needed, and risks. Do not write code.

**Plan only**

> Plan implementation for the Services page on Astro static + cPanel. Concise: pages, components, assets, deps. No code yet.

**Implement one slice**

> Implement only the homepage Hero from the attached design. Reuse shared Button. No new libraries. Match spacing exactly. Do not touch other sections.

**Perf fix**

> Production LCP is slow on `/`. Find the LCP element, fix loading (no design changes). Verify against `dist/`, not only `astro dev`.

**Deploy**

> Prepare a static cPanel deploy: `output: 'static'`, `.htaccess` in `public/`, document zip-of-`dist` contents into `public_html`.

---

## 2. Token / credit discipline (agent + you)

### Agent must

- Inspect **only** files relevant to the current task.
- Search for symbols/files instead of opening large groups.
- Never read `node_modules`, `.git`, caches, or generated `dist/` unless debugging a specific build artifact.
- Not re-read unchanged files; reuse established project knowledge.
- Avoid speculative installs, repeated full builds, and alternate implementations.
- Prefer the smallest sufficient change; keep replies concise.
- Not regenerate whole components when a small edit works.

### You should

- Keep chats focused; start a **new chat** when switching domains (e.g. design → cPanel deploy).
- Prefer rules/playbook over re-explaining the same constraints every time.
- Point to one file: “Fix `src/components/Hero.astro`” instead of “look around the hero stuff.”
- Avoid @-mentioning the entire `src/` tree.

---

## 3. Mandatory workflow (design → code)

1. **Understand** — structure, visual system, sections, patterns, assets, responsive, motion. Analyze only unless told to build.
2. **Plan** — only when asked: pages, components, sections, assets, responsive, real deps.
3. **Implement** — only after explicit “build / implement / create …”.
4. **Verify** — targeted checks: semantics, responsive, excess client JS, design fidelity, **production build** for perf.

Receiving a design or image alone is **not** permission to code.

**No design yet:** do not invent colors, type, spacing, cards, gradients, animations, or a design system.

---

## 4. Astro architecture defaults (start simple)

| Choice | Default for new marketing sites | Avoid unless required |
|---|---|---|
| Rendering | **Static** (`astro build` → `dist/`) | SSR/Node/Vercel adapters “just in case” |
| UI | `.astro` + HTML/CSS | React/Vue/Svelte for static pages |
| JS | Native, minimal islands | Hydrating whole pages; large animation libs in layout |
| Styling | Existing tokens / small CSS; Tailwind only if already chosen | UI kits, icon packs, animation frameworks |
| CMS | Headless WP **only for editorial** (blog) | Putting logos/heroes/fonts in WordPress |
| Routing | Trailing-slash directory URLs (`/about/index.html`) | SPA `ClientRouter` competing with LCP |
| Nav speed | Astro `prefetch` (hover) | View-transition router unless proven needed |
| Host (cheap/shared) | **cPanel static** upload of `dist/` | Node on cPanel for a brochure site |

**Rule of thumb:** If the site is mostly marketing pages + optional WP blog, ship **static HTML**. Add SSR only when you need per-request HTML, authenticated APIs, or ISR — and accept a harder host (VPS/Vercel), not classic cPanel file upload.

---

## 5. Performance non-negotiables

Targets: **LCP ≤ 2.5s**, **INP ≤ 200ms**, **CLS ≤ 0.1** (mobile + desktop). Never “fix” perf by changing the approved design.

### Critical path

- Minimize initial HTML/CSS/JS. Prefer static HTML over client JS.
- Hydrate only interactive islands.
- Do not load page-specific JS/CSS globally.
- No analytics/chat/embeds/external fonts unless explicitly required; load non-critical third parties late.

### Images & LCP

- Correct size; AVIF/WebP when appropriate — **do not** blindly convert everything or crush quality.
- Explicit width/height or aspect-ratio (CLS).
- Lazy-load **below the fold only**.
- **Never lazy-load the LCP / primary above-the-fold image.**
- Hero video: optimized **poster** owns first paint; video is `muted` `autoplay` `loop` `playsinline`; keep files web-sized.

### Fonts

- Host locally under `public/fonts/`; only required families/weights; `font-display: swap` (or equivalent); prevent layout shift.

### CSS / JS pitfalls learned the hard way

- Prefer CSS reveals over shipping GSAP on every page.
- **Never** statically `import 'gsap'` (or ScrollTrigger) in layouts/shared components. If a complex timeline is unavoidable, dynamic `import()` only when the section is near viewport.
- Do not reintroduce `astro:transitions` / `<ClientRouter />` lightly — prefer prefetch; optional CSS view transitions only if needed.
- If total CSS is small, `build.inlineStylesheets: 'always'` can remove a render-blocking request — measure first.

### Validation

1. Test **`npm run build` + preview or real host**, not only `astro dev`.
2. Check Lighthouse/PSI, LCP element, CLS, INP, payloads.
3. Fix measurable issues first; no speculative complexity.

---

## 6. How the build should be created

### Local / CI (static cPanel path)

```bash
# .env on the BUILD machine (not on cPanel for pure static)
SITE_URL=https://example.com
# If headless WP:
WP_BASE_URL=https://cms.example.com
PUBLIC_WP_API=https://cms.example.com/wp-json/wp/v2

npm ci
npm run build
# → dist/  (index.html, _astro/, images, fonts, .htaccess)
```

### Config checklist

- Set `site` from `SITE_URL` so canonicals/sitemaps are correct; leave unset on accidental staging builds if needed.
- Prefer **static output** for cPanel. Do not add `@astrojs/node` / `@astrojs/vercel` unless the host runs that runtime.
- Fail the build clearly when required CMS data is missing in production (do not silently ship empty blog indexes).
- Do not commit secrets. `PUBLIC_` vars are exposed to the browser — never put API secrets there.
- Production builds should fetch **live** CMS data (cache-bust); short disk caches are for local dev only.
- After WP content changes on a **static** site: **rebuild + re-upload** (or deploy hook → CI → FTP). The live server will not magically update HTML.

### Dual-host warning (from past complexity)

Supporting both Vercel SSR and cPanel static in one repo is expensive to maintain. For a **new** site, pick **one** deploy target first. Add a second host only when business requires it.

---

## 7. cPanel static deployment (no Node on server)

1. Build on PC or CI → `dist/`.
2. Zip the **contents** of `dist/` (not a parent folder named `dist`).
3. cPanel File Manager → `public_html` → Upload → Extract.
4. Confirm at `public_html` root: `index.html`, `_astro/`, `.htaccess`, assets.
5. Pretty URLs: Astro directory format + `.htaccess` rewrite to `…/index.html`.
6. Cache `_astro/` and static assets long-term (`immutable`); keep HTML/sitemaps short-cache or revalidate.
7. Enable compression (deflate) and basic security headers in `.htaccess`.
8. If the browser calls WP REST (forms, load-more): configure **CORS** on WordPress for the Astro origin.
9. Contact forms: prefer a WP plugin REST endpoint or external form service; map field names explicitly.

### Minimal `.htaccess` ideas (adapt domains)

- `DirectoryIndex index.html`
- Rewrite file/dir passthrough → `path/index.html` → `404.html`
- Long cache for `/_astro/` and `/fonts|/images|/videos|/icons/`
- Short cache for sitemaps
- `mod_deflate` for HTML/CSS/JS
- CSP tailored to your real origins (self + CMS + any embeds)

### What does **not** work on classic cPanel static

- Astro Node middleware / Express `server.js` as the primary host model
- Expecting `astro dev` behavior on the server
- Server-only env vars for HTML that was already prerendered — those values are baked in at build time

---

## 8. Assets & CMS boundaries

```text
public/
├── images/   # logo, heroes, fixed page art
├── videos/   # hero video + poster
├── fonts/
└── icons/
```

- Fixed design media → Astro `public/`.
- Editorial images/posts → WordPress (do not duplicate into the repo).
- Prefer SVG for icons/logos; WebP/AVIF when suitable; PNG when transparency/lossless needed.
- Do not optimize until quality visibly suffers.

### Headless WordPress (when used)

- Native `fetch` to REST; no WP client package until justified.
- Yoast: use `yoast_head_json` → one shared SEO component; do not scrape `yoast_head` HTML into `<head>`.
- Blog URLs must stay compatible with Yoast canonicals.
- One JSON-LD graph; no duplicate SEO tags.
- Design assets stay out of WP unless explicitly requested.

---

## 9. UI / code quality defaults

- Keep changes focused; no drive-by refactors.
- Simple components; split only when maintainability clearly improves.
- Prefer native HTML/CSS/JS over libraries.
- Reuse shared **buttons** and section wrappers — do not invent one-off button styles per section.
- Section spacing: decide a standard early (e.g. outer section margin) and do not “also tweak” padding when asked for margin.
- Responsive: one stylesheet strategy; design refs define breakpoints; verify desktop/tablet/mobile before done.
- A11y/SEO: semantic HTML, real heading order, labeled controls, crawlable content (not JS-only text).

### Avoid generic AI UI

No unnecessary gradients, card grids everywhere, glassmorphism, bento dashboards, heavy shadows, pill spam, or stock imagery replacements when design assets exist.

---

## 10. URLs, canonicals, trailing slashes & Cloudflare (Xoomplus lessons)

Hard-won from go-live on **Xoomplus** (Astro + `@astrojs/node` + Express `server.js` + Passenger + Cloudflare). Apply these before inventing a new slash/canonical scheme.

### Preferred URL policy

- **Preferred path form:** slashless except homepage — e.g. `https://xoomplus.co.uk/services/web-design-development` (not `…/development/`).
- **Homepage canonical:** `https://xoomplus.co.uk/` (trailing slash after origin is correct).
- **Canonical tags:** always absolute, HTTPS, production host (`https://xoomplus.co.uk`), **no** query/hash, **no** trailing slash (except `/`).
- Emit canonical from **one** shared SEO component (`Seo.astro`). Do **not** let WordPress/Yoast override the public Astro canonical.
- Sitemap static + blog locs should match the preferred slashless form (same policy as canonicals).

### Staging → live indexing

- Site-wide noindex lived in `site-flags.mjs` → `SITE_NOINDEX`. Flip to `false` before Google indexing; rebuild/redeploy; purge CF for `/robots.txt` and HTML.
- `RESPECT_CMS_NOINDEX` must stay `false` if the CMS marks everything noindex for “discourage search engines” — otherwise blogs inherit CMS noindex on the public host.
- Strip Yoast `noindex` from mapped page SEO on the Astro host unless intentionally set via the `noindex` prop (e.g. 404).
- GSC “Excluded by noindex” after go-live is often **stale crawl history** — use URL Inspection → Test live URL.

### Trailing-slash redirects (do this once, carefully)

**Symptom of a loop:** browser oscillates `/page` ⇄ `/page/` (ERR_TOO_MANY_REDIRECTS).

**Root cause:** one layer **adds** a trailing slash while another **removes** it.

| Layer | Safe role |
|---|---|
| Apache `DirectorySlash` | Must be **`Off`** — otherwise Apache adds `/` for real directories under `dist/client` |
| Cloudflare Redirect / “Normalize URLs” | Must **not** “Add trailing slash”. Strip-only is OK if origin does not also strip in a conflicting way — prefer **one** strip owner |
| Express `server.js` | **Preferred owner** of `/path/` → **301** → `/path` for Passenger production (runs before `express.static`) |
| Astro middleware | Same strip for **`astro dev` + SSR** (dev never hits `server.js`) |
| `.htaccess` | Do **not** also 301-strip if Express already does — duplicate owners caused fights. Keep `DirectorySlash Off` + rewrite slashless → `index.html` |
| Astro `trailingSlash` | Prefer `'ignore'` when Express/middleware own normalization — avoid Astro adding reciprocal redirects |

**Rules that prevented loops on Xoomplus:**

1. **Strip only — never add** a trailing slash in app code.
2. Put production strip in **`server.js` only** (one hop, preserve `?query`, skip `/`, `/api/`, `/_astro/`, media, `robots.txt`, `*.xml`, file extensions).
3. Put the **same strip logic in Astro middleware** so localhost `npm run dev` behaves; Express still owns static HTML on Passenger.
4. After deploy: **Purge Cloudflare Everything** — CF was serving **HIT 200** HTML for `/path/` while origin already had 301s (looked like “redirects don’t work”).
5. Browser Cache TTL must be **Respect Existing Headers**. A fixed 1-year TTL appended `max-age=31536000` and pinned stale HTML/canonicals (missing tags until hard refresh).

### SEO extension labels (expected)

| Address bar | Canonical in HTML | Extension label |
|---|---|---|
| `/services/…` (slashless) | same slashless URL | **Self-referencing** ✓ |
| `/services/…/` (with slash) | preferred slashless URL | **Canonicalised** ✓ (consolidates to preferred) |

If slash URLs **301** to slashless first, the extension usually only evaluates the final URL → Self-referencing. If both return 200 with the same preferred canonical, slash URL correctly shows Canonicalised — that is not a bug.

### Canonical “missing until refresh”

Usually **Cloudflare / browser cache** of old HTML (built without `SITE_URL`, or pre-canonical fix), not client-side injection. Fix: Prefer Existing Headers + purge CF + ensure `SITE_URL` at build; Seo component may hard-fallback origin to `https://xoomplus.co.uk` so canonicals never vanish when `Astro.site` is unset.

### Alt text / a11y

- Empty `alt=""` on meaningful images/icons was cleaned site-wide; decorative icons may keep `aria-hidden` but prefer non-empty alt when the user asks for alts on every image.
- Do not invent UI while fixing alts — props/text only.

### Go-live build reminder

```bash
SITE_URL=https://xoomplus.co.uk npm run build
# Deploy dist/ + server.js + site-flags.mjs + site-robots.mjs + .htaccess
# Restart Passenger; purge Cloudflare (HTML, /robots.txt, /sitemap_index.xml)
```

---

## 11. Mistakes checklist (never again)

| Mistake | Do this instead |
|---|---|
| Coding from a screenshot without “implement” | Analyze / plan first |
| Redesigning because it “looks better” | Match the design reference |
| React/GSAP on static marketing pages | CSS + tiny islands |
| Lazy-loading the hero/LCP image | Eager + high priority for LCP |
| Blind WebP conversion / overcompression | Format by need; protect quality |
| Putting logo/hero in WordPress | `public/` static assets |
| Shipping SSR to cPanel File Manager | Static `dist/` upload |
| Zipping the `dist` folder itself | Zip **contents** of `dist/` |
| Testing perf only in `astro dev` | Measure production `dist/` |
| Adding ClientRouter for “feel” | Prefetch; protect LCP |
| Asking agent to “scan whole repo” | Point to files / symptoms |
| One mega-prompt for everything | Phased, scoped prompts |
| New button CSS per section | Shared Button components |
| Duplicating Yoast into custom meta | Map `yoast_head_json` once |
| Silent empty blog on WP failure | Fail build / show clear error |
| Dual Vercel+cPanel from day one | Pick one host model first |
| Re-explaining rules every chat | Playbook + `.cursor/rules` |
| Trailing-slash 301 in Express **and** Apache **and** CF | One strip owner; `DirectorySlash Off`; no CF “add slash” |
| Expecting `server.js` redirects under `astro dev` | Middleware for dev; Express for Passenger |
| Leaving `SITE_NOINDEX=true` at go-live | Flip flag + rebuild + purge robots/HTML |
| Trusting CF HIT without purge after SEO deploys | Purge Everything; verify with `curl -sI` |
| Letting Yoast CMS noindex onto public Astro | Strip / `RESPECT_CMS_NOINDEX=false` |
| Reciprocal slash redirects (add ↔ remove) | Strip only — never add |

---

## 12. Development speed (without burning tokens)

- Establish **rules once** (playbook + small `.mdc` files), then task prompts stay short.
- Build **section-by-section** after a short plan, not the entire site in one agent turn.
- Keep a shared `Button`, `Section`, layout, and global tokens from day one.
- Run `astro dev` in background; don’t restart unless config changed.
- Use production build sparingly: after perf-sensitive or deploy-related changes — not after every text edit.
- When the agent is wrong, correct with a **surgical** instruction, don’t restart the whole feature from zero unless architecture is wrong.
- New chat per major track: Design fidelity · Performance · CMS/SEO · Deploy.

---

## 13. First-week setup for a new Astro site

1. Create Astro project; choose **static** if target is cPanel.
2. Add `.env.example` with `SITE_URL` (+ WP vars if needed).
3. Add `public/.htaccess` early if cPanel is the host.
4. Copy this playbook + starter rule below.
5. Lock design workflow: analyze → plan → implement.
6. Add shared layout, fonts, buttons, section spacing **before** page sprawl.
7. Wire perf habits: no lazy LCP, local fonts, minimal JS.
8. Document one deploy path in `deploy/cpanel-static.md` (build → zip contents → `public_html`).
9. Only then add WP blog / forms / extras.

---

## Starter always-apply rule (paste into new projects)

Save as `.cursor/rules/astro-playbook.mdc`:

```mdc
---
description: Astro site playbook — static-first, perf, cPanel, low tokens, design fidelity
alwaysApply: true
---

# Astro playbook (summary)

Full detail: `.cursor/ASTRO-SITE-PLAYBOOK.md`

## Workflow
- Analyze → plan → implement only when user explicitly asks to build.
- Design/image alone is not permission to code. No invented UI when design is missing/absent pieces.

## Scope & tokens
- Touch only files needed for the task. No repo-wide scans, no `node_modules`/cache reads, no alternate implementations unless asked.
- Prefer smallest change; concise replies.

## Stack defaults
- Prefer `.astro` + static HTML/CSS. No React/Vue/Svelte unless required.
- No new libraries without a one-line justification and user OK when unsure.
- Marketing/cPanel sites: static `dist/` — do not add SSR adapters unless the host requires them.

## Performance
- Never lazy-load LCP/hero image. Reserve space (CLS). Local fonts + font-display.
- No static GSAP in layouts; hydrate only real islands. Prefer prefetch over ClientRouter.
- Validate perf on production build, not only `astro dev`. Do not change approved design for shortcuts.

## Assets & CMS
- Fixed design assets in `public/`. Editorial media stays in CMS when headless WP is used.
- Native `fetch` for WP REST; one shared SEO mapping from `yoast_head_json` when Yoast is used.

## Deploy (cPanel static)
- Build with `SITE_URL` set → upload **contents** of `dist/` to `public_html` including `.htaccess`.
- Rebuild after CMS changes on static sites.

## UI
- Reuse shared buttons/sections; no one-off button styles. No generic AI card/gradient spam.
```
