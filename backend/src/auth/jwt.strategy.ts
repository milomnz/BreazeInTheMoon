/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuarioService: UsuarioService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default-secret',
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.usuarioService.findOne(payload.userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    console.log('Payload del token:', payload);
    return {
      id: user.id,
      rol: user.rol,
      correo: user.correo, // opcional
    };
  }
}