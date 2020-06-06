import * as THREE from "three";
var tube = new THREE.CatmullRomCurve3([
  new THREE.Vector3(17, -60, 19),
  new THREE.Vector3(5, -60, 22),
  new THREE.Vector3(5, -90, 22)
]);

var parent = new THREE.Object3D();

var tubeGeometry = new THREE.TubeBufferGeometry(tube, 20, 2, 8, false);

var material = new THREE.MeshBasicMaterial({ color: 0x333333 });
var mesh = new THREE.Mesh(tubeGeometry, material);
export default mesh;
