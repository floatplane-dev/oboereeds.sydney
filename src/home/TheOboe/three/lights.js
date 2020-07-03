import * as THREE from "three";

// const spotlight = new THREE.SpotLight(0xffffff); // adds light as a spotlight
const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(25, 125, 0);

const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
light2.position.set(25, -50, -50);

export { light1, light2 };
