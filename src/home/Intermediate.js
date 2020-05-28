import React, { Component } from "react";
import { ProductNumberPicker, CartManifestMessage } from "../store-components/";

class Intermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
  }

  render() {
    const { selectedProducts, addToCart } = this.props;
    const { number } = this.state;
    const product = {
      name: "High quality intermediate reed",
      price: "31.99",
      sku: "12346"
    };

    const amountInCart = selectedProducts.filter(
      selected => selected.sku === product.sku
    ).length;

    return (
      <section className={`${this.props.navigationTitle} product`}>
        <div className="right">
          <h2>
            {product.name}&nbsp;<span>${product.price}</span>
          </h2>

          <ProductNumberPicker
            number={number}
            max={25}
            min={1}
            increase={() => {
              this.setState({ number: number + 1 });
            }}
            decrease={() => {
              this.setState({ number: number - 1 });
            }}
          />

          <CartManifestMessage amountInCart={amountInCart} />

          <button
            className="call-to-action"
            onClick={() => addToCart(product, number)}
          >
            Add to cart
          </button>
        </div>
      </section>
    );
  }
}

export default Intermediate;
