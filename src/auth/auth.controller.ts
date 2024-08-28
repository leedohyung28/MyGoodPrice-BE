import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CheckTokenExpiryGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Request() req, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;

    res.cookie('access_token', googleToken, { httpOnly: true });
    res.cookie('refresh_token', googleRefreshToken, {
      httpOnly: true,
    });

    res.redirect(`${this.configService.get('BACKEND_URL')}/auth/profile`);
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getProfile(@Request() req, @Res() res: Response) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      const userProfile = await this.userService.googleUser(accessToken);
      const redirectURL = `http://localhost:5173/mypage?profile=${encodeURIComponent(
        JSON.stringify({
          name: userProfile.name,
          email: userProfile.email,
          id: userProfile.id,
        }),
      )}`;

      return res.redirect(redirectURL);
    }
    throw new UnauthorizedException('No access token');
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    try {
      const accessToken = req.cookies['access_token'];
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      this.authService.revokeGoogleToken(accessToken);
      res.status(200).send({ message: 'Logout Success' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Logout Failed' });
    }
  }

  @Get('token')
  findToken(@Req() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) {
      return accessToken;
    } else {
      return null;
    }
  }
}
