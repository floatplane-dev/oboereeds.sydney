import React, { Component } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  let location = useLocation();
  console.log({ location });
  return (
    <footer>
      <div id="footer" className="gutters">
        <div className="footer1">
          <img src="/img/logo192.png" alt="/img/logo192.png" />
          <h4>© 2022 Sydney Oboe Reeds</h4>
        </div>
        <div id="footer2">
          <p>
            Contact us:
            <a href="mailto:sydneyoboereeds@gmail.com">
              {" "}
              sydneyoboereeds@gmail.com
            </a>
          </p>
          <p>
            Follow us:{" "}
            <a href="https://www.instagram.com/maddierandall/">
              <img src="./img/insta.png" alt="insta" />
            </a>
            <a href="https://www.youtube.com/channel/UC3qxQnsPwbIjVzZBg7Clgzw">
              <img src="./img/youtube.png" alt="youtube" />
            </a>
          </p>
          {location.pathname === "/reed-information" ? null : (
            <p>
              <a href="/reed-information">Further reed information</a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
