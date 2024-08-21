import { Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { plainToInstance } from 'class-transformer';
import { StoreReturnDTO, StoresReturnDTO } from './stores.DTO';
import { ObjectId } from 'typeorm';
import { DistanceStoresDTO, LocationReturnDTO } from 'src/locations/locations.DTO';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async getStoreById(id: string): Promise<StoreReturnDTO> {
    const store = await this.storesRepository.findById(id);
    return plainToInstance(StoreReturnDTO, store);
  }
  //위도, 경도가 없는 데이터는???????????
  async getLocationById(id: string): Promise<LocationReturnDTO> {
    const store = await this.storesRepository.findById(id);
    return plainToInstance(LocationReturnDTO, store);
  }

  async getStoresByDistance(longitude,latitude,distance)  {

    function getDistance(lat1,lng1,lat2,lng2) {
      function deg2rad(deg) {
          return deg * (Math.PI/180)
      }
      const dLat = deg2rad(lat2-lat1);  
      const dLon = deg2rad(lng2-lng1);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let dis = 6371 * c; 
      dis = Math.round(dis * 1000) / 1000
      return dis
    }

    const results = await this.storesRepository.find({});
    const stores = plainToInstance(DistanceStoresDTO, results)
    const getStores = stores.filter((store)=>{
      const dis = getDistance(latitude, longitude, store.latitude,store.longitude)
        return dis <= distance
    })

    return getStores;
  }

  async getStoresBy(
    category?: string,
    location?: string,
    search?: string,
    minPrice?: number | "null",
    maxPrice?: number | "null",
    page?: number | "null",
    limit?: number | "null",
  ): Promise<StoresReturnDTO[]> {
    const query: any = {};
    let stores = [];

    if (category && category !== "null") {
      query.category = category;
    } 
    if (location && location !== "null") {
      const state = location.split(' ')[0]
      const city = location.split(' ')[1]
      console.log("state & city", state,city)
      query.state = state;
      query.city = city;

    }
    if (search && search !== "null") {
      query.name = new RegExp(search, 'i');
    }

    if (page && limit && page !== "null" && limit !== "null") {
      console.log(1, query)
      const results = await this.storesRepository.findOptions(query,{limit, skip:page});
      stores =  plainToInstance(StoresReturnDTO, results);

    } else {
      console.log(2, query)

      const results = await this.storesRepository.find(query);
      stores =  plainToInstance(StoresReturnDTO, results);

    }
    if (minPrice && maxPrice && minPrice !== null && maxPrice !== null) {
      const prevStores = stores;
      const new_stores = []
      prevStores.forEach((store)=> {
        if(store.menu.length !== 0) {
          const new_menu = store.menu.filter((menu)=> {
            return (menu['price'] <= maxPrice && menu['price'] >= minPrice)
          })
          if(new_menu.length !== 0){
            new_stores.push({name: store.name, state:store.state, city:store.city,
              category: store.category, address: store.address, tel:store.tel,
              menu: new_menu 
                })
            }
          }
        }
      )
      stores= new_stores
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
