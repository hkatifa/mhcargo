# CMS Build — Morning Report (Sanity blog)

**Branch:** `cms/sanity` (5 commits, below). `main` is **untouched** (`b44f492`).
**Nothing is live.** No merge to main, no production deploy, no Vercel env changes,
no webhook configured, no old documents deleted — those are your steps (checklist at end).

**Studio deployed (allowed):** https://mh-cargo.sanity.studio/
— project `qmzq54py`, dataset `production`, authed as `ham.katifa@gmail.com`.

---

## What was built, per stage (with commit hashes)

| Stage | Commit(s) | What |
|------|-----------|------|
| 1. Studio + schema | `5553010`, `1c928bd` | Standalone `studio/` (Sanity v5) with `@sanity/document-internationalization` v6 (EN/FR). `post` schema (EN field names, FR labels). Built, schema-extracted, and **deployed** to mh-cargo.sanity.studio. |
| 2. Next integration | `85ffec3` | `lib/sanity.js` (public CDN read, no token), `lib/queries.js` (GROQ), `components/PortableBody.js` + `SanityImage.js`. Rewired `/blog`, `/fr/blog`, `/blog/[slug]`, the **home** latest-posts, and **sitemap** to Sanity. ISR (`revalidate: 60` + `fallback:'blocking'`), per-locale `language==$locale` (hides untranslated). |
| 3. Revalidation | `6cebc11` | `pages/api/revalidate.js` — shared-secret POST endpoint, revalidates affected paths. |
| 4. Migration | `a146e2b` | `scripts/migrate-mdx-to-sanity.mjs` + content seeded (6 posts + 3 translation links + 3 images). |

Commits:
```
a146e2b CMS stage 4: MDX -> Sanity migration script + content seeded
6cebc11 CMS stage 3: on-demand revalidation API route
85ffec3 CMS stage 2: Next reads blog from Sanity (ISR + bilingual)
1c928bd CMS stage 1: pin Studio deployment appId (non-interactive deploys)
5553010 CMS stage 1: standalone Sanity Studio + bilingual post schema
```

### Verified
- Studio: `sanity build` + schema extract confirm all fields/blocks; deployed OK.
- Pages: build is SSG+ISR; `/blog`, `/fr/blog`, `/blog/[slug]`, `/fr/blog/[slug]` all render
  **real migrated content in both locales with 0 console errors**.
- ctaBox renders with the **derived** button colour: navy box `#212C42` → **orange button
  `#F04A23`**, white text, left-aligned (verified computed styles).
- Revalidate route: 401 without/blank secret, 405 on GET, 200 + all paths on valid secret.
- Read-back: 6 docs with correct titles/slugs/block counts; EN↔FR linked via `translation.metadata`.

---

## Dataset backup (taken BEFORE any write — confirmed success)

```
studio/backups/production-20260604-050946.tar.gz   (3 documents, 4 assets, ~3.7 MB)
```
Restore if ever needed:
```
cd studio && npx sanity dataset import backups/production-20260604-050946.tar.gz production
```
(The backup is gitignored — it lives only on this machine. Copy it somewhere safe.)

---

## What was migrated

6 `post` documents + 3 `translation.metadata` (deterministic IDs, idempotent — re-running
the script re-seeds identical content), and 3 uploaded image assets:

| Slug | EN id / FR id | metadata id |
|------|---------------|-------------|
| `tanger-med-...business` | `migrated-en-…` / `migrated-fr-…` | `migrated-tx-…` |
| `road-freight-vs-air-freight-...shipment` | `migrated-en-…` / `migrated-fr-…` | `migrated-tx-…` |
| `5-common-mistakes-...goods` | `migrated-en-…` / `migrated-fr-…` | `migrated-tx-…` |

> **Pre-existing docs left untouched:** the dataset already had **3 `post` documents with no
> `language` field** (from the earlier integration). They are invisible on the site (every query
> filters `language == <locale>`) and were **not** modified or deleted. Clear them yourself when ready.

---

## MDX → Portable Text mapping (and judgment calls)

Source bodies used only a small feature set, so the conversion is faithful and unambiguous:

| MDX | Portable Text | Note |
|-----|---------------|------|
| paragraph | `block` style `normal` | soft line-breaks (single `\n`) joined with a space — matches MDX render |
| `**bold**` | span `marks:['strong']` | only inline mark present |
| `- item` | `block` `listItem:'bullet'`, `level:1` | |
| `<CTABox heading description buttonLabel buttonUrl />` | `ctaBox` | see judgment calls |

**Judgment calls (please skim the migrated docs against these):**
1. **`**Heading** :` pseudo-headings stayed as bold paragraphs**, not promoted to `h2/h3`,
   because that's how MDX rendered them. If you'd prefer real headings, change them in Studio
   (the schema supports H2–H5).
