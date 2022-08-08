import { Request, Response } from 'express';

import { Propertie } from '../models/Propertie';

export const home = async (req: Request, res: Response) => {



    const properties = await Propertie.find();
    res.render('pages/home', {
        properties,
    });
};

