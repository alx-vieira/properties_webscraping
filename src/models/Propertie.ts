import mongoose from 'mongoose';
import { Schema, model, connection } from 'mongoose';

type PropertieType = {
    nome: string,
    valor: string,
    codigo: string,
    urlImovel: string,
    detalhesImovel: [string]
}

const schema = new Schema<PropertieType>({
    nome: String,
    valor: String,
    codigo: String,
    urlImovel: String,
    detalhesImovel: [String],
});

const modelName: string = 'Propertie';

export const Propertie = mongoose.model('Propertie', schema);