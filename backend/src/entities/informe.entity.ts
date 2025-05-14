/* eslint-disable prettier/prettier */
// src/entities/informe.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';

@Entity()
export class Informe
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.informes)
    hotel: Hotel;

    @Column('date')
    fechaInicio: Date;

    @Column('date')
    fechaFin: Date;

    @Column()
    totalReservas: number;

    @Column()
    habitacionesOcupadas: number;

    @Column()
    habitacionesDisponibles: number;

    @Column({ type: 'text', nullable: true })
    observaciones: string;

    @CreateDateColumn()
    fechaGeneracion: Date;

    @UpdateDateColumn()
    fechaActualizacion: Date;
}