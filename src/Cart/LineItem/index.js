import React, { Component } from "react";
import { ProductNumberPicker } from "../../store-components";

class LineItem extends Component {
  render() {
    const { item, modifyCart } = this.props;

    return (
      <li className="LineItem">
        <label>{item.name}</label>
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
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </li>
    );
  }
}

export default LineItem;
