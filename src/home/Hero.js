import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <section
        className={`${this.props.navigationTitle} hero`}
        style={{
          backgroundSize: "cover",
          backgroundImage: "url(alvin-engler-bIhpiQA009k-unsplash.jpg)"
        }}
      >
        <h1>Sydney Oboe Reeds</h1>
      </section>
    );
  }
}

export default Home;
