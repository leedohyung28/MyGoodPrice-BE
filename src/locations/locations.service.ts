import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DistanceStoresDTO, LocationReturnDTO } from './locations.DTO';
import { StoresService } from 'src/stores/stores.service';
import { StoreReturnDTO } from 'src/stores/stores.DTO';

@Injectable()
export class LocationsService {
    constructor(private readonly StoresService: StoresService) {}

  async findLocation(storeId:string): Promise<LocationReturnDTO> {
    const location = await this.StoresService.getLocationById(storeId)
    return plainToInstance(LocationReturnDTO, location);
  }

  async findInsideStores(longitude,latitude,distance): Promise<StoreReturnDTO[]> {
    const stores = await this.StoresService.getStoresByDistance(longitude,latitude,distance)
    return plainToInstance(StoreReturnDTO, stores)
  }
}
