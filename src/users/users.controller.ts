import { Controller, Get, HttpCode, Post, Request, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('kakao')
  async addUser(@Request() req, @Res() res: Response): Promise<void> {
    await this.usersService.putCookie(req, res);

    const user = await this.usersService.getKakaoUser(req);

    if (user) {
      await this.usersService.addUser(user, 'kakao');
      res.status(201).json({
        message: 'User successfully added',
        user,
      });
    } else {
      throw new Error('Cannot Get Kakao User');
      res.status(400).json({
        message: 'Cannot Get Kakao User',
      });
    }
  }

  @Get('kakao/logout')
  async logoutKakao(@Request() req, @Res() res: Response) {
    try {
      await this.usersService.logoutUser(req, res);
      res.status(200).send({ message: 'Logout Success' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Logout Failed' });
    }
  }
}
