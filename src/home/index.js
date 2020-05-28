import React, { Component } from "react";
import Hero from "./Hero";
import Student from "./Student";
import Intermediate from "./Intermediate";
import Randall from "./Randall";
import Bio from "./Bio";
import ScrollNavigation from "./ScrollNavigation/";

class Home extends Component {
  render() {
    const { addToCart, selectedProducts } = this.props;

    return (
      <ScrollNavigation>
        <Hero navigationTitle="sydney-oboe-reeds" />
        <Student
          navigationTitle="student"
          selectedProducts={selectedProducts}
          addToCart={addToCart}
        />
        <Intermediate
          navigationTitle="intermediate"
          selectedProducts={selectedProducts}
          addToCart={addToCart}
        />
        <Randall
          navigationTitle="randall"
          selectedProducts={selectedProducts}
          addToCart={addToCart}
        />
        <Bio navigationTitle="about-madeleine" />
      </ScrollNavigation>
    );
  }
}

export default Home;
