import React, { Component } from "react";
import BuyButton from "./BuyButton/";
import * as THREE from 'three';
import {
  loadReed,
  ambientLight,
  directionalLight,
  spotLight,
  spotLight2,
  background,
  initCamera
} from "./reedModel/";

class Professional extends Component {

  async renderReedModel() {
    var scene, renderer, reed;

    scene = new THREE.Scene();
    const el = document.getElementById("three");

    const camera = initCamera(el);

    reed = await loadReed();
    reed.castShadow = true;

    await initScene();
    initRenderer();
    animate();

    async function initScene() {

      // Lights
      scene.add(ambientLight);
      scene.add(directionalLight);
      scene.add(spotLight);
      scene.add(spotLight2);

      scene.add(reed);
      scene.add(background);
    }

    function initRenderer() {
      const el = document.getElementById("three");

      renderer = new THREE.WebGLRenderer({
        canvas: el,
        antialias: true,
        shadowMap: {
          type: THREE.BasicShadowMap,
        },
      });
      renderer.shadowMap.enabled = true; // has to be set after you define the WebGLRenderer otherwise shadows don't work properly
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(el.offsetWidth, el.offsetHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      reed.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
  }

  componentDidMount() {
    this.renderReedModel();
  }

  render() {
    const { modifyCart, toggleCart } = this.props;
    return (
      <section id="professional-reed">
        <div>
          <div className="product professional">
            <h2>Professional Reed</h2>
            <p>
              The ultimate in luxury handcrafted reeds. Selected for their
              outstanding tone colour, vibration and stability these reeds are of
              the finest quality in our workshop.
            </p>
            <ul>
              <li>Superior tone colour</li>
              <li>For advanced players</li>
              <li>The finest cane, handpicked from each batch</li>
            </ul>
            <span className="price">$49.99</span>
            <BuyButton handleClick={() => {
              modifyCart("price_1OUi9xDBTPoEHOlTn4M0ON8L", 1);
              toggleCart();
            }} />
          </div>

          <canvas id="three"></canvas>

        </div>
      </section>

    );
  }
}

export default Professional;
