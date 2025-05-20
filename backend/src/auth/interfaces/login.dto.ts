/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'samuel@ejemplo.com' })
  correo: string;

  @ApiProperty({ example: 'claveSegura123' })
  password: string;
}
