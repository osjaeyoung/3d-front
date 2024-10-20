import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useThree, useFrame, extend, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { 
  IS_DEBUG, 
  BG_COLOR,
  CAMERA_MIN_DIS,
  CAMERA_MAX_DIS,
} from '../constants';
import { iModels } from '../types';

extend({ OrbitControls });

interface ModelViewerProps {
  modelData: iModels;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelData }) => {
  const groupRef = useRef<THREE.Group>(null);
  let loader:any = OBJLoader;
  let scale = 1;
  switch(modelData.type){
    case 'obj':
      loader = OBJLoader;
      break;
    case 'fbx':
      loader = FBXLoader;
      scale = 0.01;
      break;
    case 'glb':
      loader = GLTFLoader;
      break;
  }
  const model = useLoader(loader, modelData.url);
  let modelObject = model;
  if(modelData.type === 'glb'){
    modelObject = model.scene;
  }

  // obj, fbx일때 mesh의 material의 뒷면까지 렌더링하는 코드입니다. 필요없으면 지우셔도 됩니다.
  useEffect(()=>{
    if(modelData.type !== 'glb' && modelObject.children && modelObject.children.length){
      const mesh = modelObject.children[0] as THREE.Mesh;
      const material = mesh.material as THREE.Material[];
      if(material.length){
        material.forEach((mat:THREE.Material) => {
          mat.side = THREE.DoubleSide;
        });
      }
    }
  },[modelObject]);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta;
    }
  });
  return (
    <>
      <group ref={groupRef} >
        <primitive scale={scale} object={modelObject} />
      </group>
    </>
  );
};

const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  return <OrbitControls 
      minDistance={CAMERA_MIN_DIS} 
      maxDistance={CAMERA_MAX_DIS} 
      args={[camera, gl.domElement]} 
    />;
};


const Loader: React.FC = () => {
  return <Html center>loading...</Html>
}

interface ThreeDModelViewerProps {
  modelData: iModels;
}

export const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({ modelData }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 1, 0]} intensity={2} />
        <color attach={'background'} args={[BG_COLOR]}/>
        <Suspense fallback={<Loader />}>
          <ModelViewer modelData={modelData} />
        </Suspense>
        {
          IS_DEBUG ?
            <>
              <axesHelper args={[5]}/>
              <gridHelper />
            </>
          :
            <></>
        }
      </Canvas>
    </div>
  );
};
