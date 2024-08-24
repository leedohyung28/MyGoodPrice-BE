import { IsString, IsDefined, } from 'class-validator';

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
  page: string;

  @IsDefined()
  limit: string;

  @IsDefined()
  minPrice: string;

  @IsDefined()
  maxPrice: string;
}