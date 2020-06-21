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
  const el = document.getElementById("the-oboe");
  if (!el) return 0;

  const { innerHeight, innerWidth, scrollY } = window;
  const { offsetTop, offsetHeight } = el;

  let offset;
  if (scrollY > offsetTop + offsetHeight + innerHeight) {
    // scrollPosition is below the CanvasBackground
    offset = offsetHeight;
  } else if (scrollY > offsetTop - innerHeight) {
    // scrollPosition within the CanvasBackground border
    offset = (scrollY - offsetTop + innerHeight) / (innerWidth / 25);
  } else {
    // scrollPosition is above the CanvasBackground
    offset = 0;
  }

  return offset;
};

export { camera, calculateCameraOffset };
