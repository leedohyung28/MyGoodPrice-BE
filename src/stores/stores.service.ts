import { Injectable, Response } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { plainToInstance } from 'class-transformer';
import { StoreReturnDTO, StoresReturnDTO } from './stores.DTO';
import { DistanceStoresDTO} from 'src/locations/locations.DTO';
import { GetStoresQueryDTO } from './query.DTO';
import { getDistance } from 'src/common/utils/distance';
import { stringify } from 'querystring';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async getStoreById(id: string): Promise<StoreReturnDTO> {
    const store = await this.storesRepository.findById(id);
    return plainToInstance(StoreReturnDTO, store);
  }

  async getStoresByDistance(longitude: number,latitude: number,distance:number)  {
    const results = await this.storesRepository.find({});
    const stores = plainToInstance(DistanceStoresDTO, results)

    const getStores = stores.filter((store)=>{
      const dis = getDistance(latitude, longitude, store.latitude,store.longitude)
        return dis <= distance
    })
    return getStores;
  }
  async getStoresBy(queryParams: GetStoresQueryDTO): Promise<StoresReturnDTO[]> {
    const {
      category,
      location,
      search,
      minPrice,
      maxPrice,
      page
    } = queryParams;
    let {limit} = queryParams
    const limit_new = parseInt(limit)
    
    
  
    const query: any = {};
    let stores = [];

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

    const results = await this.storesRepository.find(query);
    stores =  plainToInstance(StoresReturnDTO, results);

    if (minPrice !== "null" && maxPrice !== "null") {
      const prevStores = stores;
      const new_stores = []
      prevStores.forEach((store)=> {
        let new_menu = []
        if(store.menu.length !== 0) {
          new_menu = store.menu.filter((menu)=> {
            return (menu['price'] <= maxPrice && menu['price'] >= minPrice)
          })
          if (new_menu.length !== 0){
            new_stores.push({
              id: store.id, 
              name: store.name, 
              state:store.state, 
              city:store.city,
              category: store.category, 
              address: store.address, 
              tel:store.tel,
              menu: new_menu , 
              likes: store.likes
                })
            }
          }
        }
      )
      stores = new_stores
    }

    if (page!== "null" && limit !=="null"){
      console.log(typeof limit_new)
      const skip = limit_new * (page-1)
      stores =  stores.slice(skip, (skip+limit_new))
    }
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
