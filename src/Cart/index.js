import React, { Component } from "react";
import Close from "./Close";

// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_vwrEmYVBuXu2F36jDcCBuhKT00nVBJrwdf");

// const handleClick = async (event, sku) => {
//   // When the customer clicks on the button, redirect them to Checkout.
//   const stripe = await stripePromise;
//   const { error } = await stripe.redirectToCheckout({
//     items: [
//       // Replace with the ID of your SKU
//       { sku: sku, quantity: 1 }
//     ],
//     successUrl: "https://example.com/success",
//     cancelUrl: "https://example.com/cancel",
//     shippingAddressCollection: {
//       allowedCountries: ["AU"]
//     }
//   });
// };

class Cart extends Component {
  render() {
    const { isShowingCart, toggleCart, selectedProducts } = this.props;

    return (
      <aside className={`cart ${isShowingCart ? "cart-active" : ""}`}>
        <header>
          <h1>Your Cart</h1>
          <Close toggleCart={toggleCart} />
        </header>
        <main>
          <h2>{`${selectedProducts.length || "No"} products selected`}</h2>
        </main>
      </aside>
    );
  }
}

export default Cart;
