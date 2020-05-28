import React, { Component } from "react";

class ProductNumberPicker extends Component {
  render() {
    const { number, increase, decrease, max, min } = this.props;

    return (
      <div className="ProductNumberPicker">
        <button disabled={number === min} onClick={decrease}>
          -
        </button>
        <span>{number}</span>
        <button disabled={number === max} onClick={increase}>
          +
        </button>
      </div>
    );
  }
}

export default ProductNumberPicker;
