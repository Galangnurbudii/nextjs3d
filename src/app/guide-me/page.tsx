'use client';
import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WardrobeType = () => {
  return (
    <>
      <h1 className='text-3xl font-semibold mt-14'>Wardrobe Layout</h1>
      <h6 className='font-light text-sm text-gray-400 mt-2'>
        Select your wardrobe layout
      </h6>
      <div className='mt-12 w-full'>
        <div className='flex justify-center flex-wrap w-full'>
          <Link href={'/guide-me/preferences-settings'} className='w-1/3 p-4'>
            <Card className='relative'>
              <CardContent className='rounded-xl h-72'>
                <img
                  className='object-cover rounded-md w-full h-full'
                  src='/images/wardrobe.jpg'
                  alt=''
                />
              </CardContent>

              <Button
                className='w-full absolute bottom-0 rounded-t-none'
                variant='outline'
              >
                Single Wall
              </Button>
            </Card>
          </Link>
          <Link href={'/guide-me/preferences-settings'} className='w-1/3 p-4'>
            <Card className='relative'>
              <CardContent className='rounded-xl h-72'>
                <img
                  className='object-cover rounded-md w-full h-full'
                  src='/images/wardrobe5.jpg'
                  alt=''
                />
              </CardContent>

              <Button
                className='w-full absolute bottom-0 rounded-t-none'
                variant='outline'
              >
                Corner Wardrobe
              </Button>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WardrobeType;
