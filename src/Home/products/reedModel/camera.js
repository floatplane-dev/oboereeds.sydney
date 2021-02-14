import * as THREE from 'three';

function initCamera(el) {
  const camera = new THREE.PerspectiveCamera(
    45,
    el.offsetWidth/ el.offsetHeight,
    1,
    1000
  );
  camera.position.set(0, 30, 0);
  camera.rotation.x = Math.PI / -2;

  return camera;
}

export default initCamera;
