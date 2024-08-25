import { Injectable } from '@nestjs/common';
import { StoresReturnDTO } from 'src/stores/stores.DTO';
import { Stores } from 'src/stores/stores.schema';
import { StoresService } from 'src/stores/stores.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikesService {
  constructor(
    private readonly storeService: StoresService,
    private readonly userService: UsersService,
  ) {}

  async findLikedStoresById(query) : Promise<StoresReturnDTO[]> {
    const likedId = JSON.parse(query.storeId);
    const likedStores = []
    for (const likedStoreId of likedId) {
      const store = await this.storeService.getStoreById(likedStoreId);
      likedStores.push(store);
    }
    return likedStores
  }

  async findAllLikedStores(req): Promise<Stores[]> {
    const accessToken = req.cookies['access_token'];
    const likes = await this.userService.getUserLikes(accessToken);

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

  async addLikedStore(req, body: { storeId: string }) {
    // const accessToken = req.cookies['access_token'];

    // if (!accessToken) {
    //   throw new Error('Access token is missing');
    // }

    const store = await this.storeService.getStoreById(body.storeId);
    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    // const likes = await this.userService.getUserLikes(accessToken);
    // likes.push(body.storeId);
    // await this.userService.updateUserLike(accessToken, likes);
    await this.storeService.addLike(body.storeId, store);
  }

  async deleteLikedStore(req, body: { storeId: string }) {
    // const accessToken = req.cookies['access_token'];

    // if (!accessToken) {
    //   throw new Error('Access token is missing');
    // }

    const store = await this.storeService.getStoreById(body.storeId);
    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    // const likes = await this.userService.getUserLikes(accessToken);
    // const updatedLikes = likes.filter((storeId) => storeId !== body.storeId);
    // await this.userService.updateUserLike(accessToken, updatedLikes);
    await this.storeService.removeLike(body.storeId, store);
  }
}
