import { ReactNode } from 'react';

export type Furniture = {
  key: string;
  customization: Record<string, string> | {};
  position: [x: number, y: number, z: number];
};

export type FurnitureModel = {
  metadata: Record<string, string[]> | {};
  key: string;
  Model: () => JSX.Element;
};
