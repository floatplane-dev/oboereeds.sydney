import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Success extends Component {
  constructor(props) {
    super(props);

    props.resetCart();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Success;
