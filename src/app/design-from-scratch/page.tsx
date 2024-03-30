'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Model } from '@/components/Base6';
import Room from '@/components/Room';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import Environments from '@/components/Environments';

export default function Home() {
  const [pintu, setPintu] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [isian, setIsian] = useState<string>('');
  const [kaki, setKaki] = useState<string>('');

  return (
    <div className='h-screen'>
      <div className='absolute z-10 flex p-4 justify-center gap-4'>
        <Select
          onValueChange={(e) => {
            setPintu(e);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Pintu' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pintu1'>Pintu 1</SelectItem>
            <SelectItem value='pintu2'>Pintu 2</SelectItem>
            <SelectItem value='pintu3'>Pintu 3</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setHandle(e);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Handle' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Handle_2_1'>Handle 1</SelectItem>
            <SelectItem value='Handle_4_1'>Handle 2</SelectItem>
            <SelectItem value='Handle_3_1'>Handle 3</SelectItem>
            <SelectItem value='Handle_5__knob_1'>Handle 4</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setIsian(e);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Isian' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Appliances_2_1'>Isian 1</SelectItem>
            <SelectItem value='Ambalan_1_1'>Isian 2</SelectItem>
            <SelectItem value='Ambalan_2_1'>Isian 3</SelectItem>
            <SelectItem value='Appliances_1_1'>Isian 4</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setKaki(e);
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Kaki' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='CB8_1'>Kaki 1</SelectItem>
            <SelectItem value='CB2_1'>Kaki 2</SelectItem>
            <SelectItem value='CB1_1'>Kaki 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Canvas camera={{ position: [0, 100, 200], fov: 90, far: 10000 }} shadows>
        {/* <axesHelper args={[200]} /> */}
        <color attach='background' args={['lightpink']} />
        <Room>
          <Model pintu={pintu} handle={handle} isian={isian} kaki={kaki} />
        </Room>

        <Environments direction={[250, 300, 500]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
