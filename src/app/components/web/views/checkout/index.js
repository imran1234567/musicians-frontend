import React, { Component } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { GetUserLogin, GetOrderDetails, CartHelper } from "../../../services";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import Deliverydetails from "./delivery";
import "./checkout.css";
import { PayPalButtons } from "@paypal/react-paypal-js";

class checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      subTotal: "",
      discount: "",
      deliveryCharge: 0,
      grandTotal: "",
      email: "",
      customer: "",
      paymentmethod: "",
      deliveryAddress: "",
      deliveryAddress: "123 Main Street, City, State",
      useExistingAddress: true,
      subTotal: "",
      discount: "",
      deliveryCharge: 0,
      grandTotal: "",
      email: "",
      customer: "",
      paymentmethod: "",
      deliveryAddress: "",
      addresses: [],
      isNewAddressFormFilled: false,
    };
  }
  // handleOptionChange = (e) => {
  //     this.setState({
  //       selectedOption: e.target.value
  //     });
  //   };

  handleDeliveryAddress = (address) => {
    this.setState({
      deliveryAddress: address,
      useExistingAddress: false,
    });
  };
  async componentDidMount() {
    let email = sessionStorage.getItem("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ customer: user.data, email: email });

        // Fetch user addresses from the API based on the logged-in user's email
        try {
          const response = await fetch(
            `http://3.25.175.163:4000/api/customer/getUserByEmailId?email=${email}`
          );
          const data = await response.json();

          if (data.success && data.data.Addresses) {
            this.setState({ addresses: data.data.Addresses });
          }
        } catch (error) {
          console.error("Error fetching user addresses:", error);
        }
      }
    }
    let cart = this.props.cartItems;
    let subTotal = cart.reduce((sum, i) => (sum += i.qty * i.netPrice), 0);
    let discount = cart.reduce((sum, i) => (sum += i.discount), 0);
    let grandTotal = subTotal + discount + this.state.deliveryCharge;

    this.setState({
      subTotal: subTotal,
      discount: discount,
      grandTotal: grandTotal,
      deliveryCharge: this.state.deliveryCharge,
    });
  }
  handlePlaceOrder = async (event) => {
    event.preventDefault();
    const {
      customer,
      grandTotal,
      addresses,
      useExistingAddress,
      paymentmethod,
    } = this.state;
    const { totalAmount } = this.props.location.state;
    let orderId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    let { cartItems } = this.props;

    let selectedAddress = useExistingAddress
      ? addresses[0]
      : this.state.deliveryAddress;

    if (selectedAddress) {
      let data = {
        customerId: customer.id,
        paymentmethod: paymentmethod,
        orderId: orderId,
        deliveryAddress: selectedAddress,
        product: cartItems,
        grandTotal: totalAmount,
      };

      if (data) {
        let order = await GetOrderDetails.getOrderCreateByUser(
          JSON.stringify(data)
        );
        if (order) {
          NotificationManager.success("Successfully Ordered", "Order");
          setTimeout(async function () {
            CartHelper.emptyCart();
          }, 1000);
        } else {
          NotificationManager.error("Order is declined", "Order");
          setTimeout(async function () {
            window.location.href = "/orderFailure";
          }, 1000);
        }
      }
    } else {
      NotificationManager.error("Please select a delivery address", "Order");
    }
  };
  loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  handlePaymentSystem = async (e) => {
    e.preventDefault();
    const { customer, grandTotal, deliveryAddress, paymentmethod } = this.state;
    let { cartItems } = this.props;
    let orderId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    this.setState({ isLoaded: true });
    if (deliveryAddress) {
      //payment system
      const res = await this.loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      //creating new order
      let data1 = {
        amount: grandTotal,
        order_id: orderId,
        currency: "INR",
        payment_capture: 1,
      };
      const result = await GetOrderDetails.getPaymentValue(data1);
      if (!result.data) {
        alert("Server error. Are you online?");
        return;
      } else {
        const __DEV__ = document.domain === "localhost";
        var options = {
          key: __DEV__ ? "rzp_test_OkYZMYKswptVZX" : "rzp_test_OkYZMYKswptVZX",
          currency: result.data.currency,
          amount: result.data.amount * 100,
          order_id: result.data.id,
          name: "CityBaazar",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          handler: async function (response) {
            const list = {
              custId: customer.id,
              orderCreationId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            };
            const result = await GetOrderDetails.getPaymentOrderList(list);
            if (result.data) {
              const EMPTY_CART = { cartItems: [] };
              const carts = cartItems || EMPTY_CART;
              setTimeout(async function () {
                let data = {
                  customerId: customer.id,
                  paymentmethod: result.data.method,
                  orderId: orderId,
                  deliveryAddress: deliveryAddress,
                  product: carts,
                  grandTotal: result.data.amount / 100,
                };

                let order = await GetOrderDetails.getOrderCreateByUser(
                  JSON.stringify(data)
                );
                if (order) {
                  NotificationManager.success("Successfully Ordered", "Order");
                  // this.setState({ isLoaded: false})
                  setTimeout(async function () {
                    CartHelper.emptyCart();
                  }, 1000);
                }
              }, 1000);
            } else {
              window.location.href = "/orderFailure";
            }
          },
          prefill: {
            name: "",
            email: "",
            phone_number: "",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        let payementObject = new window.Razorpay(options);
        payementObject.open();
      }
    } else {
      NotificationManager.error("Please! check address details", "Input Field");
    }
  };

  createOrder = (data, actions) => {
    const { customer, grandTotal, deliveryAddress, paymentmethod } = this.state;
    const { totalAmount } = this.props.location.state;
    // Logic to create an order on your server
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount, // Total amount
          },
        },
      ],
    });
  };

  onApprove = async (data, actions) => {
    // Logic to capture the approved payment
    const { totalAmount } = this.props.location.state;
    const { customer, grandTotal, deliveryAddress } = this.state;
    let paymentmethod = "paypal";
    let orderId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now())
    );
    let { cartItems } = this.props;
    let data1 = {
      customerId: customer.id,
      paymentmethod: paymentmethod,
      orderId: orderId,
      deliveryAddress: deliveryAddress,
      product: cartItems,
      grandTotal: totalAmount,
    };
    return actions.order.capture().then(async (details) => {
      // Payment completed successfully
      let order = await GetOrderDetails.getOrderCreateByUser(
        JSON.stringify(data1)
      );
      if (order) {
        NotificationManager.success("Successfully Ordered", "Order");
        setTimeout(async function () {
          CartHelper.emptyCart();
        }, 1000);
      } else {
        NotificationManager.error("Order is declined", "Order");
        setTimeout(async function () {
          window.location.href = "/orderFailure";
        }, 1000);
      }
    });
  };

  handleDeliveryAddress = (address) => {
    this.setState({
      deliveryAddress: address,
      useExistingAddress: false,
      isNewAddressFormFilled: true,
    });
  };

  handleRadioChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let firstAddress = null;
    if (this.state.addresses.length > 0) {
      firstAddress = this.state.addresses[0];
    }
    const { totalAmount } = this.props.location.state;
    const { deliveryAddress, useExistingAddress } = this.state;
    const { cartItems } = this.props;
    const {
      subTotal,
      discount,
      deliveryCharge,
      grandTotal,
      email,
      customer,
      paymentmethod,
      isLoaded,
    } = this.state;
    return (
      <div>
        <section class="breadcrumbs py-4">
          <div class="container-fluid">
            <div class="b-crumb pb-2">
              <ul class="breadcrumbs-list">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Checkout</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="checkout-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="checkout-step">
                  <div className="accordion" id="accordionExample">
                    <div className="card checkout-step-one">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link checkout-login-bk"
                            disabled
                          >
                            <span className="number">1.</span> Checkout Options
                            <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                          </button>
                          <div className="_2jDL7w">
                            <div>
                              <span className="dNZmcB">
                                {customer.firstName}{" "}
                              </span>
                              <span className="_3MeY5j">{email}</span>
                            </div>
                          </div>
                        </h5>
                      </div>
                    </div>

                    <div className="card checkout-step-two">
                      <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                            style={{ textDecoration: "none" }}
                          >
                            <span className="number">2</span> Delivery Address
                          </button>
                        </h5>
                      </div>

                      <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div className="delivery-address">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="existingAddress"
                              name="addressOption"
                              checked={useExistingAddress}
                              onChange={() =>
                                this.setState({ useExistingAddress: true })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="existingAddress"
                            >
                              I want to use the existing address
                            </label>
                          </div>

                          {firstAddress && (
                            <div className="existing-address">
                              <ul>
                                <li>
                                  <h6>
                                    <b>{firstAddress.fullname}</b>{" "}
                                    {firstAddress.phone}
                                  </h6>
                                  <h6>
                                    {firstAddress.shipping}, {firstAddress.city}
                                    , {firstAddress.states}
                                  </h6>
                                </li>
                              </ul>
                            </div>
                          )}
                          <br></br>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="newAddress"
                              name="addressOption"
                              checked={!useExistingAddress}
                              onChange={() =>
                                this.setState({ useExistingAddress: false })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="newAddress"
                            >
                              Enter New Address
                            </label>
                          </div>

                          {!useExistingAddress && (
                            <Deliverydetails
                              onSelectDeliveryAddress={
                                this.handleDeliveryAddress
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" id="headingThree">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <span className="number">3</span> Payment
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div className="checkout-step-body">
                          <div className="payment_method-checkout">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="rpt100">
                                  <ul className="radio--group-inline-container_1 pay-delivery">
                                    <li>
                                      <div className="radio-item_1">
                                        <input
                                          id="cashondelivery1"
                                          value="cash"
                                          name="paymentmethod"
                                          type="radio"
                                          onChange={this.handleRadioChange}
                                        />
                                        <label
                                          htmlFor="cashondelivery1"
                                          className="radio-label_1"
                                        >
                                          Cash on Delivery
                                        </label>
                                      </div>
                                    </li>
                                    <li>
                                      <PayPalButtons
                                        createOrder={this.createOrder}
                                        onApprove={this.onApprove}
                                      />
                                    </li>
                                  </ul>
                                </div>
                                {paymentmethod === "cash" ? (
                                  <button
                                    className="cart-btn"
                                    onClick={this.handlePlaceOrder}
                                  >
                                    Confirm Order
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <h5 className="card-header">
                    My Cart{" "}
                    <span className="text-secondary float-right">
                      ({cartItems.length} item)
                    </span>
                  </h5>
                  {cartItems.map((row, index) => (
                    <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                      <div className="cart-list-product">
                        <div className="check-here">
                          <img
                            className="img-fluid"
                            src={row.photo}
                            alt="cart"
                          />
                          <span className="badge discount-tag">
                            {row.discountPer}% OFF
                          </span>
                        </div>
                        <h5>{row.name}</h5>
                        {/* <h6>
                          <strong>
                            <span className="mdi mdi-approval" /> Available in
                          </strong>{" "}
                          - {row.unitSize} gm
                        </h6> */}

                        <p className="offer-price mb-0">
                          <span className="regular-price">
                            &#36;{row.price}
                          </span>
                          {`${row.qty} * $${row.netPrice}`}{" "}
                          <i className="mdi mdi-tag-outline" />{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="total-checkout-group">
                    <div className="cart-total-dil">
                      <h4>Sub Total</h4>
                      <span>&#36;{subTotal}</span>
                    </div>
                    <div className="cart-total-dil pt-3">
                      <h4>Delivery Charges</h4>
                      <span>&#36;{deliveryCharge}</span>
                    </div>
                  </div>
                  <div className="cart-total-dil saving-total">
                    <h4>Total Saving</h4>
                    <span style={{ color: "red" }}>
                      -&#36;{subTotal - totalAmount}
                    </span>
                  </div>

                  <div className="main-total-cart">
                    <h2>Total</h2>
                    <span>&#36;{totalAmount}</span>
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

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { incrementToCart, decreaseToCart, removeFromCart }
)(checkout);
