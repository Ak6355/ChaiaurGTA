/**
 * CHAI AUR GTA — Strong Visible Three.js Background
 * Bright neon grid + large particles + glowing shapes
 */

import * as THREE from 'three';

export function createThreeBackground(container) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050508, 0.018); // lighter fog so grid is visible

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  camera.position.set(0, 5, 22);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050508, 0.15); // slight dark tint, not fully transparent
  renderer.domElement.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: 0; pointer-events: none;
  `;
  container.appendChild(renderer.domElement);

  // ========== BRIGHT NEON GRID ==========
  const gridSize = 100;
  const gridHelper = new THREE.GridHelper(gridSize, 50, 0xff2d55, 0xff2d55);
  gridHelper.position.y = -1.5;
  gridHelper.material.opacity = 0.7;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  const gridHelper2 = new THREE.GridHelper(gridSize, 100, 0x00f0ff, 0x00f0ff);
  gridHelper2.position.y = -1.48;
  gridHelper2.material.opacity = 0.35;
  gridHelper2.material.transparent = true;
  scene.add(gridHelper2);

  // ========== LARGE GLOWING PARTICLES ==========
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 180 : 420;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const palette = [
    new THREE.Color(0xff2d55),
    new THREE.Color(0x00f0ff),
    new THREE.Color(0xbf5af2),
    new THREE.Color(0xffffff),
    new THREE.Color(0xff6b9d)
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 70;
    positions[i * 3 + 1] = Math.random() * 30 - 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: isMobile ? 0.28 : 0.38,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ========== BIG WIREFRAME SHAPES (very visible) ==========
  const shapes = [];
  const shapeCount = isMobile ? 8 : 16;

  for (let i = 0; i < shapeCount; i++) {
    let geo;
    const type = Math.floor(Math.random() * 4);
    if (type === 0) geo = new THREE.BoxGeometry(1.4, 0.45, 2.8);      // car body
    else if (type === 1) geo = new THREE.BoxGeometry(0.9, 3.5, 0.9); // tower
    else if (type === 2) geo = new THREE.OctahedronGeometry(0.9);
    else geo = new THREE.IcosahedronGeometry(0.7);

    const color = Math.random() > 0.45 ? 0xff2d55 : 0x00f0ff;
    const mat = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 45,
      Math.random() * 12 + 1,
      (Math.random() - 0.5) * 35 - 8
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      rotSpeed: 0.006 + Math.random() * 0.012,
      offset: Math.random() * Math.PI * 2,
      floatAmp: 0.4 + Math.random() * 0.6
    };
    scene.add(mesh);
    shapes.push(mesh);
  }

  // ========== HORIZONTAL LIGHT STREAKS (like light trails) ==========
  const streakGroup = new THREE.Group();
  for (let i = 0; i < (isMobile ? 6 : 12); i++) {
    const streakGeo = new THREE.PlaneGeometry(8 + Math.random() * 12, 0.06);
    const streakMat = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0xff2d55 : 0x00f0ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const streak = new THREE.Mesh(streakGeo, streakMat);
    streak.position.set(
      (Math.random() - 0.5) * 50,
      Math.random() * 8 + 0.5,
      (Math.random() - 0.5) * 30 - 5
    );
    streak.rotation.y = Math.random() * 0.3;
    streak.userData = {
      speed: 0.08 + Math.random() * 0.15,
      baseX: streak.position.x
    };
    streakGroup.add(streak);
  }
  scene.add(streakGroup);

  // ========== LIGHTS ==========
  scene.add(new THREE.AmbientLight(0x606080, 1.0));

  const light1 = new THREE.PointLight(0xff2d55, 3.5, 50);
  light1.position.set(-12, 10, 8);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x00f0ff, 3.0, 50);
  light2.position.set(14, 8, -6);
  scene.add(light2);

  const light3 = new THREE.PointLight(0xbf5af2, 2.0, 40);
  light3.position.set(0, 6, 10);
  scene.add(light3);

  // ========== STATE ==========
  let scrollProgress = 0;
  let targetScroll = 0;
  let mouseX = 0;
  let mouseY = 0;
  let time = 0;

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll = max > 0 ? window.scrollY / max : 0;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ========== ANIMATE ==========
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    scrollProgress += (targetScroll - scrollProgress) * 0.06;

    // Camera
    camera.position.x = mouseX * 2.2 + Math.sin(time * 0.25) * 0.8;
    camera.position.y = 5 + scrollProgress * 8 + mouseY * 1.2;
    camera.position.z = 22 - scrollProgress * 14;
    camera.lookAt(0, 2 + scrollProgress * 4, -8);

    // Moving grid
    gridHelper.position.z = (time * 3.5) % 4;
    gridHelper2.position.z = (time * 2.2) % 2;

    // Particles float + slight rotation
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3 + 1] += Math.sin(time * 0.8 + i * 0.1) * 0.006;
      if (pos[i * 3 + 1] > 28) pos[i * 3 + 1] = -2;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = time * 0.03;

    // Shapes
    shapes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.rotSpeed;
      mesh.rotation.y += mesh.userData.rotSpeed * 0.6;
      mesh.position.y += Math.sin(time + mesh.userData.offset) * 0.012 * mesh.userData.floatAmp;
    });

    // Light streaks flying past
    streakGroup.children.forEach((streak) => {
      streak.position.x += streak.userData.speed;
      if (streak.position.x > 40) {
        streak.position.x = -40;
        streak.position.y = Math.random() * 8 + 0.5;
      }
      streak.material.opacity = 0.4 + Math.sin(time * 3 + streak.position.x) * 0.3;
    });

    // Pulsing lights
    light1.intensity = 2.8 + Math.sin(time * 1.8) * 0.8;
    light2.intensity = 2.4 + Math.cos(time * 1.4) * 0.7;
    light3.intensity = 1.6 + Math.sin(time * 2.1) * 0.5;

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy() {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}
