import React, { useEffect, useRef } from 'react'
import skateboardScene from '../assets/3d/skate.glb'
import { useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'

const Skateboard = () => {
  const { scene, animations } = useGLTF(skateboardScene)

  const boardRef = useRef();
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const speedX = useRef(0.0);
  const speedY = useRef(0.0);
  const dampingFactor = 0.95;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      speedX.current = -0.0002
    }
    if (e.key === 'ArrowRight') {
      speedX.current = 0.0002
    }
    if (e.key === 'ArrowUp') {
      speedY.current = 0.0002
    }
    if (e.key === 'ArrowDown') {
      speedY.current = -0.0002
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      speedX.current = 0
    }
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      speedY.current = 0
    }
  };


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gl, handleKeyDown, handleKeyUp])

  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.position.y += speedY.current;
      boardRef.current.position.x += speedX.current;
    }
  })

  return (
    <mesh ref={boardRef} position={[0, -0.2, 4]} scale={[.5,.5,.5]}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Skateboard