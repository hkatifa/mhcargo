import fs from 'fs'
import path from 'path'
import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Layout from '@/components/Layout'

// Minimal renderer for the small, fully-controlled markdown subset used in
// privacy-policy.md: paragraphs, `- ` bullet lists, **bold** and *italic*.
// (No markdown dependency — the content source is our own md file.)
function renderInline(text, kp) {
  const nodes = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let i = 0
  let m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) nodes.push(<strong key={`${kp}-b${i}`}>{m[1]}</strong>)
    else nodes.push(<em key={`${kp}-i${i}`}>{m[2]}</em>)
    i += 1
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function renderMarkdown(md) {
  return md
    .trim()
    .split(/\n\s*\n/)
    .map((block, bi) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
      if (lines.length && lines[0].startsWith('## ')) {
        return (
          <h2 className="heading-h5" key={`blk${bi}`}>
            {renderInline(lines[0].replace(/^##\s+/, ''), `blk${bi}`)}
          </h2>
        )
      }
      if (lines.length && lines.every((l) => l.startsWith('- '))) {
        return (
          <ul role="list" key={`blk${bi}`}>
            {lines.map((l, li) => (
              <li key={`blk${bi}-li${li}`}>{renderInline(l.replace(/^- /, ''), `blk${bi}-li${li}`)}</li>
            ))}
          </ul>
        )
      }
      return <p key={`blk${bi}`}>{renderInline(lines.join(' '), `blk${bi}`)}</p>
    })
}

export default function PrivacyPolicy({ content }) {
  const { t } = useTranslation('common')
  const heading = t('footer.privacy')

  return (
    <Layout
      title={`${heading} | MH Cargo`}
      description={t('seo.privacy.description')}
      currentPage="/privacy-policy"
      pageId="658a73e52a1131d1c3f0a033"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <div className="hero-inner text-center">
        <div className="container w-container">
          <h1>{heading}</h1>
        </div>
      </div>

      <div className="privacy-section section-spacing-bottom">
        <div className="container-medium w-container">
          <div className="privacy-wrap">
            <div className="rich-text w-richtext">{renderMarkdown(content)}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Extract one language section from privacy-policy.md. Split ONLY on the two
// exact language-divider lines `## English` / `## Français` — every other `## `
// line is a section heading and must stay inside the section body. `---` rules
// are dropped; [date] placeholders pass through verbatim.
function extractSection(md, heading) {
  const lines = md.split('\n')
  const isDivider = (l) => {
    const t = l.trim()
    return t === '## English' || t === '## Français'
  }
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`)
  if (start === -1) return ''
  let end = lines.length
  for (let i = start + 1; i < lines.length; i += 1) {
    if (isDivider(lines[i])) {
      end = i
      break
    }
  }
  return lines
    .slice(start + 1, end)
    .join('\n')
    .replace(/^---\s*$/gm, '')
    .trim()
}

export async function getStaticProps({ locale }) {
  const md = fs.readFileSync(path.join(process.cwd(), 'privacy-policy.md'), 'utf8')
  const content = extractSection(md, locale === 'fr' ? 'Français' : 'English')
  return {
    props: {
      content,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
