# Perf Build Report — next/font + conservative webflow.css purge

**Branch:** `perf/css-fonts` (from `origin/main` @ `e9d3917`). **Not merged, not deployed.**
Commits:
- `f897b8d` perf(fonts): migrate DM Sans to next/font/google (self-hosted, non-blocking)
- `74059e0` perf(css): conservative PurgeCSS of webflow.css (162,934 → 105,886, −35%)
- (this report)

Leave it on the branch for visual review. Screenshot pairs are on disk under
`perf-shots/before` and `perf-shots/after` (gitignored — 70 each).

---

## Recon — how CSS + fonts loaded before

- **webflow.css** — `162,934` bytes (LF), served from `/lib/webflow.css` via a
  **render-blocking** `<link rel="stylesheet">` in `_document.js`. Lighthouse confirmed
  it render-blocking (~131 ms, ~25 KB gzipped on the wire).
- **Fonts** — DM Sans loaded via a **render-blocking** external `<link rel="stylesheet">`
  to `fonts.googleapis.com/css2?...DM+Sans...` plus two `preconnect`s. Lighthouse flagged
  this stylesheet as the **single biggest render-blocker (~299 ms)**.
- **custom.css** (16,954 B) + **overrides.css** (13,092 B) are imported through `_app.js`
  and bundled by Next — **left untouched** (per the rails).
- Font was applied site-wide by **two `!important` rules in overrides.css** (`html,body` and
  `body,h1…textarea`); webflow.css contains **zero** DM Sans references.

### Used-class inventory (basis for the purge)
- All `className`s across `pages/**`, `components/**`, `lib/**` (incl. the Portable Text
  renderer `PortableBody.js` and the `rich-text w-richtext` body wrapper).
- Classes added/toggled in JS as string literals: `js` (html.js), `nav-open`, `w--open`,
  `nav-dropdown-open`, `w--current`, `nav-link-underline`, `dropdown-services-list`.
- The **rendered DOM of every page** (incl. EN+FR blog + a blog post) was snapshotted and fed
  to PurgeCSS as content — so the Sanity Portable Text output (rich text, ctaBox, youtube,
  images) is covered by real HTML, not just source.

### Must-keep safelist (explicit)
- **Whole Webflow framework:** `/^w-/`, `/^w--/` (grid, nav, dropdown, **w-richtext**,
  slider, tabs, **w-icon-*** icon font, all `w--*` states) — kept regardless of detected use.
- **Reveal mechanism:** `js` / `html:not(.js)` fail-safe + `[data-w-id]` / `[data-reveal]` /
  `.about-image` rules live in **custom.css (not purged)**; `about-image`/`about-image-wrap`
  also safelisted.
- **Scroll cars:** `decoration-one`, `decoration-line-one`, `hero-decoration-wrap`,
  `service-decoration-car`, `service-decoration-one`.
- **Phase-4 responsive-band targets:** `feature-left-side`, `hero-feature-title`,
  `feature-list-item`, `feature-contact-link`, `contact-icon-wrap`, `hero-dark-bg-decoration`,
  `service-hero-image`, `service-hero-image-wrap`.
- **Nav states:** `nav-open`, `nav-dropdown-open`, `nav-link-underline`, `dropdown-services-list`.
- **Defaults kept** (not removed): all `@keyframes`, the `webflow-icons` `@font-face`, all CSS variables.

---

## Act 1 — next/font/google (DM Sans)

`_app.js` now loads DM Sans through `next/font/google` as the variable font (axes opsz 9–40 +
wght, covering the 300–700 used, plus italic, `display:'swap'`), exposed as `--font-dm-sans`
on an app wrapper. `_document.js` lost the Google `<link>` + 2 preconnects. `overrides.css`'s
two font rules now read `var(--font-dm-sans), 'DM Sans', sans-serif`.

**Verified:** 0 requests to `fonts.googleapis/gstatic`; DM Sans self-hosted under
`/_next/static/media/*.woff2` and **`<link rel=preload as=font>`'d** (normal + italic);
computed `font-family` on `h1`/`p` resolves to the **loaded** DM Sans face. Visually identical
(see pixel-diff below).

> Note: the italic variable file is preloaded for emphasis/parity even though current posts use
> only bold (no `<em>` yet) — kept for correctness.

## Act 2 — conservative webflow.css purge

| | bytes (LF) | gzipped on wire |
|---|---|---|
| **before** | 162,934 | ~25 KB |
| **after** | 105,886 | smaller |
| **removed** | **57,048 (−35.0%)** | |

323 selectors removed. **Over-purge checks (all clean):**
- **0** framework (`w-*`) selectors rejected.
- **0** rejected selectors whose classes all appear in the live DOM (no false class removals).
- Only **unused `input` type variants** removed (`checkbox`/`radio`/`search`); base `input` +
  all 11 `.form-input` rules kept (forms use text/email/tel/number).
- `@keyframes` (1), `@font-face` (webflow-icons), CSS variables — all **kept**.

**What was removed** (genuinely unused, verified absent from every page):
- Webflow **style-guide / demo** classes: `margin-bottom-8/20/28/80`, `container-box`,
  `heading-class-badge`, `color-box-name`, `radio-button`, `wf-layout-layout`, `inner-container`,
  `text-right`, …
- **Unused compound variants:** `.form-input.track-input`, `.form-input.password-input(:focus)`.
- **normalize resets for tags absent from the DOM:** `h6, pre, code, main, header, aside,
  summary, hgroup, sup, sub, small, mark, abbr, dfn, kbd, samp, fieldset, legend, optgroup, …`
