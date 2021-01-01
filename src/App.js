import React, { Component } from "react";
import "./App.scss";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "./Cart/";

import {
  Student,
  Intermediate,
  Professional
} from "./products";

import Header from "./Header/";

class App extends Component {
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

  render() {
    const { selectedProducts, modalImage } = this.state;
    return (
      <React.Fragment>

        <main>
          <Header />

          <section id="hero">
            <h1 className="centred">
              Sydney Oboe Reeds
            </h1>
          </section>

          <Student modifyCart={this.modifyCart} />
          <Intermediate modifyCart={this.modifyCart} />
          <Professional modifyCart={this.modifyCart} />

        </main>

        <CartIcon
          toggleCart={this.toggleCart}
          selectedProducts={selectedProducts}
        />

        <Cart
          selectedProducts={selectedProducts}
          toggleCart={this.toggleCart}
          modifyCart={this.modifyCart}
        />
      </React.Fragment>
    );
  }
}

export default App;
