import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        if(!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
        } else {
            
        }

        
        return value;
        // throw new Error("Method not implemented.");
    }

}