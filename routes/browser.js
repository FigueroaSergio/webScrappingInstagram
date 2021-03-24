const puppeteer = require('puppeteer');
async function search(nickname) {

    const url = `https://www.instagram.com/${nickname}`
    console.log(url)
    const browser = await puppeteer.launch({headless: true,slowMo:100})
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');

    await page.goto(url)
   
    // await page.screenshot({ path: `./public/images/${nickname}.png` })
    

    
    
    await page.waitForSelector("[data-testid=user-avatar]")
    const imgProfile = await page.evaluate(() => {
        const img = document.querySelector('[data-testid=user-avatar]').getAttribute("src");

        return img;
    });
    const basicInfo = await page.evaluate(() => {
              const elements = document.querySelectorAll('section ul li span');
              const datos = []
              for (let element of elements) {
                datos.push(element.textContent)
              }
        
              return datos;
            });
    // console.log(basicInfo)
    const images = await page.evaluate(()=>{
        const elements = document.querySelectorAll("article div>a")
        const datos=[]
        for (let element of elements){
            datos.push(element.href)
        }
    })
    let data = {
        "name":nickname,
        "img":imgProfile,
        "media":basicInfo[0],
        "follow":basicInfo[1],
        "followers":basicInfo[2]
    }
    
    await browser.close()
    console.log(data)
    return data


}
module.exports = (nickname) => search(nickname)
