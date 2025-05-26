/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Body,
    Put,
    Request as Req,
    NotFoundException,
    Param, // Importa Param para obtener IDs de la URL
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { UpdateHotelDto } from 'src/auth/interfaces/update-hotel.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'; // Importa ApiParam

@ApiTags('Hoteles')
@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('hoteles')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Get()
    @Roles(RolUsuario.ADMIN, RolUsuario.CLIENTE)
    @ApiOperation({ summary: 'Obtener la lista de todos los hoteles con su calificación promedio' })
    @ApiResponse({ status: 200, description: 'Lista de hoteles retornada correctamente.' })
    async findAllHotelsWithPromedios() {
        return this.hotelService.findAllWithPromedios();
    }

    @Get('me')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Obtener el hotel asignado al administrador actual' })
    @ApiResponse({ status: 200, description: 'Hotel del administrador retornado correctamente.' })
    @ApiResponse({ status: 404, description: 'El administrador no tiene un hotel asignado.' })
    async getMyHotel(@Req() req) {
        const hotel = await this.hotelService.findByAdminId(req.user.userId);
        if (!hotel) throw new NotFoundException('No tienes un hotel asignado');
        return hotel;
    }

    @Get(':id')
    @Roles(RolUsuario.ADMIN, RolUsuario.CLIENTE)
    @ApiOperation({ summary: 'Obtener un hotel por su ID' })
    @ApiParam({ name: 'id', description: 'ID del hotel a buscar', type: Number })
    @ApiResponse({ status: 200, description: 'Hotel retornado correctamente.' })
    @ApiResponse({ status: 404, description: 'Hotel no encontrado.' })
    async findHotelById(@Param('id') id: number) {
        const hotel = await this.hotelService.findOne(id);
        if (!hotel) throw new NotFoundException(`Hotel con id ${id} no encontrado`);
        return hotel;
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
        return this.hotelService.update(hotel.id, dto, req.user.userId);
    }
}