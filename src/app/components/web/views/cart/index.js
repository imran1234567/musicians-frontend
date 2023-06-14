import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import "./cart.css";

class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
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
                  <img
                    className="img-fluid"
                    src="https://cdn.pixabay.com/photo/2013/07/13/10/06/violin-156558_1280.png"
                    alt="cart"
                  />

                  <div className="offer-badge">{row.discountPer}% OFF</div>
                </div>
                <div className="cart-text">
                  <h4 style={{ color: "#545454", fontSize: "15px" }}>
                    {row.name}
                  </h4>
                  <div className="qty-group">
                    <div className="quantity buttons_added">
                      <button
                        className="decrease-btn"
                        onClick={() => this.props.decreaseToCart(row)}
                      >
                        -
                      </button>
                      <button
                        className="quantity"
                        style={{ backgroundColor: "#E2DEDE", margin: "0 5px" }}
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
                      ${row.netPrice}
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
                  &#x24;
                  {cartItems.reduce((sum, i) => (sum += i.qty * i.netPrice), 0)}
                </strong>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                Delivery Charges{" "}
                <strong className="float-right text-danger">
                  + &#x24;29.69
                </strong>
              </p>
              <h6 style={{ display: "flex", justifyContent: "space-between" }}>
                Your total savings{" "}
                <strong className="float-right text-danger">
                  &#x24;55 (42.31%)
                </strong>
              </h6>
            </div>
            <a href="/checkout" style={{ display: "block", width: "100%" }}>
              <button
                className="btn btn-secondary btn-lg btn-block text-left"
                type="button"
              >
                <span className="float-left">
                  <i className="mdi mdi-cart-outline" /> Proceed to Checkout{" "}
                </span>
                <span className="float-right">
                  <strong>
                    &#x24;
                    {cartItems.reduce(
                      (sum, i) => (sum += i.qty * i.netPrice),
                      0
                    )}
                  </strong>
                  <span className="mdi mdi-chevron-right" />
                </span>
              </button>
            </a>
          </div>
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
