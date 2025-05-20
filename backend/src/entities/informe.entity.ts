/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { TipoInforme } from 'src/constants/tipo-informe.enum';
import { Hotel } from './hotel.entity';
import { Usuario } from './usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Informe {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único del informe' })
  id: number;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-05-20', description: 'Fecha en la que se generó el informe' })
  fechaGeneracion: Date;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-05-01', description: 'Fecha de inicio del período del informe' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2025-05-15', description: 'Fecha de fin del período del informe' })
  fechaFin: Date;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Informe detallado sobre ocupación y comentarios de clientes...', description: 'Contenido textual del informe generado' })
  contenido: string;

  @Column({
    type: 'enum',
    enum: TipoInforme,
  })
  @ApiProperty({ enum: TipoInforme, description: 'Tipo de informe generado (ej. OCUPACION, CALIFICACIONES, GENERAL)' })
  tipo: TipoInforme;

  @ManyToOne(() => Usuario, (usuario) => usuario.informes)
  @ApiProperty({ type: () => Usuario, description: 'Administrador que generó el informe' })
  administrador: Usuario;

  @ManyToOne(() => Hotel, (hotel) => hotel.informes)
  @ApiProperty({ type: () => Hotel, description: 'Hotel al que está asociado el informe' })
  hotel: Hotel;
}