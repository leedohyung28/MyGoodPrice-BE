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
  page: number | "null";

  @IsDefined()
  limit: number | "null";

  @IsDefined()
  minPrice: number | "null";

  @IsDefined()
  maxPrice: number | "null";
}