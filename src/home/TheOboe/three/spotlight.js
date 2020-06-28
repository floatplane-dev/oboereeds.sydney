import * as THREE from "three";

const spotlight = new THREE.SpotLight(0xffffff); // adds light as a spotlight
spotlight.position.set(10, 1000, 0);

export default spotlight;
