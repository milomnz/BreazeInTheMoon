/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Habitacion } from 'src/entities/habitacion.entity';
import { NotificacionModule } from 'src/notificacion/notificacion.module';
import { EmailModule } from './email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Cliente, Habitacion]), NotificacionModule, EmailModule],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}