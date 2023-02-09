import { Injectable } from "@nestjs/common";

@Injectable()
export class CriarJogadorDTO {
    readonly telefoneCelular: string;
    readonly email: string;
    readonly nome: string;
}