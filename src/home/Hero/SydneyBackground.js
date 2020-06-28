import React, { Component } from "react";
import debounce from "helpers/debounce.js";

class SydneyBackground extends Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    this.backgroundOpacity();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  backgroundOpacity() {
    const { innerHeight, scrollY } = window;

    if (scrollY > (innerHeight * 2) / 3) {
      const el = document.getElementById("SydneyBackground");
      el.style.opacity = 0;
    } else if (scrollY > innerHeight / 3) {
      const partial = (
        (innerHeight / 3 - (scrollY - innerHeight / 3)) /
        (innerHeight / 3)
      ).toFixed(2);
      const el = document.getElementById("SydneyBackground");
      el.style.opacity = partial;
    } else {
      const el = document.getElementById("SydneyBackground");
      el.style.opacity = 1;
    }
  }

  onScroll = debounce(() => this.backgroundOpacity(), 10, true);

  render() {
    return (
      <div
        id="SydneyBackground"
        style={{ backgroundImage: "url(opera-house.jpg)" }}
      />
    );
  }
}

export default SydneyBackground;
