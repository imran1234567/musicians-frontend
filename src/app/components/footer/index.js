import React, { Component } from 'react';
import logo from '../../../assets/logo.png';
class Footer extends Component {
    render() {
        return (
            <footer>
                <div class="upper-footer">
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div class="logo-text">
                                    <div class="iamge">
                                        <img src={logo} />
                                    </div>
                                    <p>Musicians Avenue! Established in 1996, has evolved to cater for all aspects of the music industry ranging from P.A Systems, Studio Products and DJ Gear to Guitars, Keyboards, Amplifiers, Drums and Percussion. Musicians Avenue remains a family owned store and continues to provide good old fashioned customer service.
                                    </p>
                                    <h5>We also do repairs and maintenance on all musical instruments.</h5>
                                </div>
                            </div>

                            <div class="col-xl-2 col-lg-6 col-md-6 col-sm-5 col-12">
                                <div class="block">
                                    <h4>Shop Now</h4>
                                    <ul>
                                        <li>
                                            <a href="#">Guitar/Bass</a>
                                        </li>
                                        <li>
                                            <a href="#">Keyboards/Pianos</a>
                                        </li>
                                        <li>
                                            <a href="#">Amps/Effects</a>
                                        </li>
                                        <li>
                                            <a href="#">Live Sound</a>
                                        </li>
                                        <li>
                                            <a href="#">Recording Studio</a>
                                        </li>
                                        <li>
                                            <a href="#">Dj/Lighting</a>
                                        </li>
                                        <li>
                                            <a href="#">Drums/Percussion </a>
                                        </li>
                                        <li>
                                            <a href="#">Orchestral</a>
                                        </li>
                                        <li>
                                            <a href="#">Accessories</a>
                                        </li>
                                        <li>
                                            <a href="#">Shop By Brand</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-lg-6 col-md-6 col-sm-7 col-12">
                                <div class="block time">
                                    <h4>Store Hours</h4>
                                    <ul>
                                        <li>Monday <span>9:30am-5:30pm</span></li>
                                        <li>Tuesday<span>9:30am-5:30pm</span></li>
                                        <li>Wednesday <span>9:30am-5:30pm</span></li>
                                        <li>Thursday <span>9:30am-5:30pm</span></li>
                                        <li>Friday <span>9:30am-5:30pm</span></li>
                                        <li>Saturday <span>9:30am-5:30pm</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-lg-6 col-md-6 col-12">
                                <div class="block address">
                                    <h4>Contact Us</h4>
                                    <ul>
                                        <li><div class="icon"><i class='bx bx-map'></i></div>63 Ware St, Fairfield NSW 2165</li>
                                        <li class="phone"><div class="icon"><i class='bx bx-phone'></i></div><a href="tel:(02) 9755 9999">(02) 9755 9999</a></li>
                                        <li><div class="icon"><i class='bx bx-envelope' ></i></div><a href="mailto:musiciansavenue@bigpond.com">musiciansavenue@bigpond.com</a></li>

                                    </ul>
                                    <ul class="social-icon">
                                        <li class="facebook">
                                            <a href="#"><i class='bx bxl-facebook'></i></a>
                                        </li>
                                        <li class="twitter">
                                            <a href="#"><i class='bx bxl-twitter' ></i></a>
                                        </li>
                                        <li class="linkedin">
                                            <a href="#"><i class='bx bxl-linkedin' ></i></a>
                                        </li>
                                        <li class="youtube">
                                            <a href="#"><i class='bx bxl-youtube' ></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-mid">
                    <div class="container-fluid">
                        <div class="footer-mid-content">
                            <div class="row">
                                <div class="col">
                                    <div class="block">
                                        <h4>Information</h4>
                                        <ul>
                                            <li>
                                                <a href="#">Zip - Own it now,pay later</a>
                                            </li>
                                            <li>
                                                <a href="#">About Us</a>
                                            </li>
                                            <li>
                                                <a href="#">Delivery Information</a>
                                            </li>
                                            <li>
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="#">Terms & Conditions</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="block">
                                        <h4>Customer Services</h4>
                                        <ul>
                                            <li>
                                                <a href="#">Contact Us</a>
                                            </li>
                                            <li>
                                                <a href="#">Returns</a>
                                            </li>
                                            <li>
                                                <a href="#">Site Map</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="block">
                                        <h4>Extras</h4>
                                        <ul>
                                            <li>
                                                <a href="#">Brands</a>
                                            </li>
                                            <li>
                                                <a href="#">Gift Vouchers</a>
                                            </li>
                                            <li>
                                                <a href="#">Affiliates</a>
                                            </li>
                                            <li>
                                                <a href="#">Specials</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="block">
                                        <h4>My Account</h4>
                                        <ul>
                                            <li>
                                                <a href="#">My Account</a>
                                            </li>
                                            <li>
                                                <a href="#">Gift Vouchers</a>
                                            </li>
                                            <li>
                                                <a href="#">Affiliates</a>
                                            </li>
                                            <li>
                                                <a href="#">Specials</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-12">
                                    <div class="block">
                                        <h4>Sign up to our monthly newsletter</h4>
                                        <form>
                                            <div class="form-group">
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email ID here..." />
                                            </div>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}

export default Footer;
