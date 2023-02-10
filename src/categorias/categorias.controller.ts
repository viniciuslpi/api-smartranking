import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizarCategoria.dto';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDTO);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPeloID(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloId(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string): Promise<void> {

        await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post('/:categoria/jogadores/:_id')
    async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
        await this.categoriasService.atribuirCategoriaJogador(params);
    }

}
