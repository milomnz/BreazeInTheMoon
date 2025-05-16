/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Habitacion } from './habitacion.entity';
import { Promocion } from './promocion.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.reservas)
  cliente: Cliente;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas)
  habitacion: Habitacion;

  @Column()
  fechaEntrada: Date;

  @Column()
  fechaSalida: Date;

  @Column('double')
  montoTotal: number;

  @Column()
  estado: string; // Puede ser 'PENDIENTE', 'RECHAZADA', 'CANCELADA', 'COMPLETADA'

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @ManyToOne(() => Promocion, { nullable: true })
  promocionAplicada: Promocion;
}