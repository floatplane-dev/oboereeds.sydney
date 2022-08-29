import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "Home/Cart/";

import { Beginner, Standard, Professional } from "Home/products";
import TempNotification from "../Header/TempNotification";

import About from "Home/About/";

class Home extends Component {
  constructor(props) {
    super(props);

    const selectedProducts = checkLocalstorage();

    this.state = {
      selectedProducts,
      isShowingCart: false,
    };

    this.modifyCart = modifyCart.bind(this);
    this.toggleCart = toggleCart.bind(this);
    this.resetCart = resetCart.bind(this);
  }

  componentDidMount(props) {
    function hideExploreButton() {
      document.querySelector(".scroll-prompt").classList.add("hide");
      console.log("hide explore button");
      window.removeEventListener("scroll", hideExploreButton);
    }

    window.addEventListener("scroll", hideExploreButton);
  }

  render() {
    const { selectedProducts } = this.state;
    return (
      <React.Fragment>
        <section id="hero">
          <div className="parallax__layer--back">
            <img
              id="parallax-background"
              src="/img/hero@1200x800.webp"
              alt="/img/hero@1200x800.webp"
            />
          </div>

          <h1 className="centred">Sydney Oboe Reeds</h1>

          <div
            className="scroll-prompt"
            onClick={() => {
              document
                .getElementById("student-reed")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Explore</span>
            <img src="img/down.svg" alt="" />
          </div>
        </section>

        {/* <TempNotification /> */}

        <Beginner modifyCart={this.modifyCart} toggleCart={this.toggleCart} />
        <CartIcon
          toggleCart={this.toggleCart}
          selectedProducts={selectedProducts}
        />
        <Standard modifyCart={this.modifyCart} toggleCart={this.toggleCart} />
        <Professional
          modifyCart={this.modifyCart}
          toggleCart={this.toggleCart}
        />

        <About />

        {ReactDOM.createPortal(
          <Cart
            selectedProducts={selectedProducts}
            toggleCart={this.toggleCart}
            modifyCart={this.modifyCart}
          />,
          document.getElementById("app")
        )}
      </React.Fragment>
    );
  }
}

export default Home;
