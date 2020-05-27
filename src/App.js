import React, { Component } from "react";
import Header from "./Header/";
import Cart from "./Cart/";
import Footer from "./Footer";
import "./App.scss";
import { Home } from "./home";
import { BuyingGuide } from "./buying-guide";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: JSON.parse(
        window.localStorage.getItem("selectedProducts")
      ),
      isShowingCart: false
    };
    this.addToCard = this.addToCard.bind(this);
    this.removeFromCard = this.removeFromCard.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart() {
    console.log("test", this.state.isShowingCart);
    this.setState({
      isShowingCart: !this.state.isShowingCart
    });
  }

  addToCard(item) {
    const { selectedProducts } = this.state;
    this.setState({
      selectedProducts: selectedProducts.push(item)
    });
  }

  removeFromCard(item) {
    const { selectedProducts } = this.state;
    this.setState({
      selectedProducts: selectedProducts.slice(item)
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

              <Route path="/">
                <Home addToCard={this.addToCard} />
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
