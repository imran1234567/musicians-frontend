import React, { Component } from "react";
import pr1 from "./../../../../../../images/pr1.jpg";
import pr2 from "./../../../../../../images/pr2.jpg";
import pr3 from "./../../../../../../images/pr3.jpg";
import pr4 from "./../../../../../../images/pr4.jpg";

export default class Process extends Component {
  render() {
    return (
      <div>
        <section class="process">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-3 col-6">
                <div class="process-box">
                  <div class="process-image">
                    <img src={pr1} alt="pr1" />
                  </div>
                  <div class="process-text">
                    <h4>Worldwide Shipping</h4>
                    <p>Enjoy free delivery on every order.</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-6">
                <div class="process-box">
                  <div class="process-image">
                    <img src={pr2} alt="pr2" />
                  </div>
                  <div class="process-text">
                    <h4>MONEY-BACK GUARANTEE</h4>
                    <p>We offer a 30-day money back guarantee.</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-6">
                <div class="process-box">
                  <div class="process-image">
                    <img src={pr3} alt="pr3" />
                  </div>
                  <div class="process-text">
                    <h4>HASSLE-FREE WARRANTY</h4>
                    <p>
                      If it isn’t love at first listen, returns are hassle-free.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-6">
                <div class="process-box">
                  <div class="process-image">
                    <img src={pr4} alt="pr4" />
                  </div>
                  <div class="process-text">
                    <h4>ONLINE CUSTOMER SERVICE</h4>
                    <p>Call our expert for help creating your system.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
