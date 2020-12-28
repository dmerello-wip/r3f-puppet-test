import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { Physics } from 'use-cannon'
import PicModel from './PicModel'
import Floor from './Floor'
import { OrbitControls  } from 'drei'


export default function App() {
  return (
    <div className="stage">
      <Canvas shadowMap camera={{ position: [0, 0, 5], far: 50 }}>
        <ambientLight intensity={0.3}/>
        <spotLight intensity={1} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        <Physics>
          <Suspense fallback={null}>
            <PicModel />
          </Suspense>
          <Floor position={[0,-3,0]}/>
        </Physics>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
