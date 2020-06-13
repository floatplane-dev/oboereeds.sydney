import React, { Component } from "react";

class CanvasBackground extends Component {
  render() {
    return (
      <section
        id={this.props.navigationTitle}
        className={`${this.props.navigationTitle}`}
        style={{ height: "1000vw", width: "100vw" }}
      ></section>
    );
  }
}

export default CanvasBackground;
