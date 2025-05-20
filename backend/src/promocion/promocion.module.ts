/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from 'src/entities/promocion.entity';
import { Hotel } from 'src/entities/hotel.entity';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promocion, Hotel]),
  ],
  controllers: [PromocionController],
  providers: [PromocionService],
  exports: [PromocionService],
})
export class PromocionModule {}