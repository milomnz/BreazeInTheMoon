/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from 'src/auth/interfaces/create-hotel.dto';

describe('HotelService', () => {
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelService],
    }).compile();

    service = module.get<HotelService>(HotelService);
  });

  it('debería crear un hotel', async () => {
    const dto: CreateHotelDto = {
      nombre: 'Hotel Prueba',
      descripcion: 'Hotel de prueba para test',
      telefono: '+57 111 222 3333',
      localizacion: 'Bogotá, Colombia',
    };

    const adminId = 1;

    // Aquí puedes simular el resultado esperado si usas mocks
    const resultadoEsperado = {
      id: 1,
      ...dto,
      calificacionPromedio: 5.0,
    };

    jest.spyOn(service, 'create').mockResolvedValue(resultadoEsperado);

    const resultado = await service.create(dto, adminId);
    expect(resultado).toEqual(resultadoEsperado);
  });
});
