import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, incrementToCart, decreaseToCart } from '../../../../store/actions/cartActions';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './cart.css';

class Cart extends Component {
  state = {
    couponCode: '',
    appliedCoupon: false,
    couponDiscount: 0,
  };

  handleApplyCoupon = async () => {
    const { couponCode } = this.state;
    const { cartItems } = this.props;
    try {
      const response = await axios.get(
        `http://13.233.106.34:4000/api/coupon/get/?code=${couponCode}`
      );
      const { data } = response;

      if (data.success && data.coupon.code === couponCode) {
        const couponDiscount = (data.coupon.discount / 100) * cartItems.reduce((sum, i) => (sum += i.qty * i.netPrice), 0);
        this.setState({
          appliedCoupon: true,
          couponDiscount: couponDiscount.toFixed(2),
        });

        // Show success notification
        NotificationManager.success('Coupon applied successfully');
      } else {
        // Handle invalid coupon code case
        alert('Invalid coupon code. Please try again.');

        // Show non-success notification
        NotificationManager.error('Invalid coupon code. Please try again.');
      }
    } catch (error) {
      // Handle API error case
      console.error('Error applying coupon:', error);
      // alert('Failed to apply coupon. Please try again later.');

      // Show non-success notification
      NotificationManager.error('Failed to apply coupon. Please try again later.');
    }
  };

  render() {
    const { cartItems } = this.props;
    const { appliedCoupon, couponDiscount } = this.state;

    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px' }}>
        <div className="cart-sidebar">
          <div className="bs-canvas-header side-cart-header p-3">
            <div className="d-inline-block main-cart-title">
              <h1>My Cart </h1>
              <span>({cartItems.length} Items)</span>
            </div>
            <button type="button" className="bs-canvas-close close" data-toggle="offcanvas">
              <i className="mdi mdi-close"></i>
            </button>
          </div>
          <div className="cart-sidebar-body">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Image</th>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Product Name</th>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Model</th>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Quantity</th>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Price</th>
                  <th style={{ fontWeight: 'bold', backgroundColor: '#ebebeb', padding: '10px', textAlign: 'center' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <div style={{ position: 'relative' }}>
                        <img className="img-fluid" src="https://cdn.pixabay.com/photo/2013/07/12/15/06/guitar-149427_1280.png" alt="cart" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                        <div className="offer-badge" style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'red', color: 'white', padding: '5px', width: '30px', height: '30px' }}>{row.discountPer}% OFF</div>
                      </div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <b>{row.name}</b>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{"CPK"}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <div className="qty-group" style={{ marginRight: '10px' }}>
                        <div className="quantity buttons_added" style={{ display: 'flex', flexDirection: 'row' }}>
                          <button className="decrease-btn" onClick={() => this.props.decreaseToCart(row)}>-</button>
                          <button className="quantity" style={{ backgroundColor: '#E2DEDE', margin: '0 5px' }}>{row.qty}</button>
                          <button className="increase-btn" onClick={() => this.props.incrementToCart(row, 1)}>+</button>
                        </div>
                        <img
                          src="https://img.icons8.com/?size=512&id=67884&format=png"
                          alt="Delete"
                          className="delete-btn"
                          style={{
                            width: '22px',
                            height: '22px',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = 'scale(1.2)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                          }}
                          onClick={() => this.props.removeFromCart(row)}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>${row.price}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>${row.qty * row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cart-sidebar-footer">
            <div className="cart-store-details">
              <p>Sub Total <strong className="float-right">&#x24;{cartItems.reduce((sum, i) => (sum += i.qty * i.netPrice), 0)}</strong></p>
              {appliedCoupon ? (
                <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Coupon Discount <strong className="float-right text-success">- &#x24;{couponDiscount}</strong>
                </p>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                  <input
                    type="text"
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '200px',
                    }}
                    placeholder="Enter coupon code"
                    value={this.state.couponCode}
                    onChange={(e) => this.setState({ couponCode: e.target.value })}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ff6f3c',   // Light orange color
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#42b883'; }}   // Light green color on hover
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#ff6f3c'; }}   // Restore light orange color on hover out
                    onClick={this.handleApplyCoupon}
                  >
                    Apply
                </button>

                </div>
              </div>
              

              )}
              
            </div>
            <br/>
            <a href="/checkout" style={{ display: 'block', width: '100%' }}>
              <button className="btn btn-secondary btn-lg btn-block text-left" type="button">
                <span className="float-left">
                  <i className="mdi mdi-cart-outline" /> Proceed to Checkout
                </span>
                <span className="float-right">
                  <strong>&#x24;{cartItems.reduce((sum, i) => (sum += (i.qty * i.netPrice)-couponDiscount), 0)}</strong>
                  <span className="mdi mdi-chevron-right" />
                </span>
              </button>
            </a>
          </div>
        </div>
        <NotificationContainer />
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
