import React, { Component } from "react";
import BuyButton from "./BuyButton/";

class Professional extends Component {
  render() {
    const { modifyCart } = this.props;
    return (
      <section id="professional-reed">
        <div className="product professional">
          <h2>Professional Reed</h2>
          <p>
            The ultimate in luxury handcrafted reeds. Selected for their
            outstanding tone colour, vibration and stability these reeds are of
            the finest quality in our workshop.
          </p>
          <ul>
            <li>Superior tone colour</li>
            <li>For advanced players</li>
            <li>The finest cane, handpicked from each batch</li>
          </ul>
          <span className="price">$47.99</span>
          <BuyButton clickHandler={() => modifyCart("price_HNzcuAvZoAPxIj", 1)} />

        </div>
        <iframe
          height="350"
          src="https://www.youtube.com/embed/aCHQSvrhT7M?modestbranding=1&autohide=1&showinfo=0&controls=0"
          frameBorder="0"
          controls={0}
          showinfo={0}
          modestbranding={1}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </section>

    );
  }
}

export default Professional;
