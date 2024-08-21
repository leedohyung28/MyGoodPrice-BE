import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryCountReturnDTO {
  @Expose()
  category: string;

  @Expose()
  count: number;
}

@Exclude()
export class CategoryPercentReturnDTO {
  @Expose()
  category: string;

  @Expose()
  percent: string;
}

@Exclude()
export class CategoryPriceReturnDTO {
  @Expose()
  category: string;

  @Expose()
  averagePrice: number;
}
