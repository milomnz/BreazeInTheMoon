/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { ReservaModule } from './reserva/reserva.module';
import { ReseniaModule } from './resenia/resenia.module';
import { PromocionModule } from './promocion/promocion.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { InformeModule } from './informe/informe.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioController } from './usuario/usuario.controller';
import { ReseniaController } from './resenia/resenia.controller';
import { NotificacionController } from './notificacion/notificacion.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'reserva-hoteles',
      autoLoadEntities: true,
      synchronize: true,
    }),
    HotelModule,
    UsuarioModule,
    ClienteModule,
    HabitacionModule,
    ReservaModule,
    ReseniaModule,
    PromocionModule,
    NotificacionModule,
    InformeModule,
    AuthModule,
    HotelModule
  ],
  controllers: [
    AppController,
    UsuarioController,
    ReseniaController,
    NotificacionController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}