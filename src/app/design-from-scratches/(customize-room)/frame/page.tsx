'use client';
import { useStore } from '@/app/store';
import { Base6, base6Metadata } from '@/components/Base6';
import { Baw, BawMetadata } from '@/components/BAW 110X60X40';
import { BbwMetadata, Bbw } from '@/components/BBW 110X60X200';
import Item from '@/components/parts/Item';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdInfoOutline } from 'react-icons/md';

const Frame = () => {
  const pushItem = useStore((state) => state.pushModel);
  const furnitures = useStore((state) => state.furnitures);
  const handleClick = (model: any, metadata: any) => {
    pushItem({
      Model: model,
      metadata: metadata,
      customization: Object.keys(metadata).reduce((acc: any, key) => {
        acc[key] = '';
        return acc;
      }, {}),
    });
    console.log(furnitures);
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
          <Item
            onClick={() => {
              handleClick(Base6, base6Metadata);
            }}
            name='HOKKSUND'
            information='Base Atas'
            image='/images/items/(Base) BAK 040X38X40.png'
            price={1000000}
          />
          <Item
            onClick={() => {
              handleClick(Baw, BawMetadata);
            }}
            name='MEHAMN'
            information='Base Atas'
            image='/images/items/(Base) BAK 040X38X104.png'
            price={1500000}
          />
          <Item
            onClick={() => {
              handleClick(Bbw, BbwMetadata);
            }}
            name='SVARTSIDAL'
            information='Base Atas'
            image='/images/items/(Base) BAK 090X38X40.png'
            price={3000000}
          />
          {/* <Item
            name='TJORHOMN'
            information='Base Atas'
            image='/images/items/(Base) BAK 090X38X104.png'
            price={400000}
          />
          <Item
            name='BAGANAS'
            information='Base Atas'
            image='/images/items/(Base) BBK 020X60X85.png'
            price={2500000}
          />
          <Item
            name='KOMPLEMENT'
            information='Base Atas'
            image='/images/items/(Base) BBK 020X60X85.png'
            price={4500000}
          /> */}
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </>
  );
};

export default Frame;
