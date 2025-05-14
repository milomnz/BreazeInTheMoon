/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Habitacion } from './habitacion.entity';
import { Promocion } from './promocion.entity';
import { Administrador } from './administrador.entity';
import { Localizacion } from './localizacion.entity';
import { Resenia } from './resenia.entity';
import { Informe } from './informe.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ nullable: true })
  localizacion: string;

  @OneToMany(() => Habitacion, (habitacion) => habitacion.hotel)
  habitaciones: Habitacion[];

  @OneToMany(() => Promocion, (promocion) => promocion.hotel)
  promociones: Promocion[];

  @OneToMany(() => Resenia, (resenia) => resenia.hotel)
  resenias: Resenia[];

  @OneToMany(() => Informe, (informe) => informe.hotel)
  informes: Informe[];

  @OneToOne(() => Administrador, (admin) => admin.hotel)
  administrador: Administrador;
}
