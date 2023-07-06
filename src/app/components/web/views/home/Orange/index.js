import React, { Component } from "react";
import d3 from "./../../../../../../images/d3.jpg";
export default class Orange extends Component {
  render() {
    return (
      <div>
        <section class="orange" style={{ backgroundImage: `url(${d3})` }}>
          <div class="container">
            <div class="orange-text">
              <h3>ORANGE CRUSH 20RT COMBO GUITAR AMPLIFIER</h3>
              <ul>
                <li>Brand: Orange</li>
                <li>Product Code: Crush 20RT</li>
                <li>Availability: In Stock</li>
              </ul>
              <h4>$339.00</h4>
              {/* <div class="add-cart">
                <button class="cart-btn">add to cart</button>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
