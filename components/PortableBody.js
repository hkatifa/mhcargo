import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

// Brand colours (locked in docs/cms.md).
const NAVY = '#212C42'
const ORANGE = '#F04A23'

function toEmbedUrl(url) {
  if (!url) return ''
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

function CtaBox({ value }) {
  const { heading, text, buttonLabel, buttonUrl, background = 'navy', textAlign = 'left' } = value || {}
  const bg = background === 'orange' ? ORANGE : NAVY
  // Button colour is DERIVED — the opposite brand colour. Never an author field.
  const buttonBg = background === 'orange' ? NAVY : ORANGE
  return (
    <div
      style={{
        margin: '2rem 0',
        padding: '2rem 2.5rem',
        background: bg,
        borderRadius: '12px',
        textAlign,
        color: '#fff',
      }}
    >
      {heading && <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#fff' }}>{heading}</h3>}
      {text && <p style={{ margin: '0 0 1.25rem', color: '#fff' }}>{text}</p>}
      {buttonLabel && buttonUrl && (
        <a
          href={buttonUrl}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.75rem 1.5rem',
            background: buttonBg,
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          {buttonLabel}
        </a>
      )}
    </div>
  )
}

function YouTube({ value }) {
  const src = toEmbedUrl(value?.url)
  if (!src) return null
  return (
    <figure
      style={{ position: 'relative', paddingBottom: '56.25%', height: 0, margin: '2rem 0' }}
      className="w-richtext-align-fullwidth w-richtext-figure-type-video"
    >
      <iframe
        src={src}
        allowFullScreen
        frameBorder="0"
        scrolling="no"
        title="YouTube video"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </figure>
  )
}

function BodyImage({ value }) {
  if (!value?.asset) return null
  const dims = value.asset.metadata?.dimensions
  const lqip = value.asset.metadata?.lqip
  const width = dims?.width || 1200
  const height = dims?.height || Math.round(width * 0.66)
  return (
    <figure style={{ margin: '1.5rem 0' }}>
      <Image
        src={urlFor(value).width(1200).fit('max').auto('format').url()}
        alt={value.alt || ''}
        width={width}
        height={height}
        sizes="(max-width: 767px) 100vw, 800px"
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        placeholder={lqip ? 'blur' : 'empty'}
        blurDataURL={lqip || undefined}
      />
      {value.caption && (
        <figcaption style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666', textAlign: 'center' }}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

const components = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span style={{ textDecoration: 'underline' }}>{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      )
    },
  },
  types: {
    image: BodyImage,
    ctaBox: CtaBox,
    youtube: YouTube,
  },
}

export default function PortableBody({ value }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
