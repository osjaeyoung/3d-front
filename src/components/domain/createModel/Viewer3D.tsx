import { useEffect } from 'react';
import * as THREE from 'three';

interface Viewer3DProps {
  modelData: any;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ modelData }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 3D 모델 추가 로직 (임의로 작성)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean-up when component unmounts
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, [modelData]);

  return <div>3D 모델이 여기 표시됩니다.</div>;
};
