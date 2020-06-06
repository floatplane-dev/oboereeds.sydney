import * as THREE from "three";

var points = [];
for (var i = 0; i < 300; i = i + 0.25) {
  let curve;

  if (i < 5) {
    curve = Math.sin(i * 0.1) * 15 + 2;
  } else if (i < 8) {
    curve = Math.sin(i * 0.1) * 15 + 5;
  } else if (i < 22) {
    curve = Math.sin(i * 0.1) * 15 + 9;
  } else if (i < 28) {
    curve = 20 + i * 0.001;
  } else if (i < 32) {
    curve = Math.sin(i + Math.PI) + 20.5;
  } else {
    curve = 20 + i * 0.001;
  }

  let point = new THREE.Vector2(-curve, i);
  points.push(point);
}

var geometry = new THREE.LatheGeometry(points, 30, Math.PI);
var material = new THREE.MeshBasicMaterial({ color: 0x000f00 });
var oboe = new THREE.Mesh(geometry, material);
oboe.rotation.x = Math.PI;

export default oboe;
