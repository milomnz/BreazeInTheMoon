import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // si deseas usar variables de entorno

@Module({
  imports: [
    ConfigModule.forRoot(), // si usas dotenv
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'reserva-hoteles',
      entities: ['./entities'],
      synchronize: true, // solo en desarrollo, evita usar en producción
    }),
  ],
})
export class AppModule {}
