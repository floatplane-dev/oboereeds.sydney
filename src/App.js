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

  componentDidMount() {
  //   window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
  //   });
  }

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

            <Route path="/thankyou">
              <Thankyou />
            </Route>

            <Route path="/reed-information">
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
