import { Controller, Get } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get()
  async findAll() {
    return this.storeService.findAll();
  }
}
