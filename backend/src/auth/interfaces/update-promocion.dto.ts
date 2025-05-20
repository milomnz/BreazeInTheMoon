/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsDateString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { TipoPromocion } from 'src/constants/tipo-promocion.enum';

export class UpdatePromocionDto {
  @ApiPropertyOptional({
    description: 'Nombre o título de la promoción',
    example: 'Descuento veraniego',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la promoción',
    example: 'Promoción válida solo para reservas en verano',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Cantidad o porcentaje de descuento aplicado',
    minimum: 0,
    maximum: 100,
    example: 15,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeDescuento?: number;

  @ApiPropertyOptional({
    description: 'Fecha de inicio de la promoción (ISO 8601) o sea YYYY-MM-DD',
    example: '2025-06-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin de la promoción (ISO 8601) o sea YYYY-MM-DD',
    example: '2025-08-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @ApiPropertyOptional({
    description: 'Hora de inicio diaria de la promoción',
    example: '08:00',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  horaInicio?: string;

  @ApiPropertyOptional({
    description: 'Hora de fin diaria de la promoción',
    example: '22:00',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  horaFin?: string;

  @ApiPropertyOptional({
    description: 'Tipo de promoción',
    enum: TipoPromocion,
    example: TipoPromocion.TEMPORADA,
  })
  @IsOptional()
  @IsEnum(TipoPromocion)
  tipo?: TipoPromocion;

  @ApiPropertyOptional({
    description: 'Indica si la promoción está activa',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  activa?: boolean;
}