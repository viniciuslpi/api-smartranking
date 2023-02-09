import { Body, Controller, Post, Get, Query, Delete, Param, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadorService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criaJogadorDTO: CriarJogadorDTO): Promise<void> {
        await this.jogadorService.criarJogador(criaJogadorDTO);
    }

    
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) _id: string, @Body() criaJogadorDTO: CriarJogadorDTO): Promise<void> {
        await this.jogadorService.atualizarJogador(_id, criaJogadorDTO);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadorService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloID(@Param('_id', JogadoresValidacaoParametrosPipe) id: string): Promise<Jogador> {
        return await this.jogadorService.consultarJogadorPeloID(id);

    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', JogadoresValidacaoParametrosPipe) id: string, @Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
        await this.jogadorService.deletarJogador(email);
    }

}
