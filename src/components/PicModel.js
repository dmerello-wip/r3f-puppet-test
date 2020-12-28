import React, { useState, useRef } from 'react'
import {useGLTF, PerspectiveCamera} from 'drei'
import { useBox } from 'use-cannon'

export default function PicModel(props) {
  const { nodes, materials } = useGLTF('/3d/PIC3D-draco.glb');

  const [colors, setColors] = useState({
    skin: '#ff9a78',
    dress: '#223851',
    hairs: '#1e0508'
  });

  materials['SSS White Marble'].color.set(colors.skin);
  materials['Material #4'].color.set(colors.dress);
  materials['Material #2'].color.set(colors.hairs);

  const [ref] = useBox(() => ({ mass: 0, ...props }))
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={nodes.BN_R_Thigh} />
      <primitive object={nodes.BN_SPine_01} />
      <primitive object={nodes.BN_L_Thigh} />
        <mesh
          material={materials['SSS White Marble']}
          geometry={nodes.G_PIC_R_Hand.geometry}
          position={[-0.4, -1, 0]}
        />
        <mesh
          material={materials['SSS White Marble']}
          geometry={nodes.G_PIC_L_Hand.geometry}
          position={[0.4, -1, 0]}
        />
      <mesh
        material={materials['Material #2']}
        geometry={nodes.G_PIC_Hair.geometry}
        position={[0, -0.02, 0]}
        rotation={[-0.1, 0.2, 0]}
        scale={[1, 1, 1]}
      />
      <mesh
        material={materials['Material #2']}
        geometry={nodes.G_PIC_R_Eyebrow.geometry}
        position={[-0.25, 0.26, 0.39]}
        rotation={[1.08, 0.34, 0.46]}
      />
      <mesh
        material={materials['Material #2']}
        geometry={nodes.G_PIC_L_Eyebrow.geometry}
        position={[0.26, 0.26, 0.39]}
        rotation={[1.08, -0.34, 2.68]}
        scale={[1, -1, 1]}
      />
      <mesh
        material={materials['SSS White Marble']}
        geometry={nodes.G_PIC_Head.geometry}
        position={[0, 0, 0]}
        rotation={[0, 0.2, 0]}
      />
      <skinnedMesh
        material={materials['Material #4']}
        geometry={nodes.G_PIC_Body.geometry}
        skeleton={nodes.G_PIC_Body.skeleton}
        position={[0, -0.92, 0]}
        rotation={[0, 0, 0]}
      />
      <mesh
        material={materials['Material #3']}
        geometry={nodes.G_PIC_L_Eye.geometry}
        position={[0.22, 0.15, 0.46]}
        rotation={[1.31, 0, -0.44]}
        scale={[1, 0.43, 1]}
      />
      <mesh
        material={materials['Material #3']}
        geometry={nodes.G_PIC_R_Eye.geometry}
        position={[-0.22, 0.15, 0.46]}
        rotation={[1.31, 0, 0.44]}
      />
      <skinnedMesh
        material={materials['Material #4']}
        geometry={nodes.G_PIC_L_Leg.geometry}
        skeleton={nodes.G_PIC_L_Leg.skeleton}
        position={[0.14, -1.93, 0]}
        rotation={[0, 0, -Math.PI]}
        scale={[1, -1, 1]}
      />
      <skinnedMesh
        material={materials['Material #4']}
        geometry={nodes.G_PIC_R_Leg.geometry}
        skeleton={nodes.G_PIC_R_Leg.skeleton}
        position={[-0.14, -1.93, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
    </group>
  )
}

useGLTF.preload('/3d/PIC3D-draco.glb')
