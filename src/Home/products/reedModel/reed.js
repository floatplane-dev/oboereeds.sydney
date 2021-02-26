import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("three/examples/jsm/loaders");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const reedModelLoader = async () => {
  return new Promise((resolve, reject) => {
    loader.load(
      "/models/reed.glb",
      (gltf) => resolve(gltf)
      // (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      // (error) => reject(error)
    );
  });
};

const loadReed = async () => {
  let [reed] = await Promise.all([reedModelLoader()]);
  const { scene } = reed;

  // scene.children[0].children[0].children[0].castShadow = true;
  console.log({ scene });

  // scene.rotation.y = Math.PI / 2;

  scene.scale.z = 1 / 100;
  scene.scale.y = 1 / 100;
  scene.scale.x = 1 / 100;

  scene.position.z = 2;

  return scene;
};

export default loadReed;
