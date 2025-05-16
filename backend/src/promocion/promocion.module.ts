/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from 'src/entities/promocion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocion])],
  providers: [PromocionService],
  controllers: [PromocionController]
})
export class PromocionModule {}
