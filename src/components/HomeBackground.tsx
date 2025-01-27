import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Point {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function HomeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create points and lines with constant visibility
    const numPoints = 50;
    const points: Point[] = [];
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({ 
      color: 0x4F46E5,
      transparent: true,
      opacity: 0.3  // Increased constant opacity
    });

    // Create random points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        )
      });
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update points positions
      points.forEach(point => {
        point.position.add(point.velocity);

        // Simple boundary bounce
        if (Math.abs(point.position.x) > 17) {
          point.velocity.x *= -1;
        }
        if (Math.abs(point.position.y) > 10) {
          point.velocity.y *= -1;
        }
        if (Math.abs(point.position.z) > 5) {
          point.velocity.z *= -1;
        }
      });

      // Create lines with constant visibility
      const positions: number[] = [];
      const maxDistance = 10; // Increased connection distance

      for (let i = 0; i < points.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < points.length; j++) {
          if (connections >= 4) break; // Slightly more connections per point

          const distance = points[i].position.distanceTo(points[j].position);
          
          if (distance < maxDistance) {
            positions.push(points[i].position.x, points[i].position.y, points[i].position.z);
            positions.push(points[j].position.x, points[j].position.y, points[j].position.z);
            connections++;
          }
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.attributes.position.needsUpdate = true;

      scene.clear();
      scene.add(new THREE.LineSegments(geometry, material));

      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-80" // Increased overall opacity
    />
  );
} 