import { Injectable } from '@nestjs/common';
import { Users } from './users.schema';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from './users.repository';
import { Request, Response } from 'express';
import axios from 'axios';
import { UserDataDTO } from './users.DTO';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async getCookie(req: Request, res: Response) {
    try {
      const response = axios.post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('KAKAO_CLIENT_ID'),
          redirect_uri: this.configService.get('KAKAO_REDIRECT_URI'),
          code: req.body.code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );
      return response;
    } catch (err) {
      console.error('Failed to Get Cookie in Kakao : ', err);
    }
  }

  async putCookie(
    accessToken: string,
    refreshToken: string,
    res: Response,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        res.cookie('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  async getKakaoUser(accessToken: string): Promise<UserDataDTO | null> {
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

  async makeGoogleUser(
    id: string,
    name: string,
    email: string,
  ): Promise<Users> {
    try {
      const userData: Users = {
        id,
        name,
        email,
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
      const profileResponse = await this.getKakaoUser(token);
      const profileData = profileResponse;

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

  async updateKakaoUserLike(token: string, likes: string[]): Promise<void> {
    try {
      const kakaoProfileResponse = await this.kakaoUser(token);
      const profileData = kakaoProfileResponse;

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

  async updateGoogleUserLike(token: string, likes: string[]): Promise<void> {
    try {
      const googleProfileResponse = await this.authService.getProfile(token);
      const profileData = googleProfileResponse.data;

      await this.usersRepository.updateUser(
        profileData.email,
        undefined,
        undefined,
        undefined,
        likes,
      );
    } catch (err) {
      console.error(err);
    }
  }

  async getKakaoUserLikes(token: string): Promise<string[] | null> {
    try {
      const kakaoProfileResponse = await this.kakaoUser(token);
      const profileData = kakaoProfileResponse;

      const user = await this.usersRepository.findUser(profileData);
      if (user) {
        return user.likes;
      } else {
        console.error('User not found');
        return null;
      }
    } catch (err) {
      console.error('Failed to get Kakao user likes :', err);
    }
  }

  async getGoogleUserLikes(token: string): Promise<string[] | null> {
    try {
      const googleProfileResponse = await this.authService.getProfile(token);
      const profileData = googleProfileResponse.data;

      const user = await this.usersRepository.findUser(profileData);
      if (user) {
        return user.likes;
      } else {
        console.error('User not found');
        return null;
      }
    } catch (err) {
      console.error('Failed to get Google user likes :', err);
    }
  }

  async logoutUser(token: string, res: Response) {
    try {
      const id = await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await this.usersRepository.clearCookie(res);
    } catch (err) {
      console.error('Failed to Logout : ', err);
    }
  }
}
