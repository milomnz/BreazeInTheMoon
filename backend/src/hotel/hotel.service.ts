/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { UpdateHotelDto } from 'src/auth/interfaces/update-hotel.dto';
import { Resenia } from 'src/entities/resenia.entity';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
    ) { }

    async update(id: number, dto: UpdateHotelDto, adminId: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: { id }, relations: ['administrador'] });
        if ('calificacionPromedio' in dto || 'fechaCreacion' in dto) {
            throw new BadRequestException('No puedes modificar campos de solo lectura');
        }
        if (!hotel) throw new NotFoundException(`Hotel con id ${id} no encontrado`);

        if (hotel.administrador.id !== adminId) {
            throw new BadRequestException('No tienes permiso para editar este hotel');
        }
        Object.assign(hotel, dto);
        return this.hotelRepository.save(hotel);
    }

    findAll(): Promise<Hotel[]> {
        return this.hotelRepository.find();
    }

    findOne(id: number): Promise<Hotel | null> {
        return this.hotelRepository.findOne({ where: { id } });
    }

    async findByAdminId(adminId: number): Promise<Hotel | null> {
        return this.hotelRepository.findOne({
            where: { administrador: { id: adminId } },
            relations: ['administrador'],
        });
    }

    async findAllWithPromedios(): Promise<Hotel[]> {
        const hoteles = await this.hotelRepository.find({ relations: ['resenias'] });
        return hoteles.map((hotel) => {
            hotel.calificacionPromedio = this.calcularPromedio(hotel.resenias);
            return hotel;
        });
    }

    async actualizarCalificacionPromedio(hotelId: number): Promise<void> {
        const hotel = await this.hotelRepository.findOne({
            where: { id: hotelId },
            relations: ['resenias'],
        });

        if (!hotel) return;

        hotel.calificacionPromedio = this.calcularPromedio(hotel.resenias);
        await this.hotelRepository.save(hotel);
    }

    private calcularPromedio(resenias: Resenia[] | null): number {
        if (!resenias || resenias.length === 0) return 5.0;
        const total = resenias.reduce((acc, r) => acc + r.calificacion, 0);
        return parseFloat((total / resenias.length).toFixed(2));
    }
}