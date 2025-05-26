/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';


export class UpdateUsuarioDto {
  @ApiPropertyOptional({ example: 'Samuel', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: '+5715512345678', description: 'Teléfono de contacto' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiPropertyOptional({ example: 'juan.perez@mail.com', description: 'Correo electrónico' })
  @IsOptional()
  @IsEmail()
  correo?: string;

  @ApiPropertyOptional({ example: 'hashedPassword123', description: 'Contraseña encriptada' })
  @IsOptional()
  @IsString()
  contrasena?: string;

}