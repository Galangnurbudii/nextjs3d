import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

const RoomMap = () => {
  const repeat = 3;
  const plaster = useLoader(TextureLoader, [
    "/textures/plaster/Plaster_002_COLOR.jpg",
    "/textures/plaster/Plaster_002_DISP.png",
    "/textures/plaster/Plaster_002_NORM.jpg",
    "/textures/plaster/Plaster_002_ROUGH.jpg",
    "/textures/plaster/Plaster_002_OCC.jpg",
  ]);
  plaster.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });

  const wood = useLoader(TextureLoader, [
    "/textures/wood/Wood_Floor_012_basecolor.jpg",
    "/textures/wood/Wood_Floor_012_height.png",
    "/textures/wood/Wood_Floor_012_normal.jpg",
    "/textures/wood/Wood_Floor_012_roughness.jpg",
    "/textures/wood/Wood_Floor_012_ambientOcclusion.jpg",
  ]);
  wood.map((item) => {
    item.wrapS = THREE.RepeatWrapping;
    item.wrapT = THREE.RepeatWrapping;
    item.repeat.set(repeat, repeat);
  });

  return (
    <Canvas camera={{ position: [50, 50, 200] }} shadows className="rounded-lg">
      <ambientLight intensity={4} position={[0, 0, 0]} />
      <directionalLight
        castShadow
        position={[20, 50, 10]}
        intensity={6}
        color={"#ffffff"}
      />
      <directionalLight position={[-50, 0, -25]} intensity={2} />
      <axesHelper args={[200]} />
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
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default RoomMap;
