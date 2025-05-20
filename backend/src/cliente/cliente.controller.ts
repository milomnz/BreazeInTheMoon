/* eslint-disable prettier/prettier */
import { 
  Controller, Get, Put, Param, Body, UseGuards, Request as Req, Delete, NotFoundException 
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolUsuario } from 'src/constants/rol-usuario.enum';
import { ClienteService } from './cliente.service';
import { UpdateClienteDto } from 'src/auth/interfaces/update-cliente.dto';
import { Cliente } from 'src/entities/cliente.entity';

@ApiTags('Clientes')
@ApiBearerAuth()
@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) { }

  @Get(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Obtener cliente por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: Cliente })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(id);
  }

  @Get('me')
  @Roles(RolUsuario.CLIENTE)
  @ApiOperation({ summary: 'Obtener perfil propio del cliente autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del cliente', type: Cliente })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async getMyProfile(@Req() req) {
    const cliente = await this.clienteService.findOne(req.user.userId);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  @Put(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Actualizar cliente por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cliente a actualizar' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente' })
  update(@Param('id') id: number, @Body() dto: UpdateClienteDto) {
    return this.clienteService.update(id, dto);
  }

  @Put('me')
  @Roles(RolUsuario.CLIENTE)
  @ApiOperation({ summary: 'Actualizar perfil propio del cliente autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async updateMyProfile(@Req() req, @Body() dto: UpdateClienteDto) {
    const cliente = await this.clienteService.findOne(req.user.userId);
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    await this.clienteService.update(req.user.userId, dto);
    return { message: 'Perfil actualizado correctamente' };
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Eliminar cliente por ID (solo admin)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del cliente a eliminar' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente' })
  remove(@Param('id') id: number) {
    return this.clienteService.remove(id);
  }

  @Get()
  @Roles(RolUsuario.ADMIN)
  @ApiOperation({ summary: 'Listar todos los clientes (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [Cliente] })
  findAll() {
    return this.clienteService.findAll();
  }
}