2. **CTABox → ctaBox:** MDX `description` → `text`. The MDX CTA had no background/alignment, and
   the new schema requires them, so I defaulted **background = navy, textAlign = left** (→ derived
   orange button). Authors can switch to orange per box in Studio.
3. **CTA `buttonUrl` preserved verbatim** = `https://mhcargo.vercel.app/request-a-quote` (an absolute
   vercel.app URL from the MDX). **Recommend** changing to `/request-a-quote` (relative) or
   `https://mhcargo.ma/...` in Studio.
4. **mainImage `alt`** was set to the post **title** (the MDX frontmatter had no alt text).
5. **Slugs are identical EN/FR** (one slug per MDX post). Kept identical so the existing
   hreflang/canonical logic in `components/Layout.js` works without per-locale slug handling.
   If a future post needs different slugs per language, Layout's alternate-URL logic needs updating.
6. Not exercised by this content (but supported by schema + renderer): ATX headings, links,
   inline body images, YouTube embeds.

---

## Env vars + webhook YOU must set for cutover

### 1. Vercel env (Production) — do NOT commit these
| Var | Value | Notes |
|-----|-------|-------|
| `SANITY_REVALIDATE_SECRET` | *(generate a strong random string)* | Used by `/api/revalidate` to authenticate the webhook. **Must match** the webhook header below. |

- **No read token needed** — the site reads the public dataset over the CDN.
- `projectId`/`dataset` are hardcoded (public, non-secret) in `lib/sanity.js`.
- A **local-only dev value** of `SANITY_REVALIDATE_SECRET` was added to `.env.local` (gitignored)
  purely to test the route here. Generate a **separate** production secret for Vercel.
- The migration used your Sanity **CLI session token** (read from `~/.config/sanity/config.json`
  via `SANITY_WRITE_TOKEN`) — **nothing to set in Vercel** for that.

### 2. Sanity webhook (Sanity Manage → API → Webhooks → Create)
| Field | Value |
|-------|-------|
| Name | `Revalidate Next blog` |
| URL | `https://www.mhcargo.ma/api/revalidate` *(use the `www` canonical host — apex 308-redirects to www)* |
| Trigger on | Create, Update, Delete |
| Filter | `_type == "post"` |
| Projection | `{"slug": slug.current, "language": language, "_type": _type}` |
| HTTP method | `POST` |
| HTTP Headers | `Authorization: Bearer <SANITY_REVALIDATE_SECRET>` (same value as Vercel) |
| API version | `v2024-01-01` (or later) |

On publish/unpublish the route revalidates `/`, `/fr`, `/blog`, `/fr/blog`, and the post's
`/blog/<slug>` + `/fr/blog/<slug>`. Until the webhook exists, ISR still refreshes every 60s.

---

## Anything I stopped on

**No hard stop was needed** — all four stages completed. Two version-sensitive items were
**verified against the installed plugin** (not guessed) before writing:

- **doc-internationalization v6 requires the `language` field declared in-schema**
  (readOnly + hidden) — the plugin patches it but does **not** inject it. Confirmed in the
  installed README; added to `post`. (My first draft had omitted it.)
- **`translation.metadata` shape changed in v6** (language moved from the array item `_key` to a
  `language` field; item `_type` = `internationalizedArrayReferenceValue`). Extracted the exact
  shape from the plugin source and used it verbatim; read-back confirms EN↔FR linkage resolves.

(Minor: a `ctaBox` field briefly read back `null` on an unfiltered `[0]` query during verification
— a query race, not a data problem; the language-filtered + raw reads confirm the stored data is
correct.)

---

## Your morning checklist

1. **Review** the 3 migrated posts (EN+FR) in Studio → https://mh-cargo.sanity.studio/
   — content, images, CTAs. Adjust the CTA `buttonUrl` host and any ctaBox background/heading
   levels to taste (judgment calls above).
2. **Generate** a strong secret; set `SANITY_REVALIDATE_SECRET` in **Vercel → Production**.
3. **Configure** the Sanity webhook (table above) with that same secret.
4. **Merge** `cms/sanity` → `main` (open a PR and review the diff first).
5. **Verify live:** `/blog`, `/fr/blog`, a post in EN + FR; then publish a test edit in Studio and
   confirm it appears within seconds (webhook) — or ≤60s (ISR) if the webhook isn't set yet.
6. **Clear** the 3 old language-less `post` docs (and any orphan assets) in Studio / Vision.
7. **Invite** the 2 authors to the Sanity project (Manage → Members).
8. *(Optional cleanup)* delete `posts/*.mdx` and `lib/posts.js` — they're retained on the branch as
   the migration source but are **no longer imported by any page** (the branch reads 100% from Sanity).
