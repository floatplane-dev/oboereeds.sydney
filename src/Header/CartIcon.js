import React, { Component } from "react";

class CartIcon extends Component {
  render() {
    const { toggleCart, selectedProducts } = this.props;

    const orderArray = Object.keys(selectedProducts)
      .filter(key => selectedProducts[key].quantity > 0)
      .map(price_id => selectedProducts[price_id]);

    return (
      <button>
        <img
          className="icon"
          src="cart.svg"
          alt=""
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
