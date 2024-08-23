import { IsNumber, IsNumberString, IsDefined } from 'class-validator';

export class GetStoresByDistanceDTO {
  @IsDefined()
  longitude: number;

  @IsDefined()
  latitude: number;

  @IsDefined()
  distance: number;
}