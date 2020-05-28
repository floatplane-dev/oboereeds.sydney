import React, { Component } from "react";
import Close from "./Close";

class Cart extends Component {
  render() {
    const { isShowingCart, toggleCart } = this.props;

    return (
      <aside className={`cart ${isShowingCart ? "cart-active" : ""}`}>
        <Close toggleCart={toggleCart} />

        <h1>Your Cart</h1>
        <h2>No products selected</h2>
      </aside>
    );
  }
}

export default Cart;
