import * as THREE from 'three';

const geometry1 = new THREE.BoxBufferGeometry(10, 0.15, 10);
const material1 = new THREE.MeshPhongMaterial({
  color: 0xffffff, // change this to make the shadow have a different color
  shininess: 150,
  specular: 0x111111,
});

const background = new THREE.Mesh(geometry1, material1);

background.position.set(0, -10, 0);
background.scale.multiplyScalar(10);
background.castShadow = false;
background.receiveShadow = true;

export default background;
