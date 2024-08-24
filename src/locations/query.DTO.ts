import { IsNumber, IsNumberString, IsDefined } from 'class-validator';

export class GetStoresByDistanceDTO {
  @IsDefined()
  longitude: string;

  @IsDefined()
  latitude: string;

  @IsDefined()
  distance: number;
}