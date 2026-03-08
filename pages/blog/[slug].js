import Layout from '../../components/Layout';
import { client, urlFor } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  body
}`;

const RECENT_POSTS_QUERY = `*[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0..2] {
  title,
  "slug": slug.current,
  publishedAt,
  mainImage
}`;

const ALL_SLUGS_QUERY = `*[_type == "post"] { "slug": slug.current }`;

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// YouTube URL → embed URL
function toEmbedUrl(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

// Portable Text component map — matches existing Webflow HTML structure
const portableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul role="list">{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        style={{ maxWidth: '100%', margin: '1rem 0' }}
      />
    ),
    ctaBox: ({ value }) => (
      <div style={{
        margin: '2rem 0',
        padding: '2rem 2.5rem',
        background: '#f7f7f7',
        borderLeft: '4px solid #c9a84c',
        borderRadius: '8px',
      }}>
        {value.heading && (
          <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{value.heading}</h3>
        )}
        {value.description && (
          <p style={{ margin: '0 0 1.25rem', color: '#444' }}>{value.description}</p>
        )}
        {value.buttonLabel && value.buttonUrl && (
          <a
            href={value.buttonUrl}
            className="button-primary w-inline-block"
            style={{ display: 'inline-flex' }}
          >
            <div className="button-primary-text">{value.buttonLabel}</div>
            <div style={{ width: '0%', height: '100%' }} className="button-primary-hover"></div>
          </a>
        )}
      </div>
    ),
    youtube: ({ value }) => (
      <figure
        style={{ paddingBottom: '56.206088992974244%' }}
        className="w-richtext-align-fullwidth w-richtext-figure-type-video"
      >
        <div>
          <iframe
            allowFullScreen={true}
            frameBorder="0"
            scrolling="no"
            src={toEmbedUrl(value.url)}
          />
        </div>
      </figure>
    ),
  },
};

export default function BlogPost({ post, recentPosts }) {
  if (!post) return null;

  return (
    <Layout
      title={`${post.title} | MH Cargo`}
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
                {formatDate(post.publishedAt)}
              </div>
              <h1 className="heading-h3">
                {post.title}
              </h1>
            </div>

            {post.mainImage && (
              <img
                alt={post.title}
                loading="eager"
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                className="blog-detail-image"
              />
            )}

            {post.excerpt && (
              <p className="blog-detail-description">
                {post.excerpt}
              </p>
            )}

            {post.body && (
              <div className="rich-text w-richtext">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>
            )}
          </div>
        </div>
      </section>

      {recentPosts && recentPosts.length > 0 && (
        <section className="section-spacing">
          <div className="w-layout-blockcontainer container-full w-container">
            <div className="recent-blog-title">
              <h2 className="no-margin">Recent Blog</h2>
              <a href="/blog" className="button-primary w-inline-block">
                <div className="button-primary-text">View all blog</div>
                <div style={{ width: '0%', height: '100%' }} className="button-primary-hover"></div>
              </a>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="grid-blog-list w-dyn-items">
                {recentPosts.map((recent) => (
                  <div key={recent.slug} role="listitem" className="w-dyn-item">
                    <a
                      href={`/blog/${recent.slug}`}
                      className="blog-item w-inline-block"
                    >
                      <div className="blog-image-wrap">
                        {recent.mainImage ? (
                          <img
                            alt={recent.title}
                            loading="eager"
                            src={urlFor(recent.mainImage).width(550).height(370).url()}
                            className="blog-image"
                          />
                        ) : (
                          <img
                            alt={recent.title}
                            loading="eager"
                            src="https://placehold.co/550x370"
                            className="blog-image"
                          />
                        )}
                        <div
                          style={{ opacity: 0, width: '0%', height: '100%' }}
                          className="blog-hover-overlay"
                        ></div>
                      </div>
                      <div>
                        <div className="blog-date">{formatDate(recent.publishedAt)}</div>
                        <h2 className="blog-title">{recent.title}</h2>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await client.fetch(ALL_SLUGS_QUERY);
  const paths = slugs
    .filter((s) => s.slug)
    .map((s) => ({ params: { slug: s.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const [post, recentPosts] = await Promise.all([
    client.fetch(POST_QUERY, { slug: params.slug }),
    client.fetch(RECENT_POSTS_QUERY, { slug: params.slug }),
  ]);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post, recentPosts },
    revalidate: 60,
  };
}
