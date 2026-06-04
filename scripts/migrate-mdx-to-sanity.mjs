// One-off migration: repo MDX (EN + FR) -> Sanity Portable Text documents.
//
// - Reads posts/*.mdx (frontmatter + body split on `---fr---`).
// - Converts each body to Portable Text: paragraphs, inline **bold** (strong),
//   bullet lists, and <CTABox .../> -> ctaBox (description -> text; background
//   navy + textAlign left by default, matching the MDX render).
// - Uploads each frontmatter mainImage (public/brand/*) as a Sanity asset
//   (content-hash deduplicated, so re-runs don't duplicate).
// - Creates one `post` document per language (deterministic IDs) and links the
//   EN/FR pair with a `translation.metadata` document in the exact shape the
//   @sanity/document-internationalization v6 plugin uses.
//
// Idempotent: deterministic _id/_key + createOrReplace, so re-running re-seeds
// identical content. NEVER deletes existing documents.
//
// Auth: reads a write token from SANITY_WRITE_TOKEN (env only — never hardcode).
// Usage:
//   node scripts/migrate-mdx-to-sanity.mjs --dry     # convert + print, no writes
//   node scripts/migrate-mdx-to-sanity.mjs           # perform the migration

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const POSTS_DIR = path.join(ROOT, 'posts')
const PUBLIC_DIR = path.join(ROOT, 'public')

const DRY = process.argv.includes('--dry')
const TOKEN = process.env.SANITY_WRITE_TOKEN || ''

const PROJECT_ID = 'qmzq54py'
const DATASET = 'production'
const LANGS = ['en', 'fr']

// ---------- Portable Text conversion ----------

function makeKeyer() {
  let n = 0
  return () => 'k' + n++
}

// Split text into spans, marking **bold** segments with the `strong` decorator.
function inlineSpans(text, keyer) {
  const spans = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) spans.push({ text: text.slice(last, m.index), marks: [] })
    spans.push({ text: m[1], marks: ['strong'] })
    last = m.index + m[0].length
  }
  if (last < text.length) spans.push({ text: text.slice(last), marks: [] })
  if (spans.length === 0) spans.push({ text: '', marks: [] })
  return spans.map((s) => ({ _type: 'span', _key: keyer(), text: s.text, marks: s.marks }))
}

function parseCtaBox(jsx, keyer) {
  const attr = (name) => {
    const m = jsx.match(new RegExp(name + '="([^"]*)"'))
    return m ? m[1] : ''
  }
  const heading = attr('heading')
  const description = attr('description')
  const buttonLabel = attr('buttonLabel')
  const buttonUrl = attr('buttonUrl')
  const node = { _type: 'ctaBox', _key: keyer(), background: 'navy', textAlign: 'left' }
  if (heading) node.heading = heading
  if (description) node.text = description
  if (buttonLabel) node.buttonLabel = buttonLabel
  if (buttonUrl) node.buttonUrl = buttonUrl
  return node
}

function mdToPortableText(md) {
  const keyer = makeKeyer()
  const blocks = []
  const chunks = md.trim().split(/\n\s*\n/)
  for (const chunkRaw of chunks) {
    const chunk = chunkRaw.trim()
    if (!chunk) continue

    if (chunk.startsWith('<CTABox')) {
      blocks.push(parseCtaBox(chunk, keyer))
      continue
    }

    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean)
    const allBullets = lines.length > 0 && lines.every((l) => l.startsWith('- '))

    if (allBullets) {
      for (const line of lines) {
        blocks.push({
          _type: 'block',
          _key: keyer(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: inlineSpans(line.replace(/^- /, ''), keyer),
        })
      }
    } else {
      // Soft line breaks within a paragraph render as spaces in the MDX output.
      blocks.push({
        _type: 'block',
        _key: keyer(),
        style: 'normal',
        markDefs: [],
        children: inlineSpans(lines.join(' '), keyer),
      })
    }
  }
  return blocks
}

