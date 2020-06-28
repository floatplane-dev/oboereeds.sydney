import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 40, -130);
camera.lookAt(new THREE.Vector3(0, 0, -130));

const calculateCameraOffset = () => {
  const el = document.getElementById("the-oboe"); // a section in home/index
  if (!el) return 0;

  const { innerHeight, scrollY } = window;
  const { offsetTop } = el;

  let offset;

  if (scrollY < innerHeight) {
    offset = (scrollY - innerHeight) / (innerHeight / 65);
  } else if (scrollY < offsetTop - innerHeight) {
    offset = 0;
  } else {
    offset = (scrollY - offsetTop + innerHeight) / (innerHeight / 65);
  }

  return offset;
};

export { camera, calculateCameraOffset };
