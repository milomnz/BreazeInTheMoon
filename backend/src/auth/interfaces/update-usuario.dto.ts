/* eslint-disable prettier/prettier */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';

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
  contrasenaEncriptada?: string;

  @ApiPropertyOptional({ example: RolUsuario.ADMIN, enum: RolUsuario, description: 'Rol del usuario' })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;
}