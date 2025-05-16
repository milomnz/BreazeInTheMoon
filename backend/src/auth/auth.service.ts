/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service'; // Asegúrate de que el nombre y ruta coincidan
import { LoginDto } from './interfaces/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.usersService.findByCorreo(username);
    if (!user || user.contrasenaEncriptada !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.correo, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}