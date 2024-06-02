import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { createRoot } from "react-dom/client";
import earthText from '/earth.jpg';

const Earth3D = () => {
    const colorMap = useLoader(THREE.TextureLoader, earthText);
    const meshRef = useRef();

    // Rotate the sphere
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01; // Adjust the rotation speed as needed
            meshRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={colorMap} normalScale={[0.1, 0.1]} />
        </mesh>
    );
};

const App = () => {
    const canvasRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.style.width = '100vw';
                canvasRef.current.style.height = '100vh';
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ARCanvas
            ref={canvasRef}
            onCameraStreamReady={() => console.log("Camera stream ready")}
            onCameraStreamError={() => console.error("Camera stream error")}
            sourceType={"webcam"}
            style={{ width: '100vw', height: '100vh' }} // Ensure the canvas takes the full viewport
        >
            <ambientLight />
            <directionalLight position={[5, 3, 5]} intensity={1.5} />
            <ARMarker
                debug={true}
                params={{ smooth: true }}
                type={"pattern"}
                patternUrl={"data/patt.hiro"}
                onMarkerFound={() => {
                    console.log("Marker Found");
                }}
            >
                <Earth3D />
            </ARMarker>
        </ARCanvas>
    );
};

createRoot(document.getElementById("root")).render(<App />);
