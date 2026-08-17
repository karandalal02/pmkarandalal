# Fix the social preview image (og:image)

## Problem

When the site link is shared, the link card shows a **Lovable placeholder** image and template-default text:

- `og:image` / `twitter:image` → `https://lovable.dev/opengraph-image-p98pqg.png` (placeholder)
- `og:title` → `karan-dalal-pm-hub` (template default)
- `og:description` → `Lovable Generated Project` (template default)
- `twitter:site` → `@lovable_dev` (wrong brand)

Social crawlers (LinkedIn, Twitter/X, Slack, iMessage) read these static meta tags from `index.html`, so the whole share card is generic right now.

## Plan

### 1. Generate a custom 1200x630 social preview image

Create a premium-quality image that conveys the **product/UX vibe** of the site — minimalist tech style, light background, dark text, clean typography, no clutter, no location/mentor text. Composition:

- Bold name "Karan Dalal" and "Product Manager"
- One product-vibe line echoing the Hero: "Designing digital products with an emphasis on user experience"
- Subtle abstract geometric motif (dots/grid lines) to hint at product thinking — no busy gradients
- Save to `public/og-image.png` (served at `https://pmkarandalal.lovable.app/og-image.png`)

### 2. Update `index.html` meta tags

Replace the placeholder/template defaults with real, on-brand values:

- `og:title` → "Karan Dalal — Product Manager"
- `og:description` → match the site description (Senior PM, UX-driven product work)
- `og:image` → `https://pmkarandalal.lovable.app/og-image.png`
- `og:url` → `https://pmkarandalal.lovable.app/`
- `twitter:title` / `twitter:description` → same as og
- `twitter:image` → `https://pmkarandalal.lovable.app/og-image.png`
- Remove `twitter:site="@lovable_dev"` (no brand Twitter handle) or leave it out
- Keep `twitter:card` = `summary_large_image`

### 3. Tell the user about crawler caching

Crawlers cache the last preview they scraped, so the new image won't appear in shared links until each platform re-fetches on its own schedule. Force a refresh in each platform's link-preview debugger (LinkedIn Post Inspector, Twitter Card Validator, Slack). Note this is a one-time heads-up, not code.

## Notes

- Classic Vite SPA = single static HTML doc, so app-level og tags are correct here (no SSR needed for a portfolio share card).
- Uses absolute `https://` URL pointing at the published domain, which is what social crawlers require.

use image:  [https://www.pexels.com/photo/36059681/. in](https://www.pexels.com/photo/36059681/)  
  
in a way that the left side of image is coverd with my profile  photo like how linkedin does   
  
show preview image first