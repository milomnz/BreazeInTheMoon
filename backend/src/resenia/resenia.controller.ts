/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ReseniaService } from './resenia.service';
import { CreateReseniaDto } from 'src/auth/interfaces/create-resenia.dto';
import { UpdateReseniaDto } from 'src/auth/interfaces/update-resenia.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reseñas')
@Controller('resenias')
export class ReseniaController {
    constructor(private readonly reseniaService: ReseniaService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolUsuario.CLIENTE)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear una reseña (solo clientes)' })
    @ApiBody({ type: CreateReseniaDto })
    @ApiResponse({ status: 201, description: 'Reseña creada correctamente' })
    async create(@Req() req: RequestWithUser, @Body() dto: CreateReseniaDto) {
        dto.clienteId = req.user.userId;
        return this.reseniaService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las reseñas' })
    @ApiResponse({ status: 200, description: 'Lista de reseñas' })
    async findAll() {
        return this.reseniaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una reseña por ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Detalle de la reseña' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reseniaService.findOne(id);
    }

    @Get('hotel/:hotelId')
    @ApiOperation({ summary: 'Listar reseñas de un hotel' })
    @ApiParam({ name: 'hotelId', type: Number })
    @ApiResponse({ status: 200, description: 'Lista de reseñas del hotel' })
    async findByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
        return this.reseniaService.findByHotelId(hotelId);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolUsuario.CLIENTE)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar una reseña (solo clientes)' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateReseniaDto })
    @ApiResponse({ status: 200, description: 'Reseña actualizada correctamente' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: RequestWithUser,
        @Body() dto: UpdateReseniaDto,
    ) {
        dto.clienteId = req.user.userId;
        return this.reseniaService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolUsuario.CLIENTE)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar una reseña (solo clientes)' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Reseña eliminada correctamente' })
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: RequestWithUser,
    ) {
        return this.reseniaService.remove(id, req.user.userId);
    }
}