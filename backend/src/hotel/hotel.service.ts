/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from 'src/entities/hotel.entity';
import { CreateHotelDto } from 'src/auth/interfaces/create-hotel.dto';
import { UpdateHotelDto } from 'src/auth/interfaces/update-hotel.dto';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
    ) { }

    async create(dto: CreateHotelDto, adminId: number): Promise<Hotel> {
        const nombreExistente = await this.hotelRepository.findOne({ where: { nombre: dto.nombre } });
        if (nombreExistente) {
            throw new ConflictException(`Ya existe un hotel con el nombre '${dto.nombre}'`);
        }

        const telefonoExistente = await this.hotelRepository.findOne({ where: { telefono: dto.telefono } });
        if (telefonoExistente) {
            throw new ConflictException(`Ya existe un hotel con el teléfono '${dto.telefono}'`);
        }

        const hotel = this.hotelRepository.create({
            ...dto,
            administrador: { id: adminId },
            calificacionPromedio: 5.0, // default
        });
        return this.hotelRepository.save(hotel);
    }

    async update(id: number, dto: UpdateHotelDto): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: { id } });
        if (!hotel) {
            throw new NotFoundException(`Hotel con id ${id} no encontrado`);
        }

        if (dto.nombre && dto.nombre !== hotel.nombre) {
            const nombreExistente = await this.hotelRepository.findOne({ where: { nombre: dto.nombre } });
            if (nombreExistente) {
                throw new ConflictException(`Ya existe un hotel con el nombre '${dto.nombre}'`);
            }
        }

        if (dto.telefono && dto.telefono !== hotel.telefono) {
            const telefonoExistente = await this.hotelRepository.findOne({ where: { telefono: dto.telefono } });
            if (telefonoExistente) {
                throw new ConflictException(`Ya existe un hotel con el teléfono '${dto.telefono}'`);
            }
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

    async remove(id: number): Promise<void> {
        const hotel = await this.hotelRepository.findOne({
            where: { id },
            relations: ['habitaciones', 'habitaciones.reservas'],
        });
        if (!hotel) {
            throw new NotFoundException(`Hotel con id ${id} no encontrado`);
        }

        const tieneReservasActivas = hotel.habitaciones.some(habitacion =>
            habitacion.reservas.some(reserva =>
                ['CONFIRMADA', 'PENDIENTE'].includes(reserva.estado),
            ),
        );

        if (tieneReservasActivas) {
            throw new BadRequestException(
                'No se puede eliminar el hotel porque tiene reservas activas',
            );
        }
        await this.hotelRepository.delete(id);
    }

    async findByAdminId(adminId: number): Promise<Hotel | null> {
        return this.hotelRepository.findOne({ where: { administrador: { id: adminId } } });
    }

    async findAllWithPromedios(): Promise<Hotel[]> {
        const hoteles = await this.hotelRepository.find({
            relations: ['resenias'],
        });

        return hoteles.map((hotel) => {
            if (!hotel.resenias || hotel.resenias.length === 0) {
                hotel.calificacionPromedio = 5.0;
            } else {
                const total = hotel.resenias.reduce((acc, r) => acc + r.calificacion, 0);
                hotel.calificacionPromedio = parseFloat((total / hotel.resenias.length).toFixed(2));
            }
            return hotel;
        });
    }

    async actualizarCalificacionPromedio(hotelId: number): Promise<void> {
        const hotel = await this.hotelRepository.findOne({
            where: { id: hotelId },
            relations: ['resenias'],
        });

        if (!hotel) return;

        if (!hotel.resenias || hotel.resenias.length === 0) {
            hotel.calificacionPromedio = 5.0;
        } else {
            const total = hotel.resenias.reduce((acc, r) => acc + r.calificacion, 0);
            hotel.calificacionPromedio = parseFloat((total / hotel.resenias.length).toFixed(2));
        }

        await this.hotelRepository.save(hotel);
    }
}