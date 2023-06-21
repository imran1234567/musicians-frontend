import React, { Component } from "react";
import b2 from "./../../../../../../images/b2.jpg";
import a8 from "./../../../../../../images/a8.jpg";
import a7 from "./../../../../../../images/a7.jpg";
import b1 from "./../../../../../../images/b1.jpg";
import a3 from "./../../../../../../images/a3.jpg";
import a10 from "./../../../../../../images/a10.jpg";
import a9 from "./../../../../../../images/a9.jpg";
import pr11 from "./../../../../../../images/pr11.jpg";
import a1 from "./../../../../../../images/a1.jpg";

export default class TopArrival extends Component {
  render() {
    return (
      <div>
        <section class="new-arrival">
          <div class="container-fluid">
            <h2 class="sec-title">Top Deals & New Arrivals</h2>
            <div class="new-arrival-list">
              <div class="row new-arrival-content">
                <div class="col-lg-6 col-md-6 col-12 av-box">
                  <div class="row h-100">
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a1} alt="a1" />
                        </div>
                        <div class="arrival-text">
                          <h6>Alesis Strike Multi 9-Pad Percussion Pad</h6>
                          <h5>$1,195.00</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={pr11} alt="pr11" />
                        </div>
                        <div class="arrival-text">
                          <h6>
                            Ibanez AW54CE OPN Artwood Acoustic Electric Guitar
                          </h6>
                          <h5>$595.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12 av-image">
                  <div class="arrival-image">
                    <img src={a9} alt="a9" />
                  </div>
                </div>
              </div>

              <div class="row new-arrival-content">
                <div class="col-lg-6 col-md-6 col-12 av-box">
                  <div class="row h-100">
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a10} alt="a10" />
                        </div>
                        <div class="arrival-text">
                          <h6>Alesis Strike Multi 9-Pad Percussion Pad</h6>
                          <h5>$1,195.00</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a3} alt="a3" />
                        </div>
                        <div class="arrival-text">
                          <h6>
                            Ibanez AW54CE OPN Artwood Acoustic Electric Guitar
                          </h6>
                          <h5>$595.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12 av-image">
                  <div class="arrival-image">
                    <img src={a10} alt="a10" />
                  </div>
                </div>
              </div>

              <div class="row new-arrival-content">
                <div class="col-lg-6 col-md-6 col-12 av-box">
                  <div class="row h-100">
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a3} alt="a3" />
                        </div>
                        <div class="arrival-text">
                          <h6>Alesis Strike Multi 9-Pad Percussion Pad</h6>
                          <h5>$1,195.00</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={b1} alt="b1" />
                        </div>
                        <div class="arrival-text">
                          <h6>
                            Ibanez AW54CE OPN Artwood Acoustic Electric Guitar
                          </h6>
                          <h5>$595.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12 av-image">
                  <div class="arrival-image">
                    <img src={b1} alt="b1" />
                  </div>
                </div>
              </div>

              <div class="row new-arrival-content">
                <div class="col-lg-6 col-md-6 col-12 av-box">
                  <div class="row h-100">
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a7} alt="a7" />
                        </div>
                        <div class="arrival-text">
                          <h6>Alesis Strike Multi 9-Pad Percussion Pad</h6>
                          <h5>$1,195.00</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <div class="new-arrival-box">
                        <div class="arrival-image">
                          <img src={a8} alt="a8" />
                        </div>
                        <div class="arrival-text">
                          <h6>
                            Ibanez AW54CE OPN Artwood Acoustic Electric Guitar
                          </h6>
                          <h5>$595.00</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12 av-image">
                  <div class="arrival-image2">
                    <img src={b2} alt="b2" />
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
