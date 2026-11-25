'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Component: The Sketchy Shapes ---
function SketchyShape({ position, rotation, type }: { position: [number, number, number], rotation: [number, number, number], type: 'box' | 'cone' | 'sphere' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Jittery animation to simulate "boiling" lines in hand-drawn animation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={1.2}>
                {type === 'box' && <boxGeometry />}
                {type === 'cone' && <coneGeometry args={[1, 1.5, 4]} />}
                {type === 'sphere' && <icosahedronGeometry args={[0.8, 1]} />}

                {/* The "Paper" Material */}
                <meshStandardMaterial color="#ffffff" roughness={1} toneMapped={false} polygonOffset polygonOffsetFactor={1} />

                {/* The "Pencil" Outline */}
                <Edges
                    scale={1}
                    threshold={15} // Angle threshold to draw lines
                    color="#2d2d2d"
                >
                    <meshBasicMaterial transparent opacity={1} side={THREE.DoubleSide} />
                </Edges>
            </mesh>
        </Float>
    );
}

// --- 3D Scene Wrapper ---
export function Scene() {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 10] }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Floating Sketch Objects */}
            <SketchyShape type="box" position={[-4, 2, 0]} rotation={[0.5, 0.5, 0]} />
            <SketchyShape type="cone" position={[5, -1, 0]} rotation={[0, 0, 0.5]} />
            <SketchyShape type="sphere" position={[-3, -3, -2]} rotation={[0, 0, 0]} />

        </Canvas>
    );
}

// --- Component: SVG Scribble Underline ---
export function ScribbleLine() {
    return (
    <svg className="absolute -bottom-4 left-0 w-full h-6 overflow-visible" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            id="scribble-path"
            d="M2.00025 7.00001C35.9185 3.3283 103.882 -1.4878 197.001 3.50001"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-0"
        />
    </svg>
);
}