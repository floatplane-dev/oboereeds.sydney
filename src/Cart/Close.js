import React, { Component } from "react";

class Close extends Component {
  render() {
    const { toggleCart } = this.props;

    return (
      <button>
        <img onClick={() => toggleCart()} src="close.svg" alt="" />
      </button>
    );
  }
}

export default Close;
