/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;
}