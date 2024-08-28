import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Stores } from 'src/stores/stores.schema';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async findLikedStoresById(@Query() storeId: string[]) {
    return this.likesService.findLikedStoresById(storeId);
  }

  @Get('/my/kakao')
  async findAllKakaoLikedStores(@Request() req): Promise<Stores[]> {
    return this.likesService.findAllKakaoLikedStores(req);
  }

  @Post('kakao')
  async addKakaoLikedStore(@Request() req, @Body() body: { storeId: string }) {
    return this.likesService.addKakaoLikedStore(req, body);
  }

  @Delete('kakao')
  async deleteKakaoLikedStore(
    @Request() req,
    @Body() body: { storeId: string },
  ) {
    return this.likesService.deleteKakaoLikedStore(req, body);
  }

  @Get('/my/google')
  async findGoogleAllLikedStores(@Request() req): Promise<Stores[]> {
    return this.likesService.findAllGoogleLikedStores(req);
  }

  @Post('google')
  async addGoogleLikedStore(@Request() req, @Body() body: { storeId: string }) {
    return this.likesService.addGoogleLikedStore(req, body);
  }

  @Delete('google')
  async deleteGoogleLikedStore(
    @Request() req,
    @Body() body: { storeId: string },
  ) {
    return this.likesService.deleteGoogleLikedStore(req, body);
  }
}
