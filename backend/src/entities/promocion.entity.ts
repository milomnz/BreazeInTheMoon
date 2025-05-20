/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { TipoPromocion } from 'src/constants/tipo-promocion.enum';
import { Hotel } from './hotel.entity';
import { Habitacion } from './habitacion.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Promocion {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único de la promoción' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Descuento de temporada', description: 'Nombre de la promoción' })
  nombre: string;

  @Column()
  @ApiProperty({ example: 'Aplica para reservas realizadas en mayo', description: 'Descripción detallada de la promoción' })
  descripcion: string;

  @Column('float')
  @ApiProperty({ example: 15.5, description: 'Porcentaje de descuento aplicado por la promoción' })
  porcentajeDescuento: number;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-05-20', description: 'Fecha de inicio de la promoción' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-06-20', description: 'Fecha de finalización de la promoción' })
  fechaFin: Date;

  @Column({ type: 'time' })
  @ApiProperty({ example: '08:00:00', description: 'Hora del día en que la promoción empieza a aplicar' })
  horaInicio: string;

  @Column({ type: 'time' })
  @ApiProperty({ example: '22:00:00', description: 'Hora del día en que la promoción deja de aplicar' })
  horaFin: string;

  @Column({
    type: 'enum',
    enum: TipoPromocion,
  })
  @ApiProperty({ enum: TipoPromocion, description: 'Tipo de promoción (por ejemplo, ESTACIONAL, EXCLUSIVA)' })
  tipo: TipoPromocion;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Indica si la promoción está activa' })
  activa: boolean;

  @CreateDateColumn()
  @ApiProperty({ example: '2025-05-01T12:00:00.000Z', description: 'Fecha de creación de la promoción' })
  fechaCreacion: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2025-05-18T15:30:00.000Z', description: 'Fecha de la última actualización de la promoción' })
  fechaUltimaActualizacion: Date;

  @ManyToMany(() => Hotel, (hotel) => hotel.promociones, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => [Hotel], description: 'Hoteles a los que aplica la promoción' })
  hotel: Hotel;

  @ManyToMany(() => Habitacion, (habitacion) => habitacion.promociones)
  @ApiProperty({ type: () => [Habitacion], description: 'Habitaciones específicas donde se aplica la promoción' })
  habitaciones: Habitacion[];

  // Métodos auxiliares

  esValida(): boolean {
    const ahora = new Date();
    const hoy = ahora.toISOString().split('T')[0];
    const hora = ahora.toTimeString().split(' ')[0];

    return (
      this.activa &&
      this.fechaInicio <= new Date(hoy) &&
      this.fechaFin >= new Date(hoy) &&
      this.horaInicio <= hora &&
      this.horaFin >= hora
    );
  }

  calcularDescuento(monto: number): number {
    if (!this.esValida()) return 0;
    return (monto * this.porcentajeDescuento) / 100;
  }

  activar(): boolean {
    this.activa = true;
    return true;
  }

  desactivar(): boolean {
    this.activa = false;
    return true;
  }
}