import { TextureLoader, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

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

export { oboeModelLoader, oboeBodyMaterialLoader, oboeKeyworkMaterialLoader };
