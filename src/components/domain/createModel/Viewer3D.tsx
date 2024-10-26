import React, { useRef, useEffect, Suspense } from "react";
import {
  Canvas,
  useThree,
  useFrame,
  extend,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls, Html, Center } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {
  IS_DEBUG,
  BG_COLOR,
  CAMERA_MIN_DIS,
  CAMERA_MAX_DIS,
} from "../constants";
import { iModels } from "../types";
import { Spinner } from "@/components/ui/spinner";
import { RotateIcon } from "@/components/icons";
extend({ OrbitControls });

interface ModelViewerProps {
  modelData: iModels;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelData }) => {
  const groupRef = useRef<THREE.Group>(null);
  let loader: any = OBJLoader;
  let scale = 1;

  switch (modelData.type) {
    case "obj":
      loader = OBJLoader;
      break;
    case "fbx":
      loader = FBXLoader;
      scale = 0.01;
      break;
    case "glb":
      loader = GLTFLoader;
      break;
  }

  const model = useLoader(loader, modelData.url);
  let modelObject = model;
  if (modelData.type === "glb") {
    modelObject = model.scene;
  }

  useEffect(() => {
    if (modelObject) {
      const box = new THREE.Box3().setFromObject(modelObject);
      const center = box.getCenter(new THREE.Vector3());
      modelObject.position.set(-center.x, -center.y, -center.z);
      if (
        modelData.type !== "glb" &&
        modelObject.children &&
        modelObject.children.length
      ) {
        const mesh = modelObject.children[0] as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: THREE.Material) => {
            mat.side = THREE.DoubleSide;
          });
        } else if (mesh.material) {
          mesh.material.side = THREE.DoubleSide;
        }
      }
    }
  }, [modelObject, modelData.type]);

  // <자동회전 원할시 주석을 삭제하고 값 설정하시면 됩니다!>
  /*
    useFrame((_state, delta) => {
      if (groupRef.current) {
        groupRef.current.rotation.y += delta;
      }
    });
  */
  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={modelObject} />
    </group>
  );
};

const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      minDistance={CAMERA_MIN_DIS}
      maxDistance={CAMERA_MAX_DIS}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
    />
  );
};

const Loader: React.FC = () => {
  return (
    <Html center>
      <Spinner />
    </Html>
  );
};

interface ThreeDModelViewerProps {
  modelData: any;
}

export const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({
  modelData,
}) => {
  return (
    <div className="relative w-[375px] h-[192px]">
      <div className="absolute z-10 left-[333px] top-[13px]">
        <RotateIcon />
      </div>
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 1, 0]} intensity={2} />
        <color attach="background" args={[BG_COLOR]} />
        <Suspense fallback={<Loader />}>
          <ModelViewer modelData={modelData} />
        </Suspense>
        {IS_DEBUG && (
          <>
            <axesHelper args={[5]} />
            <gridHelper />
          </>
        )}
      </Canvas>
    </div>
  );
};
