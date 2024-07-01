"use client";

import RoomMap from "@/components/parts/RoomMap";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

const DesignFromScratches = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-2/3 p-5">
        <RoomMap />
      </div>
      <div className="w-1/3 pr-5 py-5 h-full flex flex-col">
        <div className="bg-neutral-100 h-20 px-6 py-4 rounded-lg flex justify-between items-center">
          <h1 className="font-semibold text-xl text-neutral-700">
            Rp. 10.000.000,00
          </h1>
          <Link href={"/summary"}>
            <Button
              variant="default"
              className="bg-neutral-700 rounded-full px-5"
            >
              {"Finalizing ->"}
            </Button>
          </Link>
        </div>
        <div className="p-8 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default DesignFromScratches;
