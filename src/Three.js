import React, { Component } from "react";
import * as THREE from "three";
import { MeshLineMaterial } from "three.meshline";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "./OrbitControls.js";
import oboe from "./Oboe";
import spotLight from "./Spotlight";
import lever from "./Lever";
import lever2 from "./Lever2";
import lever3 from "./Lever3";

class Three extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three").appendChild(renderer.domElement);

    var group = new THREE.Group();
    group.add(lever);
    group.add(lever2);
    group.add(lever3);

    scene.add(group);
    scene.add(oboe);
    scene.add(spotLight);

    var lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);

    scene.fog = new THREE.FogExp2(0xffffff, 0.002); // adds light everywhere

    new OrbitControls(camera, renderer.domElement);
    // scene.add(controls);
    camera.position.z = 100;
    camera.position.y = -50;
    camera.position.x = 0;

    var animate = function() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return <main id="three"></main>;
  }
}

export default Three;
