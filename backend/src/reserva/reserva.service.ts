/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { CreateReservaDto } from 'src/auth/interfaces/create-reserva.dto';
import { UpdateReservaDto } from 'src/auth/interfaces/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) { }

  async create(dto: CreateReservaDto): Promise<Reserva> {
    const reserva = this.reservaRepository.create({
      cliente: { id: dto.clienteId },
      habitacion: { id: dto.habitacionId },
      fechaEntrada: new Date(dto.fechaInicio),
      fechaSalida: new Date(dto.fechaFin),
      montoTotal: 0, // o el cálculo que necesites
      estado: 'PENDIENTE', // o lo que definas por defecto
    });

    return this.reservaRepository.save(reserva);
  }

  findAll() {
    return this.reservaRepository.find();
  }

  findOne(id: number) {
    return this.reservaRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateReservaDto) {
    return this.reservaRepository.update(id, dto);
  }

  remove(id: number) {
    return this.reservaRepository.delete(id);
  }
}