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
    description: 'Apellido del usuario',
    example: 'Herrera',
  })
  @IsString()
  apellido: string;

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
    description: 'Contraseña (encriptada) del usuario',
    example: 'PyLesQ5TkXhuh5URwU0T5u/2MLwP9JUdg10LVszBmcjQSdMc7PF20Kjsljn7wylr',
  })
  @IsString()
  contrasenaEncriptada: string;

  @ApiProperty({
    description: 'Rol asignado al usuario (ADMIN, CLIENTE)',
    enum: RolUsuario,
    example: RolUsuario.CLIENTE,
  })
  @IsString()
  rol: RolUsuario;
}