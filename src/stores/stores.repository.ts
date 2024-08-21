import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Stores, StoreDocument } from 'src/stores/stores.schema';

@Injectable()
export class StoresRepository {
  constructor(
    @InjectModel(Stores.name) private storeModel: Model<StoreDocument>,
  ) {}

  async findOne(storeFilterQuery: FilterQuery<Stores>): Promise<Stores> {
    try {
      return this.storeModel.findOne(storeFilterQuery);
    } catch (err) {
      console.error('Failed to fine one : ', err);
    }
  }

  async findById(storeFilterQuery: string): Promise<Stores> {
    try{
      return this.storeModel.findById(storeFilterQuery);

    }catch(err){
      console.log(err)
    }
  }

  async find(storeFilterQuery: FilterQuery<Stores>): Promise<Stores[]> {
    try {
      return this.storeModel.find(storeFilterQuery);
    } catch (err) {
      console.error('Failed to fine : ', err);
    }
  }
}
