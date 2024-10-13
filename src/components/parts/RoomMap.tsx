'use client';
import { useStore } from '@/app/store';
import { getModelByKey } from '@/lib/utils';
import {
  OrbitControls,
  PivotControls,
  Select,
} from '@react-three/drei';
import {
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { Canvas, useLoader } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Movable } from './Movable';

const getParent = (mesh: THREE.Object3D): THREE.Object3D | null => {
  if (!mesh) return null;
  if (Object.keys(mesh.userData)[0] === 'furniture_id') {
    return mesh;
  }
  if (!mesh.parent) return null;

  if (mesh.parent instanceof THREE.Object3D) {
    return getParent(mesh.parent);
  }

  return null;
};

const RoomMap = () => {
  const router = useRouter();
  const furnitures = useStore((state) => state.furnitures);

  const repeat = 3;
  const plaster = useLoader(TextureLoader, [
    '/textures/plaster/Plaster_002_COLOR.jpg',
    '/textures/plaster/Plaster_002_DISP.png',
    '/textures/plaster/Plaster_002_NORM.jpg',
    '/textures/plaster/Plaster_002_ROUGH.jpg',
    '/textures/plaster/Plaster_002_OCC.jpg',
  ]);
  const wood = useLoader(TextureLoader, [
    '/textures/wood/Wood_Floor_012_basecolor.jpg',
    '/textures/wood/Wood_Floor_012_height.png',
    '/textures/wood/Wood_Floor_012_normal.jpg',
    '/textures/wood/Wood_Floor_012_roughness.jpg',
    '/textures/wood/Wood_Floor_012_ambientOcclusion.jpg',
  ]);

  const firstLoad = useRef<boolean>(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    }
  }, []);
  wood.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });
  plaster.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });

  const [selected, setSelected] = useState<number>();
  const handleSelect = (meshs: THREE.Object3D[]) => {
    const parent = getParent(meshs[0]);
    if (!parent) {
      setSelected(undefined);
      router.push('/design-from-scratches/frame');
      return;
    }

    setSelected(parent.userData.furniture_id);

    router.push(
      `/design-from-scratches/menu?index=${parent.userData.furniture_id}`
    );
    return;
  };

  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const boxesRef = useRef<(THREE.Box3 | null)[]>([]);
  const setMeshRef = (index: number) => (el: THREE.Mesh | null) => {
    meshesRef.current[index] = el;
    boxesRef.current[index] = new THREE.Box3(
      new THREE.Vector3(),
      new THREE.Vector3()
    );
  };

  const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(true);

  return (
    <Canvas camera={{ position: [50, 50, 200] }} shadows  className='rounded-lg'>
      <Suspense>
        <ambientLight intensity={4} position={[0, 0, 0]} />
        <directionalLight
          castShadow
          position={[20, 50, 10]}
          intensity={6}
          color={'#ffffff'}
        />
        <SpotLightComponent />
        <directionalLight position={[-50, 0, -25]} intensity={2} />
        {/* <axesHelper args={[200]} /> */}
        <color attach='background' args={['#949494']} />
        <Physics debug timeStep='vary'>
          <mesh>
            <Select
              multiple={false}
              box
              onChangePointerUp={handleSelect}
              filter={(items) => items}
            >
              {furnitures.map((item, index) => {
                const Model = getModelByKey(item.key);
                return (
                  <Movable
                    index={index}
                    isSelected={selected === index}
                    key={item.key + index}
                    position={firstLoad.current ? item.position : undefined}
                    setIsOrbitEnabled={setIsOrbitEnabled}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      ref={setMeshRef(index)}
                      userData={{ furniture_id: index }}
                    >
                      <Model.Model {...item.customization} />
                    </mesh>
                  </Movable>
                );
              })}
            </Select>
            <RigidBody colliders='hull' type='fixed'>
              <mesh
                castShadow
                receiveShadow
                position={[200, 250, -250]}
                rotation={[0, 0, 0]}
              >
                <boxGeometry args={[500, 500, 10]} />
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
                castShadow
                receiveShadow
                position={[-50, 250, 0]}
                rotation={[0, Math.PI / 2, 0]}
              >
                <boxGeometry args={[500, 500, 10]} />
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
                castShadow
                receiveShadow
                position={[200, -6, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <boxGeometry args={[500, 500, 10]} />
                <meshStandardMaterial
                  displacementScale={0}
                  map={wood[0]}
                  displacementMap={wood[1]}
                  normalMap={wood[2]}
                  roughnessMap={wood[3]}
                  aoMap={wood[4]}
                />
              </mesh>
            </RigidBody>
          </mesh>
        </Physics>
        <OrbitControls enabled={isOrbitEnabled} />
      </Suspense>
    </Canvas>
  );
};

export default RoomMap;

const SpotLightComponent = () => {
  const stopLightRef = useRef<THREE.SpotLight>(null!);
  // useHelper(stopLightRef, THREE.SpotLightHelper, 'cyan');
  return (
    <spotLight
      ref={stopLightRef}
      position={[300, 200, 0]}
      angle={0.5}
      penumbra={1}
      decay={0}
      intensity={Math.PI * 5}
      castShadow
    />
  );
};
