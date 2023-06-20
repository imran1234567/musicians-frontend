import React, { Component } from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

class Footer extends Component {
  render() {
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
                      Musicians Avenue! Established in 1996, has evolved to
                      cater for all aspects of the music industry ranging from
                      P.A Systems, Studio Products and DJ Gear to Guitars,
                      Keyboards, Amplifiers, Drums and Percussion. Musicians
                      Avenue remains a family owned store and continues to
                      provide good old fashioned customer service.
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
                        <Link to="/guitar">Guitar/Bass</Link>
                      </li>
                      <li>
                        <Link to="/keyboards">Keyboards/Pianos</Link>
                      </li>
                      <li>
                        <Link to="/amps">Amps/Effects</Link>
                      </li>
                      <li>
                        <Link to="/live-sound">Live Sound</Link>
                      </li>
                      <li>
                        <Link to="/recording-studio">Recording Studio</Link>
                      </li>
                      <li>
                        <Link to="/dj-lighting">Dj/Lighting</Link>
                      </li>
                      <li>
                        <Link to="/drums-percussion">Drums/Percussion </Link>
                      </li>
                      <li>
                        <Link to="/orchestral">Orchestral</Link>
                      </li>
                      <li>
                        <Link to="/accessories">Accessories</Link>
                      </li>
                      <li>
                        <Link to="/shop-by-brand">Shop By Brand</Link>
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
                          <FontAwesomeIcon icon={faMapMarker} />
                        </Link>
                        63 Ware St, Fairfield NSW 2165
                      </li>
                      <li class="phone">
                        <Link to="/phone">
                          <FontAwesomeIcon icon={faPhone} />
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
                        <Link to="/facebook">
                          <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                      </li>
                      <li class="twitter">
                        <Link to="/twitter">
                          <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                      </li>
                      <li class="linkedin">
                        <Link to="/linkedin">
                          <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                      </li>
                      <li class="youtube">
                        <Link to="/youtube">
                          <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                      </li>
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
                          <Link to="/person">Returns</Link>
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
                        <li>
                          <Link to="/login">My Account</Link>
                        </li>
                        <li>
                          <Link to="/order">Order History </Link>
                        </li>
                        <li>
                          <Link to="/wishlist">Wish List</Link>
                        </li>
                        <li>
                          <Link to="/new">News Letter</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="block">
                      <h4>Sign up to our monthly newsletter</h4>
                      <form>
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Your Email ID here..."
                          />
                        </div>
                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
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
        </footer>
      </>
    );
  }
}

export default Footer;
