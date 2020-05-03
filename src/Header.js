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
          <Link to="buying-guide">Buying Guide</Link>
          <a href="https://www.instagram.com/oboethings" target="_blank">
            <img src="instagram-logo.png" />
          </a>
        </nav>
      </header>
    );
  }
}

export default Header;
