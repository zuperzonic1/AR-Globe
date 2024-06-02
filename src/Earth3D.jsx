import { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import earthText from '/earth.jpg';

const Earth3D = () => {
    const colorMap = useLoader(THREE.TextureLoader, earthText);
    const meshRef = useRef();

    // Rotate the sphere
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005; // Adjust the rotation speed as needed
        meshRef.current.rotation.y += 0.005; // Adjust the rotation speed as needed
    }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial map={colorMap} normalScale={[0.1, 0.1]} />
        </mesh>
    );
};

export default Earth3D;
