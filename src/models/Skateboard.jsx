import React from 'react'
import skateboardScene from '../assets/3d/skate.glb'
import { useGLTF } from '@react-three/drei'

const Skateboard = () => {
  const { scene, animations } = useGLTF(skateboardScene)
  return (
    <mesh position={[0, -0.2, 4]} scale={[.5,.5,.5]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Skateboard