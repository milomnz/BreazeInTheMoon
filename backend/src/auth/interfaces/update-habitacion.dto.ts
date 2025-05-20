/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { TipoHabitacion } from 'src/constants/tipo-habitacion.enum';

export class UpdateHabitacionDto {
  @ApiPropertyOptional({
    description: 'Número de habitación',
    example: 101,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  numeroHabitacion?: number;

  @ApiPropertyOptional({
    description: 'Tipo de habitación',
    enum: TipoHabitacion,
    example: TipoHabitacion.SIMPLE,
  })
  @IsOptional()
  @IsEnum(TipoHabitacion)
  tipoHabitacion?: TipoHabitacion;

  @ApiPropertyOptional({
    description: 'Capacidad máxima de personas',
    minimum: 1,
    maximum: 10,
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  capacidad?: number;

  @ApiPropertyOptional({
    description: 'Precio',
    example: 350.50,
  })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  precio?: number;

  @ApiPropertyOptional({
    description: 'Descripción adicional de la habitación',
    example: 'Habitación con vista a las montañas y un barsito.',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Indica si la habitación está disponible para reservar',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}