/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { Reserva } from './reserva.entity';
import { Promocion } from './promocion.entity';
import { TipoHabitacion } from 'src/constants/tipo-habitacion.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Habitacion {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único de la habitación' })
  id: number;

  @Column()
  @ApiProperty({ example: 101, description: 'Número identificador de la habitación dentro del hotel' })
  numeroHabitacion: number;

  @Column({
    type: 'enum',
    enum: TipoHabitacion,
  })
  @ApiProperty({ enum: TipoHabitacion, description: 'Tipo de habitación (ej: SIMPLE, DOBLE, SUITE, FAMILIAR)' })
  tipoHabitacion: TipoHabitacion;

  @Column()
  @ApiProperty({ example: 2, description: 'Capacidad máxima de personas en la habitación' })
  capacidad: number;

  @Column('float')
  @ApiProperty({ example: 89.99, description: 'Precio por la habitación' })
  precio: number;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Habitación con vista al mar', required: false })
  descripcion: string;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Disponibilidad actual de la habitación' })
  disponible: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha en que se creó el registro de la habitación' })
  fechaCreacion: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Fecha de la última actualización del registro' })
  fechaActualizacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty({ required: false, description: 'Fecha y hora hasta la cual la habitación está temporalmente bloqueada' })
  bloqueadaHasta: Date | null;

  @ManyToOne(() => Hotel, (hotel) => hotel.habitaciones, { eager: false })
  @JoinColumn({ name: 'hotelId' })
  @ApiProperty({ type: () => Hotel, description: 'Hotel al que pertenece la habitación' })
  hotel: Hotel;

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  @ApiProperty({ type: () => [Reserva], description: 'Reservas asociadas a esta habitación' })
  reservas: Reserva[];

  @ManyToMany(() => Promocion, (promocion) => promocion.habitaciones)
  @ApiProperty({ type: () => [Promocion], description: 'Promociones aplicables a esta habitación' })
  promociones: Promocion[];
}