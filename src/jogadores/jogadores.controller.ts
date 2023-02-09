import { Body, Controller, Post, Get, Query, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadorService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarAtualizarJogador(@Body() criaJogadorDTO: CriarJogadorDTO): Promise<void> {
        await this.jogadorService.criarAtualizarJogador(criaJogadorDTO);
    }

    @Get()
    async consultarJogadores(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return this.jogadorService.consultarJogadorPeloEmail(email);
        } else {
            return this.jogadorService.consultarTodosJogadores();
        }
    }

    @Delete()
    async deletarJogador(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
        this.jogadorService.deletarJogador(email);
    }

}
