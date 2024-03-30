import {
  AccumulativeShadows,
  RandomizedLight,
  Environment as EnvironmentImpl,
  useHelper,
} from '@react-three/drei';
import React, { useRef } from 'react';
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  PerspectiveCamera,
} from 'three';

type Props = {
  direction: [number, number, number];
};

const Environments = ({ direction }: Props) => {
  const dirLight = useRef<DirectionalLight>(null);
  const shadowCameraRef = useRef<PerspectiveCamera>(null);
  // useHelper(dirLight, DirectionalLightHelper, 5, 'red');
  // useHelper(shadowCameraRef, CameraHelper);
  return (
    <>
      <directionalLight position={direction} intensity={5} castShadow>
        <perspectiveCamera ref={shadowCameraRef} attach='shadow-camera' />
      </directionalLight>
      <directionalLight
        position={[-5, 5, 5]}
        intensity={0.1}
        shadow-mapSize={128}
        castShadow
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.1}
        shadow-mapSize={128}
        castShadow
      />
      <directionalLight
        position={[0, 5, 0]}
        intensity={0.1}
        shadow-mapSize={128}
        castShadow
      />
      {/* <AccumulativeShadows
        frames={100}
        alphaTest={0.85}
        opacity={0.75}
        scale={30}
        position={[0, -1.5, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={2.5}
          ambient={0.5}
          intensity={1}
          position={direction}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      <EnvironmentImpl preset='city' />
    </>
  );
};

export default Environments;
