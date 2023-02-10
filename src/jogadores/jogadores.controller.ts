import { Body, Controller, Post, Get, Query, Delete, Param, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { AtualizarJogadorDTO } from './dto/atualizar-jogador.dto';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../commom/pipes/validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadorService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criaJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
        return await this.jogadorService.criarJogador(criaJogadorDTO);
    }
    
    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(@Param('_id', ValidacaoParametrosPipe) _id: string, @Body() atualizarJogadorDTO: AtualizarJogadorDTO): Promise<Jogador> {
        return await this.jogadorService.atualizarJogador(_id, atualizarJogadorDTO);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadorService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloID(@Param('_id', ValidacaoParametrosPipe) id: string): Promise<Jogador> {
        return await this.jogadorService.consultarJogadorPeloID(id);

    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id', ValidacaoParametrosPipe) id: string): Promise<void> {
        await this.jogadorService.deletarJogador(id);
    }

}
