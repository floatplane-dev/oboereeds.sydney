import { camera } from "./camera.mjs";
import { loadReed } from "./models/index.mjs";
import background from "./background.mjs";

export default class OboeScene {
  async render() {
    var scene, renderer, reed;

    await initScene();
    initRenderer();
    animate();

    async function initScene() {
      scene = new THREE.Scene();

      reed = await loadReed();
      reed.castShadow = true;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
      directionalLight.position.set(0, 10, 6);
      scene.add(directionalLight);

      const spotLight = new THREE.SpotLight(0xffffff, 0.7);
      spotLight.penumbra = 0.3;
      spotLight.position.set(4, 10, -3);
      spotLight.castShadow = true;
      spotLight.shadow.camera.near = 8;
      spotLight.shadow.camera.far = 30;
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      scene.add(spotLight);
      // scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

      scene.add(reed);
      scene.add(background);
    }

    function initRenderer() {
      renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("three"),
        antialias: true,
        shadowMap: {
          type: THREE.BasicShadowMap,
        },
      });
      renderer.shadowMap.enabled = true; // has to be set after you define the WebGLRenderer otherwise shadows don't work properly
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      reed.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
  }
}
