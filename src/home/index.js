import React, { Component } from "react";
import Hero from "./Hero";
import Student from "./Student";
import Intermediate from "./Intermediate";
import Randall from "./Randall";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_vwrEmYVBuXu2F36jDcCBuhKT00nVBJrwdf");

class Home extends Component {
  render() {
    const handleClick = async (event, sku) => {
      // When the customer clicks on the button, redirect them to Checkout.
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        items: [
          // Replace with the ID of your SKU
          { sku: sku, quantity: 1 }
        ],
        successUrl: "https://example.com/success",
        cancelUrl: "https://example.com/cancel",
        shippingAddressCollection: {
          allowedCountries: ["AU"]
        }
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    };

    return (
      <main>
        <Hero />
        <Student handleClick={handleClick} />
        <Intermediate handleClick={handleClick} />
        <Randall handleClick={handleClick} />
      </main>
    );
  }
}

export { Home, Hero };
