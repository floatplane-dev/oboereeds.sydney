import React, { Component } from "react";
import debounce from "../debounce.js";
import backgroundOpacity from "./backgroundOpacity";
import Oboe from "./oboe/";

class ScrollComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onScroll = this.onScroll.bind(this);
    this.setPositionRules = this.setPositionRules.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    backgroundOpacity();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = debounce(() => this.setPositionRules(), 10, true);

  setPositionRules = () => {
    backgroundOpacity();
  };

  render() {
    return (
      <div className="ScrollComponents">
        <div
          id="background"
          style={{ backgroundImage: "url(opera-house.jpg)" }}
        />
      </div>
    );
  }
}

export default ScrollComponents;
