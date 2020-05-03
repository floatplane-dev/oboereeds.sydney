import React, { Component } from "react";

class Student extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <section className="product" style={{ backgroundColor: "#e91e1e69" }}>
        <div class="left">
          <h2>
            Professional standard Randall Reed <span>$49.99</span>
          </h2>
          <button
            onClick={e => handleClick(e, "sku_HD6LyrvIxJcPpW")}
            className="call-to-action"
          >
            Buy this reed
          </button>
        </div>
      </section>
    );
  }
}

export default Student;
