import React, { Component } from "react";

class Student extends Component {
  render() {
    return (
      <section className={`${this.props.navigationTitle} product`} style={{}}>
        <div className="left">
          <h2>
            Hand crafted student reed <span>$19.99</span>
          </h2>
          <p>
            This reed is crafted from premium{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.le-roseau-oboe.com/en/"
            >
              Le Roseau Chantant
            </a>{" "}
            cane by musical professionals in Sydney, and is perfect for students
            of all levels. It is cut with a hard resistance in the european
            style.
          </p>
          <button className="call-to-action">Buy this reed</button>
        </div>
      </section>
    );
  }
}

export default Student;
