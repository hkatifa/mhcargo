import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] || ''

const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

// Find next available screenshot number
let n = 1
while (fs.existsSync(path.join(dir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) n++
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`
const outPath = path.join(dir, filename)

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/T14s/.cache/puppeteer/chrome/win64-145.0.7632.77/chrome-win64/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

await page.evaluate(async () => {
  await new Promise(resolve => {
    const distance = 300
    const delay = 80
    const timer = setInterval(() => {
      window.scrollBy(0, distance)
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        window.scrollTo(0, 0)
        clearInterval(timer)
        resolve()
      }
    }, delay)
  })
})
await new Promise(resolve => setTimeout(resolve, 1500))
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()
console.log('Saved:', outPath)
