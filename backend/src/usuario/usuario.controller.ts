/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from 'src/auth/interfaces/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/auth/interfaces/update-usuario.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Crear un nuevo usuario (solo administradores)' })
    @ApiBody({ type: CreateUsuarioDto })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    create(@Body() dto: CreateUsuarioDto) {
        return this.usuarioService.create(dto);
    }

    @Put('actualizar')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Actualizar datos de un usuario (administrador)' })
    @ApiBody({ type: UpdateUsuarioDto })
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
    update(@Req() req: RequestWithUser, @Body() dto: UpdateUsuarioDto) {
        return this.usuarioService.update(req.user.userId, dto);
    }

    @Put('perfil')
    @Roles(RolUsuario.CLIENTE)
    @ApiOperation({ summary: 'Actualizar perfil personal (cliente)' })
    @ApiBody({ type: UpdateUsuarioDto })
    @ApiResponse({ status: 200, description: 'Perfil actualizado correctamente' })
    updateProfile(@Req() req: RequestWithUser, @Body() dto: UpdateUsuarioDto) {
        return this.usuarioService.update(req.user.userId, dto);
    }

    @Delete(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Eliminar un usuario por ID (solo administradores)' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.remove(id);
    }

    @Get()
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Listar todos los usuarios (solo administradores)' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    findAll() {
        return this.usuarioService.findAll();
    }

    @Get(':id')
    @Roles(RolUsuario.ADMIN)
    @ApiOperation({ summary: 'Obtener un usuario por ID (solo administradores)' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Detalle del usuario' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usuarioService.findOne(id);
    }
}