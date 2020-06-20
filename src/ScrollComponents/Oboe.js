import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { calculateCameraOffset } from "./oboePosition";

class Oboe extends Component {
  componentDidMount() {
    let model, clips;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    let mixer;
    const el = document.getElementById("oboe");
    const clock = new THREE.Clock();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    let loader = new GLTFLoader();

    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/");
    loader.setDRACOLoader(dracoLoader);
    dracoLoader.preload();

    loader.load(
      "S2_oboe_2_textured.glb",
      gltf => {
        console.log({ gltf });
        model = gltf.scene;
        clips = gltf.animations;
        mixer = new THREE.AnimationMixer(model);
        model.rotation.y = Math.PI / -2;
        scene.add(model);
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      error => {
        console.log("An error happened");
      }
    );

    camera.position.set(0, 40, -130);
    camera.lookAt(new THREE.Vector3(0, 0, -130));

    const spotLight = new THREE.SpotLight(0xffffff); // adds light as a spotlight
    spotLight.position.set(10, 1000, 0);
    scene.add(spotLight);

    window.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    var animate = function() {
      requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);

      if (clips && clips.length) {
        var delta = clock.getDelta();
        mixer.update(delta);
      }

      camera.position.set(0, 40, -130 + calculateCameraOffset());
      camera.lookAt(new THREE.Vector3(0, 0, -130 + calculateCameraOffset()));

      renderer.render(scene, camera);
    };

    renderer.domElement.addEventListener("click", () => {
      const elementClicked = raycaster.intersectObjects(
        scene.children,
        true
      )[0];

      if (elementClicked) {
        var clip = THREE.AnimationClip.findByName(
          clips,
          elementClicked.object.name.splice(6, 0, ".")
        );
        console.log({ clip });
        var action = mixer.clipAction(clip);

        if (action) {
          console.log({ action });
          action.setLoop(THREE.LoopOnce);
          action.play().reset();
        }
      }
    });

    animate();
  }

  render() {
    return null;
  }
}

export default Oboe;
