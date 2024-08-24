'use client';
import { useStore } from '@/app/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getModelByKey } from '@/lib/utils';

const CustomizeMenu = ({
  searchParams,
}: {
  searchParams: {
    index: string;
  };
}) => {
  const furnitures = useStore((state) => state.furnitures);
  const updateState = useStore((state) => state.updateCustomization);

  const handleCustomization = (value: string) => {
    const parseVal = JSON.parse(value);

    updateState(parseInt(searchParams.index), {
      [parseVal.key]: parseVal.value,
    });
  };

  const metadata = getModelByKey(furnitures[parseInt(searchParams.index)].key).metadata;
  const customization = furnitures[parseInt(searchParams.index)].customization;
  return (
    <>
      <h1 className='font-semibold text-xl text-neutral-700'>
        What part do you want to customize ?
      </h1>
      <div className='mt-6'>
        <Accordion type='single' collapsible className='w-full'>
          {Object.keys(metadata).map((item, index) => (
            <AccordionItem value={item} key={index}>
              <AccordionTrigger>{item}</AccordionTrigger>
              <AccordionContent>
                <ToggleGroup
                  value={JSON.stringify({
                    key: item,
                    value: (customization as Record<string, string>)[item],
                  })}
                  onValueChange={(value) => {
                    if (!value) {
                      handleCustomization(
                        JSON.stringify({ key: item, value: '' })
                      );
                    } else {
                      handleCustomization(value);
                    }
                  }}
                  type='single'
                >
                  {(metadata[item as keyof typeof metadata] as string[]).map(
                    (item2, index2) => (
                      <ToggleGroupItem
                        value={JSON.stringify({ key: item, value: item2 })}
                        key={index2}
                      >
                        {item2}
                      </ToggleGroupItem>
                    )
                  )}
                </ToggleGroup>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default CustomizeMenu;
