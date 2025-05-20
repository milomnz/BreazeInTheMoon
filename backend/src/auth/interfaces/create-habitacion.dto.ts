/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { TipoHabitacion } from 'src/constants/tipo-habitacion.enum';

export class CreateHabitacionDto {
  @ApiProperty({
    description: 'Número identificador de la habitación dentro del hotel',
    example: 101,
  })
  @IsInt()
  @IsPositive()
  numeroHabitacion: number;

  @ApiProperty({
    description: 'Tipo de habitación (EJEMPLO: SIMPLE, DOBLE, SUITE, FAMILIAR)',
    enum: TipoHabitacion,
    example: TipoHabitacion.SIMPLE,
  })
  @IsEnum(TipoHabitacion)
  tipoHabitacion: TipoHabitacion;

  @ApiProperty({
    description: 'Capacidad máxima de personas en la habitación',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacidad: number;

  @ApiPropertyOptional({
    description: 'Descripción adicional de la habitación',
    example: 'Habitación con vista al mar y con balcón',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'Precio de la habitación',
    example: 120.50,
    minimum: 0.01,
  })
  @IsPositive()
  precio: number;

  @ApiProperty({
    description: 'ID del hotel al que pertenece la habitación',
    example: 3,
  })
  @IsInt()
  hotelId: number;
}