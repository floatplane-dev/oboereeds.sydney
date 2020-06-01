import React, { Component } from "react";
import { ProductNumberPicker, CartManifestMessage } from "../store-components/";
import { allProducts } from "../allProducts";

class Intermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
  }

  render() {
    const { selectedProducts, modifyCart } = this.props;
    const { number } = this.state;
    const product = allProducts.price_HNzbbA3RcoZBDx;

    const amountInCart = selectedProducts[product.price_id].quantity;

    return (
      <section className={`${this.props.navigationTitle} product`}>
        <div className="right">
          <h2>
            {product.name}&nbsp;<span>${product.price}</span>
          </h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

          <button
            className="call-to-action"
            onClick={() => modifyCart(product.price_id, number)}
          >
            Add to cart
          </button>
          <CartManifestMessage amountInCart={amountInCart} />
        </div>
      </section>
    );
  }
}

export default Intermediate;
