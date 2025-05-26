/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notificacion } from './notificacion.entity';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { Informe } from './informe.entity';
import { Hotel } from './hotel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único del usuario' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Pepe', description: 'Nombre del usuario' })
  nombre: string;

  @Column()
  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  apellido: string;

  @Column()
  @ApiProperty({ example: '+573001112233', description: 'Número de teléfono del usuario' })
  telefono: string;

  @Column()
  @ApiProperty({ example: 'pepe.perez@email.com', description: 'Correo electrónico del usuario' })
  correo: string;

  @Column()
  @ApiProperty({ example: 'jgdawknduBDAWBwnbamdDBJwd', description: 'Contraseña encriptada del usuario' })
  contrasenaEncriptada: string;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    default: RolUsuario.CLIENTE,
  })
  @ApiProperty({ enum: RolUsuario, example: RolUsuario.CLIENTE, description: 'Rol asignado al usuario registrado' })
  rol: RolUsuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-05-20T14:00:00Z', description: 'Fecha de creación del usuario' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-05-20T16:00:00Z', description: 'Fecha de la última actualización del usuario' })
  fechaActualizacion: Date;

  @OneToMany(() => Notificacion, (notificacion) => notificacion.usuario)
  @ApiProperty({ type: () => [Notificacion], description: 'Lista de notificaciones asociadas al usuario' })
  notificaciones: Notificacion[];

  @OneToMany(() => Informe, (informe) => informe.administrador)
  @ApiProperty({ type: () => [Informe], description: 'Lista de informes generados por el usuario (si es administrador)' })
  informes: Informe[];

  @OneToMany(() => Hotel, (hotel) => hotel.administrador)
  @ApiProperty({ type: () => [Hotel], description: 'Hoteles administrados por el usuario' })
  hoteles: Hotel[];
}