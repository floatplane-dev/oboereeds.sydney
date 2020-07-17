import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 75, -130);
camera.lookAt(new THREE.Vector3(0, 0, -130));

const calculateCameraOffset = () => {
  const el = document.getElementById("the-oboe"); // a section in home/index
  const el2 = document.getElementById("three");
  if (!el || !el2) return 0;

  const { innerHeight, scrollY } = window;
  const { offsetTop, offsetHeight } = el;

  let offset;

  if (scrollY < innerHeight) {
    // you're looking at the hero
    el2.style.zIndex = -1;
    offset = (scrollY - innerHeight) / (innerHeight / 65);
  } else if (scrollY < offsetTop - innerHeight * 0.66) {
    // you're scrolling the oboe into view
    el2.style.zIndex = -1;
    offset = 0;
  } else if (scrollY < offsetTop + offsetHeight - innerHeight * 0.66) {
    // you're scrolling past the oboe, dom not clickable
    el2.style.zIndex = "auto";
    offset = (scrollY - offsetTop + innerHeight * 0.66) / (innerHeight / 65);
  } else {
    // you've gone past the oboe, and the dom is clickable again
    el2.style.zIndex = -1;
    offset = (scrollY - offsetTop + innerHeight * 0.66) / (innerHeight / 65);
  }

  return offset;
};

export { camera, calculateCameraOffset };