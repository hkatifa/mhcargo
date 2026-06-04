# docs/cms.md — Blog CMS (Sanity)

## Goal
Replace the MDX blog with a Sanity-backed bilingual (EN/FR) blog. A non-technical author
publishes from Sanity Studio; posts appear on mhcargo.ma within seconds, no redeploy.

## Locked decisions
- **Project**: reuse existing Sanity project `qmzq54py`, dataset `production`. Code rebuilt
  fresh (old code not recovered); old schema kept only as a design reference.
- **Localization**: document-level via `@sanity/document-internationalization` — one document
  per language, EN↔FR linked; `language` field per doc.
- **Studio**: standalone, Sanity-hosted (not embedded); current Sanity version; author-facing
  labels in French.
- **Fetch**: ISR (`getStaticProps` revalidate + `getStaticPaths` `fallback:'blocking'`) plus an
  on-demand revalidation webhook (Sanity publish → Next API route → revalidate affected paths).
- **Bilingual launch**: 3 posts in EN + FR. Per-locale listing hides untranslated posts.
- **Auth**: public/CDN read (no token). Write = Studio (Sanity auth) + a local-only write token
  for the migration script (never in the site bundle).
- **SEO**: meta description ← `excerpt`; OG image ← `mainImage`. No author field, no categories.

## Schema — `post`
title (req) · slug (req, from title) · language (i18n plugin) · publishedAt (req) ·
mainImage (image + hotspot + alt) · excerpt · body (Portable Text).
Body blocks:
- rich text: styles normal/h2–h5/blockquote; marks strong/em/underline; link
- image: hotspot + alt + optional caption (unlimited, inline)
- ctaBox: heading, text, buttonLabel, buttonUrl, background (navy `#212C42` | orange `#F04A23`),
  textAlign (left | center). Button color = opposite of background, derived at render (not a field);
  white text.
- youtube: url

## Build chunks
1. Standalone Studio + schema (this chunk).
2. Next integration: read client, GROQ, Portable Text renderer (image/ctaBox/youtube → components,
   next/image via Sanity image-url), wire /blog + /fr/blog + [slug] with ISR + hide-untranslated.
3. On-demand revalidation webhook.
4. Migration script: repo MDX (EN+FR) → Portable Text + uploaded image assets → 6 linked docs.
5. Cutover: site reads from Sanity, deprecate posts/*.mdx + lib/posts.js; invite the 2 users.

## Out of scope
App Router; embedding the Studio; author bylines; categories/tags; comments.