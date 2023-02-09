import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    // private readonly logger = new Logger(JogadoresService.name);

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
    ) { }

    async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {

        const { email } = criarJogadorDTO;
        // const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            this.atualizar(criarJogadorDTO);
        } else {
            this.criar(criarJogadorDTO);
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com email ${email} nao foi encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<any> {
        return await this.jogadorModel.remove({ email }).exec();
    }

    private async criar(criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criaJogadorDTO);

        return await jogadorCriado.save()

        // const { nome, email, telefoneCelular } = criaJogadorDTO;
        // const jogador: Jogador = {
        //     _id: uuid(),
        //     nome,
        //     email,
        //     telefoneCelular,
        //     ranking: `A`,
        //     posicaoRanking: 1,
        //     urlFotoJogador: 'http://google.com.br/foto123.jpg'
        // }
        // this.logger.log(`criaJogadorDTO: ${JSON.stringify(jogador)}`);
        // this.jogadores.push(jogador);
    }

    private async atualizar(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate(
            { email: criarJogadorDTO.email }, { $set: criarJogadorDTO })
            .exec();
    }


}
