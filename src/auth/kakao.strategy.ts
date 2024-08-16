import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from './auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_API_KEY,
      callbackURL: process.env.CODE_REDIRECT_URI,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 사용자 프로필을 가져와서 필요한 정보를 반환합니다.
    const user = {
      id: profile.id,
      username: profile.username,
      email: profile._json.kakao_account.email,
    };
    return user; // 이 정보를 AuthService로 전달합니다.
  }
}
