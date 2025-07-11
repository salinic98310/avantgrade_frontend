import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

// Model component with rotation logic
function FashionModel({ rotateRight }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF('/models/scene.gltf');
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAnimation = animations[0].name;
      actions[firstAnimation]?.play();
    }
  }, [actions, animations]);

  // Rotation on transition trigger
  useFrame(() => {
    if (rotateRight && modelRef.current) {
      const currentY = modelRef.current.rotation.y;
      const targetY = Math.PI / 2;

      if (currentY < targetY) {
        modelRef.current.rotation.y += 0.05;
        if (modelRef.current.rotation.y > targetY) {
          modelRef.current.rotation.y = targetY;
        }
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[3, 3, 3]}
      position={[0, -2.8, 0]}
    />
  );
}

// Main Canvas wrapper
export default function FashionModelCanvas({ rotateRight }) {
  return (
    <Canvas
      camera={{ position: [0, 3, 8], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <FashionModel rotateRight={rotateRight} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
