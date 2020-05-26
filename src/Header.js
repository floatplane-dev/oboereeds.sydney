import React, { Component } from "react";
import { Link } from "react-router-dom";
import debounce from "./debounce";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScroll: 0,
      isFixed: true,
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

    const headerHeight = document.querySelector("header").offsetHeight;
    const scrollingDown = scrollY > prevScroll;
    const scrollingUp = scrollY < prevScroll;

    this.setState({
      prevScroll: scrollY
    });

    if (scrollingUp) {
      if (scrollY < headerOffset) {
        // one off set { position: fixed }
        this.setState({
          headerOffset: 0,
          isFixed: true
        });
      } else if (!isFixed) {
        // scrolling up to bring the { position: absolute } header in to view
        this.setState({
          isFixed: false
        });
      }
    }

    if (scrollingDown) {
      if (isFixed) {
        // Scrolling down for the first time, trigger { position: absolute }
        this.setState({
          headerOffset: scrollY,
          isFixed: false
        });
        return;
      }

      if (scrollY > headerOffset + headerHeight) {
        this.setState({
          headerOffset: scrollY - headerHeight,
          isFixed: false
        });
        return;
      }
    }
  }

  render() {
    const { prevScroll, isFixed, headerOffset } = this.state;
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
            <img src="instagram-logo.png" alt="" />
          </a>
          <img src="cart.svg" alt="" />
        </nav>
      </header>
    );
  }
}

export default Header;
