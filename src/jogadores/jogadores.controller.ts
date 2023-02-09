import { Body, Controller, Post, Get, Query, Delete, Param } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadorService: JogadoresService) { }

    @Post()
    async criarAtualizarJogador(@Body() criaJogadorDTO: CriarJogadorDTO): Promise<void> {
        await this.jogadorService.criarAtualizarJogador(criaJogadorDTO);
    }

    @Get()
    async consultarJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return this.jogadorService.consultarJogadorPeloEmail(email);
        } else {
            return this.jogadorService.consultarTodosJogadores();
        }
    }

    @Delete()
    async deletarJogador(@Query('email') email: string): Promise<void> {
        this.jogadorService.deletarJogador(email);
    }

}
