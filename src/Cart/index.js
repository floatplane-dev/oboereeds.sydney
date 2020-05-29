import React, { Component } from "react";
import Close from "./Close";
import { ProductNumberPicker } from "../store-components";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_vwrEmYVBuXu2F36jDcCBuhKT00nVBJrwdf");

class Cart extends Component {
  render() {
    const {
      isShowingCart,
      toggleCart,
      selectedProducts,
      modifyCart
    } = this.props;

    const orderArray = Object.keys(selectedProducts)
      .filter(key => selectedProducts[key].quantity > 0)
      .map(sku => selectedProducts[sku]);

    const proceedToCheckout = async event => {
      const stripe = await stripePromise;

      const itemsArray = orderArray.map(item => {
        return { sku: item.sku, quantity: item.quantity };
      });

      const { error } = await stripe.redirectToCheckout({
        items: itemsArray,
        successUrl: "http://localhost:3000/",
        // successUrl: "https://oboereeds.sydney/success",
        cancelUrl: "http://localhost:3000/",
        // cancelUrl: "https://oboereeds.sydney",
        shippingAddressCollection: {
          allowedCountries: ["AU"]
        }
      });
    };

    return (
      <aside className={`cart ${isShowingCart ? "cart-active" : ""}`}>
        <header>
          <h1>Your Cart</h1>
          <Close toggleCart={toggleCart} />
        </header>
        <main>
          <h2>{`${orderArray.length || "No"} products selected`}</h2>
          <ul>
            {orderArray.map((item, key) => {
              return (
                <li key={key}>
                  <p>{item.name}</p>
                  <ProductNumberPicker
                    number={item.quantity}
                    max={25}
                    min={0}
                    increase={() => {
                      modifyCart(item.sku, 1);
                    }}
                    decrease={() => {
                      modifyCart(item.sku, -1);
                    }}
                  />
                  <p>${item.price * item.quantity}</p>
                </li>
              );
            })}
          </ul>
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </main>
      </aside>
    );
  }
}

export default Cart;
