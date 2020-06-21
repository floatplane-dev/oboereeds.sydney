import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("js/");
loader.setDRACOLoader(dracoLoader);
dracoLoader.preload();

const loadModel = async path => {
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      gltf => resolve(gltf),
      xhr => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      error => reject(error)
    );
  });
};

export default loadModel;
