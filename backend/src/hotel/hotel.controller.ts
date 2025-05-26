/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Body,
    Put,
    Request as Req,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { UpdateHotelDto } from 'src/auth/interfaces/update-hotel.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Hoteles')
@ApiBearerAuth()
//@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('hoteles')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Get('me')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Obtener el hotel asignado al administrador actual' })
    @ApiResponse({ status: 200, description: 'Hotel encontrado correctamente.' })
    @ApiResponse({ status: 404, description: 'No tienes un hotel asignado.' })
    async findMyHotel(@Req() req) {
        console.log('Usuario autenticado:', req.user);
        if (req.user.rol !== 'ADMIN') throw new UnauthorizedException('Solo los administradores pueden ver sus hoteles');
        return this.hotelService.findByAdminId(req.user.userId);
    }

    @Get()
    @Roles(RolUsuario.ADMIN, RolUsuario.CLIENTE)
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
        return this.hotelService.update(hotel.id, dto, req.user.userId);
    }
}