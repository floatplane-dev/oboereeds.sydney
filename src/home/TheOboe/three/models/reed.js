import { TextureLoader, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("js/");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const reedModelLoader = async () => {
  return new Promise((resolve, reject) => {
    loader.load(
      "models/reed/reed.gltf",
      (gltf) => resolve(gltf),
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => reject(error)
    );
  });
};

const reedCorkMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load("models/reed/textures/reed_cork_BaseColor.png"),
      new TextureLoader().load("models/reed/textures/reed_cork_Normal.png"),
      new TextureLoader().load("models/reed/textures/reed_cork_Metallic.png"),
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

export { reedModelLoader, reedCorkMaterialLoader };
