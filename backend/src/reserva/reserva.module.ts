/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Habitacion } from 'src/entities/habitacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Cliente, Habitacion])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}