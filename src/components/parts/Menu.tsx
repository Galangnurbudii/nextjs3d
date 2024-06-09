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

const Menu = () => {
  return (
    <div className="text-center mb-4 p-6 py-10 bg-neutral-100">
      <div className="flex justify-center gap-4">
        <Card className="w-full p-2">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-md w-full h-full"
              src="/images/wardrobe5.jpg"
              alt=""
            />
          </CardContent>
          <CardFooter className="mt-2">
            <Link className="w-full" href={"/guide-me"}>
              <Button className="w-full" variant="outline">
                Guide Me
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-full p-2">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-t-md w-full h-full"
              src="/images/wardrobe6.jpg"
              alt=""
            />
          </CardContent>
          <CardFooter className="mt-2">
            <Button className="w-full" variant="outline">
              Design from Scratch
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full p-2">
          <CardContent className="rounded-xl h-72">
            <img
              className="object-cover rounded-t-md w-full h-full"
              src="/images/wardrobe2.jpg"
              alt=""
            />
          </CardContent>
          <CardFooter className="mt-2">
            <Link className="w-full" href={"/browse-inspiration"}>
              <Button className="w-full" variant="outline">
                Browse Inspiration
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Menu;
