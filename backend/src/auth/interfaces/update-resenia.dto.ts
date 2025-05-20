/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min, Max, IsString } from 'class-validator';

export class UpdateReseniaDto {
  @ApiPropertyOptional({
    description: 'Calificación de la reseña, valor entre 1 y 5',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion?: number;

  @ApiPropertyOptional({
    description: 'Comentario o texto de la reseña',
    example: 'Muy buen servicio y muy limpio también',
  })
  @IsOptional()
  @IsString()
  comentario?: string;

  @ApiPropertyOptional({
    description: 'ID del hotel al que pertenece la reseña',
    example: 12,
  })
  @IsOptional()
  @IsInt()
  hotelId?: number;

  @ApiPropertyOptional({
    description: 'ID del cliente que realiza la reseña',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  clienteId?: number;
}