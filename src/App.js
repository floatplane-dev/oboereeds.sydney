import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Header from "./Header/";
import Cart from "./Cart/";
import Footer from "./Footer";
import Home from "./home";
import BuyingGuide from "./buying-guide";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts:
        JSON.parse(window.localStorage.getItem("selectedProducts")) || [],
      isShowingCart: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart() {
    const { isShowingCart } = this.state;

    if (!isShowingCart) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    this.setState({
      isShowingCart: !isShowingCart
    });
  }

  addToCart(item, number) {
    const { selectedProducts } = this.state;

    const newProductsState = [
      ...selectedProducts,
      ...new Array(number).fill(item)
    ];

    window.localStorage.setItem(
      "selectedProducts",
      JSON.stringify(newProductsState)
    );

    this.setState({
      selectedProducts: newProductsState
    });
  }

  removeFromCart(item) {
    const { selectedProducts } = this.state;
    const newProductsState = selectedProducts.slice(item, 1);

    window.localStorage.setItem("selectedProducts", newProductsState);

    this.setState({
      selectedProducts: newProductsState
    });
    console.log("remove from cart", { newProductsState });
  }

  render() {
    const { selectedProducts, isShowingCart } = this.state;

    return (
      <React.Fragment>
        <div
          className={`App ${isShowingCart ? "cart-active" : ""}`}
          onClick={() => {
            if (isShowingCart) {
              this.toggleCart();
            }
          }}
        >
          <Router>
            <Header
              selectedProducts={selectedProducts}
              toggleCart={this.toggleCart}
            />

            <Switch>
              <Route path="/buying-guide">
                <BuyingGuide />
              </Route>

              <Route path="/">
                <Home
                  selectedProducts={selectedProducts}
                  addToCart={this.addToCart}
                />
              </Route>
            </Switch>

            <Footer />
          </Router>
        </div>

        <Cart
          isShowingCart={isShowingCart}
          selectedProducts={selectedProducts}
          toggleCart={this.toggleCart}
        />
      </React.Fragment>
    );
  }
}

export default App;
