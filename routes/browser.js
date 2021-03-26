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
        let urls=[]
        for (let element of elements){
            urls.push(element.href)
        }             
        return urls
    })
     console.log(images)
    let pagePromise = (link )=>new Promise(async(res)=>{
        let metadatos={}
        let newPage = await browser.newPage()
        await newPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36');

        await newPage.goto(link)
        // await newPage.screenshot({ path: `./public/images/segio.png` })
        try {
            let likes = await newPage.$eval('article section a span', text => text.textContent);
            let date =await newPage.$eval('a.c-Yi7 time', text => text.getAttribute("datetime"));

        metadatos={
            "url":link,
            "likes":likes,
            "date":date
        }
        } catch (error) {
            let likes = await newPage.$eval('article section span>span', text => text.textContent);
            let date =await newPage.$eval('a.c-Yi7 time', text => text.getAttribute("datetime"));
            metadatos={
                "url":link,
                "likes":likes,
                "date":date
            }
        }
        
        res(metadatos)
        
        await newPage.close()
    })
    let imgs=[]
    for( let url of images){
        // console.log(url)
        let currentPageData= await pagePromise(url)
        imgs.push(currentPageData)
        console.log(currentPageData)
    }
    
    let data = {
        "name":nickname,
        "img":imgProfile,
        "media":basicInfo[0],
        "followers":basicInfo[1],
        "follow":basicInfo[2],
        "posts":imgs
    }
    await page.close()
    await browser.close()
    console.log(data)
    return data


}
module.exports = (nickname) => search(nickname)
