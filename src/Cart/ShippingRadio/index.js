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
            value='{"sku":"prod_HN6PKBNFv59Mo6","price":10}'
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
            value='{"sku":"prod_HN6QyQkYKjuyxb","price":15}'
            onChange={onChange}
          />
          <label htmlFor="express">
            Express Shipping <span>$15</span>
          </label>
        </li>
      </ul>
    );
  }
}

export default ShippingRadio;
