import React, { Component } from "react";

class Student extends Component {
  render() {
    return (
      <section
        className={`${this.props.navigationTitle} product`}
        style={{ backgroundColor: "#e91e1e69" }}
      >
        <div className="left">
          <h2>
            Professional standard Randall Reed <span>$49.99</span>
          </h2>
          <button className="call-to-action">Buy this reed</button>
        </div>
      </section>
    );
  }
}

export default Student;
