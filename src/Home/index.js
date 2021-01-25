import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "Home/Cart/";

import {
  Student,
  Intermediate,
  Professional
} from "Home/products";

class Home extends Component {
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
    const { selectedProducts } = this.state;
    return (
      <React.Fragment>
        <section id="hero">
          <div className="parallax__layer--back">
            <img
              id="parallax-background"
              src="/img/hero@1200x800.webp" />
          </div>

          <h1 className="centred">
            Sydney Oboe Reeds
          </h1>
        </section>

        <Student modifyCart={this.modifyCart} toggleCart={this.toggleCart}/>
        <Intermediate modifyCart={this.modifyCart} toggleCart={this.toggleCart}/>
        <Professional modifyCart={this.modifyCart} toggleCart={this.toggleCart}/>

        {
          ReactDOM.createPortal(
            <React.Fragment>
              <CartIcon
                toggleCart={this.toggleCart}
                selectedProducts={selectedProducts}
              />

              <Cart
                selectedProducts={selectedProducts}
                toggleCart={this.toggleCart}
                modifyCart={this.modifyCart}
              />
            </React.Fragment>,
            document.body
          )
        }

      </React.Fragment>

    );
  }
}

export default Home;
