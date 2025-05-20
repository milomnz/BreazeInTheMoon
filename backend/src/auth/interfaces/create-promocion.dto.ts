/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { TipoPromocion } from 'src/constants/tipo-promocion.enum';

export class CreatePromocionDto {
  @ApiProperty({
    description: 'Nombre o título de la promoción',
    example: 'Descuento de Verano',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Descripción breve de la promoción',
    example: 'Descuento del 20% en todas las habitaciones durante el verano',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    description: 'Porcentaje de descuento ofrecido por la promoción (de 0 a 100)',
    example: 20,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeDescuento: number;

  @ApiProperty({
    description: 'Fecha de inicio de la promoción (en formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-06-01',
  })
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({
    description: 'Fecha de finalización de la promoción (en formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-06-30',
  })
  @IsDateString()
  fechaFin: string;

  @ApiProperty({
    description: 'Hora del día en que inicia la promoción (formato HH:mm)',
    example: '14:00',
  })
  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @ApiProperty({
    description: 'Hora del día en que finaliza la promoción (formato HH:mm)',
    example: '18:00',
  })
  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @ApiProperty({
    description: 'Tipo de promoción',
    enum: TipoPromocion,
    example: TipoPromocion.TEMPORADA,
  })
  @IsEnum(TipoPromocion)
  tipo: TipoPromocion;

  @ApiProperty({
    description: 'ID del hotel al que está asociada la promoción',
    example: 1,
  })
  @IsNumber()
  hotelId: number;
}