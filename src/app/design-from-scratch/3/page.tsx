'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Model, metadata } from '@/components/BBW110X60X200';
import Room from '@/components/Room';

import { useEffect, useRef, useState } from 'react';
import Environments from '@/components/Environments';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [custom, setCustom] = useState({
    pintu: '',
    handle: '',
    isian: '',
    kaki: '',
  });
  const model = [<Model key='test' {...custom} />];
  useEffect(() => {
    console.log(model[0].props);
  });

  return (
    <div className='min-h-screen p-4'>
      <div className='flex'>
        <div className='w-3/4'>
          <AspectRatio ratio={16 / 9}>
            <Canvas
              className='border rounded-lg'
              camera={{ position: [0, 100, 200], fov: 90, far: 10000 }}
              shadows
            >
              {/* <axesHelper args={[200]} /> */}
              <color attach='background' args={['black']} />
              <Room>{model}</Room>

              <Environments direction={[250, 300, 500]} />
              <OrbitControls />
            </Canvas>
          </AspectRatio>
        </div>
        <div className='w-1/4'>
          <p className='font-bold text-center text-2xl mb-4'>
            Select Furniture
          </p>
          <div className='flex'>
            <div className='m-2 w-1/2 hover:cursor-pointer'>
              <Card>
                <CardContent className='relative h-56'>
                  <Image alt='cabinet' fill src={'/cabinet.webp'} />
                </CardContent>
                <CardFooter>
                  <p>Product Description</p>
                </CardFooter>
              </Card>
            </div>
            <div className='m-2 w-1/2'>
              <Card>
                <CardContent className='relative h-56'>
                  <Image alt='cabinet' fill src={'/cabinet.webp'} />
                </CardContent>
                <CardFooter>
                  <p>Product Description</p>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* <Tabs
            className='p-4 w-full'
            defaultValue={Object.keys(base6Metadata)[0]}
          >
            <TabsList className={`grid w-full grid-cols-4`}>
              {Object.keys(base6Metadata).map((item) => (
                <TabsTrigger key='trigger' value={item}>
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.keys(base6Metadata).map((item1, index) => (
              <TabsContent key={'content'} value={item1}>
                <div className='grid grid-cols-2 h-48'>
                  {Object.values(base6Metadata)[index].map((item2) => (
                    <Card
                      key={'card'}
                      className='m-2 hover:cursor-pointer'
                      onClick={() =>
                        setCustom((prev) => ({ ...prev, [item1]: item2 }))
                      }
                    >
                      <CardContent>{item2}</CardContent>
                    </Card>
                  ))}
                  <Card
                    key={'cardKosong'}
                    className='m-2 hover:cursor-pointer'
                    onClick={() =>
                      setCustom((prev) => ({ ...prev, [item1]: '' }))
                    }
                  >
                    <CardContent>Kosong</CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs> */}

          <p className='font-bold text-center text-2xl mt-4 mb-4'>
            Customization
          </p>
          <div className='m-2 gap-4 grid grid-cols-2'>
            {Object.keys(metadata).map((item, index) => (
              <Card key={item}>
                <CardHeader className='font-bold uppercase text-center'>
                  {item}
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    onValueChange={(e) => {
                      setCustom((prev) => ({ ...prev, [item]: e }));
                    }}
                    defaultValue={''}
                  >
                    {Object.values(metadata)[index].map((item2) => (
                      <div key={item2} className='flex items-center space-x-2'>
                        <RadioGroupItem value={item2} id={item + item2} />
                        <Label htmlFor={item + item2}>{item2}</Label>
                      </div>
                    ))}
                    <div
                      key={item + 'kosong'}
                      className='flex items-center space-x-2'
                    >
                      <RadioGroupItem value={''} id={item + 'kosong'} />
                      <Label htmlFor={item + 'kosong'}>{'kosong'}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
