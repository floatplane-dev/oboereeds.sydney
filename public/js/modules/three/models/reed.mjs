import { GLTFLoader } from "/js/modules/three/loaders/GLTFLoader.mjs";
import { DRACOLoader } from "/js/modules/three/loaders/DRACOLoader.mjs";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/js/modules/three/loaders");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const reedModelLoader = async () => {
  return new Promise((resolve, reject) => {
    loader.load(
      "/models/reed/reed.glb",
      (gltf) => resolve(gltf)
      // (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      // (error) => reject(error)
    );
  });
};

const loadReed = async () => {
  let [reed] = await Promise.all([reedModelLoader()]);
  const { scene } = reed;

  scene.children[0].children[0].children[0].castShadow = true;
  console.log({ scene });

  scene.scale.z = 1 / 200;
  scene.scale.y = 1 / 200;
  scene.scale.x = 1 / 200;

  return scene;
};

export default loadReed;
