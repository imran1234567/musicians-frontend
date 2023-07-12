import React, { Component } from "react";
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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Singleproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      token: "",
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let list = await GetProductDetails.getProductById(lastSegment);
    let cookies = await GetUserLogin.isAuthenticate();
    this.setState({ token: cookies });
    this.setState({ product: list.data });
  }
  checkCart = (productId) => {
    const { cartItems } = this.props;
    const productExistsInCart = cartItems.some(
      (product) => product.id === productId
    );
    if (productExistsInCart) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { product, token } = this.state;
    const settings = {
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 2000,
      customPaging: function (i) {
        return (
          <div className="item-thumb">
            <img
              width="60"
              height="60"
              src={product.productphotos[i].imgUrl}
              alt={`Thumbnail ${i}`}
            />
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".product-details-image-nav",
      selectedPhoto: 0,
    };

    const navSettings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".product-details-image",
      dots: true,
      centerMode: true,
      focusOnSelect: true,
    };
    const handlePhotoClick = (index) => {
      this.setState({ selectedPhoto: index });
    };

    const isProductInCart = this.checkCart(product.id);
    const { selectedPhoto, itemCount } = this.state;

    return (
      <div>
        <section className="shop-single section-padding pt-3 product-details">
          <div className="container">
            {product ? (
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="shop-detail-left">
                    <div className="tag">
                      <h1>Image Gallery</h1>
                    </div>
                    <div className="img-slider">
                      <Slider {...settings}>
                        {product.map((product) => (
                          <div key={product.id}>
                            <img src={product.src} alt={product.alt} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  {/* <aside class="col-lg-6">
                    <article class="gallery-wrap">
                      <div class="img-big-wrap img-thumbnail">
                        <a
                          data-fslightbox="mygalley"
                          data-type="image"
                          href="assets/images/items/10.webp"
                        >
                          <img height="560" src={} alt="img" />
                        </a>
                      </div>
                      <div class="thumbs-wrap">
                        <a
                          data-fslightbox="mygalley"
                          data-type="image"
                          href="assets/images/items/10.webp"
                          class="item-thumb"
                        >
                          <img width="60" height="60" src={zippay1} alt="img" />
                        </a>
                        <a
                          data-fslightbox="mygalley"
                          data-type="image"
                          href="assets/images/items/10.webp"
                          class="item-thumb"
                        >
                          <img width="60" height="60" src={zippay1} alt="img" />
                        </a>
                        <a
                          data-fslightbox="mygalley"
                          data-type="image"
                          href="assets/images/items/10.webp"
                          class="item-thumb"
                        >
                          <img width="60" height="60" src={zippay1} alt="img" />
                        </a>
                      </div>
                    </article>
                  </aside> */}
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
                    {/* <h6>
                      <strong>
                        <span className="mdi mdi-approval" /> Available in
                      </strong>{" "}
                      - {product.unitSize}
                    </h6> */}
                    <div className="pdp-product__old-price">
                      {/* <span className="space__right--2-unit">Product MRP:</span> */}
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
                        Product Code: <span>{product.id}</span>{" "}
                      </h6>
                    </div>

                    {/* <div className="pdp-product__new-price">
                      <span className="pdp-product__price--new">
                        {product.netPrice}
                      </span>
                      <div className="pdp-product__tax-disclaimer">
                        (Inclusive of all taxes)
                      </div>
                    </div> */}
                    <div className="cart-form">
                      <input
                        type="text"
                        class="form-control"
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
                            this.props.addToCart(product);
                            NotificationManager.success(
                              `${product.name} added successfully to the cart!`
                            );
                          }}
                        >
                          <i className="mdi mdi-cart-outline" /> Add To Cart
                        </a>
                      )}
                    </div>

                    {/* <h6 className="mb-3 mt-4">Why shop from Musicians?</h6>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="feature-box">
                          <i className="mdi mdi-truck-fast" />
                          <h6 className="text-info">
                            <span>Easy Returns &amp; Refunds</span>
                          </h6>
                          <p>
                            Return products at doorstep and get a refund in
                            seconds.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="feature-box">
                          <i className="mdi mdi-basket" />
                          <h6 className="text-info">Lowest price guaranteed</h6>
                          <p>
                            Get the difference refunded if you find it cheaper
                            anywhere else.
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <hr
                      style={{
                        color: "black",
                        height: "1px",
                      }}
                    />
                    <div class="apply">
                      <div class="rent-text">
                        <h5>
                          <strong>Or Rent For$14.08 </strong>per week
                        </h5>
                        <h6>
                          Return any time after 6 months.{" "}
                          <a href="#">Learn More</a>
                        </h6>
                      </div>
                      <div class="apply-btn">
                        <a href="#">Apply Now</a>
                      </div>
                    </div>
                    <hr
                      style={{
                        color: "black",
                        height: "1px",
                      }}
                    />
                    <div class="pay-img">
                      <img src={paypal1} alt="paypal" />
                      <img src={zippay1} alt="zippay" />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <div className="pdpt-bg">
                    <div className="pdpt-title">
                      <h4>Product Details</h4>
                    </div>
                    <div className="pdpt-body scrollstyle_4">
                      <div className="pdct-dts-1 short-desc">
                        {parse(product.desc)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Loading"
            )}
          </div>
        </section>
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
                      Divide your purchase into four interest-free instalments
                      with no late fees and just 25% down.
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
                      Simple application process & great terms. Return/upgrade
                      after six months or buy at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Login />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(Singleproduct);
