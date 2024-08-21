import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  provider: string;

  @Prop({ type: [String] })
  likes: string[];
}

export const UserSchema = SchemaFactory.createForClass(Users);
