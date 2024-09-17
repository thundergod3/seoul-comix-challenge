/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultRestaurantSelect = {
  id: true,
  rating: true,
  rating_count: true,
  category: true,
  city: true,
  desc: true,
  images: true,
  name: true,
  price_range: true,
  isFavorite: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.RestaurantSelect;

export const restaurantRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;

      const items = await prisma.restaurant.findMany({
        select: defaultRestaurantSelect,
        take: limit + 1,
        where: {},
      });

      return {
        items,
      };
    }),
  favorite: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        isFavorite: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const post = await prisma.restaurant.update({
        where: {
          id: input.id,
        },
        data: {
          isFavorite: input.isFavorite,
        },
        select: defaultRestaurantSelect,
      });
      return post;
    }),
});
