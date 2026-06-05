// Capture full-page screenshots across pages × widths for before/after review.
// Usage: node scripts/screenshot-matrix.mjs <baseUrl> <outDir>
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

const baseUrl = process.argv[2] || 'http://localhost:3100'
const outDir = process.argv[3] || 'perf-shots/before'
fs.mkdirSync(outDir, { recursive: true })

const WIDTHS = [1440, 1550, 1100, 991, 390]

const EN_POST = 'tanger-med-why-morocco-s-biggest-port-is-a-game-changer-for-your-business'
const FR_POST = 'tanger-med-pourquoi-le-plus-grand-port-du-maroc-est-un-atout-majeur-pour-votre-entreprise'
const ONLY = process.argv[4] || null // optional: only shoot this label

const PAGES = [
  ['/', 'home'],
  ['/about', 'about'],
  ['/services', 'services'],
  ['/services/air-freight', 'service-air-freight'],
  ['/services/road-freight', 'service-road-freight'],
  ['/services/sea-freight', 'service-sea-freight'],
  ['/services/storage', 'service-storage'],
  ['/contact', 'contact'],
  ['/request-a-quote', 'request-a-quote'],
  ['/blog', 'blog-en'],
  ['/fr/blog', 'blog-fr'],
  [`/blog/${EN_POST}`, 'post-en'],
  [`/fr/blog/${FR_POST}`, 'post-fr'],
  ['/privacy-policy', 'privacy'],
]

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0
      const step = 400
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight + 1000) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 60)
    })
  })
}

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

let count = 0
for (const [route, label] of PAGES) {
  if (ONLY && label !== ONLY) continue
  for (const width of WIDTHS) {
    const page = await browser.newPage()
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
    try {
      await page.goto(baseUrl + route, { waitUntil: 'networkidle2', timeout: 60000 })
      await autoScroll(page)
      await page.evaluate(() => document.fonts && document.fonts.ready)
      await new Promise((r) => setTimeout(r, 500))
      const file = path.join(outDir, `${label}__${width}.png`)
      await page.screenshot({ path: file, fullPage: true })
      count++
      console.log(`ok  ${label}  ${width}`)
    } catch (e) {
      console.log(`FAIL ${label} ${width}: ${e.message}`)
    }
    await page.close()
  }
}

await browser.close()
console.log(`\nDone: ${count}/${PAGES.length * WIDTHS.length} screenshots -> ${outDir}`)
