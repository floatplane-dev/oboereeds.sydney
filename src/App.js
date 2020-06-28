import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "./Cart/";
import Footer from "./Footer";
import Home from "./home";
import BuyingGuide from "./buying-guide";
import Success from "./Success";

class App extends Component {
  constructor(props) {
    super(props);

    const selectedProducts = checkLocalstorage();

    this.state = {
      selectedProducts,
      isShowingCart: false,
    };

    this.modifyCart = modifyCart.bind(this);
    this.toggleCart = toggleCart.bind(this);
    this.resetCart = resetCart.bind(this);
  }

  render() {
    const { selectedProducts, isShowingCart } = this.state;

    return (
      <React.Fragment>
        <div
          id="App"
          className={`App ${isShowingCart ? "cart-active" : ""}`}
          onClick={() => {
            if (isShowingCart) {
              this.toggleCart();
            }
          }}
        >
          <Router>
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

            <CartIcon
              toggleCart={this.toggleCart}
              selectedProducts={selectedProducts}
            />
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
