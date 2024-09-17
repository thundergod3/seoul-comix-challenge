/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import FAKE_DATA from '~/mocks/data.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.deleteMany();

  await prisma.restaurant.createMany({
    data: FAKE_DATA.map((record) => ({
      rating: record.rating,
      rating_count: record.rating_count,
      category: record.category,
      city: record.city,
      desc: record.desc,
      images: record.images,
      name: record.name,
      price_range: record.price_range,
      isFavorite: record.isFavorite,
    })),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
