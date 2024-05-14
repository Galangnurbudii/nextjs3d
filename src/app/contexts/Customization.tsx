import { createContext, useContext, useState } from 'react';
import { defaultValue } from './default';

type customizationProps = {
  customization: any[];
  updateCustomization: (c: any) => void;
};

const customizationContext = createContext<customizationProps>({
  customization: [],
  updateCustomization: (c) => [],
});

export const CustomizationProvider = (props: any) => {
  const [customization, setCustomization] = useState<
    customizationProps['customization']
  >([]);

  const updateCustomization = (c: any) =>
    setCustomization((prev) => [...prev, c]);

  return (
    <customizationContext.Provider
      value={{
        customization,
        updateCustomization,
      }}
    >
      {props.children}
    </customizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(customizationContext);
  return context;
};
