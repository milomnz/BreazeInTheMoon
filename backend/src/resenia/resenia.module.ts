/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { ReseniaController } from './resenia.controller';

@Module({
  providers: [ReseniaService],
  controllers: [ReseniaController]
})
export class ReseniaModule {}