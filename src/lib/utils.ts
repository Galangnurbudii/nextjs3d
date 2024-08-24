import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import kitchenModels from '@/components/kitchen';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getModelByKey(key: string) {
  return kitchenModels.filter((item) => item.key === key)[0];
}
