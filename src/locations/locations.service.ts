import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StoresService } from 'src/stores/stores.service';
import { GetStoresByDistanceDTO } from './query.DTO';
import { DistanceStoresDTO } from './locations.DTO';

@Injectable()
export class LocationsService {
  constructor(private readonly StoresService: StoresService) {}
  
  async findInsideStores(
    queryParams: GetStoresByDistanceDTO,
  ): Promise<DistanceStoresDTO[]> {
    const { longitude, latitude, distance } = queryParams;
    const stores = await this.StoresService.getStoresByDistance(
      longitude,
      latitude,
      distance,
    );

    return plainToInstance(DistanceStoresDTO, stores);
  }
}
