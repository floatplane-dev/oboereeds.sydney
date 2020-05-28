import React, { Component } from "react";
import SideNav from "./SideNav";
import debounce from "../../debounce";

class ScrollNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: undefined, // defined in componentDidMount
      tempTitles: []
    };

    this._onScroll = this.onScroll.bind(this);
    this.calculateActiveSection = this.calculateActiveSection.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth > 1000) {
      window.addEventListener("scroll", this._onScroll);
    }
  }

  componentWillUnmount() {
    if (window.innerWidth > 1000) {
      window.removeEventListener("scroll", this._onScroll);
    }
  }

  onScroll = debounce(() => this.calculateActiveSection(), 10, true);

  calculateActiveSection() {
    const scrollPos = window.scrollY;

    const sections = Array.prototype.slice.call(
      document.querySelectorAll("section")
    );

    const currentSectionElement = sections.find((section, index) => {
      const activeSectionMarker = section.offsetTop + section.offsetHeight / 2;
      return activeSectionMarker >= scrollPos;
    });

    const currentSection = currentSectionElement.classList[0];

    if (this.state.activeSection !== currentSection) {
      this.setState({ activeSection: currentSection });
    }
  }

  render() {
    const { children } = this.props;
    const { activeSection } = this.state;

    return (
      <main className="scroll-navigation">
        {window.innerWidth > 1000 && (
          <SideNav
            activeSection={activeSection}
            navigationChildren={children}
          />
        )}

        {children}
      </main>
    );
  }
}

export default ScrollNavigation;
