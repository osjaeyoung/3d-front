import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // OrbitControls 추가

interface Viewer3DProps {
  modelData: any;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ modelData }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Three.js 초기 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(800, 500);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 박스 3D 객체 추가 (임시)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // OrbitControls 추가
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 부드러운 감속 효과 추가
    controls.dampingFactor = 0.25;
    controls.enableZoom = true; // 확대/축소 허용

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // 매 프레임마다 컨트롤 업데이트
      renderer.render(scene, camera);
    };

    animate();

    // 윈도우 크기 조정에 따른 리사이징 처리
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [modelData]);

  return <div ref={mountRef} style={{ width: '100%', height: '500px' }} />;
};
