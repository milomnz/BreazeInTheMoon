/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HabitacionController } from './habitacion.controller';
import { HabitacionService } from './habitacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitacion } from 'src/entities/habitacion.entity';
import { Hotel } from 'src/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitacion, Hotel])],
  controllers: [HabitacionController],
  providers: [HabitacionService],
  exports: [HabitacionService]
})
export class HabitacionModule {}
