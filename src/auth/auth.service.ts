import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // 사용자 정보를 저장하는 로직 등 추가 가능
  validateUser(user: any) {
    // 사용자 검증 로직
    return user;
  }
}
