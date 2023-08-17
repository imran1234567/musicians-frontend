import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";
import { API_URL } from "../../../../../config";
import { Apis } from "../../../../../config";
import bg1 from "../../../../../assets/bg-1.jpeg";
import bg2 from "../../../../../assets/bg-2.jpeg";
import bg3 from "../../../../../assets/bg-3.jpeg";
import cat1 from "../../../../../assets/categories-image-1.jpg";
import cat2 from "../../../../../assets/categories-image-2.jpg";
import cat3 from "../../../../../assets/categories-image-3.jpg";
import cat4 from "../../../../../assets/categories-image-4.jpg";
import pay1 from "../../../../../assets/pay-img-1.png";
import pay2 from "../../../../../assets/pay-img-2.png";
import pay3 from "../../../../../assets/pay-img-3.png";
import ReactHtmlParser  from 'react-html-parser';

class BannersSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderImages: [],
      loading: true,
      error: null,
    };
  }
  async componentDidMount() {
    this.fetchSliderImages();
    try {
      const response = await Axios.get(Apis.GetAllPagesContent);
      if (
        response.data.success &&
        response.data.Content &&
        (response.data.Content.paypal ||
          response.data.Content.zip ||
          response.data.Content.studio)
      ) {
        this.setState({
          paypal: response.data.Content.paypal || "",
          zip: response.data.Content.zip || "",
          studio: response.data.Content.studio || "",
        });

        console.log("PayPal:", response.data.Content.paypal);
        console.log("Zip:", response.data.Content.zip);
        console.log("Studio:", response.data.Content.studio);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  }
  fetchSliderImages = () => {
    Axios.get(Apis.GetBannerImage)
      .then((response) => {
        this.setState({
          sliderImages: response.data.cover,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: "Error fetching slider images",
        });
      });
  };

  render() {
    const { sliderImages, loading, error , paypal, zip, studio } = this.state;
    var settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      arrow: false,
      speed: 2000,
      autoplaySpeed: 2000,
      slideToShow: 1,
      slideToScroll: 1,
    };
    return (
      <div>
        {/* working here wih api */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Slider {...settings}>
            {sliderImages.map((image, index) => (
              <div className="owl-item" key={index}>
                <img src={image.imageUrl} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
        )}
        <section class="categories">
          <div class="container-fluid">
            <div class="row categories-content">
              <div class="col-lg-3 col-md-3 col-6">
                <div class="block">
                  <img src={cat1} />
                  <div class="categories-text">
                    <h4>For Musicians</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-6">
                <div class="block">
                  <img src={cat2} />
                  <div class="categories-text">
                    <h4>DJ / Production</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-6">
                <div class="block">
                  <img src={cat3} />
                  <div class="categories-text">
                    <h4>Live Sound & Stage</h4>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-3 col-6">
                <div class="block">
                  <img src={cat4} />
                  <div class="categories-text">
                    <h4>Education</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="offers">
          <div class="container-fluid">
            <div class="offers-content row">
              <div class="col-lg-4 col-md-4 col-12 offer-class">
                <div class="offer-box of-1">
                  <div class="offer-image">
                    <img src={pay1} />
                  </div>
                  <div class="offer-text">
                    <h5>Play Your Way With PayPal Pay In 4</h5>
                    <p>{paypal && ReactHtmlParser(paypal)}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-12 offer-class">
                <div class="offer-box of-2">
                  <div class="offer-image">
                    <img src={pay2} />
                  </div>
                  <div class="offer-text">
                    <h5>Own It Now, up to 6 Months Interest Free*</h5>
                    <p>{zip && ReactHtmlParser(zip)}</p>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-4 col-12 offer-class">
                <div class="offer-box of-3">
                  <div class="offer-image">
                    <img src={pay3} />
                  </div>
                  <div class="offer-text">
                    <h5>Start Playing Today With Easy Rental</h5>
                    <p>{studio && ReactHtmlParser(studio)}</p>
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

export default BannersSlider;
