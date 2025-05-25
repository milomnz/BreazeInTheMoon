// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ¡Importa estos!

@Module({
  imports: [
    UsuarioModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // <<-- ESTE ES EL CAMBIO CLAVE -->>
    JwtModule.registerAsync({
      imports: [ConfigModule], // Asegúrate de importar ConfigModule aquí
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ¡Ahora lee del .env!
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService], // Asegúrate de inyectar ConfigService
    }),
    ConfigModule, // Puedes dejarlo si AppMoule no tiene isGlobal: true, o quitarlo si sí lo tiene.
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule], // Es buena práctica exportar JwtModule y PassportModule
})
export class AuthModule {}