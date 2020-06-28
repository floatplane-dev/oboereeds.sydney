import React, { Component } from "react";

class CanvasBackground extends Component {
  render() {
    return (
      <section
        id={this.props.navigationTitle}
        className={`${this.props.navigationTitle}`}
        style={{ height: `${window.innerHeight * 3.6}px` }}
      />
    );
  }
}

export default CanvasBackground;
