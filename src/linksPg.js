import puppeteer from 'puppeteer';

const urlalvo = "https://www.vivareal.com.br/venda/sp/sao-paulo/granja_comercial/#area-desde=20000";

async function linksPg(linkPesquisa) {
    const dados = [];

    const browser = await puppeteer.launch({
        defaultViewport: null,
        args: ['--no-sandbox'],
        headless: true
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

    // await console.log(dados);
    return dados;

}

// linkImoveis(urlalvo);

export default linksPg;