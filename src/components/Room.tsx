import { useLoader } from '@react-three/fiber';
import React, { Children } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';

type Props = {
  children?: React.ReactNode;
};

const Room = (props: Props) => {
  const repeat = 5;
  const plaster = useLoader(TextureLoader, [
    'textures/concrete/Concrete_017_basecolor.jpg',
    'textures/concrete/Concrete_017_height.png',
    'textures/concrete/Concrete_017_normal.jpg',
    'textures/concrete/Concrete_017_roughness.jpg',
    'textures/concrete/Concrete_017_ambientOcclusion.jpg',
  ]);
  plaster.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });
  const wood = useLoader(TextureLoader, [
    'textures/wood/Wood_020_basecolor.jpg',
    'textures/wood/Wood_020_height.png',
    'textures/wood/Wood_020_normal.jpg',
    'textures/wood/Wood_020_roughness.jpg',
    'textures/wood/Wood_020_ambientOcclusion.jpg',
  ]);
  wood.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });
  return (
    <group>
      <mesh position={[0, 0, 100]}>{props.children}</mesh>
      <mesh receiveShadow position={[0, 250, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1000, 500]} />

        <meshStandardMaterial
          displacementScale={0}
          map={plaster[0]}
          displacementMap={plaster[1]}
          // normalMap={plaster[2]}
          roughnessMap={plaster[3]}
          aoMap={plaster[4]}
        />
      </mesh>
      <mesh
        receiveShadow
        position={[-500, 250, 250]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[500, 500]} />

        <meshStandardMaterial
          displacementScale={0}
          map={plaster[0]}
          displacementMap={plaster[1]}
          // normalMap={plaster[2]}
          roughnessMap={plaster[3]}
          aoMap={plaster[4]}
        />
      </mesh>
      <mesh
        receiveShadow
        position={[0, 0, 250]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1000, 500]} />
        <meshStandardMaterial
          displacementScale={0}
          map={wood[0]}
          displacementMap={wood[1]}
          normalMap={wood[2]}
          roughnessMap={wood[3]}
          aoMap={wood[4]}
        />
      </mesh>
    </group>
  );
};

export default Room;