// ---------- Load + convert MDX ----------

function loadPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    const [bodyEn, bodyFr] = content.split('\n---fr---\n')
    return {
      file,
      fm: data,
      bodies: { en: (bodyEn || '').trim(), fr: (bodyFr || '').trim() },
    }
  })
}

// ---------- Sanity write ----------

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const assetCache = new Map()
async function uploadImage(relPath, label) {
  if (assetCache.has(relPath)) return assetCache.get(relPath)
  const abs = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''))
  if (!fs.existsSync(abs)) throw new Error(`mainImage not found on disk: ${abs}`)
  const filename = path.basename(abs)
  const asset = await client.assets.upload('image', fs.readFileSync(abs), { filename, label })
  assetCache.set(relPath, asset._id)
  return asset._id
}

function buildDoc({ slug, lang, fm, assetId, body }) {
  const title = lang === 'en' ? fm.title : fm.title_fr
  const excerpt = lang === 'en' ? fm.excerpt : fm.excerpt_fr
  const doc = {
    _id: `migrated-${lang}-${slug}`,
    _type: 'post',
    language: lang,
    title: title || fm.title,
    slug: { _type: 'slug', current: slug },
    publishedAt: fm.publishedAt,
    body,
  }
  if (excerpt) doc.excerpt = excerpt
  if (assetId) {
    doc.mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
      alt: title || fm.title,
    }
  }
  return doc
}

function buildMetadata(slug) {
  return {
    _id: `migrated-tx-${slug}`,
    _type: 'translation.metadata',
    schemaTypes: ['post'],
    translations: LANGS.map((lang) => ({
      _key: lang,
      _type: 'internationalizedArrayReferenceValue',
      language: lang,
      value: { _type: 'reference', _ref: `migrated-${lang}-${slug}` },
    })),
  }
}

async function main() {
  const posts = loadPosts()
  console.log(`Loaded ${posts.length} MDX posts. DRY=${DRY}`)

  for (const { file, fm, bodies } of posts) {
    const slug = fm.slug
    console.log(`\n# ${file}  (slug: ${slug})`)
    for (const lang of LANGS) {
      const blocks = mdToPortableText(bodies[lang])
      const counts = blocks.reduce((acc, b) => {
        const k = b._type === 'block' ? (b.listItem ? 'bullet' : 'para') : b._type
        acc[k] = (acc[k] || 0) + 1
        return acc
      }, {})
      console.log(`  [${lang}] blocks: ${JSON.stringify(counts)}`)
    }
  }

  if (DRY) {
    // Print a full sample doc (first post, EN) for inspection.
    const p = posts[0]
    const sample = buildDoc({
      slug: p.fm.slug,
      lang: 'en',
      fm: p.fm,
      assetId: 'image-DRYRUN',
      body: mdToPortableText(p.bodies.en),
    })
    console.log('\n--- DRY sample doc (en, first post) ---')
    console.log(JSON.stringify(sample, null, 2))
    console.log('\nDRY run complete — no writes performed.')
    return
  }

  if (!TOKEN) throw new Error('SANITY_WRITE_TOKEN is not set — refusing to write.')

  for (const { fm, bodies } of posts) {
    const slug = fm.slug
    const assetId = fm.mainImage ? await uploadImage(fm.mainImage, fm.title) : null
    console.log(`\nslug ${slug}: image -> ${assetId || '(none)'}`)
    for (const lang of LANGS) {
      const doc = buildDoc({ slug, lang, fm, assetId, body: mdToPortableText(bodies[lang]) })
      const res = await client.createOrReplace(doc)
      console.log(`  createOrReplace ${res._id}`)
    }
    const meta = buildMetadata(slug)
    const res = await client.createOrReplace(meta)
    console.log(`  createOrReplace ${res._id} (translation.metadata)`)
  }

  console.log('\nMigration complete.')
}

main().catch((err) => {
  console.error('\nMIGRATION FAILED:', err.message)
  process.exit(1)
})
