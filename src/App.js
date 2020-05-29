import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import Header from "./Header/";
import Cart from "./Cart/";
import Footer from "./Footer";
import Home from "./home";
import BuyingGuide from "./buying-guide";
import Success from "./Success";

import { allProducts } from "./allProducts";

class App extends Component {
  constructor(props) {
    super(props);
    const storedProducts =
      JSON.parse(window.localStorage.getItem("selectedProducts")) || {};
    let selectedProducts = allProducts;

    Object.keys(storedProducts).forEach(key => {
      selectedProducts[key].quantity = storedProducts[key].quantity;
    });

    this.state = {
      selectedProducts,
      isShowingCart: false
    };

    this.modifyCart = this.modifyCart.bind(this);
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

              <Route path="/success">
                <Success
                  resetState={() => {
                    window.localStorage.setItem(
                      "selectedProducts",
                      JSON.stringify(allProducts)
                    );
                    this.setState({ selectedProducts: allProducts });
                  }}
                />
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
