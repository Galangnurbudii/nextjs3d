import Item from "@/components/parts/Item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const Frame = () => {
  return (
    <div className="h-full">
      <div className="flex gap-6 items-center font-semibold text-xl text-neutral-700">
        <Link href={"/design-from-scratches/menu"}>
          <IoArrowBackOutline />
        </Link>
        <h1>Frame</h1>
      </div>

      <ScrollArea className="h-[700px] mt-6">
        <h1 className="font-semibold">Kitchen</h1>
        <div className="flex flex-wrap">
          <Item
            name="HOKKSUND"
            information="Base Atas"
            image="/images/items/(Base) BAK 040X38X40.png"
            price={1000000}
          />
          <Item
            name="MEHAMN"
            information="Base Atas"
            image="/images/items/(Base) BAK 040X38X104.png"
            price={1500000}
          />
          <Item
            name="SVARTSIDAL"
            information="Base Atas"
            image="/images/items/(Base) BAK 090X38X40.png"
            price={3000000}
          />
          <Item
            name="TJORHOMN"
            information="Base Atas"
            image="/images/items/(Base) BAK 090X38X104.png"
            price={400000}
          />
          <Item
            name="BAGANAS"
            information="Base Atas"
            image="/images/items/(Base) BBK 020X60X85.png"
            price={2500000}
          />
          <Item
            name="KOMPLEMENT"
            information="Base Atas"
            image="/images/items/(Base) BBK 020X60X85.png"
            price={4500000}
          />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

export default Frame;
