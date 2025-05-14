/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InformeService } from './informe.service';
import { InformeController } from './informe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Informe } from 'src/entities/informe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Informe])],
  providers: [InformeService],
  controllers: [InformeController]
})
export class InformeModule {}
