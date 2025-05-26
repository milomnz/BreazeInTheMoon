/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ConfigService } from '@nestjs/config'; // Asegúrate de que esta ruta sea correcta

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usuarioService: UsuarioService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (() => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in environment variables');
        }
        return secret;
      })(),
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.usuarioService.findOne(payload.userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    return {
      id: user.id,
      rol: user.rol,
      correo: user.correo, // opcional
    };
  }
}