import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import Loader from "../components/Loader"

import Skatepark from '../models/Skatepark.jsx'
import Sky from "../models/Sky.jsx"
import Skateboard from "../models/Skateboard.jsx"

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */}

const Home = () => {
  const adjustSkateparkForScreenSize = () => {
    let screenScale = null
    let screenPosition = [0, -4.5, -25]
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotation]
  }

  const [skateparkScale, skateparkPosition, rotation] = adjustSkateparkForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
        className="w-full h-screen bg-transparent"
        camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[5, 5, 5]} intensity={5}/>
          <ambientLight intensity={0.5}/>
          <spotLight />
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1}/>

          <Skateboard />
          <Sky />
          <Skatepark
            position={skateparkPosition}
            scale={skateparkScale}
            rotation={rotation}
          />
        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home