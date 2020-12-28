import React, { useState, useEffect, useRef } from 'react'
import { useGLTF } from 'drei'
import { useBox } from 'use-cannon'
import { useFrame } from "react-three-fiber"
import { TweenMax, Strong, Power2 } from "gsap";


export default function PicModel(props) {
  const { nodes, materials } = useGLTF('/3d/PIC3D-draco.glb');

  const [colors, setColors] = useState({
    skin: '#ff9a78',
    dress: '#223851',
    hairs: '#1e0508'
  });

  useEffect(()=>{
    // set initial colors to model materials (i don't like native ones)
    materials['SSS White Marble'].color.set(colors.skin);
    materials['Material #4'].color.set(colors.dress);
    materials['Material #2'].color.set(colors.hairs);
  }, []);

  const [ref, api] = useBox(() => ({ mass: 0.5, args:[1,3.85,1], ...props }));
  const HandRightRef = useRef();
  const HandLeftRef = useRef();
  const HeadRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Head constant animation
    HeadRef.current.rotation.z =  (Math.sin(t) / 6);
  });

  const hitHandler = ()=>{
    // all the model jumps
    api.velocity.set(0, 4, 0);
    // hands moving
    handsAnimation();
  };

  const handsAnimation = () => {
    let handsPos = {
      x : HandLeftRef.current.position.x,
      y : HandLeftRef.current.position.y,
    };
    let handsAni = TweenMax.to(handsPos, 0.5, {
      x : 0.7,
      y : -0.5,
      ease: Power2.easeOut,
      onUpdate: () => {
        // left hand
        HandLeftRef.current.position.x = handsPos.x;
        HandLeftRef.current.position.y = handsPos.y;
        // rigth hand
        HandRightRef.current.position.x = -handsPos.x;
        HandRightRef.current.position.y = handsPos.y;
      },
      onComplete: () => {
        handsAni.reverse();
      }
    });
  };

  return (
    <group ref={ref} onClick={hitHandler}>
      <primitive object={nodes.BN_R_Thigh} />
      <primitive object={nodes.BN_SPine_01} />
      <primitive object={nodes.BN_L_Thigh} />
        <mesh
          ref={HandRightRef}
          castShadow
          material={materials['SSS White Marble']}
          geometry={nodes.G_PIC_R_Hand.geometry}
          position={[-0.4, -1, 0]}
        />
        <mesh
          ref={HandLeftRef}
          castShadow
          material={materials['SSS White Marble']}
          geometry={nodes.G_PIC_L_Hand.geometry}
          position={[0.4, -1, 0]}
        />
      <group ref={HeadRef} >
        <mesh
          castShadow
          material={materials['Material #2']}
          geometry={nodes.G_PIC_Hair.geometry}
          position={[0, -0.02, 0]}
          rotation={[-0.1, 0.2, 0]}
          scale={[1, 1, 1]}
        />
        <mesh
          castShadow
          material={materials['Material #2']}
          geometry={nodes.G_PIC_R_Eyebrow.geometry}
          position={[-0.25, 0.26, 0.39]}
          rotation={[1.08, 0.34, 0.46]}
        />
        <mesh
          castShadow
          material={materials['Material #2']}
          geometry={nodes.G_PIC_L_Eyebrow.geometry}
          position={[0.26, 0.26, 0.39]}
          rotation={[1.08, -0.34, 2.68]}
          scale={[1, -1, 1]}
        />
        <mesh
          castShadow
          material={materials['SSS White Marble']}
          geometry={nodes.G_PIC_Head.geometry}
          position={[0, 0, 0]}
          rotation={[0, 0.2, 0]}
        />
        <mesh
          castShadow
          material={materials['Material #3']}
          geometry={nodes.G_PIC_L_Eye.geometry}
          position={[0.22, 0.15, 0.46]}
          rotation={[1.31, 0, -0.44]}
          scale={[1, 0.43, 1]}
        />
        <mesh
          castShadow
          material={materials['Material #3']}
          geometry={nodes.G_PIC_R_Eye.geometry}
          position={[-0.22, 0.15, 0.46]}
          rotation={[1.31, 0, 0.44]}
        />
      </group>
      <skinnedMesh
        castShadow
        material={materials['Material #4']}
        geometry={nodes.G_PIC_Body.geometry}
        skeleton={nodes.G_PIC_Body.skeleton}
        position={[0, -0.92, 0]}
        rotation={[0, 0, 0]}
      />
      <skinnedMesh
        castShadow
        material={materials['Material #4']}
        geometry={nodes.G_PIC_L_Leg.geometry}
        skeleton={nodes.G_PIC_L_Leg.skeleton}
        position={[0.14, -1.93, 0]}
        rotation={[0, 0, -Math.PI]}
        scale={[1, -1, 1]}
      />
      <skinnedMesh
        castShadow
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
