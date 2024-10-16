import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

extend({ OrbitControls });

interface ParsedOBJ {
  vertices: number[];
  normals: number[];
  uvs: number[];
  indices: number[];
}

const ParseOBJ = (text: string): ParsedOBJ => {
  const vertices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const lines = text.split('\n');
  let vertexOffset = 0;

  lines.forEach((line) => {
    const parts = line.trim().split(/\s+/);
    switch (parts[0]) {
      case 'v':
        vertices.push(
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3])
        );
        break;
      case 'vn':
        normals.push(
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3])
        );
        break;
      case 'vt':
        uvs.push(parseFloat(parts[1]), parseFloat(parts[2]));
        break;
      case 'f':
        for (let i = 1; i <= 3; i++) {
          const face = parts[i].split('/');
          indices.push(parseInt(face[0]) - 1 - vertexOffset);
        }
        break;
    }
  });

  return { vertices, normals, uvs, indices };
};

interface ModelViewerProps {
  modelData: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelData }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    if (modelData) {
      const { vertices, normals, uvs, indices } = ParseOBJ(modelData);
      console.log({ vertices, normals, uvs, indices });

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      console.log({ geo });
      setGeometry(geo);
    }
  }, [modelData]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="black" side={THREE.DoubleSide} />
    </mesh>
  );
};

const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  return <OrbitControls args={[camera, gl.domElement]} />;
};

interface ThreeDModelViewerProps {
  modelData: string;
}

export const ThreeDModelViewer: React.FC<ThreeDModelViewerProps> = ({ modelData }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ModelViewer modelData={modelData} />
      </Canvas>
    </div>
  );
};
