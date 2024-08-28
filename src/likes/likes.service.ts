import { Injectable } from '@nestjs/common';
import { decode } from 'querystring';
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

  async findLikedStoresById(query): Promise<StoresReturnDTO[]> {
    const likedId = JSON.parse(query.storeId);
    const likedStores = [];
    for (const likedStoreId of likedId) {
      const store = await this.storeService.getStoreById(likedStoreId);
      likedStores.push(store);
    }
    return likedStores;
  }

  async findAllKakaoLikedStores(req): Promise<Stores[]> {
    const accessToken = req.cookies['access_token'];
    const likes = await this.userService.getKakaoUserLikes(accessToken);

    const likedStores = [];
    if (likes) {
      for (const likedStoreId of likes) {
        const store = await this.storeService.getStoreById(likedStoreId);
        likedStores.push(store);
      }
    }

    return likedStores;
  }

  async addKakaoLikedStore(req, body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const store = await this.storeService.getStoreById(body.storeId);

    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    const likes = await this.userService.getKakaoUserLikes(accessToken);
    likes.push(body.storeId);
    await this.userService.updateKakaoUserLike(accessToken, likes);
    await this.storeService.addLike(body.storeId, store);
  }

  async deleteKakaoLikedStore(req, body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const store = await this.storeService.getStoreById(body.storeId);
    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    const likes = await this.userService.getKakaoUserLikes(accessToken);
    const updatedLikes = likes.filter((storeId) => storeId !== body.storeId);
    await this.userService.updateKakaoUserLike(accessToken, updatedLikes);
    await this.storeService.removeLike(body.storeId, store);
  }

  async findAllGoogleLikedStores(req): Promise<Stores[]> {
    const accessToken = req.cookies['access_token'];
    const likes = await this.userService.getGoogleUserLikes(accessToken);

    const likedStores = [];
    if (likes) {
      for (const likedStoreId of likes) {
        const store = await this.storeService.getStoreById(likedStoreId);
        likedStores.push(store);
      }
    }

    return likedStores;
  }

  async addGoogleLikedStore(req, body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const store = await this.storeService.getStoreById(body.storeId);

    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    const likes = await this.userService.getGoogleUserLikes(accessToken);
    likes.push(body.storeId);
    await this.userService.updateGoogleUserLike(accessToken, likes);
    await this.storeService.addLike(body.storeId, store);
  }

  async deleteGoogleLikedStore(req, body: { storeId: string }) {
    const accessToken = req.cookies['access_token'];

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const store = await this.storeService.getStoreById(body.storeId);
    if (!store) {
      throw new Error('No Store for this StoreId');
    }

    const likes = await this.userService.getGoogleUserLikes(accessToken);
    const updatedLikes = likes.filter((storeId) => storeId !== body.storeId);
    await this.userService.updateGoogleUserLike(accessToken, updatedLikes);
    await this.storeService.removeLike(body.storeId, store);
  }

  async findAllLikedStoresParams(query: string): Promise<Stores[]> {
    const likedStores = [];
    let storeIds: string[] = [];

    try {
      storeIds = JSON.parse(query); // query를 배열로 변환
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }

    for (const likedStoreId of storeIds) {
      const store = await this.storeService.getStoreById(likedStoreId);
      likedStores.push(store);
    }

    return likedStores;
  }
}
