import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal/";
import BuyButton from "./BuyButton/";

class Intermediate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: undefined,
      images: [
        {
          srcLowRes: "/img/product-images/intermediate1@180x180.webp",
          srcHighRes: "/img/product-images/intermediate1@800x800.webp",
          caption: "The Intermediate Reed"
        },
        {
          srcLowRes: "/img/product-images/intermediate2@180x180.webp",
          srcHighRes: "/img/product-images/intermediate2@800x800.webp",
          caption: "Handmade in Sydney, Australia"
        },
        {
          srcLowRes: "/img/product-images/intermediate3@180x180.webp",
          srcHighRes: "/img/product-images/intermediate3@800x800.webp",
          caption: "Le Roseau Chantant Cane"
        }
      ]
    }

    this.hideModal = this.hideModal.bind(this);
    this.imageForward = this.imageForward.bind(this);
    this.imageBack = this.imageBack.bind(this);
  }

  showModal(index) {
    document.body.classList.add("scrolling-disabled");
    this.setState({activeIndex: index});
  }

  hideModal() {
    document.body.classList.remove("scrolling-disabled");
    this.setState({activeIndex: undefined});
  }

  imageForward() {
    this.setState({activeIndex: this.state.activeIndex + 1})
  }

  imageBack() {
    this.setState({activeIndex: this.state.activeIndex - 1})
  }

  render() {
    const { modifyCart, toggleCart } = this.props;
    const { images, activeIndex } = this.state;

    return (
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
          <BuyButton handleClick={() => {
            modifyCart("prod_HNzb1HHMmEPmmi", 1);
            toggleCart();
          }} />
        </div>

        <ul className="product-images">
          {
            images.map((image, index) =>
              <li key={index}>
                <img
                  src={image.srcLowRes}
                  data-caption={image.caption}
                  onClick={() => this.showModal(index)}
                />
              </li>
            )
          }
        </ul>

        {
          Number.isInteger(activeIndex) &&
          ReactDOM.createPortal(
            <Modal
              hideModal={this.hideModal}
              imageBack={this.imageBack}
              imageForward={this.imageForward}
              images={images}
              activeIndex={activeIndex}
              />,
            document.body
          )
        }

      </section>

    );
  }
}

export default Intermediate;
