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

const loadReed = async () => {
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

  return reedModel;
};

export default loadReed;
