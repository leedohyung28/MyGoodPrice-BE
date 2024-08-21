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
}
