import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Stores, StoreDocument } from 'src/stores/stores.schema';

@Injectable()
export class StoresRepository {
  constructor(
    @InjectModel(Stores.name) private storeModel: Model<StoreDocument>,
  ) {
    console.log(Stores.name);
  }

  async findOne(storeFilterQuery: FilterQuery<Stores>): Promise<Stores> {
    try {
      return this.storeModel.findOne(storeFilterQuery);
    } catch (err) {
      console.error(err);
    }
  }

  async find(storeFilterQuery: FilterQuery<Stores>): Promise<Stores[]> {
    try {
      return this.storeModel.find(storeFilterQuery);
    } catch (err) {
      console.error(err);
    }
  }
}
