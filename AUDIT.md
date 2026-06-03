# MH Cargo — Next.js Site Audit

**Mode:** Read-only inspection. No files were changed.
**Stack:** Next.js 16.1.6 (Pages Router), React 19.2.3, next-i18next (en/fr), MDX blog.
**Origin:** Webflow template (`cargon-wbs.webflow.io`) mirrored via Mirrify, then re-created in Next.js by an AI. Expect Webflow leftovers and non-idiomatic patterns — confirmed throughout.

Priority key: **P0** = ship-blocker / costs leads or rankings now · **P1** = important, fix soon · **P2** = cleanup / polish.

---

## 1. Webflow Leftovers

### 1.1 Full Webflow + jQuery runtime shipped on every page — P0
**For the user:** ~700 KB of render-blocking / parse-heavy JavaScript that the site barely uses, slowing every page load on mobile.
**Technical:** [pages/_document.js](pages/_document.js#L73-L80) loads, on *every* page, `public/lib/jquery.min.js` (89 KB), `webflow-chunk1.js` (41 KB), **`webflow-chunk2.js` (400 KB)**, `webflow-chunk3.js` (9 KB), plus `webflow.css` (163 KB) and `webflow-page.js`. The IX2 interaction engine these power has been *partially reimplemented by hand* in [pages/_app.js](pages/_app.js) (scroll reveal, image overlays, hover) — so the heavy runtime is largely redundant. jQuery has no application code depending on it beyond Webflow. This is the single biggest payload and CWV problem on the site.

### 1.2 `data-w-id`, `w-*` classes, and IX2 markup pervade every page — P1
**For the user:** Brittle animations that depend on a foreign runtime; markup is hard to maintain.
**Technical:** ~30 `data-w-id` attributes per page (e.g. [pages/index.js](pages/index.js#L77), [components/Navbar.js](components/Navbar.js#L42)), plus `w-nav`, `w-dyn-list`, `w-layout-grid`, `w-inline-block`, `w-richtext` classes throughout. These are Webflow IX2 hooks and layout primitives. They are inert without the Webflow runtime and couple the DOM to it.

### 1.3 Several pages pull the Webflow JS bundle from the live Webflow CDN — P1
**For the user:** Third-party dependency on Webflow's servers for a site that's supposed to be self-hosted — adds a blocking external request, a privacy/data leak to Webflow, and breaks if the CDN URL rotates.
**Technical:** [pages/blog.js](pages/blog.js#L26), [pages/blog/[slug].js](pages/blog/[slug].js#L74), [pages/contact.js](pages/contact.js#L13), and faqs/services pages set `pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.*.js"`. So those pages load the Webflow runtime *twice over* (local chunks from `_document` **and** the CDN file). The hashed filename is pinned with an SRI integrity hash that will hard-fail the script if Webflow re-publishes.

### 1.4 `faqs.js` hotlinks images directly from the Webflow CDN — P1
**For the user:** Icons that vanish if Webflow deletes the asset; needless external requests.
**Technical:** [pages/faqs.js](pages/faqs.js#L41) and others reference `https://cdn.prod.website-files.com/.../...plus.svg` instead of a local `/brand/` asset. The asset exists nowhere in the repo, so the site permanently depends on Webflow hosting it.

### 1.5 `/undefined` navigation-blocker hack in `_document` — P2 (smell)
**For the user:** Invisible; but it signals an unresolved underlying bug.
**Technical:** [pages/_document.js](pages/_document.js#L26-L66) injects an inline script that monkey-patches `history.pushState`/`replaceState` and the Navigation API to swallow navigations to `/undefined`. This is a workaround for the Webflow CDN CMS scripts trying to navigate to a broken dynamic URL. The right fix is removing the offending Webflow CMS script, not patching the History API globally.

### 1.6 Webflow site-identity attributes still on `<html>` — P2
**Technical:** [pages/_document.js](pages/_document.js#L5) keeps `data-wf-domain="cargon-wbs.webflow.io"` and `data-wf-site="658a73e52a1131d1c3f0a037"`; each page passes a `pageId` (`data-wf-page`). Pure Webflow bookkeeping; safe to drop.

### 1.7 Hand-rolled IX2 re-implementation in `_app.js` is fragile — P1
**For the user:** Content can flash, jump, or stay hidden depending on script timing (this is exactly the class of bug fixed in commit `055dcba` "blog post content hidden on load").
**Technical:** [pages/_app.js](pages/_app.js#L7-L107) runs `initScrollReveal`/`initImageOverlays` with **timed rescans at 1s and 3s** to fight the late-loading Webflow CDN script that re-applies `opacity:0`. Racing two animation systems against each other with `setTimeout` is inherently flaky and frame-budget-costly.

---

## 2. Image Handling

### 2.1 Zero use of `next/image` — every image is a raw `<img>` — P0
**For the user:** No automatic resizing, no WebP/AVIF, no responsive `srcset`, no built-in lazy/priority strategy → larger downloads and slower LCP, especially on mobile.
**Technical:** `grep` finds **0** `next/image` imports and ~270 raw `<img>` tags across pages (25 in [pages/index.js](pages/index.js), 26 in pricing, 23 in faqs, 24 in team, etc.). PNGs like `Map footer.png`, `container.png`, `service-04.png` are served at native size to all viewports.

### 2.2 The `/brand/*` image rewrite defeats static serving and CDN caching — P0
**For the user:** Every brand image (logos, hero, all icons) is streamed through a Node serverless function on every request instead of being served as a static/CDN asset — slower TTFB per image and real serverless cost.
**Technical:** [next.config.mjs](next.config.mjs#L13-L22) rewrites `/brand/:path*` → `/api/brand/:path*`, and [pages/api/brand/[...path].js](pages/api/brand/%5B...path%5D.js) `fs.createReadStream`s the file with only `Cache-Control: public, max-age=86400` (no `immutable`, no long TTL, no `Content-Length`). These files **already live in `public/brand/`** and would be served directly (and CDN-cached) with no rewrite at all. The rewrite is a pure regression over default static handling, and it also makes these images impossible to optimize via `next/image`'s loader.

### 2.3 No `width`/`height` on images → layout shift (CLS) — P1
**For the user:** Content jumps as images load.
**Technical:** None of the raw `<img>` tags declare intrinsic dimensions (e.g. [components/Footer.js](components/Footer.js#L106), [pages/index.js](pages/index.js#L116)). Combined with no `next/image`, this guarantees CLS on image-heavy pages.

### 2.4 Inconsistent / wrong `loading` hints around the LCP element — P1
**For the user:** The largest above-the-fold image isn't prioritized; a tiny logo is needlessly deferred.
**Technical:** The hero image uses `loading="eager"` ([pages/index.js](pages/index.js#L116)) but has **no `fetchpriority="high"` / preload**, so it isn't treated as the LCP it is. Meanwhile the navbar logo uses `loading="lazy"` ([components/Navbar.js](components/Navbar.js#L36)) even though it's at the very top of every page. `next/image` with `priority` would fix both.

### 2.5 Dead `images` config — P2
**Technical:** [next.config.mjs](next.config.mjs#L7-L12) declares `remotePatterns` for `cdn.prod.website-files.com` and `cdn.sanity.io`, but no `next/image` is used and Sanity was removed (commit `1a22a51`). Dead config.

---

## 3. Core Web Vitals Risk Summary

- **LCP — P0:** Hero `container.png`/`container-fr.png` is a raw, unoptimized, un-prioritized PNG served through a function route (combines §1.1, §2.1, §2.2, §2.4). Render-blocking 700 KB JS bundle (§1.1) further delays it.
- **CLS — P1:** No image dimensions (§2.3); content blocks initialize at `opacity:0` and rely on JS reveal (see below) so they pop in.
- **TBT/INP — P1:** jQuery + 400 KB `webflow-chunk2.js` parse/execute on the main thread on every page (§1.1).
- **FOUC / hidden-content risk — P1:** Many headings and sections render with inline `opacity:0` and only become visible via the JS reveal in `_app.js` — e.g. the blog `<h1>`/`<h2>` at [pages/blog.js](pages/blog.js#L31) and dozens of `style={{opacity:0}}` nodes per page. **If JS fails or is slow, that content is invisible** (and invisible to some crawlers). This is a recurring bug class (commit `055dcba`).

---

## 4. SEO

### 4.1 No meta description, Open Graph, or Twitter cards anywhere — P0
**For the user:** Poor SERP snippets and ugly, untitled link previews when shared on WhatsApp/LinkedIn — directly costs click-through for a lead-gen site.
**Technical:** The only head tag is `<title>` in [components/Layout.js](components/Layout.js#L9-L11). `grep` finds **0** `name="description"`, `property="og:*"`, `twitter:*`, or `rel="canonical"` tags in the entire codebase. Blog posts have rich `excerpt`/`mainImage` frontmatter that is never surfaced as OG/description metadata.

### 4.2 No `robots.txt` and no `sitemap.xml` — P0
**For the user:** Crawlers have no sitemap to discover pages (worse given orphan pages in §7.1) and no robots directives.
**Technical:** `public/` contains only `brand/`, `lib/`, `locales/`, `favicon.ico`. No `robots.*`, no `sitemap.*`, no `next-sitemap` dependency or route.

### 4.3 No structured data (JSON-LD) — P1
**For the user:** Misses rich results for a local logistics business (Organization/LocalBusiness, BreadcrumbList, BlogPosting/Article).
**Technical:** No `application/ld+json` anywhere. A `LocalBusiness` block (address/phone already in [components/Footer.js](components/Footer.js#L69-L78)) and `Article` for blog posts are easy wins.

### 4.4 No `hreflang` alternates for the en/fr pages — P1
**For the user:** Google can't connect the English and French versions; risk of treating them as duplicates or serving the wrong language.
**Technical:** i18n is configured ([next-i18next.config.js](next-i18next.config.js)) and pages render in both locales, but no `<link rel="alternate" hreflang="...">` tags are emitted.

### 4.5 `<html lang>` is hard-coded to `en` even on French pages — P0 (SEO + a11y)
**For the user:** Screen readers pronounce French content with English phonetics; search engines mis-detect page language.
**Technical:** [pages/_document.js](pages/_document.js#L5) sets `<Html lang="en">` statically. `_document` can't see the locale, so FR pages ship `lang="en"`. Needs per-locale lang (e.g. via `_app`/`Head` or App Router metadata).

### 4.6 Titles are decent but unmanaged — P2
**Technical:** Titles are passed per page ([components/Layout.js](components/Layout.js)), but the home title contains a literal `&amp;` ([pages/index.js](pages/index.js#L65)) that will render as `&amp;`. No title template or default description.

---

## 5. Accessibility

### 5.1 Content hidden behind JS reveal (`opacity:0`) — P1
**For the user:** Users on slow connections or with JS disabled may see blank sections; the failure mode is silent. (Same root cause as §3 FOUC.)
**Technical:** Headings/sections initialized at `opacity:0` inline, revealed by IntersectionObserver in `_app.js`. If the observer never runs, content is unreadable.

### 5.2 Empty / placeholder alt text on meaningful images; generic alt elsewhere — P2
**Technical:** Decorative images correctly use `alt=""` ([pages/index.js](pages/index.js#L87-L88)), which is fine. But many content images use generic alt like `"Service Image"`, `"Container Image"`, `"Map Image"` ([pages/index.js](pages/index.js#L116-L159), [components/Footer.js](components/Footer.js#L111)) — non-descriptive. Worth a pass for real descriptions vs. truly-decorative `alt=""`.

### 5.3 Mobile nav toggle is non-functional markup — P1
**For the user:** On mobile, the hamburger may not open the menu without the Webflow nav runtime.
**Technical:** [components/Navbar.js](components/Navbar.js#L158-L160) renders Webflow's `.menu-button.w-nav-button` with no React handler — it relies entirely on the Webflow JS to toggle `.w-nav-menu`. The services dropdown ([Navbar.js](components/Navbar.js#L52-L88)) is likewise `data-hover` driven with no keyboard handler, so it's not keyboard-accessible.

### 5.4 Language switcher buttons lack accessible state — P2
**Technical:** [components/Navbar.js](components/Navbar.js#L116-L148) styles the active locale with bold font only; no `aria-pressed`/`aria-current` and color-only differentiation (contrast-dependent).

---

## 6. Forms & Core Functionality (Business-critical)

### 6.1 Contact and Quote forms don't submit anywhere — P0
**For the user:** A prospect fills out the quote/contact form, hits submit… and nothing is sent. **Leads are silently lost.** For a freight brokerage whose entire funnel is "request a quote," this is the most damaging issue on the site.
**Technical:** [pages/index.js](pages/index.js#L256) (`wf-form-Request-Form`), [pages/request-a-quote.js](pages/request-a-quote.js#L85), and [pages/contact.js](pages/contact.js#L55-L62) are Webflow forms with `method="get"` and **no `action`, no API route, no Formspree/email handler**. Submitting does a GET to the same page (params land in the URL and are discarded). The `.w-form-done`/`.w-form-fail` success/error blocks were wired to Webflow's hosted form backend, which no longer exists. Needs a real handler (API route → email/CRM, or a form service).

---

## 7. Dead Code, Orphan Pages & Unused Assets

### 7.1 Orphan pages — not linked from any nav, footer, or internal link — P1
**For the user:** Pages exist but are undiscoverable (and uncrawlable without a sitemap).
**Technical:** No internal `href` points to: [pages/team.js](pages/team.js), [pages/pricing.js](pages/pricing.js), [pages/faqs.js](pages/faqs.js), [pages/service-details.js](pages/service-details.js), [pages/privacy-policy.js](pages/privacy-policy.js). Of these:
- **`service-details.js`** is a generic Webflow template page (the original CMS "detail" stub) — almost certainly pure leftover; candidate for deletion.
- **`privacy-policy.js`** being unlinked is a compliance gap (should be in the footer, especially with a contact form collecting PII).
- `team` / `pricing` / `faqs` may be intentional — decide whether to link them or remove them.

### 7.2 Leftover Sanity Studio directory — P1
**For the user:** Nothing; pure repo bloat and confusion.
**Technical:** Commit `1a22a51` "remove Sanity" deleted the Sanity integration, but `studio/` (config, schemas, its own `package.json` + `package-lock.json`) is still tracked in `HEAD` (git status shows it deleted only in the working tree). Should be removed from version control. No `sanity` dependency remains in the root `package.json`, so the studio is orphaned.

### 7.3 Stale App Router remnants alongside Pages Router — P2
**Technical:** The repo tracks `app/layout.js` and `app/brand/[...path]/route.js` (deleted in the working tree per git status). The project is fully Pages Router; these App Router files are abandoned duplicates of the `pages/api/brand` route. Mixing `app/` and `pages/` invites confusion — clean out the `app/` tree entirely.

### 7.4 Committed dev/debug artifacts referencing another machine — P2
**Technical:** [snap-section.mjs](snap-section.mjs#L1-L2) and the CLAUDE.md screenshot workflow hard-code `C:/Users/nateh/...` paths (a different user than the current `T14s`). [screenshot.mjs](screenshot.mjs) and `snap-section.mjs` are throwaway Puppeteer scripts checked into the repo. `public/brand/test.txt`, `public/brand/IMG-20171207-WA0005.jpg`, and `MHCARGO_V1.pdf` look like stray uploads. `README.md` is still the untouched `create-next-app` boilerplate (mentions Geist font and `pages/api/hello` that don't exist).

### 7.5 Duplicate/unused brand assets — P2
**Technical:** Several near-duplicates ship in `public/brand/`: `service-ocean-info-02.jpg` **and** `.png`, `service-road-info-02.jpg` **and** `.png`. `puppeteer` (a heavy browser binary) is a `devDependency` used only by the screenshot scripts — fine to keep for tooling but worth noting it's not part of the app.

### 7.6 Large unused Webflow CSS — P1
**Technical:** `public/lib/webflow.css` is 163 KB of the full Webflow framework, loaded globally ([_document.js](pages/_document.js#L8)). The custom layer ([styles/overrides.css](styles/overrides.css), [styles/custom.css](styles/custom.css), ~890 lines total) overrides a slice of it with heavy `!important`. Most of the 163 KB is unused selectors. A purge/tree-shake pass would cut a large chunk of render-blocking CSS.

---

## 8. Blog Architecture (specifically requested)

### 8.1 Three hardcoded MDX posts with a custom bilingual delimiter — P1 (architecture)
**For the user:** Works today, but adding/editing posts requires a developer + redeploy; no non-technical authoring.
**Technical:** [lib/posts.js](lib/posts.js) reads three `.mdx` files from `posts/` via `gray-matter`. Bilingual bodies are stored in **one file split by a literal `\n---fr---\n` string** ([lib/posts.js](lib/posts.js#L29)) — a homegrown convention with no validation; a malformed delimiter silently drops the French body. Titles/excerpts are duplicated as `_fr` frontmatter keys. `getStaticPaths` has `fallback: false` ([pages/blog/[slug].js](pages/blog/[slug].js#L168)), so new posts 404 until rebuilt. This is fine for 3 posts but won't scale and isn't editor-friendly — if growth is expected, move to a CMS or at least validate frontmatter; if not, document that it's intentionally minimal.

### 8.2 `next-mdx-remote` serialization at build is heavier than needed — P2
**Technical:** [pages/blog/[slug].js](pages/blog/[slug].js#L175-L178) uses `next-mdx-remote/serialize` for static local files. For build-time-known content, `@next/mdx` (compile-time) or App Router MDX would be lighter and avoid shipping the runtime serializer. Minor given the post count.

### 8.3 Blog images bypass optimization and share the brand folder — P2
**Technical:** Post `mainImage` paths point into `/brand/` (e.g. `posts/...mdx` → `/brand/5 Common Mistakes...jpg`), so they inherit the §2.2 function-route penalty and §2.1 no-optimization penalty. Filenames contain spaces, which is fragile.

---

## 9. Internationalization

### 9.1 Locale switch reloads with potential mistranslation of dynamic routes — P2
**Technical:** [components/Navbar.js](components/Navbar.js#L12-L14) switches locale via `router.push(router.pathname, router.asPath, { locale })`. Combined with the hard-coded `<html lang="en">` (§4.5) and missing `hreflang` (§4.4), the i18n setup is functional but SEO-incomplete. `localeDetection:false` ([next.config.mjs](next.config.mjs#L6)) means first-time visitors always land in English regardless of browser language — intentional, but worth confirming.

---

## 10. Quick-Win Checklist (suggested order — no code yet)

| # | Finding | Priority |
|---|---------|----------|
| 1 | Forms submit nowhere — leads lost (§6.1) | **P0** |
| 2 | Add meta description / OG / Twitter (§4.1) | **P0** |
| 3 | Add robots.txt + sitemap.xml (§4.2) | **P0** |
| 4 | Fix `<html lang>` per locale (§4.5) | **P0** |
| 5 | Remove the `/brand` function rewrite; serve statically + adopt `next/image` (§2.1, §2.2) | **P0** |
| 6 | Strip jQuery + Webflow runtime; rely on the hand-rolled reveal only (§1.1, §1.3) | **P0/P1** |
| 7 | Purge unused Webflow CSS (§7.6) | **P1** |
| 8 | hreflang + JSON-LD (§4.3, §4.4) | **P1** |
| 9 | Resolve orphan pages; link privacy policy; delete `service-details` (§7.1) | **P1** |
| 10 | Remove `studio/`, stale `app/`, debug scripts, README boilerplate (§7.2–7.4) | **P2** |

---

### Method note
Findings are based on static inspection of the committed source (pages, components, config, lib, public assets, posts). Bundle sizes are file-on-disk sizes, not measured runtime transfer. CWV impacts (§3) are predicted from code patterns, not from a Lighthouse run against a live build — a follow-up Lighthouse/WebPageTest pass would quantify them.
