import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <section className={`${this.props.navigationTitle} hero`} style={{}}>
        <h1>Sydney Oboe Reeds (beta)</h1>
      </section>
    );
  }
}

export default Home;
