import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.outerHeight);

export default renderer;
