import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Stores } from './stores.schema';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get(':storeName')
  async getStoreName(@Param('storeName') storeName: string): Promise<Stores> {
    return this.storeService.getStoresByName(storeName);
  }

  @Get()
  async getStores(): Promise<Stores[]> {
    return this.storeService.getStores();
  }
}
