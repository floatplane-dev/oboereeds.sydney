import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

import {
  CartIcon
} from "Home/Cart/";

class Header extends Component {
  render() {
    const { toggleCart, selectedProducts } = this.props;
    return (
      <header
        id="header">
        <nav className="gutters">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink exact to="/reed-information">
            Reed Information
          </NavLink>
          <a href="#contact">
            Contact
          </a>
          <CartIcon
            toggleCart={toggleCart}
            selectedProducts={selectedProducts}
          />
        </nav>
      </header>
    );
  }
}

export default Header;
