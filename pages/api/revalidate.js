// On-demand ISR revalidation, triggered by a Sanity webhook when a `post` is
// created / updated / deleted. The webhook authenticates with a shared secret
// (Authorization: Bearer <secret>, or ?secret=<secret>) compared against
// SANITY_REVALIDATE_SECRET. See docs/cms-build-report.md for the webhook config.
//
// Webhook payload projection (configured in Sanity):
//   { "slug": slug.current, "language": language, "_type": _type }
//
// Affected paths: both locale listings + both homes (a post add/remove/reorder
// changes the lists) and the post's own path in its language (plus the other
// locale, attempted in case a translation just appeared/disappeared).

function getProvidedSecret(req) {
  const auth = req.headers['authorization'] || ''
  const fromHeader = auth.replace(/^Bearer\s+/i, '').trim()
  if (fromHeader) return fromHeader
  if (typeof req.query.secret === 'string') return req.query.secret
  return ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return res.status(500).json({ message: 'SANITY_REVALIDATE_SECRET is not configured' })
  }
  if (getProvidedSecret(req) !== secret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const slug = typeof body.slug === 'string' ? body.slug : null

    const paths = new Set(['/', '/fr', '/blog', '/fr/blog'])
    if (slug) {
      paths.add(`/blog/${slug}`)
      paths.add(`/fr/blog/${slug}`)
    }

    const revalidated = []
    const skipped = []
    for (const path of paths) {
      try {
        await res.revalidate(path)
        revalidated.push(path)
      } catch (err) {
        // A locale-specific post path may not exist (untranslated) — non-fatal.
        skipped.push({ path, error: String(err?.message || err) })
      }
    }

    return res.status(200).json({ revalidated, skipped, slug })
  } catch (err) {
    return res.status(500).json({ message: 'Revalidation failed', error: String(err?.message || err) })
  }
}
