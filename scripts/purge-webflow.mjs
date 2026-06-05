// Conservative PurgeCSS of public/lib/webflow.css.
// Content = ALL source (catches dynamic/JS-added classes as literals) + rendered
// HTML of every page (catches runtime DOM incl. Sanity Portable Text output).
// Safelist keeps the entire Webflow framework (w-* / w--*), keyframes, @font-face,
// CSS variables, and the named reveal/scroll/responsive-band targets.
// Writes to a temp file + dumps rejected selectors; does NOT overwrite unless --apply.
import fs from 'fs'
import { PurgeCSS } from 'purgecss'

const CSS = 'public/lib/webflow.css'
const OUT = 'public/lib/webflow.purged.css'
const APPLY = process.argv.includes('--apply')

const before = fs.statSync(CSS).size

const result = await new PurgeCSS().purge({
  content: [
    'pages/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'lib/**/*.{js,jsx}',
    'perf-purge-html/**/*.html',
  ],
  css: [CSS],
  rejected: true,
  // Generous extractor: any run of word chars / - / _ / : / / — over-extracts on purpose.
  defaultExtractor: (content) => content.match(/[A-Za-z0-9_/:-]+/g) || [],
  // Defaults keep all @keyframes, @font-face (webflow-icons), and CSS variables.
  safelist: {
    greedy: [
      /^w-/, // entire Webflow framework: grid, nav, dropdown, richtext, slider, tabs, icons…
      /^w--/, // Webflow interaction/state classes (w--open, w--current, …)
    ],
    standard: [
      'js', // html.js (reveal fail-safe)
      // scroll "cars" + their path lines/wrappers
      'decoration-one', 'decoration-line-one', 'hero-decoration-wrap',
      'service-decoration-car', 'service-decoration-one',
      // Phase-4 responsive-band targets
      'feature-left-side', 'hero-feature-title', 'feature-list-item', 'feature-contact-link',
      'contact-icon-wrap', 'hero-dark-bg-decoration', 'service-hero-image', 'service-hero-image-wrap',
      // reveal / image overlay
      'about-image', 'about-image-wrap',
      // nav interaction states (toggled in JS)
      'nav-open', 'nav-dropdown-open', 'nav-link-underline', 'dropdown-services-list',
      // blog body wrapper (Portable Text rendered inside)
      'rich-text',
    ],
    // keep these classes AND any selector that builds on them (descendants, states)
    deep: [/w-richtext/, /rich-text/, /w-dyn/, /w-nav/, /w-dropdown/],
  },
})

const out = result[0]
fs.writeFileSync(OUT, out.css)
const after = Buffer.byteLength(out.css)

const rejected = out.rejected || []
fs.writeFileSync('perf-purge-rejected.txt', rejected.join('\n'))

console.log(`before:   ${before} bytes`)
console.log(`after:    ${after} bytes`)
console.log(`removed:  ${before - after} bytes (${((1 - after / before) * 100).toFixed(1)}%)`)
console.log(`rejected selectors: ${rejected.length} (see perf-purge-rejected.txt)`)

if (APPLY) {
  fs.copyFileSync(OUT, CSS)
  fs.rmSync(OUT)
  console.log(`\nAPPLIED -> ${CSS}`)
} else {
  console.log(`\nDry run. Wrote ${OUT}. Re-run with --apply to overwrite ${CSS}.`)
}
