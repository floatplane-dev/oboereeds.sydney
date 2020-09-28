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

  componentDidMount() {
    document.querySelectorAll("button.buy").forEach((addToCartButton) => {
      addToCartButton.addEventListener("click", (e) =>
        this.modifyCart(e.target.getAttribute("data-price-id"), 1)
      );
    });
  }

  render() {
    const { selectedProducts, isShowingCart } = this.state;
    return (
      <React.Fragment>
        <CartIcon
          toggleCart={this.toggleCart}
          selectedProducts={selectedProducts}
        />
        <Cart
          isShowingCart={isShowingCart}
          selectedProducts={selectedProducts}
          toggleCart={this.toggleCart}
          modifyCart={this.modifyCart}
        />
      </React.Fragment>
    );
  }
}

export default App;
