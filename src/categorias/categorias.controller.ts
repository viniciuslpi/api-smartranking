import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dto/atualizarCategoria.dto';
import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDTO);
    }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarTodasCategorias();
    }

    @Get('/:categoria')
    async consultarCategoriaPeloID(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloID(categoria);
    }

    @Put('/:categoria')
    async atualizarCategoria(
        @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO,
        @Param('categoria') categoria: string): Promise<Categoria> {

        return await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDTO);
    }

}
