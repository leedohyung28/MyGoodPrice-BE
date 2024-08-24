import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { StoresService } from 'src/stores/stores.service';
import { StoreReturnDTO } from 'src/stores/stores.DTO';
import { GetStoresByDistanceDTO } from './query.DTO';
import { LocationReturnDTO } from './locations.DTO';

@Injectable()
export class LocationsService {
  constructor(private readonly StoresService: StoresService) {}
  
  async findInsideStores(
    queryParams: GetStoresByDistanceDTO,
  ): Promise<LocationReturnDTO[]> {
    const { longitude, latitude, distance } = queryParams;
    const stores = await this.StoresService.getStoresByDistance(
      longitude,
      latitude,
      distance,
    );

    return plainToInstance(LocationReturnDTO, stores);
  }
}
