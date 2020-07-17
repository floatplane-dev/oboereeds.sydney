import * as THREE from "three";

import { camera, calculateCameraOffset } from "./camera";
import renderer from "./renderer";
import { light1, light2 } from "./lights";
import { raycaster, clock, mouse } from "./raycaster";
import {
  loadOboe,
  reedModelLoader,
  // reedCorkMaterialLoader,
} from "./models/";

export default class OboeScene {
  async render(el) {
    const scene = new THREE.Scene();
    el.appendChild(renderer.domElement);

    let [
      reed,
      // reedCorkMaterial
    ] = await Promise.all([
      reedModelLoader(),
      // reedCorkMaterialLoader(),
    ]);
    const reedModel = reed.scene;
    // console.log({ reedModel });
    reedModel.rotation.y = Math.PI / -2; // get Haymish to remove me
    reedModel.rotation.x = Math.PI / -2; // get Haymish to remove me
    reedModel.position.z = -127;
    reedModel.scale.set(1.5, 1.5, 1.5);
    scene.add(reedModel);

    let [oboe, mixer, clips] = await loadOboe();
    scene.add(oboe);

    scene.add(light1);
    scene.add(light2);

    window.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.outerHeight) * 2 + 1;
    }

    renderer.domElement.addEventListener("mousedown", () => {
      const elementClicked = raycaster.intersectObjects(
        scene.children,
        true
      )[0];

      if (elementClicked) {
        const clip = THREE.AnimationClip.findByName(
          clips,
          elementClicked.object.name.splice(6, 0, ".") // todo
        );

        const action = mixer.clipAction(clip);

        if (action) {
          action.stop();
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
          action.setDuration(0.1);
          action.setEffectiveTimeScale(1).play();

          const undo = () => {
            action.play();
            action.paused = false;
            action.timeScale = -1;

            renderer.domElement.removeEventListener("mouseup", undo);
          };

          renderer.domElement.addEventListener("mouseup", undo);
        }
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      let delta = clock.getDelta();
      mixer.update(delta);

      camera.position.set(0, 75, -130 + calculateCameraOffset());
      camera.lookAt(new THREE.Vector3(0, 0, -130 + calculateCameraOffset()));

      renderer.render(scene, camera);
    };

    animate();
  }
}
