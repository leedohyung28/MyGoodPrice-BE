import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Post, 
  Query, 
  Request } from '@nestjs/common';
import { Stores } from 'src/stores/stores.schema';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async findLikedStoresById(@Query() storeId : string[]  ) {
    return this.likesService.findLikedStoresById(storeId);
  }

  @Get('/my')
  async findAllLikedStores(@Request() req): Promise<Stores[]> {
    return this.likesService.findAllLikedStores(req);
  }

  @Post()
  async addLikedStore(@Request() req, @Body() body: { storeId: string }) {
    return this.likesService.addLikedStore(req, body);
  }

  @Delete()
  async deleteLikedStore(@Request() req, @Body() body: { storeId: string }) {
    return this.likesService.deleteLikedStore(req, body);
  }
}
