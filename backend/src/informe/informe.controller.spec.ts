import { Test, TestingModule } from '@nestjs/testing';
import { InformeController } from './informe.controller';

describe('InformeController', () => {
  let controller: InformeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformeController],
    }).compile();

    controller = module.get<InformeController>(InformeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
