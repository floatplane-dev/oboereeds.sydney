import * as THREE from "three";
var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(10, 100, 50);
spotLight.distance = 10;

export default spotLight;
