import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { toggleCart } from "Home/Cart/";

function Header() {
  let location = useLocation();
  console.log({ location });
  return (
    <header
      style={{
        position:
          location.pathname === "/reed-information" ? "static" : "absolute",
      }}
    >
      <div>
        <nav className="navi">
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/reed-information">Reed Information</a>
          <a onClick={toggleCart}>
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
          </a>
          <a href="https://www.youtube.com/channel/UC3qxQnsPwbIjVzZBg7Clgzw">
            <i class="fa-brands fa-youtube fa-xl"></i>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
