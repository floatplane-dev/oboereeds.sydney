import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./Header/";

import Home from "./Home/";
import BuyingGuide from "./BuyingGuide/";

import Footer from "./Footer/";

class App extends Component {
  render() {
    return (
      <Router>
        <main  className="parallax">
          <Header />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/buying-guide">
              <BuyingGuide />
            </Route>
          </Switch>

          <Footer />

        </main>
      </Router>
    );
  }
}

export default App;
