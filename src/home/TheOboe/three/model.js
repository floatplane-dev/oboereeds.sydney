import { TextureLoader, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("js/");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const modelLoader = async (path) => {
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => resolve(gltf),
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => reject(error)
    );
  });
};

const oboeMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load("textures/oboe_body_baseColor.png"),
      new TextureLoader().load("textures/oboe_body_normal.png"),
      new TextureLoader().load(
        "textures/oboe_body_occlusionRoughnessMetallic.png"
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

const keyworkMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load("textures/polished_details_baseColor.png"),
      new TextureLoader().load("textures/polished_details_normal.png"),
      new TextureLoader().load(
        "textures/polished_details_occlusionRoughnessMetallic.png"
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

export { modelLoader, oboeMaterialLoader, keyworkMaterialLoader };
