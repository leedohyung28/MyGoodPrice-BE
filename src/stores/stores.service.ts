import { Injectable } from '@nestjs/common';
import { StoresRepository } from './stores.repository';
import { plainToInstance } from 'class-transformer';
import { StoreReturnDTO, StoresReturnDTO } from './strores.DTO';



@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async getStoresByName(name: string): Promise<StoreReturnDTO> {
    const store =  await this.storesRepository.findOne({ name });
    return plainToInstance(StoreReturnDTO, store);
  }
  async getStoresBy (category?:string, city?:string, name?:string,lowPrice?: number, highPrice?:number) : Promise<StoreReturnDTO[]> {
    const query: any = {};
    
    if (category) {
        query.category = category;
    }
    if (city) {
        query.city = city;
    } 
    if (name) {
      query.name = new RegExp(name, 'i'); 
    }
    query.price1 ={}
    if (lowPrice !== undefined || highPrice !== undefined) {
      if (lowPrice !== undefined) {
          query.price1.$gte = lowPrice; // lowPrice 이상
      }
      if (highPrice !== undefined) {
          query.price1.$lte = highPrice; // highPrice 이하
      }
      }
      query.price1['$gte'] = parseInt(query.price1['$gte'] )
      query.price1['$lte'] = parseInt(query.price1['$lte'] )

    console.log(query)
    const stores = await this.storesRepository.find(query)
    return plainToInstance(StoreReturnDTO, stores)
  }

}