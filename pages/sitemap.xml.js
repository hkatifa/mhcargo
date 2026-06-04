import { client } from '@/lib/sanity'
import { ALL_SLUGS_QUERY } from '@/lib/queries'

const SITE_URL = 'https://mhcargo.ma'

// All real, public, indexable pages. /service-details is intentionally excluded
// (Webflow leftover, slated for deletion and marked noindex).
const STATIC_PATHS = [
  '/',
  '/about',
  '/services',
  '/services/air-freight',
  '/services/road-freight',
  '/services/sea-freight',
  '/services/storage',
  '/contact',
  '/request-a-quote',
  '/blog',
  '/privacy-policy',
]

// en is the default locale, served WITHOUT a prefix; fr is served under /fr.
function loc(path, locale) {
  const clean = path === '/' ? '' : path
  return locale === 'fr' ? `${SITE_URL}/fr${clean}` : `${SITE_URL}${clean || '/'}`
}

function urlEntries(path) {
  const en = loc(path, 'en')
  const fr = loc(path, 'fr')
  const alternates =
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`
  return [en, fr]
    .map((self) => `  <url>\n    <loc>${self}</loc>\n${alternates}\n  </url>`)
    .join('\n')
}

// A blog post may exist in only one language (untranslated). Emit a <url> only for
// the languages that actually exist, with hreflang alternates limited to those.
function blogEntries(slug, languages) {
  const langs = ['en', 'fr'].filter((l) => languages.includes(l))
  const alternates = langs
    .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${loc(`/blog/${slug}`, l)}"/>`)
    .concat(
      langs.includes('en')
        ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(`/blog/${slug}`, 'en')}"/>`]
        : []
    )
    .join('\n')
  return langs
    .map((l) => `  <url>\n    <loc>${loc(`/blog/${slug}`, l)}</loc>\n${alternates}\n  </url>`)
    .join('\n')
}

function SiteMap() {
  // Rendered server-side via getServerSideProps; this component is never used.
  return null
}

export async function getServerSideProps({ res }) {
  const docs = await client.fetch(ALL_SLUGS_QUERY)
  const bySlug = new Map()
  for (const d of docs || []) {
    if (!d.slug || !(d.language === 'en' || d.language === 'fr')) continue
    if (!bySlug.has(d.slug)) bySlug.set(d.slug, [])
    bySlug.get(d.slug).push(d.language)
  }

  const staticXml = STATIC_PATHS.map(urlEntries).join('\n')
  const blogXml = [...bySlug.entries()].map(([slug, langs]) => blogEntries(slug, langs)).join('\n')

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    [staticXml, blogXml].filter(Boolean).join('\n') +
    `\n</urlset>\n`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default SiteMap
