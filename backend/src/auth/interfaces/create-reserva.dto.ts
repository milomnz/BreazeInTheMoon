/* eslint-disable prettier/prettier */
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsInt()
  clienteId: number;

  @IsNotEmpty()
  @IsInt()
  habitacionId: number;

  @IsNotEmpty()
  @IsDateString()
  fechaInicio: string;

  @IsNotEmpty()
  @IsDateString()
  fechaFin: string;
}