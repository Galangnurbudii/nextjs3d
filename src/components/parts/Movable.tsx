'use client';

import { useStore } from '@/app/store';
import { PivotControls } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, useFixedJoint } from '@react-three/rapier';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type Props = {
  index: number;
  isSelected: boolean;
  setIsOrbitEnabled: Dispatch<SetStateAction<boolean>>;
} & GroupProps;

export function Movable({
  index,
  children,
  setIsOrbitEnabled,
  position,
  isSelected,
  ...props
}: Props) {
  const obj = useRef<RapierRigidBody>(null);
  const pointer = useRef<RapierRigidBody>(null);
  const [matrix] = useState(() => {
    const initialMatrix = new THREE.Matrix4();
    return initialMatrix;
  });
  const updatePosition = useStore((state) => state.updatePosition);
  const groupRef = useRef<THREE.Group>(null);
  const vec = new THREE.Vector3();
  useEffect(() => {
    const vec = new THREE.Vector3();
    matrix.decompose(vec, new THREE.Quaternion(), new THREE.Vector3());
  });
  useFixedJoint(pointer, obj, [
    [0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0],
    [0, 0, 0, 1],
  ]);
  return (
    <group position={position} ref={groupRef} {...props}>
      <PivotControls
        enabled={isSelected}
        matrix={matrix}
        disableRotations
        disableScaling
        scale={50}
        onDragStart={(props) => {
          setIsOrbitEnabled(false);
        }}
        onDragEnd={() => {
          setIsOrbitEnabled(true);

          let pos = vec.copy(obj.current?.translation() as THREE.Vector3);
          if (groupRef.current) {
            matrix.setPosition(pos.subVectors(pos, groupRef.current?.position));
          } else {
            matrix.setPosition(pos);
          }
          pos = vec.copy(obj.current?.translation() as THREE.Vector3);
          updatePosition(index, [pos.x, pos.y, pos.z]);
          console.log(obj.current?.translation());
        }}
        onDrag={(local, d, w) => {
          const rot = new THREE.Quaternion();
          const scl = new THREE.Vector3();
          w.decompose(vec, rot, scl);
          obj.current?.setRotation(rot, true);
          pointer.current?.setNextKinematicTranslation(vec);
        }}
      />
      <RigidBody
        canSleep={false}
        type={isSelected ? 'kinematicPosition' : 'fixed'}
        ref={pointer}
      />
      <RigidBody
        ccd
        canSleep={false}
        enabledRotations={[false, false, false]}
        ref={obj}
        colliders='cuboid'
        type={isSelected ? undefined : 'fixed'}
      >
        {children}
      </RigidBody>
    </group>
  );
}
