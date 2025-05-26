/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/auth/interfaces/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/auth/interfaces/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

<<<<<<< HEAD
  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(dto);
    nuevoUsuario.contrasenaEncriptada = dto.contrasena; 
    
    return this.usuarioRepository.save(nuevoUsuario);
=======
  async create(data: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(nuevoUsuario);
>>>>>>> 8ed68d0 (Ultimísimo commit.)
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    if (dto.contrasena) {
      const saltRounds = 10;
      dto.contrasena = await bcrypt.hash(dto.contrasena, saltRounds);
    }
    Object.assign(usuario, dto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    await this.usuarioRepository.delete(id);
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { correo } });
  }
}