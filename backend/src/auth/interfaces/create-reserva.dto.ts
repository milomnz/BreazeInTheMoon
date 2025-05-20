/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @ApiProperty({
    description: 'ID del cliente que realiza la reserva',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  clienteId: number;

  @ApiProperty({
    description: 'ID de la habitación que se desea reservar',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  habitacionId: number;

  @ApiProperty({
    description: 'Fecha de inicio de la reserva (formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-07-01',
  })
  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({
    description: 'Fecha de fin de la reserva (formato ISO 8601) o sea YYYY-MM-DD',
    example: '2025-07-05',
  })
  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;
}