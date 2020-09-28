const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 30, 0);
camera.rotation.x = Math.PI / -2;

export { camera };
