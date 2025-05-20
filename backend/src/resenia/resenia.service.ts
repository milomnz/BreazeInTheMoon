/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resenia } from 'src/entities/resenia.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Hotel } from 'src/entities/hotel.entity';
import { CreateReseniaDto } from 'src/auth/interfaces/create-resenia.dto';
import { UpdateReseniaDto } from 'src/auth/interfaces/update-resenia.dto';
import { HotelService } from 'src/hotel/hotel.service';

@Injectable()
export class ReseniaService {
  constructor(
    @InjectRepository(Resenia)
    private readonly reseniaRepository: Repository<Resenia>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,

    private readonly hotelService: HotelService,
  ) {}

  async create(dto: CreateReseniaDto): Promise<Resenia> {
    const cliente = await this.clienteRepository.findOne({ where: { id: dto.clienteId } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const hotel = await this.hotelRepository.findOne({ where: { id: dto.hotelId } });
    if (!hotel) throw new NotFoundException('Hotel no encontrado');

    const resenia = this.reseniaRepository.create({
      ...dto,
      cliente,
      hotel,
    });

    const saved = await this.reseniaRepository.save(resenia);
    await this.hotelService.actualizarCalificacionPromedio(hotel.id);
    return saved;
  }

  async findAll(): Promise<Resenia[]> {
    return this.reseniaRepository.find({ relations: ['cliente', 'hotel'] });
  }

  async findOne(id: number): Promise<Resenia> {
    const resenia = await this.reseniaRepository.findOne({
      where: { id },
      relations: ['cliente', 'hotel'],
    });
    if (!resenia) throw new NotFoundException('Reseña no encontrada');
    return resenia;
  }

  async findByHotelId(hotelId: number): Promise<Resenia[]> {
    return this.reseniaRepository.find({
      where: { hotel: { id: hotelId } },
      relations: ['cliente', 'hotel'],
    });
  }

  async update(id: number, dto: UpdateReseniaDto): Promise<Resenia> {
    const resenia = await this.reseniaRepository.findOne({ where: { id }, relations: ['cliente', 'hotel'] });
    if (!resenia) throw new NotFoundException('Reseña no encontrada');

    if (resenia.cliente.id !== dto.clienteId) {
      throw new ForbiddenException('No tienes permiso para modificar esta reseña');
    }

    Object.assign(resenia, dto);
    const saved = await this.reseniaRepository.save(resenia);
    await this.hotelService.actualizarCalificacionPromedio(resenia.hotel.id);
    return saved;
  }

  async remove(id: number, clienteId: number): Promise<void> {
    const resenia = await this.reseniaRepository.findOne({ where: { id }, relations: ['cliente', 'hotel'] });
    if (!resenia) throw new NotFoundException('Reseña no encontrada');

    if (resenia.cliente.id !== clienteId) {
      throw new ForbiddenException('No tienes permiso para eliminar esta reseña');
    }

    await this.reseniaRepository.remove(resenia);
    await this.hotelService.actualizarCalificacionPromedio(resenia.hotel.id);
  }
}