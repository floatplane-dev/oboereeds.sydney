import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal/";
import BuyButton from "./BuyButton/";

class Beginner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: undefined,
      images: [
        {
          srcLowRes: "/img/product-images/student1@180x180.webp",
          srcHighRes: "/img/product-images/student1@800x800.webp",
          caption: "The Beginner Reed"
        },
        {
          srcLowRes: "/img/product-images/student2@180x180.webp",
          srcHighRes: "/img/product-images/student2@800x800.webp",
          caption: "Le Roseau Chantant Cane"
        },
        {
          srcLowRes: "/img/product-images/student3@180x180.webp",
          srcHighRes: "/img/product-images/student3@800x800.webp",
          caption: "Handmade in Sydney, Australia"
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
          <section id="student-reed">
            <div>
              <div className="product student">
                <h2>Beginner Reed</h2>
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
                <span className="price">$24.99</span>

                <BuyButton
                    handleClick={() => {
                    modifyCart("price_1OUiBCDBTPoEHOlT6jv4Lyq5", 1);
                    toggleCart();
                  }}
                  />
                {/* <p class="disclaimer">* Due to popular demand, this product is currently out of stock. You can still place orders for them, but we won't be able to deliver them to you until more materials arrive.</p> */}
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

export default Beginner;
