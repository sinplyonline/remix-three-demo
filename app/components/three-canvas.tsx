
import React, { useRef, useState } from "react"
import { TextureLoader, MathUtils as ThreeMath, UniformsUtils } from 'three'
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { useSpring, useTransition, animated, config } from '@react-spring/three'

import { Physics, useSphere } from "@react-three/cannon"
import { Sky, Environment, Effects as EffectComposer, useTexture } from "@react-three/drei"
import { getUniforms, SSAOPass } from "three-stdlib"
import * as THREE from "three"
import * as dat from 'dat.gui'
import './three.css'
import ThreeStars from './three-stars';
import Box from './box'
extend({ SSAOPass })
import Phone from "./phone"

const ThreeCanvas = () => {
  const { degToRad } = ThreeMath


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
     
     <Canvas camera={{ position: [-10, 0, 0]}} >
     <color attach="background" args={['lightblue']} />
    <ambientLight />
    <Phone />
   
    {/* <Box position={[0, 0, 0]} /> */}
  </Canvas>
  </div>
  );
};

export default ThreeCanvas;