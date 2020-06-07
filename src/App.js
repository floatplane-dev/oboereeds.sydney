import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import CartIcon from "./CartIcon/";
import Cart from "./Cart/";
import Footer from "./Footer";
import Home from "./home";
import BuyingGuide from "./buying-guide";
import Success from "./Success";
import Background from "./Background";

import { allProducts } from "./allProducts";

class App extends Component {
  constructor(props) {
    super(props);
    let storedProducts =
      JSON.parse(window.localStorage.getItem("selectedProducts")) || {};

    // safely resets your storedProducts if there are stored ones which aren't included in allProducts
    if (
      Object.keys(storedProducts).some(
        key => !Object.keys(allProducts).find(innerKey => innerKey === key)
      )
    ) {
      storedProducts = {};
    }

    let selectedProducts = Object.assign({}, allProducts);

    Object.keys(storedProducts).forEach(key => {
      selectedProducts[key].quantity = storedProducts[key].quantity;
    });

    this.state = {
      selectedProducts,
      isShowingCart: false
    };

    this.modifyCart = this.modifyCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.resetCart = this.resetCart.bind(this);
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

  modifyCart(item, number) {
    const { selectedProducts } = this.state;

    const oldQuantity = selectedProducts[item].quantity;

    let newProductsState = Object.assign({}, selectedProducts);
    newProductsState[item].quantity = oldQuantity + number;

    window.localStorage.setItem(
      "selectedProducts",
      JSON.stringify(newProductsState)
    );

    this.setState({
      selectedProducts: newProductsState
    });
  }

  resetCart() {
    const emptyCart = allProducts;
    Object.keys(allProducts).forEach(
      product => (emptyCart[product].quantity = 0)
    );

    window.localStorage.setItem("selectedProducts", JSON.stringify(emptyCart));
    this.setState({ selectedProducts: emptyCart });
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
            <CartIcon
              toggleCart={this.toggleCart}
              selectedProducts={selectedProducts}
            />

            <Background />

            <Switch>
              <Route path="/buying-guide">
                <BuyingGuide />
              </Route>

              <Route path="/success">
                <Success resetCart={this.resetCart} />
              </Route>

              <Route path="/">
                <Home
                  selectedProducts={selectedProducts}
                  modifyCart={this.modifyCart}
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
          modifyCart={this.modifyCart}
        />
      </React.Fragment>
    );
  }
}

export default App;
