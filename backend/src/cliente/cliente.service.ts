/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { CreateClienteDto } from 'src/auth/interfaces/create-cliente.dto';
import { UpdateClienteDto } from 'src/auth/interfaces/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOne({ where: { id } });
  }

  update(id: number, dto: UpdateClienteDto) {
    return this.clienteRepository.update(id, dto);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
