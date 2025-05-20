/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EstadoReserva } from 'src/constants/estado-reserva.enum';

export class UpdateReservaDto {
  @ApiPropertyOptional({
    description: 'Fecha de inicio de la reserva (formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-06-01T14:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @ApiPropertyOptional({
    description: 'Fecha de fin de la reserva (formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-06-05T12:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @ApiPropertyOptional({
    description: 'Estado actual de la reserva',
    enum: EstadoReserva,
    example: EstadoReserva.CONFIRMADA,
  })
  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;
}