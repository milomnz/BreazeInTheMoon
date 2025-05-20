/* eslint-disable prettier/prettier */
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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Resenia {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único de la reseña' })
  id: number;

  @Column('text')
  @ApiProperty({ example: 'Excelente atención y servicio.', description: 'Comentario realizado por el cliente sobre el hotel' })
  comentario: string;

  @Column({ type: 'int', width: 1 })
  @ApiProperty({ example: 5, minimum: 1, maximum: 5, description: 'Calificación del hotel (de 1 a 5)' })
  calificacion: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.resenias)
  @ApiProperty({ type: () => Cliente, description: 'Cliente que realizó la reseña' })
  cliente: Cliente;

  @ManyToOne(() => Hotel, (hotel) => hotel.resenias)
  @ApiProperty({ type: () => Hotel, description: 'Hotel al que corresponde la reseña' })
  hotel: Hotel;

  @CreateDateColumn()
  @ApiProperty({ example: '2025-05-01T10:00:00.000Z', description: 'Fecha de creación de la reseña' })
  fechaCreacion: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-05-02T12:30:00.000Z', description: 'Fecha de última actualización de la reseña' })
  fechaActualizacion: Date;
}