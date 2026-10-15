# Project Changelog - Hotel Serene Praia

## [2026-10-15] - Technical SEO & Google Search Console Alignment Overhaul

### Changes Made & Updates
- **Domain Canonicalization & Alignment**:
  - Aligned custom production domain across all application metadata to `https://www.hotelserenepraia.in` (matching live Vercel production redirect consolidation).
  - Updated `src/config/seo.ts` (`siteUrl: 'https://www.hotelserenepraia.in'`).
  - Updated `src/config/contacts.ts` (`website: 'https://www.hotelserenepraia.in/'`).
  - Aligned all 12 page canonical definitions in `src/data/seoData.ts` to `https://www.hotelserenepraia.in`.
  - Added static canonical and description fallback tags in `index.html`.
  - Created `src/siteSeo.ts` defining canonical domain and path constants.
- **Sitemap & Robots Alignment**:
  - Updated `public/robots.txt` pointing to `https://www.hotelserenepraia.in/sitemap.xml`.
  - Updated all 29 URLs in `public/sitemap.xml` to `https://www.hotelserenepraia.in` with fresh `lastmod` dates.
- **Soft-404 Validation**:
  - Validated `src/pages/NotFound.tsx` which renders `<SEOHead noindex={true} />` ensuring 404 responses are marked `noindex, nofollow` to prevent soft-404 indexing.

### Files Created
- `src/siteSeo.ts`
- `PROJECT_CHANGELOG.md`

### Files Modified
- `index.html`
- `src/config/seo.ts`
- `src/config/contacts.ts`
- `src/data/seoData.ts`
- `public/robots.txt`
- `public/sitemap.xml`
