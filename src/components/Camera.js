import React, {useRef, useEffect} from 'react'
import {PerspectiveCamera, OrbitControls} from 'drei'
import {TweenMax, Power2} from 'gsap';

export default function DefaultCamera(props) {

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      let cameraPos = {
        x: ref.current.position.x,
        y: ref.current.position.y,
        z: ref.current.position.z,
      };
      TweenMax.from(cameraPos,2, {
        x: -8,
        y: 0,
        z: 10,
        ease: Power2.easeOut,
        onUpdate: () => {
          ref.current.position.x = cameraPos.x;
          ref.current.position.y = cameraPos.y;
          ref.current.position.z = cameraPos.z;
        }
      });
    }
  }, []);

  return (
    <>
    {/*<OrbitControls/>*/}
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={[0, -2.5, 5]}
      rotation={[0, 0, 0]}
      far={50}
    />
    </>
  )
}

