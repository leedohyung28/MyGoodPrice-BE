import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Store, StoreDocument } from 'src/stores/stores.schema';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async findOne(storeFilterQuery: FilterQuery<Store>): Promise<Store> {
    return this.storeModel.findOne(storeFilterQuery);
  }

  async find(storeFilterQuery: FilterQuery<Store>): Promise<Store[]> {
    return this.storeModel.findOne(storeFilterQuery);
  }
}