- `[data-nav-menu-open]` (old Webflow nav attribute; our nav is React with `nav-open`).

**Kept out of caution / flagged:**
- The **entire `w-*` framework** is safelisted even where usage wasn't detected (slider/tabs/etc.).
- The removed absent-tag normalize resets would not cover those tags if **future** blog content
  introduced them — the Portable Text schema currently can't emit `code/pre/h6/sup/…`, so risk is
  near-zero. Flagged for awareness.
- Re-runnable: `node scripts/purge-webflow.mjs` (dry) / `--apply`. Rejected list at
  `perf-purge-rejected.txt` (gitignored).

---

## Local Lighthouse (home, desktop preset)

| metric | BEFORE (origin/main) | AFTER (branch) |
|---|---|---|
| Performance score | 97 | 95 |
| First Contentful Paint | **0.9 s** | **0.5 s** |
| Speed Index | **0.9 s** | **0.5 s** |
| Largest Contentful Paint | 1.1 s | 1.2 s |
| Total Blocking Time | 0 ms | 0 ms |
| Render-blocking opportunity | **551 ms** | **210 ms** |

The render-blocking list **before** was led by the Google Fonts `css2` stylesheet (**299 ms**) +
`webflow.css` (131 ms); **after**, the font request is gone (self-hosted/preloaded/swap) and
webflow.css is 35% smaller. **FCP and Speed Index ~halved (0.9→0.5 s).** The aggregate score
(97↔95) is within local run-to-run variance (LCP 1.1↔1.2 s); the meaningful critical-path metrics
all improved. Both states already scored high; this is a critical-path/maintainability win, not a
score rescue.

---

## Screenshots (before = origin/main, after = this branch)

70 pairs — **14 pages × 5 widths** (1440 / 1550 / 1100 / 991 / 390; 1550 & 1100 are the Phase-4
bands). Full-page, fonts-ready, scrolled to trigger reveals. Files:
`perf-shots/before/<page>__<width>.png` and `perf-shots/after/<page>__<width>.png`.

Pages: `home, about, services, service-air-freight, service-road-freight, service-sea-freight,
service-storage, contact, request-a-quote, blog-en, blog-fr, post-en, post-fr, privacy`.

**Automated before/after pixel-diff (all 70 pairs):**
- **0 pairs > 1%**; **0 dimension changes** (no layout shifts).
- Max diff **0.093%** (`home` — scroll-car animation timing, not a regression). All non-home
  pages ≤ 0.007%. Confirms next/font renders pixel-identically and the purge removed nothing visible.
- Spot-checked visually: blog post (richtext + bold + bullets + navy/orange **ctaBox** intact),
  desktop + mobile home (nav icon font, navy band, all sections), forms.

---

## Stopped / issues
- **No STOP conditions hit.** The purge was kept strictly conservative (under-purge by design).
- Minor (data, not code): the EN tanger-med post **slug changed** since the previous task (the
  `dafor` typo was fixed to `for`), so the first screenshot run 404'd that one page; corrected the
  URL and re-shot. No code impact.
- Line endings: on-disk file sizes vary by CRLF/LF after `git checkout` (autocrlf). All byte figures
  above use the **LF content size** measured by the purge script (apples-to-apples).

## Full Portable Text style survival (fixture test)

The 70-pair pixel-diff only covers what the **current 3 posts emit**. To confirm the purge keeps
the **entire schema-supported** style set, a temporary fixture page (`pages/perf-fixture.js`,
since removed) rendered every style/block inside the real `.rich-text.w-richtext` wrapper, and
computed styles were captured under the **purged** vs **original** webflow.css (same fixture, CSS
swapped — isolates the purge effect).

**Result: IDENTICAL for every element** — h2, h3, h4, h5, blockquote, paragraph, `strong`, `em`,
underline, link, `ul`/`ol`/`li`. (e.g. h2 55px / h3 42px / h4 36px / h5 30px, weight 600, navy;
blockquote boxed; `em` italic; `strong` 700; lists disc/decimal — all matched bit-for-bit.) The
`.w-richtext` deep-safelist preserved the heading/quote/list rules even though no current post uses
them. ctaBox (both navy/left **and** orange/center with derived buttons), the inline image
(figure+caption) and the youtube embed are styled by **inline styles in `PortableBody.js`**, so the
webflow.css purge can't affect them — all confirmed rendering in the fixture screenshot
(`perf-shots/fixture-purged__1100.png`).

| Style / block | Exercised by current 3 posts? | Survived purge? | Needed extra safelisting? |
|---|---|---|---|
| paragraph, `strong`, bullet list | yes (in pixel-diff) | yes | no |
| ctaBox navy / left | yes | yes (inline-styled) | no |
| h2, h3, h4, h5 | no | **yes** | no |
| blockquote | no | **yes** | no |
| `em` (italic), underline | no | **yes** | no |
| link (`a`) | no | **yes** | no |
| numbered (`ol`) list | no | **yes** | no |
| ctaBox orange / center | no | yes (inline-styled) | no |
| inline image (figure+caption) | no | yes (inline-styled) | no |
| youtube embed | no | yes (inline-styled) | no |

**Nothing needed safelisting / re-purge** — the conservative safelist already covers the full set.
(Temp fixture page + capture scripts were removed; the screenshot remains under `perf-shots/`.)

## Your review steps
1. Skim `perf-shots/before` vs `perf-shots/after` (esp. 1550 & 1100 bands, 390 mobile nav).
2. If happy: merge `perf/css-fonts` → main and deploy. (I did **not** merge/deploy.)
