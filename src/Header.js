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

    // console.log({ headerOffset, scrollingUp, scrollY });

    let newOffset;
    if (scrollingUp && scrollY < headerOffset) {
      console.log("fixed");
      this.setState({
        headerOffset: 0,
        isFixed: true
      });
    } else if (scrollingUp && !isFixed) {
      console.log("scrollingUp", { headerOffset });
      this.setState({
        isFixed: false
      });
    }

    if (scrollingDown && scrollY > headerOffset + headerHeight) {
      // play catch up so it's there incase you go up
      // headerOffset: scrollY - headerOffset
      // console.log({ scrollY, headerOffset, headerHeight });
      // console.log("catchup", scrollY - headerHeight);

      if (isFixed) {
        console.log("set isFixed to false");
        this.setState({
          headerOffset: scrollY,
          isFixed: false
        });
      } else {
        console.log("normall Scrolldown");
        this.setState({
          headerOffset: scrollY - headerHeight,
          isFixed: false
        });
      }
    }

    this.setState({
      prevScroll: scrollY
    });

    //
    // // const isFixed = scrollY < headerOffset;
    // const isFixed = scrollY < prevScroll;
    //
    // const isScrollingUp = scrollY < prevScroll;
    //
    // const headerHeight = document.querySelector("header").offsetHeight;
    // const trailingTop = prevScroll - headerHeight;
    // const isTrailing = trailingTop > scrollY;
    //
    // let newOffset;
    //
    // if (isTrailing) {
    //   // is shuddering just out of view
    //   newOffset = scrollY - headerHeight;
    // } else {
    //   // is frozen as I scroll back up to it
    //   newOffset = headerOffset;
    // }
    //
    // console.log({
    //   isTrailing,
    //   prevScroll: scrollY,
    //   headerOffset: newOffset,
    //   isFixed
    // });
    //
    // this.setState({
    //   prevScroll: scrollY,
    //   headerOffset: newOffset,
    //   isFixed
    // });
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
          <Link to="about">About Madeleine</Link>
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
