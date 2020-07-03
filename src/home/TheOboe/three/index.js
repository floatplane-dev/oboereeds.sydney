import * as THREE from "three";

import { camera, calculateCameraOffset } from "./camera";
import renderer from "./renderer";
import { light1, light2 } from "./lights";
import { raycaster, clock, mouse } from "./raycaster";
import {
  modelLoader,
  oboeMaterialLoader,
  keyworkMaterialLoader,
} from "./model";

export default class OboeScene {
  async render(el) {
    const scene = new THREE.Scene();
    el.appendChild(renderer.domElement);

    let [gltf, oboeMaterial, keyworkMaterial] = await Promise.all([
      modelLoader("models/untextured_compressed.gltf"),
      oboeMaterialLoader(),
      keyworkMaterialLoader(),
    ]);

    console.log({ gltf, keyworkMaterial, oboeMaterial });

    const model = gltf.scene;

    const oboeBody = model.children.find((child) => child.name === "Oboe_body");
    const oboeKeywork = model.children.find((child) => child.name === "rig");

    oboeKeywork.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = keyworkMaterial;
      }
    });

    oboeBody.material = oboeMaterial;

    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clips = gltf.animations;

    model.rotation.y = Math.PI / -2;
    scene.add(model);

    scene.add(light1);
    scene.add(light2);

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
        // console.log({ clip });
        var action = mixer.clipAction(clip);

        if (action) {
          action.setLoop(THREE.LoopOnce);
          action.clampWhenFinished = true;
          action.setEffectiveTimeScale(0.5).play().reset();

          const undo = () => {
            console.log("mouseup", action.paused, action.time);
            action.reset();
            action.paused = false;
            action.timeScale = -1;

            action.setLoop(THREE.LoopOnce).play().reset();
            renderer.domElement.removeEventListener("mouseup", undo);
          };

          renderer.domElement.addEventListener("mouseup", undo);
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

      camera.position.set(0, 75, -130 + calculateCameraOffset());
      camera.lookAt(new THREE.Vector3(0, 0, -130 + calculateCameraOffset()));

      renderer.render(scene, camera);
    };

    animate();
  }
}
