import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getPostBySlug, getAllSlugs, getAllPosts } from '../../lib/posts'

function formatDate(dateString, locale) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function toEmbedUrl(url) {
  if (!url) return ''
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

const mdxComponents = {
  CTABox: ({ heading, description, buttonLabel, buttonUrl }) => (
    <div style={{
      margin: '2rem 0',
      padding: '2rem 2.5rem',
      background: '#f7f7f7',
      borderLeft: '4px solid #c9a84c',
      borderRadius: '8px',
    }}>
      {heading && <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{heading}</h3>}
      {description && <p style={{ margin: '0 0 1.25rem', color: '#444' }}>{description}</p>}
      {buttonLabel && buttonUrl && (
        <a href={buttonUrl} className="button-primary w-inline-block" style={{ display: 'inline-flex' }}>
          <div className="button-primary-text">{buttonLabel}</div>
          <div style={{ width: '0%', height: '100%' }} className="button-primary-hover"></div>
        </a>
      )}
    </div>
  ),
  YouTube: ({ url }) => (
    <figure
      style={{ paddingBottom: '56.206088992974244%' }}
      className="w-richtext-align-fullwidth w-richtext-figure-type-video"
    >
      <div>
        <iframe allowFullScreen frameBorder="0" scrolling="no" src={toEmbedUrl(url)} />
      </div>
    </figure>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ''} style={{ maxWidth: '100%', margin: '1rem 0' }} />
  ),
}

export default function BlogPost({ post, mdxSource, mdxSourceFr, recentPosts }) {
  const { t } = useTranslation(['common', 'blog'])
  const { locale } = useRouter()

  if (!post) return null

  const displayTitle = locale === 'fr' && post.title_fr ? post.title_fr : post.title
  const displayExcerpt = locale === 'fr' && post.excerpt_fr ? post.excerpt_fr : post.excerpt
  const displayMdx = locale === 'fr' && mdxSourceFr ? mdxSourceFr : mdxSource

  return (
    <Layout
      title={`${displayTitle} | MH Cargo`}
      currentPage={`/blog/${post.slug}`}
      pageId="658e8ceffc69948c62c49e92"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="blog-detail-section">
        <div className="w-layout-blockcontainer container-medium w-container">
          <div className="blog-detail-item">
            <div className="blog-detail-title-wrap">
              <div className="text-primary-1">
                {formatDate(post.publishedAt, locale)}
              </div>
              <h1 className="heading-h3">
                {displayTitle}
              </h1>
            </div>

            {post.mainImage && (
              <img
                alt={displayTitle}
                loading="eager"
                src={post.mainImage}
                className="blog-detail-image"
              />
            )}

            {displayExcerpt && (
              <p className="blog-detail-description">
                {displayExcerpt}
              </p>
            )}

            {displayMdx && (
              <div className="rich-text w-richtext">
                <MDXRemote {...displayMdx} components={mdxComponents} />
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
                  <div key={recent.slug} role="listitem" className="w-dyn-item">
                    <Link href={`/blog/${recent.slug}`} className="blog-item w-inline-block">
                      <div className="blog-image-wrap">
                        {recent.mainImage ? (
                          <img
                            alt={locale === 'fr' && recent.title_fr ? recent.title_fr : recent.title}
                            loading="eager"
                            src={recent.mainImage}
                            className="blog-image"
                          />
                        ) : (
                          <img
                            alt={locale === 'fr' && recent.title_fr ? recent.title_fr : recent.title}
                            loading="eager"
                            src="https://placehold.co/550x370"
                            className="blog-image"
                          />
                        )}
                        <div style={{ opacity: 0, width: '0%', height: '100%' }} className="blog-hover-overlay"></div>
                      </div>
                      <div>
                        <div className="blog-date">{formatDate(recent.publishedAt, locale)}</div>
                        <h2 className="blog-title">{locale === 'fr' && recent.title_fr ? recent.title_fr : recent.title}</h2>
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
  const slugs = getAllSlugs()
  const paths = slugs.flatMap(slug => [
    { params: { slug }, locale: 'en' },
    { params: { slug }, locale: 'fr' },
  ])
  return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(params.slug)
  if (!post) return { notFound: true }

  const [mdxSource, mdxSourceFr] = await Promise.all([
    serialize(post.body || ''),
    post.body_fr ? serialize(post.body_fr) : Promise.resolve(null),
  ])

  const allPosts = getAllPosts()
  const recentPosts = allPosts.filter(p => p.slug !== params.slug).slice(0, 3)

  return {
    props: {
      post: {
        title: post.title || null,
        title_fr: post.title_fr || null,
        slug: post.slug,
        publishedAt: post.publishedAt || null,
        excerpt: post.excerpt || null,
        excerpt_fr: post.excerpt_fr || null,
        mainImage: post.mainImage || null,
      },
      mdxSource,
      mdxSourceFr,
      recentPosts,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
  }
}
