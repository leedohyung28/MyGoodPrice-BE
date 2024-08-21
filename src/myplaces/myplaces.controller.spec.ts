import { Test, TestingModule } from '@nestjs/testing';
import { MyplacesController } from './myplaces.controller';

describe('MyplacesController', () => {
  let controller: MyplacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyplacesController],
    }).compile();

    controller = module.get<MyplacesController>(MyplacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
