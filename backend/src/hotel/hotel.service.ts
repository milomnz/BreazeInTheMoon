/* eslint-disable prettier/prettier */
import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from '../entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelService {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
    ) { }
    // métodos de negocio...

    @Get()
    async findAll(): Promise<Hotel[]> {
        return this.hotelRepository.find();
    }


}
