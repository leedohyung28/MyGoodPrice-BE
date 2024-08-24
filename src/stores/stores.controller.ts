import {
  BadRequestException,
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
    let {page} = query
    let page_new = parseInt(page)
    if (page !== "null" && page_new < 1) {
      throw new BadRequestException('Page number must be greater than or equal to 1.');
    }
      return await this.storeService.getStoresBy(query);
    } 
}
