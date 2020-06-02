import React, { Component } from "react";
import Close from "./Close";
import LineItem from "./LineItem/";
import ShippingRadio from "./ShippingRadio/";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_live_Lljg8yyI2fmZZ1jz0q0y5JY200s0hsAvj3");

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
      .map(price_id => selectedProducts[price_id]);

    const proceedToCheckout = async event => {
      const stripe = await stripePromise;

      const itemsArray = orderArray.map(item => {
        return { price: item.price_id, quantity: item.quantity };
      });

      const shippingItem = { price: shippingMethod.price_id, quantity: 1 };

      console.log({ items: [...itemsArray, shippingItem] });

      const { error } = await stripe.redirectToCheckout({
        items: [...itemsArray, shippingItem],
        successUrl: "https://oboereeds.sydney/success",
        cancelUrl: "https://oboereeds.sydney",
        shippingAddressCollection: {
          allowedCountries: ["AU"]
        }
      });

      console.error({ error });
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
