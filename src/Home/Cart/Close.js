import React, { Component } from "react";

class Close extends Component {
  render() {
    const { toggleCart } = this.props;

    return (
      <button>
        <img onClick={() => toggleCart()} src="img/close.svg" alt="" />
      </button>
    );
  }
}

export default Close;
