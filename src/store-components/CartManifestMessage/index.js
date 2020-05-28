import React, { Component } from "react";

class CartManifestMessage extends Component {
  render() {
    const { amountInCart } = this.props;
    return amountInCart ? (
      <p>{`You have ${amountInCart} of these in your cart`}</p>
    ) : null;
  }
}

export default CartManifestMessage;
