import { Injectable } from '@nestjs/common';
import { Stores } from 'src/stores/stores.schema';
import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async getStoresByName(name: string): Promise<Stores> {
    return this.storesRepository.findOne({ name });
  }

  async getStores(): Promise<Stores[]> {
    return this.storesRepository.find({});
  }
}
