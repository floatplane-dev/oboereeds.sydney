import React, { Component } from "react";
import { ProductNumberPicker, CartManifestMessage } from "../store-components/";

class Student extends Component {
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
      name: "Hand crafted student reed",
      price: "19.99",
      sku: "12345"
    };

    const amountInCart = selectedProducts.filter(
      selected => selected.sku === product.sku
    ).length;

    return (
      <section className={`${this.props.navigationTitle} product`}>
        <div className="left">
          <h2>
            {product.name}&nbsp;<span>${product.price}</span>
          </h2>
          <p>
            This reed is crafted from premium&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.le-roseau-oboe.com/en/"
            >
              Le Roseau Chantant
            </a>
            &nbsp;cane by musical professionals in Sydney, and is perfect for
            students of all levels. It is cut with a hard resistance in the
            european style.
          </p>

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

export default Student;
