import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(@Body() criaJogadorDTO: CriarJogadorDTO) {
        const { email } = criaJogadorDTO;
        return JSON.stringify(`{
            "nome": ${email}
        }`)
    }

}
