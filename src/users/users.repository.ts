import { Injectable } from '@nestjs/common';
import { UserDocument, Users } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async findUser(user: Users): Promise<Users> {
    try {
      const existingUser = await this.userModel.findOne({ id: user.id });

      if (!existingUser) {
        const newUser = new this.userModel({
          id: user.id,
          email: user.email,
          name: user.name,
          provider: user.provider,
          likes: [],
        });
        await newUser.save();
      }

      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
