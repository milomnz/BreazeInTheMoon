/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Get,
    Body,
    Delete,
    Put,
    UseGuards,
    Request as Req,
    NotFoundException,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from 'src/auth/interfaces/create-hotel.dto';
import { UpdateHotelDto } from 'src/auth/interfaces/update-hotel.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Hoteles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('hoteles')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Post()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Crear un nuevo hotel (solo administradores)' })
    @ApiBody({ type: CreateHotelDto })
    @ApiResponse({ status: 201, description: 'Hotel creado correctamente.' })
    create(@Req() req, @Body() dto: CreateHotelDto) {
        return this.hotelService.create(dto, req.user.userId);
    }

    @Get('me')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Obtener el hotel asignado al administrador actual' })
    @ApiResponse({ status: 200, description: 'Hotel encontrado correctamente.' })
    @ApiResponse({ status: 404, description: 'No tienes un hotel asignado.' })
    async findMyHotel(@Req() req) {
        const hotel = await this.hotelService.findByAdminId(req.user.userId);
        if (!hotel) throw new NotFoundException('No tienes un hotel asignado');
        return hotel;
    }

    @Get()
    @ApiOperation({ summary: 'Obtener la lista de todos los hoteles (público)' })
    @ApiResponse({ status: 200, description: 'Lista de hoteles retornada correctamente.' })
    findAll() {
        return this.hotelService.findAllWithPromedios();
    }

    @Put('me')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Actualizar el hotel del administrador actual' })
    @ApiBody({ type: UpdateHotelDto })
    @ApiResponse({ status: 200, description: 'Hotel actualizado correctamente.' })
    @ApiResponse({ status: 404, description: 'No tienes un hotel asignado.' })
    async updateMyHotel(@Req() req, @Body() dto: UpdateHotelDto) {
        const hotel = await this.hotelService.findByAdminId(req.user.userId);
        if (!hotel) throw new NotFoundException('No tienes un hotel asignado');
        return this.hotelService.update(hotel.id, dto);
    }

    @Delete('me')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Eliminar el hotel del administrador actual' })
    @ApiResponse({ status: 200, description: 'Hotel eliminado correctamente.' })
    @ApiResponse({ status: 404, description: 'No tienes un hotel asignado.' })
    async deleteMyHotel(@Req() req) {
        const hotel = await this.hotelService.findByAdminId(req.user.userId);
        if (!hotel) throw new NotFoundException('No tienes un hotel asignado');
        return this.hotelService.remove(hotel.id);
    }
}