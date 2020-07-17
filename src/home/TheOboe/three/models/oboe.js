import { TextureLoader, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("js/");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const oboeModelLoader = async () => {
  return new Promise((resolve, reject) => {
    loader.load(
      "models/oboe/untextured_compressed.gltf",
      (gltf) => resolve(gltf),
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => reject(error)
    );
  });
};

const oboeBodyMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load("models/oboe/textures/oboe_body_baseColor.png"),
      new TextureLoader().load("models/oboe/textures/oboe_body_normal.png"),
      new TextureLoader().load(
        "models/oboe/textures/oboe_body_occlusionRoughnessMetallic.png"
      ),
    ]).then(([map, normalMap, roughnessMap]) => {
      resolve(
        new MeshStandardMaterial({
          map,
          normalMap,
          roughnessMap,
        })
      );
    });
  });
};

const oboeKeyworkMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load(
        "models/oboe/textures/polished_details_baseColor.png"
      ),
      new TextureLoader().load(
        "models/oboe/textures/polished_details_normal.png"
      ),
      new TextureLoader().load(
        "models/oboe/textures/polished_details_occlusionRoughnessMetallic.png"
      ),
    ]).then(([map, normalMap, roughnessMap]) => {
      resolve(
        new MeshStandardMaterial({
          map,
          normalMap,
          roughnessMap,
        })
      );
    });
  });
};

const loadOboe = async () => {
  let [oboe, oboeBodyMaterial, oboeKeyworkMaterial] = await Promise.all([
    oboeModelLoader(),
    oboeBodyMaterialLoader(),
    oboeKeyworkMaterialLoader(),
  ]);
  const oboeModel = oboe.scene;

  const oboeBody = oboeModel.children.find(
    (child) => child.name === "Oboe_body"
  );
  oboeBody.material = oboeBodyMaterial;

  const oboeKeywork = oboeModel.children.find((child) => child.name === "rig");
  oboeKeywork.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = oboeKeyworkMaterial;
    }
  });

  oboeModel.rotation.y = Math.PI / -2; // get Haymish to remove me
  oboeModel.position.z = -6;

  const mixer = new THREE.AnimationMixer(oboe.scene);
  const clips = oboe.animations;

  return [oboeModel, mixer, clips];
};

export default loadOboe;
