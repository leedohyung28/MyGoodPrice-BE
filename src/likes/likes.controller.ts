import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { Stores } from 'src/stores/stores.schema';
import { StoresService } from 'src/stores/stores.service';
import { UsersService } from 'src/users/users.service';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly storeService: StoresService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  async findAllLikedStores(@Request() req): Promise<Stores[]> {
    const accessToken = req.cookies['access_token'];
    const likes = await this.userService.getUserLikes(accessToken);

    console.log('likes:', likes);

    const likedStores = [];
    if (likes) {
      for (const likedStoreId of likes) {
        const store = await this.storeService.getStoreById(likedStoreId);
        console.log('store:', store);
        likedStores.push(store);
      }
    }

    return likedStores;
  }

  @Post()
  async addLikedStore(@Request() req, @Body() body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const likes = await this.userService.getUserLikes(accessToken);
    likes.push(body.storeId);
    await this.userService.updateUserLike(accessToken, likes);
    return { message: 'Store added to likes', likes: likes };
  }

  @Delete()
  async deleteLikedStore(@Request() req, @Body() body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const likes = await this.userService.getUserLikes(accessToken);
    const updatedLikes = likes.filter((storeId) => storeId !== body.storeId);
    await this.userService.updateUserLike(accessToken, updatedLikes);
    return { message: 'Store removed from likes', likes: updatedLikes };
  }
}
