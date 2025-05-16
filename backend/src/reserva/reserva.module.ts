/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}