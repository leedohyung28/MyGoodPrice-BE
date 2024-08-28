import { Controller, Get, Post, Request, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDataDTO } from './users.DTO';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('kakao')
  async addUser(@Request() req, @Res() res: Response): Promise<any> {
    try {
      const response = await this.usersService.getCookie(req, res);

      await this.usersService.putCookie(
        response.data.access_token,
        response.data.refresh_token,
        res,
      );

      const user = await this.usersService.getKakaoUser(
        response.data.access_token,
      );

      if (user) {
        await this.usersService.addUser(user, 'kakao');
        return res.status(200).json(user);
      } else {
        return res.status(500).json({ message: 'Cannot Get Kakao User' });
      }
    } catch (err) {
      console.error('Kakao Login Failed', err);
    }
  }

  @Get('kakao/logout')
  async logoutKakao(@Request() req, @Res() res: Response) {
    try {
      const accessToken = req.cookies['access_token'];
      await this.usersService.logoutUser(accessToken, res);
      res.status(200).send({ message: 'Logout Success' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Logout Failed' });
    }
  }
}
