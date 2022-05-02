import React, { Component } from "react";

class BuyButton extends Component {
  render() {
    const { handleClick, outOfStock } = this.props;

    return (
      <button
        onClick={handleClick}
        type="button"
        className="buy-button"
        >
        <span>{outOfStock ? "Preorder" : "Add to cart"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    );
  }
}

export default BuyButton;
