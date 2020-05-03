import React, { Component } from "react";

class Student extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <section className="product" style={{ backgroundColor: "#ffeb3b38" }}>
        <div className="right">
          <h2>
            High quality intermediate reed <span>$31.99</span>
          </h2>
          <button
            onClick={e => handleClick(e, "sku_HD6K593YsNVnaB")}
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
