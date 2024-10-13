'use client';
import { useStore } from '@/app/store';
import Item from '@/components/parts/Item';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import kitchenModels from '@/components/kitchen';
import { useEffect } from 'react';
import { Furniture, FurnitureModel } from '@/types';
import { getModelByKey } from '@/lib/utils';

type Props = {
  searchParams: {
    template: string;
  };
};

const Frame = (props: Props) => {
  const pushItem = useStore((state) => state.pushModel);
  const furnitures = useStore((state) => state.furnitures);
  const handleClick = (key: string) => {
    pushItem({
      position: [0, 0, 0],
      key: key,
      customization: Object.keys(getModelByKey(key).metadata).reduce<
        Record<string, string>
      >((acc, key) => {
        acc[key] = '';
        return acc;
      }, {}),
    });
  };

  return (
    <>
      <div className='flex gap-6 items-center font-semibold text-xl text-neutral-700'>
        <Link href={'/design-from-scratches/frame'}>
          <IoArrowBackOutline />
        </Link>
        <h1>Frame</h1>
      </div>
      <ScrollArea className='h-[450px] mt-6'>
        <h1 className='font-semibold'>Kitchen</h1>
        <div className='flex flex-wrap'>
          {kitchenModels.map((model, index) => (
            <Item
              key={index}
              onClick={() => {
                handleClick(model.key);
              }}
              name={model.key}
              information='Base Atas'
              image='/images/items/(Base) BAK 040X38X40.png'
              price={1000000}
            />
          ))}
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </>
  );
};

export default Frame;
