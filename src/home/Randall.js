import React, { Component } from "react";
import { ProductNumberPicker, CartManifestMessage } from "../store-components/";
import { allProducts } from "../allProducts";

class Randall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1
    };
  }

  render() {
    const { selectedProducts, addToCart } = this.props;
    const { number } = this.state;
    const product = allProducts.sku_HD6LyrvIxJcPpW;

    const amountInCart = selectedProducts[product.sku].quantity;
    // const amountInCart = selectedProducts.filter(
    //   selected => selected.sku === product.sku
    // ).length;

    return (
      <section className={`${this.props.navigationTitle} product`}>
        <div className="left">
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
            onClick={() => addToCart(product.sku, number)}
          >
            Add to cart
          </button>
        </div>
      </section>
    );
  }
}

export default Randall;
