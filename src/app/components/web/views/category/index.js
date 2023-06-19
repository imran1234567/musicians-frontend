import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import cat1 from "../../../../../assets/cat-1.jpeg";
import cat2 from "../../../../../assets/cat-2.jpeg";
import cat3 from "../../../../../assets/cat-3.jpeg";
import cat4 from "../../../../../assets/cat-4.png";
import cat5 from "../../../../../assets/cat-5.jpeg";
import cat6 from "../../../../../assets/cat-6.jpeg";
import cat7 from "../../../../../assets/cat-7.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./category.css";

class Category extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };
    return (
      <div style={{ background: "#fff" }}>
        <div className="container" id="header-category-bk">
          <Slider {...settings}>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat1} />
                <h6>Nitro Mesh</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat2} />
                <h6>Strike Multi 9</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat3} />
                <h6>Digital Keyboard</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat4} />
                <h6>Electric Guiter</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat5} />
                <h6>Aqustic Guiter</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat6} />
                <h6>Ibanez</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat7} />
                <h6>Amplif</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat5} />
                <h6>Guitar</h6>
              </div>
            </div>
            <div className="item">
              <div className="category-item">
                <img className="img-fluid" src={cat5} />
                <h6>Effect Pedals</h6>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default Category;
