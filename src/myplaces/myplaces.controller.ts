import { Controller, Get, Request } from '@nestjs/common';
import { MyplacesService } from './myplaces.service';
import {
  CategoryCountReturnDTO,
  CategoryPercentReturnDTO,
  CategoryPriceReturnDTO,
} from './myplaces.DTO';

@Controller('myplaces')
export class MyplacesController {
  constructor(private readonly myplacesService: MyplacesService) {}

  @Get('category')
  async categorizedLikedStore(
    @Request() req,
  ): Promise<CategoryCountReturnDTO[]> {
    return this.myplacesService.getCountsByCategories(req);
  }

  @Get('percent')
  async percentLikedStore(@Request() req): Promise<CategoryPercentReturnDTO[]> {
    return this.myplacesService.getPercentsByCategories(req);
  }

  @Get('average')
  async averageLikedStore(@Request() req): Promise<CategoryPriceReturnDTO[]> {
    return this.myplacesService.getAvgPriceByCategories(req);
  }
}
