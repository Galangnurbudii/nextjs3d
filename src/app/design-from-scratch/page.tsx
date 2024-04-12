"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Model, base6Metadata } from "@/components/Base6";
import Room from "@/components/Room";

import { useEffect, useRef, useState } from "react";
import Environments from "@/components/Environments";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  // const [model, setModel] = useState<any[]>([]);
  const insertObject = () => {};
  const model = [<Model />];
  useEffect(() => {
    console.log(model[0].props);
  });

  return (
    <div className="min-h-screen p-4">
      <div className="flex">
        <div className="w-3/4">
          <AspectRatio ratio={16 / 9}>
            <Canvas
              className="border rounded-lg"
              camera={{ position: [0, 100, 200], fov: 90, far: 10000 }}
              shadows
            >
              {/* <axesHelper args={[200]} /> */}
              <color attach="background" args={["black"]} />
              <Room>{model}</Room>

              <Environments direction={[250, 300, 500]} />
              <OrbitControls />
            </Canvas>
          </AspectRatio>
        </div>
        <div className="w-1/4">
          <p className="font-bold text-center text-2xl mb-4">
            Select Furniture
          </p>
          <div className="flex">
            <div className="m-2 w-1/2 hover:cursor-pointer">
              <Card>
                <CardContent className="relative h-56">
                  <Image alt="cabinet" fill src={"/cabinet.webp"} />
                </CardContent>
                <CardFooter>
                  <p>Product Description</p>
                </CardFooter>
              </Card>
            </div>
            <div className="m-2 w-1/2">
              <Card>
                <CardContent className="relative h-56">
                  <Image alt="cabinet" fill src={"/cabinet.webp"} />
                </CardContent>
                <CardFooter>
                  <p>Product Description</p>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Tabs
            className="p-4 w-full"
            defaultValue={Object.keys(base6Metadata)[0]}
          >
            <TabsList
              className={`grid w-full grid-cols-${
                Object.keys(base6Metadata).length
              }`}
            >
              {Object.keys(base6Metadata).map((item) => (
                <TabsTrigger value={item}>{item}</TabsTrigger>
              ))}
            </TabsList>
            {Object.keys(base6Metadata).map((item1, index) => (
              <TabsContent value={item1}>
                <div className="grid grid-cols-2 h-48">
                  {Object.values(base6Metadata)[index].map((item2) => (
                    <Card
                      className="m-2 hover:cursor-pointer"
                      onClick={() => {}}
                    >
                      <CardContent>{item2}</CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
