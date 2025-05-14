/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from 'src/entities/notificacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notificacion])],
    providers: [NotificacionService],
    controllers: [NotificacionController]
})
export class NotificacionModule {}