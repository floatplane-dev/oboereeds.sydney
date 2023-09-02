import React, { Component } from "react";
import ReactDOM from "react-dom";
import toast from 'react-hot-toast';

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

    window.setTimeout(() => {
      toast((t) => (
        <div style={{display: "flex", flexDirection: "column"}}>
          <span>
            <b>Attention:</b> Orders placed after September 4th 2023 will not be filled until October 9th 2023 as Madeleine is getting married!
          </span>

          <button 
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              padding: "0 24px",
              minWidth: "64px",
              lineHeight: "39px",
              margin: "auto",
              marginTop: "16px",
              background: "#fff",
              border: "1px solid #222323",
              borderRadius: "5px",
              color: "#222323"
            }}
            onClick={() => toast.dismiss(t.id)}>
            Dismiss
          </button>
        </div>
      ), {
        style: {
          width: "600px",
          minWidth: window.innerWidth > 400 ? '520px' : '320px',
        },
        duration: Infinity
      });
    }, 500)
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
