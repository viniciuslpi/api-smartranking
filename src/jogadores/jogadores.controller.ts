import { Body, Controller, Post, Get } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadorService: JogadoresService){}

    @Post()
    async criarAtualizarJogador(@Body() criaJogadorDTO: CriarJogadorDTO) {
       await this.jogadorService.criarAtualizarJogador(criaJogadorDTO);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        
        return await this.jogadorService.consultarTodosJogadores();
    }

}
