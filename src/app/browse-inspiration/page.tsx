'use client';
import { InspirationList } from '@/components/parts/InspirationList';
import React from 'react';

const BrowseInspiration = () => {
  return (
    <div className='p-5 flex flex-col items-center mt-14'>
      <h1 className='text-3xl font-semibold'>Browse Inspiration</h1>
      <h6 className='font-light text-sm text-gray-400 mt-2'>
        Browse wardrobe designs for inspiration
      </h6>
      <div className='mt-12 w-full'>
        <InspirationList />
      </div>
    </div>
  );
};

export default BrowseInspiration;
