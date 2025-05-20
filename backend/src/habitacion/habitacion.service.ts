/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from 'src/entities/habitacion.entity';
import { CreateHabitacionDto } from 'src/auth/interfaces/create-habitacion.dto';
import { Hotel } from 'src/entities/hotel.entity';
import { UpdateHabitacionDto } from 'src/auth/interfaces/update-habitacion.dto';
import { EstadoReserva } from 'src/constants/estado-reserva.enum';

@Injectable()
export class HabitacionService {
    constructor(
        @InjectRepository(Habitacion)
        private habitacionRepository: Repository<Habitacion>,

        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>
    ) { }

    async create(dto: CreateHabitacionDto): Promise<Habitacion> {
        const hotel = await this.hotelRepository.findOne({ where: { id: dto.hotelId } });
        if (!hotel) {
            throw new NotFoundException(`Hotel con ID ${dto.hotelId} no encontrado`);
        }

        const existente = await this.habitacionRepository.findOne({
            where: {
                numeroHabitacion: dto.numeroHabitacion,
                hotel: { id: dto.hotelId },
            },
            relations: ['hotel'],
        });

        if (existente) {
            throw new ConflictException(
                `Ya existe una habitación con número ${dto.numeroHabitacion} en este hotel`,
            );
        }

        const habitacion = this.habitacionRepository.create({
            numeroHabitacion: dto.numeroHabitacion,
            tipoHabitacion: dto.tipoHabitacion,
            descripcion: dto.descripcion,
            capacidad: dto.capacidad,
            precio: dto.precio,
            hotel: hotel,
        });

        return this.habitacionRepository.save(habitacion);
    }

    async verificarDisponibilidad(id: number, rango: { inicio: Date; fin: Date }): Promise<boolean> {
        const habitacion = await this.habitacionRepository.findOne({
            where: { id },
            relations: ['reservas'],
        });

        if (!habitacion) {
            throw new NotFoundException(`Habitación con id ${id} no encontrada`);
        }

        const ahora = new Date();
        if (habitacion.bloqueadaHasta && habitacion.bloqueadaHasta > ahora) {
            return false;
        }

        const hayConflicto = habitacion.reservas.some(reserva => {
            return (
                reserva.estado === EstadoReserva.CONFIRMADA &&
                rango.inicio < reserva.fechaFin &&
                rango.fin > reserva.fechaInicio
            );
        });
        return !hayConflicto;
    }

    async bloqueoTemporal(id: number, minutos: number): Promise<boolean> {
        const habitacion = await this.habitacionRepository.findOne({ where: { id } });

        if (!habitacion) {
            throw new NotFoundException(`Habitación con id ${id} no encontrada`);
        }

        const ahora = new Date();
        const bloqueo = new Date(ahora.getTime() + minutos * 60000);

        habitacion.bloqueadaHasta = bloqueo;
        await this.habitacionRepository.save(habitacion);

        return true;
    }

    async liberarBloqueo(id: number): Promise<boolean> {
        const habitacion = await this.habitacionRepository.findOne({ where: { id } });

        if (!habitacion) {
            throw new NotFoundException(`Habitación con id ${id} no encontrada`);
        }
        habitacion.bloqueadaHasta = null;
        await this.habitacionRepository.save(habitacion);
        return true;
    }

    async findAll(): Promise<Habitacion[]> {
        return this.habitacionRepository.find({ relations: ['hotel'] });
    }

    async findOne(id: number): Promise<Habitacion> {
        const habitacion = await this.habitacionRepository.findOne({
            where: { id },
            relations: ['hotel'],
        });
        if (!habitacion) {
            throw new NotFoundException('Habitación no encontrada');
        }
        return habitacion;
    }

    findByHotel(hotelId: number) {
        return this.habitacionRepository.find({
            where: { hotel: { id: hotelId } },
            relations: ['hotel'],
        });
    }

    async update(id: number, dto: UpdateHabitacionDto): Promise<Habitacion> {
        const habitacion = await this.habitacionRepository.findOne({ where: { id } });
        if (!habitacion) {
            throw new NotFoundException(`Habitación con id ${id} no encontrada`);
        }
        Object.assign(habitacion, dto);
        return this.habitacionRepository.save(habitacion);
    }

    async remove(id: number): Promise<void> {
        const habitacion = await this.habitacionRepository.findOne({
            where: { id },
            relations: ['reservas'],
        });
        if (!habitacion) {
            throw new NotFoundException('Habitación no encontrada');
        }
        const tieneReservasActivas = habitacion.reservas.some(reserva => reserva.estado === EstadoReserva.CONFIRMADA);
        if (tieneReservasActivas) {
            throw new BadRequestException('No se puede eliminar la habitación porque tiene reservas activas');
        }
        await this.habitacionRepository.delete(id);
    }
}