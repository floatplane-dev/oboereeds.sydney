import React, { Component } from "react";
import "./App.scss";

import {
  Cart,
  CartIcon,
  toggleCart,
  modifyCart,
  resetCart,
  checkLocalstorage,
} from "./Cart/";

class App extends Component {
  constructor(props) {
    super(props);

    const selectedProducts = checkLocalstorage();

    console.log({ selectedProducts });
    this.state = {
      selectedProducts,
      isShowingCart: false,
    };

    this.modifyCart = modifyCart.bind(this);
    this.toggleCart = toggleCart.bind(this);
    this.resetCart = resetCart.bind(this);
  }

  createModal(e) {
    const [modalNode, figureNode, figcaptionNode, captionTextNode, imageNode] = [
      document.createElement("div"),
      document.createElement("figure"),
      document.createElement("figcaption"),
      document.createTextNode(e.target.dataset.caption),
      document.createElement("img"),
    ];

    const src = e.target.getAttribute("src");
    imageNode.alt = src;

    modalNode.setAttribute("id", "modal-wrapper");

    const qualityRegex = /180x180/gi;
    const modalSrc = src.replace(qualityRegex, "800x800");

    imageNode.src = modalSrc;

    figureNode.addEventListener("click", (e) => e.stopPropagation());
    modalNode.addEventListener("click", (e) => {
      e.target.remove();
      document.body.classList.toggle("scrolling-disabled");
    });

    figcaptionNode.appendChild(captionTextNode);
    figureNode.appendChild(figcaptionNode);
    figureNode.appendChild(imageNode);
    modalNode.appendChild(figureNode);
    document.body.appendChild(modalNode);

    document.body.classList.add("scrolling-disabled");
  }

  render() {
    const { selectedProducts } = this.state;
    return (
      <React.Fragment>

        <main>
          <header>
            <a id="navigation" href="/buying-guide">Buying Guide</a>
          </header>
          <section id="hero">
            <h1 className="centred">
              Sydney Oboe Reeds
            </h1>
          </section>

          <section id="student-reed">
            <div className="product student">
              <h2>Student Reed</h2>
              <p>
                This light weight reed is ideal for the beginner player. Handcrafted
                to be soft and light, beginners will play with ease. Unlike other
                student reeds on the market, this reed uses professional quality
                materials for a superior reed.
              </p>
              <ul>
                <li>The correct choice for beginner players</li>
                <li>Soft and light (easy to use)</li>
                <li>Extremely responsive</li>
              </ul>
              <span className="price">$19.99</span>
              <button
                onClick={() => this.modifyCart("price_HNza6zL9e3th0a", 1)}
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
            <ul className="product-images">
              <li>
                <img
                  src="/img/product-images/student1@180x180.webp"
                  data-caption="The Student Reed"
                  onClick={this.createModal}
                />
              </li>
              <li>
                <img
                  src="/img/product-images/student2@180x180.webp"
                  data-caption="Le Roseau Chantant Cane"
                  onClick={this.createModal}
                />
              </li>
              <li>
                <img
                  src="/img/product-images/student3@180x180.webp"
                  data-caption="Handmade in Sydney, Australia"
                  onClick={this.createModal}
                />
              </li>
            </ul>
          </section>

          <section id="intermediate-reed">
            <div className="product intermediate">
              <h2>Intermediate Reed</h2>
              <p>
                Designed for excellent response and stability, the Intermediate Reed
                is ideal for students of grade 3 AMEB and above. It strikes the
                perfect balance between a light weight, responsive reed that still
                provides a dark, rich professional sound.
              </p>
              <ul>
                <li>Rich sound and responsive</li>
                <li>Medium soft</li>
                <li>Suitable for AMEB level 3+ students</li>
              </ul>
              <span className="price">$24.99</span>
              <button
                onClick={() => this.modifyCart("prod_HNzb1HHMmEPmmi", 1)}
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
            <ul className="product-images">
              <li>
                <img
                  src="/img/product-images/intermediate1@180x180.webp"
                  data-caption="The Intermediate Reed"
                  onClick={this.createModal}
                />
              </li>
              <li>
                <img
                  src="/img/product-images/intermediate2@180x180.webp"
                  data-caption="Handmade in Sydney, Australia"
                  onClick={this.createModal}
                />
              </li>
              <li>
                <img
                  src="/img/product-images/intermediate3@180x180.webp"
                  data-caption="Le Roseau Chantant Cane"
                  onClick={this.createModal}
                />
              </li>
            </ul>
          </section>

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
                onClick={() => this.modifyCart("price_HNzcuAvZoAPxIj", 1)}
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
        </main>

        <CartIcon
          toggleCart={this.toggleCart}
          selectedProducts={selectedProducts}
        />
        <Cart
          selectedProducts={selectedProducts}
          toggleCart={this.toggleCart}
          modifyCart={this.modifyCart}
        />
      </React.Fragment>
    );
  }
}

export default App;
