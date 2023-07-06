import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import parse from "html-react-parser";
import { GetProductDetails } from "../../../services";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import "./index.css";


class Singleproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    let url = window.location.href.split("/");
    var lastSegment = url.pop() || url.pop();
    let list = await GetProductDetails.getProductById(lastSegment);
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
    const { product } = this.state;
    const settings = {
      customPaging: function (i) {
        return (
          <div id="sync1" className="owl-carousel">
            <div className="item">
              <img src={product.productphotos[i].imgUrl} />
            </div>
          </div>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const isProductInCart = this.checkCart(product.id);
    return (
      <div>
        <section className="shop-single section-padding pt-3">
          <div className="container">
            {product ? (
              
              <div className="row">
                <div className="col-md-6">
                  <div className="shop-detail-left">
                    <Paper className="shop-detail-slider">
                      <Slider {...settings}>
                        <img
                          src={product.photo}
                          className="img-fluid img-center"
                          alt="product"
                        />
                      </Slider>
                    </Paper>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="shop-detail-right">
                    <span
                      className="badge badge-success"
                      style={{ backgroundColor: "#750000" }}
                    >
                      {product.discountPer}% OFF
                    </span>
                    <h2>{product.name}</h2>
                    <h6>
                      <strong>
                        <span className="mdi mdi-approval" /> Available in
                      </strong>{" "}
                      - {product.unitSize}
                    </h6>
                    <div className="pdp-product__old-price">
                      <span className="space__right--2-unit">Product MRP:</span>
                      <span className="regular-price">&#36;{product.price}</span>
                    </div>

                    <div className="pdp-product__new-price">
                      <span className="space__right--2-unit">
                        Selling price:
                      </span>
                      <span className="pdp-product__price--new">
                      &#36;{product.netPrice}
                      </span>
                      <div className="pdp-product__tax-disclaimer">
                        (Inclusive of all taxes)
                      </div>
                    </div>
                    {isProductInCart ? (
                      <Link to="/cart" className="fill-cart-btn">
                        Go To Cart
                      </Link>
                    ) : (
                      <a
                        href="javascript:void(0)"
                        className="cart-btn"
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

                    <h6 className="mb-3 mt-4">Why shop from Musicians?</h6>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(Singleproduct);
