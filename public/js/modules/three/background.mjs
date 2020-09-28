const geometry = new THREE.BoxBufferGeometry(10, 0.15, 10);
const material = new THREE.MeshPhongMaterial({
  color: 0xa0adaf,
  shininess: 150,
  specular: 0x111111,
});

const background = new THREE.Mesh(geometry, material);

background.position.set(0, -10, 0);
background.scale.multiplyScalar(10);
background.castShadow = false;
background.receiveShadow = true;

export default background;
