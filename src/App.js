import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./Header/";

import Home from "./Home/";
import ReedInformation from "./ReedInformation/";

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

            <Route path="/reed-information">
              <ReedInformation />
            </Route>
          </Switch>

          <Footer />

        </main>
      </Router>
    );
  }
}

export default App;
