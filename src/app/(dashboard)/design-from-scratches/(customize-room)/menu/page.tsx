import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MdOutlineFilterFrames } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { MdOutlineDoorSliding } from "react-icons/md";
import { GiDoorHandle } from "react-icons/gi";

const CustomizeMenu = () => {
  return (
    <>
      <h1 className="font-semibold text-xl text-neutral-700">
        What part do you want to customize ?
      </h1>
      <div className="mt-6">
        <Link href={"/design-from-scratches/frame"} prefetch={false}>
          <div className="flex justify-between items-center p-5 text-lg">
            <div className="flex gap-3 items-center">
              <MdOutlineFilterFrames />
              <h1>Rangka</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Separator />
        <Link href={"#"}>
          <div className="flex justify-between items-center p-5 text-lg">
            <div className="flex gap-3 items-center">
              <RiArchiveDrawerLine />
              <h1>Interior</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Separator />
        <Link href={"#"}>
          <div className="flex justify-between items-center p-5 text-lg">
            <div className="flex gap-3 items-center">
              <MdOutlineDoorSliding />
              <h1>Bagian Depan</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Separator />
        <Link href={"#"}>
          <div className="flex justify-between items-center p-5 text-lg">
            <div className="flex gap-3 items-center">
              <MdOutlineFilterFrames />
              <h1>Rangka</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Separator />
        <Link href={"#"}>
          <div className="flex justify-between items-center p-5 text-lg">
            <div className="flex gap-3 items-center">
              <GiDoorHandle />
              <h1>Gagang</h1>
            </div>
            <IoIosArrowForward />
          </div>
        </Link>
        <Separator />
      </div>
    </>
  );
};

export default CustomizeMenu;
