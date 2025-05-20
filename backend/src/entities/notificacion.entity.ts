/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { TipoNotificacion } from 'src/constants/tipo-notificacion.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Notificacion {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único de la notificación' })
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
  @ApiProperty({ type: () => Usuario, description: 'Usuario al que está dirigida la notificación' })
  usuario: Usuario;

  @Column({
    type: 'enum',
    enum: TipoNotificacion,
  })
  @ApiProperty({ enum: TipoNotificacion, description: 'Tipo de notificación (RESERVA_PUBLICADA, ALERTA_PROMOCION, RECHAZO_RESERVA, CONFIRMACION_RESERVA)' })
  tipo: TipoNotificacion;

  @Column()
  @ApiProperty({ example: 'Tu reserva ha sido confirmada', description: 'Mensaje de la notificación' })
  mensaje: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-05-20', description: 'Fecha de creación de la notificación (sin hora)' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp' })
  @ApiProperty({ example: '2025-05-20T14:00:00Z', description: 'Fecha y hora de envío de la notificación' })
  fechaEnvio: Date;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Indica si la notificación ha sido leída por el usuario' })
  leida: boolean;
}