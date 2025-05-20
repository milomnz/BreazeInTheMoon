/* eslint-disable prettier/prettier */
import { Entity, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Reserva } from './reserva.entity';
import { Resenia } from './resenia.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cliente extends Usuario {
  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  @ApiProperty({ type: () => [Reserva], description: 'Reservas realizadas por el cliente' })
  reservas: Reserva[];

  @OneToMany(() => Resenia, (resenia) => resenia.cliente)
  @ApiProperty({ type: () => [Resenia], description: 'Reseñas realizadas por el cliente' })
  resenias: Resenia[];
}