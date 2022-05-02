import React, { Component } from "react";

class Modal extends Component {
  render() {
    const { hideModal, imageBack, imageForward, images, activeIndex } = this.props;

    return (
      <div
        id="modal-wrapper"
        onClick={hideModal}>
        <figure onClick={e => {e.stopPropagation()}}>
          <img
            src={images[activeIndex].srcHighRes}
            alt={images[activeIndex].srcLowRes}
            />
          <figcaption>{images[activeIndex].caption}</figcaption>
          {
            activeIndex > 0 &&
            <img
              className="arrow back"
              src="/img/arrow_back_ios_new-24px.svg"
              alt="/img/arrow_back_ios_new-24px.svg"
              onClick={imageBack}/>
          }
          {
            activeIndex < images.length - 1 &&
            <img
              className="arrow forward"
              src="/img/arrow_forward_ios-24px.svg"
              alt="/img/arrow_forward_ios-24px.svg"
              onClick={imageForward}/>
          }
        </figure>
      </div>
    );
  }
}

export default Modal;
