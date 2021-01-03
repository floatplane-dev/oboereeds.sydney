import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./Home/";
import BuyingGuide from "./BuyingGuide/";

import Header from "./Header/";

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

        </main>
      </Router>
    );
  }
}

export default App;
