"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <Sphere ref={meshRef} args={[1.4, 100, 200]} scale={1.2}>
                <MeshDistortMaterial
                    color="#6366f1"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={0.1}
                    transparent
                    opacity={0.85}
                />
            </Sphere>
        </Float>
    );
}

function ParticleRing() {
    const ref = useRef<THREE.Points>(null);
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.random() * 2;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
        }
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#a78bfa" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

export default function ThreeScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
                <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a78bfa" />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <AnimatedSphere />
                <ParticleRing />
            </Canvas>
        </div>
    );
}
