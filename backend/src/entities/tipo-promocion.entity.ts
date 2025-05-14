/* eslint-disable prettier/prettier */
// src/entities/tipo-promocion.entity.ts
import {
Entity,
PrimaryGeneratedColumn,
Column,
OneToMany,
} from 'typeorm';
import { Promocion } from './promocion.entity';

@Entity()
export class TipoPromocion {
@PrimaryGeneratedColumn()
id: number;

@Column()
nombre: string;

@Column({ nullable: true })
descripcion: string;

@OneToMany(() => Promocion, (promocion) => promocion.tipoPromocion)
promociones: Promocion[];
}  