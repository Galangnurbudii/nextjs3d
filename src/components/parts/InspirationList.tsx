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

export const InspirationList = () => {
  return (
    <div className="flex justify-center flex-wrap w-full">
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Arsa Wardrobe
          </Button>
        </Card>
      </Link>
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe4.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Kiran Wardrobe
          </Button>
        </Card>
      </Link>
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe3.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Kala Wardrobe
          </Button>
        </Card>
      </Link>
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe6.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Test Wardrobe
          </Button>
        </Card>
      </Link>
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe5.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Abc Wardrobe
          </Button>
        </Card>
      </Link>
      <Link href="#" className="w-1/3 p-4">
        <Card className="relative">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe2.jpg"
              alt=""
            />
          </CardContent>

          <Button
            className="w-full absolute bottom-0 rounded-t-none"
            variant="outline"
          >
            Def Wardrobe
          </Button>
        </Card>
      </Link>
    </div>
  );
};
