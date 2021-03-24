const puppeteer = require('puppeteer');
async function search(person) {

    const url = `https://www.instagram.com/${person}`
    console.log(url)
    const browser = await puppeteer.launch({headless: false,slowMo:1000})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');

    await page.goto(url)
   
    await page.screenshot({ path: `./public/images/${person}.png` })
    await page.waitForTimeout(5000)

    let obj = {}
    
    await page.waitForSelector("[data-testid=user-avatar]")
    const imgProfile = await page.evaluate(() => {
        const img = document.querySelector('[data-testid=user-avatar]').getAttribute("src");

        return img;
    });
    obj["Nombre"] = person
    obj["Imagen"] = imgProfile
    await browser.close()
    console.log(obj)
    return obj


}
module.exports = (person) => search(person)
