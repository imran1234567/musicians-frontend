import React, { Component } from "react";
import c10 from "../../../../../images/c10.jpg";
import d1 from "../../../../../images/d1.jpg";
import d2 from "../../../../../images/d2.jpg";
import cat from "../../../../../images/cat.jpg";
import st from "../../../../../images/st.png";
import paypal from "../../../../../images/paypal.jpg";
import zip from "../../../../../images/zip.jpg";
import banner from "../../../../../images/banner.jpg";
import img1 from "../../../../../images/img1.jpg";
import img2 from "../../../../../images/img2.jpg";
import pay from "./../../../../../images/pay.png";
import download from "./../../../../../images/download.png";

class About extends Component {
  render() {
    return (
      <>
        <div class="inner-banner">
          <img src={banner} alt="banner" class="w-100" />
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <b>Home</b>
            </li>
            <li
              className="breadcrumb-item "
              aria-current="page"
              style={{ color: "#750000" }}
            >
              <b>About Us</b>
            </li>
          </ol>
        </nav>
        <section class="about-article pt-5">
          <div class="container-fluid">
            <div class="about-article-content">
              <h2 class="mb-4 sec-title">The Musicians Avenue Story</h2>
              <p>
                Musicians Avenue! Established in 1996, has evolved to cater for
                all aspects of the music industry ranging from P.A Systems,
                Studio Products and DJ Gear to Guitars, Keyboards, Amplifiers,
                Drums and Percussion. Musicians Avenue remains a family owned
                store and continues to provide good old fashioned customer
                service.
              </p>
              <h6>
                We also do repairs and maintenance on all musical instruments.
              </h6>
            </div>
            <div class="row justify-content-center mb-5">
              <div class="col-xxl-8 col-xl-10 col-lg-8 col-md-10 col-sm-12 col-12 text-center">
                <video width="100%" controls autoplay muted loop>
                  <source
                    src="https://www.shutterstock.com/shutterstock/videos/2893999/preview/stock-footage-building-a-house-animation-from-a-house-in-d.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </video>
              </div>
            </div>
          </div>
        </section>
        <section class="categories pb-5">
          <div class="container-fluid">
            <div class="row categories-content">
              <div class="col-lg-3 col-md-3 col-12">
                <div class="block">
                  <img src={c10} alt="c10" />
                  <div class="categories-text">
                    <h4>For Musicians</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-12">
                <div class="block">
                  <img src={d1} alt="d1" />
                  <div class="categories-text">
                    <h4>DJ / Production</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-12">
                <div class="block">
                  <img src={d2} alt="d2" />
                  <div class="categories-text">
                    <h4>Live Sound & Stage</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-12">
                <div class="block">
                  <img src={cat} alt="cat" />
                  <div class="categories-text">
                    <h4>Education</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="about-content py-5">
          <div class="container">
            <div class="about-content-list">
              <div class="row align-items-center">
                <div class="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 av-image">
                  <img src={img1} alt="img1" />
                </div>
                <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 av-box">
                  <div class="px-lg-4 py-lg-5 py-4">
                    <h3 class="mb-4 h3-sec-title">Our Mission</h3>
                    <p>
                      <strong>
                        Mauris et interdum felis. Nulla tempor fermen tum arcu,
                        a vulputate est rhoncus nec.
                      </strong>
                    </p>
                    <p>
                      Donec augue arcu, efficitur nec tellus vitae, fermentum
                      semper quam. Proin vel est a sapien ullamcorper
                      vestibulum. Donec in dui ac dui commodo cursus vulputate
                      id augue. Integer tempor vitae lectus nec pellentesque.
                      Quisque vitae commodo erat. Maecenas suscipit, justo
                      viverra facilisis fermentum, eros dolor dignissim lacus,
                      ut dignissim.
                    </p>
                  </div>
                </div>
              </div>
              <div className="our-vision">
                <div class="row align-items-center">
                  <div
                    class="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 av-image"
                    className="vision-view"
                  >
                    <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 av-box">
                      <h3 class="mb-4 h3-sec-title">Our Vision</h3>
                      <p>
                        <strong>
                          Mauris et interdum felis. Nulla tempor fermen tum
                          arcu, a vulputate est rhoncus nec.
                        </strong>
                      </p>
                      <p>
                        Donec augue arcu, efficitur nec tellus vitae, fermentum
                        semper quam. Proin vel est a sapien ullamcorper
                        vestibulum. Donec in dui ac dui commodo cursus vulputate
                        id augue. Integer tempor vitae lectus nec pellentesque.
                        Quisque vitae commodo erat. Maecenas suscipit, justo
                        viverra facilisis fermentum, eros dolor dignissim lacus,
                        ut dignissim.
                      </p>
                    </div>
                    <div class="px-lg-4 py-lg-5 py-4">
                      {" "}
                      <img src={img2} alt="img2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="offers">
          <div class="container-fluid">
            <section class="offers">
              <div class="container-fluid">
                <div class="offers-content row">
                  <div class="col-lg-4 col-md-4 col-12 offer-class">
                    <div class="offer-box of-1">
                      <div class="offer-image">
                        <img src={pay} />
                      </div>
                      <div class="offer-text">
                        <h5>Play Your Way With PayPal Pay In 4</h5>
                        <p>
                          Divide your purchase into four interest-free
                          instalments with no late fees and just 25% down.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-md-4 col-12 offer-class">
                    <div class="offer-box of-2">
                      <div class="offer-image">
                        <img src={download} />
                      </div>
                      <div class="offer-text">
                        <h5>Own It Now, up to 6 Months Interest Free*</h5>
                        <p>
                          Purchase your new gear with Zip Money and get up to 6
                          months to pay with zero interest.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-4 col-md-4 col-12 offer-class">
                    <div class="offer-box of-3">
                      <div class="offer-image">
                        <img src={st} />
                      </div>
                      <div class="offer-text">
                        <h5>Start Playing Today With Easy Rental</h5>
                        <p>
                          Simple application process & great terms.
                          Return/upgrade after six months or buy at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </>
    );
  }
}

export default About;
