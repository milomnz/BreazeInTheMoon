/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './interfaces/login.dto';
import { CreateUsuarioDto } from './interfaces/create-usuario.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuario y obtener token JWT' })
  @ApiResponse({ status: 201, description: 'Usuario autenticado correctamente. Procede a retornar token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    console.log('Llamada a /auth/login con DTO:', loginDto);
    const result = await this.authService.login(loginDto);
    console.log('Resultado del login:', result);
    return result;
  }
  /* @Post('login')
  @ApiOperation({ summary: 'Autenticar usuario y obtener token JWT' })
  @ApiResponse({ status: 201, description: 'Usuario autenticado correctamente. Procede a retornar token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  } */

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario y obtener token JWT' })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.' })
  @ApiResponse({ status: 401, description: 'El correo ya está en uso.' })
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.register(createUsuarioDto);
  }
}