/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { NotificacionService } from './notificacion.service';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Get()
  @Roles(RolUsuario.CLIENTE, RolUsuario.ADMIN)
  obtenerPropias(@Req() req: RequestWithUser) {
    return this.notificacionService.obtenerPorUsuario(req.user.userId);
  }

  @Put(':id/leida')
  @Roles(RolUsuario.CLIENTE, RolUsuario.ADMIN)
  marcarComoLeida(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionService.marcarComoLeida(id);
  }
}