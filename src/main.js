import puppeteer from 'puppeteer';

import linksPg from './linksPg.js';

const urlalvo = "https://www.vivareal.com.br/venda/sp/sao-paulo/granja_comercial/#area-desde=20000";

import mongoose from 'mongoose';
const { Schema } = mongoose;

const propertieSchema = new Schema({
  nome: String, // String is shorthand for {type: String}
  valor: String,
  codigo: String,
  urlImovel: String,
  detalhesImovel: [String],
});

const Propertie = mongoose.model('Propertie', propertieSchema);

const main = async () => {
    
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    const urls = await linksPg(urlalvo);
    await mongoose.connect('mongodb://localhost:27017/properties_webscraping');
    for(let i = 0; i < urls.length; ++i) {
        let detalhesImovel = [];
        const url = urls[i];
        await page.goto(url);
        await page.waitForTimeout(3000);
        const nomeBruto = await page.$eval('.title__title', (el) => el.textContent);
        const nome = nomeBruto.trim();
        const valorBruto = await page.$eval('.price__price-info', (el) => el.textContent);
        const valor = valorBruto.trim();
        const codigoBruto = await page.$eval('.title__code', (el) => el.textContent);
        const codigo = codigoBruto.slice(5);
        const urlImovel = url;
        const detalhesArray = await page.$$eval('.features__item', li => {
            return li.map(text => text.title +': '+ text.textContent.trim());
        });

        for (let detalhesElement of detalhesArray) {
            detalhesImovel.push(detalhesElement);
        }    
        
        const busca = await Propertie.find({ codigo: codigo });
        
        if(!busca) {
            const newPropertie = await Propertie.create({
                nome,
                urlImovel,
                valor,
                codigo,
                detalhesImovel,
            });
        
            if(newPropertie) {
                console.log("Dado Inserido: ", newPropertie);
            } else {
                console.log("Deu erro...");
            }
        } else {
            console.log(`IMÓVEL COD: ${codigo} JÁ ESTÁ CADASTRADO`);
        }
    }

    await browser.close();

};

main();
