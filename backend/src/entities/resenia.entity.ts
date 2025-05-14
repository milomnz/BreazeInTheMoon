/* eslint-disable prettier/prettier */
// src/entities/resenia.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from './cliente.entity';
import { Hotel } from './hotel.entity';

@Entity()
export class Resenia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  comentario: string;

  @Column({ type: 'int', width: 1 })
  calificacion: number; // Por ejemplo, 1 a 5

  @ManyToOne(() => Cliente, (cliente) => cliente.resenias)
  cliente: Cliente;

  @ManyToOne(() => Hotel, (hotel) => hotel.resenias)
  hotel: Hotel;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}