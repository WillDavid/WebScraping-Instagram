const puppeteer = require('puppeteer');
const fs = require('fs')

async function run() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/tocadacorujapodcast/');
    //await page.screenshot({ path: 'tocadacoruja.png' });

    const imgList = await page.evaluate(() => {
        // vamos pegar todas as imagens que estão na parte de posts

        const nodeList = document.querySelectorAll('article img')

        // transformar o NodeList em array

        const imgArray = [...nodeList]
        // transformar os nodes (elemntos htm) em objetos JS
        const imgList = imgArray.map( ({src}) =>({
            src
        }))
        return imgList

        // colocar para fora da função
    })
  
   // 

   // escrever os dados em um arquivo local (json)

   fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
       if(err) throw new Error('something went wrong')

       console.log("well done")
   })

   await browser.close();
}

run()