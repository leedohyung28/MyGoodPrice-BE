import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Stores & Document;
@Schema()
export class Stores {
  @Prop()
  name: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  category: string;

  @Prop()
  address: string;

  @Prop()
  tel: string;

  @Prop()
  longitude?: string;

  @Prop()
  latitude?: string;

  @Prop({
    type: String,
    get: (data:string) => {
      try{
        return JSON.parse(data.replace(/'/g, '"'));
      } catch(err){
        return []
      }
    },
    set: (data: any[]) => JSON.stringify(data),
  })
  menu: any[];


  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 'check' })
  reviews: string;
}

const _StoreSchema = SchemaFactory.createForClass(Stores);
_StoreSchema.set('collection', 'PreprocessStores');
export const StoreSchema = _StoreSchema;
