import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";

const WardrobeSearchResult = () => {
  return (
    <div className="w-2/3 px-10">
      <ScrollArea className="h-[500px] w-full rounded-md border p-4">
        <div className="flex justify-start flex-wrap w-full">
          <Link href="#" className="w-1/3 p-2">
            <Card className="relative">
              <CardContent className="rounded-xl h-72">
                <img
                  className="object-cover rounded-md w-full h-full"
                  src="/images/wardrobe.jpg"
                  alt=""
                />
              </CardContent>
            </Card>
          </Link>
          <Link href="#" className="w-1/3 p-2">
            <Card className="relative">
              <CardContent className="rounded-xl h-72">
                <img
                  className="object-cover rounded-md w-full h-full"
                  src="/images/wardrobe4.jpg"
                  alt=""
                />
              </CardContent>
            </Card>
          </Link>
          <Link href="#" className="w-1/3 p-2">
            <Card className="relative">
              <CardContent className="rounded-xl h-72">
                <img
                  className="object-cover rounded-md w-full h-full"
                  src="/images/wardrobe3.jpg"
                  alt=""
                />
              </CardContent>
            </Card>
          </Link>
          <Link href="#" className="w-1/3 p-2">
            <Card className="relative">
              <CardContent className="rounded-xl h-72">
                <img
                  className="object-cover rounded-md w-full h-full"
                  src="/images/wardrobe5.jpg"
                  alt=""
                />
              </CardContent>
            </Card>
          </Link>
          <Link href="#" className="w-1/3 p-2">
            <Card className="relative">
              <CardContent className="rounded-xl h-72">
                <img
                  className="object-cover rounded-md w-full h-full"
                  src="/images/wardrobe6.jpg"
                  alt=""
                />
              </CardContent>
            </Card>
          </Link>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WardrobeSearchResult;
