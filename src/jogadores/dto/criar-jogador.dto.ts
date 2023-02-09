import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CriarJogadorDTO {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly nome: string;
}