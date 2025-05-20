/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Habitacion } from './habitacion.entity';
import { EstadoReserva } from 'src/constants/estado-reserva.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único de la reserva' })
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.reservas)
  @ApiProperty({ type: () => Cliente, description: 'Cliente que realizó la reserva' })
  cliente: Cliente;

  @ManyToOne(() => Habitacion, habitacion => habitacion.reservas)
  @ApiProperty({ type: () => Habitacion, description: 'Habitación reservada' })
  habitacion: Habitacion;

  @Column()
  @ApiProperty({ example: '2025-06-01', description: 'Fecha de inicio de la reserva (más conocido como check-in)' })
  fechaInicio: Date;

  @Column()
  @ApiProperty({ example: '2025-06-05', description: 'Fecha de fin de la reserva (más conocido como check-out)' })
  fechaFin: Date;

  @Column()
  @ApiProperty({ example: 4, description: 'Número de noches de la reserva' })
  numeroNoches: number;

  @Column('float')
  @ApiProperty({ example: 480.00, description: 'Costo total de la reserva' })
  costoTotal: number;

  @Column()
  @ApiProperty({ example: '2025-05-20T14:30:00.000Z', description: 'Fecha en que se creó la reserva' })
  fechaCreacion: Date;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.PENDIENTE
  })
  @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.PENDIENTE, description: 'Estado actual de la reserva' })
  estado: EstadoReserva;
}