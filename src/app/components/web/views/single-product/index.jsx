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

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      token: "",
      selectedPhoto: 0,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let list = await GetProductDetails.getProductById(lastSegment);
    let cookies = await GetUserLogin.isAuthenticate();
    this.setState({ token: cookies, product: list.data });
  }

  checkCart = (productId) => {
    const { cartItems } = this.props;
    const productExistsInCart = cartItems.some(
      (product) => product.id === productId
    );
    return productExistsInCart;
  };

  handlePhotoClick = (index) => {
    this.setState({ selectedPhoto: index });
  };

  render() {
    const { product, token, selectedPhoto } = this.state;

    if (!product) {
      return "Loading";
    }

    const isProductInCart = this.checkCart(product.id);

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
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
      appendDots: (dots) => (
        <ul style={{ margin: "0px" }}> {dots} </ul>
      ),
    };

    return (
      <div>
        <section className="shop-single section-padding pt-3 product-details">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="shop-detail-left">
                  <div className="tag">
                    <h1>Image Gallery</h1>
                  </div>
                  <div className="img-slider">
                    {product.productphotos.length === 0 ? (
                      <div key={product.id}>
                        <img src={product.photo} alt={product.alt} />
                      </div>
                    ) : (
                      <Slider {...settings}>
                        {product.productphotos.map((photo) => (
                          <div key={photo.id}>
                            <img src={photo.imgUrl} alt={`Thumbnail ${photo.id}`} />
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
                  <hr style={{ color: "black", height: "1px" }} />
                  <div className="apply">
                    <div className="rent-text">
                      <h5>
                        <strong>Or Rent For $14.08 </strong>per week
                      </h5>
                      <h6>
                        Return any time after 6 months. <a href="#">Learn More</a>
                      </h6>
                    </div>
                    <div className="apply-btn">
                      <a href="#">Apply Now</a>
                    </div>
                  </div>
                  <hr style={{ color: "black", height: "1px" }} />
                  <div className="pay-img">
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
                      Purchase your new gear with Zip Money and get up to 6
                      months to pay with zero interest.
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
        <Login />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(SingleProduct);