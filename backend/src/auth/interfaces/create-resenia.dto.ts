/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, IsNotEmpty } from 'class-validator';

export class CreateReseniaDto {
  @ApiProperty({
    description: 'Calificación otorgada al hotel (de 1 a 5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @ApiProperty({
    description: 'Comentario detallado o breve sobre la experiencia del cliente',
    example: 'Muy buena atención y habitaciones chimbas.',
  })
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @ApiProperty({
    description: 'ID del hotel al que se refiere la reseña',
    example: 2,
  })
  @IsInt()
  hotelId: number;

  @ApiProperty({
    description: 'ID del cliente que escribe la reseña',
    example: 5,
  })
  @IsInt()
  clienteId: number;
}