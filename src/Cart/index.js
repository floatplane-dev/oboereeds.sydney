import React, { Component } from "react";
import Close from "./Close";
import LineItem from "./LineItem/";
import ShippingRadio from "./ShippingRadio/";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_vwrEmYVBuXu2F36jDcCBuhKT00nVBJrwdf");

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingMethod: undefined
    };

    this.selectShippingMethod = this.selectShippingMethod.bind(this);
  }

  selectShippingMethod(shippingMethod) {
    this.setState({ shippingMethod });
  }

  render() {
    const {
      isShowingCart,
      toggleCart,
      selectedProducts,
      modifyCart
    } = this.props;

    const { shippingMethod } = this.state;

    const orderArray = Object.keys(selectedProducts)
      .filter(key => selectedProducts[key].quantity > 0)
      .map(sku => selectedProducts[sku]);

    const proceedToCheckout = async event => {
      const stripe = await stripePromise;

      const itemsArray = orderArray.map(item => {
        return { sku: item.sku, quantity: item.quantity };
      });

      const shippingItem = { sku: shippingMethod.sku, quantity: 1 };

      const { error } = await stripe.redirectToCheckout({
        items: [...itemsArray, shippingItem],
        successUrl: "http://localhost:3000/success",
        // successUrl: "https://oboereeds.sydney/success",
        cancelUrl: "http://localhost:3000/",
        // cancelUrl: "https://oboereeds.sydney",
        shippingAddressCollection: {
          allowedCountries: ["AU"]
        }
      });
    };

    const orderTotal = orderArray.reduce((acc, lineItem) => {
      return acc + Number(lineItem.price) * lineItem.quantity;
    }, 0);

    const shippingTotal = shippingMethod ? shippingMethod.price : 0;

    return (
      <aside
        className={`cart ${isShowingCart ? "cart-active" : ""}`}
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

export default Cart;
