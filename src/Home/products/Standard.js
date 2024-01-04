import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal/";
import BuyButton from "./BuyButton/";

class Standard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: undefined,
      images: [
        {
          srcLowRes: "/img/product-images/intermediate1@180x180.webp",
          srcHighRes: "/img/product-images/intermediate1@800x800.webp",
          caption: "The Standard Reed"
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
    document.getElementById('app').classList.add("scrolling-disabled");
    document.body.classList.add("scrolling-disabled");
    this.setState({activeIndex: index});
  }

  hideModal() {
    document.getElementById('app').classList.remove("scrolling-disabled");
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
        <div>
          <div className="product intermediate">
            <h2>Standard Reed</h2>
            <p>
              Designed for excellent response and stability, the Standard Reed
              is ideal for students of grade 3 AMEB and above. It strikes the
              perfect balance between a light weight, responsive reed that still
              provides a dark, rich professional sound.
            </p>
            <ul>
              <li>Rich sound and responsive</li>
              <li>Medium soft</li>
              <li>Suitable for AMEB level 3+ students</li>
            </ul>
            <span className="price">$28.99</span>
            <BuyButton
              handleClick={() => {
                modifyCart("price_1OUiDCDBTPoEHOlTxHaZY53i", 1);
                toggleCart();
              }}
              outOfStock={false}/>
            {/*<p class="disclaimer">* Due to popular demand, this product is currently out of stock. You can still place orders for them, but we won't be able to deliver them to you until more materials arrive.</p>*/}

          </div>

          <ul className="product-images">
            {
              images.map((image, index) =>
                <li key={index}>
                  <img
                    src={image.srcLowRes}
                    alt={image.srcLowRes}
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
              document.getElementById('app')
            )
          }
        </div>
      </section>

    );
  }
}

export default Standard;
