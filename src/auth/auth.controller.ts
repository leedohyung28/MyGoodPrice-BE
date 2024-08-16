import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('kakao')
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    const redirectUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.CODE_REDIRECT_URI}`;
    res.redirect(redirectUri);
  }

  @Get('kakao/callback')
  async kakaoCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    res.json(user);
  }
}
