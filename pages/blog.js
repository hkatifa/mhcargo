import Layout from '@/components/Layout';
import { client, urlFor } from '@/lib/sanity';

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt
}`;

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage({ posts }) {
  return (
    <Layout
      title="Blog | MH Cargo"
      currentPage="/blog"
      pageId="658ff11dff63da989b140db6"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="hero-inner text-center">
        <div className="w-layout-blockcontainer container-medium w-container">
          <h1 data-w-id="58ae3485-0730-2fee-e8bd-66810c3505f9" style={{ opacity: 0 }}>Blog</h1>
        </div>
      </section>

      <section className="section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-dyn-list">
            {posts.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem 0' }}>No posts yet. Check back soon!</p>
            ) : (
              <div role="list" className="grid-blog-list w-dyn-items">
                {posts.map((post) => (
                  <div key={post.slug} role="listitem" className="w-dyn-item">
                    <a
                      aria-label="link"
                      data-w-id="d956d5ee-3527-0685-6bb4-cd816142f312"
                      href={`/blog/${post.slug}`}
                      className="blog-item w-inline-block"
                    >
                      <div
                        data-w-id="d956d5ee-3527-0685-6bb4-cd816142f313"
                        style={{ opacity: 0 }}
                        className="blog-image-wrap"
                      >
                        {post.mainImage ? (
                          <img
                            alt={post.title}
                            loading="eager"
                            src={urlFor(post.mainImage).width(550).height(370).url()}
                            className="blog-image"
                          />
                        ) : (
                          <img
                            alt={post.title}
                            loading="eager"
                            src="https://placehold.co/550x370"
                            className="blog-image"
                          />
                        )}
                        <div style={{ opacity: 0, width: '0%', height: '100%' }} className="blog-hover-overlay"></div>
                      </div>
                      <div>
                        <div
                          data-w-id="d956d5ee-3527-0685-6bb4-cd816142f317"
                          style={{ opacity: 0 }}
                          className="blog-date"
                        >
                          {formatDate(post.publishedAt)}
                        </div>
                        <h2
                          data-w-id="d956d5ee-3527-0685-6bb4-cd816142f318"
                          style={{ opacity: 0 }}
                          className="blog-title"
                        >
                          {post.title}
                        </h2>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(POSTS_QUERY);
  return {
    props: { posts },
    revalidate: 60,
  };
}
