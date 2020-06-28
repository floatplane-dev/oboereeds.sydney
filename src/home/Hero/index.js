import React, { Component } from "react";
import SydneyBackground from "./SydneyBackground";

class Home extends Component {
  render() {
    return (
      <section className={`${this.props.navigationTitle} hero`}>
        <SydneyBackground />
        <h1>Sydney Oboe Reeds</h1>
      </section>
    );
  }
}

export default Home;
