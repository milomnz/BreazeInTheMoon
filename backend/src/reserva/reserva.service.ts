/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { CreateReservaDto } from 'src/auth/interfaces/create-reserva.dto';
import { UpdateReservaDto } from 'src/auth/interfaces/update-reserva.dto';
import { Cliente } from 'src/entities/cliente.entity';
import { Habitacion } from 'src/entities/habitacion.entity';
import { EstadoReserva } from 'src/constants/estado-reserva.enum';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Habitacion)
    private habitacionRepository: Repository<Habitacion>,
  ) { }

  private async validarDisponibilidad(
    habitacionId: number,
    fechaInicio: Date,
    fechaFin: Date,
    ignorarReservaId?: number, // <- cuarto parámetro opcional
  ): Promise<void> {
    const reservasExistentes = await this.reservaRepository.find({
      where: {
        habitacion: { id: habitacionId },
        estado: EstadoReserva.CONFIRMADA,
      },
      relations: ['habitacion'],
    });

    const conflicto = reservasExistentes.some((reserva) => {
      if (ignorarReservaId && reserva.id === ignorarReservaId) {
        return false; // Ignorar la misma reserva
      }

      const inicioExistente = new Date(reserva.fechaInicio);
      const finExistente = new Date(reserva.fechaFin);

      return (
        (fechaInicio < finExistente && fechaFin > inicioExistente)
      );
    });

    if (conflicto) {
      throw new BadRequestException(
        'La habitación no está disponible en las fechas seleccionadas',
      );
    }
  }

  async create(dto: CreateReservaDto) {
    const clienteEntidad = await this.clienteRepository.findOne({
      where: { id: dto.clienteId },
    });

    const habitacionEntidad = await this.habitacionRepository.findOne({
      where: { id: dto.habitacionId },
    });

    if (!clienteEntidad || !habitacionEntidad) {
      throw new NotFoundException('Cliente o habitación no encontrados');
    }

    const fechaInicio = new Date(dto.fechaInicio);
    const fechaFin = new Date(dto.fechaFin);

    const diffMs = fechaFin.getTime() - fechaInicio.getTime();
    const numeroNoches = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (numeroNoches <= 0) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    // Validar disponibilidad en creación (incluso si queda como PENDIENTE)
    await this.validarDisponibilidad(habitacionEntidad.id, fechaInicio, fechaFin);

    const costoTotal = habitacionEntidad.precio * numeroNoches;

    const reserva = this.reservaRepository.create({
      cliente: clienteEntidad,
      habitacion: habitacionEntidad,
      fechaInicio,
      fechaFin,
      numeroNoches,
      costoTotal,
      fechaCreacion: new Date(),
      estado: EstadoReserva.PENDIENTE,
    });
    return this.reservaRepository.save(reserva);
  }

  async update(id: number, dto: UpdateReservaDto) {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['habitacion'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    // Validación de cambios de estado
    if (dto.estado) {
      const estadoActual = reserva.estado;
      const nuevoEstado = dto.estado;

      if (nuevoEstado === EstadoReserva.RECHAZADA && estadoActual !== EstadoReserva.PENDIENTE) {
        throw new BadRequestException('Solo se puede rechazar una reserva que está pendiente');
      }

      if (nuevoEstado === EstadoReserva.CANCELADA && estadoActual !== EstadoReserva.CONFIRMADA) {
        throw new BadRequestException('Solo se puede cancelar una reserva que está confirmada');
      }

      if (nuevoEstado === EstadoReserva.CONFIRMADA) {
        // Validar disponibilidad solo al confirmar
        try {
          await this.validarDisponibilidad(
            reserva.habitacion.id,
            dto.fechaInicio ? new Date(dto.fechaInicio) : reserva.fechaInicio,
            dto.fechaFin ? new Date(dto.fechaFin) : reserva.fechaFin,
            id,
          );
        } catch {
          if (estadoActual === EstadoReserva.PENDIENTE) {
            reserva.estado = EstadoReserva.RECHAZADA;
            await this.reservaRepository.save(reserva);
            throw new BadRequestException('La habitación no está disponible, la reserva pendiente fue rechazada');
          } else {
            throw new BadRequestException('La habitación no está disponible para la confirmación');
          }
        }
      }
    }
    Object.assign(reserva, dto);
    return this.reservaRepository.save(reserva);
  }

  findAll() {
    return this.reservaRepository.find({
      relations: ['cliente', 'habitacion'],
      order: {
        estado: 'ASC',
        fechaInicio: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.reservaRepository.findOne({
      where: { id },
      relations: ['cliente', 'habitacion'],
    });
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (reserva.estado !== EstadoReserva.CANCELADA && reserva.estado !== EstadoReserva.RECHAZADA) {
      throw new BadRequestException('Solo se pueden eliminar reservas que estén canceladas o rechazadas');
    }
    await this.reservaRepository.delete(id);
  }
}