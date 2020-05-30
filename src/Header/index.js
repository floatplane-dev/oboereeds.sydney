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

    this.onScroll = this.onScroll.bind(this);
    this.onResize = this.onResize.bind(this);
    this.setLastScrollY = this.setLastScrollY.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);

    if (window.innerWidth > 1000) {
      this.setState({ lastScrollY: window.scrollY });
      window.addEventListener("scroll", this.onScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onScroll);

    if (window.innerWidth > 1000) {
      window.removeEventListener("scroll", this.onScroll);
    }
  }

  onResize = () => {
    const element = document.querySelector("header#top");
    element.style.position = "fixed";
    element.style.top = `0px`;
  };

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
      if (scrollY <= headerOffset) {
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

    const element = document.querySelector("header#top");

    element.style.position = isFixed ? "fixed" : "absolute";
    element.style.top = `${headerOffset}px`;
  }

  render() {
    const { toggleCart, selectedProducts } = this.props;

    const orderArray = Object.keys(selectedProducts)
      .filter(key => selectedProducts[key].quantity > 0)
      .map(sku => selectedProducts[sku]);

    return (
      <header id="top">
        <Link to="/">
          <img src="oboe-icon.png" alt="" />
          <img src="reeds-icon.png" alt="" />
          <img src="sydney-icon.png" alt="" />
        </Link>
        <nav>
          <Link to="buying-guide">Reed Buying Guide</Link>
          {/*<a
            href="https://www.instagram.com/oboethings"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="icon" src="instagram-logo.png" alt="" />
          </a>*/}
          <button>
            <img
              className="icon"
              src="cart.svg"
              alt=""
              onClick={() => toggleCart()}
            />
            <span>
              {orderArray.length
                ? orderArray.reduce(
                    (acc, lineItem) => acc + lineItem.quantity,
                    0
                  )
                : null}
            </span>
          </button>
        </nav>
      </header>
    );
  }
}

export default Header;
