# Xoomplus Homepage Design

Source of truth: `design/screenshots/` and `design/assets/` (not Figma MCP).

## Global design tokens

Defined in `src/styles/global.css` (`@theme` + `@utility`).

### Colors
| Token | Value |
|------|--------|
| `primary` | `#FFA800` |
| `primary-black` | `#0A0A0A` |
| `secondary-white` | `#FFFFFF` |

### Brand gradient
```css
linear-gradient(90deg, #FFD36C 0%, #FFA800 50%, #FF7548 100%)
```
Utilities: `bg-brand-gradient`, `bg-button`

### Default button
- Text: `#0A0A0A` (`text-primary-black`)
- Padding: `28px` × `18px`
- Radius: `8px` (`rounded-button`)
- Backgrounds via utilities:
  - default: `bg-button`
  - hover: `bg-button-hover`
  - active/pressed: `bg-button-active`
  - focus: `bg-button` + focus ring
  - disabled: `bg-button-disabled` + text `#888888`
  - loading: `bg-button` + `src/assets/icons/btn-loading-icon.svg` (no text)

Component: `src/components/Button.astro`

### Typography
- Family: SF Pro Display (system stack fallback; no local font files yet)

## Homepage structure (from screenshot)
- Header: logo · centered pill nav · default button “Let’s Talk”
- Hero: `public/videos/bg-hero-video.webm` background + CSS ray (not `Rectangle 16` image)
- Trust bar: 4 Google signals
- Brands: title, disclaimer, logo row

## Assets
| File | Role |
|------|------|
| `public/videos/bg-hero-video.webm` | Hero background video |
| `public/images/hero-bg.png` | Video poster / LCP fallback |
| `Group 2 1699.png` → `logo-xoomplus.png` | Logo |
| Google / rating icons | Trust bar |
| Brand logos `image 65/66/69` | Brands row |
| `Rectangle 16.png` | Reference only — CSS recreation |
| `src/assets/icons/btn-loading-icon.svg` | Loading button icon |

## Gaps
- `public/videos/bg-hero-video.webm` not present in repo yet (wired; needs file)
- No local SF Pro Display files in `public/fonts/`
- No GO PSYCH / 4th brand logo
- No separate tablet/mobile/footer frames in `design/screenshots/`
