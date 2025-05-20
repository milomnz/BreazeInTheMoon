/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './interfaces/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUsuarioDto } from './interfaces/create-usuario.dto';
import { RolUsuario } from 'src/constants/rol-usuario.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsuarioService,
    private readonly jwtService: JwtService,
  ) { }
  async login(loginDto: LoginDto) {
    const { correo, password } = loginDto;
    const user = await this.usersService.findByCorreo(correo);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordMatch = await bcrypt.compare(password, user.contrasenaEncriptada);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload: JwtPayload = {
      userId: user.id,
      correo: user.correo,
      rol: user.rol,
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async loginConDatos(loginDto: LoginDto): Promise<{
    accessToken: string;
    usuario: {
      id: number;
      nombre: string;
      apellido: string;
      correo: string;
      rol: RolUsuario;
    };
  }> {
    const { correo, password } = loginDto;
    const user = await this.usersService.findByCorreo(correo);
    if (!user || !(await bcrypt.compare(password, user.contrasenaEncriptada))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      userId: user.id,
      correo: user.correo,
      rol: user.rol,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
      },
    };
  }

  async register(createUsuarioDto: CreateUsuarioDto) {
    const { correo, contrasenaEncriptada } = createUsuarioDto;

    const existingUser = await this.usersService.findByCorreo(correo);
    if (existingUser) {
      throw new UnauthorizedException('El correo ya está en uso');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenaEncriptada, saltOrRounds);

    const usuario = await this.usersService.create({
      ...createUsuarioDto,
      contrasenaEncriptada: hashedPassword,
    });

    const payload: JwtPayload = {
      userId: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}