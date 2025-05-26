/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { TipoNotificacion } from 'src/constants/tipo-notificacion.enum';
import { Notificacion } from 'src/entities/notificacion.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionService {
    constructor(
        @InjectRepository(Notificacion)
        private notificacionRepo: Repository<Notificacion>,
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
        private readonly mailerService: MailerService,
    ) { }

    async crearNotificacion(params: {
        usuario: Usuario;
        tipo: TipoNotificacion;
        mensaje: string;
    }): Promise<Notificacion> {
        const { usuario, tipo, mensaje } = params;
        const notificacion = this.notificacionRepo.create({
            usuario,
            tipo,
            mensaje,
            fechaCreacion: new Date(),
            fechaEnvio: new Date(),
            leida: false,
        });
        const guardada = await this.notificacionRepo.save(notificacion);
        if (usuario.correo) {
            await this.mailerService.sendMail({
                to: usuario.correo,
                subject: 'Notificación de BreazeInTheMoon',
                text: mensaje,
                html: `<p>${mensaje}</p>`,
            });
        }
        return guardada;
    }

    async notificarATodosLosClientes(tipo: TipoNotificacion, mensaje: string): Promise<void> {
        const clientes = await this.usuarioRepo.find({ where: { rol: RolUsuario.CLIENTE } });

        for (const cliente of clientes) {
            await this.crearNotificacion({ usuario: cliente, tipo, mensaje });
        }
    }

    async obtenerPorUsuario(usuarioId: number): Promise<Notificacion[]> {
        return this.notificacionRepo.find({
            where: { usuario: { id: usuarioId } },
            order: { fechaEnvio: 'DESC' },
        });
    }

    async marcarComoLeida(id: number): Promise<Notificacion> {
        const notificacion = await this.notificacionRepo.findOne({ where: { id } });

        if (!notificacion) throw new NotFoundException('Notificación no encontrada');
        notificacion.leida = true;
        return this.notificacionRepo.save(notificacion);
    }

    async marcarTodasComoLeidas(usuarioId: number): Promise<void> {
        await this.notificacionRepo.update(
            { usuario: { id: usuarioId }, leida: false },
            { leida: true },
        );
    }

    async enviarCorreo(destinatario: string, asunto: string, mensaje: string) {
        await this.mailerService.sendMail({
            to: destinatario,
            subject: asunto,
            text: mensaje,
        });
    }
}