import React, { FC, useCallback, useState } from 'react';
import { Button, Carousel, Image, Spin, Typography } from 'antd';
import { HeartFilled, HeartOutlined, StarOutlined } from '@ant-design/icons';
import { RestaurantItemType } from '~/constants/types';
import { textByStoreCategory } from '~/constants/values';
import { trpc } from '~/utils/trpc';

const { Paragraph } = Typography;

type Props = {
  data: RestaurantItemType;
};

const RestaurantItem: FC<Props> = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const utils = trpc.useUtils();

  const mutationFavorite = trpc.restaurant.favorite.useMutation({
    async onSuccess() {
      setLoading(false);

      await utils.restaurant.list.invalidate();
    },
  });

  const handleFavoriteItem = useCallback(async () => {
    setLoading(true);

    await mutationFavorite.mutateAsync({
      id: data.id,
      isFavorite: !data.isFavorite,
    });
  }, [data.id, data.isFavorite, mutationFavorite]);

  return (
    <Spin spinning={loading}>
      <div className="flex flex-col gap-3 relative">
        <Carousel autoplay>
          {data?.images?.map((record) => (
            <Image
              src={record}
              alt={data?.name}
              key={record}
              preview={false}
              height={200}
              rootClassName="w-full rounded-2xl"
              className="rounded-2xl"
            />
          ))}
        </Carousel>
        <Button
          icon={
            data?.isFavorite ? (
              <HeartFilled className="text-white" />
            ) : (
              <HeartOutlined className="text-white" />
            )
          }
          className="rounded-full bg-white1 !border-white1 absolute top-2 right-2 hover:!bg-white1 cursor-pointer"
          onClick={handleFavoriteItem}
        />
        <div className="flex flex-col gap-">
          <div className="flex items-center gap-1">
            <Paragraph
              ellipsis
              className="font-semibold text-base text-primary !m-0"
            >
              {data?.name}
            </Paragraph>
            <div className="flex items-center gap-[2px]">
              <StarOutlined className="text-yellow1" />
              <span className="text-primary text-sm">4.8(2)</span>
            </div>
          </div>
          <Paragraph ellipsis className="text-sm text-primary !m-0">
            {data?.desc}
          </Paragraph>
          <span className="text-primary text-sm">
            오사카 나카노시마 · {(textByStoreCategory as any)?.[data?.category]}{' '}
            · {data?.price_range}만원
          </span>
        </div>
      </div>
    </Spin>
  );
};

export default RestaurantItem;
