import React, { useRef } from 'react'
import { usePlane } from 'use-cannon'

export default function Floor(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

  return (
    <mesh ref={ref} >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  )
}

