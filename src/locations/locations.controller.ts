import { Body, Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationReturnDTO } from './locations.DTO';
import { StoreReturnDTO } from 'src/stores/stores.DTO';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Get(':storeId')
  @HttpCode(200)
  async getLocation(
      @Param('storeId') storeId: string
  ): Promise<LocationReturnDTO> {
      return await this.locationService.findLocation(storeId);
    }

  @Get()
  async getStoresByDistance(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('distance') distance : number,
  ) :Promise<StoreReturnDTO[]> {
    return await this.locationService.findInsideStores(longitude,latitude,distance)
  }
  
}
