/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from './reserva.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { Repository } from 'typeorm';

describe('ReservaService', () => {
  let service: ReservaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservaService,
        {
          provide: getRepositoryToken(Reserva),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReservaService>(ReservaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});