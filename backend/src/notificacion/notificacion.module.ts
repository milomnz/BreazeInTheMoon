/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from 'src/entities/notificacion.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notificacion, Usuario])],
    providers: [NotificacionService],
    controllers: [NotificacionController],
    exports: [NotificacionService],
})
export class NotificacionModule {}