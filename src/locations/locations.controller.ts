import { 
  Controller,
  Get,
  Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { StoreReturnDTO } from 'src/stores/stores.DTO';
import { GetStoresByDistanceDTO } from './query.DTO';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Get()
  async getStoresByDistance(
    @Query() query : GetStoresByDistanceDTO
  ) :Promise<StoreReturnDTO[]> {
    return await this.locationService.findInsideStores(query)
  }
}
