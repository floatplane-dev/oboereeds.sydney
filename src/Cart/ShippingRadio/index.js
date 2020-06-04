import React, { Component } from "react";

class ShippingRadio extends Component {
  render() {
    const { selectShippingMethod } = this.props;

    const onChange = e => {
      const method = JSON.parse(e.currentTarget.value);
      selectShippingMethod(method);
    };

    return (
      <ul className="shipping-radio">
        <p>Shipping method:</p>
        <li>
          <input
            type="radio"
            id="standard"
            name="shipping"
            value='{"price_id":"price_HNzjkFbQIBNClu","price":10}'
            onChange={onChange}
          />
          <label htmlFor="standard">
            Standard Shipping <span>$10</span>
          </label>
        </li>

        <li>
          <input
            type="radio"
            id="express"
            name="shipping"
            value='{"price_id":"price_HNziKfRMowH5bP","price":15}'
            onChange={onChange}
          />
          <label htmlFor="express">
            Express Shipping <span>$15</span>
          </label>
        </li>

        <li>
          <input
            type="radio"
            id="next-lesson"
            name="shipping"
            value='{"price_id": "false","price":0}'
            onChange={onChange}
          />
          <label htmlFor="next-lesson">
            Next Lesson Delivery <span>Free</span>
          </label>
        </li>
      </ul>
    );
  }
}

export default ShippingRadio;
