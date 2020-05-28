import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "../debounce";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScroll: 0,
      isFixed: false,
      headerOffset: 0
    };

    this._onScroll = this.onScroll.bind(this);
    this.setLastScrollY = this.setLastScrollY.bind(this);
  }

  componentDidMount() {
    this.setState({ lastScrollY: window.scrollY });
    window.addEventListener("scroll", this._onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._onScroll);
  }

  onScroll = debounce(this.setLastScrollY, 5, true);

  setLastScrollY() {
    const { headerOffset, prevScroll, isFixed } = this.state;
    const { scrollY } = window;

    const scrollingDown = scrollY > prevScroll;

    let newHeaderOffset = headerOffset;
    let newIsFixed = isFixed;

    if (scrollingDown) {
      if (isFixed) {
        // transition from position: fixed to position: absolute
        newHeaderOffset = scrollY;
        newIsFixed = false;
      } else {
        const headerHeight = document.querySelector("header").offsetHeight;
        if (scrollY > headerOffset + headerHeight) {
          // continually set top so the header is just above the viewport
          newHeaderOffset = scrollY - headerHeight;
        }
      }
    } else {
      if (scrollY < headerOffset) {
        // transition from position: absolute to position: fixed
        newHeaderOffset = 0;
        newIsFixed = true;
      }
    }

    this.setState({
      prevScroll: scrollY,
      headerOffset: newHeaderOffset,
      isFixed: newIsFixed
    });
  }

  render() {
    const { isFixed, headerOffset } = this.state;
    const { toggleCart, selectedProducts } = this.props;

    return (
      <header
        style={{ position: isFixed ? "fixed" : "absolute", top: headerOffset }}
      >
        <Link to="/">
          <img src="oboe-icon.png" alt="" />
          <img src="reeds-icon.png" alt="" />
          <img src="sydney-icon.png" alt="" />
        </Link>
        <nav>
          <Link to="buying-guide">Reed Buying Guide</Link>
          <a
            href="https://www.instagram.com/oboethings"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="instagram-logo.png" alt="" />
          </a>
          <button>
            <img
              className="icon"
              src="cart.svg"
              alt=""
              onClick={() => toggleCart()}
            />
            <span>
              {selectedProducts.length ? selectedProducts.length : null}
            </span>
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;
