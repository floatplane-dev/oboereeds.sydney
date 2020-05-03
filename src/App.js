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
        <Router>
          <Header />

          <Switch>
            <Route path="/buying-guide">
              <BuyingGuide />
            </Route>

            <Route path="/buying-guide">
              <About />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
