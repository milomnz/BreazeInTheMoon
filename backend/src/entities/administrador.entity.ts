import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Hotel } from './hotel.entity';

@Entity()
export class Administrador extends Usuario {
  @OneToOne(() => Hotel, (hotel) => hotel.administrador)
  @JoinColumn()
  hotel: Hotel;
}
