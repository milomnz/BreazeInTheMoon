/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Informe } from 'src/entities/informe.entity';
import { CreateInformeDto } from 'src/auth/interfaces/create-informes.dto';
import { UpdateInformeDto } from 'src/auth/interfaces/update-informes.dto';
import { Hotel } from 'src/entities/hotel.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { RolUsuario } from 'src/constants/rol-usuario.enum';

@Injectable()
export class InformeService {
    constructor(
        @InjectRepository(Informe)
        private informeRepository: Repository<Informe>,
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) { }

    async create(dto: CreateInformeDto): Promise<Informe> {
        const hotel = await this.hotelRepository.findOne({ where: { id: dto.hotelId } });
        if (!hotel) {
            throw new NotFoundException('Hotel no encontrado');
        }
        const admin = await this.usuarioRepository.findOne({ where: { id: dto.administradorId, rol: RolUsuario.ADMIN } });

        if (!admin) {
            throw new NotFoundException('Administrador no encontrado');
        }
        const informe = this.informeRepository.create({
            fechaGeneracion: new Date(),
            fechaInicio: dto.fechaInicio,
            fechaFin: dto.fechaFin,
            contenido: dto.contenido,
            tipo: dto.tipo,
            hotel: hotel,
            administrador: admin,
        });
        return this.informeRepository.save(informe);
    }

    async findAll(): Promise<Informe[]> {
        return this.informeRepository.find({ relations: ['hotel', 'administrador'] });
    }

    async findOne(id: number): Promise<Informe> {
        const informe = await this.informeRepository.findOne({ where: { id }, relations: ['hotel', 'administrador'] });
        if (!informe) {
            throw new NotFoundException('Informe no encontrado');
        }
        return informe;
    }

    async update(id: number, dto: UpdateInformeDto): Promise<Informe> {
        const informe = await this.findOne(id);
        if (dto.hotelId) {
            const hotel = await this.hotelRepository.findOne({ where: { id: dto.hotelId } });
            if (!hotel) {
                throw new NotFoundException('Hotel no encontrado');
            }
            informe.hotel = hotel;
        }

        if (dto.administradorId) {
            const admin = await this.usuarioRepository.findOne({ where: { id: dto.administradorId, rol: RolUsuario.ADMIN } });
            if (!admin) {
                throw new NotFoundException('Administrador no encontrado');
            }
            informe.administrador = admin;
        }
        Object.assign(informe, dto);
        return this.informeRepository.save(informe);
    }

    async remove(id: number): Promise<void> {
        const informe = await this.findOne(id);
        await this.informeRepository.remove(informe);
    }
}
