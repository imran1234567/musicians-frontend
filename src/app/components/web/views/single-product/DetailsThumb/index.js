import React, { Component } from "react";

export class DetailsThumb extends Component {
  render() {
    const { product, tab, myRef } = this.props;
    return (
      <div className="thumb" ref={myRef}>
        {product.map((photo, index) => (
          <img
            src={product.photo}
            alt=""
            key={index}
            onClick={() => tab(index)}
          />
        ))}
      </div>
    );
  }
}

export default DetailsThumb;
