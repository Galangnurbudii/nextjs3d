import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export const InspirationList = () => {
  return (
    <div className="flex justify-center flex-wrap w-full">
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <Image
              className="rounded-md"
              fill
              src="/images/wardrobe.jpg"
              alt=""
            />
          </CardContent>

          <div className="w-full absolute bottom-0 rounded-t-none bg-white py-2 rounded-b-md text-center">
            Kitchen
          </div>
        </Card>
      </Link>
      <Link
        href="#"
        className="w-1/3 p-4 grayscale cursor-not-allowed opacity-50"
      >
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <Image
              className="rounded-md"
              fill
              src="/images/wardrobe4.jpg"
              alt=""
            />
          </CardContent>

          <div className="w-full absolute bottom-0 rounded-t-none bg-white py-2 rounded-b-md text-center">
            WIC
          </div>
        </Card>
      </Link>
    </div>
  );
};
