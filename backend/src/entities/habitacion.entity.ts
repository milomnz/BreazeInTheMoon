import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { Reserva } from './reserva.entity';

@Entity()
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio: number;

  @Column()
  capacidad: number;

  @Column()
  tipo: string;

  @Column({ default: true })
  disponible: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.habitaciones)
  hotel: Hotel;

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  reservas: Reserva[];
}