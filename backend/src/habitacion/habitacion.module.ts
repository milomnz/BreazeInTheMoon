/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HabitacionController } from './habitacion.controller';
import { HabitacionService } from './habitacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from 'src/entities/habitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion])],
  controllers: [HabitacionController],
  providers: [HabitacionService]
})
export class HabitacionModule {}
