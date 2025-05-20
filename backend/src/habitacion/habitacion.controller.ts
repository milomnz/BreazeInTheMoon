/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { CreateHabitacionDto } from 'src/auth/interfaces/create-habitacion.dto';
import { UpdateHabitacionDto } from 'src/auth/interfaces/update-habitacion.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Habitaciones')
@ApiBearerAuth()
@Controller('habitaciones')
export class HabitacionController {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Roles(RolUsuario.ADMIN, RolUsuario.CLIENTE)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las habitaciones' })
  @ApiResponse({ status: 200, description: 'Lista de habitaciones retornada correctamente.' })
  findAll() {
    return this.habitacionService.findAll();
  }

  @Roles(RolUsuario.ADMIN)
  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Obtener habitaciones por ID de hotel' })
  @ApiParam({ name: 'hotelId', type: Number, description: 'ID del hotel' })
  @ApiResponse({ status: 200, description: 'Lista de habitaciones del hotel retornada correctamente.' })
  getByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.habitacionService.findByHotel(hotelId);
  }

  @Roles(RolUsuario.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva habitación' })
  @ApiBody({ type: CreateHabitacionDto })
  @ApiResponse({ status: 201, description: 'Habitación creada correctamente.' })
  create(@Body() createHabitacionDto: CreateHabitacionDto) {
    return this.habitacionService.create(createHabitacionDto);
  }

  @Roles(RolUsuario.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una habitación existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la habitación a actualizar' })
  @ApiBody({ type: UpdateHabitacionDto })
  @ApiResponse({ status: 200, description: 'Habitación actualizada correctamente.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHabitacionDto: UpdateHabitacionDto,
  ) {
    return this.habitacionService.update(id, updateHabitacionDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una habitación por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la habitación a eliminar' })
  @ApiResponse({ status: 204, description: 'Habitación eliminada correctamente.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.habitacionService.remove(id);
  }
}