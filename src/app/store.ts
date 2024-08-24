import { Furniture, FurnitureModel } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type FurnitureState = {
  furnitures: Furniture[];
  pushModel: (furniture: Furniture) => void;
  updateCustomization: (
    index: number,
    newCustomization: { [key: string]: string }
  ) => void;
  updatePosition: (
    index: number,
    position: [x: number, y: number, z: number]
  ) => void;
};

export const useStore = create<FurnitureState>()(
  persist(
    (set) => ({
      furnitures: [],
      pushModel: (item) =>
        set((state) => ({
          furnitures: [...state.furnitures, item],
        })),
      updateCustomization: (index: number, newCustomization) =>
        set((state) => {
          const updatedFurnitures = state.furnitures.map((furniture, i) => {
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
          });
          return {
            ...state,
            furnitures: updatedFurnitures,
          };
        }),
      updatePosition: (index, position) =>
        set((state) => {
          const updatedPosition = state.furnitures.map((furniture, i) => {
            if (i === index) {
              return {
                ...furniture,
                position: position,
              };
            }
            return furniture;
          });
          return {
            ...state,
            furnitures: updatedPosition,
          };
        }),
    }),
    {
      name: 'project-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
