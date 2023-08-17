import React, { Component } from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot as thinLocationDot } from "@fortawesome/free-solid-svg-icons";

import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSearch,
  faHeart,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faMapMarker,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import c6 from "../../../images/c6.jpg";
import c3 from "../../../images/c3.jpg";
import c2 from "../../../images/c2.jpg";
import c4 from "../../../images/c4.jpg";
import c5 from "../../../images/c5.jpg";
import c8 from "../../../images/c8.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "../../auth/login";
import { GetUserLogin } from "../services";
import ReactHtmlParser  from 'react-html-parser';
import Axios from "axios";
import { Apis } from "../../../config";


class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
      footerText:"",
    }
  }

  state = {
    isOpen: false,
    name: "",
    email: "",
    token: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    NotificationManager.success("Successfully subscribed");
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Reset form fields
    this.setState({ name: "", email: "" });
    // Close the popup modal
    this.setState({ isOpen: false });
  };

  togglePopup = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  async componentDidMount() {
    let cookies =  GetUserLogin.isAuthenticate();
    this.setState({ token: cookies });
    try {
      const response = await Axios.get(Apis.GetAllPagesContent);
      if (
        response.data.success &&
        response.data.Content &&
        response.data.Content.footerText 
      ) {
        this.setState({
        footerText: response.data.Content.footerText
          
        });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }

  render() {
    const { isOpen, name, email, token, footerText } = this.state;
    return (
      <>
        <footer className="footer-section">
          <div class="upper-footer">
            <div class="container-fluid">
              <div class="row">
                <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                  <div class="logo-text">
                    <div class="image">
                      <img src={logo} alt="logo" />
                    </div>
                    <p>
                     {footerText && ReactHtmlParser(footerText)}
                    </p>
                    <h5>
                      We also do repairs and maintenance on all musical
                      instruments.
                    </h5>
                  </div>
                </div>

                <div class="col-xl-2 col-lg-6 col-md-6 col-sm-5 col-12">
                  <div class="block">
                    <h4>Shop Now</h4>
                    <ul>
                      <li>
                        <Link to="/cat/1/1">Guitars</Link>
                      </li>
                      <li>
                        <Link to="/cat/2/14">Effects</Link>
                      </li>
                      <li>
                        <Link to="/cat/3/15">BlueGrass</Link>
                      </li>
                      <li>
                        <Link to="/cat/4/17">Accessori</Link>
                      </li>
                      <li>
                        <Link to="/cat/5/21">Effects Pedal</Link>
                      </li>
                      <li>
                        <Link to="/cat/10/58">Ukuleles</Link>
                      </li>
                      <li>
                        <Link to="/cat/7/25">Artwood</Link>
                      </li>
                      <li>
                        <Link to="/cat/8/29">Amplifiers</Link>
                      </li>
                      <li>
                        <Link to="/brands">Shop By Brand</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-7 col-12">
                  <div class="block time">
                    <h4>Store Hours</h4>
                    <ul>
                      <li>
                        Monday <span>9:30am-5:30pm</span>
                      </li>
                      <li>
                        Tuesday<span>9:30am-5:30pm</span>
                      </li>
                      <li>
                        Wednesday <span>9:30am-5:30pm</span>
                      </li>
                      <li>
                        Thursday <span>9:30am-5:30pm</span>
                      </li>
                      <li>
                        Friday <span>9:30am-5:30pm</span>
                      </li>
                      <li>
                        Saturday <span>9:30am-5:30pm</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                  <div class="block address">
                    <h4>Contact Us</h4>
                    <ul>
                      <li class="map">
                        <Link to="/map">
                          <FontAwesomeIcon icon={thinLocationDot} />
                        </Link>
                        63 Ware St, Fairfield NSW 2165
                      </li>
                      <li class="phone">
                        <Link to="/phone">
                          <FontAwesomeIcon icon={faPhone} size="xs" />
                        </Link>
                        <Link to="tel:(02) 9755 9999">(02) 9755 9999</Link>
                      </li>
                      <li>
                        <div class="icon">
                          <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                        </div>
                        <a href="mailto:musiciansavenue@bigpond.com">
                          musiciansavenue@bigpond.com
                        </a>
                      </li>
                    </ul>
                    <ul class="social-icon">
                      <li class="facebook">
                        <a
                          href="https://www.facebook.com/musiciansavenue/"
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faFacebook} />
                        </a>
                      </li>
                      <li class="twitter">
                        <a
                          href="https://twitter.com/musiciansavenue"
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                      </li>
                      {/* <li class="linkedin">
                        <a href="/linkedin">
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                      </li>
                      <li class="youtube">
                        <a href="/youtube">
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-mid" style={{ width: "100%" }}>
            <div class="container-fluid">
              <div class="footer-mid-content">
                <div class="row">
                  <div class="col">
                    <div class="block">
                      <h4>Information</h4>
                      <ul>
                        <li>
                          <Link to="/zip">"Zip - Own it now,pay later</Link>
                        </li>
                        <li>
                          <Link to="/about">About Us</Link>
                        </li>
                        <li>
                          <Link to="/delivery">Delivery Information</Link>
                        </li>
                        <li>
                          <Link to="/policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/terms">Terms & Conditions</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col">
                    <div class="block">
                      <h4>Customer Services</h4>
                      <ul>
                        <li>
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                          <Link to="/returns">Returns</Link>
                        </li>
                        <li>
                          <Link to="/map">Site Map</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col">
                    <div class="block">
                      <h4>Extras</h4>
                      <ul>
                        <li>
                          <Link to="/brands">Brands</Link>
                        </li>
                        <li>
                          <Link to="/gift">Gift Vouchers</Link>
                        </li>
                        <li>
                          <Link to="/affiliate">Affiliates</Link>
                        </li>
                        <li>
                          <Link to="/special">Specials</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col">
                    <div class="block">
                      <h4>My Account</h4>
                      <ul>
                        {token ? (
                          <li>
                            <Link to="/account/view">My Account</Link>
                          </li>
                        ) : (
                          <li>
                            <a
                              data-target="#bd-example-modal"
                              data-toggle="modal"
                            >
                              My Account
                            </a>
                          </li>
                        )}

                        {token ? (
                          <li>
                            <Link to="/account/order/list">Order History </Link>
                          </li>
                        ) : (
                          <li>
                            <a
                              data-target="#bd-example-modal"
                              data-toggle="modal"
                            >
                              Order History
                            </a>
                          </li>
                        )}

                        {token ? (
                          <li>
                            <Link to="/wishlist">Wish List</Link>
                          </li>
                        ) : (
                          <li>
                            <a
                              data-target="#bd-example-modal"
                              data-toggle="modal"
                            >
                              Wish List
                            </a>
                          </li>
                        )}
                      </ul>
                      {isOpen && (
                        <div className="popup-overlay">
                          <div className="popup">
                            <h2
                              className="mb-4 mt-4 sec-title"
                              style={{
                                // color: "#750000",
                                fontFamily: "fantasy",
                                fontSize: "15px",
                              }}
                            >
                              We Have Successfully Recieved Your Email For Our
                              Newsletter
                            </h2>
                            <button
                              className="fill-cart-btn"
                              onClick={this.togglePopup}
                            >
                              Close
                            </button>
                            {/* <form onSubmit={this.handleSubmit}>
                              <label htmlFor="name">Name:</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) =>
                                  this.setState({ name: e.target.value })
                                }
                                required
                              />
                              <label htmlFor="email">Email:</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                                required
                              />
                              <br />
                              <br />
                              <div className="btn-news">
                                <button
                                  type="submit"
                                  className="cart-btn"
                                  style={{ margin: "10px" }}
                                >
                                  Send
                                </button>
                                <button
                                  className="cart-btn"
                                  onClick={this.togglePopup}
                                >
                                  Close
                                </button>
                              </div>
                            </form> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-12">
                    {/* Temporarily written need API to store the user email */}
                    <div className="block">
                      <h4>Sign up to our monthly newsletter</h4>
                      <form>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Your Email ID here..."
                            required
                          />
                        </div>
                        <button
                          type="Subscribe"
                          className="btn btn-primary"
                          onClick={this.togglePopup}
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                    <NotificationContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bottom-footer" style={{ width: "100%" }}>
            <div class="container-fluid">
              <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 col-12">
                  {/* updated dynamic dated format */}
                  <p>
                    Musicians Avenue &copy; {new Date().getFullYear()}. All
                    Rights Reserved.
                  </p>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <ul>
                    <li>
                      <img src={c2} alt="c2" />
                    </li>
                    <li>
                      <img src={c3} alt="c3" />
                    </li>
                    <li>
                      <img src={c4} alt="c4" />
                    </li>
                    <li>
                      <img src={c5} alt="c5" />
                    </li>
                    <li>
                      <img src={c6} alt="c6" />
                    </li>
                    <li>
                      <img src={c8} alt="c8" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Login />
        </footer>
      </>
    );
  }
}

export default Footer;
