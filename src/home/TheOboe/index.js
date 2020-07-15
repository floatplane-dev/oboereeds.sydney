import React, { Component } from "react";
import OboeScene from "./three/";

class TheOboe extends Component {
  componentDidMount() {
    new OboeScene().render(document.getElementById("three"));
  }

  render() {
    return (
      <section
        id={this.props.navigationTitle}
        className={`${this.props.navigationTitle}`}
        style={{ height: `${window.outerHeight * 4}px` }}
      >
        <div id="three" style={{ height: `${window.outerHeight}px` }} />
      </section>
    );
  }
}

export default TheOboe;
