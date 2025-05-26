/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  async enviarCorreoConfirmacion(email: string | undefined, nombre: string | undefined) {
    if (!email || !nombre) {
      throw new Error('Email o nombre no definidos al intentar enviar correo de confirmación');
    }

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reserva confirmada',
      text: `Hola ${nombre}, tu reserva ha sido confirmada exitosamente.`,
    });
  }

  async enviarCorreoRechazo(email: string | undefined, nombre: string | undefined) {
    if (!email || !nombre) {
      throw new Error('Email o nombre no definidos al intentar enviar correo de rechazo');
    }

    await this.mailerService.sendMail({
      to: email,
      subject: 'Reserva rechazada',
      text: `Hola ${nombre}, lamentamos informarte que tu reserva fue rechazada.`,
    });
  }
}