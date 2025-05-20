/* eslint-disable prettier/prettier */
import { Controller, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { PromocionService } from './promocion.service';
import { UpdatePromocionDto } from 'src/auth/interfaces/update-promocion.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Promociones')
@ApiBearerAuth()
@Controller('promociones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {}

  @Put(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar una promoción por ID (solo administradores)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePromocionDto })
  @ApiResponse({ status: 200, description: 'Promoción actualizada correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePromocionDto) {
    return this.promocionService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar una promoción por ID (solo administradores)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Promoción eliminada correctamente.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.promocionService.delete(id);
  }
  // otras rutas públicas o con otros roles según convenga
}
