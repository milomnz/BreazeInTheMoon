/* eslint-disable prettier/prettier */
// src/entities/notificacion.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
  
@Entity()
export class Notificacion
{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    titulo: string;
  
    @Column('text')
    mensaje: string;
  
    @Column({ default: false })
    leida: boolean;
  
    @ManyToOne(() => Usuario, (usuario) => usuario.notificaciones)
    usuario: Usuario;
  
    @CreateDateColumn()
    fechaCreacion: Date;
  
    @UpdateDateColumn()
    fechaActualizacion: Date;
}  