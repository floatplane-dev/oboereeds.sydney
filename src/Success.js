import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Success extends Component {
  render() {
    this.props.resetState();
    return <Redirect to="/" />;
  }
}

export default Success;
