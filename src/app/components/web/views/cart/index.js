import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import "./cart.css";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Cart extends Component {
  state = {
    couponCode: "",
    appliedCoupon: false,
    couponDiscount: 0,
    couponPercentage: 0,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.cartItems !== this.props.cartItems) {
      const { appliedCoupon, couponCode } = this.state;
      const { cartItems } = this.props;

      if (appliedCoupon && couponCode) {
        axios
          .get(`http://3.25.175.163:4000/api/coupon/get/?code=${couponCode}`)
          .then((response) => {
            const { data } = response;
            if (data.success && data.coupon.code === couponCode) {
              const couponPercentage = data.coupon.discount;
              const couponDiscount =
                (couponPercentage / 100) *
                cartItems.reduce((sum, i) => (sum += i.qty * i.netPrice), 0);
              this.setState({
                appliedCoupon: true,
                couponDiscount: couponDiscount.toFixed(2),
                couponPercentage,
              });
            } else {
              this.setState({
                appliedCoupon: false,
                couponDiscount: 0,
                couponPercentage: 0,
              });
              NotificationManager.error(
                "Invalid coupon code. Please try again."
              );
            }
          })
          .catch((error) => {
            console.error("Error applying coupon:", error);
            this.setState({
              appliedCoupon: false,
              couponDiscount: 0,
              couponPercentage: 0,
            });
            NotificationManager.error(
              "Failed to apply coupon. Please try again later."
            );
          });
      }
    }
  }
  handleApplyCoupon = async () => {
    const { couponCode } = this.state;
    const { cartItems } = this.props;
    try {
      const response = await axios.get(
        `http://3.25.175.163:4000/api/coupon/get/?code=${couponCode}`
      );
      const { data } = response;

      if (data.success && data.coupon.code === couponCode) {
        const couponPercentage = data.coupon.discount;
        const couponDiscount =
          (couponPercentage / 100) *
          cartItems.reduce((sum, i) => (sum += i.qty * i.netPrice), 0);
        this.setState({
          appliedCoupon: true,
          couponDiscount: couponDiscount.toFixed(2),
          couponPercentage,
        });

        // Show success notification
        NotificationManager.success("Coupon applied successfully");
      } else {
        // Handle invalid coupon code case
        alert("Invalid coupon code. Please try again.");

        // Show non-success notification
        NotificationManager.error("Invalid coupon code. Please try again.");
      }
    } catch (error) {
      // Handle API error case
      console.error("Error applying coupon:", error);
      // alert('Failed to apply coupon. Please try again later.');

      // Show non-success notification
      NotificationManager.error(
        "Failed to apply coupon. Please try again later."
      );
    }
  };

  //handling the decrease
  handleDecreaseToCart = (product) => {
    if (product.qty <= 1) {
      // If the quantity is less than or equal to 1, remove the product from the cart
      this.props.removeFromCart(product);
    } else {
      this.props.decreaseToCart(product);
    }
  };
  render() {
    const { cartItems } = this.props;
    const { appliedCoupon, couponDiscount, couponPercentage } = this.state;
    const subTotal = cartItems.reduce(
      (sum, i) => (sum += i.qty * i.netPrice),
      0
    );
    const totalAmount = subTotal - couponDiscount;

    return (
      <div className="cart-style">
        <section class="breadcrumbs py-4">
          <div class="container-fluid">
            <div class="b-crumb pb-2">
              <ul class="breadcrumbs-list">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>My Cart</li>
              </ul>
            </div>
          </div>
        </section>
        <div className="container">
          {cartItems.length === 0 ? ( // Check if cart is empty
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <img
                src="https://img.icons8.com/?size=512&id=9720&format=png"
                alt="Logo"
                className="cart-logo"
              />
              <Link to="/">
                <button className="add-item-button">Add Item</button>
              </Link>
              <div className="gap"></div>
            </div>
          ) : (
            <div className="cart-sidebar">
              <div className="bs-canvas-header side-cart-header p-3">
                <div className="d-inline-block main-cart-title">
                  My Cart <span>({cartItems.length} Items)</span>
                </div>
                <button
                  type="button"
                  className="bs-canvas-close close"
                  data-toggle="offcanvas"
                >
                  <i className="mdi mdi-close"></i>
                </button>
              </div>
              <div className="cart-sidebar-body">
                {cartItems.map((row, index) => (
                  <div className="cart-item" key={index}>
                    <div className="cart-product-img">
                      {/* <img className="img-fluid" src={row.photo} alt="cart" /> */}
                      <img className="img-fluid" src={row.photo} alt="cart" />

                      <div className="offer-badge">{row.discountPer}% OFF</div>
                    </div>
                    <div className="cart-text">
                      <Link
                        to={{
                          pathname: `/p/${row.slug}/${row.id}`,
                          state: row,
                        }}
                      >
                        <h6>{row.name}</h6>
                      </Link>
                      <div className="qty-group">
                        <div className="quantity buttons_added">
                          <button
                            className="decrease-btn"
                            onClick={() => this.handleDecreaseToCart(row)}
                          >
                            -
                          </button>
                          <button
                            className="quantity"
                            style={{
                              backgroundColor: "#E2DEDE",
                              margin: "0 5px",
                            }}
                          >
                            {row.qty}
                          </button>
                          <button
                            className="increase-btn"
                            onClick={() => this.props.incrementToCart(row, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-item-price">
                          &#36;{row.netPrice}
                          <span></span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="delete-btn-container"
                      style={{ marginLeft: "auto", paddingTop: "5px" }}
                      onClick={() => this.props.removeFromCart(row)}
                    >
                      <img
                        src="https://img.icons8.com/?size=512&id=67884&format=png"
                        alt="Delete"
                        className="delete-btn"
                        style={{
                          width: "22px",
                          height: "22px",
                          transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "scale(1.2)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-sidebar-footer">
                <div className="cart-store-details">
                  <p>
                    Sub Total{" "}
                    <strong className="float-right">
                      &#36;
                      {cartItems.reduce(
                        (sum, i) => (sum += i.qty * i.netPrice),
                        0
                      )}
                    </strong>
                  </p>
                  {appliedCoupon ? (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      Coupon Discount{" "}
                      <strong className="float-right text-success">
                        ({couponPercentage}% OFF) &nbsp; - &#x24;
                        {couponDiscount}
                      </strong>
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ marginRight: "10px" }}>
                        <input
                          type="text"
                          style={{
                            padding: "12px 8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "200px",
                          }}
                          placeholder="Enter coupon code"
                          value={this.state.couponCode}
                          onChange={(e) =>
                            this.setState({ couponCode: e.target.value })
                          }
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          className="fill-cart-btn"
                          // onMouseEnter={(e) => {
                          //   e.target.style.backgroundColor = "#42b883";
                          // }} // Light green color on hover
                          // onMouseLeave={(e) => {
                          //   e.target.style.backgroundColor = "#ff6f3c";
                          // }} // Restore light orange color on hover out-btn
                          onClick={this.handleApplyCoupon}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Delivery Charges{" "}
                    <strong className="float-right text-danger"></strong>
                  </p>
                  <h6
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Your total savings{" "}
                    <strong className="float-right text-danger"></strong>
                  </h6>
                </div>
                {/* <a href="/checkout" style={{ display: "block", width: "100%" }}> */}
                <Link to={{ pathname: "/checkout", state: { totalAmount } }}>
                  <button
                    className="btn proceeed-btn btn-lg btn-block text-left"
                    type="button"
                  >
                    <span className="float-left">
                      <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                    </span>
                    <span className="float-right">
                      <strong>&#x24;{totalAmount}</strong>
                      <span className="mdi mdi-chevron-right" />
                    </span>
                  </button>
                </Link>
                {/* </a> */}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { incrementToCart, decreaseToCart, removeFromCart }
)(Cart);
