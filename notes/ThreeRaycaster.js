import { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Raycaster extends Component {
  componentDidMount() {
    let renderer, scene, camera;

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 150, -10);
    camera.lookAt(new THREE.Vector3(0, 60, 0));

    const spotLight = new THREE.SpotLight(0xffffff); // adds light as a spotlight
    spotLight.position.set(1000, 1000, -130);
    scene.add(spotLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;

    let oboe;
    const loader = new GLTFLoader();

    loader.load("S1_oboe_02.gltf.glb", function(gltf) {
      oboe = gltf.scene;
      console.log({ oboe });

      scene.add(oboe);
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("mousemove", onMouseMove, false);
    document.body.appendChild(renderer.domElement);

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      renderer.render(scene, camera);
    }

    renderer.domElement.addEventListener("click", () => {
      const elementClicked = raycaster.intersectObjects(
        scene.children,
        true
      )[0];

      if (elementClicked) {
        console.log(elementClicked.object.name);
      }
    });

    animate();
  }

  render() {
    return null;
  }
}

export default Raycaster;
