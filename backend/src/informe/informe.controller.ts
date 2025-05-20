/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InformeService } from './informe.service';
import { CreateInformeDto } from 'src/auth/interfaces/create-informes.dto';
import { UpdateInformeDto } from 'src/auth/interfaces/update-informes.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Informes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('informes')
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  @Post()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo informe (solo administradores)' })
  @ApiBody({ type: CreateInformeDto })
  @ApiResponse({ status: 201, description: 'Informe creado correctamente.' })
  create(@Body() dto: CreateInformeDto) {
    return this.informeService.create(dto);
  }

  @Get()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los informes (solo administradores)' })
  @ApiResponse({ status: 200, description: 'Lista de informes.' })
  findAll() {
    return this.informeService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener un informe por ID (solo administradores)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Informe encontrado.' })
  @ApiResponse({ status: 404, description: 'Informe no encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const informe = await this.informeService.findOne(id);
    if (!informe) throw new NotFoundException('Informe no encontrado');
    return informe;
  }

  @Put(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar un informe por ID (solo administradores)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateInformeDto })
  @ApiResponse({ status: 200, description: 'Informe actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInformeDto) {
    return this.informeService.update(id, dto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar un informe por ID (solo administradores)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Informe eliminado correctamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.informeService.remove(id);
  }
}