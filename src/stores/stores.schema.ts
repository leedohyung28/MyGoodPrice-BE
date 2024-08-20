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
  menu1?: string;

  @Prop()
  price1?: number;

  @Prop()
  menu2?: string;

  @Prop()
  price2?: number;

  @Prop()
  menu3?: string;
}

const _StoreSchema = SchemaFactory.createForClass(Stores);
export const StoreSchema = _StoreSchema
