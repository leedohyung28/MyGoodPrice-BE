import { Injectable } from '@nestjs/common';
import { Users } from './users.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from './users.repository';
import { Request, Response } from 'express';
import axios from 'axios';
import { UserDataDTO } from './users.DTO';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async putCookie(req: Request, res: Response): Promise<void> {
    const accessToken = req.body.access_token;
    const refreshToken = req.body.refresh_token;

    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
    });
  }

  async getKakaoUser(req: Request): Promise<UserDataDTO | null> {
    const accessToken = req.body.access_token;

    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = response.data;

      const user = new UserDataDTO();
      user.id = userData.id;
      user.email = userData.id;
      user.name = userData.kakao_account.profile.nickname;

      return user;
    } catch (err) {
      console.error('Failed to Get Kakao User', err);
      return null;
    }
  }

  async addUser(user: UserDataDTO, provider: string): Promise<Users> {
    const userData: Users = {
      id: user.id,
      email: user.id,
      name: user.name,
      provider,
      likes: [],
    };

    return this.usersRepository.addUser(userData);
  }

  async googleUser(token: string): Promise<Users> {
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

      return this.usersRepository.addUser(userData);
    } catch (err) {
      console.error('Failed to save user', err);
    }
  }

  async kakaoUser(token: string): Promise<Users> {
    try {
      const profileResponse = await this.authService.getProfile(token);
      const profileData = profileResponse.data;

      const userData: Users = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        provider: 'kakao',
        likes: [],
      };

      return userData;
    } catch (err) {
      console.error('Failed to get Kakao user', err);
    }
  }

  async updateUserLike(token: string, likes: string[]): Promise<void> {
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

  async getUserLikes(token: string): Promise<string[] | null> {
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

  async logoutUser(req: Request, res: Response) {
    await this.usersRepository.clearCookie(req, res);
  }
}
