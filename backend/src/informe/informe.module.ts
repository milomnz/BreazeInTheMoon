/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InformeService } from './informe.service';
import { InformeController } from './informe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Informe } from 'src/entities/informe.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Hotel } from 'src/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Informe, Usuario, Hotel])],
  providers: [InformeService],
  controllers: [InformeController]
})
export class InformeModule {}
