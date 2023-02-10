import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    nome: { type: String },
    email: { type: String, unique: true },
    telefoneCelular: { type: String },
    ranking: { type: String },
    posicaoRanking: { type: Number },
    urlFotoJogador: { type: String },
}, 
{
    timestamps: true, collection: 'jogadores'
})