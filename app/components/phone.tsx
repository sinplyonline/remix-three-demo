import React, { useEffect, useMemo, useRef, useState }from 'react';

import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useGraph, useThree } from '@react-three/fiber'
import { useSpring, useTransition, animated, config } from '@react-spring/three'

import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { TextureLoader, MathUtils as ThreeMath, UniformsUtils } from 'three'
import * as SkeletonUtils  from 'three/examples/jsm/utils/SkeletonUtils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useDrag } from "react-use-gesture"


const Phone = ({scale = 1,  responsiveness = 20,}) =>{
  const ref = useRef();

  // useFrame(() => {
  //   ref.current.rotation.y += 0.01;
  // });
  const images = ['1.jpeg', '2.jpeg', '3.jpeg']
  const { degToRad } = ThreeMath
  const [index, setIndex] = useState(0)
  var textureLoader = new THREE.TextureLoader();
  

  const gltf = useLoader(GLTFLoader, 'untitled.gltf');


  const LoadImage =()=>{
    setIndex(prev => (prev + 1) % 3)
    var texture = textureLoader.load( `${images[index]}` );
    var model = gltf.scene;
    model.traverse ( ( o ) => {
      if (o.isMesh) {
       o.material.map = texture;
      }
     } );
    
    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = - 1;
  }

  useEffect(() => {
    setNewImage()
  }, []);

  const setNewImage = () => {
    LoadImage();
  }

  const [position, setPosition] = useState([0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  useFrame(() => {
    ref.current.rotation.z += 0
    ref.current.rotation.x += 0
});



const [rotation, setRotation] = useState([0, 0, 0]);
const euler = useMemo(() => new THREE.Euler(), [])

const bind = useDrag(({ offset: [x, y], delta: [dx, dy] }) => {
  const [,, z] = position;
  setPosition([x / aspect, -y / aspect, z]);
  euler.y += (dx / size.width) * responsiveness
  euler.x += (dy / size.width) * responsiveness
  euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 2, Math.PI / 2)
  setRotation( euler.toArray().slice(0, 3))
}, { pointerEvents: true });

  return (
    <>
      <primitive
      ref={ref}
      object={gltf.scene}
      scale={scale}
      position={position} {...bind()}
      onClick={setNewImage}
      rotation={rotation} {...bind()}
      />
    </>
  );
}

export default Phone;