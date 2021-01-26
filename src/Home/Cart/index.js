import React, { Component } from "react";
import Close from "./Close";
import LineItem from "./LineItem/";
import ShippingRadio from "./ShippingRadio/";
import CartIcon from "./CartIcon";

import {
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "./actions";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_live_Lljg8yyI2fmZZ1jz0q0y5JY200s0hsAvj3");

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingMethod: undefined,
    };

    this.selectShippingMethod = this.selectShippingMethod.bind(this);
  }

  selectShippingMethod(shippingMethod) {
    this.setState({ shippingMethod });
  }

  render() {
    const {
      toggleCart,
      selectedProducts,
      modifyCart,
    } = this.props;

    const { shippingMethod } = this.state;

    const orderArray = Object.keys(selectedProducts)
      .filter((key) => selectedProducts[key].quantity > 0)
      .map((price_id) => selectedProducts[price_id]);

    const proceedToCheckout = async (event) => {
      const stripe = await stripePromise;

      let lineItems = orderArray.map((item) => {
        return { price: item.price_id, quantity: item.quantity };
      });

      // only if a shipping method with a price id is selected include it in the order
      if (shippingMethod.price_id) {
        const shippingItem = { price: shippingMethod.price_id, quantity: 1 };
        lineItems.push(shippingItem);
      }

      const shippingMethodOption = shippingMethod.price_id ? {
        shippingAddressCollection: {
          allowedCountries: ["AU"]
        }
      } : {}

      const checkoutOptions = {
        mode: "payment",
        successUrl: "https://oboereeds.sydney/thankyou",
        cancelUrl: "https://oboereeds.sydney"
      }

      const { error } = await stripe.redirectToCheckout(
        Object.assign(
          {},
          lineItems,
          checkoutOptions,
          shippingMethodOption
        )
      );

      console.error({ error });
    };

    const orderTotal = orderArray.reduce((acc, lineItem) => {
      return acc + Number(lineItem.price) * lineItem.quantity;
    }, 0);

    const shippingTotal =
      shippingMethod && shippingMethod.price_id ? shippingMethod.price : 0;

    return (
      <aside
        className="cart"
        style={{ height: window.innerHeight }}
      >
        <header>
          <h1>Your Cart</h1>
          <Close toggleCart={toggleCart} />
        </header>
        <main>
          <h2>{`${orderArray.length || "No"} products selected`}</h2>
          <ul className="lineItem-list">
            {orderArray.map((item, key) => (
              <LineItem key={key} item={item} modifyCart={modifyCart} />
            ))}
          </ul>

          {orderArray.length > 0 && (
            <React.Fragment>
              <ShippingRadio selectShippingMethod={this.selectShippingMethod} />
              <p>{`Total: $${(orderTotal + shippingTotal).toFixed(2)}`}</p>
            </React.Fragment>
          )}

          <button
            disabled={!shippingMethod || orderArray.length === 0}
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </main>
      </aside>
    );
  }
}

export { Cart, CartIcon, toggleCart, modifyCart, resetCart, checkLocalstorage };
