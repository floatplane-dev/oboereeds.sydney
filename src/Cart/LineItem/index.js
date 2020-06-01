import React, { Component } from "react";
import { ProductNumberPicker } from "../../store-components";

class LineItem extends Component {
  render() {
    const { item, modifyCart } = this.props;

    return (
      <li className="LineItem">
        <p>{item.name}</p>
        <ProductNumberPicker
          number={item.quantity}
          max={25}
          min={0}
          increase={() => {
            modifyCart(item.price_id, 1);
          }}
          decrease={() => {
            modifyCart(item.price_id, -1);
          }}
        />
        <p>${item.price * item.quantity}</p>
      </li>
    );
  }
}

export default LineItem;
