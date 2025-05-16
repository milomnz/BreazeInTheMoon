/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity()
export class Localizacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  pais: string;

  @OneToOne(() => Hotel, (hotel) => hotel.localizacion)
  hotel: Hotel;
}