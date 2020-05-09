import React, { Component } from "react";

class ScrollNavigation extends Component {
  render() {
    const { children } = this.props;

    return (
      <main className="scroll-navigation">
        <nav>
          {children.map(child => (
            <li>{child.props.navigationTitle}</li>
          ))}
        </nav>

        {children}
      </main>
    );
  }
}

export default ScrollNavigation;
