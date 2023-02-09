import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
    private readonly logger = new Logger(JogadoresService.name);
    private jogadores: Jogador[] = [];

    async criarAtualizarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<void> {

        const { email } = criarJogadorDTO;
        const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email);
        if(jogadorEncontrado) {
            this.atualizar(jogadorEncontrado, criarJogadorDTO);
        } else {
            this.criar(criarJogadorDTO);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadores;
    }


    private atualizar(jogadorEncontrado: Jogador, criarJogadorDTO: CriarJogadorDTO): void {
        const { nome } = criarJogadorDTO;
        jogadorEncontrado.nome = nome;
    }

    private criar(criaJogadorDTO: CriarJogadorDTO): void {
        const { nome, email, telefoneCelular } = criaJogadorDTO;
        const jogador: Jogador = {
            _id: uuid(),
            nome,
            email,
            telefoneCelular,
            ranking: `A`,
            posicaoRanking: 1,
            urlFotoJogador: 'http://google.com.br/foto123.jpg'
        }
        this.logger.log(`criaJogadorDTO: ${JSON.stringify(jogador)}`);
        this.jogadores.push(jogador);
    }


}
