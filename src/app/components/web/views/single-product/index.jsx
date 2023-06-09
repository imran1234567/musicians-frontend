import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import parse from "html-react-parser";
import { GetProductDetails, GetUserLogin } from "../../../services";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import pay from "./../../../../../images/pay.png";
import zippay1 from "./../../../../../images/zippay1.png";
import paypal1 from "./../../../../../images/paypal1.png";
import download from "./../../../../../images/download.png";
import st from "./../../../../../images/st.png";
import "./index.css";
import Login from "../../../../auth/login";
import Process from "../home/Process";

const SingleProduct = ({ cartItems, addToCart }) => {
  const [product, setProduct] = useState(null);
  const [token, setToken] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [activeTab, setActiveTab] = useState("home-tab-pane");

  const checkCart = (productId) => {
    const productExistsInCart = cartItems.some(
      (product) => product.id === productId
    );
    return productExistsInCart;
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      let url = window.location.href.split("/");
      var lastSegment = url.pop() || url.pop();
      let list = await GetProductDetails.getProductById(lastSegment);
      let cookies = await GetUserLogin.isAuthenticate();
      setToken(cookies);
      setProduct(list.data);
    };

    fetchData();
  }, []);

  if (!product) {
    return "Loading";
  }

  const isProductInCart = checkCart(product.id);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    customPaging: function (i) {
      return (
        <div className="item-thumb">
          <img
            width="200"
            height="200"
            src={product.productphotos[i].imgUrl}
            alt={`Thumbnail ${i}`}
          />
        </div>
      );
    },
    appendDots: (dots) => <ul style={{ margin: "0px" }}> {dots} </ul>,
  };

  const handlePhotoClick = (index) => {
    setSelectedPhoto(index);
  };

  return (
    <div>
      <section className="breadcrumbs py-4">
        <div className="container-fluid">
          <div className="b-crumb pb-2">
            <ul className="breadcrumbs-list">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/brands">{product.brand}</a>
              </li>
              <li>{product.name}</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="shop-single section-padding pt-3 product-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="shop-detail-left">
                <div className="img-slider">
                  {product.productphotos.length === 0 ? (
                    <div key={product.id}>
                      <img src={product.photo} alt={product.alt} />
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {product.productphotos.map((photo) => (
                        <div key={photo.id}>
                          <img
                            src={photo.imgUrl}
                            alt={`Thumbnail ${photo.id}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="shop-detail-right product-details-content">
                <span
                  className="badge badge-success"
                  style={{ backgroundColor: "#750000" }}
                >
                  {product.discountPer}% OFF
                </span>
                <h3>{product.name}</h3>
                <div className="pdp-product__old-price">
                  <span className="regular-price">
                    <h4>${product.price}</h4>
                  </span>
                  <h5>
                    <strong>Online Stock:</strong> In Stock {product.qty}
                  </h5>
                  <h6>
                    Brand: <strong>{product.brand}</strong>
                  </h6>
                  <h6>
                    Product Code: <span>{product.id}</span>
                  </h6>
                </div>
                <div className="cart-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1"
                    style={{ width: "80px" }}
                  />
                  {!token ? (
                    <a
                      data-target="#bd-example-modal"
                      data-toggle="modal"
                      className="fill-cart-btn"
                    >
                      Add To Cart
                    </a>
                  ) : isProductInCart ? (
                    <Link to="/cart" className="fill-cart-btn">
                      Go To Cart
                    </Link>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      className="fill-cart-btn"
                      onClick={() => {
                        addToCart(product);
                        NotificationManager.success(
                          `${product.name} added successfully to the cart!`
                        );
                      }}
                    >
                      <i className="mdi mdi-cart-outline" /> Add To Cart
                    </a>
                  )}
                </div>
                {/* <hr style={{ color: "black", height: "1px" }} /> */}
                <div className="apply">
                  <div className="rent-text">
                    <h5>
                      <strong>Or Rent For $14.08 </strong>per week
                    </h5>
                    <h6>
                      Return any time after 6 months.{" "}
                      <a href="/returns">Learn More</a>
                    </h6>
                  </div>
                  <div className="apply-btn">
                    <a href="/returns">Apply Now</a>
                  </div>
                </div>
                {/* <hr style={{ color: "black", height: "1px" }} /> */}
                <div className="pay-img">
                  <img src={paypal1} alt="paypal" />
                  <img src={zippay1} alt="zippay" />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="pdpt-bg">
                <div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === "home-tab-pane" ? "active" : ""
                        }`}
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="home-tab-pane"
                        aria-selected={activeTab === "home-tab-pane"}
                        onClick={() => handleTabChange("home-tab-pane")}
                      >
                        Product Information
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === "profile-tab-pane" ? "active" : ""
                        }`}
                        id="profile-tab"
                        data-toggle="tab"
                        data-target="#profile-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="profile-tab-pane"
                        aria-selected={activeTab === "profile-tab-pane"}
                        onClick={() => handleTabChange("profile-tab-pane")}
                      >
                        Features
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    <div
                      className={`tab-pane fade show ${
                        activeTab === "home-tab-pane" ? "active" : ""
                      }`}
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabIndex="0"
                    >
                      <div className="block">{parse(product.desc)}</div>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        activeTab === "profile-tab-pane" ? "active" : ""
                      }`}
                      id="profile-tab-pane"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                      tabIndex="0"
                    >
                      <div className="block" style={{ color: "black" }}>
                        {parse(product.desc)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="offers">
        <div className="container-fluid">
          <div className="offers-content row">
            <div className="col-lg-4 col-md-4 col-12 offer-class">
              <div className="offer-box of-1">
                <div className="offer-image">
                  <img src={pay} alt="pay" />
                </div>
                <div className="offer-text">
                  <h5>Play Your Way With PayPal Pay In 4</h5>
                  <p>
                    Divide your purchase into four interest-free installments
                    with no late fees and just 25% down.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 offer-class">
              <div className="offer-box of-2">
                <div className="offer-image">
                  <img src={download} alt="download" />
                </div>
                <div className="offer-text">
                  <h5>Own It Now, up to 6 Months Interest Free*</h5>
                  <p>
                    Purchase your new gear with Zip Money and get up to 6 months
                    to pay with zero interest.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12 offer-class">
              <div className="offer-box of-3">
                <div className="offer-image">
                  <img src={st} alt="st" />
                </div>
                <div className="offer-text">
                  <h5>Start Playing Today With Easy Rental</h5>
                  <p>
                    Simple application process & great terms. Return/upgrade
                    after six months or buy at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Process />
      <Login />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(SingleProduct);
