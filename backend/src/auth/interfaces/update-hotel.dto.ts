/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateHotelDto {
  @ApiPropertyOptional({
    description: 'Nombre del hotel',
    example: 'Hotel BreazeInTheMoon',
  })
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiPropertyOptional({
    description: 'Descripción del hotel',
    example: 'Hotel boutique con vistas espectaculares',
  })
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto del hotel',
    example: '+57 55 1234 5678',
  })
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiPropertyOptional({
    description: 'Localización o dirección del hotel',
    example: 'Av. Madrid 123, España',
  })
  @IsOptional()
  @IsString()
  localizacion: string;
}
