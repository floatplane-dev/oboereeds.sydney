import React, { Component } from "react";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { isShowingCart, toggleCart } = this.props;

    return (
      <aside className={`cart ${isShowingCart ? "cart-active" : ""}`}>
        <p className="button2" onClick={() => toggleCart()}>
          x
        </p>
      </aside>
    );
  }
}

export default Cart;
