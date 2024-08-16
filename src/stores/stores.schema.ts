import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  //   @Prop({ required: true })
  //   id: number;

  // @Prop({ required: true })
  // name: string;

  // @Prop({ required: true })
  // state: string;

  // @Prop({ required: true })
  // city: string;

  // @Prop({ required: true, unique: true })
  // address: string;

  // @Prop()
  // tel: string;

  // @Prop({ required: true })
  // category: string;

  // @Prop()
  // likes: number;

  // @Prop()
  // created_at: Date;

  // @Prop()
  // updated_at: Date;

  // @Prop([String, Number])
  // menus: [];

  @Prop()
  시도: string;

  @Prop()
  시군: string;

  @Prop()
  업종: string;

  @Prop()
  업소명: string;

  @Prop()
  주소: string;

  @Prop()
  연락처: string;

  @Prop()
  메뉴1?: string;

  @Prop()
  가격1?: number;

  @Prop()
  메뉴2?: string;

  @Prop()
  가격2?: number;

  @Prop()
  메뉴3?: string;

  @Prop()
  가격3?: number;
}
export const StoreSchema = SchemaFactory.createForClass(Store);
