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

  async validatePage(page: number, limit: number) {
    const totalPages = Math.ceil(8007 / limit);
    if (page > totalPages) {
      throw new BadRequestException('페이지의 끝을 넘었습니다.');
    }
  }

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
      const {page, limit} = query
      if(page !== "null" && limit !== "null"){
        await this.validatePage(page,limit)
      }

      return await this.storeService.getStoresBy(query);
    } 
}
