import React, { Component } from "react";
import Hero from "./Hero";
import Student from "./Student";
import Intermediate from "./Intermediate";
import Randall from "./Randall";

class Home extends Component {
  render() {
    return (
      <main>
        <Hero />
        <Student />
        <Intermediate />
        <Randall />
      </main>
    );
  }
}

export { Home, Hero };
