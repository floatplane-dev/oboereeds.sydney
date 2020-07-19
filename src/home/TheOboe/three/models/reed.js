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
      "models/reed/reed.glb",
      (gltf) => resolve(gltf),
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => reject(error)
    );
  });
};

const reedCorkMaterialLoader = async () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      new TextureLoader().load("models/reed/textures/reed.002_baseColor.png"),
      new TextureLoader().load("models/reed/textures/reed.002_normal.png"),
      new TextureLoader().load(
        "models/reed/textures/reed.002_occlusionRoughnessMetallic.png"
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

const loadReed = async () => {
  let [
    reed,
    // material
  ] = await Promise.all([
    reedModelLoader(),
    // reedCorkMaterialLoader(),
  ]);
  const reedModel = reed.scene;
  console.log({ reedModel });

  // const cork = reedModel.children.find((child) => child.name === "Cylinder");
  // cork.material = material;

  reedModel.position.z = -128;
  reedModel.scale.z = 1 / 100;
  reedModel.scale.y = 1 / 100;
  reedModel.scale.x = 1 / 100;

  return reedModel;
};

export default loadReed;
