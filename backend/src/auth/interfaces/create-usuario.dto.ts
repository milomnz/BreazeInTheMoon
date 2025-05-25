/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Samuel',
  })
  @IsString()
  nombre: string;


  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+5715555555555',
  })
  @IsString()
  telefono: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  correo: string;

  @ApiProperty({
    description: 'Contraseña SIN ENCTR\IPTAR',
    example: 'contraseñaSegura123',
  })
  @IsString()
  contrasena: string;

  @ApiProperty({
    description: 'Rol asignado al usuario (ADMIN, CLIENTE)',
    enum: RolUsuario,
    example: RolUsuario.CLIENTE,
  })
  @IsString()
  rol: RolUsuario;
}