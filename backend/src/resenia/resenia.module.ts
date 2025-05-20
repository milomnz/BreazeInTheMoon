/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaController } from './resenia.controller';
import { Resenia } from 'src/entities/resenia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Hotel } from 'src/entities/hotel.entity';
import { HotelModule } from 'src/hotel/hotel.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resenia, Cliente, Hotel]), HotelModule,
    JwtModule.register({})
  ],
  controllers: [ReseniaController],
  providers: [
    ReseniaService,
    JwtAuthGuard,
    RolesGuard
  ],
  exports: [ReseniaService],
})
export class ReseniaModule {}