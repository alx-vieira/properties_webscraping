const puppeteer = require('puppeteer');

const urlalvo = "https://www.vivareal.com.br/venda/sp/sao-paulo/granja_comercial/#area-desde=20000";

async function linkImoveis(linkPesquisa) {
    const dados = [];

    const browser = await puppeteer.launch({
        defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto(linkPesquisa);

    const options = await page.$$eval("a.property-card__content-link", (opts) => 
        opts.map((options) => options.attributes[0].nodeValue)
    );

    await browser.close();

    await options.map((link) => {
        const olnk = 'https://www.vivareal.com.br' + link
        dados.push(olnk);
    });

    await console.log(dados);

}

linkImoveis(urlalvo);