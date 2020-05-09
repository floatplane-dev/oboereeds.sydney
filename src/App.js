import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.scss";
import { Home } from "./home";
import { BuyingGuide } from "./buying-guide";
import { About } from "./about";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Coming soon</h1>
      </div>
    );
  }
}

export default App;
