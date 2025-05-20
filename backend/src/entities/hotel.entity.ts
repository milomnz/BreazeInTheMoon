/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Habitacion } from './habitacion.entity';
import { Resenia } from './resenia.entity';
import { Informe } from './informe.entity';
import { Usuario } from './usuario.entity';
import { Promocion } from './promocion.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único del hotel' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Hotel con sol y playa', description: 'Nombre del hotel' })
  nombre: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Hotel frente al mar con todos los juguetes', required: false })
  descripcion: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '+57 320 1234567', required: false, description: 'Número de teléfono del hotel' })
  telefono: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Cartagena, Colombia', required: false, description: 'Ubicación o dirección del hotel' })
  localizacion: string;

  @OneToMany(() => Habitacion, (habitacion) => habitacion.hotel)
  @ApiProperty({ type: () => [Habitacion], description: 'Lista de habitaciones que pertenecen al hotel' })
  habitaciones: Habitacion[];

  @OneToMany(() => Resenia, (resenia) => resenia.hotel)
  @ApiProperty({ type: () => [Resenia], description: 'Lista de reseñas hechas por los clientes para el hotel' })
  resenias: Resenia[];

  @OneToMany(() => Informe, (informe) => informe.hotel)
  @ApiProperty({ type: () => [Informe], description: 'Informes asociados a la gestión del hotel' })
  informes: Informe[];

  @OneToMany(() => Promocion, (promocion) => promocion.hotel)
  @ApiProperty({ type: () => [Promocion], description: 'Promociones vigentes asociadas al hotel' })
  promociones: Promocion[];

  @ManyToOne(() => Usuario, (usuario) => usuario.hoteles)
  @ApiProperty({ type: () => Usuario, description: 'Administrador/es encargados del hotel' })
  administrador: Usuario;

  @Column({ type: 'float', default: 5.0 })
  @ApiProperty({ example: 4.6, description: 'Calificación promedio del hotel, basada en reseñas de clientes' })
  calificacionPromedio: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del registro del hotel' })
  fechaCreacion: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Fecha de la última actualización del hotel' })
  fechaActualizacion: Date;
}