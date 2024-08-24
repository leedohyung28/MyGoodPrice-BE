import { 
  Controller,
  Get,
  Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { GetStoresByDistanceDTO } from './query.DTO';
import { DistanceStoresDTO } from './locations.DTO';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Get()
  async getStoresByDistance(
    @Query() query : GetStoresByDistanceDTO
  ) :Promise<DistanceStoresDTO[]> {
    return await this.locationService.findInsideStores(query)
  }
}
