/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from 'src/entities/cliente.entity';
import { Repository } from 'typeorm';

describe('ClienteService', () => {
  let service: ClienteService;
  let repo: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repo = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});