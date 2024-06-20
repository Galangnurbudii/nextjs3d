import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { MdInfoOutline } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { HTMLAttributes } from 'react';

type ItemProps = {
  image: string;
  name: string;
  price: number;
  information: string;
} & HTMLAttributes<HTMLDivElement>;

const Item = ({ image, name, price, information, ...props }: ItemProps) => {
  return (
    <div
      {...props}
      className='w-1/2 p-3 cursor-pointer hover:bg-neutral-100 rounded-md'
    >
      <img className='rounded-md' src={image} alt='' />
      <div className='flex justify-between items-center mt-2'>
        <div>
          <p className='text-xs text-neutral-600 font-bold'>{name}</p>
          <h1 className='text-sm text-neutral-400'>{`Rp. ${price}, 00`}</h1>
        </div>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' className='rounded-full p-1'>
                <MdInfoOutline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className='w-[150px] p-1'>
                <img className='rounded-md mb-2' src={image} alt='' />
                <p className='text-xs text-neutral-600 font-semibold'>{name}</p>
                <p className='text-xs text-neutral-400'>{information}</p>
                <h1 className='text-md text-neutral-600'>{`Rp. ${price},00`}</h1>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Item;
