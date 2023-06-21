import React, { Component } from "react";
import b10 from "./../../../../../../images/b10.jpg";
import b9 from "./../../../../../../images/b9.jpg";
import b8 from "./../../../../../../images/b8.jpg";
import b7 from "./../../../../../../images/b6.jpg";
import b5 from "./../../../../../../images/b5.jpg";
import b4 from "./../../../../../../images/b4.jpg";
import b3 from "./../../../../../../images/b3.jpg";
import b6 from "./../../../../../../images/b6.jpg";

export default class Artical extends Component {
  render() {
    return (
      <div>
        <section class="articals">
          <div class="container-fluid">
            <h2 class="sec-title">Articles &amp; Resources</h2>

            <div class="articals-list row">
              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b3} alt="b3" />
                  <div class="artical-text">
                    <h5> 10 Reasons for Live in 2023 </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b4} alt="b4" />
                  <div class="artical-text">
                    <h5> How to Record a Podcast With Multiple People </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b5} alt="b5" />
                  <div class="artical-text">
                    <h5> What Synthesis Type Are You? </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b6} alt="b6" />
                  <div class="artical-text">
                    <h5> How to Choose Electric Guitar Strings </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b7} alt="b7" />
                  <div class="artical-text">
                    <h5> 10 Reasons for Ableton Live in 2023 </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b8} alt="b8" />
                  <div class="artical-text">
                    <h5> How to Record a Podcast With Multiple People </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b9} alt="b9" />
                  <div class="artical-text">
                    <h5> What Synthesis Type Are You? </h5>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-3 col-12">
                <div class="artical-box">
                  <img src={b10} alt="b10" />
                  <div class="artical-text">
                    <h5> How to Choose Electric Guitar Strings </h5>
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
