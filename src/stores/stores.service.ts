import { Injectable, Response } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { plainToInstance } from 'class-transformer';
import { StoreReturnDTO, StoresReturnDTO } from './stores.DTO';
import { DistanceStoresDTO} from 'src/locations/locations.DTO';
import { GetStoresQueryDTO } from './query.DTO';
import { getDistance } from 'src/common/utils/distance';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  // async getAllStoresBy(store_list):Promise<StoresReturnDTO[]> {
  //   const filter_store = { _id: {$in : store_list} }
  //   const stores = await this.storesRepository.find(filter_store)
  //   return plainToInstance(StoresReturnDTO, stores);
  // }

  async getStoreById(id: string): Promise<StoreReturnDTO> {
    const store = await this.storesRepository.findById(id);
    return plainToInstance(StoreReturnDTO, store);
  }

  async getStoresByDistance(longitude: string,latitude: string,distance:number)  {
    const n_longitude = parseFloat(longitude)
    const n_latitude = parseFloat(latitude)
    const query = {
      longitude: { $lte: n_longitude + 0.2, $gte: n_longitude - 0.2 },
      latitude: { $lte: n_latitude + 0.2, $gte: n_latitude - 0.2}
    };
    const results = await this.storesRepository.find(query);
    const stores = plainToInstance(DistanceStoresDTO, results)
    console.log(n_latitude, n_longitude)

    const getStores = stores.filter((store)=>{
      const dis = getDistance(n_latitude, n_longitude, store.latitude,store.longitude)
        return dis <= distance
    })
    return getStores;

  }
  
  async getStoresBy(queryParams: GetStoresQueryDTO): Promise<StoresReturnDTO[]> {
    const {
      category,
      location,
      search,
    } = queryParams;
    let {limit, minPrice,maxPrice,page} = queryParams
    const limit_new = parseInt(limit)
    let page_new = parseInt(page)
    page_new -= 1
    const minPrice_new = parseInt(minPrice)
    const maxPrice_new = parseInt(maxPrice)
     
    const query: any = {};

    if (category !== "null") {
      query.category = category;
    } 
    if (location !== "null") {
      const state = location.split(' ')[0]
      const city = location.split(' ')[1]
      query.state = state;
      query.city = city;
    }
    if (search !== "null") {
      query.name = new RegExp(search, 'i');
    }
    if (minPrice !== "null" && maxPrice !== "null"){
      query.menu = { 
        $elemMatch: { 
            price: { 
                $lte: maxPrice_new, 
                $gte: minPrice_new 
            } 
        } 
     }
    }

    const results = await this.storesRepository.findOptions(query,{limit, skip:page_new*limit_new})
    let stores =  plainToInstance(StoresReturnDTO, results);
    return stores
  }


  async addLike(storeId: string, store: StoreReturnDTO): Promise<void> {
    store.likes += 1;
    await this.storesRepository.update(storeId, { likes: store.likes });
  }

  async removeLike(storeId: string, store: StoreReturnDTO): Promise<void> {
    store.likes = Math.max(0, store.likes - 1);
    await this.storesRepository.update(storeId, { likes: store.likes });
  }
}
