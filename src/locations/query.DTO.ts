import { IsNumber, IsNumberString, IsDefined } from 'class-validator';

export class GetStoresByDistanceDTO {
  @IsDefined()
  @IsNumberString() // 문자열로 받은 숫자를 자동으로 숫자로 변환
  longitude: number;

  @IsDefined()
  @IsNumberString()
  latitude: number;

  @IsDefined()
  @IsNumber()
  distance: number;
}