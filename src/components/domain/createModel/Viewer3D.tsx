import { RotateIcon } from "@/components/icons";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Viewer3DProps {
  modelData?: any;
}

export const Viewer3D: React.FC<Viewer3DProps> = ({ modelData }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = 375;
    const height = 192; // 48px * 4 (assuming 1rem = 16px)

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // 박스 3D 객체 추가 (임시)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelData]);

  return (
    <div
      className="w-[375px] h-48 bg-[#c9c9c9]/20 rounded-[10px] relative"
      ref={mountRef}
    >
      <div className="absolute z-10 left-[333px] top-[13px]">
        <RotateIcon />
      </div>
    </div>
  );
};
