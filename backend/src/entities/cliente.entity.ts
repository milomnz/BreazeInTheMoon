import { Entity, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Reserva } from './reserva.entity';
import { Resenia } from './resenia.entity';

@Entity()
export class Cliente extends Usuario {
  @OneToMany(() => Reserva, (reserva) => reserva.cliente)
  reservas: Reserva[];

  @OneToMany(() => Resenia, (resenia) => resenia.cliente)
  resenias: Resenia[];
}