import { Test, TestingModule } from '@nestjs/testing';
import { MyplacesService } from './myplaces.service';

describe('MyplacesService', () => {
  let service: MyplacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyplacesService],
    }).compile();

    service = module.get<MyplacesService>(MyplacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
