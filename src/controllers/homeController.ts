import { Request, Response } from 'express';

import { Propertie } from '../models/Propertie';

export const home = async (req: Request, res: Response) => {

    // Add imovel via Model para testar
    /* const newPropertie = await Propertie.create({
        nome: 'Fazenda/Sítio com 3 Quartos e 3 banheiros à Venda, 60000 m² por R$ 1.200.000',
        urlImovel: 'https://www.vivareal.com.br/imovel/fazenda---sitio-3-quartos-serra-da-cantareira-zona-norte-sao-paulo-com-garagem-60000m2-venda-RS1200000-id-2572161422/',
        valor: 'R$ 1.200.000',
        codigo: '7VNQLRKO',
        detalhesImovel: [
            'Área 60000m²',
            'Quartos 3 quartos',
            'Banheiros 3 banheiros/1 suíte',
            'Vagas 5 vagas'
        ]
    }); */

    const properties = await Propertie.find();
    res.render('pages/home', {
        properties,
    });
};
