import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { camera, calculateCameraOffset } from "./camera";
import renderer from "./renderer";
import spotlight from "./spotlight";
import { raycaster, clock, mouse } from "./raycaster";
import loadModel from "./loader";

export default class Oboe {
  async render(el) {
    const scene = new THREE.Scene();
    el.appendChild(renderer.domElement);

    const gltf = await loadModel("S2_oboe_2_textured.glb");

    const model = gltf.scene;
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clips = gltf.animations;

    model.rotation.y = Math.PI / -2;
    scene.add(model);
    scene.add(spotlight);

    window.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    renderer.domElement.addEventListener("mousedown", () => {
      console.log("mousedown");
      const elementClicked = raycaster.intersectObjects(
        scene.children,
        true
      )[0];

      if (elementClicked) {
        var clip = THREE.AnimationClip.findByName(
          clips,
          elementClicked.object.name.splice(6, 0, ".") // todo
        );
        console.log({ clip });
        var action = mixer.clipAction(clip);

        if (action) {
          console.log({ action });
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
          // action.time = action.getClip().duration;
          // action.setEffectiveTimeScale(-1)
          action.play();
          // .reset();
        }
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);

      if (clips && clips.length) {
        let delta = clock.getDelta();
        mixer.update(delta);
      }

      camera.position.set(0, 40, -130 + calculateCameraOffset());
      camera.lookAt(new THREE.Vector3(0, 0, -130 + calculateCameraOffset()));

      renderer.render(scene, camera);
    };

    animate();
  }
}
