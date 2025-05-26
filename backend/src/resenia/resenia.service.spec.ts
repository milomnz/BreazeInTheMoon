/* eslint-disable prettier/prettier */
// resenia.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReseniaService } from './resenia.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resenia } from 'src/entities/resenia.entity';
import { Repository } from 'typeorm';
import { Hotel } from 'src/entities/hotel.entity';

describe('ReseniaService', () => {
  let service: ReseniaService;
  let repo: Repository<Resenia>;
  let hotelRepo: Repository<Hotel>;

  const mockHotel = {
    id: 1,
    nombre: 'Hotel Luna',
    calificacionPromedio: 5.0,
    resenias: [],
    save: jest.fn(),
  };

  const mockResenia = {
    id: 1,
    comentario: 'Muy bueno',
    calificacion: 5,
    hotel: mockHotel,
    cliente: { id: 1 },
  };

  const reseniaArray = [mockResenia];

  const reseniaRepoMock = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockResenia),
    find: jest.fn().mockResolvedValue(reseniaArray),
    findOne: jest.fn().mockResolvedValue(mockResenia),
    update: jest.fn().mockResolvedValue(undefined),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  const hotelRepoMock = {
    findOne: jest.fn().mockResolvedValue(mockHotel),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReseniaService,
        {
          provide: getRepositoryToken(Resenia),
          useValue: reseniaRepoMock,
        },
        {
          provide: getRepositoryToken(Hotel),
          useValue: hotelRepoMock,
        },
      ],
    }).compile();

    service = module.get<ReseniaService>(ReseniaService);
    repo = module.get<Repository<Resenia>>(getRepositoryToken(Resenia));
    hotelRepo = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  it('should create a resenia and update hotel rating', async () => {
    const dto = { comentario: 'Excelente', calificacion: 5, hotelId: 1 };
    const cliente = { id: 1 };

    const result = await service.create(dto as any, cliente);
    expect(result).toEqual(mockResenia);
    expect(repo.save).toHaveBeenCalled();
    expect(hotelRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['resenias'] });
  });

  it('should return all resenias', async () => {
    expect(await service.findAll()).toEqual(reseniaArray);
  });

  it('should return one resenia', async () => {
    expect(await service.findOne(1)).toEqual(mockResenia);
  });

  it('should update a resenia', async () => {
    await service.update(1, { comentario: 'Actualizado' } as any);
    expect(repo.update).toHaveBeenCalledWith(1, { comentario: 'Actualizado' });
  });

  it('should delete a resenia', async () => {
    await service.remove(1);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repo.remove).toHaveBeenCalledWith(mockResenia);
  });
});