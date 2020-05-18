import React, { Component } from "react";
import ReactDOM from "react-dom";

class SideNav extends Component {
  render() {
    const { navigationChildren, activeSection } = this.props;

    return (
      <aside className="">
        {navigationChildren.map(child => {
          const { navigationTitle } = child.props;
          return (
            <li
              key={navigationTitle}
              className={`${navigationTitle} ${
                activeSection == navigationTitle ? "active" : ""
              }`}
              onClick={() => {
                const element = document.querySelector(
                  `section.${navigationTitle}`
                );

                element.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              <span>{navigationTitle}</span>
            </li>
          );
        })}
      </aside>
    );
  }
}

export default SideNav;
