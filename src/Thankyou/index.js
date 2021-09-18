import React, { Component } from "react";

import {
  NavLink
} from "react-router-dom";

class Thankyou extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="thankyou">
          <NavLink exact to="/" activeStyle={{ display: "none" }}>
            Home
          </NavLink>
        </header>

        <section className="thankyou">
          <div>
            <h1>Thank you</h1>
            <p>
              Thank you for shopping with Sydney Oboe Reeds. <br/>You will receive a confirmation of purchase email shortly.
            </p>
          </div>
          <img
            src="/img/thankyou@330x450.webp"
            alt="/img/thankyou@330x450.webp"
             />
        </section>
      </React.Fragment>
    );
  }
}

export default Thankyou;
