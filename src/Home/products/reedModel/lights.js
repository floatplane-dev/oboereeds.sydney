import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(0, 10, 6);

const spotLight = new THREE.SpotLight(0xffffff, 0.7);
spotLight.penumbra = 0.3;
spotLight.position.set(-4, 10, -9);
spotLight.castShadow = true;
spotLight.shadow.camera.near = 8;
spotLight.shadow.camera.far = 30;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;

const spotLight2 = new THREE.SpotLight(0xffffff, 0.7);
spotLight2.penumbra = 0.3;
spotLight2.position.set(4, 20, -6);
spotLight2.castShadow = true;
spotLight2.shadow.camera.near = 8;
spotLight2.shadow.camera.far = 30;
spotLight2.shadow.mapSize.width = 2048;
spotLight2.shadow.mapSize.height = 2048;

export {
  ambientLight,
  directionalLight,
  spotLight,
  spotLight2
}
