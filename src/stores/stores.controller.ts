import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { Stores } from './stores.schema';
import { StoreReturnDTO, StoresReturnDTO } from './strores.DTO';
import { ObjectId } from 'typeorm';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get(':storeId')
  async getStoreName(
    @Param('storeId') storeId: string,
  ): Promise<StoreReturnDTO> {
    return await this.storeService.getStoreById(storeId);
  }

  @Get()
  @HttpCode(200)
  async getStores(
    @Query('category') category?: string,
    @Query('city') city?: string,
    @Query('name') name?: string,
    @Query('lowPrice') lowPrice?: number,
    @Query('highPrice') highPrice?: number,
  ): Promise<StoresReturnDTO[]> {
    return await this.storeService.getStoresBy(
      category,
      city,
      name,
      lowPrice,
      highPrice,
    );
  }
}
