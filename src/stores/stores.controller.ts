import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Stores } from './stores.schema';
import { StoreReturnDTO } from './strores.DTO';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get(':storeName')
  async getStoreName(@Param('storeName') storeName: string): Promise<StoreReturnDTO> {
    return (await this.storeService.getStoresByName(storeName));
  }

  @Get()
  @HttpCode(200)
  async getStores(
      @Query('category') category?: string,
      @Query('city') city?: string,
      @Query('name') name?: string,
      @Query('lowPrice') lowPrice?: number,
      @Query('highPrice') highPrice?: number
    ): Promise<StoreReturnDTO[]> {

      return await this.storeService.getStoresBy(category, city, name,lowPrice, highPrice);    
}

  
}
