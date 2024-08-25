import { Injectable } from '@nestjs/common';
import { LikesService } from 'src/likes/likes.service';
import {
  CategoryCountReturnDTO,
  CategoryPercentReturnDTO,
  CategoryPriceReturnDTO,
} from './myplaces.DTO';

interface CategoryData {
  count: number;
  totalPrice: number;
}

@Injectable()
export class MyplacesService {
  constructor(private readonly likesService: LikesService) {}

  // async getCountsByCategories(req): Promise<CategoryCountReturnDTO[]> {
  //   const likedStores = await this.likesService.findAllLikedStores(req);

  //   const categoryCount = likedStores.reduce((acc, store) => {
  //     const category = store.category;
  //     if (!acc[category]) {
  //       acc[category] = 0;
  //     }
  //     acc[category] += 1;

  //     return acc;
  //   }, {});

  //   const result: CategoryCountReturnDTO[] = Object.entries(categoryCount).map(
  //     ([category, count]) => ({
  //       category,
  //       count: Number(count),
  //     }),
  //   );

  //   return result;
  // }

  // async getPercentsByCategories(req): Promise<CategoryPercentReturnDTO[]> {
  //   const likedStores = await this.likesService.findAllLikedStores(req);

  //   const categoryCount = likedStores.reduce((acc, store) => {
  //     const category = store.category;
  //     if (!acc[category]) {
  //       acc[category] = 0;
  //     }
  //     acc[category] += 1;

  //     return acc;
  //   }, {});

  //   const totalStores = likedStores.length;

  //   const result: CategoryPercentReturnDTO[] = Object.entries(
  //     categoryCount,
  //   ).map(([category, count]) => ({
  //     category,
  //     percent:
  //       totalStores > 0
  //         ? Number(count) % 1 === 0
  //           ? `${((Number(count) / totalStores) * 100).toFixed(0)}%`
  //           : (Number(count) * 10) % 1 === 0
  //             ? `${((Number(count) / totalStores) * 100).toFixed(1)}%`
  //             : `${((Number(count) / totalStores) * 100).toFixed(2)}%`
  //         : '0%',
  //   }));

  //   return result;
  // }

  // async getAvgPriceByCategories(req): Promise<CategoryPriceReturnDTO[]> {
  //   const likedStores = await this.likesService.findAllLikedStores(req);

  //   const categoryCount = likedStores.reduce<Record<string, CategoryData>>(
  //     (acc, store) => {
  //       const category = store.category;
  //       if (!acc[category]) {
  //         acc[category] = { count: 0, totalPrice: 0 };
  //       }
  //       if (store.menu && store.menu.length > 0) {
  //         // const items = JSON.parse(store.menu.replace(/'/g, '"'));
  //         const items = store.menu;
  //         items.forEach((item) => {
  //           if (item.price) {
  //             acc[category].count += 1;
  //             acc[category].totalPrice += item.price;
  //           }
  //         });
  //       }

  //       return acc;
  //     },
  //     {},
  //   );

  //   const totalStores = likedStores.length;

  //   const result: CategoryPriceReturnDTO[] = Object.entries(categoryCount).map(
  //     ([category, { count, totalPrice }]) => {
  //       const averagePrice =
  //         count > 0
  //           ? (totalPrice / count) % 1 === 0
  //             ? (totalPrice / count).toFixed(0)
  //             : (totalPrice / count).toFixed(2)
  //           : '0.00';
  //       return {
  //         category,
  //         averagePrice: Number(averagePrice),
  //       };
  //     },
  //   );

  //   return result;
  // }

  async getCountsByCategoriesByParam(
    param: string,
  ): Promise<CategoryCountReturnDTO[]> {
    const likedStores = await this.likesService.findAllLikedStoresParams(param);

    const categoryCount = likedStores.reduce((acc, store) => {
      const category = store.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += 1;

      return acc;
    }, {});

    const result: CategoryCountReturnDTO[] = Object.entries(categoryCount).map(
      ([category, count]) => ({
        category,
        count: Number(count),
      }),
    );

    return result;
  }

  async getPercentsByCategoriesByParam(
    param: string,
  ): Promise<CategoryPercentReturnDTO[]> {
    const likedStores = await this.likesService.findAllLikedStoresParams(param);

    const categoryCount = likedStores.reduce((acc, store) => {
      const category = store.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += 1;

      return acc;
    }, {});

    const totalStores = likedStores.length;

    const result: CategoryPercentReturnDTO[] = Object.entries(
      categoryCount,
    ).map(([category, count]) => ({
      category,
      percent:
        totalStores > 0
          ? Number(count) % 1 === 0
            ? `${((Number(count) / totalStores) * 100).toFixed(0)}%`
            : (Number(count) * 10) % 1 === 0
              ? `${((Number(count) / totalStores) * 100).toFixed(1)}%`
              : `${((Number(count) / totalStores) * 100).toFixed(2)}%`
          : '0%',
    }));

    return result;
  }

  async getAvgPriceByCategoriesByParam(
    param: string,
  ): Promise<CategoryPriceReturnDTO[]> {
    const likedStores = await this.likesService.findAllLikedStoresParams(param);

    const categoryCount = likedStores.reduce<Record<string, CategoryData>>(
      (acc, store) => {
        const category = store.category;
        if (!acc[category]) {
          acc[category] = { count: 0, totalPrice: 0 };
        }
        if (store.menu && store.menu.length > 0) {
          // const items = JSON.parse(store.menu.replace(/'/g, '"'));
          const items = store.menu;
          items.forEach((item) => {
            if (item.price) {
              acc[category].count += 1;
              acc[category].totalPrice += item.price;
            }
          });
        }

        return acc;
      },
      {},
    );

    const totalStores = likedStores.length;

    const result: CategoryPriceReturnDTO[] = Object.entries(categoryCount).map(
      ([category, { count, totalPrice }]) => {
        const averagePrice =
          count > 0
            ? (totalPrice / count) % 1 === 0
              ? (totalPrice / count).toFixed(0)
              : (totalPrice / count).toFixed(2)
            : '0.00';
        return {
          category,
          averagePrice: Number(averagePrice),
        };
      },
    );

    return result;
  }
}
