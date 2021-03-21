import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "Home/Cart/";

import Hero from "Home/Hero/"
import Why from "Home/Why/"
import {
  Student,
  Intermediate,
  Professional
} from "Home/products";

import About from "Home/About/"


class Home extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   const selectedProducts = checkLocalstorage();
  //
  //   this.state = {
  //     selectedProducts,
  //     isShowingCart: false,
  //   };
  //
  //   this.modifyCart = modifyCart.bind(this);
  //   this.toggleCart = toggleCart.bind(this);
  //   this.resetCart = resetCart.bind(this);
  // }

  render() {
    // const { selectedProducts } = this.state;
    const { toggleCart, modifyCart, selectedProducts } = this.props;
    return (
      <React.Fragment>
        <Hero />
        <Why />

        <Student modifyCart={modifyCart} toggleCart={toggleCart}/>
        {/*<CartIcon
          toggleCart={this.toggleCart}
          selectedProducts={selectedProducts}
        />*/}
        <Intermediate modifyCart={modifyCart} toggleCart={toggleCart}/>
        <Professional modifyCart={modifyCart} toggleCart={toggleCart}/>

        <About />

        {
          ReactDOM.createPortal(
            <Cart
              selectedProducts={selectedProducts}
              toggleCart={toggleCart}
              modifyCart={modifyCart}
            />,
            document.getElementById('app')
          )
        }

      </React.Fragment>

    );
  }
}

export default Home;
