/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './interfaces/login.dto';
import { CreateUsuarioDto } from './interfaces/create-usuario.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Autenticar usuario y obtener token JWT',
    description: 'Permite a un usuario existente autenticarse con su correo y contraseña para obtener un token de acceso JWT.'
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de acceso del usuario',
    examples: {
      ejemplo1: {
        summary: 'Ejemplo de login',
        value: {
          correo: 'usuario@example.com',
          password: 'miPassword123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario autenticado correctamente. Retorna token JWT.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Credenciales inválidas - correo o contraseña incorrectos.' 
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ 
    summary: 'Registrar nuevo usuario cliente',
    description: 'Permite registrar un nuevo usuario con rol de CLIENTE. El correo debe ser único y se asigna automáticamente el rol de cliente.'
  })
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Datos del nuevo usuario a registrar',
    examples: {
      ejemplo1: {
        summary: 'Ejemplo de registro',
        value: {
          nombre: 'Juan',
          apellido: 'Pérez',
          telefono: '+57300123456',
          correo: 'juan.perez@example.com',
          contrasena: 'miPassword123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuario registrado correctamente. Retorna token JWT para acceso inmediato.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'Token JWT para autenticación del usuario recién registrado'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos - faltan campos requeridos o formato incorrecto.' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'El correo electrónico ya está registrado en el sistema.' 
  })
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.authService.register(createUsuarioDto);
  }
}