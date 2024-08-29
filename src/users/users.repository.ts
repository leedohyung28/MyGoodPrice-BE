import { Injectable } from '@nestjs/common';
import { UserDocument, Users } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  async addUser(user: Users): Promise<Users> {
    try {
      const newUser = new this.userModel({
        id: user.id,
        email: user.email,
        name: user.name,
        provider: user.provider,
        likes: [],
      });
      const existingUser = await this.userModel.findOne({ id: user.id });

      if (!existingUser) {
        await newUser.save();
        return newUser;
      } else {
        return existingUser;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async findUser(user: Users): Promise<Users | null> {
    try {
      const existingUser = await this.userModel.findOne({ email: user.email });

      return existingUser;
    } catch (err) {
      console.error('Cannot Find User from DB : ', err);
      return null;
    }
  }

  async updateUser(
    id: string,
    name?: string,
    email?: string,
    provider?: string,
    likes?: string[],
  ): Promise<void> {
    const updateData: Partial<Users> = {};

    if (name) {
      updateData.name = name;
    }
    if (email) {
      updateData.email = email;
    }
    if (provider) {
      updateData.provider = provider;
    }
    if (likes) {
      updateData.likes = likes;
    }

    await this.userModel.updateOne({ id }, updateData).exec();
  }

  async clearCookie(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }
}
