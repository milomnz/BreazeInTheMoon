/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from './hotel.entity';
import { TipoPromocion } from './tipo-promocion.entity';

@Entity()
export class Promocion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  descuento: number; // porcentaje de descuento

  @ManyToOne(() => Hotel, (hotel) => hotel.promociones)
  hotel: Hotel;

  @ManyToOne(() => TipoPromocion, (tipo) => tipo.promociones)
  tipoPromocion: TipoPromocion;
}