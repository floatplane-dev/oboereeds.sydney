import React, { Component } from "react";

class Student extends Component {
  render() {
    return (
      <section
        className={`${this.props.navigationTitle} product`}
        style={{ backgroundColor: "green" }}
      >
        <div className="right">
          <h2>
            High quality intermediate reed <span>$31.99</span>
          </h2>
          <button className="call-to-action">Buy this reed</button>
        </div>
      </section>
    );
  }
}

export default Student;
