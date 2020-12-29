import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from 'use-cannon'
import PicModel from './PicModel'
import Floor from './Floor'
import DefaultCamera from './Camera'


export default function Stage() {

  const ambientColor = '#d67a0c';


  return (
    <div className="stage">
      <Canvas shadowMap>
        <ambientLight intensity={0.3}/>
        <fog attach="fog" args={[ambientColor, 0, 25]} />
        <spotLight intensity={0.8} position={[30, 30, 70]} angle={0.1} penumbra={1} castShadow />
        <Physics>
          <Suspense fallback={null}>
            <PicModel />
          </Suspense>
          <Floor position={[0,-4,0]}/>
        </Physics>
        <DefaultCamera/>
      </Canvas>
    </div>
  )
}
