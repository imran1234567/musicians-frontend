// OrderSuccess.js

import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <img
        src="https://th.bing.com/th?id=OIP.sODpEp75dhRTXZKaQ4MZVgHaHN&w=253&h=246&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt="order"
      />
      <h1>Order Placed Successfully!</h1>
      <p>
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <p>
        An email with the order details has been sent to your registered email
        address.
      </p>
      <br></br>
      <button style={{ width: "400px" }}>Track Your Order</button>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default OrderSuccess;
