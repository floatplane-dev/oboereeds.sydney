import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from "./Header/";

import Home from "./Home/";
import ReedInformation from "./ReedInformation/";
import Thankyou from "./Thankyou/";

import Footer from "./Footer/";

class App extends Component {
  render() {
    return (
      <Router>
        <main  className="parallax">

          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
              <Footer />
            </Route>

            <Route exact path="/thankyou">
              <Thankyou />
            </Route>

            <Route exact path="/reed-information">
              <Header />
              <ReedInformation />
              <Footer />
            </Route>
          </Switch>

        </main>
      </Router>
    );
  }
}

export default App;
