import { Test, TestingModule } from '@nestjs/testing';
import { ReseniaController } from './resenia.controller';

describe('ReseniaController', () => {
  let controller: ReseniaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReseniaController],
    }).compile();

    controller = module.get<ReseniaController>(ReseniaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
