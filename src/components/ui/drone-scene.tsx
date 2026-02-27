"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function DroneScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.04);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // --- Volumetric light cone material ---
    function makeBeamMaterial(color: number) {
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          color: { value: new THREE.Color(color) },
          intensity: { value: 1.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float intensity;
          varying vec2 vUv;
          void main() {
            float fade = 1.0 - vUv.y;
            fade = pow(fade, 1.5);
            float edgeFade = 1.0 - abs(vUv.x * 2.0 - 1.0);
            edgeFade = pow(edgeFade, 0.5);
            float alpha = fade * edgeFade * 0.35 * intensity;
            gl_FragColor = vec4(color, alpha);
          }
        `,
      });
    }

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0x334466, 1.5));
    scene.add(new THREE.HemisphereLight(0x6666aa, 0x222244, 0.8));

    // Directional light for better model visibility
    const dirLight = new THREE.DirectionalLight(0x8888cc, 1.0);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // Ground to receive flashlight
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a18,
        roughness: 0.95,
        metalness: 0.05,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;
    ground.receiveShadow = true;
    scene.add(ground);

    // Dust particles
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 14;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xaaaacc,
        size: 0.04,
        transparent: true,
        opacity: 0.4,
      })
    );
    scene.add(dust);

    // --- Mouse ---
    const mouse3D = new THREE.Vector3(0, -2, 3);
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse3D.set(mx * 6, my * 4 - 2, 3);
    };
    container.addEventListener("mousemove", onMouseMove);

    // --- Drone definitions ---
    const defs = [
      { color: 0x00d4ff, size: 1.0, pos: [-2.2, 1.5, -1], phase: 0 },
      { color: 0x6c5ce7, size: 0.85, pos: [2.0, 0.8, 0.5], phase: 1.8 },
      { color: 0xff6b9d, size: 0.7, pos: [0.3, 2.2, -0.8], phase: 3.2 },
      { color: 0x00e676, size: 0.9, pos: [-0.5, 0.0, 1.5], phase: 4.8 },
    ];

    type DroneData = {
      group: THREE.Group;
      spot: THREE.SpotLight;
      beam: THREE.Mesh;
      beamMat: THREE.ShaderMaterial;
      target: THREE.Object3D;
      basePos: THREE.Vector3;
      phase: number;
      propellers: THREE.Object3D[];
    };

    const drones: DroneData[] = [];

    // --- Load GLB model ---
    const loader = new GLTFLoader();
    loader.load("/models/drone.glb", (gltf) => {
      const originalModel = gltf.scene;

      // Compute bounding box to normalize scale
      const box = new THREE.Box3().setFromObject(originalModel);
      const modelSize = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const normalizeScale = 2.0 / maxDim;
      const center = box.getCenter(new THREE.Vector3());

      defs.forEach((def) => {
        // Deep clone model with unique materials
        const model = originalModel.clone();
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // Clone material so each drone can have its own accent
            if (Array.isArray(mesh.material)) {
              mesh.material = mesh.material.map((m) => m.clone());
            } else {
              mesh.material = mesh.material.clone();
            }
          }
        });

        // Normalize scale and center
        const s = normalizeScale * def.size;
        model.scale.setScalar(s);
        model.position.set(-center.x * s, -center.y * s, -center.z * s);

        const group = new THREE.Group();
        group.add(model);
        group.position.set(def.pos[0], def.pos[1], def.pos[2]);

        // Add accent-colored point light
        const accentLight = new THREE.PointLight(def.color, 4, 6);
        accentLight.position.set(0, 0.3, 0);
        group.add(accentLight);

        // Bottom accent light for underglow
        const underGlow = new THREE.PointLight(def.color, 2, 4);
        underGlow.position.set(0, -0.5, 0);
        group.add(underGlow);

        // Add emissive tint to model materials
        const accent = new THREE.Color(def.color);
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material)
              ? mesh.material
              : [mesh.material];
            mats.forEach((mat) => {
              if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
                const stdMat = mat as THREE.MeshStandardMaterial;
                stdMat.emissive = accent;
                stdMat.emissiveIntensity = 0.15;
              }
            });
          }
        });

        scene.add(group);

        // SpotLight (flashlight)
        const spot = new THREE.SpotLight(0xffffff, 15, 20, Math.PI / 5, 0.6, 1);
        spot.position.set(0, -0.3, 0);
        spot.castShadow = true;
        group.add(spot);

        const target = new THREE.Object3D();
        target.position.set(0, -4, 3);
        scene.add(target);
        spot.target = target;

        // Volumetric beam (added to scene directly for correct orientation)
        const beamLen = 8;
        const beamRadius = 2.5;
        const beamGeo = new THREE.ConeGeometry(beamRadius, beamLen, 32, 1, true);
        beamGeo.translate(0, -beamLen / 2, 0);
        const beamMat = makeBeamMaterial(0xffffff);
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.scale.setScalar(def.size);
        scene.add(beam);

        // Add spinning propeller blades at 4 motor positions
        // Model spans [-1,1] in XZ, propeller motors are at ~70% of diagonal
        const propPositions = [
          [0.7, 0.22, 0.7],
          [-0.7, 0.22, 0.7],
          [0.7, 0.22, -0.7],
          [-0.7, 0.22, -0.7],
        ];
        const propMat = new THREE.MeshStandardMaterial({
          color: 0xccccee,
          metalness: 0.4,
          roughness: 0.3,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
        });
        const propellers: THREE.Object3D[] = [];
        propPositions.forEach(([px, py, pz]) => {
          const bladeGroup = new THREE.Group();
          for (let b = 0; b < 3; b++) {
            const blade = new THREE.Mesh(
              new THREE.BoxGeometry(0.5, 0.006, 0.07),
              propMat
            );
            blade.rotation.y = (b * Math.PI * 2) / 3;
            bladeGroup.add(blade);
          }
          bladeGroup.position.set(px, py, pz);
          model.add(bladeGroup);
          propellers.push(bladeGroup);
        });

        drones.push({
          group,
          spot,
          beam,
          beamMat,
          target,
          basePos: new THREE.Vector3(...def.pos),
          phase: def.phase,
          propellers,
        });
      });
    });

    // --- Animate ---
    const clock = new THREE.Clock();
    let animId: number;
    const tmpVec = new THREE.Vector3();
    const flashOrigin = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      drones.forEach((d) => {
        const p = d.phase;

        // Hover
        d.group.position.x = d.basePos.x + Math.sin(t * 0.5 + p) * 0.3;
        d.group.position.y = d.basePos.y + Math.sin(t * 1.3 + p) * 0.2;
        d.group.position.z = d.basePos.z + Math.cos(t * 0.4 + p) * 0.15;

        // Look direction to mouse
        tmpVec.copy(mouse3D).sub(d.group.position).normalize();

        // Tilt toward mouse
        d.group.rotation.x += (-tmpVec.y * 0.4 - d.group.rotation.x) * 0.06;
        d.group.rotation.z += (-tmpVec.x * 0.3 - d.group.rotation.z) * 0.06;
        d.group.rotation.y +=
          (Math.atan2(tmpVec.x, tmpVec.z) - d.group.rotation.y) * 0.04;

        // Spin propellers (if found in model)
        d.propellers.forEach((prop) => {
          prop.rotation.y += 0.5;
        });

        // Point flashlight at mouse
        d.target.position.lerp(mouse3D, 0.08);

        // Position beam at drone's flashlight origin in world space
        flashOrigin.set(0, -0.3, 0);
        d.group.localToWorld(flashOrigin);
        d.beam.position.copy(flashOrigin);

        // Orient beam cone toward target
        d.beam.lookAt(d.target.position);
        d.beam.rotateX(-Math.PI / 2);

        // Flashlight intensity based on distance
        const dist = d.group.position.distanceTo(mouse3D);
        d.spot.intensity = THREE.MathUtils.lerp(
          d.spot.intensity,
          Math.max(8, 25 - dist * 3),
          0.05
        );
        (d.beamMat.uniforms.intensity as { value: number }).value =
          THREE.MathUtils.lerp(
            (d.beamMat.uniforms.intensity as { value: number }).value,
            Math.max(0.5, 1.5 - dist * 0.15),
            0.05
          );
      });

      dust.rotation.y = t * 0.02;
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ background: "transparent" }}
    />
  );
}
