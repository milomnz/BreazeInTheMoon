/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    description: 'Nombre del hotel',
    example: 'Hotel BreazeInTheMoon',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción general del hotel',
    example: 'Hotel con ambiente relajado frente al mar, ideal para románticos.',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Número para contactar al hotel',
    example: '+57 123 456 7890',
  })
  @IsString()
  telefono: string;

  @ApiProperty({
    description: 'Ubicación del hotel',
    example: 'Cancún, México',
  })
  @IsString()
  localizacion: string;
}