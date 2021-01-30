import React, { Component } from "react";

class CartIcon extends Component {
  render() {
    const { toggleCart, selectedProducts } = this.props;

    const orderArray = Object.keys(selectedProducts)
      .filter((key) => selectedProducts[key].quantity > 0)
      .map((price_id) => selectedProducts[price_id]);

    return (
      <button id="cart-icon">
        <img
          className="icon"
          src="img/cart.svg"
          alt=""
          onTouchStart={() => toggleCart()}
          onClick={() => toggleCart()}
        />
        <span>
          {orderArray.length
            ? orderArray.reduce((acc, lineItem) => acc + lineItem.quantity, 0)
            : null}
        </span>
      </button>
    );
  }
}

export default CartIcon;
