import { Injectable } from '@nestjs/common';
import { Users } from './users.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async saveUser(token: string) {
    try {
      const profileResponse = await this.authService.getProfile(token);
      const profileData = profileResponse.data;

      const userData: Users = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        provider: 'google',
        likes: [],
      };

      return this.usersRepository.findUser(userData);
    } catch (err) {
      console.error('Failed to save user', err);
    }
  }

  async updateUserLike(token: string, likes: string[]) {
    try {
      const profileResponse = await this.authService.getProfile(token);
      const profileData = profileResponse.data;

      await this.usersRepository.updateUser(
        profileData.id,
        undefined,
        undefined,
        undefined,
        likes,
      );
    } catch (err) {
      console.error(err);
    }
  }

  async getUserLikes(token: string) {
    try {
      const profileResponse = await this.authService.getProfile(token);
      const profileData = profileResponse.data;

      const user = await this.usersRepository.findUser(profileData);
      if (user) {
        return user.likes;
      } else {
        console.error('User not found');
        return null;
      }
    } catch (err) {
      console.error('Failed to get user likes :', err);
    }
  }
}
