import puppeteer from 'C:/Users/nateh/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
const browser = await puppeteer.launch({ executablePath: 'C:/Users/nateh/.cache/puppeteer/chrome/win64-131.0.6778.204/chrome-win64/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/request-a-quote', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
const el = await page.$('.service-process-section');
if (el) { await el.screenshot({ path: 'temporary screenshots/howitworks-raq.png' }); console.log('saved'); }
else { console.log('not found'); }
await browser.close();
