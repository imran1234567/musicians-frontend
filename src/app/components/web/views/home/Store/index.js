import React, { Component } from "react";
import image1 from "./../../../../../../images/image1.jpg";
export default class Store1 extends Component {
  render() {
    const handleClick = () => {
      window.location.href = "/locator";
    };
    return (
      <div>
        <section class="store" style={{ backgroundImage: `url(${image1})` }}>
          <div class="store-content">
            <div class="store-text">
              <h3>
                Musicians Avenue remains a family owned store and continues to
                provide good old fashioned customer service.
              </h3>
              <div class="store-btn">
                <button onClick={handleClick}>Store Locator</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
