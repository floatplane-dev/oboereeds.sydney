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
      new TextureLoader().load("models/reed/textures/reed_cork_Height.png"),
      new TextureLoader().load("models/reed/textures/reed_cork_Metallic.png"),
      new TextureLoader().load("models/reed/textures/reed_cork_Roughness.png"),
    ]).then(([map, normalMap, displacementMap, metalnessMap, roughnessMap]) => {
      resolve(
        new MeshStandardMaterial({
          map,
          normalMap,
          displacementMap,
          metalnessMap,
          roughnessMap,
          displacementScale: 0.1,
        })
      );
    });
  });
};

const loadReed = async () => {
  let [reed, reedCorkMaterial] = await Promise.all([
    reedModelLoader(),
    reedCorkMaterialLoader(),
  ]);
  const reedModel = reed.scene;
  console.log({ reedModel });

  const cork = reedModel.children.find((child) => child.name === "Cylinder");
  cork.material = reedCorkMaterial;

  reedModel.position.z = -127;

  return reedModel;
};

export default loadReed;
