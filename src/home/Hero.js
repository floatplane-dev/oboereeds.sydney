import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <section
        className={`${this.props.navigationTitle} hero`}
        style={{ backgroundImage: "url(friso-baaij-GBNRsIc6Wq8-unsplash.jpg)" }}
      >
        <h1>Sydney Oboe Reeds</h1>
      </section>
    );
  }
}

export default Home;
