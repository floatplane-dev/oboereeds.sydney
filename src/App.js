import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./Header/";
import Home from "./Home/";
import ReedInformation from "./ReedInformation/";
import Thankyou from "./Thankyou/";
import Footer from "./Footer/";


import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "Home/Cart/";

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
    const { toggleCart, modifyCart } = this;
    const { selectedProducts } = this.state;

    return (
      <Router>
        <Header
          toggleCart={toggleCart}
          selectedProducts={selectedProducts}/>

        <main>
          <Switch>
            <Route exact path="/">
              <Home
                toggleCart={toggleCart}
                modifyCart={modifyCart}
                selectedProducts={selectedProducts}/>
            </Route>

            <Route path="/thankyou">
              <Thankyou
                toggleCart={toggleCart}
                modifyCart={modifyCart}
                selectedProducts={selectedProducts}/>
            </Route>

            <Route path="/reed-information">
              <ReedInformation
                toggleCart={toggleCart}
                modifyCart={modifyCart}
                selectedProducts={selectedProducts}/>
            </Route>
          </Switch>
        </main>

        <Footer />
      </Router>
    );
  }
}

export default App;
