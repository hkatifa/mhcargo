import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import SanityImage from '../../components/SanityImage'
import PortableBody from '../../components/PortableBody'
import { client, urlFor } from '../../lib/sanity'
import { BY_SLUG_QUERY, RECENT_QUERY, ALL_SLUGS_QUERY } from '../../lib/queries'
import formatDate from '../../lib/formatDate'

export default function BlogPost({ post, recentPosts, localeAlternates }) {
  const { t } = useTranslation(['common', 'blog'])
  const { isFallback } = useRouter()

  if (isFallback) return null
  if (!post) return null

  const dims = post.mainImage?.asset?.metadata?.dimensions
  const lqip = post.mainImage?.asset?.metadata?.lqip
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : undefined

  return (
    <Layout
      title={`${post.title} | MH Cargo`}
      description={post.excerpt || t('seo.blog.description')}
      ogType="article"
      ogImage={ogImage}
      currentPage={`/blog/${post.slug}`}
      localeAlternates={localeAlternates}
      pageId="658e8ceffc69948c62c49e92"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="blog-detail-section">
        <div className="w-layout-blockcontainer container-medium w-container">
          <div className="blog-detail-item">
            <div className="blog-detail-title-wrap">
              <div className="text-primary-1">{post.dateDisplay}</div>
              <h1 className="heading-h3">{post.title}</h1>
            </div>

            {post.mainImage?.asset && (
              <Image
                alt={post.mainImage.alt || post.title}
                src={urlFor(post.mainImage).width(1200).fit('max').auto('format').url()}
                width={dims?.width || 1200}
                height={dims?.height || 500}
                priority
                sizes="(max-width: 767px) 100vw, 800px"
                className="blog-detail-image"
                style={{ width: '100%', height: 'auto' }}
                placeholder={lqip ? 'blur' : 'empty'}
                blurDataURL={lqip || undefined}
              />
            )}

            {post.excerpt && <p className="blog-detail-description">{post.excerpt}</p>}

            {post.body && (
              <div className="rich-text w-richtext">
                <PortableBody value={post.body} />
              </div>
            )}
          </div>
        </div>
      </section>

      {recentPosts && recentPosts.length > 0 && (
        <section className="section-spacing">
          <div className="w-layout-blockcontainer container-full w-container">
            <div className="recent-blog-title">
              <h2 className="no-margin">{t('blog:recent-blog')}</h2>
              <Link href="/blog" className="button-primary w-inline-block">
                <div className="button-primary-text">{t('blog:view-all')}</div>
                <div style={{ width: '0%', height: '100%' }} className="button-primary-hover"></div>
              </Link>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="grid-blog-list w-dyn-items">
                {recentPosts.map((recent) => (
                  <div key={recent._id} role="listitem" className="w-dyn-item">
                    <Link href={`/blog/${recent.slug}`} className="blog-item w-inline-block">
                      <div className="blog-image-wrap">
                        {recent.mainImage?.asset ? (
                          <SanityImage
                            image={recent.mainImage}
                            alt={recent.mainImage.alt || recent.title}
                            width={550}
                            height={370}
                            sizes="(max-width: 767px) 100vw, 33vw"
                            className="blog-image"
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            alt={recent.title}
                            loading="eager"
                            src="https://placehold.co/550x370"
                            className="blog-image"
                          />
                        )}
                        <div style={{ opacity: 0, width: '0%', height: '100%' }} className="blog-hover-overlay"></div>
                      </div>
                      <div>
                        <div className="blog-date">{recent.dateDisplay}</div>
                        <h2 className="blog-title">{recent.title}</h2>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const docs = await client.fetch(ALL_SLUGS_QUERY)
  const paths = (docs || [])
    .filter((d) => d.slug && (d.language === 'en' || d.language === 'fr'))
    .map((d) => ({ params: { slug: d.slug }, locale: d.language }))
  // fallback:'blocking' so posts published after build are generated on first request.
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params, locale }) {
  const post = await client.fetch(BY_SLUG_QUERY, { slug: params.slug, language: locale })
  // No document in THIS language → 404 (per-locale hide-untranslated).
  if (!post) return { notFound: true, revalidate: 60 }

  const recentRaw = await client.fetch(RECENT_QUERY, { slug: params.slug, language: locale })
  const recentPosts = (recentRaw || []).map((p) => ({
    ...p,
    dateDisplay: formatDate(p.publishedAt, locale),
  }))

  // Per-locale paths from the linked translations. EN/FR slugs differ, so the
  // language switcher and hreflang must use each locale's OWN slug. A locale may
  // be absent here (untranslated) — consumers omit it / fall back to the index.
  const localeAlternates = {}
  for (const tr of post.translations || []) {
    if (tr?.language && tr?.slug) localeAlternates[tr.language] = `/blog/${tr.slug}`
  }
  // Guarantee the current document's own slug is present even with no metadata link.
  localeAlternates[locale] = `/blog/${post.slug}`

  return {
    props: {
      post: { ...post, dateDisplay: formatDate(post.publishedAt, locale) },
      recentPosts,
      localeAlternates,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
    revalidate: 60,
  }
}
