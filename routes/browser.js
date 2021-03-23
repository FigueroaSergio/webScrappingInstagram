const puppeteer = require('puppeteer');
async function search(person){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`https://www.instagram.com/${person}/`)
    page.screenshot({ path: `./public/images/${person}.png` })

}