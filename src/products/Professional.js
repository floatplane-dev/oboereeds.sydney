import React, { Component } from "react";

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
          <button
            onClick={() => modifyCart("price_HNzcuAvZoAPxIj", 1)}
            type="button"
            className="buy"
            >
            <span>Add to cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
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
