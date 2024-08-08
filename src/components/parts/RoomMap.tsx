'use client';
import { useStore } from '@/app/store';
import { DragControls, Helper, OrbitControls, Select } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const getMetadata = (mesh: THREE.Object3D): THREE.Object3D | null => {
  if (!mesh) return null;
  if (Object.keys(mesh.userData)[0] === 'furniture_id') {
    return mesh;
  }
  if (!mesh.parent) return null;

  if (mesh.parent instanceof THREE.Object3D) {
    return getMetadata(mesh.parent);
  }

  return null;
};

const RoomMap = () => {
  const router = useRouter();
  const furnitures = useStore((state: any) => state.furnitures);
  console.log(furnitures);

  const repeat = 3;
  const plaster = useLoader(TextureLoader, [
    '/textures/plaster/Plaster_002_COLOR.jpg',
    '/textures/plaster/Plaster_002_DISP.png',
    '/textures/plaster/Plaster_002_NORM.jpg',
    '/textures/plaster/Plaster_002_ROUGH.jpg',
    '/textures/plaster/Plaster_002_OCC.jpg',
  ]);
  plaster.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });

  const wood = useLoader(TextureLoader, [
    '/textures/wood/Wood_Floor_012_basecolor.jpg',
    '/textures/wood/Wood_Floor_012_height.png',
    '/textures/wood/Wood_Floor_012_normal.jpg',
    '/textures/wood/Wood_Floor_012_roughness.jpg',
    '/textures/wood/Wood_Floor_012_ambientOcclusion.jpg',
  ]);
  wood.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });
  const [selected, setSelected] = useState<any[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [nextPosition, setNextPosition] = useState<number>(currentPosition);

  const handleSelect = (meshs: THREE.Object3D[]) => {
    const parent = getMetadata(meshs[0]);
    if (!parent) {
      router.push('/design-from-scratches/frame');
      return;
    }
    router.push(
      `/design-from-scratches/menu?index=${parent.userData.furniture_id}`
    );
    console.log(furnitures);
    return;
  };

  const [positions, setPositions] = useState<number[]>([]);
  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);

  useEffect(() => {
    const calculatePositions = () => {
      let accumulatedX = 0;
      const newPositions = furnitures.map((item: any, index: number) => {
        let currentWidth = 0;
        if (meshesRef.current[index]) {
          const bbox = new THREE.Box3().setFromObject(
            meshesRef.current[index] as THREE.Object3D
          );
          const bboxSize = new THREE.Vector3();
          currentWidth = bbox.getSize(bboxSize).x;
        }
        const position = accumulatedX;
        accumulatedX += currentWidth;
        return position;
      });
      setPositions(newPositions);
    };

    calculatePositions();
  }, [furnitures]);

  const setMeshRef = (index: number) => (el: THREE.Mesh | null) => {
    meshesRef.current[index] = el;
  };

  const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(true);

  return (
    <Canvas camera={{ position: [50, 50, 200] }} shadows className='rounded-lg'>
      <ambientLight intensity={4} position={[0, 0, 0]} />
      <directionalLight
        castShadow
        position={[20, 50, 10]}
        intensity={6}
        color={'#ffffff'}
      />
      <directionalLight position={[-50, 0, -25]} intensity={2} />
      {/* <axesHelper args={[200]} /> */}
      <color attach='background' args={['#949494']} />

      <mesh>
        <Select box onChangePointerUp={handleSelect} filter={(items) => items}>
          {furnitures.map((item: any, index: number) => (
            <DragControls
              key={index}
              axisLock='y'
              dragLimits={[[-50, 100], [0,0], [0,100]]}
              onDragStart={() => {
                setIsOrbitEnabled(false);
              }}
              onDragEnd={() => {
                setIsOrbitEnabled(true);
              }}
            >
              <mesh
                ref={setMeshRef(index)}
                userData={{ furniture_id: index }}
                position={[positions[index] || 0, 0, 100]}
              >
                <item.Model {...item.customization} />
              </mesh>
            </DragControls>
          ))}
        </Select>
        <mesh
          position={[200, 250, 0]}
          rotation={[0, 0, 0]}
          scale={[500, 500, 500]}
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
          position={[-50, 250, 250]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[500, 500, 500]}
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
          position={[200, 0, 250]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[500, 500, 500]}
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
      </mesh>

      <OrbitControls enabled={isOrbitEnabled} />
    </Canvas>
  );
};

export default RoomMap;
