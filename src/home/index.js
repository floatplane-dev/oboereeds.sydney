import React, { Component } from "react";
import Hero from "./Hero/";
import Student from "./Student";
import Intermediate from "./Intermediate";
import Randall from "./Randall";
import Bio from "./Bio";
import TheOboe from "./TheOboe/";
import ScrollNavigation from "./ScrollNavigation/";

class Home extends Component {
  render() {
    const { modifyCart, selectedProducts } = this.props;

    return (
      <ScrollNavigation>
        <Hero navigationTitle="sydney-oboe-reeds" />
        <Student
          navigationTitle="student"
          selectedProducts={selectedProducts}
          modifyCart={modifyCart}
        />
        <Intermediate
          navigationTitle="intermediate"
          selectedProducts={selectedProducts}
          modifyCart={modifyCart}
        />
        <Randall
          navigationTitle="randall"
          selectedProducts={selectedProducts}
          modifyCart={modifyCart}
        />
        <TheOboe navigationTitle="the-oboe" />
        <Bio navigationTitle="about-madeleine" />
      </ScrollNavigation>
    );
  }
}

export default Home;
