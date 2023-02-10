import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>){}

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
        return await this.categoriaModel.find().exec();
    }

}
