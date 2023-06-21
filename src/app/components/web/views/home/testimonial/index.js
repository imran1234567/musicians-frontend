import React, { Component } from "react";
import test from "./../../../../../../images/test.jpg";

export default class Testimonial extends Component {
  render() {
    return (
      <div>
        <section class="testimonial">
          <div class="container">
            <img src={test} alt="test" />
          </div>
        </section>
      </div>
    );
  }
}
