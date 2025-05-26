/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsuarioService } from '../usuario/usuario.service'; 
import { ConfigService } from '@nestjs/config'; 

@Injectable()
export 
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    // Inyecta UsuarioService para poder buscar al usuario en la base de datos.
    private readonly usersService: UsuarioService,
    // Inyecta ConfigService para acceder a las variables de entorno, como JWT_SECRET.
    private readonly configService: ConfigService,
  ) {
    super({
      // Define cómo se extrae el JWT de la solicitud: del encabezado 'Authorization' como un token Bearer.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 'ignoreExpiration: false' significa que el token será invalidado si ha expirado.
      ignoreExpiration: false,
      // La clave secreta para verificar la firma del JWT. Se obtiene de las variables de entorno.
      secretOrKey: (() => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in environment variables');
        }
        return secret;
      })(),
    });
  }

  /**
   * Este método se ejecuta automáticamente después de que un token JWT es:
   * 1. Extraído de la solicitud.
   * 2. Decodificado.
   * 3. Verificado con la clave secreta (secretOrKey).
   *
   * @param payload El objeto payload decodificado del token JWT.
   * @returns El objeto de usuario autenticado, que NestJS adjuntará a `req.user`.
   * @throws UnauthorizedException si el usuario no es encontrado o el token es inválido.
   */
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException('Token inválido o usuario no encontrado.');
    }

    // Si el usuario es encontrado, se devuelve. NestJS lo adjuntará a `req.user`
    // en cualquier ruta protegida con `@UseGuards(AuthGuard('jwt'))`.
    // Esto permite acceder a `req.user.id`, `req.user.correo`, etc., en los controladores.
    return user;
  }
}