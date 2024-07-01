"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { Model } from "@/components/Base6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Home() {
  const repeat = 3;
  const plaster = useLoader(TextureLoader, [
    "textures/plaster/Plaster_002_COLOR.jpg",
    "textures/plaster/Plaster_002_DISP.png",
    "textures/plaster/Plaster_002_NORM.jpg",
    "textures/plaster/Plaster_002_ROUGH.jpg",
    "textures/plaster/Plaster_002_OCC.jpg",
  ]);
  plaster.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });
  const wood = useLoader(TextureLoader, [
    "textures/wood/Wood_Floor_012_basecolor.jpg",
    "textures/wood/Wood_Floor_012_height.png",
    "textures/wood/Wood_Floor_012_normal.jpg",
    "textures/wood/Wood_Floor_012_roughness.jpg",
    "textures/wood/Wood_Floor_012_ambientOcclusion.jpg",
  ]);
  wood.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });

  const [pintu, setPintu] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [isian, setIsian] = useState<string>("");
  const [kaki, setKaki] = useState<string>("");

  return (
    <div className="w-screen h-screen">
      <div className="z-10 flex p-4 justify-center gap-4">
        <Select
          onValueChange={(e) => {
            setPintu(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pintu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pintu1">Pintu 1</SelectItem>
            <SelectItem value="pintu2">Pintu 2</SelectItem>
            <SelectItem value="pintu3">Pintu 3</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setHandle(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Handle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Handle_2_1">Handle 1</SelectItem>
            <SelectItem value="Handle_4_1">Handle 2</SelectItem>
            <SelectItem value="Handle_3_1">Handle 3</SelectItem>
            <SelectItem value="Handle_5__knob_1">Handle 4</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setIsian(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Isian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Appliances_2_1">Isian 1</SelectItem>
            <SelectItem value="Ambalan_1_1">Isian 2</SelectItem>
            <SelectItem value="Ambalan_2_1">Isian 3</SelectItem>
            <SelectItem value="Appliances_1_1">Isian 4</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(e) => {
            setKaki(e);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kaki" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CB8_1">Kaki 1</SelectItem>
            <SelectItem value="CB2_1">Kaki 2</SelectItem>
            <SelectItem value="CB1_1">Kaki 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Canvas camera={{ position: [50, 50, 200] }} shadows>
        <ambientLight intensity={4} position={[0, 0, 0]} />
        <directionalLight
          castShadow
          position={[20, 50, 10]}
          intensity={6}
          color={"#ffffff"}
        />
        <directionalLight position={[-50, 0, -25]} intensity={2} />
        {/* <axesHelper args={[200]} /> */}
        <color attach="background" args={["#949494"]} />
        <mesh>
          <mesh
            position={[50, 100, -100]}
            rotation={[0, 0, 0]}
            scale={[200, 200, 200]}
          >
            <planeGeometry />

            <meshStandardMaterial
              displacementScale={0}
              map={plaster[0]}
              displacementMap={plaster[1]}
              normalMap={plaster[2]}
              roughnessMap={plaster[3]}
              aoMap={plaster[4]}
            />
          </mesh>
          <mesh
            position={[-50, 100, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[200, 200, 200]}
          >
            <planeGeometry />

            <meshStandardMaterial
              displacementScale={0}
              map={plaster[0]}
              displacementMap={plaster[1]}
              normalMap={plaster[2]}
              roughnessMap={plaster[3]}
              aoMap={plaster[4]}
            />
          </mesh>
          <mesh
            receiveShadow
            position={[50, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[200, 200, 200]}
          >
            <planeGeometry />

            <meshStandardMaterial
              displacementScale={0}
              map={wood[0]}
              displacementMap={wood[1]}
              normalMap={wood[2]}
              roughnessMap={wood[3]}
              aoMap={wood[4]}
            />
          </mesh>
          <mesh castShadow scale={1}>
            <Model pintu={pintu} handle={handle} isian={isian} kaki={kaki} />
          </mesh>
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function Room() {}
