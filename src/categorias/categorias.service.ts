import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDTO } from './dto/atualizarCategoria.dto';
import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService){}

    async criarCategoria(criarCategoriaDTO: CriarCategoriaDTO): Promise<Categoria> {
        const { categoria } = criarCategoriaDTO;
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if(categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} ja cadastrada!`);
        }
        const categoriaCriada = new this.categoriaModel(criarCategoriaDTO);
        return await categoriaCriada.save();
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate('jogadores').exec();
    }

    async consultarCategoriaPeloID(categoria: string): Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} nao foi encontrada`);
        }
        return categoriaEncontrada;
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDTO: AtualizarCategoriaDTO): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if(!categoriaEncontrada) {
            throw new NotFoundException(`Categoria ${categoria} nao foi encontrada`);
        }
        return await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDTO }).exec();
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria'];
        const _id = params['_id'];

        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        const jogadorJaCadastradoCategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(_id).exec();
        await this.jogadoresService.consultarJogadorPeloID(_id);

        if(!categoriaEncontrada) {
            throw new BadRequestException(`Categoria ${categoria} nao cadastrada`);
        }

        if(jogadorJaCadastradoCategoria.length > 0) {
            throw new BadRequestException(`Jogador ${_id} ja cadastrado na Categoria ${categoria}`);
        }

        categoriaEncontrada.jogadores.push(_id);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }

}
