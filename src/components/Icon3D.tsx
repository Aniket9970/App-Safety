import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Icon3DProps {
  type: 'shield' | 'calculator' | 'guide';
  color?: string;
  size?: number;
}

export default function Icon3D({ type, color = '#4F46E5', size = 80 }: Icon3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting for better 3D effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    let mainMesh: THREE.Group | THREE.Mesh;

    switch (type) {
      case 'shield':
        // Create a modern security verification icon
        const group = new THREE.Group();

        // Create main shield shape
        const shieldShape = new THREE.Shape();
        const width = 1, height = 1.2;
        shieldShape.moveTo(0, height);
        shieldShape.lineTo(width, height);
        shieldShape.bezierCurveTo(
          width, height * 0.6,
          width * 0.8, -height * 0.2,
          0, -height
        );
        shieldShape.bezierCurveTo(
          -width * 0.8, -height * 0.2,
          -width, height * 0.6,
          -width, height
        );
        shieldShape.lineTo(0, height);

        const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, {
          depth: 0.1,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 4
        });

        const shield = new THREE.Mesh(
          shieldGeometry,
          new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100,
            transparent: true,
            opacity: 0.9
          })
        );
        shield.scale.set(0.8, 0.8, 0.8);
        group.add(shield);

        // Add verification checkmark
        const checkGroup = new THREE.Group();
        const checkGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
        const checkMaterial = new THREE.MeshPhongMaterial({ color: '#ffffff' });

        const check1 = new THREE.Mesh(checkGeometry, checkMaterial);
        check1.position.set(0, 0, 0.2);
        check1.rotation.z = Math.PI / 4;
        checkGroup.add(check1);

        const check2 = new THREE.Mesh(checkGeometry, checkMaterial);
        check2.position.set(0.2, -0.1, 0.2);
        check2.rotation.z = -Math.PI / 4;
        check2.scale.setY(1.5);
        checkGroup.add(check2);

        checkGroup.position.set(0, 0, 0.1);
        group.add(checkGroup);

        mainMesh = group;
        break;

      case 'calculator':
        // Create a modern risk analysis meter
        const meterGroup = new THREE.Group();

        // Create circular base
        const baseGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
        const base = new THREE.Mesh(
          baseGeometry,
          new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100
          })
        );
        meterGroup.add(base);

        // Add risk level indicators
        const colors = ['#22C55E', '#FBBF24', '#DC2626']; // Green, Yellow, Red
        for (let i = 0; i < 3; i++) {
          const angle = (i - 1) * Math.PI / 3;
          const indicatorGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
          const indicator = new THREE.Mesh(
            indicatorGeometry,
            new THREE.MeshPhongMaterial({ color: colors[i] })
          );
          indicator.position.set(
            Math.cos(angle) * 0.6,
            0.2,
            Math.sin(angle) * 0.6
          );
          meterGroup.add(indicator);
        }

        // Add animated needle
        const needleGeometry = new THREE.BoxGeometry(0.08, 0.6, 0.05);
        const needle = new THREE.Mesh(
          needleGeometry,
          new THREE.MeshPhongMaterial({ color: '#ffffff' })
        );
        needle.position.y = 0.3;
        meterGroup.add(needle);

        // Add digital display
        const displayGeometry = new THREE.BoxGeometry(0.8, 0.3, 0.1);
        const display = new THREE.Mesh(
          displayGeometry,
          new THREE.MeshPhongMaterial({ 
            color: '#1F2937',
            shininess: 200
          })
        );
        display.position.set(0, -0.3, 0);
        meterGroup.add(display);

        mainMesh = meterGroup;
        break;

      case 'guide':
        // Create a modern guide/documentation icon
        const guideGroup = new THREE.Group();

        // Create main document shape
        const docGeometry = new THREE.BoxGeometry(1.4, 1.6, 0.1);
        const doc = new THREE.Mesh(
          docGeometry,
          new THREE.MeshPhongMaterial({
            color: color,
            shininess: 100
          })
        );
        guideGroup.add(doc);

        // Add text lines
        const lineGeometry = new THREE.BoxGeometry(0.8, 0.08, 0.02);
        const lineMaterial = new THREE.MeshPhongMaterial({ color: '#ffffff' });
        
        for (let i = 0; i < 4; i++) {
          const line = new THREE.Mesh(lineGeometry, lineMaterial);
          line.position.set(-0.2, 0.4 - (i * 0.3), 0.06);
          guideGroup.add(line);
        }

        // Add safety icon
        const safetyIconGeometry = new THREE.CircleGeometry(0.2, 32);
        const safetyIcon = new THREE.Mesh(
          safetyIconGeometry,
          new THREE.MeshPhongMaterial({ color: '#22C55E' })
        );
        safetyIcon.position.set(0.4, 0.5, 0.06);
        guideGroup.add(safetyIcon);

        mainMesh = guideGroup;
        break;

      default:
        mainMesh = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshPhongMaterial({ color })
        );
    }

    scene.add(mainMesh);

    // Smooth animation
    let targetRotation = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation
      mainMesh.rotation.y += (targetRotation - mainMesh.rotation.y) * 0.05;
      targetRotation += 0.02;
      
      renderer.render(scene, camera);
    };

    animate();

    // Interactive rotation on hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width * 2 - 1;
        targetRotation = x * Math.PI / 4;
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [type, color, size]);

  return (
    <div 
      ref={containerRef}
      className="w-20 h-20 mb-6 cursor-pointer hover:scale-105 transition-transform"
    />
  );
} 