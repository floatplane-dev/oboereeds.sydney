import React, { Component } from "react";
import OboeScene from "./three/";

class TheOboe extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);

    new OboeScene().render(document.getElementById("oboe"));
  }

  render() {
    return (
      <section
        id={this.props.navigationTitle}
        className={`${this.props.navigationTitle}`}
        style={{ height: `${window.innerHeight * 4}px` }}
      >
        <div id="oboe" />
      </section>
    );
  }
}

export default TheOboe;
