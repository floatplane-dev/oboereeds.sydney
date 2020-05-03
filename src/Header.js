import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <h1>Sydney Oboe Reeds</h1>
        </Link>
        <nav>
          <Link to="buying-guide">buying guide</Link>
          <Link to="contact">contact</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
