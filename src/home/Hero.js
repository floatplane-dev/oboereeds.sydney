import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <section className={`${this.props.navigationTitle} hero`}>
        <div
          className="fixed-background"
          style={{ backgroundImage: "url(opera-house.jpg)" }}
        />
        <h1>Sydney Oboe Reeds</h1>
      </section>
    );
  }
}

export default Home;
