import { Base6, base6Metadata } from '@/components/Base6';
import { create } from 'zustand';

interface FurnitureState {}

export const useStore = create((set: any) => ({
  furnitures: [],
  pushModel: (item: any) =>
    set((state: any) => ({
      furnitures: [...state.furnitures, item],
    })),
  updateCustomization: (index: number, newCustomization: any) =>
    set((state: any) => {
      // Create a new array with the updated customization
      const updatedFurnitures = state.furnitures.map(
        (furniture: any, i: number) => {
          if (i === index) {
            return {
              ...furniture,
              customization: {
                ...furniture.customization,
                ...newCustomization,
              },
            };
          }
          return furniture;
        }
      );

      // Return the new state
      return {
        ...state,
        furnitures: updatedFurnitures,
      };
    }),
}));
