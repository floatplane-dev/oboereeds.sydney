import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <NavLink exact to="/" activeStyle={{ display: "none" }}>
          Home
        </NavLink>

        <NavLink exact to="/buying-guide" activeStyle={{ display: "none" }}>
          Buying Guide
        </NavLink>
      </header>
    );
  }
}

export default Header;
