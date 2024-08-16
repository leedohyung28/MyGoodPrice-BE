import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;
@Schema()
export class Store {
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
}
export const StoreSchema = SchemaFactory.createForClass(Store);
