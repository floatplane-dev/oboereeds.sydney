import * as THREE from "three";
var tube = new THREE.CatmullRomCurve3([
  new THREE.Vector3(17, -75, 19),
  new THREE.Vector3(23, -75, 10),
  new THREE.Vector3(23, -82, 10)
]);

var parent = new THREE.Object3D();

var tubeGeometry = new THREE.TubeBufferGeometry(tube, 20, 2, 8, false);

var material = new THREE.MeshBasicMaterial({ color: 0x333333 });
var mesh = new THREE.Mesh(tubeGeometry, material);
export default mesh;
