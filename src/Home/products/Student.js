import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal/";
import BuyButton from "./BuyButton/";

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: undefined,
      images: [
        {
          srcLowRes: "/img/product-images/student1@180x180.webp",
          srcHighRes: "/img/product-images/student1@800x800.webp",
          caption: "The Student Reed"
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
    const { modifyCart } = this.props;
    const { images, activeIndex } = this.state;

    return (
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

              <BuyButton clickHandler={() => modifyCart("price_HNza6zL9e3th0a", 1)} />
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

export default Student;