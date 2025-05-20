/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from 'src/entities/promocion.entity';
import { CreatePromocionDto } from 'src/auth/interfaces/create-promocion.dto';
import { UpdatePromocionDto } from 'src/auth/interfaces/update-promocion.dto';
import { Hotel } from 'src/entities/hotel.entity';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepository: Repository<Promocion>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(dto: CreatePromocionDto): Promise<Promocion> {
    const hotel = await this.hotelRepository.findOne({ where: { id: dto.hotelId } });
    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }

    const promocion = this.promocionRepository.create({
      ...dto,
      hotel,
    });
    return this.promocionRepository.save(promocion);
  }

  async findAll(): Promise<Promocion[]> {
    return this.promocionRepository.find({ relations: ['hotel'] });
  }

  async findOne(id: number): Promise<Promocion> {
    const promocion = await this.promocionRepository.findOne({ where: { id }, relations: ['hotel'] });
    if (!promocion) {
      throw new NotFoundException('Promoción no encontrada');
    }
    return promocion;
  }

  async update(id: number, dto: UpdatePromocionDto): Promise<Promocion> {
    const promocion = await this.findOne(id);
    Object.assign(promocion, dto);
    return this.promocionRepository.save(promocion);
  }

  async delete(id: number): Promise<void> {
    const promocion = await this.findOne(id);
    await this.promocionRepository.remove(promocion);
  }

  async activar(id: number): Promise<Promocion> {
    const promocion = await this.findOne(id);
    promocion.activar();
    return this.promocionRepository.save(promocion);
  }

  async desactivar(id: number): Promise<Promocion> {
    const promocion = await this.findOne(id);
    promocion.desactivar();
    return this.promocionRepository.save(promocion);
  }

  async calcularDescuento(id: number, monto: number): Promise<number> {
    const promocion = await this.findOne(id);
    return promocion.calcularDescuento(monto);
  }

  async esValida(id: number): Promise<boolean> {
    const promocion = await this.findOne(id);
    return promocion.esValida();
  }
}