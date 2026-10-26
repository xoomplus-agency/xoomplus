# Deploy static Xoomplus to cPanel `public_html`

No Node on the server. WordPress stays the CMS; Astro HTML is built on your PC (or CI).

## 1. Configure `.env` (local build machine)

```env
SITE_URL=https://xoomplus.co.uk
WP_BASE_URL=https://xoomplusagency.com
PUBLIC_WP_API=https://xoomplusagency.com/wp-json/wp/v2
PUBLIC_CF7_FORM_ID=123
```

CF7 form ID: WordPress → Contact → edit form → URL contains `post=123`.

Match CF7 field names to the Astro form (or set `PUBLIC_CF7_FIELD_MAP`). Defaults:

| Astro `name=` | CF7 mail-tag |
|---------------|--------------|
| name | your-name |
| email | your-email |
| company | your-company |
| phone | your-phone |
| details | your-message |
| website | your-website |
| budget | your-budget |
| services | your-services |
| source | your-source |

Enable CORS on WordPress for your Astro domain (CF7 REST + blog load-more).

## 2. Build

```bash
npm ci
npm run build
```

Output: `dist/` (HTML, `_astro/`, images, `.htaccess`).

## 3. Upload to cPanel

1. Zip the **contents** of `dist/` (not the `dist` folder name itself).
2. File Manager → `public_html` → Upload → Extract.
3. Confirm `index.html`, `_astro/`, `.htaccess` are at the root of `public_html`.

## 4. After WP content changes

Rebuild and re-upload (or automate FTP from GitHub Actions). Blog cards “Load more” still call live WP REST in the browser.
