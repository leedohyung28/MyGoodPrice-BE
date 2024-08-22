import { IsString, IsNumber, IsNumberString, IsDefined } from 'class-validator';

export class GetStoresQueryDTO {
  @IsDefined()
  @IsString()
  category: string;

  @IsDefined()
  @IsString()
  location: string;

  @IsDefined()
  @IsString()
  search: string;

  @IsDefined()
  @IsNumberString() // 문자열로 받은 숫자를 자동으로 숫자로 변환
  page: number | "null";

  @IsDefined()
  @IsNumberString()
  limit: number | "null";

  @IsDefined()
  @IsNumber()
  minPrice: number | "null";

  @IsDefined()
  @IsNumber()
  maxPrice: number | "null";
}