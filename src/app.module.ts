import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    JogadoresModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
