import { Component } from "react";
import React from "react";
import { Link } from "@material-ui/core";
import "./affiliate.css";
export default class Affiliate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }

  handleLoginClick = () => {
    // Perform login logic here

    // Show the popup
    this.setState({ showPopup: true });

    // You can also make an API call or perform any other necessary actions here
  };

  render() {
    const { showPopup } = this.state;

    return (
      <div className="affiliate-program">
        <div className="container">
          <div className="info-site">
            <br></br>
            <h3 className="mb-4 mt-4 sec-title">AFFILIATE PROGRAM</h3>
            <h5>
              Musicians Avenue affiliate program is free and enables members to
              earn revenue by placing a link or links on their web site which
              advertises Musicians Avenue or specific products on it. Any sales
              made to customers who have clicked on those links will earn the
              affiliate commission. The standard commission rate is currently
              5%. For more information, visit our FAQ page or see our Affiliate
              terms & conditions.
            </h5>
            <br></br>
            <div className="affiliate-div">
              <div className="affiliate-one">
                <label>
                  <b>NEW AFFILIATE</b>
                </label>
                <div className="person-label">
                  <h5>I am not currently an affiliate.</h5>
                  <p>
                    Click Continue below to create a new affiliate account.
                    Please note that this is not connected in any way to your
                    customer account.
                  </p>
                  <a href="/reg" className="fill-cart-btn">
                    Continue
                  </a>
                  <br></br>
                  <br></br>
                </div>
              </div>
              <div className="affiliate-two">
                <label>
                  <b>AFFILIATE LOGIN </b>
                </label>
                <div className="person-label">
                  <h5>I am a returning affiliate</h5>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <br></br>
                  <div>
                    <a
                      href="#"
                      className="fill-cart-btn"
                      onClick={this.handleLoginClick}
                    >
                      LOGIN
                    </a>

                    {showPopup && (
                      <div className="popup">
                        <div className="popup-content">
                          <h3
                            style={{
                              color: "var(--primary-color)",
                              paddingLeft: "30px",
                              paddingRight: "30px",
                            }}
                            className="mb-4 mt-4"
                          >
                            {" "}
                            We will shortly reach you out for affiliate
                            programs.
                          </h3>
                          <p>Please Check Your Email for Further details.</p>
                          <a href="/" className="cart-btn">
                            Continue
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <br></br>
                  <br></br>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
