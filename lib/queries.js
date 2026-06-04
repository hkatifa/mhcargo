// GROQ queries for the bilingual blog. `language` filtering means each locale's
// listing only contains documents authored in that language — untranslated posts
// are naturally hidden. Image assets are expanded for dimensions + LQIP so the
// renderer can use next/image with a blur placeholder.

const IMAGE_PROJECTION = `{
  ...,
  asset->{ _id, url, metadata { dimensions, lqip } }
}`

const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  language,
  excerpt,
  mainImage ${IMAGE_PROJECTION}
`

// Listing for one locale (newest first).
export const LIST_QUERY = `*[_type == "post" && language == $language && defined(slug.current)]
  | order(publishedAt desc) { ${CARD_FIELDS} }`

// Latest N (home page) for one locale.
export const LATEST_QUERY = `*[_type == "post" && language == $language && defined(slug.current)]
  | order(publishedAt desc)[0...3] { ${CARD_FIELDS} }`

// Single post by slug within a locale, with body image assets expanded and the
// linked translations (for hreflang / language switch awareness).
export const BY_SLUG_QUERY = `*[_type == "post" && language == $language && slug.current == $slug][0]{
  ${CARD_FIELDS},
  body[]{
    ...,
    _type == "image" => ${IMAGE_PROJECTION}
  },
  "translations": *[_type == "translation.metadata" && references(^._id)][0]
    .translations[].value->{ "slug": slug.current, language }
}`

// Recent posts in the same locale excluding the current slug.
export const RECENT_QUERY = `*[_type == "post" && language == $language && slug.current != $slug && defined(slug.current)]
  | order(publishedAt desc)[0...3] { ${CARD_FIELDS} }`

// All (slug, language) pairs — drives getStaticPaths (one path per document).
export const ALL_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  language
}`
