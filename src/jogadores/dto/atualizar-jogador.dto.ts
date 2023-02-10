import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class AtualizarJogadorDTO {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;

    @IsNotEmpty()
    readonly nome: string;
}