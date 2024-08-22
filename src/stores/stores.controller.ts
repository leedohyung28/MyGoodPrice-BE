import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoreReturnDTO, StoresReturnDTO } from './stores.DTO';
import { GetStoresQueryDTO } from './query.DTO';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get(':storeId')
  async getStore(
    @Param('storeId') storeId: string,
  ): Promise<StoreReturnDTO> {
    return await this.storeService.getStoreById(storeId);
  }
 
  @Get()
  async getStores(
    @Query() query: GetStoresQueryDTO
  ): Promise<StoresReturnDTO[] | void> {
      return await this.storeService.getStoresBy(query);
    } 
}
