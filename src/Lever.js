import * as THREE from "three";
var tube = new THREE.CatmullRomCurve3([
  new THREE.Vector3(12, -80, 13),
  new THREE.Vector3(17, -80, 19),
  new THREE.Vector3(17, -77, 19),
  new THREE.Vector3(17, -43, 19),
  new THREE.Vector3(17, -40, 19),
  new THREE.Vector3(12, -40, 13)
]);

var parent = new THREE.Object3D();

var tubeGeometry = new THREE.TubeBufferGeometry(tube, 20, 2, 8, false);

var material = new THREE.MeshBasicMaterial({ color: 0x333333 });
var mesh = new THREE.Mesh(tubeGeometry, material);
export default mesh;
