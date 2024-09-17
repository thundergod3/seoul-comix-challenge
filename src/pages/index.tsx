import dynamic from 'next/dynamic';
import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';
import { Fragment } from 'react';

const RestaurantItem = dynamic(() => import('~/components/RestaurantItem'), {
  ssr: false,
});

const IndexPage: NextPageWithLayout = () => {
  const restaurantsQuery = trpc.restaurant.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <div className="flex flex-col bg-white px-5 max-w-md m-auto gap-4 my-6 rounded-md">
      {restaurantsQuery?.data?.pages?.map((page) => (
        <Fragment key={page.items[0]?.id}>
          {page.items.map((item) => (
            <RestaurantItem key={item?.id} data={item} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default IndexPage;
