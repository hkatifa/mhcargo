import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Public, CDN-backed read client — NO token (read-only public dataset).
// Never import a write token here; the site bundle stays unauthenticated.
export const SANITY_PROJECT_ID = 'qmzq54py'
export const SANITY_DATASET = 'production'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
