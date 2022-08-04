const puppeteer = require('puppeteer');

const urlalvo = 'https://www.vivareal.com.br/imovel/fazenda---sitio-3-quartos-serra-da-cantareira-zona-norte-sao-paulo-com-garagem-60000m2-venda-RS1200000-id-2572161422/';

let detalhesImovel = [];

const wspg = async () => {

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(urlalvo);
    await page.waitForTimeout(3000);
    const nomeBruto = await page.$eval('.title__title', (el) => el.textContent);
    const nome = nomeBruto.trim();
    const valor = await page.$eval('.price__price-info', (el) => el.textContent);
    const codigoBruto = await page.$eval('.title__code', (el) => el.textContent);
    const codigo = codigoBruto.slice(5);
    const urlImovel = urlalvo;
    // const detalhesArray = await page.$$('.features');
    // for (let detalhesElement of detalhesArray) {
        /* let title = await detalhesElement.$eval('.features__item', (el) => el.value);
        let detalhesImovel = await detalhesElement.$eval('.features__item', (el) => el.textContent);
        let detalhe = detalhesImovel.trim();
        detalhesArray.push(title, detalhe); */
    // }

    const detalhesArray = await page.$$eval('.features__item', li => {
        return li.map(text => text.title +' '+ text.textContent.trim());
    });

    for (let detalhesElement of detalhesArray) {
        
        detalhesImovel.push(detalhesElement);
    }

    await console.log("NOME: " + nome, "VALOR: " + valor, "CODIGO: " + codigo, "URLIMOVEL: " + urlImovel, "DETALHES IMOVEL: " + detalhesImovel);




    await browser.close();

};

wspg();